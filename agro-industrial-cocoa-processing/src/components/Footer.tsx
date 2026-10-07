import React from 'react';

interface FooterProps {
  onNavigate: (view: string, productId?: string) => void;
  onOpenTerms?: () => void;
  onOpenPrivacy?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenTerms,
  onOpenPrivacy,
}) => {
  return (
    <footer className="bg-[#221510] text-[#F8F4EE] border-t border-[#4A2C21] mt-24">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-14 border-b border-[#4A2C21]/60">
          {/* Col 1: Wordmark & Corporate Mission */}
          <div className="md:col-span-1 space-y-4">
            <span className="font-display text-lg font-bold tracking-tight text-[#FFFFFF] block">
              AGRO-INDUSTRIAL COCOA
            </span>
            <p className="font-body text-xs text-[#E4DDD3]/80 leading-relaxed">
              Unité industrielle de première et seconde transformation du cacao. Fournisseur B2B de dérivés purs certifiés FSSC 22000 et conformes au règlement européen zéro déforestation (EUDR 2023/1115).
            </p>
            <div className="pt-2 text-[11px] font-mono text-[#C29958] space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-[10px] bg-[#4A2C21] px-1.5 py-0.5 rounded-[3px] border border-[#C29958]/30 font-bold shrink-0">
                  FAC · SP
                </span>
                <span>Port Autonome de San Pedro, Côte d'Ivoire</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] bg-[#4A2C21] px-1.5 py-0.5 rounded-[3px] border border-[#C29958]/30 font-bold shrink-0">
                  HUB · LH
                </span>
                <span>Terminal Océanique, Le Havre (France)</span>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation Catalogue */}
          <div className="space-y-3">
            <h4 className="font-display text-xs font-bold uppercase tracking-wider text-[#C29958]">
              Catalogue des Dérivés (9)
            </h4>
            <ul className="space-y-2 text-xs text-[#E4DDD3]/75">
              <li>
                <button
                  onClick={() => onNavigate('produit', 'beurre-cacao-naturel-alimentaire')}
                  className="hover:text-[#FFFFFF] transition-colors cursor-pointer text-left"
                >
                  Beurre Naturel Pure Pression (PPP)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('produit', 'beurre-cacao-desodorise-blanc-raffine')}
                  className="hover:text-[#FFFFFF] transition-colors cursor-pointer text-left"
                >
                  Beurre Désodorisé Blanc Raffiné
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('produit', 'beurre-cacao-cosmetique')}
                  className="hover:text-[#FFFFFF] transition-colors cursor-pointer text-left"
                >
                  Beurre Cosmétique (INCI Theobroma)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('produit', 'poudre-cacao-naturelle-alimentaire')}
                  className="hover:text-[#FFFFFF] transition-colors cursor-pointer text-left"
                >
                  Poudre Naturelle 10-12% (pH 5.2-6.0)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('produit', 'poudre-cacao-alcalinisee-20-22')}
                  className="hover:text-[#FFFFFF] transition-colors cursor-pointer text-left"
                >
                  Poudre Alcalinisée Haute MG (20-22%)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('produit', 'masse-cacao-alimentaire')}
                  className="hover:text-[#FFFFFF] transition-colors cursor-pointer text-left"
                >
                  Masse de Cacao Pure 52/54
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('produit', 'tourteau-cacao-troutrou')}
                  className="hover:text-[#FFFFFF] transition-colors cursor-pointer text-left"
                >
                  Tourteau de Cacao (« Troutrou »)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Quality Standards & Pipeline */}
          <div className="space-y-3">
            <h4 className="font-display text-xs font-bold uppercase tracking-wider text-[#C29958]">
              Gouvernance & Procédés
            </h4>
            <ul className="space-y-2 text-xs text-[#E4DDD3]/75">
              <li>
                <button onClick={() => onNavigate('savoir-faire')} className="hover:text-[#FFFFFF] transition-colors cursor-pointer text-left">
                  Pipeline Industriel en 6 Étapes
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('savoir-faire')} className="hover:text-[#FFFFFF] transition-colors cursor-pointer text-left">
                  Traçabilité Polygonale EUDR 2023/1115
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('qualite')} className="hover:text-[#FFFFFF] transition-colors cursor-pointer text-left">
                  Laboratoire Central d'Analyses ISO 17025
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('qualite')} className="hover:text-[#FFFFFF] transition-colors cursor-pointer text-left">
                  Dosage Cadmium ICP-MS (UE 488/2014)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('qualite')} className="hover:text-[#FFFFFF] transition-colors cursor-pointer text-left">
                  Tolérance Zéro Salmonella sp. (PCR 375g)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Certifications & Contact Pro */}
          <div className="space-y-3">
            <h4 className="font-display text-xs font-bold uppercase tracking-wider text-[#C29958]">
              Certifications & RFQ
            </h4>
            <div className="space-y-2 text-xs text-[#E4DDD3]/75">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono bg-[#4A2C21] text-[#C29958] px-1.5 py-0.5 rounded-[3px] border border-[#C29958]/30 font-bold shrink-0">
                  FSSC 22000
                </span>
                <span>GFSI Ver. 6.0 & ISO 9001</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono bg-[#4A2C21] text-[#C29958] px-1.5 py-0.5 rounded-[3px] border border-[#C29958]/30 font-bold shrink-0">
                  SUSTAINABLE
                </span>
                <span>Rainforest Alliance & Fairtrade</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono bg-[#4A2C21] text-[#C29958] px-1.5 py-0.5 rounded-[3px] border border-[#C29958]/30 font-bold shrink-0">
                  RELIGIOUS
                </span>
                <span>Halal & Casher Parve Certifié</span>
              </div>
            </div>
            <div className="pt-3">
              <button
                onClick={() => onNavigate('contact')}
                className="w-full py-2.5 px-3 text-xs font-display font-semibold uppercase tracking-wider bg-[#4A2C21] text-[#F8F4EE] border border-[#C29958]/40 rounded-[6px] hover:bg-[#C29958] hover:text-[#221510] transition-colors cursor-pointer"
              >
                Portail Cotation RFQ & Échantillons
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#E4DDD3]/60 gap-4">
          <p>© 2026 Agro-Industrial Cocoa Processing Group. Tous droits réservés.</p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5">
            <span className="font-mono text-[#E4DDD3]/40">Codex STAN 87-1981</span>
            <span>·</span>
            <button
              type="button"
              onClick={() => onNavigate('savoir-faire')}
              className="hover:text-[#FFFFFF] transition-colors cursor-pointer"
            >
              Conformité EUDR 2023/1115
            </button>
            <span>·</span>
            <button
              type="button"
              onClick={onOpenTerms}
              className="hover:text-[#FFFFFF] transition-colors cursor-pointer"
            >
              Conditions Générales de Vente (Incoterms 2020)
            </button>
            <span>·</span>
            <button
              type="button"
              onClick={onOpenPrivacy}
              className="hover:text-[#FFFFFF] transition-colors cursor-pointer"
            >
              Politique de Confidentialité
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
