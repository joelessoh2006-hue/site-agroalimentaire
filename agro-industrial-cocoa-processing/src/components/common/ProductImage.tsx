import React, { useState } from 'react';

interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  productName?: string;
  category?: string;
  aspectRatio?: string;
  sku?: string;
  packagingFormat?: string;
}

export const ProductImage: React.FC<ProductImageProps> = ({
  src,
  alt,
  className = '',
  containerClassName = '',
  productName,
  category,
  sku,
  packagingFormat,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const derivedSku = (() => {
    if (sku) return sku;
    const n = (productName || alt || '').toLowerCase();
    if (n.includes('naturel') && category === 'beurres') return 'SKU · BUT-PPP-NAT';
    if (n.includes('désodorisé') || n.includes('desodorise')) return 'SKU · BUT-PPP-DEO';
    if (n.includes('cosmétique') || n.includes('cosmetique')) return 'SKU · BUT-COS-ORG';
    if (n.includes('naturelle') && category === 'poudres') return 'SKU · POW-NAT-1012';
    if (n.includes('noir') || n.includes('black')) return 'SKU · POW-BLK-1012';
    if (n.includes('rouge') || n.includes('red')) return 'SKU · POW-RED-2022';
    if (n.includes('alcalinisée') || n.includes('alcalinisee')) return 'SKU · POW-ALK-1012';
    if (n.includes('liquor') || n.includes('masse')) return 'SKU · LIQ-RAW-PURE';
    if (n.includes('tourteau') || n.includes('kibbled')) return 'SKU · CAK-KIB-EXP';
    if (category === 'beurres') return 'SKU · BUT-PPP-25K';
    if (category === 'poudres') return 'SKU · POW-ALK-25K';
    if (category === 'masses') return 'SKU · LIQ-REF-25K';
    return 'SKU · IND-RAW-EXP';
  })();

  const derivedPackaging = (() => {
    if (packagingFormat) return packagingFormat;
    const n = (productName || alt || '').toLowerCase();
    if (n.includes('fût') || n.includes('fut')) return 'Fût métallique 190 kg · Liner étanche';
    if (n.includes('citerne')) return 'Citerne liquide inox 316L (24 t à 45°C)';
    if (category === 'beurres') return 'Carton export 25 kg · Liner PE bleu';
    if (category === 'poudres') return 'Sac kraft multi-plis 25 kg hermétique';
    if (category === 'masses') return 'Carton 25 kg bloc · Palette 1 000 kg';
    return 'Conditionnement industriel export 25 kg';
  })();

  return (
    <div className={`relative w-full h-full bg-[#FAF7F2] overflow-hidden ${containerClassName}`}>
      {!hasError ? (
        <>
          {/* Skeleton Pulse */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-[#F1EDE7] animate-pulse flex items-center justify-center">
              <span className="font-mono text-[10px] text-[#8C827A] tracking-wider uppercase">
                Chargement visuel...
              </span>
            </div>
          )}

          <img
            src={src}
            alt={alt}
            loading="lazy"
            referrerPolicy="no-referrer"
            onLoad={() => setImageLoaded(true)}
            onError={() => setHasError(true)}
            className={`w-full h-full object-cover transition-all duration-300 ease-out ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            } ${className}`}
          />
        </>
      ) : (
        /* Mire industrielle sobre : code SKU monospace & conditionnement officiel */
        <div className="w-full h-full flex flex-col justify-between p-4 bg-[#FAF7F2] border border-[#E4DDD3] text-left select-none relative">
          {/* Repère de calibration laboratoire en coin */}
          <div className="flex items-center justify-between border-b border-[#E4DDD3] pb-2">
            <span className="font-mono text-[10px] font-bold text-[#C29958] tracking-widest uppercase">
              MIRE ÉCHANTILLON
            </span>
            <span className="font-mono text-[9px] text-[#78716C] tracking-tight">
              LOT QA-CHECK
            </span>
          </div>

          {/* Identification SKU centrale */}
          <div className="my-auto py-2 space-y-1.5">
            <div className="inline-block font-mono text-xs font-bold text-[#221510] bg-white px-2.5 py-1 rounded-[4px] border border-[#E4DDD3]">
              {derivedSku}
            </div>
            <div className="font-display text-xs font-bold text-[#221510] line-clamp-2 leading-snug">
              {productName || alt}
            </div>
          </div>

          {/* Conditionnement officiel & conformité */}
          <div className="pt-2 border-t border-[#E4DDD3] space-y-0.5">
            <span className="font-mono text-[9px] uppercase tracking-wider text-[#78716C] block">
              Format officiel :
            </span>
            <span className="font-mono text-[10px] font-medium text-[#4A2C21] line-clamp-1">
              {derivedPackaging}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
