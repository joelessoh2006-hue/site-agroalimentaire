import type { IncomingMessage, ServerResponse } from 'http';

/**
 * Module centralisé de gestion des En-têtes HTTP de Sécurité
 * Conforme aux standards et recommandations OWASP Secure Headers Project
 */

export interface SecurityHeadersConfig {
  isDev?: boolean;
}

/**
 * Construit la chaîne de directive Content-Security-Policy (CSP)
 */
export function buildContentSecurityPolicy(isDev: boolean = false): string {
  const scriptSrc = [
    "'self'",
    "'unsafe-inline'",
    'https://challenges.cloudflare.com',
  ];

  if (isDev) {
    // Requis par Vite HMR et les source-maps en mode dev
    scriptSrc.push("'unsafe-eval'");
  }

  const connectSrc = [
    "'self'",
    'https://challenges.cloudflare.com',
    'ws:',
    'wss:',
  ];

  const styleSrc = [
    "'self'",
    "'unsafe-inline'",
    'https://fonts.googleapis.com',
  ];

  const fontSrc = [
    "'self'",
    'data:',
    'https://fonts.gstatic.com',
  ];

  const imgSrc = [
    "'self'",
    'data:',
    'blob:',
    'https://images.unsplash.com',
  ];

  const frameSrc = [
    "'self'",
    'https://challenges.cloudflare.com',
  ];

  const directives: Record<string, string[]> = {
    'default-src': ["'self'"],
    'script-src': scriptSrc,
    'style-src': styleSrc,
    'font-src': fontSrc,
    'img-src': imgSrc,
    'connect-src': connectSrc,
    'frame-src': frameSrc,
    'frame-ancestors': ["'none'"],
    'object-src': ["'none'"],
    'base-uri': ["'self'"],
    'form-action': ["'self'"],
  };

  if (!isDev) {
    // Force HTTPS en production
    directives['upgrade-insecure-requests'] = [];
  }

  return Object.entries(directives)
    .map(([directive, values]) => {
      if (values.length === 0) return directive;
      return `${directive} ${values.join(' ')}`;
    })
    .join('; ');
}

/**
 * Retourne le dictionnaire complet des en-têtes de sécurité OWASP
 */
export function getSecurityHeaders(config: SecurityHeadersConfig = {}): Record<string, string> {
  const isDev = config.isDev ?? process.env.NODE_ENV !== 'production';

  const headers: Record<string, string> = {
    // 1. Content-Security-Policy (CSP)
    'Content-Security-Policy': buildContentSecurityPolicy(isDev),

    // 2. Anti-Clickjacking (Interdit l'encadrement en iframe)
    'X-Frame-Options': 'DENY',

    // 3. Strict-Transport-Security (HSTS - 1 an, sous-domaines et preload)
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',

    // 4. Contrôle de transmission des référents HTTP
    'Referrer-Policy': 'strict-origin-when-cross-origin',

    // 5. Permissions-Policy (Désactivation des capteurs non requis pour une app B2B)
    'Permissions-Policy':
      'camera=(), microphone=(), geolocation=(), payment=(), usb=(), screen-wake-lock=(), accelerometer=(), gyroscope=(), magnetometer=()',

    // 6. Protection contre le MIME-sniffing
    'X-Content-Type-Options': 'nosniff',

    // 7. Isolation d'origine pour éviter les attaques cross-window
    'Cross-Origin-Opener-Policy': 'same-origin-allow-popups',

    // 8. Désactivation de l'ancien filtre XSS à risque (recommandation OWASP)
    'X-XSS-Protection': '0',
  };

  return headers;
}

/**
 * Applique l'ensemble des en-têtes de sécurité sur une réponse HTTP
 */
export function applySecurityHeaders(
  res: ServerResponse,
  config: SecurityHeadersConfig = {}
): void {
  const headers = getSecurityHeaders(config);
  for (const [key, value] of Object.entries(headers)) {
    // Ne pas écraser si déjà explicitement positionné avec une valeur plus spécifique
    if (!res.hasHeader(key)) {
      res.setHeader(key, value);
    }
  }
}

/**
 * Middleware Express / Connect pour injecter les en-têtes de sécurité sur toutes les requêtes
 */
export function securityHeadersMiddleware(
  req: IncomingMessage,
  res: ServerResponse,
  next: () => void
): void {
  applySecurityHeaders(res);
  next();
}
