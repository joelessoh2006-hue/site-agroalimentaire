import React, { useState } from 'react';
import { CocoaProduct } from '../../types';
import { COCOA_PRODUCTS } from '../../data/products';
import {
  ChevronLeft,
  FileText,
  Plus,
  Check,
  Package,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Layers,
  Sparkles,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { ProductImage } from '../common/ProductImage';

interface ProductDetailViewProps {
  productId: string;
  onBack: () => void;
  onOpenTdsModal: (product: CocoaProduct) => void;
  onToggleRfq: (product: CocoaProduct) => void;
  onSelectProduct: (id: string) => void;
  isAddedToRfq: boolean;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({
  productId,
  onBack,
  onOpenTdsModal,
  onToggleRfq,
  onSelectProduct,
  isAddedToRfq,
}) => {
  const [activeTab, setActiveTab] = useState<'physicochemical' | 'microbiology' | 'packaging' | 'applications'>('physicochemical');

  const product = COCOA_PRODUCTS.find((p) => p.id === productId || p.slug === productId) || COCOA_PRODUCTS[0];

  // Complementary products from other categories
  const relatedProducts = COCOA_PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category !== product.category || p.industry.some((i) => product.industry.includes(i)))
  ).slice(0, 3);

  return (
    <div className="space-y-12">
      {/* 1. Breadcrumb & Navigation */}
      <nav aria-label="Fil d'Ariane" className="flex items-center gap-2 text-xs font-mono text-[#5D5753]">
        <button
          onClick={onBack}
          className="hover:text-[#221510] inline-flex items-center gap-1 transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span>Catalogue Dérivés</span>
        </button>
        <span>/</span>
        <span className="uppercase text-[#817470]">
          {product.category === 'beurres'
            ? 'Beurres de Cacao'
            : product.category === 'poudres'
            ? 'Poudres de Cacao'
            : 'Masses & Tourteaux'}
        </span>
        <span>/</span>
        <span className="text-[#221510] font-bold truncate max-w-xs">{product.name}</span>
      </nav>

      {/* 2. Main Product Hero & Media Presentation */}
      <section className="bg-[#FFFFFF] border border-[#E4DDD3] rounded-[12px] p-6 sm:p-8 lg:p-10 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left: Product Images with Zoom */}
        <div className="lg:col-span-5 space-y-4">
          <div className="relative aspect-4/3 rounded-[8px] overflow-hidden bg-[#F1EDE7] border border-[#E4DDD3]">
            <ProductImage
              src={product.image_url}
              alt={product.name}
              productName={product.name}
              category={product.category}
            />
            <div className="absolute top-3 right-3 flex items-center gap-1.5">
              {product.industry.map((ind) => (
                <span
                  key={ind}
                  className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-[4px] bg-[#221510]/85 text-[#C29958] backdrop-blur-xs shadow-xs"
                >
                  {ind === 'cosmetique' ? 'Cosmétique' : 'Agroalimentaire'}
                </span>
              ))}
            </div>
          </div>

          {/* Secondary macro texture */}
          <div className="grid grid-cols-2 gap-3">
            <div className="aspect-16/10 rounded-[6px] overflow-hidden bg-[#F1EDE7] border border-[#E4DDD3]">
              <ProductImage
                src={product.macro_image_url}
                alt={`${product.name} macro texture`}
                productName={`${product.name} Macro`}
                category={product.category}
              />
            </div>
            <div className="p-3 bg-[#FAF7F2] rounded-[6px] border border-[#E4DDD3] flex flex-col justify-center text-[11px] font-mono text-[#5D5753] space-y-1">
              <span className="text-[#221510] font-bold">Réf. Lot Usine :</span>
              <span>LOT-QC-2026-FSSC</span>
              <span className="text-[#2E5A36] font-semibold text-[10px]">Libéré après contrôle ICP-MS</span>
            </div>
          </div>
        </div>

        {/* Right: Synthesis & Purchasing Specs */}
        <div className="lg:col-span-7 space-y-5">
          <div className="border-b border-[#E4DDD3] pb-4 space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-mono text-[#C29958] font-bold">
              <span>RÉFÉRENCE ARTICLE : {product.id.toUpperCase()}</span>
              <span>·</span>
              <span>{product.origin}</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#221510]">
              {product.name}
            </h1>
            <p className="font-display text-xs font-semibold uppercase tracking-wider text-[#4A2C21]">
              {product.subtitle}
            </p>
            {product.inciName && (
              <div className="pt-1 font-mono text-xs text-[#5D5753] space-x-3">
                <span>INCI : <strong className="text-[#221510]">{product.inciName}</strong></span>
                {product.casNumber && <span>CAS : <strong className="text-[#221510]">{product.casNumber}</strong></span>}
              </div>
            )}
          </div>

          <p className="font-body text-xs sm:text-sm text-[#4f4541] leading-relaxed">
            {product.description}
          </p>

          <div className="bg-[#F8F4EE] rounded-[8px] p-4 border border-[#E4DDD3] grid grid-cols-2 sm:grid-cols-3 gap-4 font-mono text-xs">
            <div>
              <span className="text-[#5D5753] block text-[10px]">QUANTITÉ MINIMUM (MOQ)</span>
              <strong className="text-[#221510] font-bold">{product.moq}</strong>
            </div>
            <div>
              <span className="text-[#5D5753] block text-[10px]">DURÉE DE VIE (DLUO)</span>
              <strong className="text-[#221510] font-bold">{product.shelfLife.split('à')[0]}</strong>
            </div>
            <div>
              <span className="text-[#5D5753] block text-[10px]">TEINTE / COULEUR</span>
              <strong className="text-[#221510] font-bold truncate block">{product.colorGrade.split('(')[0]}</strong>
            </div>
          </div>

          {/* Key Advantages */}
          <div className="space-y-1.5">
            <span className="font-display text-xs font-bold uppercase tracking-wider text-[#4A2C21] block">
              Points Forts Industriels :
            </span>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-[#221510]">
              {product.keyFeatures.map((feat, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2E5A36] shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA Action Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={() => onToggleRfq(product)}
              className={`py-3 px-6 text-xs font-display font-bold uppercase tracking-wider rounded-[8px] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm ${
                isAddedToRfq
                  ? 'bg-[#2E5A36] text-[#FFFFFF]'
                  : 'bg-[#C29958] text-[#221510] hover:bg-[#b08745]'
              }`}
            >
              {isAddedToRfq ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Ajouté au Dossier RFQ ✓</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>Ajouter au Devis & Échantillons</span>
                </>
              )}
            </button>

            <button
              onClick={() => onOpenTdsModal(product)}
              className="py-3 px-5 text-xs font-display font-semibold uppercase tracking-wider text-[#221510] bg-[#FFFFFF] border border-[#E4DDD3] rounded-[8px] hover:border-[#C29958] hover:bg-[#FAF7F2] transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <FileText className="w-4 h-4 text-[#C29958]" />
              <span>Télécharger la Fiche Technique (TDS)</span>
            </button>
          </div>
        </div>
      </section>

      {/* 3. Onglets Techniques Normalisés */}
      <section className="bg-[#FFFFFF] border border-[#E4DDD3] rounded-[12px] p-6 sm:p-8 space-y-6 shadow-sm">
        {/* Tab switcher */}
        <div className="flex border-b border-[#E4DDD3] gap-4 overflow-x-auto text-xs font-display font-bold uppercase tracking-wider">
          <button
            onClick={() => setActiveTab('physicochemical')}
            className={`pb-3 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'physicochemical'
                ? 'border-[#C29958] text-[#221510]'
                : 'border-transparent text-[#5D5753] hover:text-[#221510]'
            }`}
          >
            1. Spécifications Physico-Chimiques
          </button>
          <button
            onClick={() => setActiveTab('microbiology')}
            className={`pb-3 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'microbiology'
                ? 'border-[#C29958] text-[#221510]'
                : 'border-transparent text-[#5D5753] hover:text-[#221510]'
            }`}
          >
            2. Microbiologie & Contaminants (Cd/Pb)
          </button>
          <button
            onClick={() => setActiveTab('packaging')}
            className={`pb-3 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'packaging'
                ? 'border-[#C29958] text-[#221510]'
                : 'border-transparent text-[#5D5753] hover:text-[#221510]'
            }`}
          >
            3. Conditionnements & Palettisation
          </button>
          <button
            onClick={() => setActiveTab('applications')}
            className={`pb-3 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'applications'
                ? 'border-[#C29958] text-[#221510]'
                : 'border-transparent text-[#5D5753] hover:text-[#221510]'
            }`}
          >
            4. Applications & Certifications
          </button>
        </div>

        {/* Tab 1: Spécifications Physico-Chimiques */}
        {activeTab === 'physicochemical' && (
          <div className="space-y-4">
            <div className="text-xs text-[#5D5753]">
              Méthodes normalisées conformes aux normes ISO, IOCCC et Codex Alimentarius Stan 87-1981 :
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-[#E4DDD3]">
                <thead>
                  <tr className="bg-[#F8F4EE] border-b border-[#E4DDD3] font-display text-[11px] uppercase tracking-wider text-[#4A2C21]">
                    <th className="py-2.5 px-3">Paramètre Analytique</th>
                    <th className="py-2.5 px-3">Valeur Spécifiée</th>
                    <th className="py-2.5 px-3">Unité</th>
                    <th className="py-2.5 px-3">Méthode de Mesure</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E4DDD3] font-mono text-xs">
                  {product.detailedSpecs.map((spec, idx) => (
                    <tr key={idx} className={idx % 2 === 1 ? 'bg-[#FCFAF7]' : ''}>
                      <td className="py-2.5 px-3 font-sans font-medium text-[#221510]">{spec.parameter}</td>
                      <td className="py-2.5 px-3 font-bold text-[#221510]">{spec.value}</td>
                      <td className="py-2.5 px-3 text-[#5D5753]">{spec.unit || '—'}</td>
                      <td className="py-2.5 px-3 text-[#5D5753]">{spec.standardMethod || 'Standard LIMS usine'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Microbiologie & Contaminants */}
        {activeTab === 'microbiology' && (
          <div className="space-y-6">
            <div className="space-y-3">
              <h4 className="font-display text-xs font-bold uppercase tracking-wider text-[#4A2C21]">
                Critères Microbiologiques (Tolérance Zéro Pathogènes) :
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border border-[#E4DDD3]">
                  <thead>
                    <tr className="bg-[#F8F4EE] border-b border-[#E4DDD3] font-display text-[11px] uppercase tracking-wider text-[#4A2C21]">
                      <th className="py-2 px-3">Micro-organisme</th>
                      <th className="py-2 px-3">Limite Acceptable</th>
                      <th className="py-2 px-3">Méthode d'Essai ISO</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E4DDD3] font-mono text-xs">
                    {product.microbiologicalSpecs.map((m, idx) => (
                      <tr key={idx} className={idx % 2 === 1 ? 'bg-[#FCFAF7]' : ''}>
                        <td className="py-2 px-3 font-sans font-medium text-[#221510]">{m.parameter}</td>
                        <td className="py-2 px-3 font-bold text-[#2E5A36]">{m.target}</td>
                        <td className="py-2 px-3 text-[#5D5753]">{m.standardMethod}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="space-y-3 border-t border-[#E4DDD3] pt-4">
              <h4 className="font-display text-xs font-bold uppercase tracking-wider text-[#4A2C21]">
                Contrôle des Contaminants & Métaux Lourds (Cadmium / Plomb) :
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border border-[#E4DDD3]">
                  <thead>
                    <tr className="bg-[#F8F4EE] border-b border-[#E4DDD3] font-display text-[11px] uppercase tracking-wider text-[#4A2C21]">
                      <th className="py-2 px-3">Contaminant</th>
                      <th className="py-2 px-3">Seuil Interne d'Usine</th>
                      <th className="py-2 px-3">Conformité Réglementaire</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E4DDD3] font-mono text-xs">
                    {product.contaminantsSpecs.map((c, idx) => (
                      <tr key={idx} className={idx % 2 === 1 ? 'bg-[#FCFAF7]' : ''}>
                        <td className="py-2 px-3 font-sans font-medium text-[#221510]">{c.parameter}</td>
                        <td className="py-2 px-3 font-bold text-[#221510]">{c.limit}</td>
                        <td className="py-2 px-3 text-[#2E5A36] font-semibold">{c.compliance}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Conditionnements Industriels */}
        {activeTab === 'packaging' && (
          <div className="space-y-4">
            <div className="text-xs text-[#5D5753]">
              Formats certifiés pour le transport maritime sous température contrôlée ou conteneurs FCL :
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {product.packaging.map((pack, idx) => (
                <div key={idx} className="bg-[#FAF7F2] border border-[#E4DDD3] rounded-[8px] p-4 space-y-2">
                  <div className="w-8 h-8 rounded-[6px] bg-[#221510] text-[#C29958] flex items-center justify-center">
                    <Package className="w-4 h-4" />
                  </div>
                  <h4 className="font-display text-xs font-bold text-[#221510] uppercase">
                    Format {idx + 1}
                  </h4>
                  <p className="font-body text-xs text-[#4f4541]">
                    {pack.format}
                  </p>
                  <div className="pt-2 border-t border-[#E4DDD3] font-mono text-[11px] text-[#5D5753] space-y-1">
                    <div>Poids net : <strong className="text-[#221510]">{pack.netWeightKg} kg</strong></div>
                    <div>Palettisation : <strong className="text-[#221510]">{pack.palletSpec}</strong></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Applications & Certifications */}
        {activeTab === 'applications' && (
          <div className="space-y-6">
            <div className="space-y-3">
              <h4 className="font-display text-xs font-bold uppercase tracking-wider text-[#4A2C21]">
                Applications Industrielles Conseillées :
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {product.applications.map((app, i) => (
                  <div key={i} className="flex items-center gap-2 p-2.5 bg-[#FAF7F2] rounded-[6px] border border-[#E4DDD3] text-xs">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#2E5A36] shrink-0" />
                    <span className="font-medium text-[#221510]">{app}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3 border-t border-[#E4DDD3] pt-4">
              <h4 className="font-display text-xs font-bold uppercase tracking-wider text-[#4A2C21]">
                Labels & Certifications Validés pour ce Produit :
              </h4>
              <div className="flex flex-wrap gap-2">
                {product.certifications.map((cert) => (
                  <span
                    key={cert}
                    className="px-3 py-1 bg-[#F8F4EE] border border-[#E4DDD3] rounded-[6px] text-xs font-mono font-semibold text-[#221510]"
                  >
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 4. Produits Complémentaires Associés */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-[#E4DDD3] pb-3">
          <h3 className="font-display text-lg font-bold text-[#221510]">
            Ingrédients Complémentaires pour vos Formulations
          </h3>
          <button
            onClick={onBack}
            className="text-xs font-display font-semibold uppercase text-[#C29958] hover:text-[#221510] inline-flex items-center gap-1 cursor-pointer"
          >
            <span>Voir tout le catalogue</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {relatedProducts.map((rel) => (
            <div
              key={rel.id}
              onClick={() => onSelectProduct(rel.id)}
              className="bg-[#FFFFFF] border border-[#E4DDD3] rounded-[8px] p-4 hover:border-[#C29958] transition-all cursor-pointer space-y-2 group"
            >
              <div className="flex items-center justify-between text-[10px] font-mono text-[#5D5753]">
                <span>{rel.category.toUpperCase()}</span>
                <span>MOQ: {rel.moq.split('(')[0]}</span>
              </div>
              <h4 className="font-display text-xs font-bold text-[#221510] group-hover:text-[#4A2C21] transition-colors truncate">
                {rel.name}
              </h4>
              <p className="font-body text-[11px] text-[#5D5753] line-clamp-2">
                {rel.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
