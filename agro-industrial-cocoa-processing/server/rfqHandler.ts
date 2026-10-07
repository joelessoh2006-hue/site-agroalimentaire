import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { RfqPayloadSchema, ValidatedRfqPayload } from './validation';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const LEADS_FILE = path.resolve(__dirname, 'leads.json');

// Interface pour stocker le lead avec ses métadonnées
export interface StoredRfqLead extends ValidatedRfqPayload {
  reference: string;
  createdAt: string;
  status: 'PENDING_REVIEW' | 'ASSIGNED' | 'PROCESSED';
  ipAddress?: string;
}

/**
 * Génère une référence de dossier industrielle unique formatée
 * Ex: RFQ-2026-784920
 */
export function generateRfqReference(): string {
  const currentYear = new Date().getFullYear();
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  return `RFQ-${currentYear}-${randomNum}`;
}

/**
 * Sauvegarde le lead validé dans le fichier leads.json persistant
 */
function persistLead(lead: StoredRfqLead): void {
  try {
    let existingLeads: StoredRfqLead[] = [];
    if (fs.existsSync(LEADS_FILE)) {
      const content = fs.readFileSync(LEADS_FILE, 'utf-8');
      if (content.trim()) {
        existingLeads = JSON.parse(content);
      }
    }
    existingLeads.unshift(lead);
    fs.writeFileSync(LEADS_FILE, JSON.stringify(existingLeads, null, 2), 'utf-8');
  } catch (err) {
    console.error('[API RFQ] Erreur lors de la sauvegarde du lead dans leads.json:', err);
  }
}

/**
 * Traitement principal d'une requête RFQ
 */
export async function processRfqSubmission(
  rawBody: unknown,
  clientIp?: string
): Promise<{
  statusCode: number;
  body: {
    success: boolean;
    reference?: string;
    message: string;
    errors?: Array<{ field: string; message: string }>;
    leadSummary?: {
      reference: string;
      companyName: string;
      contactName: string;
      contactEmail: string;
      itemsCount: number;
      createdAt: string;
    };
  };
}> {
  // 1. Validation de la structure du payload
  const parseResult = RfqPayloadSchema.safeParse(rawBody);

  if (!parseResult.success) {
    const formattedErrors = parseResult.error.issues.map((err) => ({
      field: err.path.join('.'),
      message: err.message,
    }));

    return {
      statusCode: 400,
      body: {
        success: false,
        message: 'Échec de validation des données transmises.',
        errors: formattedErrors,
      },
    };
  }

  const validatedData = parseResult.data;

  // 2. Traitement du champ Honeypot anti-bot
  // Si le champ honeypot est renseigné par un robot, on feint le succès sans rien persister
  if (validatedData.honeypot && validatedData.honeypot.length > 0) {
    console.warn(`[Anti-Spam] Bot submission intercepted via honeypot from IP: ${clientIp || 'unknown'}`);
    return {
      statusCode: 200,
      body: {
        success: true,
        reference: generateRfqReference(),
        message: 'Demande reçue et enregistrée.',
      },
    };
  }

  // 3. Création et enregistrement du dossier commercial B2B
  const reference = generateRfqReference();
  const createdAt = new Date().toISOString();

  const storedLead: StoredRfqLead = {
    ...validatedData,
    reference,
    createdAt,
    status: 'PENDING_REVIEW',
    ipAddress: clientIp,
  };

  persistLead(storedLead);

  console.log(`[API RFQ] ✅ Nouveau dossier créé : ${reference} (${validatedData.companyName} - ${validatedData.selectedProductIds.length} produit(s))`);

  return {
    statusCode: 201,
    body: {
      success: true,
      reference,
      message: 'Votre demande de cotation et d’échantillons a été enregistrée avec succès par notre usine.',
      leadSummary: {
        reference,
        companyName: validatedData.companyName,
        contactName: validatedData.contactName,
        contactEmail: validatedData.contactEmail,
        itemsCount: validatedData.selectedProductIds.length,
        createdAt,
      },
    },
  };
}
