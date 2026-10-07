import type { Plugin } from 'vite';
import { processRfqSubmission } from './rfqHandler';

/**
 * Plugin Vite pour servir les routes API (/api/rfq, /api/contact) directement
 * dans le serveur de développement local sur http://localhost:3000/
 */
export function rfqApiPlugin(): Plugin {
  return {
    name: 'rfq-api-plugin',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url?.split('?')[0];

        if (req.method === 'POST' && (url === '/api/rfq' || url === '/api/contact')) {
          let bodyStr = '';
          
          req.on('data', (chunk) => {
            bodyStr += chunk;
          });

          req.on('end', async () => {
            try {
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

        next();
      });
    },
  };
}
