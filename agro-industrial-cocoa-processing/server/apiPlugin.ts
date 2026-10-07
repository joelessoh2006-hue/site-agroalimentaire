import type { Plugin } from 'vite';
import { processRfqSubmission, getAllLeads, getLeadById, updateLeadStatus } from './rfqHandler';
import { isAuthorizedAdminRequest } from './auth';
import { rateLimiter, getClientIp, RATE_LIMIT_RULES } from './rateLimiter';

/**
 * Plugin Vite pour servir les routes API (/api/rfq, /api/contact, /api/leads, /api/docs) directement
 * dans le serveur de développement local sur http://localhost:3000/
 */
export function rfqApiPlugin(): Plugin {
  return {
    name: 'rfq-api-plugin',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
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

          const chunks: Buffer[] = [];
          
          req.on('data', (chunk) => {
            chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
          });

          req.on('end', async () => {
            try {
              const bodyStr = Buffer.concat(chunks).toString('utf-8');
              const parsedBody = bodyStr ? JSON.parse(bodyStr) : {};
              const result = await processRfqSubmission(parsedBody, clientIp);

              res.statusCode = result.statusCode;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(result.body));
            } catch (err) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(
                JSON.stringify({
                  success: false,
                  message: 'Erreur lors de la lecture du payload JSON envoyé.',
                  error: err instanceof Error ? err.message : String(err),
                })
              );
            }
          });
          return;
        }

        // 2. Sécurisation obligatoire de toutes les routes administratives (/api/leads*)
        // Bloque immédiatement avec 401 Unauthorized ou 403 Forbidden toute requête non authentifiée
        if (url.startsWith('/api/leads')) {
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
          const leads = getAllLeads();
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end(
            JSON.stringify({
              success: true,
              total: leads.length,
              leads,
            })
          );
          return;
        }

        // 3. Consultation d'un lead individuel (GET /api/leads/:id)
        if (req.method === 'GET' && url.startsWith('/api/leads/')) {
          const leadId = url.replace('/api/leads/', '');
          const lead = getLeadById(leadId);
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
          const leadId = parts[3]; // /api/leads/<id>/status
          const chunks: Buffer[] = [];

          req.on('data', (chunk) => {
            chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
          });

          req.on('end', () => {
            try {
              const bodyStr = Buffer.concat(chunks).toString('utf-8');
              const { status } = JSON.parse(bodyStr || '{}');
              const updated = updateLeadStatus(leadId, status);
              if (!updated) {
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
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(
                JSON.stringify({
                  success: true,
                  message: `Statut mis à jour avec succès : ${status}`,
                })
              );
            } catch (parseErr) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(
                JSON.stringify({
                  success: false,
                  message: 'Payload JSON invalide.',
                  error: parseErr instanceof Error ? parseErr.message : String(parseErr),
                })
              );
            }
          });
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
            let matchedSlug = rawParam;

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
            const lot = url.replace('/api/docs/coa/', '');
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
