import React, { useState, useEffect } from 'react';

interface CookieBannerProps {
  onOpenPrivacy: () => void;
}

const STORAGE_KEY = 'agro_cookie_consent';

export const CookieBanner: React.FC<CookieBannerProps> = ({ onOpenPrivacy }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem(STORAGE_KEY);
      if (!consent) {
        setIsVisible(true);
      }
    } catch {
      // Ignorer si localStorage inaccessible
    }
  }, []);

  const handleDecision = (decision: 'accepted' | 'refused') => {
    try {
      localStorage.setItem(STORAGE_KEY, decision);
    } catch {
      // Ignorer si localStorage inaccessible
    }
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Gestion de la confidentialité et des traceurs"
      className="fixed bottom-20 md:bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-50 bg-[#221510] text-[#F8F4EE] border border-[#4A2C21] rounded-[8px] p-4"
    >
      <div className="space-y-2">
        <div className="flex items-center justify-between border-b border-[#4A2C21] pb-2">
          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#C29958]">
            Gouvernance des Données & Traceurs (ePrivacy)
          </span>
          <span className="font-mono text-[9px] text-[#E4DDD3]/60">
            RGPD / CNIL
          </span>
        </div>

        <p className="text-xs text-[#E4DDD3]/90 leading-relaxed pt-1">
          Cette plateforme industrielle utilise uniquement des témoins techniques nécessaires au fonctionnement du panier RFQ et une mesure d'audience anonymisée exempte de profilage commercial.
        </p>

        <div className="flex items-center gap-2 text-[11px] pt-0.5">
          <button
            type="button"
            onClick={onOpenPrivacy}
            className="text-[#C29958] hover:underline cursor-pointer"
          >
            Consulter les mentions de confidentialité et d'audit
          </button>
        </div>
      </div>

      <div className="flex items-center justify-end gap-2.5 mt-3 pt-3 border-t border-[#4A2C21]">
        <button
          type="button"
          onClick={() => handleDecision('refused')}
          className="px-3 py-1.5 text-xs text-[#E4DDD3]/80 hover:text-white bg-transparent hover:bg-[#3c251c] rounded-[6px] transition-colors cursor-pointer"
        >
          Refuser
        </button>
        <button
          type="button"
          onClick={() => handleDecision('accepted')}
          className="px-4 py-1.5 text-xs font-semibold bg-[#C29958] hover:bg-[#a88243] text-[#221510] rounded-[6px] border border-[#a88243] transition-colors cursor-pointer"
        >
          Accepter
        </button>
      </div>
    </aside>
  );
};
