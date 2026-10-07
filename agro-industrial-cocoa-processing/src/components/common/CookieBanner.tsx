import React, { useState, useEffect } from 'react';
import { Cookie } from 'lucide-react';

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
      aria-label="Gestion des cookies"
      className="fixed bottom-20 md:bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-50 bg-[#221510] text-[#F8F4EE] border border-[#4A2C21] rounded-[8px] p-4 shadow-xl"
    >
      <div className="flex items-start gap-3">
        <Cookie className="w-5 h-5 text-[#C29958] shrink-0 mt-0.5" />
        <div className="space-y-2 flex-1">
          <p className="text-xs text-[#E4DDD3]/90 leading-relaxed">
            Nous utilisons uniquement des cookies techniques essentiels et une mesure d'audience anonyme exempte de traçage publicitaire.
          </p>
          <div className="flex items-center gap-2 text-[11px]">
            <button
              type="button"
              onClick={onOpenPrivacy}
              className="text-[#C29958] hover:underline cursor-pointer"
            >
              Consulter la politique de confidentialité
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-2.5 mt-3 pt-3 border-t border-[#4A2C21]">
        <button
          type="button"
          onClick={() => handleDecision('refused')}
          className="px-3 py-1.5 text-xs text-[#E4DDD3]/80 hover:text-white bg-transparent hover:bg-[#3c251c] rounded transition-colors"
        >
          Refuser
        </button>
        <button
          type="button"
          onClick={() => handleDecision('accepted')}
          className="px-4 py-1.5 text-xs font-semibold bg-[#C29958] hover:bg-[#a88243] text-[#221510] rounded transition-colors"
        >
          Accepter
        </button>
      </div>
    </aside>
  );
};
