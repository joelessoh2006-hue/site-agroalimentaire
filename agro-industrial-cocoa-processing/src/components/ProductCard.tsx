import React from 'react';
import { CocoaProduct } from '../types';
import { ProductImage } from './common/ProductImage';

export interface ProductCardProps {
  product: CocoaProduct;
  onSelectProduct?: (productId: string) => void;
  onOpenTdsModal?: (product: CocoaProduct) => void;
  onOpenSpecs?: (product: CocoaProduct) => void;
  onToggleRfq: (product: CocoaProduct) => void;
  isAddedToRfq: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelectProduct,
  onOpenTdsModal,
  onOpenSpecs,
  onToggleRfq,
  isAddedToRfq,
}) => {
  const handleCardClick = () => {
    if (onSelectProduct) {
      onSelectProduct(product.id);
    }
  };

  const handleTdsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onOpenTdsModal) {
      onOpenTdsModal(product);
    } else if (onOpenSpecs) {
      onOpenSpecs(product);
    }
  };

  const handleRfqClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleRfq(product);
  };

  // 3 paramètres normalisés sous forme de mini-grille monospace délimitée par une bordure fine
  const getTopThreeSpecs = () => {
    if (product.category === 'beurres') {
      return [
        { label: 'MG TOTALE', value: product.specs['matiere_grasse'] || '≥ 99.85%' },
        { label: 'FFA (ACIDES)', value: product.specs['acides_gras_libres_ffa'] || '≤ 1.75%' },
        { label: 'PT FUSION', value: product.specs['point_fusion'] || '32 - 35 °C' },
      ];
    }
    if (product.category === 'poudres') {
      return [
        { label: 'MG RÉSIDUELLE', value: product.specs['matiere_grasse'] || '10 - 12%' },
        { label: 'pH SOLUTION', value: product.specs['ph'] || '5.2 - 6.0' },
        { label: 'FINESSE <75µ', value: product.specs['finesse_tamis_75um'] || '≥ 99.5%' },
      ];
    }
    return [
      { label: 'MG RÉSIDUELLE', value: product.specs['matiere_grasse'] || '52 - 54%' },
      { label: 'HUMIDITÉ', value: product.specs['humidite'] || '≤ 1.5%' },
      { label: 'FINESSE', value: product.specs['finesse_tamis_75um'] || '< 75 µm' },
    ];
  };

  const specs = getTopThreeSpecs();

  // Format de conditionnement en ligne d'expédition
  const getPackagingLine = () => {
    if (Array.isArray(product.packaging) && product.packaging.length > 0) {
      const format = product.packaging[0]?.format || '';
      if (format.toLowerCase().includes('carton blanc cosmétique')) return 'Carton blanc cosmétique 25 kg · Liner vierge';
      if (format.toLowerCase().includes('carton')) return 'Carton export 25 kg · Liner PE bleu';
      if (format.toLowerCase().includes('fût') || format.toLowerCase().includes('fut')) return 'Fût métallique 190 kg · Liner étanche';
      if (format.toLowerCase().includes('sac')) return 'Sac kraft multi-plis 25 kg scellé';
      if (format.toLowerCase().includes('seau')) return 'Seau hermétique PP 20 kg';
      if (format.toLowerCase().includes('citerne')) return 'Citerne liquide inox 316L (24 t)';
      return format;
    }
    return 'Carton export 25 kg · Liner PE';
  };

  return (
    <article
      onClick={handleCardClick}
      className="bg-[#FFFFFF] rounded-[8px] border border-[#E4DDD3] overflow-hidden flex flex-col justify-between hover:border-[#C29958] transition-colors group cursor-pointer"
    >
      <div>
        {/* Visual Header with Compact Monospace Badge */}
        <div className="relative h-48 sm:h-52 w-full bg-[#FAF7F2] overflow-hidden border-b border-[#E4DDD3]">
          <ProductImage
            src={product.image_url}
            alt={product.name}
            productName={product.name}
            category={product.category}
          />

          {/* Badge technique compact en JetBrains Mono */}
          <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 pointer-events-none">
            {product.industry.map((ind) => (
              <span
                key={ind}
                className={`text-[11px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-[4px] border ${
                  ind === 'cosmetique'
                    ? 'bg-[#221510] text-[#C29958] border-[#4A2C21]'
                    : 'bg-[#FAF7F2] text-[#221510] border-[#E4DDD3]'
                }`}
              >
                {ind === 'cosmetique' ? 'COSMÉTIQUE' : 'AGROALIMENTAIRE'}
              </span>
            ))}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-3.5">
          {/* Category Overline & MOQ */}
          <div className="flex items-center justify-between border-b border-[#E4DDD3]/60 pb-2">
            <span className="font-mono text-[11px] font-bold text-[#C29958] uppercase">
              {product.category === 'beurres'
                ? 'BEURRES DE CACAO'
                : product.category === 'poudres'
                ? 'POUDRES DE CACAO'
                : 'MASSES & LIQUEURS'}
            </span>
            <span className="font-mono text-[10px] text-[#78716C]">
              MOQ : {product.moq.split('(')[0].trim()}
            </span>
          </div>

          {/* Title & Short Technical Subtitle without narrative overflow */}
          <div className="space-y-1">
            <h3 className="font-display text-base font-bold text-[#221510] leading-snug group-hover:text-[#4A2C21] transition-colors">
              {product.name}
            </h3>
            <div className="text-[11px] font-mono text-[#78716C] truncate">
              {product.subtitle || product.commercialName}
            </div>
          </div>

          {/* Mini-grille monospace délimitée de 3 spécifications physico-chimiques */}
          <div className="pt-1">
            <div className="grid grid-cols-3 divide-x divide-[#E4DDD3] bg-[#FAF7F2] border border-[#E4DDD3] rounded-[4px] font-mono">
              {specs.map((item, idx) => (
                <div key={idx} className="p-2 text-center space-y-0.5">
                  <span className="text-[9px] text-[#78716C] block uppercase truncate font-mono">
                    {item.label}
                  </span>
                  <span className="text-[11px] font-bold text-[#221510] block truncate">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Format de conditionnement sous forme de ligne d'expédition */}
          <div className="pt-1 text-[11px] font-mono text-[#5D5753] flex items-center gap-1.5 truncate border-t border-[#E4DDD3]/60">
            <span className="text-[#221510] font-bold shrink-0">EMBALLAGE :</span>
            <span className="text-[#4A2C21] truncate font-medium">{getPackagingLine()}</span>
          </div>
        </div>
      </div>

      {/* Hiérarchisation des boutons Barry Callebaut */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="p-5 pt-0 border-t border-[#E4DDD3] grid grid-cols-2 gap-2 mt-2 pt-3"
      >
        <button
          type="button"
          onClick={handleTdsClick}
          className="w-full py-2.5 px-3 text-center text-xs font-display font-semibold uppercase tracking-wider text-[#221510] bg-white border border-[#E4DDD3] hover:border-[#221510] hover:bg-[#FAF7F2] rounded-[6px] transition-colors cursor-pointer"
        >
          Fiche TDS
        </button>

        <button
          type="button"
          onClick={handleRfqClick}
          className={`w-full py-2.5 px-3 text-center text-xs font-display font-bold uppercase tracking-wider rounded-[6px] transition-colors cursor-pointer border ${
            isAddedToRfq
              ? 'bg-[#2E5A36] text-white border-[#2E5A36]'
              : 'bg-[#C29958] text-[#221510] hover:bg-[#b08745] border-[#b08745]'
          }`}
        >
          {isAddedToRfq ? 'Ajouté ✓' : 'Devis RFQ'}
        </button>
      </div>
    </article>
  );
};
