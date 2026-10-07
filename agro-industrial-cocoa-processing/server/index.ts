import express from 'express';
import { processRfqSubmission, getAllLeads, getLeadById, updateLeadStatus } from './rfqHandler';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json({ limit: '100kb' })); // Protection contre les payloads trop volumineux

// Point de terminaison principal RFQ & Contact
app.post(['/api/rfq', '/api/contact'], async (req, res) => {
  const clientIp = req.ip || req.socket.remoteAddress;
  const result = await processRfqSubmission(req.body, clientIp);
  res.status(result.statusCode).json(result.body);
});

// Consultation des leads (liste)
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
