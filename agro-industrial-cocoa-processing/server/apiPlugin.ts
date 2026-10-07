import type { Plugin } from 'vite';
import { processRfqSubmission, getAllLeads, getLeadById, updateLeadStatus } from './rfqHandler';

/**
 * Plugin Vite pour servir les routes API (/api/rfq, /api/contact, /api/leads) directement
 * dans le serveur de développement local sur http://localhost:3000/
 */
export function rfqApiPlugin(): Plugin {
  return {
    name: 'rfq-api-plugin',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url?.split('?')[0] || '';

        // 1. Soumission d'une demande RFQ / Contact (POST)
        if (req.method === 'POST' && (url === '/api/rfq' || url === '/api/contact')) {
          const chunks: Buffer[] = [];
          
          req.on('data', (chunk) => {
            chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
          });

          req.on('end', async () => {
            try {
              const bodyStr = Buffer.concat(chunks).toString('utf-8');
              const parsedBody = bodyStr ? JSON.parse(bodyStr) : {};
              const clientIp = req.socket.remoteAddress;
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

        // 2. Consultation des leads enregistrés (GET /api/leads)
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

        next();
      });
    },
  };
}
