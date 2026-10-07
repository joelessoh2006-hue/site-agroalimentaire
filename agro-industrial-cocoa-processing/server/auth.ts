import type { IncomingMessage } from 'http';
import crypto from 'crypto';

// Clé secrète d'administration réservée au développement local hors ligne
const DEFAULT_DEV_ADMIN_KEY = 'cacao_admin_secret_key_2026';

export function getAdminApiKey(): string {
  const envKey = process.env.ADMIN_API_KEY;

  if (process.env.NODE_ENV === 'production') {
    if (!envKey || envKey.trim().length === 0) {
      throw new Error(
        "Sécurité critique : la variable d'environnement ADMIN_API_KEY est obligatoire en production."
      );
    }
    return envKey.trim();
  }

  return envKey ? envKey.trim() : DEFAULT_DEV_ADMIN_KEY;
}

/**
 * Compare deux secrets en temps constant via SHA-256 pour neutraliser les attaques temporelles.
 */
function timingSafeCompare(a: string, b: string): boolean {
  const hashA = crypto.createHash('sha256').update(a).digest();
  const hashB = crypto.createHash('sha256').update(b).digest();
  return crypto.timingSafeEqual(hashA, hashB);
}

/**
 * Valide les en-têtes d'authentification de la requête HTTP
 * Supporte :
 * 1. Authorization: Bearer <ADMIN_API_KEY>
 * 2. x-admin-key: <ADMIN_API_KEY>
 */
export function isAuthorizedAdminRequest(
  req: IncomingMessage | { headers: Record<string, string | string[] | undefined> }
): {
  authorized: boolean;
  statusCode?: number;
  message?: string;
} {
  let expectedKey: string;
  try {
    expectedKey = getAdminApiKey();
  } catch (err) {
    return {
      authorized: false,
      statusCode: 500,
      message: err instanceof Error ? err.message : 'Erreur de configuration serveur.',
    };
  }

  const authHeader = req.headers['authorization'];
  const customKeyHeader = req.headers['x-admin-key'];

  let providedToken: string | null = null;

  if (typeof authHeader === 'string') {
    const parts = authHeader.trim().split(' ');
    if (parts.length === 2 && parts[0].toLowerCase() === 'bearer') {
      providedToken = parts[1];
    } else {
      providedToken = authHeader.trim();
    }
  } else if (typeof customKeyHeader === 'string') {
    providedToken = customKeyHeader.trim();
  }

  if (!providedToken) {
    return {
      authorized: false,
      statusCode: 401,
      message:
        "Authentification requise. Veuillez fournir un jeton via l'en-tête 'Authorization: Bearer <ADMIN_API_KEY>' ou 'x-admin-key'.",
    };
  }

  // Comparaison cryptographique stricte à temps constant
  if (!timingSafeCompare(providedToken, expectedKey)) {
    return {
      authorized: false,
      statusCode: 403,
      message: "Accès refusé. Clé d'autorisation administrateur invalide.",
    };
  }

  return { authorized: true };
}
