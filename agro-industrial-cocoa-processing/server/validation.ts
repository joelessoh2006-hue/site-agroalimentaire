import { z } from 'zod';

// Liste des domaines de messagerie temporaire / jetable les plus répandus
export const DISPOSABLE_EMAIL_DOMAINS = new Set([
  '10minutemail.com',
  '10minutemail.net',
  'tempmail.com',
  'temp-mail.org',
  'temp-mail.io',
  'mailinator.com',
  'guerrillamail.com',
  'guerrillamail.net',
  'guerrillamail.org',
  'sharklasers.com',
  'yopmail.com',
  'yopmail.fr',
  'yopmail.net',
  'trashmail.com',
  'trashmail.net',
  'dispostable.com',
  'getairmail.com',
  'mohmal.com',
  'burnermail.io',
  'fakeinbox.com',
  'crazymailing.com',
  'fakemailgenerator.com',
  'throwawaymail.com',
  'mytemp.email',
  'maildrop.cc',
  'inboxkitten.com',
  'nada.ltd',
  'getnada.com',
]);

/**
 * Fonction de sanitization pour neutraliser les injections XSS et balises indésirables
 */
export function sanitizeString(input: string): string {
  if (!input || typeof input !== 'string') return '';
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Supprime les blocs <script>
    .replace(/<[^>]+>/g, '') // Supprime les balises HTML brutes
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '') // Supprime les caractères de contrôle ASCII
    .trim();
}

/**
 * Vérifie si une adresse e-mail appartient à un fournisseur jetable
 */
export function isDisposableEmail(email: string): boolean {
  if (!email || !email.includes('@')) return false;
  const domain = email.split('@')[1]?.toLowerCase().trim();
  return domain ? DISPOSABLE_EMAIL_DOMAINS.has(domain) : false;
}

/**
 * Schéma Zod strict pour la validation du payload RFQ / Contact B2B
 */
export const RfqPayloadSchema = z.object({
  requestType: z.enum(['quote', 'sample', 'contract'] as const, {
    message: 'Le type de demande doit être "quote", "sample" ou "contract"',
  }),

  companyName: z
    .string()
    .min(2, "Le nom de l'entreprise doit contenir au moins 2 caractères")
    .max(120, "Le nom de l'entreprise ne peut pas dépasser 120 caractères")
    .transform(sanitizeString),

  vatNumber: z
    .string()
    .max(50, 'Le numéro fiscal / TVA ne peut pas dépasser 50 caractères')
    .optional()
    .transform((val) => sanitizeString(val || '')),

  contactName: z
    .string()
    .min(2, 'Le nom du contact doit contenir au moins 2 caractères')
    .max(100, 'Le nom du contact ne peut pas dépasser 100 caractères')
    .transform(sanitizeString),

  contactEmail: z
    .string()
    .email('Format d’adresse e-mail invalide')
    .max(100, "L'adresse e-mail ne peut pas dépasser 100 caractères")
    .refine((email) => !isDisposableEmail(email), {
      message: 'Les adresses e-mails temporaires ou jetables ne sont pas acceptées pour les demandes professionnelles.',
    })
    .transform((email) => email.toLowerCase().trim()),

  contactPhone: z
    .string()
    .max(30, 'Le numéro de téléphone ne peut pas dépasser 30 caractères')
    .optional()
    .transform((val) => sanitizeString(val || '')),

  country: z
    .string()
    .min(2, 'Le pays doit être renseigné')
    .max(60, 'Le pays ne peut pas dépasser 60 caractères')
    .transform(sanitizeString),

  industrySector: z
    .string()
    .max(80, 'Le secteur d’activité ne peut pas dépasser 80 caractères')
    .default('Chocolaterie Industrielle')
    .transform(sanitizeString),

  targetVolume: z
    .string()
    .max(120, 'Le volume cible ne peut pas dépasser 120 caractères')
    .optional()
    .transform((val) => sanitizeString(val || '')),

  sampleSize: z
    .enum(['250g', '500g', '1kg'] as const)
    .optional(),

  incoterm: z
    .string()
    .max(100, "L'Incoterm ne peut pas dépasser 100 caractères")
    .optional()
    .transform((val) => sanitizeString(val || '')),

  destinationPort: z
    .string()
    .min(2, 'Le port ou lieu de livraison doit contenir au moins 2 caractères')
    .max(120, 'Le port de destination ne peut pas dépasser 120 caractères')
    .transform(sanitizeString),

  projectDescription: z
    .string()
    .max(2000, 'La description du projet ne peut pas excéder 2 000 caractères')
    .optional()
    .transform((val) => sanitizeString(val || '')),

  // Sélection obligatoire d'au moins un produit ou échantillon
  selectedProductIds: z
    .array(z.string().max(80))
    .min(1, 'Veuillez sélectionner au moins un ingrédient ou échantillon dans votre demande'),

  // Champ honeypot invisible anti-spam (doit impérativement être vide)
  honeypot: z
    .string()
    .max(0, 'Tentative de soumission automatisée détectée')
    .optional(),

  // Jeton cryptographique Cloudflare Turnstile anti-bot
  turnstileToken: z
    .string()
    .optional(),
});

export type ValidatedRfqPayload = z.infer<typeof RfqPayloadSchema>;
