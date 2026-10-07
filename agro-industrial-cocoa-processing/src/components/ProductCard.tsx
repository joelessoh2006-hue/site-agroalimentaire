import React, { useState } from 'react';
import { CatalogProduct } from '../types';
import { FileText, Plus, Check, Package, ShieldCheck } from 'lucide-react';

interface ProductCardProps {
  product: CatalogProduct;
  onOpenSpecs: (product: CatalogProduct) => void;
  onToggleRfq: (product: CatalogProduct) => void;
  isAddedToRfq: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onOpenSpecs,
  onToggleRfq,
  isAddedToRfq,
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Format category label
  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'beurres':
        return 'BEURRES DE CACAO PURS';
      case 'poudres':
        return 'POUDRES MICRONISÉES';
      case 'masses':
        return 'MASSES & LIQUEURS';
      default:
        return category.toUpperCase();
    }
  };

  // Format spec key names in readable French
  const formatSpecKey = (key: string) => {
    return key
      .replace(/_/g, ' ')
      .replace('matiere grasse', 'Matière Grasse')
      .replace('matiere grasse residuelle', 'MG Résiduelle')
      .replace('point fusion', 'Point de Fusion')
      .replace('acidite libre', 'Acidité Libre (FFA)')
      .replace('indice iode', 'Indice d\'Iode')
      .replace('indice saponification', 'Indice Saponification')
      .replace('teneur en fibres', 'Teneur en Fibres')
      .replace(/^\w/, (c) => c.toUpperCase());
  };

  return (
    <article className="bg-[#FFFFFF] rounded-[2px] border border-[#E4DDD3] overflow-hidden flex flex-col justify-between hover:border-[#C29958] transition-colors group">
      <div>
        {/* Visual Container */}
        <div className="relative h-48 sm:h-52 w-full bg-[#F1EDE7] overflow-hidden border-b border-[#E4DDD3]">
          {!imageError ? (
            <>
              {!imageLoaded && (
                <div className="absolute inset-0 bg-[#F1EDE7] flex items-center justify-center">
                  <span className="font-mono text-[10px] text-[#5D5753]">Chargement visuel...</span>
                </div>
              )}
              <img
                src={product.image_url}
                alt={product.name}
                loading="lazy"
                referrerPolicy="no-referrer"
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
                className={`w-full h-full object-cover ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </>
          ) : (
            /* Resilient SVG/CSS fallback per zero-broken-image policy */
            <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-[#F1EDE7] text-[#4A2C21] text-center">
              <div className="w-10 h-10 rounded-[2px] bg-[#4A2C21]/10 flex items-center justify-center mb-2">
                <FileText className="w-5 h-5 text-[#C29958]" />
              </div>
              <span className="font-display text-xs font-bold uppercase tracking-wider text-[#221510]">
                {product.name}
              </span>
              <span className="font-mono text-[10px] text-[#5D5753] mt-1">
                Lot Certifié Agro-Industriel
              </span>
            </div>
          )}

          {/* Industry Tag Overlay (Top right) */}
          <div className="absolute top-3 right-3 flex items-center gap-1.5">
            {product.industry.map((ind: string) => (
              <span
                key={ind}
                className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-[2px] ${
                  ind === 'cosmetique'
                    ? 'bg-[#221510] text-[#C29958] border border-[#C29958]/40'
                    : ind === 'agricole'
                    ? 'bg-[#2E5A36] text-[#FFFFFF] border border-[#2E5A36]'
                    : 'bg-[#F8F4EE] text-[#221510] border border-[#E4DDD3]'
                }`}
              >
                {ind === 'cosmetique' ? 'Cosmétique' : ind === 'agricole' ? 'Agricole' : 'Alimentaire'}
              </span>
            ))}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 space-y-4">
          {/* Category Overline in Harvest Bronze */}
          <div className="flex items-center justify-between border-b border-[#E4DDD3]/60 pb-2">
            <span className="font-display text-[11px] font-bold uppercase tracking-wider text-[#C29958]">
              {getCategoryLabel(product.category)}
            </span>
            <span className="font-mono text-[10px] text-[#5D5753]">
              ID: {product.id}
            </span>
          </div>

          {/* Product Title & Description */}
          <div>
            <h3 className="font-display text-lg font-bold text-[#221510] leading-snug group-hover:text-[#4A2C21] transition-colors">
              {product.name}
            </h3>
            <p className="font-body text-xs text-[#4f4541] leading-relaxed mt-2 line-clamp-3">
              {product.description}
            </p>
          </div>

          {/* Applications (Clean Unboxed Metadata per Zero-Pill discipline) */}
          <div className="space-y-1 pt-1">
            <span className="font-display text-[10px] font-bold uppercase tracking-wider text-[#5D5753] block">
              Applications cibles :
            </span>
            <div className="text-xs text-[#221510] flex flex-wrap items-center gap-x-1.5 gap-y-0.5">
              {product.applications.map((app: string, idx: number) => (
                <React.Fragment key={app}>
                  <span className="font-medium">{app}</span>
                  {idx < product.applications.length - 1 && (
                    <span className="text-[#C29958]" aria-hidden="true">·</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* 2 Spécifications Clés Standard Barry Callebaut */}
          <div className="pt-2 border-t border-[#E4DDD3]">
            <div className="grid grid-cols-2 divide-x divide-[#E4DDD3] bg-[#FAF7F2] border border-[#E4DDD3] rounded-[2px] font-mono text-xs">
              {Object.entries(product.specs).slice(0, 2).map(([key, val]) => (
                <div key={key} className="p-2.5 space-y-0.5">
                  <span className="text-[10px] text-[#5D5753] block truncate uppercase font-sans font-semibold">
                    {formatSpecKey(key)}
                  </span>
                  <span className="font-bold text-[#221510] block truncate">
                    {String(val)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Packaging Strip */}
          <div className="pt-2 text-[11px] text-[#5D5753] flex items-start gap-1.5">
            <Package className="w-3.5 h-3.5 text-[#C29958] shrink-0 mt-0.5" />
            <span>
              <strong className="text-[#221510]">Conditionnement :</strong>{' '}
              {typeof product.packaging === 'string'
                ? product.packaging
                : Array.isArray(product.packaging)
                ? product.packaging[0]?.format || 'Cartons 25 kg'
                : 'Cartons 25 kg'}
            </span>
          </div>
        </div>
      </div>

      {/* Card Action Buttons style Barry Callebaut */}
      <div className="p-5 sm:p-6 pt-0 border-t border-[#E4DDD3] grid grid-cols-2 gap-2 mt-4 pt-4">
        <button
          onClick={() => onOpenSpecs(product)}
          className="w-full py-2.5 px-3 text-center text-xs font-display font-bold uppercase tracking-wider text-[#221510] bg-[#FFFFFF] border border-[#E4DDD3] rounded-[2px] hover:border-[#221510] hover:bg-[#FAF7F2] transition-colors inline-flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <FileText className="w-3.5 h-3.5 text-[#C29958]" />
          <span>Fiche CoA</span>
        </button>

        <button
          onClick={() => onToggleRfq(product)}
          className={`w-full py-2.5 px-3 text-center text-xs font-display font-bold uppercase tracking-wider rounded-[2px] transition-colors inline-flex items-center justify-center gap-1.5 cursor-pointer border ${
            isAddedToRfq
              ? 'bg-[#2E5A36] text-[#FFFFFF] border-[#2E5A36]'
              : 'bg-[#C29958] text-[#221510] hover:bg-[#b08745] border-[#b08745]'
          }`}
        >
          {isAddedToRfq ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Ajouté ✓</span>
            </>
          ) : (
            <>
              <Plus className="w-3.5 h-3.5" />
              <span>Devis RFQ</span>
            </>
          )}
        </button>
      </div>
    </article>
  );
};
