import React from 'react';

interface MobileStickyBarProps {
  onOpenRfq: () => void;
  rfqItemsCount: number;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({
  onOpenRfq,
  rfqItemsCount,
}) => {
  return (
    <aside
      aria-label="Action rapide mobile"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#221510] border-t border-[#3c2a22] px-4 py-3 shadow-lg"
    >
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenRfq}
          className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-[#C29958] active:bg-[#a88243] text-[#221510] font-semibold text-sm rounded shadow-sm transition-colors"
        >
          <span>Demander une cotation (RFQ)</span>
          {rfqItemsCount > 0 && (
            <span className="inline-flex items-center justify-center text-xs font-mono bg-[#221510] text-[#C29958] px-2 py-0.5 rounded-full">
              {rfqItemsCount}
            </span>
          )}
        </button>
      </div>
    </aside>
  );
};
