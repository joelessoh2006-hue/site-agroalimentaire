import React, { useEffect, useRef, useState } from 'react';
import { ShieldCheck, AlertCircle, RefreshCw } from 'lucide-react';

// Clé de test publique officielle Cloudflare Turnstile (Always passes - Invisible)
// https://developers.cloudflare.com/turnstile/troubleshooting/testing/
export const DEFAULT_CLOUDFLARE_TEST_SITE_KEY = '1x00000000000000000000BB';

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement | string,
        params: {
          sitekey: string;
          callback?: (token: string) => void;
          'error-callback'?: (errorCode?: string) => void;
          'expired-callback'?: () => void;
          theme?: 'light' | 'dark' | 'auto';
          size?: 'normal' | 'compact' | 'flexible';
          appearance?: 'always' | 'execute' | 'interaction-only';
          action?: string;
          cData?: string;
        }
      ) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
      getResponse: (widgetId: string) => string | undefined;
    };
    onloadTurnstileCallback?: () => void;
  }
}

export interface TurnstileWidgetProps {
  siteKey?: string;
  action?: string;
  onVerify: (token: string) => void;
  onError?: (errorCode?: string) => void;
  onExpire?: () => void;
  theme?: 'light' | 'dark' | 'auto';
  size?: 'normal' | 'compact' | 'flexible';
  className?: string;
}

export const TurnstileWidget: React.FC<TurnstileWidgetProps> = ({
  siteKey,
  action = 'rfq-submission',
  onVerify,
  onError,
  onExpire,
  theme = 'light',
  size = 'flexible',
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [loadState, setLoadState] = useState<'loading' | 'ready' | 'verified' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const effectiveSiteKey =
    siteKey ||
    (typeof import.meta !== 'undefined' && import.meta.env?.VITE_TURNSTILE_SITE_KEY) ||
    DEFAULT_CLOUDFLARE_TEST_SITE_KEY;

  useEffect(() => {
    let isMounted = true;

    const renderWidget = () => {
      if (!isMounted || !containerRef.current || !window.turnstile) return;

      // Nettoyer l'ancien widget s'il existe déjà
      if (widgetIdRef.current) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch {
          // ignore
        }
        widgetIdRef.current = null;
      }

      try {
        const id = window.turnstile.render(containerRef.current, {
          sitekey: effectiveSiteKey,
          theme,
          size,
          action,
          callback: (token: string) => {
            if (!isMounted) return;
            setLoadState('verified');
            setErrorMessage(null);
            onVerify(token);
          },
          'error-callback': (code?: string) => {
            if (!isMounted) return;
            setLoadState('error');
            const msg = 'La vérification de sécurité a échoué ou a été interrompue.';
            setErrorMessage(msg);
            if (onError) onError(code);
          },
          'expired-callback': () => {
            if (!isMounted) return;
            setLoadState('ready');
            if (onExpire) onExpire();
          },
        });

        widgetIdRef.current = id;
        setLoadState('ready');
      } catch (err) {
        console.warn('[Turnstile] Erreur lors du rendu du widget :', err);
        setLoadState('error');
        setErrorMessage('Impossible d’initialiser le composant de sécurité.');
      }
    };

    // Vérifier si le script Cloudflare Turnstile est déjà injecté
    const scriptId = 'cf-turnstile-script';
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;

    if (window.turnstile) {
      renderWidget();
    } else {
      if (!script) {
        script = document.createElement('script');
        script.id = scriptId;
        script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
        script.async = true;
        script.defer = true;
        script.onload = () => {
          if (isMounted) renderWidget();
        };
        script.onerror = () => {
          if (isMounted) {
            setLoadState('error');
            setErrorMessage('Le script de sécurité Cloudflare n’a pas pu être chargé.');
          }
        };
        document.head.appendChild(script);
      } else {
        // Le script est déjà en cours de chargement
        const checkInterval = window.setInterval(() => {
          if (window.turnstile) {
            window.clearInterval(checkInterval);
            if (isMounted) renderWidget();
          }
        }, 100);

        return () => {
          window.clearInterval(checkInterval);
        };
      }
    }

    return () => {
      isMounted = false;
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch {
          // ignore
        }
        widgetIdRef.current = null;
      }
    };
  }, [effectiveSiteKey, theme, size, action, onVerify, onError, onExpire]);

  const handleRetry = () => {
    setLoadState('loading');
    setErrorMessage(null);
    if (widgetIdRef.current && window.turnstile) {
      try {
        window.turnstile.reset(widgetIdRef.current);
        setLoadState('ready');
      } catch {
        // Force refresh container
      }
    }
  };

  return (
    <div
      className={`relative py-1 text-xs ${className}`}
      data-testid="cloudflare-turnstile-container"
    >
      {/* Conteneur DOM requis par Cloudflare Turnstile (inclusif et non intrusif) */}
      <div
        ref={containerRef}
        className="flex items-center justify-center empty:hidden"
      />

      {loadState === 'error' && (
        <div className="mt-2 flex items-center justify-between text-[11px] text-[#A0522D] bg-[#F8F4EE] p-2.5 rounded-[6px] border border-[#E4DDD3]">
          <div className="flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{errorMessage || 'Échec de la validation de sécurité'}</span>
          </div>
          <button
            type="button"
            onClick={handleRetry}
            className="flex items-center gap-1 font-semibold text-[#9C7336] hover:text-[#221510] cursor-pointer"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Réessayer</span>
          </button>
        </div>
      )}

      {/* Mention de réassurance technique sobre et discrète */}
      <div className="flex items-center justify-between text-[11px] text-[#78716C] pt-1">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-[#2E5A36]" />
          <span>Protection anti-bot invisible active (Cloudflare Turnstile)</span>
        </div>
        <span className="font-mono text-[10px] text-[#78716C]/70">
          Privacy-First · Sans friction
        </span>
      </div>
    </div>
  );
};
