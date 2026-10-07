import express from 'express';
import { processRfqSubmission } from './rfqHandler';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json({ limit: '100kb' })); // Protection contre les payloads trop volumineux

// Point de terminaison principal RFQ & Contact
app.post(['/api/rfq', '/api/contact'], async (req, res) => {
  const clientIp = req.ip || req.socket.remoteAddress;
  const result = await processRfqSubmission(req.body, clientIp);
  res.status(result.statusCode).json(result.body);
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'cocoa-industrial-api', time: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`[API Server] Serveur B2B à l'écoute sur http://localhost:${PORT}`);
});

export default app;
