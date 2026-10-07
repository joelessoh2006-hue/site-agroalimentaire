import type { IncomingMessage } from 'http';

interface RateLimitRule {
  windowMs: number; // Durée de la fenêtre en millisecondes
  maxRequests: number; // Nombre maximum de requêtes autorisées
  message: string;
}

interface ClientRecord {
  timestamps: number[];
}

// Règles de limitation de débit
export const RATE_LIMIT_RULES = {
  // Soumission de formulaires critiques RFQ & Contact (5 soumissions / 15 minutes)
  RFQ_SUBMISSION: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 5,
    message: 'Limite de demandes de cotation atteinte pour cette adresse IP (maximum 5 par tranche de 15 minutes). Veuillez patienter avant de renouveler votre soumission.',
  } satisfies RateLimitRule,

  // Téléchargement des documents techniques PDF (30 requêtes / minute)
  DOCS_DOWNLOAD: {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 30,
    message: 'Fréquence de téléchargement de documents techniques anormalement élevée. Veuillez patienter 60 secondes.',
  } satisfies RateLimitRule,
};

// Stockage en mémoire des compteurs d'IPs par scope
class MemoryRateLimiter {
  private stores: Map<string, Map<string, ClientRecord>> = new Map();
  private cleanupInterval: NodeJS.Timeout;

  constructor() {
    // Nettoyage régulier toutes les 5 minutes pour éviter l'engorgement mémoire
    this.cleanupInterval = setInterval(() => {
      this.cleanup();
    }, 5 * 60 * 1000);

    // Permet au processus Node de se terminer sans être bloqué par ce timer
    if (this.cleanupInterval.unref) {
      this.cleanupInterval.unref();
    }
  }

  /**
   * Vérifie et incrémente le compteur pour un client donné
   */
  public check(
    scope: string,
    ip: string,
    rule: RateLimitRule
  ): {
    allowed: boolean;
    currentCount: number;
    limit: number;
    remaining: number;
    resetTimeMs: number;
    retryAfterSeconds: number;
    message?: string;
  } {
    const now = Date.now();

    if (!this.stores.has(scope)) {
      this.stores.set(scope, new Map());
    }

    const scopeStore = this.stores.get(scope)!;
    let client = scopeStore.get(ip);

    if (!client) {
      client = { timestamps: [] };
      scopeStore.set(ip, client);
    }

    // Filtrer les timestamps en dehors de la fenêtre glissante
    const windowStart = now - rule.windowMs;
    client.timestamps = client.timestamps.filter((ts) => ts > windowStart);

    const oldestTimestamp = client.timestamps[0] || now;
    const resetTimeMs = oldestTimestamp + rule.windowMs;
    const retryAfterSeconds = Math.max(1, Math.ceil((resetTimeMs - now) / 1000));

    if (client.timestamps.length >= rule.maxRequests) {
      return {
        allowed: false,
        currentCount: client.timestamps.length,
        limit: rule.maxRequests,
        remaining: 0,
        resetTimeMs,
        retryAfterSeconds,
        message: rule.message,
      };
    }

    // Enregistrer cette requête
    client.timestamps.push(now);

    return {
      allowed: true,
      currentCount: client.timestamps.length,
      limit: rule.maxRequests,
      remaining: Math.max(0, rule.maxRequests - client.timestamps.length),
      resetTimeMs,
      retryAfterSeconds: 0,
    };
  }

  /**
   * Nettoie les données expirées
   */
  public cleanup(): void {
    const now = Date.now();
    for (const [scope, store] of this.stores.entries()) {
      const rule = scope === 'rfq' ? RATE_LIMIT_RULES.RFQ_SUBMISSION : RATE_LIMIT_RULES.DOCS_DOWNLOAD;
      const windowStart = now - rule.windowMs;

      for (const [ip, client] of store.entries()) {
        client.timestamps = client.timestamps.filter((ts) => ts > windowStart);
        if (client.timestamps.length === 0) {
          store.delete(ip);
        }
      }
    }
  }

  /**
   * Réinitialise les compteurs (utile pour les tests)
   */
  public reset(): void {
    this.stores.clear();
  }
}

export const rateLimiter = new MemoryRateLimiter();

/**
 * Extrait l'adresse IP cliente de manière fiable
 */
export function getClientIp(req: IncomingMessage | { headers: Record<string, string | string[] | undefined>; socket?: { remoteAddress?: string }; ip?: string }): string {
  // Support Express req.ip
  if ('ip' in req && typeof req.ip === 'string' && req.ip) {
    return normalizeIp(req.ip);
  }

  // Header standard x-forwarded-for (ex: Cloudflare, proxies, load balancers)
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.length > 0) {
    const firstIp = forwarded.split(',')[0].trim();
    if (firstIp) return normalizeIp(firstIp);
  }

  // Header x-real-ip (Nginx)
  const realIp = req.headers['x-real-ip'];
  if (typeof realIp === 'string' && realIp.trim().length > 0) {
    return normalizeIp(realIp.trim());
  }

  // Socket IP
  const socketAddress = 'socket' in req && req.socket ? req.socket.remoteAddress : undefined;
  if (typeof socketAddress === 'string') {
    return normalizeIp(socketAddress);
  }

  return '127.0.0.1';
}

function normalizeIp(ip: string): string {
  // Convertit ::ffff:127.0.0.1 en 127.0.0.1
  if (ip.startsWith('::ffff:')) {
    return ip.replace('::ffff:', '');
  }
  if (ip === '::1') {
    return '127.0.0.1';
  }
  return ip;
}
