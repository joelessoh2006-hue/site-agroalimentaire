import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Resend } from 'resend';
import nodemailer, { type Transporter } from 'nodemailer';
import { B2BLeadRecord } from './db';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const EMAILS_ARCHIVE_DIR = path.resolve(__dirname, 'sent-emails');

// Assure l'existence du dossier d'archivage des e-mails en local
if (!fs.existsSync(EMAILS_ARCHIVE_DIR)) {
  fs.mkdirSync(EMAILS_ARCHIVE_DIR, { recursive: true });
}

// Configuration des expéditeurs et destinataires
const SENDER_EMAIL = process.env.SENDER_EMAIL || 'export@cacao-ivoire-industries.com';
const SENDER_NAME = process.env.SENDER_NAME || 'Desk Export — Usine Cacao Ivoire';
const COMMERCIAL_EMAIL_TO = process.env.COMMERCIAL_EMAIL_TO || 'commercial-desk@cacao-ivoire-industries.com';
const SITE_URL = process.env.SITE_URL || 'http://localhost:3000';

// Initialisation du client Resend si la clé est fournie
const resendApiKey = process.env.RESEND_API_KEY;
const resendClient = resendApiKey ? new Resend(resendApiKey) : null;

// Initialisation du transporteur SMTP standard si configuré (Brevo, SendGrid, Postmark...)
const smtpHost = process.env.SMTP_HOST;
let smtpTransporter: Transporter | null = null;

if (smtpHost && process.env.SMTP_USER && process.env.SMTP_PASS) {
  smtpTransporter = nodemailer.createTransport({
    host: smtpHost,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

/**
 * Neutralise les caractères HTML spéciaux pour prévenir l'injection HTML dans les clients mail.
 */
export function escapeHtml(str: string | undefined | null): string {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * 1. Génère le Template HTML pour l'accusé de réception envoyé au client
 */
export function generateCustomerEmailHtml(lead: B2BLeadRecord): string {
  let productsList: string[] = [];
  try {
    productsList = JSON.parse(lead.products_requested);
  } catch {
    productsList = [lead.products_requested];
  }

  const safeLeadId = escapeHtml(lead.id);
  const safeCompanyName = escapeHtml(lead.company_name);
  const safeContactName = escapeHtml(lead.contact_name);
  const safeEmail = escapeHtml(lead.email);
  const safeCountry = escapeHtml(lead.country);
  const safeIncoterm = escapeHtml(lead.incoterm || 'FOB/CIF');
  const safeDestination = escapeHtml(lead.destination_port || lead.country);
  const safeOrderVolume = escapeHtml(lead.order_volume || 'Non spécifié');
  const safeProductsList = productsList.map(escapeHtml);

  const isSample = lead.is_sample_request === 1;
  const requestLabel = isSample ? 'Demande d’Échantillons R&D Laboratoire' : 'Demande de Cotation Industrielle (Spot/FCL)';

  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <title>Accusé de réception - Réf. ${safeLeadId}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #F8F4EE; margin: 0; padding: 24px; color: #221510; }
    .container { max-width: 620px; margin: 0 auto; background: #FFFFFF; border: 1px solid #E4DDD3; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 16px rgba(34,21,16,0.06); }
    .header { background: #221510; padding: 32px 28px; text-align: left; border-bottom: 3px solid #C29958; }
    .header h1 { margin: 0; color: #FFFFFF; font-size: 20px; font-weight: 700; letter-spacing: 0.5px; }
    .header p { margin: 6px 0 0; color: #C29958; font-size: 12px; font-family: monospace; text-transform: uppercase; }
    .body-content { padding: 32px 28px; }
    .ref-badge { display: inline-block; background: #FAF7F2; border: 1px solid #E4DDD3; border-radius: 6px; padding: 8px 14px; font-family: monospace; font-size: 13px; font-weight: bold; color: #4A2C21; margin-bottom: 20px; }
    .lead-table { width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 13px; }
    .lead-table td { padding: 9px 12px; border-bottom: 1px solid #E4DDD3; }
    .lead-table td.label { width: 40%; color: #5D5753; font-weight: 600; background: #FAF7F2; }
    .lead-table td.val { width: 60%; color: #221510; font-weight: 500; }
    .cta-button { display: inline-block; background: #C29958; color: #221510; text-decoration: none; font-weight: bold; font-size: 13px; padding: 13px 24px; border-radius: 6px; text-transform: uppercase; letter-spacing: 0.5px; margin: 20px 0; }
    .quality-box { background: #F8F4EE; border-left: 4px solid #2E5A36; padding: 16px 18px; border-radius: 0 6px 6px 0; margin-top: 24px; font-size: 12px; color: #4f4541; line-height: 1.5; }
    .footer { background: #FAF7F2; padding: 20px 28px; border-top: 1px solid #E4DDD3; font-size: 11px; color: #8C827A; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Usine Industrielle de Transformation du Cacao</h1>
      <p>Desk Export & Solutions B2B · Bassin San Pedro & Abidjan</p>
    </div>

    <div class="body-content">
      <div class="ref-badge">
        RÉFÉRENCE OFFICIELLE : ${safeLeadId}
      </div>

      <p style="font-size: 15px; line-height: 1.5; margin-top: 0;">
        Bonjour <strong>${safeContactName}</strong>,
      </p>

      <p style="font-size: 14px; line-height: 1.6; color: #4f4541;">
        Nous accusons bonne réception de votre <strong>${escapeHtml(requestLabel.toLowerCase())}</strong> pour le compte de l'entreprise <strong>${safeCompanyName}</strong>.
      </p>

      <p style="font-size: 14px; line-height: 1.6; color: #4f4541;">
        Votre dossier a été transmis à notre ingénieur commercial export référent pour la zone <strong>${safeCountry}</strong>. Une étude technique et notre cotation officielle vous parviendront sous <strong>24 à 48 heures ouvrées</strong>.
      </p>

      <table class="lead-table">
        <tr>
          <td class="label">Raison Sociale</td>
          <td class="val">${safeCompanyName}</td>
        </tr>
        <tr>
          <td class="label">Contact Référent</td>
          <td class="val">${safeContactName} (${safeEmail})</td>
        </tr>
        <tr>
          <td class="label">Volume / Format</td>
          <td class="val">${safeOrderVolume}</td>
        </tr>
        <tr>
          <td class="label">Incoterm & Destination</td>
          <td class="val">${safeIncoterm} — ${safeDestination}</td>
        </tr>
        <tr>
          <td class="label">Produits sélectionnés</td>
          <td class="val">${safeProductsList.join(', ')}</td>
        </tr>
      </table>

      <div style="text-align: center;">
        <a href="${SITE_URL}/catalogue" class="cta-button" target="_blank">
          Consulter le Catalogue Technique & Fiches TDS
        </a>
      </div>

      <div class="quality-box">
        <strong>Garanties Industrielles & Conformité :</strong><br>
        Tous nos dérivés purs de cacao sont issus d’un pressage mécanique continu sous 450 bars, certifiés FSSC 22000 Ver. 6.0, ISO 9001 et strictement conformes au Règlement Européen Zéro Déforestation (EUDR 2023/1115) avec traçabilité polygonale GPS par lot.
      </div>
    </div>

    <div class="footer">
      Direction Commerciale & Export · Usine Industrielle de San Pedro · ZIP BP 1490 San Pedro, Côte d'Ivoire.<br>
      © ${new Date().getFullYear()} Cacao Ivoire Industries. Tous droits réservés.
    </div>
  </div>
</body>
</html>`;
}

/**
 * 2. Génère le Template HTML pour l'alerte interne destinée à l'équipe commerciale
 */
export function generateInternalAlertEmailHtml(lead: B2BLeadRecord): string {
  let productsList: string[] = [];
  try {
    productsList = JSON.parse(lead.products_requested);
  } catch {
    productsList = [lead.products_requested];
  }

  const safeLeadId = escapeHtml(lead.id);
  const safeCompanyName = escapeHtml(lead.company_name);
  const safeContactName = escapeHtml(lead.contact_name);
  const safeEmail = escapeHtml(lead.email);
  const safePhone = escapeHtml(lead.phone || 'Non renseigné');
  const safeVatNumber = escapeHtml(lead.vat_number || 'Non renseigné');
  const safeCountry = escapeHtml(lead.country);
  const safeDestinationPort = escapeHtml(lead.destination_port || 'Non spécifié');
  const safeIncoterm = escapeHtml(lead.incoterm || 'FOB/CIF standard');
  const safeOrderVolume = escapeHtml(lead.order_volume || 'Non renseigné');
  const safeProjectDescription = escapeHtml(lead.project_description || 'Aucune note particulière formulée');
  const safeIpAddress = escapeHtml(lead.ip_address || 'Non capturée');
  const safeProductsList = productsList.map(escapeHtml);

  const isSample = lead.is_sample_request === 1;
  const priorityBadge = isSample ? 'PRIORITÉ R&D / ÉCHANTILLONS' : 'LEAD COMMERCIAL VOLUME FCL/LCL';
  const badgeColor = isSample ? '#C29958' : '#2E5A36';

  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <title>[LEAD B2B] ${safeCompanyName} - ${safeLeadId}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #221510; margin: 0; padding: 24px; color: #221510; }
    .container { max-width: 650px; margin: 0 auto; background: #FFFFFF; border-radius: 8px; overflow: hidden; border: 2px solid #C29958; }
    .alert-banner { background: #221510; color: #FFFFFF; padding: 20px 24px; border-bottom: 2px solid #C29958; }
    .badge { display: inline-block; background: ${badgeColor}; color: #FFFFFF; font-size: 11px; font-weight: bold; padding: 4px 10px; border-radius: 4px; font-family: monospace; }
    .content { padding: 28px; }
    .meta-box { background: #F8F4EE; border: 1px solid #E4DDD3; border-radius: 6px; padding: 16px; margin: 16px 0; font-family: monospace; font-size: 12px; }
    .table { width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 13px; }
    .table td { padding: 10px 12px; border-bottom: 1px solid #E4DDD3; }
    .table td.head { background: #FAF7F2; font-weight: bold; color: #4A2C21; width: 35%; }
    .btn { display: inline-block; background: #221510; color: #FFFFFF; text-decoration: none; font-size: 12px; font-weight: bold; padding: 10px 18px; border-radius: 4px; margin-right: 10px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="alert-banner">
      <span class="badge">${priorityBadge}</span>
      <h2 style="margin: 10px 0 0; color: #FFFFFF; font-size: 18px;">
        Nouvelle opportunité : ${safeCompanyName} (${safeCountry})
      </h2>
      <div style="font-family: monospace; font-size: 12px; color: #C29958; margin-top: 4px;">
        Réf : ${safeLeadId} · Enregistré le ${new Date(lead.created_at).toLocaleString('fr-FR')}
      </div>
    </div>

    <div class="content">
      <div class="meta-box">
        <strong>ACTION REQUISE :</strong> Attribuer un ingénieur commercial et formuler une cotation sous 24h ouvrées.
      </div>

      <table class="table">
        <tr>
          <td class="head">Entreprise</td>
          <td><strong>${safeCompanyName}</strong> (TVA: ${safeVatNumber})</td>
        </tr>
        <tr>
          <td class="head">Contact</td>
          <td>
            <strong>${safeContactName}</strong><br>
            E-mail : <a href="mailto:${safeEmail}">${safeEmail}</a><br>
            Tél : ${safePhone}
          </td>
        </tr>
        <tr>
          <td class="head">Pays & Destination</td>
          <td>${safeCountry} — Port/Ville: <strong>${safeDestinationPort}</strong></td>
        </tr>
        <tr>
          <td class="head">Incoterm Souhaité</td>
          <td>${safeIncoterm}</td>
        </tr>
        <tr>
          <td class="head">Volume / Échantillon</td>
          <td><strong>${safeOrderVolume}</strong></td>
        </tr>
        <tr>
          <td class="head">Produits ciblés</td>
          <td>
            <ul>
              ${safeProductsList.map((p) => `<li>${p}</li>`).join('')}
            </ul>
          </td>
        </tr>
        <tr>
          <td class="head">Projet / Spécifications</td>
          <td>${safeProjectDescription}</td>
        </tr>
        <tr>
          <td class="head">IP Détectée</td>
          <td><code>${safeIpAddress}</code></td>
        </tr>
      </table>

      <div style="margin-top: 24px;">
        <a href="mailto:${safeEmail}?subject=Suite%20%C3%A0%20votre%20demande%20de%20cotation%20${safeLeadId}" class="btn">
          Répondre au Prospect
        </a>
        <a href="${SITE_URL}/api/leads/${safeLeadId}" class="btn" style="background: #C29958; color: #221510;">
          Voir la Fiche Lead API (JSON)
        </a>
      </div>
    </div>
  </div>
</body>
</html>`;
}

/**
 * 3. Envoie un e-mail via le fournisseur transactionnel actif (Resend, Brevo/SMTP, ou Archivage Dev)
 */
async function dispatchEmail(params: {
  to: string;
  subject: string;
  html: string;
  leadId: string;
  type: 'CUSTOMER' | 'INTERNAL';
}): Promise<{ success: boolean; provider: string; messageId?: string }> {
  const { to, subject, html, leadId, type } = params;

  // 1. Envoi via Resend API si disponible
  if (resendClient) {
    try {
      const data = await resendClient.emails.send({
        from: `${SENDER_NAME} <${SENDER_EMAIL}>`,
        to: [to],
        subject,
        html,
      });
      console.log(`[Resend API] ✅ E-mail ${type} envoyé à ${to} (ID: ${data.data?.id})`);
      return { success: true, provider: 'resend', messageId: data.data?.id };
    } catch (err) {
      console.error(`[Resend API] ❌ Échec d'envoi vers ${to}:`, err);
    }
  }

  // 2. Envoi via SMTP professionnel (Brevo, SendGrid, Postmark) si disponible
  if (smtpTransporter) {
    try {
      const info = await smtpTransporter.sendMail({
        from: `"${SENDER_NAME}" <${SENDER_EMAIL}>`,
        to,
        subject,
        html,
      });
      console.log(`[SMTP Provider] ✅ E-mail ${type} envoyé à ${to} (MessageId: ${info.messageId})`);
      return { success: true, provider: 'smtp', messageId: info.messageId };
    } catch (err) {
      console.error(`[SMTP Provider] ❌ Échec SMTP vers ${to}:`, err);
    }
  }

  // 3. Fallback / Mode Dev Local : Archivage sécurisé dans sent-emails
  const filename = `${leadId}_${type.toLowerCase()}_${Date.now()}.html`;
  const filePath = path.resolve(EMAILS_ARCHIVE_DIR, filename);
  fs.writeFileSync(filePath, html, 'utf-8');

  console.log(
    `[Email Service (Mode Simulé/Dev)] 📄 E-mail ${type} archivé localement :\n` +
    `  ↳ Destinataire: ${to}\n` +
    `  ↳ Objet: ${subject}\n` +
    `  ↳ Fichier HTML: ${filePath}`
  );

  return { success: true, provider: 'local_archive', messageId: filename };
}

/**
 * 4. Point d'entrée pour router les deux e-mails à la création d'un lead
 */
export async function sendRfqEmails(lead: B2BLeadRecord): Promise<{
  customerEmail: { success: boolean; provider: string };
  internalAlert: { success: boolean; provider: string };
}> {
  console.log(`[Email Service] Déclenchement du routage des e-mails pour le lead ${lead.id}...`);

  // E-mail A : Accusé de réception client
  const customerHtml = generateCustomerEmailHtml(lead);
  const customerResult = await dispatchEmail({
    to: lead.email,
    subject: `Accusé de réception de votre demande B2B — Réf. ${lead.id} | Usine Cacao Ivoire`,
    html: customerHtml,
    leadId: lead.id,
    type: 'CUSTOMER',
  });

  // E-mail B : Alerte interne équipe commerciale export
  const internalHtml = generateInternalAlertEmailHtml(lead);
  const internalResult = await dispatchEmail({
    to: COMMERCIAL_EMAIL_TO,
    subject: `[LEAD B2B URGENT] Nouvelle demande de cotation : ${escapeHtml(lead.company_name)} (${escapeHtml(lead.country)}) — ${escapeHtml(lead.id)}`,
    html: internalHtml,
    leadId: lead.id,
    type: 'INTERNAL',
  });

  return {
    customerEmail: customerResult,
    internalAlert: internalResult,
  };
}
