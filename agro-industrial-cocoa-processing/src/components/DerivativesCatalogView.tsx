import React, { useState } from 'react';
import { CocoaDerivative, DerivativeCategory } from '../types';
import { COCOA_DERIVATIVES } from '../data/cocoaData';
import { FileText, Plus, Check, ShieldCheck, Filter, ArrowUpRight } from 'lucide-react';

interface DerivativesCatalogViewProps {
  onOpenCoaForDerivative: (derivative: CocoaDerivative) => void;
  onAddToRfq: (derivative: CocoaDerivative) => void;
  selectedRfqIds: string[];
}

export const DerivativesCatalogView: React.FC<DerivativesCatalogViewProps> = ({
  onOpenCoaForDerivative,
  onAddToRfq,
  selectedRfqIds,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<DerivativeCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDerivatives = COCOA_DERIVATIVES.filter((d) => {
    const matchesCategory = selectedCategory === 'all' || d.category === selectedCategory;
    const matchesQuery =
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.commercialName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.sku.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const getCategoryLabel = (cat: DerivativeCategory) => {
    switch (cat) {
      case 'liquor':
        return 'PÂTE / MASSE DE LIQUEUR';
      case 'butter':
        return 'BEURRE DE CACAO PUR';
      case 'cake':
        return 'TOURTEAU COMPACT DÉSHUILÉ';
      case 'powder':
        return 'POUDRE MICRONISÉE';
    }
  };

  return (
    <div className="space-y-10">
      {/* Header section */}
      <div className="border-b border-[#E4DDD3] pb-6 space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono text-[#C29958] uppercase tracking-wider">
          <span>PORTFOLIO DES FRACTIONS INDUSTRIELLES DU CACAO</span>
          <span>·</span>
          <span>SPÉCIFICATIONS CONFORMES CODEX STAN 87-1981</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#221510]">
              Dérivés & Ingrédients B2B de Haute Pureté
            </h1>
            <p className="font-body text-sm text-[#4f4541] max-w-2xl mt-1">
              Fiches techniques normalisées pour formulateurs agroalimentaires et acheteurs industriels. Toutes nos matières premières sont garanties sans graisse végétale hydrogénée de substitution.
            </p>
          </div>

          <div className="text-right">
            <span className="font-mono text-xs text-[#5D5753]">
              Lots disponibles en stock actif : <strong className="text-[#221510]">{COCOA_DERIVATIVES.length} Grades</strong>
            </span>
          </div>
        </div>

        {/* Filter controls following Zero-Pill rule: segmented buttons */}
        <div className="pt-4 flex flex-wrap items-center justify-between gap-4">
          <div className="inline-flex p-1 bg-[#F1EDE7] rounded-[8px] border border-[#E4DDD3]">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3.5 py-1.5 text-xs font-display font-semibold uppercase tracking-wider rounded-[6px] transition-all cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-[#221510] text-[#FFFFFF] shadow-xs'
                  : 'text-[#4A2C21] hover:text-[#221510]'
              }`}
            >
              Tous ({COCOA_DERIVATIVES.length})
            </button>
            <button
              onClick={() => setSelectedCategory('liquor')}
              className={`px-3.5 py-1.5 text-xs font-display font-semibold uppercase tracking-wider rounded-[6px] transition-all cursor-pointer ${
                selectedCategory === 'liquor'
                  ? 'bg-[#221510] text-[#FFFFFF] shadow-xs'
                  : 'text-[#4A2C21] hover:text-[#221510]'
              }`}
            >
              Liqueurs (Masses)
            </button>
            <button
              onClick={() => setSelectedCategory('butter')}
              className={`px-3.5 py-1.5 text-xs font-display font-semibold uppercase tracking-wider rounded-[6px] transition-all cursor-pointer ${
                selectedCategory === 'butter'
                  ? 'bg-[#221510] text-[#FFFFFF] shadow-xs'
                  : 'text-[#4A2C21] hover:text-[#221510]'
              }`}
            >
              Beurres de Cacao
            </button>
            <button
              onClick={() => setSelectedCategory('cake')}
              className={`px-3.5 py-1.5 text-xs font-display font-semibold uppercase tracking-wider rounded-[6px] transition-all cursor-pointer ${
                selectedCategory === 'cake'
                  ? 'bg-[#221510] text-[#FFFFFF] shadow-xs'
                  : 'text-[#4A2C21] hover:text-[#221510]'
              }`}
            >
              Tourteaux
            </button>
            <button
              onClick={() => setSelectedCategory('powder')}
              className={`px-3.5 py-1.5 text-xs font-display font-semibold uppercase tracking-wider rounded-[6px] transition-all cursor-pointer ${
                selectedCategory === 'powder'
                  ? 'bg-[#221510] text-[#FFFFFF] shadow-xs'
                  : 'text-[#4A2C21] hover:text-[#221510]'
              }`}
            >
              Poudres
            </button>
          </div>

          {/* Quick search input */}
          <div className="w-full sm:w-72">
            <input
              type="text"
              placeholder="Rechercher grade, SKU, origine..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-1.5 text-xs bg-[#FFFFFF] border border-[#E4DDD3] rounded-[8px] focus:outline-none focus:border-[#C29958] focus:ring-1 focus:ring-[#C29958]"
            />
          </div>
        </div>
      </div>

      {/* Grid of Product & Derivative Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDerivatives.map((item) => {
          const isAddedToRfq = selectedRfqIds.includes(item.id);

          return (
            <div
              key={item.id}
              className="bg-[#FFFFFF] rounded-[8px] border border-[#E4DDD3] p-6 flex flex-col justify-between hover:border-[#C29958] hover:shadow-[0px_4px_12px_rgba(34,21,16,0.04)] transition-all duration-200"
            >
              {/* Card Top: Botanical Category & SKU */}
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-[#E4DDD3]/60 pb-2">
                  <span className="font-display text-[11px] font-bold uppercase tracking-wider text-[#C29958]">
                    {getCategoryLabel(item.category)}
                  </span>
                  <span className="font-mono text-[10px] font-semibold text-[#5D5753]">
                    {item.sku}
                  </span>
                </div>

                <div>
                  <h3 className="font-display text-lg font-bold text-[#221510] leading-snug">
                    {item.name}
                  </h3>
                  <div className="font-body text-xs text-[#5D5753] mt-0.5">
                    {item.commercialName}
                  </div>
                </div>

                {/* Unboxed Metadata (Zero-Pill rule) */}
                <div className="flex items-center gap-2 text-[11px] text-[#5D5753]">
                  <span>Origine : {item.origin}</span>
                  <span aria-hidden="true">·</span>
                  <span>Lot : {item.lotInStock}</span>
                </div>

                <p className="font-body text-xs text-[#4f4541] leading-relaxed line-clamp-3">
                  {item.description}
                </p>

                {/* Dual-column Key-Value pairs with Dotted Leaders (Design System Spec) */}
                <div className="pt-3 border-t border-[#E4DDD3] space-y-1.5 font-mono text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[#5D5753]">Matière Grasse</span>
                    <span className="flex-1 border-b border-dotted border-[#E4DDD3] mx-2 self-end mb-1" />
                    <span className="font-bold text-[#221510] tabular-nums">{item.fatContent}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[#5D5753]">Humidité résiduelle</span>
                    <span className="flex-1 border-b border-dotted border-[#E4DDD3] mx-2 self-end mb-1" />
                    <span className="font-bold text-[#221510] tabular-nums">{item.moisture}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[#5D5753]">pH en solution 10%</span>
                    <span className="flex-1 border-b border-dotted border-[#E4DDD3] mx-2 self-end mb-1" />
                    <span className="font-bold text-[#221510] tabular-nums">{item.ph}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[#5D5753]">Finesse (&lt;75µm)</span>
                    <span className="flex-1 border-b border-dotted border-[#E4DDD3] mx-2 self-end mb-1" />
                    <span className="font-bold text-[#221510] tabular-nums">{item.fineness}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[#5D5753]">Acides Gras Libres</span>
                    <span className="flex-1 border-b border-dotted border-[#E4DDD3] mx-2 self-end mb-1" />
                    <span className="font-bold text-[#221510] tabular-nums">{item.freeFattyAcids}</span>
                  </div>
                </div>

                {/* Packaging & Compliance metadata line */}
                <div className="pt-2 text-[11px] text-[#5D5753] space-y-1">
                  <div>
                    <strong>Conditionnement :</strong> {item.packaging}
                  </div>
                  <div>
                    <strong>Certifications :</strong> {item.certifications.join(' · ')}
                  </div>
                </div>
              </div>

              {/* Action Buttons: Primary & Secondary */}
              <div className="pt-6 mt-4 border-t border-[#E4DDD3] grid grid-cols-2 gap-2">
                <button
                  onClick={() => onOpenCoaForDerivative(item)}
                  className="w-full py-2 px-2 text-center text-xs font-display font-semibold uppercase tracking-wider text-[#221510] bg-[#FFFFFF] border border-[#E4DDD3] rounded-[8px] hover:border-[#C29958] hover:bg-[#FAF7F2] transition-colors inline-flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5 text-[#C29958]" />
                  <span>Fiche CoA</span>
                </button>

                <button
                  onClick={() => onAddToRfq(item)}
                  className={`w-full py-2 px-2 text-center text-xs font-display font-semibold uppercase tracking-wider rounded-[8px] transition-colors inline-flex items-center justify-center gap-1 cursor-pointer ${
                    isAddedToRfq
                      ? 'bg-[#2E5A36] text-[#FFFFFF]'
                      : 'bg-[#C29958] text-[#221510] hover:bg-[#b08745]'
                  }`}
                >
                  {isAddedToRfq ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Ajouté</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5" />
                      <span>Ajouter RFQ</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
