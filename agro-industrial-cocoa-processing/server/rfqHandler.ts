import { RfqPayloadSchema, ValidatedRfqPayload } from './validation';
import { saveLeadToDatabase, B2BLeadRecord, getAllLeads, getLeadById, updateLeadStatus } from './db';

export { getAllLeads, getLeadById, updateLeadStatus };

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
      status: string;
    };
  };
}> {
  // 1. Validation de la structure du payload avec Zod & Sanitization
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

  const validatedData: ValidatedRfqPayload = parseResult.data;

  // 2. Traitement du champ Honeypot anti-bot
  // Si le champ honeypot est renseigné par un robot, on feint le succès sans rien persister
  if (validatedData.honeypot && validatedData.honeypot.length > 0) {
    console.warn(`[Anti-Spam] Bot submission interceptée via honeypot depuis IP: ${clientIp || 'inconnue'}`);
    return {
      statusCode: 200,
      body: {
        success: true,
        reference: generateRfqReference(),
        message: 'Demande reçue et enregistrée.',
      },
    };
  }

  // 3. Création et persistance relationnelle du prospect B2B
  const reference = generateRfqReference();
  const createdAt = new Date().toISOString();
  const isSample = validatedData.requestType === 'sample' ? 1 : 0;
  const orderVolume =
    validatedData.requestType === 'sample'
      ? `Échantillon R&D ${validatedData.sampleSize || '500g'}`
      : validatedData.targetVolume || '';

  const leadRecord: B2BLeadRecord = {
    id: reference,
    created_at: createdAt,
    company_name: validatedData.companyName,
    contact_name: validatedData.contactName,
    email: validatedData.contactEmail,
    phone: validatedData.contactPhone || '',
    country: validatedData.country,
    incoterm: validatedData.incoterm || '',
    products_requested: JSON.stringify(validatedData.selectedProductIds),
    order_volume: orderVolume,
    is_sample_request: isSample,
    status: 'nouveau',
    vat_number: validatedData.vatNumber || '',
    destination_port: validatedData.destinationPort,
    project_description: validatedData.projectDescription || '',
    ip_address: clientIp || '127.0.0.1',
    request_type: validatedData.requestType,
  };

  // Sauvegarde dans la base de données relationnelle SQLite + miroir JSON + Supabase (si configuré)
  await saveLeadToDatabase(leadRecord);

  console.log(`[API RFQ] ✅ Nouveau prospect persistant sauvegardé : ${reference} (${leadRecord.company_name})`);

  return {
    statusCode: 201,
    body: {
      success: true,
      reference,
      message: 'Votre demande de cotation et d’échantillons a été enregistrée avec succès par notre usine.',
      leadSummary: {
        reference,
        companyName: leadRecord.company_name,
        contactName: leadRecord.contact_name,
        contactEmail: leadRecord.email,
        itemsCount: validatedData.selectedProductIds.length,
        createdAt,
        status: leadRecord.status,
      },
    },
  };
}
