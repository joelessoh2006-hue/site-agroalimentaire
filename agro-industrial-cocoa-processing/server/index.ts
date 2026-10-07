import express from 'express';
import { processRfqSubmission, getAllLeads, getLeadById, updateLeadStatus } from './rfqHandler';
import { isAuthorizedAdminRequest } from './auth';
import { rateLimiter, getClientIp, RATE_LIMIT_RULES } from './rateLimiter';
import { securityHeadersMiddleware } from './securityHeaders';

const app = express();
const PORT = process.env.PORT || 3001;

// 1. En-têtes HTTP de sécurité globaux OWASP (CSP, HSTS, X-Frame-Options, Permissions-Policy, etc.)
app.use(securityHeadersMiddleware);

// 2. Protection contre les payloads trop volumineux
app.use(express.json({ limit: '100kb' }));

// Point de terminaison principal RFQ & Contact (avec Rate Limiting anti-DDoS / Brute-force)
app.post(['/api/rfq', '/api/contact'], async (req, res) => {
  const clientIp = getClientIp(req);
  const limitCheck = rateLimiter.check('rfq', clientIp, RATE_LIMIT_RULES.RFQ_SUBMISSION);

  res.setHeader('X-RateLimit-Limit', limitCheck.limit);
  res.setHeader('X-RateLimit-Remaining', limitCheck.remaining);
  res.setHeader('X-RateLimit-Reset', Math.ceil(limitCheck.resetTimeMs / 1000));

  if (!limitCheck.allowed) {
    res.setHeader('Retry-After', limitCheck.retryAfterSeconds);
    return res.status(429).json({
      success: false,
      error: 'Too Many Requests',
      message: limitCheck.message,
      retryAfterSeconds: limitCheck.retryAfterSeconds,
    });
  }

  const result = await processRfqSubmission(req.body, clientIp);
  res.status(result.statusCode).json(result.body);
});

// Middleware de sécurité administrative : protège toutes les routes /api/leads*
app.use('/api/leads', (req, res, next) => {
  const auth = isAuthorizedAdminRequest(req);
  if (!auth.authorized) {
    if (auth.statusCode === 401) {
      res.setHeader('WWW-Authenticate', 'Bearer realm="Admin Leads Access"');
    }
    return res.status(auth.statusCode || 401).json({
      success: false,
      error: auth.statusCode === 401 ? 'Unauthorized' : 'Forbidden',
      message: auth.message,
    });
  }
  next();
});

// Consultation des leads (liste) [Protégé]
app.get('/api/leads', (_req, res) => {
  const leads = getAllLeads();
  res.json({ success: true, total: leads.length, leads });
});

// Consultation d'un lead individuel
app.get('/api/leads/:id', (req, res) => {
  const lead = getLeadById(req.params.id);
  if (!lead) {
    return res.status(404).json({ success: false, message: 'Prospect non trouvé.' });
  }
  res.json({ success: true, lead });
});

// Mise à jour de statut (ex: 'nouveau' -> 'contacté' -> 'devis_envoyé')
app.patch('/api/leads/:id/status', (req, res) => {
  const { status } = req.body;
  const updated = updateLeadStatus(req.params.id, status);
  if (!updated) {
    return res.status(400).json({
      success: false,
      message:
        'Statut invalide ou prospect introuvable. Valeurs autorisées: nouveau, contacté, devis_envoyé, échantillon_expédié, clôturé.',
    });
  }
  res.json({
    success: true,
    message: `Statut mis à jour : ${status}`,
  });
});

// Middleware de Rate Limiting anti-scraping pour les documents techniques PDF
app.use('/api/docs', (req, res, next) => {
  const clientIp = getClientIp(req);
  const limitCheck = rateLimiter.check('docs', clientIp, RATE_LIMIT_RULES.DOCS_DOWNLOAD);

  res.setHeader('X-RateLimit-Limit', limitCheck.limit);
  res.setHeader('X-RateLimit-Remaining', limitCheck.remaining);
  res.setHeader('X-RateLimit-Reset', Math.ceil(limitCheck.resetTimeMs / 1000));

  if (!limitCheck.allowed) {
    res.setHeader('Retry-After', limitCheck.retryAfterSeconds);
    return res.status(429).json({
      success: false,
      error: 'Too Many Requests',
      message: limitCheck.message,
      retryAfterSeconds: limitCheck.retryAfterSeconds,
    });
  }

  next();
});

// Téléchargement sécurisé des Fiches Techniques (TDS) et Certificats d'Analyse (COA) en PDF
app.get('/api/docs/tds/:slug', (req, res) => {
  const path = require('path');
  const fs = require('fs');
  const slug = req.params.slug;
  const filePath = path.resolve(__dirname, `../public/docs/tds/TDS_${slug}.pdf`);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ success: false, message: 'Fiche TDS introuvable pour ce produit.' });
  }

  const stat = fs.statSync(filePath);
  const isInline = req.query.inline === 'true';

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `${isInline ? 'inline' : 'attachment'}; filename="TDS_${slug}_AgroIndustrial_2026.pdf"`);
  res.setHeader('Content-Length', stat.size);
  res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=604800');
  res.setHeader('X-Content-Type-Options', 'nosniff');

  fs.createReadStream(filePath).pipe(res);
});

app.get('/api/docs/coa/:lot', (req, res) => {
  const path = require('path');
  const fs = require('fs');
  const lot = req.params.lot;
  const filePath = path.resolve(__dirname, `../public/docs/coa/COA_${lot}.pdf`);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ success: false, message: 'Certificat CoA introuvable pour ce lot.' });
  }

  const stat = fs.statSync(filePath);
  const isInline = req.query.inline === 'true';

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `${isInline ? 'inline' : 'attachment'}; filename="COA_${lot}_Certificat_Analyse_2026.pdf"`);
  res.setHeader('Content-Length', stat.size);
  res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=604800');
  res.setHeader('X-Content-Type-Options', 'nosniff');

  fs.createReadStream(filePath).pipe(res);
});

// Health check

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'cocoa-industrial-api', time: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`[API Server] Serveur B2B à l'écoute sur http://localhost:${PORT}`);
});

export default app;
