import React, { useState } from 'react';
import { Sparkles, Layers, Box } from 'lucide-react';

interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  productName?: string;
  category?: string;
  aspectRatio?: string;
}

export const ProductImage: React.FC<ProductImageProps> = ({
  src,
  alt,
  className = '',
  containerClassName = '',
  productName,
  category,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`relative w-full h-full bg-[#F1EDE7] overflow-hidden ${containerClassName}`}>
      {!hasError ? (
        <>
          {/* Skeleton Pulse */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-[#EFE9E1] animate-pulse flex items-center justify-center">
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
            className={`w-full h-full object-cover transition-all duration-500 ease-out ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            } ${className}`}
          />
        </>
      ) : (
        /* Zero-Broken-Image Branded Industrial Fallback */
        <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-[#F8F4EE] via-[#EFE8DE] to-[#E4DDD3] text-[#4A2C21] text-center select-none">
          <div className="w-12 h-12 rounded-[8px] bg-[#4A2C21]/10 flex items-center justify-center mb-2.5 shadow-xs border border-[#4A2C21]/10">
            {category === 'beurres' ? (
              <Sparkles className="w-6 h-6 text-[#C29958]" />
            ) : category === 'poudres' ? (
              <Layers className="w-6 h-6 text-[#C29958]" />
            ) : (
              <Box className="w-6 h-6 text-[#C29958]" />
            )}
          </div>
          <span className="font-display text-xs font-bold uppercase tracking-wider text-[#221510] line-clamp-1">
            {productName || alt}
          </span>
          <span className="font-mono text-[9px] uppercase tracking-wider text-[#8C827A] mt-1 px-2 py-0.5 bg-white/70 rounded-[3px] border border-[#E4DDD3]">
            {category ? `Grade ${category}` : 'Cacao Pur Certifié'}
          </span>
        </div>
      )}
    </div>
  );
};
