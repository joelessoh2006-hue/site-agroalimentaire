import React from 'react';
import { Send } from 'lucide-react';

interface HeaderProps {
  currentView: string;
  onNavigate: (view: string) => void;
  onOpenRfq: () => void;
  onOpenCoa: () => void;
  rfqItemsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  onOpenRfq,
  onOpenCoa,
  rfqItemsCount,
}) => {
  return (
    <header className="sticky top-0 z-50 bg-[#fdf9f3]/95 backdrop-blur-md border-b border-[#E4DDD3]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark in Display font */}
        <button
          onClick={() => onNavigate('home')}
          className="text-left group cursor-pointer focus:outline-none"
        >
          <span className="font-display text-xl sm:text-2xl font-bold tracking-tight text-[#221510] group-hover:text-[#4A2C21] transition-colors whitespace-nowrap">
            AGRO-INDUSTRIAL COCOA
          </span>
          <span className="hidden sm:block text-[10px] font-mono text-[#C29958] font-semibold tracking-widest uppercase">
            Transformation B2B & Dérivés Purs
          </span>
        </button>

        {/* Zone 2: Clean 5-link text navigation covering the 6 pages */}
        <nav className="hidden lg:flex items-center gap-7 text-[13px] font-semibold text-[#4A2C21] tracking-wide">
          <button
            onClick={() => onNavigate('home')}
            className={`font-display uppercase tracking-wider transition-colors py-1 cursor-pointer ${
              currentView === 'home'
                ? 'text-[#221510] border-b-2 border-[#C29958]'
                : 'text-[#4A2C21]/75 hover:text-[#221510]'
            }`}
          >
            Accueil
          </button>
          <button
            onClick={() => onNavigate('savoir-faire')}
            className={`font-display uppercase tracking-wider transition-colors py-1 cursor-pointer ${
              currentView === 'savoir-faire'
                ? 'text-[#221510] border-b-2 border-[#C29958]'
                : 'text-[#4A2C21]/75 hover:text-[#221510]'
            }`}
          >
            Savoir-faire & EUDR
          </button>
          <button
            onClick={() => onNavigate('catalogue')}
            className={`font-display uppercase tracking-wider transition-colors py-1 cursor-pointer ${
              currentView === 'catalogue' || currentView === 'produit'
                ? 'text-[#221510] border-b-2 border-[#C29958]'
                : 'text-[#4A2C21]/75 hover:text-[#221510]'
            }`}
          >
            Catalogue Produits (9)
          </button>
          <button
            onClick={() => onNavigate('qualite')}
            className={`font-display uppercase tracking-wider transition-colors py-1 cursor-pointer ${
              currentView === 'qualite'
                ? 'text-[#221510] border-b-2 border-[#C29958]'
                : 'text-[#4A2C21]/75 hover:text-[#221510]'
            }`}
          >
            Qualité & Labo
          </button>
          <button
            onClick={() => onNavigate('contact')}
            className={`font-display uppercase tracking-wider transition-colors py-1 cursor-pointer ${
              currentView === 'contact'
                ? 'text-[#221510] border-b-2 border-[#C29958]'
                : 'text-[#4A2C21]/75 hover:text-[#221510]'
            }`}
          >
            Cotation RFQ & Contact
          </button>
        </nav>

        {/* Zone 3: Primary action triggers */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenCoa}
            className="hidden sm:inline-flex items-center px-3.5 py-2 text-xs font-display font-semibold uppercase tracking-wider text-[#221510] bg-[#FFFFFF] border border-[#E4DDD3] rounded-[6px] hover:border-[#C29958] hover:bg-[#FAF7F2] transition-colors whitespace-nowrap cursor-pointer"
          >
            <span>Certificat CoA</span>
          </button>

          <button
            onClick={onOpenRfq}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-display font-bold uppercase tracking-wider text-[#221510] bg-[#C29958] rounded-[6px] hover:bg-[#b08745] transition-colors whitespace-nowrap cursor-pointer border border-[#b08745]"
          >
            <Send className="w-3.5 h-3.5 text-[#221510]" />
            <span>Demande RFQ</span>
            {rfqItemsCount > 0 && (
              <span className="font-mono text-[11px] font-bold bg-[#221510] text-[#F8F4EE] px-1.5 py-0.2 rounded-[4px]">
                {rfqItemsCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile nav ribbon */}
      <div className="lg:hidden border-t border-[#E4DDD3] bg-[#F8F4EE] px-4 py-2 flex items-center justify-between overflow-x-auto gap-4 text-xs font-display uppercase tracking-wider">
        <button
          onClick={() => onNavigate('home')}
          className={`whitespace-nowrap ${currentView === 'home' ? 'text-[#221510] font-bold underline' : 'text-[#4A2C21]'}`}
        >
          Accueil
        </button>
        <button
          onClick={() => onNavigate('savoir-faire')}
          className={`whitespace-nowrap ${currentView === 'savoir-faire' ? 'text-[#221510] font-bold underline' : 'text-[#4A2C21]'}`}
        >
          Savoir-faire
        </button>
        <button
          onClick={() => onNavigate('catalogue')}
          className={`whitespace-nowrap ${currentView === 'catalogue' || currentView === 'produit' ? 'text-[#221510] font-bold underline' : 'text-[#4A2C21]'}`}
        >
          Catalogue
        </button>
        <button
          onClick={() => onNavigate('qualite')}
          className={`whitespace-nowrap ${currentView === 'qualite' ? 'text-[#221510] font-bold underline' : 'text-[#4A2C21]'}`}
        >
          Qualité
        </button>
        <button
          onClick={() => onNavigate('contact')}
          className={`whitespace-nowrap ${currentView === 'contact' ? 'text-[#221510] font-bold underline' : 'text-[#4A2C21]'}`}
        >
          RFQ & Contact
        </button>
      </div>
    </header>
  );
};
