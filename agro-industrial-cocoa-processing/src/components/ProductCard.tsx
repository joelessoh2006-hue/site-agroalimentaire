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
  onToggleRfq,
  isAddedToRfq,
}) => {
  const handleCardClick = () => {
    if (onSelectProduct) {
      onSelectProduct(product.id);
    }
  };

  const handleRfqClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleRfq(product);
  };

  // Format de conditionnement court et net (zéro troncature)
  const getPackagingShort = () => {
    if (Array.isArray(product.packaging) && product.packaging.length > 0) {
      const raw = product.packaging[0]?.format.toLowerCase() || '';
      if (raw.includes('carton blanc')) return 'Carton 25 kg (Liner vierge)';
      if (raw.includes('carton')) return 'Carton export 25 kg';
      if (raw.includes('fût') || raw.includes('fut')) return 'Fût métallique 190 kg';
      if (raw.includes('sac')) return 'Sac kraft 25 kg';
      if (raw.includes('seau')) return 'Seau PP 20 kg';
      if (raw.includes('citerne')) return 'Citerne 24 t / Carton';
    }
    return 'Carton export 25 kg';
  };

  // Grille 2×2 style Barry Callebaut :
  // Ligne 1 : Matière Grasse (MG) | Acidité Libre (FFA) ou pH
  // Ligne 2 : Point de fusion ou Finesse | Format Conditionnement
  const getGridSpecs = () => {
    const packaging = getPackagingShort();

    if (product.category === 'beurres') {
      return [
        { label: 'Matière Grasse (MG)', value: product.specs['matiere_grasse'] || '≥ 99.85%' },
        { label: 'Acidité Libre (FFA)', value: product.specs['acides_gras_libres_ffa'] || '≤ 1.75%' },
        { label: 'Point de fusion', value: product.specs['point_fusion'] || '32.0 - 35.0 °C' },
        { label: 'Conditionnement', value: packaging },
      ];
    }

    if (product.category === 'poudres') {
      return [
        { label: 'Matière Grasse (MG)', value: product.specs['matiere_grasse'] || '10 - 12%' },
        { label: 'Potentiel Hydrogène (pH)', value: product.specs['ph'] || '5.2 - 6.0' },
        { label: 'Finesse (< 75 µm)', value: product.specs['finesse_tamis_75um'] || '≥ 99.5%' },
        { label: 'Conditionnement', value: packaging },
      ];
    }

    return [
      { label: 'Matière Grasse (MG)', value: product.specs['matiere_grasse'] || '52 - 54%' },
      { label: 'Humidité résiduelle', value: product.specs['humidite'] || '≤ 1.5%' },
      { label: 'Finesse de broyage', value: product.specs['finesse_tamis_75um'] || '< 20 µm' },
      { label: 'Conditionnement', value: packaging },
    ];
  };

  const gridSpecs = getGridSpecs();

  // Catégorie en petites capitales discrètes
  const getCategoryLabel = () => {
    switch (product.category) {
      case 'beurres':
        return 'BEURRES DE CACAO PURS';
      case 'poudres':
        return 'POUDRES DE CACAO MICRONISÉES';
      case 'masses':
        return 'MASSES & LIQUEURS PURES';
      default:
        return 'DÉRIVÉS DE CACAO PURS';
    }
  };

  return (
    <article
      onClick={handleCardClick}
      className="bg-white rounded-xl border border-[#E4DDD3]/80 overflow-hidden flex flex-col justify-between hover:border-[#C29958] transition-all duration-200 group cursor-pointer shadow-xs hover:shadow-sm"
    >
      <div>
        {/* Visual Header with Compact Monospace Application Badge */}
        <div className="relative h-48 sm:h-52 w-full bg-[#FAF7F2] overflow-hidden border-b border-[#E4DDD3]/40">
          <ProductImage
            src={product.image_url}
            alt={product.name}
            productName={product.name}
            category={product.category}
          />

          {/* Badge discret du secteur d'application en JetBrains Mono text-[10px] */}
          <div className="absolute top-3 right-3 flex items-center gap-1.5 pointer-events-none">
            {product.industry.map((ind) => (
              <span
                key={ind}
                className={`font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-[4px] border ${
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

        {/* Content Body with Generous Padding */}
        <div className="p-6 space-y-4">
          {/* Category in muted bronze small-caps + Product Title in chocolate black */}
          <div className="space-y-1">
            <span className="font-mono text-[10px] font-bold text-[#9C7336] uppercase tracking-wider block">
              {getCategoryLabel()}
            </span>
            <h3 className="font-display text-lg font-semibold text-[#1C1917] leading-snug group-hover:text-[#4A2C21] transition-colors">
              {product.name}
            </h3>
          </div>

          {/* Restructuration des spécifications en grille 2×2 (style Barry Callebaut) */}
          <div className="rounded-xl bg-[#FAF7F2] p-3.5 border border-[#E4DDD3]/60">
            <div className="grid grid-cols-2 gap-y-3 gap-x-4">
              {gridSpecs.map((spec, idx) => (
                <div key={idx} className="space-y-0.5">
                  <span className="block text-[11px] text-[#78716C] leading-none">
                    {spec.label}
                  </span>
                  <span className="block font-mono text-sm text-[#1C1917] font-semibold leading-tight">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Épuration du bas de carte (Call To Action sobre et équilibré) */}
      <div className="px-6 pb-5 pt-2 flex items-center justify-between border-t border-[#E4DDD3]/40">
        <span className="text-xs text-[#78716C] group-hover:text-[#1C1917] transition-colors font-medium">
          Détails techniques →
        </span>

        <button
          type="button"
          onClick={handleRfqClick}
          className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer border ${
            isAddedToRfq
              ? 'bg-[#2E5A36] text-white border-[#2E5A36]'
              : 'bg-[#221510] text-white border-[#221510] hover:bg-[#C29958] hover:border-[#C29958]'
          }`}
        >
          {isAddedToRfq ? 'Ajouté ✓' : '+ Devis RFQ'}
        </button>
      </div>
    </article>
  );
};
