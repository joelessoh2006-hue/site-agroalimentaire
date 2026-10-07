import React, { useState, useMemo, useEffect } from 'react';
import { CocoaProduct, ProductCategory, IndustrySector } from '../../types';
import { COCOA_PRODUCTS } from '../../data/products';
import { Search, RotateCcw } from 'lucide-react';
import { ProductCard } from '../ProductCard';

interface CatalogueViewProps {
  onOpenSpecs: (product: CocoaProduct) => void;
  onOpenTdsModal: (product: CocoaProduct) => void;
  onToggleRfq: (product: CocoaProduct) => void;
  onSelectProduct: (productId: string) => void;
  selectedRfqProductIds: string[];
}

export const CatalogueView: React.FC<CatalogueViewProps> = ({
  onOpenTdsModal,
  onToggleRfq,
  onSelectProduct,
  selectedRfqProductIds,
}) => {
  // Read initial filter values from URL params
  const getInitialFilters = (): {
    industry: IndustrySector | 'all';
    category: ProductCategory | 'all';
    search: string;
  } => {
    const params = new URLSearchParams(window.location.search);
    const ind = params.get('industry');
    const cat = params.get('category');
    const q = params.get('q') || '';
    return {
      industry: ind === 'alimentaire' || ind === 'cosmetique' ? (ind as IndustrySector) : 'all',
      category: cat === 'beurres' || cat === 'poudres' || cat === 'masses' ? (cat as ProductCategory) : 'all',
      search: q,
    };
  };

  const initial = getInitialFilters();
  const [selectedIndustry, setSelectedIndustry] = useState<IndustrySector | 'all'>(initial.industry);
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>(initial.category);
  const [searchQuery, setSearchQuery] = useState<string>(initial.search);

  // Sync state to URL params without full page reload
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (selectedIndustry !== 'all') {
      params.set('industry', selectedIndustry);
    } else {
      params.delete('industry');
    }

    if (selectedCategory !== 'all') {
      params.set('category', selectedCategory);
    } else {
      params.delete('category');
    }

    if (searchQuery.trim()) {
      params.set('q', searchQuery.trim());
    } else {
      params.delete('q');
    }

    const newUrl = `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`;
    window.history.replaceState({}, '', newUrl);
  }, [selectedIndustry, selectedCategory, searchQuery]);

  // Filtering engine (under 15ms in memory)
  const filteredProducts = useMemo(() => {
    return COCOA_PRODUCTS.filter((product) => {
      // 1. Industry filter
      if (selectedIndustry !== 'all' && !product.industry.includes(selectedIndustry)) {
        return false;
      }

      // 2. Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }

      // 3. Search query
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase().trim();
        const matchName = product.name.toLowerCase().includes(q);
        const matchCommercial = product.commercialName.toLowerCase().includes(q);
        const matchDesc = product.description.toLowerCase().includes(q);
        const matchInci = product.inciName?.toLowerCase().includes(q) ?? false;
        const matchApps = product.applications.some((app) => app.toLowerCase().includes(q));
        const matchSpecs = Object.values(product.specs).some((val) => val.toLowerCase().includes(q));

        if (!matchName && !matchCommercial && !matchDesc && !matchInci && !matchApps && !matchSpecs) {
          return false;
        }
      }

      return true;
    });
  }, [selectedIndustry, selectedCategory, searchQuery]);

  const hasActiveFilters =
    selectedIndustry !== 'all' || selectedCategory !== 'all' || searchQuery.trim() !== '';

  const handleResetFilters = () => {
    setSelectedIndustry('all');
    setSelectedCategory('all');
    setSearchQuery('');
  };

  const countByIndustry = (ind: IndustrySector) =>
    COCOA_PRODUCTS.filter((p) => p.industry.includes(ind)).length;

  const countByCategory = (cat: ProductCategory) =>
    COCOA_PRODUCTS.filter((p) => p.category === cat).length;

  return (
    <section className="space-y-8">
      {/* Title & Description */}
      <div className="border-b border-[#E4DDD3] pb-6 space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono text-[#C29958] uppercase tracking-wider">
          <span>CATALOGUE OFFICIEL DES FRACTIONS & DÉRIVÉS DU CACAO</span>
          <span>·</span>
          <span>DISPONIBILITÉ SPOT & CONTRATS CADRES ANNUELS</span>
        </div>

        <div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#221510]">
            Catalogue des 9 Ingrédients Industriels
          </h1>
          <p className="font-body text-sm text-[#4f4541] max-w-2xl mt-1">
            Beurres de pression pure et raffinés, poudres micronisées naturelles et alcalinisées, masses fluides et tourteaux. Filtrage combinatoire réactif instantané.
          </p>
        </div>
      </div>

      {/* 1. Barre d'outils et filtres (Toolbar industrielle unifiée monobloc) */}
      <div
        role="search"
        aria-label="Barre d'outils et filtres du catalogue"
        className="bg-white border border-[#E4DDD3] rounded-lg p-3 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 shadow-none"
      >
        {/* Recherche textuelle */}
        <div className="relative flex-1 min-w-[220px]">
          <Search className="w-4 h-4 text-[#78716C] absolute left-3 top-2.5" />
          <input
            type="text"
            aria-label="Rechercher un ingrédient par nom, INCI, point de fusion, application"
            placeholder="Filtrer par nom, référence, INCI, point de fusion..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#FAF7F2] border border-[#E4DDD3] rounded-[6px] focus:outline-none focus:border-[#C29958] focus:bg-white text-[#221510] placeholder:text-[#78716C] transition-colors"
          />
        </div>

        {/* Sélecteurs compacts pour Application & Famille */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Dropdown Application */}
          <div className="flex items-center gap-1.5">
            <label className="font-mono text-[10px] text-[#78716C] uppercase font-bold shrink-0">
              Application :
            </label>
            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value as any)}
              className="text-xs font-mono bg-[#FAF7F2] border border-[#E4DDD3] rounded-[6px] px-2.5 py-1.5 text-[#221510] focus:outline-none focus:border-[#C29958] cursor-pointer"
            >
              <option value="all">Toutes ({COCOA_PRODUCTS.length})</option>
              <option value="alimentaire">Agroalimentaire ({countByIndustry('alimentaire')})</option>
              <option value="cosmetique">Cosmétique ({countByIndustry('cosmetique')})</option>
            </select>
          </div>

          {/* Dropdown Famille */}
          <div className="flex items-center gap-1.5">
            <label className="font-mono text-[10px] text-[#78716C] uppercase font-bold shrink-0">
              Famille :
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as any)}
              className="text-xs font-mono bg-[#FAF7F2] border border-[#E4DDD3] rounded-[6px] px-2.5 py-1.5 text-[#221510] focus:outline-none focus:border-[#C29958] cursor-pointer"
            >
              <option value="all">Toutes ({COCOA_PRODUCTS.length})</option>
              <option value="beurres">Beurres ({countByCategory('beurres')})</option>
              <option value="poudres">Poudres ({countByCategory('poudres')})</option>
              <option value="masses">Masses & Tourteaux ({countByCategory('masses')})</option>
            </select>
          </div>

          {/* Bouton de réinitialisation contextuel */}
          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1 text-[11px] font-mono text-[#78716C] hover:text-[#221510] underline cursor-pointer px-1 py-1"
              title="Réinitialiser tous les filtres"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Effacer</span>
            </button>
          )}
        </div>

        {/* Compteur d'inventaire officiel */}
        <div className="font-mono text-xs font-bold text-[#221510] bg-[#FAF7F2] border border-[#E4DDD3] px-3 py-1.5 rounded-[4px] whitespace-nowrap text-center shrink-0">
          INDEX · {filteredProducts.length} RÉFÉRENCE{filteredProducts.length > 1 ? 'S' : ''} DISPONIBLE{filteredProducts.length > 1 ? 'S' : ''}
        </div>
      </div>

      {/* 2. Grille des Cartes Produits Épurées */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelectProduct={onSelectProduct}
              onOpenTdsModal={onOpenTdsModal}
              onToggleRfq={onToggleRfq}
              isAddedToRfq={selectedRfqProductIds.includes(product.id)}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-[#FFFFFF] border border-[#E4DDD3] rounded-[8px] p-12 text-center space-y-4 max-w-lg mx-auto">
          <div className="font-mono text-xs font-bold text-[#C29958] bg-[#FAF7F2] border border-[#E4DDD3] px-3 py-1.5 rounded-[4px] inline-block">
            INVENTAIRE · 0 CORRESPONDANCE
          </div>
          <h3 className="font-display text-lg font-bold text-[#221510]">
            Aucun ingrédient ne correspond à ces critères
          </h3>
          <p className="font-body text-xs text-[#5D5753] leading-relaxed">
            Modifiez votre terme de recherche ou sélectionnez une autre combinaison d'application et de famille de dérivé.
          </p>
          <div className="pt-2">
            <button
              onClick={handleResetFilters}
              className="px-5 py-2.5 text-xs font-display font-semibold uppercase tracking-wider text-[#221510] bg-[#C29958] rounded-[6px] hover:bg-[#b08745] transition-colors cursor-pointer border border-[#b08745]"
            >
              Afficher les 9 produits disponibles
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
