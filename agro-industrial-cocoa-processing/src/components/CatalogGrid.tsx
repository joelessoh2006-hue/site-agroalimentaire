import React, { useState, useMemo } from 'react';
import { CatalogProduct, CatalogCategory, CatalogIndustry } from '../types';
import { CATALOG_PRODUCTS } from '../data/catalogData';
import { ProductCard } from './ProductCard';
import { Search, RotateCcw, Filter, Layers, Factory } from 'lucide-react';

interface CatalogGridProps {
  onOpenSpecs: (product: CatalogProduct) => void;
  onToggleRfq: (product: CatalogProduct) => void;
  selectedRfqProductIds: string[];
}

export const CatalogGrid: React.FC<CatalogGridProps> = ({
  onOpenSpecs,
  onToggleRfq,
  selectedRfqProductIds,
}) => {
  const [selectedIndustry, setSelectedIndustry] = useState<CatalogIndustry | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState<CatalogCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter products based on industry, category, and search query
  const filteredProducts = useMemo(() => {
    return CATALOG_PRODUCTS.filter((product) => {
      // Industry filter
      const matchesIndustry =
        selectedIndustry === 'all' || product.industry.includes(selectedIndustry);

      // Category filter
      const matchesCategory =
        selectedCategory === 'all' || product.category === selectedCategory;

      // Text search
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        query === '' ||
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.applications.some((app) => app.toLowerCase().includes(query)) ||
        Object.values(product.specs).some((val) => val.toLowerCase().includes(query));

      return matchesIndustry && matchesCategory && matchesSearch;
    });
  }, [selectedIndustry, selectedCategory, searchQuery]);

  const hasActiveFilters =
    selectedIndustry !== 'all' || selectedCategory !== 'all' || searchQuery.trim() !== '';

  const handleResetFilters = () => {
    setSelectedIndustry('all');
    setSelectedCategory('all');
    setSearchQuery('');
  };

  // Industry count helpers
  const countByIndustry = (ind: CatalogIndustry) =>
    CATALOG_PRODUCTS.filter((p) => p.industry.includes(ind)).length;

  const countByCategory = (cat: CatalogCategory) =>
    CATALOG_PRODUCTS.filter((p) => p.category === cat).length;

  return (
    <section className="space-y-10">
      {/* Catalog Title & Header */}
      <div className="border-b border-[#E4DDD3] pb-6 space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono text-[#C29958] uppercase tracking-wider">
          <span>CATALOGUE OFFICIEL DES DÉRIVÉS & FRACTIONS DU CACAO</span>
          <span>·</span>
          <span>DISPONIBILITÉ EN GROS & CONTRATS DE CAMPAGNE</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#221510]">
              Dérivés & Ingrédients Industriels de Précision
            </h1>
            <p className="font-body text-sm text-[#4f4541] max-w-2xl mt-1">
              9 fractions de cacao rigoureusement purifiées pour les industries agroalimentaires, chocolatières, cosmétiques et dermatologiques.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-[#5D5753] bg-[#FFFFFF] border border-[#E4DDD3] px-3 py-1.5 rounded-[6px]">
              Résultats : <strong className="text-[#221510]">{filteredProducts.length}</strong> / {CATALOG_PRODUCTS.length} produits
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Dual-Axis Filter Controls (Design System: segmented buttons, zero-pill discipline) */}
      <div className="bg-[#FFFFFF] border border-[#E4DDD3] rounded-[8px] p-5 sm:p-6 space-y-5 shadow-xs">
        {/* Top bar: Search & Reset */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-[#E4DDD3]/60 pb-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-[#5D5753] absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Rechercher par nom, application, point de fusion..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-[#F8F4EE] border border-[#E4DDD3] rounded-[8px] focus:outline-none focus:border-[#C29958] focus:bg-[#FFFFFF] transition-colors"
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

        {/* Dual Axis Controls: 1. Industrie, 2. Catégorie */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Axis 1: Industrie ('Alimentaire' / 'Cosmétique') */}
          <div className="space-y-2">
            <label className="font-display text-xs font-bold uppercase tracking-wider text-[#4A2C21] flex items-center gap-1.5">
              <Factory className="w-3.5 h-3.5 text-[#C29958]" />
              <span>Trier par Industrie Cible :</span>
            </label>

            <div className="inline-flex flex-wrap p-1 bg-[#F1EDE7] rounded-[8px] border border-[#E4DDD3] w-full">
              <button
                onClick={() => setSelectedIndustry('all')}
                className={`flex-1 min-w-[90px] py-2 px-3 text-xs font-display font-semibold uppercase tracking-wider rounded-[6px] transition-all cursor-pointer text-center ${
                  selectedIndustry === 'all'
                    ? 'bg-[#221510] text-[#FFFFFF] shadow-xs'
                    : 'text-[#4A2C21] hover:text-[#221510]'
                }`}
              >
                Toutes ({CATALOG_PRODUCTS.length})
              </button>
              <button
                onClick={() => setSelectedIndustry('alimentaire')}
                className={`flex-1 min-w-[110px] py-2 px-3 text-xs font-display font-semibold uppercase tracking-wider rounded-[6px] transition-all cursor-pointer text-center ${
                  selectedIndustry === 'alimentaire'
                    ? 'bg-[#221510] text-[#FFFFFF] shadow-xs'
                    : 'text-[#4A2C21] hover:text-[#221510]'
                }`}
              >
                Alimentaire ({countByIndustry('alimentaire')})
              </button>
              <button
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
          </div>

          {/* Axis 2: Catégorie ('Beurres', 'Poudres', 'Masses') */}
          <div className="space-y-2">
            <label className="font-display text-xs font-bold uppercase tracking-wider text-[#4A2C21] flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#C29958]" />
              <span>Trier par Catégorie de Fraction :</span>
            </label>

            <div className="inline-flex flex-wrap p-1 bg-[#F1EDE7] rounded-[8px] border border-[#E4DDD3] w-full">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`flex-1 min-w-[75px] py-2 px-2.5 text-xs font-display font-semibold uppercase tracking-wider rounded-[6px] transition-all cursor-pointer text-center ${
                  selectedCategory === 'all'
                    ? 'bg-[#221510] text-[#FFFFFF] shadow-xs'
                    : 'text-[#4A2C21] hover:text-[#221510]'
                }`}
              >
                Toutes
              </button>
              <button
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
                onClick={() => setSelectedCategory('masses')}
                className={`flex-1 min-w-[85px] py-2 px-2.5 text-xs font-display font-semibold uppercase tracking-wider rounded-[6px] transition-all cursor-pointer text-center ${
                  selectedCategory === 'masses'
                    ? 'bg-[#221510] text-[#FFFFFF] shadow-xs'
                    : 'text-[#4A2C21] hover:text-[#221510]'
                }`}
              >
                Masses ({countByCategory('masses')})
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Grid of Product Cards */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => {
            const isAdded = selectedRfqProductIds.includes(product.id);
            return (
              <ProductCard
                key={product.id}
                product={product}
                onOpenSpecs={onOpenSpecs}
                onToggleRfq={onToggleRfq}
                isAddedToRfq={isAdded}
              />
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-[#FFFFFF] border border-[#E4DDD3] rounded-[8px] p-12 text-center space-y-4 max-w-lg mx-auto">
          <div className="w-12 h-12 bg-[#F8F4EE] text-[#C29958] rounded-full flex items-center justify-center mx-auto">
            <Filter className="w-6 h-6" />
          </div>
          <h3 className="font-display text-lg font-bold text-[#221510]">
            Aucun dérivé ne correspond à ces critères
          </h3>
          <p className="font-body text-xs text-[#5D5753] leading-relaxed">
            Essayez de réinitialiser la recherche ou de changer la sélection d'industrie ({selectedIndustry}) et de catégorie ({selectedCategory}).
          </p>
          <div className="pt-2">
            <button
              onClick={handleResetFilters}
              className="px-4 py-2 text-xs font-display font-semibold uppercase tracking-wider text-[#221510] bg-[#C29958] rounded-[8px] hover:bg-[#b08745] transition-colors cursor-pointer"
            >
              Afficher tous les 9 produits
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
