import React from 'react';

interface NotFoundViewProps {
  onNavigate: (view: string, productId?: string) => void;
}

export const NotFoundView: React.FC<NotFoundViewProps> = ({ onNavigate }) => {
  return (
    <section className="py-16 md:py-24 max-w-3xl mx-auto text-center px-4">
      <div className="inline-block px-3 py-1 mb-6 text-xs font-mono uppercase tracking-widest text-[#C29958] bg-[#221510] rounded-[2px]">
        Code HTTP 404
      </div>

      <h1 className="text-3xl md:text-5xl font-title font-bold text-[#221510] mb-6 leading-tight">
        Page introuvable
      </h1>

      <p className="text-base md:text-lg text-[#5c4033] mb-8 leading-relaxed max-w-xl mx-auto">
        La ressource demandée n'existe pas ou son adresse a été modifiée. Vous pouvez parcourir notre catalogue technique pour accéder aux fiches de nos dérivés de cacao.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          onClick={() => onNavigate('catalogue')}
          className="w-full sm:w-auto px-6 py-3.5 bg-[#C29958] hover:bg-[#a88243] text-[#221510] font-semibold text-sm rounded-[2px] border border-[#a88243] transition-colors text-center"
        >
          Consulter le catalogue des dérivés
        </button>

        <button
          onClick={() => onNavigate('home')}
          className="w-full sm:w-auto px-6 py-3.5 bg-white border border-[#d8cfc4] hover:bg-[#f2ece1] text-[#221510] font-medium text-sm rounded-[2px] transition-colors text-center"
        >
          Retourner à l'accueil
        </button>
      </div>
    </section>
  );
};
