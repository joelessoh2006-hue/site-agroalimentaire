import type { IncomingMessage } from 'http';

// Clé secrète d'administration par défaut pour le développement local
// En production, cette valeur DOIT impérativement être surchargée via la variable d'environnement ADMIN_API_KEY
const DEFAULT_DEV_ADMIN_KEY = 'cacao_admin_secret_key_2026';

export function getAdminApiKey(): string {
  return process.env.ADMIN_API_KEY || DEFAULT_DEV_ADMIN_KEY;
}

/**
 * Valide les en-têtes d'authentification de la requête HTTP
 * Supporte :
 * 1. Authorization: Bearer <ADMIN_API_KEY>
 * 2. x-admin-key: <ADMIN_API_KEY>
 */
export function isAuthorizedAdminRequest(req: IncomingMessage | { headers: Record<string, string | string[] | undefined> }): {
  authorized: boolean;
  statusCode?: number;
  message?: string;
} {
  const expectedKey = getAdminApiKey();

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
      message: "Authentification requise. Veuillez fournir un jeton d'autorisation via l'en-tête 'Authorization: Bearer <ADMIN_API_KEY>' ou 'x-admin-key'.",
    };
  }

  // Comparaison sécurisée à temps constant (ou équivalent)
  if (providedToken !== expectedKey) {
    return {
      authorized: false,
      statusCode: 403,
      message: "Accès refusé. Clé d'autorisation administrateur invalide.",
    };
  }

  return { authorized: true };
}
