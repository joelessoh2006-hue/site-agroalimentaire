import React, { useState, useMemo, useEffect } from 'react';
import { CocoaProduct, ProductCategory, IndustrySector } from '../../types';
import { COCOA_PRODUCTS } from '../../data/products';
import { Search, RotateCcw, Filter, Factory, Layers, FileText, Check, Plus, Package, Eye } from 'lucide-react';
import { ProductImage } from '../common/ProductImage';

interface CatalogueViewProps {
  onOpenSpecs: (product: CocoaProduct) => void;
  onOpenTdsModal: (product: CocoaProduct) => void;
  onToggleRfq: (product: CocoaProduct) => void;
  onSelectProduct: (productId: string) => void;
  selectedRfqProductIds: string[];
}

export const CatalogueView: React.FC<CatalogueViewProps> = ({
  onOpenSpecs,
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
    <section className="space-y-10">
      {/* Title & Description */}
      <div className="border-b border-[#E4DDD3] pb-6 space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono text-[#C29958] uppercase tracking-wider">
          <span>CATALOGUE OFFICIEL DES FRACTIONS & DÉRIVÉS DU CACAO</span>
          <span>·</span>
          <span>DISPONIBILITÉ SPOT & CONTRATS CADRES ANNUELS</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#221510]">
              Catalogue des 9 Ingrédients Industriels
            </h1>
            <p className="font-body text-sm text-[#4f4541] max-w-2xl mt-1">
              Beurres de pression pure et raffinés, poudres micronisées naturelles et alcalinisées, masses fluides et tourteaux. Filtrage combinatoire réactif instantané.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span
              aria-live="polite"
              aria-atomic="true"
              className="font-mono text-xs text-[#5D5753] bg-[#FFFFFF] border border-[#E4DDD3] px-3.5 py-1.5 rounded-[6px]"
            >
              Résultats : <strong className="text-[#221510] font-bold">{filteredProducts.length}</strong> / {COCOA_PRODUCTS.length} ingrédients
            </span>
          </div>
        </div>
      </div>

      {/* Dual-Axis Filter Controls Container */}
      <aside
        role="search"
        aria-label="Filtres combinatoires du catalogue"
        className="bg-[#FFFFFF] border border-[#E4DDD3] rounded-[10px] p-5 sm:p-6 space-y-6 shadow-xs"
      >
        {/* Search input + Reset */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-[#E4DDD3]/60 pb-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-[#5D5753] absolute left-3 top-2.5" />
            <input
              type="text"
              aria-label="Rechercher un ingrédient par nom, INCI, application"
              placeholder="Rechercher par nom, INCI, point de fusion, application..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-[#F8F4EE] border border-[#E4DDD3] rounded-[6px] focus:outline-none focus:border-[#C29958] focus:bg-[#FFFFFF] transition-colors"
            />
          </div>

          {hasActiveFilters && (
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-display font-semibold uppercase tracking-wider text-[#4A2C21] hover:text-[#221510] border border-[#E4DDD3] rounded-[6px] hover:bg-[#F8F4EE] transition-colors cursor-pointer self-start sm:self-auto"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Réinitialiser les filtres</span>
            </button>
          )}
        </div>

        {/* Dual Axis Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Axis 1 : Industrie */}
          <fieldset className="space-y-2 border-0 p-0 m-0">
            <legend className="font-display text-xs font-bold uppercase tracking-wider text-[#4A2C21] flex items-center gap-1.5 mb-1.5">
              <Factory className="w-3.5 h-3.5 text-[#C29958]" />
              <span>Secteur d'Application Cible :</span>
            </legend>

            <div className="inline-flex flex-wrap p-1 bg-[#F1EDE7] rounded-[8px] border border-[#E4DDD3] w-full">
              <button
                type="button"
                onClick={() => setSelectedIndustry('all')}
                className={`flex-1 min-w-[90px] py-2 px-3 text-xs font-display font-semibold uppercase tracking-wider rounded-[6px] transition-all cursor-pointer text-center ${
                  selectedIndustry === 'all'
                    ? 'bg-[#221510] text-[#FFFFFF] shadow-xs'
                    : 'text-[#4A2C21] hover:text-[#221510]'
                }`}
              >
                Tous ({COCOA_PRODUCTS.length})
              </button>
              <button
                type="button"
                onClick={() => setSelectedIndustry('alimentaire')}
                className={`flex-1 min-w-[110px] py-2 px-3 text-xs font-display font-semibold uppercase tracking-wider rounded-[6px] transition-all cursor-pointer text-center ${
                  selectedIndustry === 'alimentaire'
                    ? 'bg-[#221510] text-[#FFFFFF] shadow-xs'
                    : 'text-[#4A2C21] hover:text-[#221510]'
                }`}
              >
                Agroalimentaire ({countByIndustry('alimentaire')})
              </button>
              <button
                type="button"
                onClick={() => setSelectedIndustry('cosmetique')}
                className={`flex-1 min-w-[110px] py-2 px-3 text-xs font-display font-semibold uppercase tracking-wider rounded-[6px] transition-all cursor-pointer text-center ${
                  selectedIndustry === 'cosmetique'
                    ? 'bg-[#221510] text-[#FFFFFF] shadow-xs'
                    : 'text-[#4A2C21] hover:text-[#221510]'
                }`}
              >
                Cosmétique ({countByIndustry('cosmetique')})
              </button>
            </div>
          </fieldset>

          {/* Axis 2 : Catégorie */}
          <fieldset className="space-y-2 border-0 p-0 m-0">
            <legend className="font-display text-xs font-bold uppercase tracking-wider text-[#4A2C21] flex items-center gap-1.5 mb-1.5">
              <Layers className="w-3.5 h-3.5 text-[#C29958]" />
              <span>Famille de Dérivé :</span>
            </legend>

            <div className="inline-flex flex-wrap p-1 bg-[#F1EDE7] rounded-[8px] border border-[#E4DDD3] w-full">
              <button
                type="button"
                onClick={() => setSelectedCategory('all')}
                className={`flex-1 min-w-[70px] py-2 px-2.5 text-xs font-display font-semibold uppercase tracking-wider rounded-[6px] transition-all cursor-pointer text-center ${
                  selectedCategory === 'all'
                    ? 'bg-[#221510] text-[#FFFFFF] shadow-xs'
                    : 'text-[#4A2C21] hover:text-[#221510]'
                }`}
              >
                Toutes
              </button>
              <button
                type="button"
                onClick={() => setSelectedCategory('beurres')}
                className={`flex-1 min-w-[85px] py-2 px-2.5 text-xs font-display font-semibold uppercase tracking-wider rounded-[6px] transition-all cursor-pointer text-center ${
                  selectedCategory === 'beurres'
                    ? 'bg-[#221510] text-[#FFFFFF] shadow-xs'
                    : 'text-[#4A2C21] hover:text-[#221510]'
                }`}
              >
                Beurres ({countByCategory('beurres')})
              </button>
              <button
                type="button"
                onClick={() => setSelectedCategory('poudres')}
                className={`flex-1 min-w-[85px] py-2 px-2.5 text-xs font-display font-semibold uppercase tracking-wider rounded-[6px] transition-all cursor-pointer text-center ${
                  selectedCategory === 'poudres'
                    ? 'bg-[#221510] text-[#FFFFFF] shadow-xs'
                    : 'text-[#4A2C21] hover:text-[#221510]'
                }`}
              >
                Poudres ({countByCategory('poudres')})
              </button>
              <button
                type="button"
                onClick={() => setSelectedCategory('masses')}
                className={`flex-1 min-w-[95px] py-2 px-2.5 text-xs font-display font-semibold uppercase tracking-wider rounded-[6px] transition-all cursor-pointer text-center ${
                  selectedCategory === 'masses'
                    ? 'bg-[#221510] text-[#FFFFFF] shadow-xs'
                    : 'text-[#4A2C21] hover:text-[#221510]'
                }`}
              >
                Masses & Tourteaux ({countByCategory('masses')})
              </button>
            </div>
          </fieldset>
        </div>
      </aside>

      {/* Grid of 9 Product Cards */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => {
            const isAdded = selectedRfqProductIds.includes(product.id);
            return (
              <article
                key={product.id}
                className="bg-[#FFFFFF] rounded-[2px] border border-[#E4DDD3] overflow-hidden flex flex-col justify-between hover:border-[#C29958] transition-colors group"
              >
                {/* Zone cliquable principale : redirige vers les détails du produit */}
                <div
                  onClick={() => onSelectProduct(product.id)}
                  className="cursor-pointer flex-1 flex flex-col justify-between"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onSelectProduct(product.id);
                    }
                  }}
                  aria-label={`Voir la fiche détaillée de ${product.name}`}
                >
                  {/* Visual Header with Badges */}
                  <div className="relative h-48 sm:h-52 w-full bg-[#F1EDE7] overflow-hidden border-b border-[#E4DDD3]">
                    <ProductImage
                      src={product.image_url}
                      alt={product.name}
                      productName={product.name}
                      category={product.category}
                    />

                    {/* Sector badges overlay */}
                    <div className="absolute top-3 right-3 flex items-center gap-1.5 pointer-events-none">
                      {product.industry.map((ind) => (
                        <span
                          key={ind}
                          className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-[2px] ${
                            ind === 'cosmetique'
                              ? 'bg-[#221510] text-[#C29958] border border-[#C29958]/40'
                              : 'bg-[#F8F4EE] text-[#221510] border border-[#E4DDD3]'
                          }`}
                        >
                          {ind === 'cosmetique' ? 'Cosmétique' : 'Agroalimentaire'}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 sm:p-6 space-y-3.5">
                    {/* Category & ID */}
                    <div className="flex items-center justify-between border-b border-[#E4DDD3]/60 pb-2">
                      <span className="font-display text-[11px] font-bold uppercase tracking-wider text-[#C29958]">
                        {product.category === 'beurres'
                          ? 'BEURRES DE CACAO PURS'
                          : product.category === 'poudres'
                          ? 'POUDRES MICRONISÉES'
                          : 'MASSES & DÉRIVÉS'}
                      </span>
                      <span className="font-mono text-[10px] text-[#5D5753]">
                        MOQ : {product.moq.split('(')[0]}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <div>
                      <h3
                        className="font-display text-lg font-bold text-[#221510] leading-snug group-hover:text-[#4A2C21] transition-colors"
                      >
                        {product.name}
                      </h3>
                      {product.inciName && (
                        <span className="font-mono text-[10px] text-[#C29958] block mt-0.5">
                          INCI : {product.inciName}
                        </span>
                      )}
                      <p className="font-body text-xs text-[#4f4541] leading-relaxed mt-2 line-clamp-3">
                        {product.description}
                      </p>
                    </div>

                    {/* Key Specs with Dotted Leaders */}
                    <div className="pt-2 border-t border-[#E4DDD3] space-y-1.5 font-mono text-xs">
                      {Object.entries(product.specs).slice(0, 3).map(([key, val]) => (
                        <div key={key} className="flex items-center justify-between">
                          <span className="text-[#5D5753] whitespace-nowrap text-[11px] capitalize">
                            {key.replace(/_/g, ' ')}
                          </span>
                          <span className="flex-1 border-b border-dotted border-[#E4DDD3] mx-2 self-end mb-1" />
                          <span className="font-semibold text-[#221510] text-[11px] text-right truncate max-w-[55%]">
                            {val}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Packaging Preview */}
                    <div className="pt-1 text-[11px] text-[#5D5753] flex items-start gap-1.5">
                      <Package className="w-3.5 h-3.5 text-[#C29958] shrink-0 mt-0.5" />
                      <span className="truncate">
                        <strong className="text-[#221510]">Format :</strong> {product.packaging[0]?.format || 'Cartons 25 kg'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions: View Details, TDS Modal, Add to RFQ (Zone isolée de clic) */}
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="p-5 sm:p-6 pt-0 border-t border-[#E4DDD3] grid grid-cols-3 gap-2 mt-2 pt-3"
                >
                  <button
                    onClick={() => onSelectProduct(product.id)}
                    className="py-2 px-1 text-center text-xs font-display font-semibold uppercase tracking-wider text-[#221510] bg-[#FAF7F2] border border-[#E4DDD3] rounded-[2px] hover:border-[#C29958] hover:bg-[#FFFFFF] transition-colors inline-flex items-center justify-center gap-1 cursor-pointer"
                    title="Voir la fiche détaillée du produit"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#C29958]" />
                    <span>Détails</span>
                  </button>

                  <button
                    onClick={() => onOpenTdsModal(product)}
                    className="py-2 px-1 text-center text-xs font-display font-semibold uppercase tracking-wider text-[#221510] bg-[#FFFFFF] border border-[#E4DDD3] rounded-[2px] hover:border-[#C29958] hover:bg-[#FAF7F2] transition-colors inline-flex items-center justify-center gap-1 cursor-pointer"
                    title="Télécharger la fiche technique TDS certifiée"
                  >
                    <FileText className="w-3.5 h-3.5 text-[#C29958]" />
                    <span>TDS</span>
                  </button>

                  <button
                    onClick={() => onToggleRfq(product)}
                    className={`py-2 px-1 text-center text-xs font-display font-semibold uppercase tracking-wider rounded-[2px] transition-colors inline-flex items-center justify-center gap-1 cursor-pointer border ${
                      isAdded
                        ? 'bg-[#2E5A36] text-[#FFFFFF] border-[#2E5A36]'
                        : 'bg-[#C29958] text-[#221510] hover:bg-[#b08745] border-[#b08745]'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Ajouté</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        <span>RFQ</span>
                      </>
                    )}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-[#FFFFFF] border border-[#E4DDD3] rounded-[2px] p-12 text-center space-y-4 max-w-lg mx-auto">
          <div className="w-12 h-12 bg-[#F8F4EE] text-[#C29958] rounded-[2px] border border-[#E4DDD3] flex items-center justify-center mx-auto">
            <Filter className="w-6 h-6" />
          </div>
          <h3 className="font-display text-lg font-bold text-[#221510]">
            Aucun ingrédient ne correspond à ces critères
          </h3>
          <p className="font-body text-xs text-[#5D5753] leading-relaxed">
            Essayez de réinitialiser la recherche ou de changer les filtres de secteur ou de famille.
          </p>
          <div className="pt-2">
            <button
              onClick={handleResetFilters}
              className="px-5 py-2.5 text-xs font-display font-semibold uppercase tracking-wider text-[#221510] bg-[#C29958] rounded-[6px] hover:bg-[#b08745] transition-colors cursor-pointer"
            >
              Réinitialiser et afficher les 9 produits
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
