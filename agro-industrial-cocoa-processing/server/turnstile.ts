/**
 * Module de vérification cryptographique Cloudflare Turnstile
 * Protège les formulaires contre les bots headless et les attaques de spam
 */

// Clés officielles Cloudflare pour environnement de développement / test
// Voir documentation officielle Cloudflare Turnstile : https://developers.cloudflare.com/turnstile/troubleshooting/testing/
export const CLOUDFLARE_TEST_SITE_KEY_PASS = '1x00000000000000000000AA'; // Always passes (visible/invisible)
export const CLOUDFLARE_TEST_SITE_KEY_BLOCK = '2x00000000000000000000AB'; // Always blocks
export const CLOUDFLARE_TEST_SITE_KEY_CHALLENGE = '3x00000000000000000000FF'; // Always interactive challenge

export const CLOUDFLARE_TEST_SECRET_PASS = '1x0000000000000000000000000000000AA'; // Always passes
export const CLOUDFLARE_TEST_SECRET_FAIL = '2x0000000000000000000000000000000AA'; // Always fails (invalid-input-response)
export const CLOUDFLARE_TEST_SECRET_EXPIRE = '3x0000000000000000000000000000000AA'; // Timeout or duplicate

export const CLOUDFLARE_TEST_SITE_KEY = CLOUDFLARE_TEST_SITE_KEY_PASS;
export const CLOUDFLARE_TEST_SECRET_KEY = CLOUDFLARE_TEST_SECRET_PASS;

const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

export function getTurnstileSecretKey(tokenOverride?: string): string {
  if (tokenOverride === 'force_fail' || tokenOverride === 'invalid_test_token') {
    return CLOUDFLARE_TEST_SECRET_FAIL;
  }
  return process.env.TURNSTILE_SECRET_KEY || CLOUDFLARE_TEST_SECRET_PASS;
}

export function getTurnstileSiteKey(): string {
  return process.env.VITE_TURNSTILE_SITE_KEY || process.env.TURNSTILE_SITE_KEY || CLOUDFLARE_TEST_SITE_KEY;
}

export interface TurnstileVerificationResult {
  success: boolean;
  hostname?: string;
  challengeTs?: string;
  errorCodes?: string[];
  message?: string;
}

/**
 * Valide le token cryptographique Cloudflare Turnstile auprès de l'API Cloudflare
 */
export async function verifyTurnstileToken(
  token: string | undefined | null,
  clientIp?: string
): Promise<TurnstileVerificationResult> {
  const secretKey = getTurnstileSecretKey(token || undefined);

  // Si le token n'est pas fourni
  if (!token || typeof token !== 'string' || token.trim().length === 0) {
    // Si en dev sans token particulier (permet les tests automatisés internes ou curl)
    if (process.env.NODE_ENV !== 'production' && !process.env.TURNSTILE_SECRET_KEY) {
      return { success: true };
    }

    return {
      success: false,
      errorCodes: ['missing-input-response'],
      message: 'Validation de sécurité obligatoire : le jeton Cloudflare Turnstile est manquant.',
    };
  }

  try {
    const formData = new URLSearchParams();
    formData.append('secret', secretKey);
    formData.append('response', token.trim());
    if (clientIp) {
      formData.append('remoteip', clientIp);
    }

    const response = await fetch(TURNSTILE_VERIFY_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
    });

    if (!response.ok) {
      console.error(`[Turnstile] Erreur HTTP lors de l'appel à Cloudflare: ${response.status}`);
      // Fail open avec log si l'API Cloudflare est indisponible temporairement
      return {
        success: true,
        message: 'Bypass d’urgence : API de validation temporairement indisponible.',
      };
    }

    const data = (await response.json()) as {
      success: boolean;
      'error-codes'?: string[];
      challenge_ts?: string;
      hostname?: string;
    };

    if (data.success) {
      return {
        success: true,
        hostname: data.hostname,
        challengeTs: data.challenge_ts,
      };
    }

    console.warn(`[Turnstile] ❌ Échec de vérification du jeton :`, data['error-codes']);
    return {
      success: false,
      errorCodes: data['error-codes'] || ['invalid-input-response'],
      message: 'Échec de la validation de sécurité anti-bot (Cloudflare Turnstile). Veuillez recharger et réessayer.',
    };
  } catch (error) {
    console.error('[Turnstile] Exception réseau lors de la validation Cloudflare :', error);
    // En cas de panne réseau externe vers Cloudflare, on logge mais on ne bloque pas un client légitime
    return {
      success: true,
      message: 'Validation contournée suite à une panne réseau vers Cloudflare.',
    };
  }
}
