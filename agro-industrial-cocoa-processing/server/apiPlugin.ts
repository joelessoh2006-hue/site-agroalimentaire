import type { Plugin } from 'vite';
import { z } from 'zod';
import { processRfqSubmission, getAllLeads, getLeadById, updateLeadStatus } from './rfqHandler';
import { isAuthorizedAdminRequest } from './auth';
import { rateLimiter, getClientIp, RATE_LIMIT_RULES } from './rateLimiter';
import { applySecurityHeaders } from './securityHeaders';

// Schémas de validation Zod stricts pour les entrées de l'API
const pluginLeadsQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(100).default(50),
  offset: z.coerce.number().int().min(0).default(0),
});
const pluginLeadIdSchema = z.string().trim().regex(/^[a-zA-Z0-9_\-]+$/);
const pluginLeadStatusSchema = z.enum(['nouveau', 'contacté', 'devis_envoyé', 'échantillon_expédié', 'clôturé']);
const pluginDocSlugSchema = z.string().trim().regex(/^[a-z0-9\-]+$/i);
const pluginDocLotSchema = z.string().trim().regex(/^[a-zA-Z0-9\-]+$/);

/**
 * Lit le flux HTTP entrant avec un plafond strict de 100 Ko,
 * gestion d'erreur réseau et détachement garanti des écouteurs d'événements (.off).
 */
function readJsonBodySafe<T = any>(req: any, maxBytes: number = 102400): Promise<T> {
  return new Promise((resolve, reject) => {
    let totalBytes = 0;
    const chunks: Buffer[] = [];

    const onData = (chunk: any) => {
      const buffer = typeof chunk === 'string' ? Buffer.from(chunk) : chunk;
      totalBytes += buffer.length;
      if (totalBytes > maxBytes) {
        cleanup();
        req.destroy();
        reject(new Error('Payload trop volumineux'));
        return;
      }
      chunks.push(buffer);
    };

    const onEnd = () => {
      cleanup();
      try {
        const bodyStr = Buffer.concat(chunks).toString('utf-8');
        const parsed = bodyStr ? JSON.parse(bodyStr) : {};
        resolve(parsed as T);
      } catch {
        reject(new Error('JSON invalide'));
      }
    };

    const onError = (err: any) => {
      cleanup();
      reject(err);
    };

    const cleanup = () => {
      if (typeof req.off === 'function') {
        req.off('data', onData);
        req.off('end', onEnd);
        req.off('error', onError);
      } else if (typeof req.removeListener === 'function') {
        req.removeListener('data', onData);
        req.removeListener('end', onEnd);
        req.removeListener('error', onError);
      }
    };

    req.on('data', onData);
    req.on('end', onEnd);
    req.on('error', onError);
  });
}

/**
 * Plugin Vite pour servir les routes API (/api/rfq, /api/contact, /api/leads, /api/docs) directement
 * dans le serveur de développement local sur http://localhost:3000/
 */
export function rfqApiPlugin(): Plugin {
  return {
    name: 'rfq-api-plugin',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        // Application globale des en-têtes de sécurité OWASP (CSP, HSTS, X-Frame-Options, etc.)
        applySecurityHeaders(res);

        const url = req.url?.split('?')[0] || '';

        // 1. Soumission d'une demande RFQ / Contact (POST) avec Rate Limiting anti-DDoS / Brute-force
        if (req.method === 'POST' && (url === '/api/rfq' || url === '/api/contact')) {
          const clientIp = getClientIp(req);
          const limitCheck = rateLimiter.check('rfq', clientIp, RATE_LIMIT_RULES.RFQ_SUBMISSION);

          // Positionner les en-têtes standard IETF RateLimit
          res.setHeader('X-RateLimit-Limit', limitCheck.limit);
          res.setHeader('X-RateLimit-Remaining', limitCheck.remaining);
          res.setHeader('X-RateLimit-Reset', Math.ceil(limitCheck.resetTimeMs / 1000));

          if (!limitCheck.allowed) {
            res.statusCode = 429;
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Retry-After', limitCheck.retryAfterSeconds);
            res.end(
              JSON.stringify({
                success: false,
                error: 'Too Many Requests',
                message: limitCheck.message,
                retryAfterSeconds: limitCheck.retryAfterSeconds,
              })
            );
            return;
          }

          try {
            const parsedBody = await readJsonBodySafe(req, 102400);
            const result = await processRfqSubmission(parsedBody, clientIp);

            res.statusCode = result.statusCode;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(result.body));
          } catch {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json');
            res.end(
              JSON.stringify({
                success: false,
                message: 'Erreur lors de la lecture des données transmises.',
              })
            );
          }
          return;
        }

        // 2. Sécurisation obligatoire et Rate Limiting de toutes les routes administratives (/api/leads*)
        // Bloque les attaques de force brute (max 10 req / 15 min) et rejette les requêtes non authentifiées
        if (url.startsWith('/api/leads')) {
          const clientIp = getClientIp(req);
          const limitCheck = rateLimiter.check('admin', clientIp, RATE_LIMIT_RULES.ADMIN_ACCESS);

          res.setHeader('X-RateLimit-Limit', limitCheck.limit);
          res.setHeader('X-RateLimit-Remaining', limitCheck.remaining);
          res.setHeader('X-RateLimit-Reset', Math.ceil(limitCheck.resetTimeMs / 1000));

          if (!limitCheck.allowed) {
            res.statusCode = 429;
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Retry-After', limitCheck.retryAfterSeconds);
            res.end(
              JSON.stringify({
                success: false,
                error: 'Too Many Requests',
                message: limitCheck.message,
                retryAfterSeconds: limitCheck.retryAfterSeconds,
              })
            );
            return;
          }

          const authCheck = isAuthorizedAdminRequest(req);
          if (!authCheck.authorized) {
            res.statusCode = authCheck.statusCode || 401;
            res.setHeader('Content-Type', 'application/json');
            if (res.statusCode === 401) {
              res.setHeader('WWW-Authenticate', 'Bearer realm="Admin Leads Access"');
            }
            res.end(
              JSON.stringify({
                success: false,
                error: res.statusCode === 401 ? 'Unauthorized' : 'Forbidden',
                message: authCheck.message,
              })
            );
            return;
          }
        }

        // 3. Consultation des leads enregistrés (GET /api/leads) [Protégé]
        if (req.method === 'GET' && url === '/api/leads') {
          const parsedUrl = new URL(req.url || '', 'http://localhost');
          const queryParams = {
            limit: parsedUrl.searchParams.get('limit') || undefined,
            offset: parsedUrl.searchParams.get('offset') || undefined,
          };
          const parsedQuery = pluginLeadsQuerySchema.safeParse(queryParams);
          const { limit, offset } = parsedQuery.success ? parsedQuery.data : { limit: 50, offset: 0 };
          const leads = getAllLeads(limit, offset);
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end(
            JSON.stringify({
              success: true,
              total: leads.length,
              limit,
              offset,
              leads,
            })
          );
          return;
        }

        // 3. Consultation d'un lead individuel (GET /api/leads/:id)
        if (req.method === 'GET' && url.startsWith('/api/leads/')) {
          const rawId = url.replace('/api/leads/', '').trim();
          const parsedId = pluginLeadIdSchema.safeParse(rawId);
          if (!parsedId.success) {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: false, message: 'Identifiant de prospect invalide.' }));
            return;
          }
          const lead = getLeadById(parsedId.data);
          if (!lead) {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: false, message: 'Prospect non trouvé.' }));
            return;
          }
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ success: true, lead }));
          return;
        }

        // 4. Mise à jour de statut d'un lead (PATCH ou POST /api/leads/:id/status)
        if ((req.method === 'PATCH' || req.method === 'POST') && url.startsWith('/api/leads/') && url.endsWith('/status')) {
          const parts = url.split('/');
          const rawId = parts[3]?.trim();
          const parsedId = pluginLeadIdSchema.safeParse(rawId);
          if (!parsedId.success) {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: false, message: 'Identifiant de prospect invalide.' }));
            return;
          }

          try {
            const body = await readJsonBodySafe<{ status?: string }>(req, 102400);
            const parsedStatus = pluginLeadStatusSchema.safeParse(body?.status);
            if (!parsedStatus.success) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(
                JSON.stringify({
                  success: false,
                  message:
                    'Statut invalide ou prospect introuvable. Valeurs autorisées: nouveau, contacté, devis_envoyé, échantillon_expédié, clôturé.',
                })
              );
              return;
            }
            const status = parsedStatus.data;
            const updated = updateLeadStatus(parsedId.data, status);
            if (!updated) {
              res.statusCode = 404;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: false, message: 'Prospect introuvable.' }));
              return;
            }
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(
              JSON.stringify({
                success: true,
                message: `Statut mis à jour avec succès : ${status}`,
              })
            );
          } catch {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json');
            res.end(
              JSON.stringify({
                success: false,
                message: 'Format de requête invalide.',
              })
            );
          }
          return;
        }

        // 5. Téléchargement des Documents Techniques (TDS / COA en PDF) avec Rate Limiting anti-scraping
        if (
          req.method === 'GET' &&
          (url.startsWith('/api/docs/') || url.startsWith('/docs/tds/') || url.startsWith('/docs/coa/'))
        ) {
          const clientIp = getClientIp(req);
          const limitCheck = rateLimiter.check('docs', clientIp, RATE_LIMIT_RULES.DOCS_DOWNLOAD);

          res.setHeader('X-RateLimit-Limit', limitCheck.limit);
          res.setHeader('X-RateLimit-Remaining', limitCheck.remaining);
          res.setHeader('X-RateLimit-Reset', Math.ceil(limitCheck.resetTimeMs / 1000));

          if (!limitCheck.allowed) {
            res.statusCode = 429;
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Retry-After', limitCheck.retryAfterSeconds);
            res.end(
              JSON.stringify({
                success: false,
                error: 'Too Many Requests',
                message: limitCheck.message,
                retryAfterSeconds: limitCheck.retryAfterSeconds,
              })
            );
            return;
          }

          const fs = await import('fs');
          const path = await import('path');
          const { fileURLToPath } = await import('url');

          const currFilename = fileURLToPath(import.meta.url);
          const currDirname = path.dirname(currFilename);
          const publicDocsDir = path.resolve(currDirname, '../public/docs');

          let relativeFilePath = '';
          let downloadFilename = 'Document-Technique-AgroIndustrial.pdf';

          if (url.startsWith('/api/docs/tds/')) {
            const rawParam = url.replace('/api/docs/tds/', '').trim();
            const parsedSlug = pluginDocSlugSchema.safeParse(rawParam);
            if (!parsedSlug.success) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: false, message: 'Format de slug invalide.' }));
              return;
            }
            let matchedSlug = parsedSlug.data;

            // Tentative de résolution directe
            if (!fs.existsSync(path.resolve(publicDocsDir, 'tds', `TDS_${matchedSlug}.pdf`))) {
              const { COCOA_PRODUCTS } = await import('../src/data/products.js');
              const found = COCOA_PRODUCTS.find(
                (p) =>
                  p.slug.toLowerCase() === rawParam.toLowerCase() ||
                  p.id.toLowerCase() === rawParam.toLowerCase() ||
                  p.slug.includes(rawParam.toLowerCase()) ||
                  rawParam.toLowerCase().includes(p.slug)
              );
              if (found) {
                matchedSlug = found.slug;
              }
            }

            relativeFilePath = path.join('tds', `TDS_${matchedSlug}.pdf`);
            downloadFilename = `TDS_${matchedSlug}_AgroIndustrial_2026.pdf`;
          } else if (url.startsWith('/api/docs/coa/')) {
            const rawLot = url.replace('/api/docs/coa/', '').trim();
            const parsedLot = pluginDocLotSchema.safeParse(rawLot);
            if (!parsedLot.success) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: false, message: 'Format de numéro de lot invalide.' }));
              return;
            }
            const lot = parsedLot.data;
            let coaFile = `COA_${lot}.pdf`;
            if (!fs.existsSync(path.resolve(publicDocsDir, 'coa', coaFile))) {
              coaFile = 'COA_LOT-COC-2026-STANDARD.pdf';
            }
            relativeFilePath = path.join('coa', coaFile);
            downloadFilename = `COA_${lot}_Certificat_Analyse_2026.pdf`;
          } else if (url.startsWith('/docs/tds/')) {
            const filename = path.basename(url);
            relativeFilePath = path.join('tds', filename);
            downloadFilename = filename;
          } else if (url.startsWith('/docs/coa/')) {
            const filename = path.basename(url);
            relativeFilePath = path.join('coa', filename);
            downloadFilename = filename;
          }

          const absolutePath = path.resolve(publicDocsDir, relativeFilePath);

          // Vérification de sécurité pour éviter le Directory Traversal
          if (!absolutePath.startsWith(publicDocsDir) || !fs.existsSync(absolutePath)) {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'application/json');
            res.end(
              JSON.stringify({
                success: false,
                message: 'Document technique introuvable.',
                requested: url,
              })
            );
            return;
          }

          const stat = fs.statSync(absolutePath);
          const isInline = req.url?.includes('inline=true');

          // En-têtes HTTP de distribution professionnelle de documents PDF
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/pdf');
          res.setHeader(
            'Content-Disposition',
            `${isInline ? 'inline' : 'attachment'}; filename="${downloadFilename}"`
          );
          res.setHeader('Content-Length', stat.size);
          res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=604800');
          res.setHeader('X-Content-Type-Options', 'nosniff');

          const readStream = fs.createReadStream(absolutePath);
          readStream.pipe(res);
          return;
        }

        next();
      });
    },
  };
}
