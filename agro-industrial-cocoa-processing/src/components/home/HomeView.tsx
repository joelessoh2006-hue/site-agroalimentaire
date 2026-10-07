import React from 'react';
import { CocoaProduct } from '../../types';
import { COCOA_PRODUCTS } from '../../data/products';
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Factory,
  Sparkles,
  Layers,
  FlaskConical,
  Globe2,
  PackageCheck,
  ExternalLink,
  Send,
  Award
} from 'lucide-react';
import { ProductImage } from '../common/ProductImage';

interface HomeViewProps {
  onNavigate: (view: string, productId?: string) => void;
  onOpenSpecs: (product: CocoaProduct) => void;
  onToggleRfq: (product: CocoaProduct) => void;
  selectedRfqProductIds: string[];
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onOpenSpecs,
  onToggleRfq,
  selectedRfqProductIds,
}) => {
  return (
    <div className="space-y-20">
      {/* 1. Hero Section Industrielle */}
      <section className="relative overflow-hidden bg-[#221510] text-[#F8F4EE] rounded-[14px] border border-[#4A2C21] p-8 sm:p-12 lg:p-16 shadow-xl">
        {/* Subtle geometric pattern overlay */}
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#C29958_1px,transparent_1px)] [background-size:18px_18px]" />

        <div className="relative z-10 max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2.5 px-3 py-1 bg-[#4A2C21]/70 border border-[#C29958]/30 rounded-full text-xs font-mono text-[#C29958] uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[#C29958] animate-pulse" />
            <span>UNITÉ INDUSTRIELLE INTÉGRÉE · SAN PEDRO & HUB EXPORT LE HAVRE</span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#FFFFFF] leading-[1.12]">
            TRANSFORMATION DU CACAO INDUSTRIEL DE HAUTE PRÉCISION
          </h1>

          <p className="font-body text-base sm:text-lg text-[#E4DDD3]/90 leading-relaxed max-w-3xl">
            Du terroir africain rigoureusement tracé par polygones GPS aux dérivés purs prêts pour vos lignes de fabrication. Nous approvisionnons les chocolatiers, formulateurs agroalimentaires et laboratoires cosmétiques mondiaux en beurres de première pression, poudres micronisées et masses pures.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={() => onNavigate('catalogue')}
              className="px-6 py-3.5 text-xs font-display font-bold uppercase tracking-wider text-[#221510] bg-[#C29958] rounded-[8px] hover:bg-[#b08745] transition-all inline-flex items-center gap-2 cursor-pointer shadow-md hover:translate-y-[-1px]"
            >
              <span>Consulter le Catalogue (9 Dérivés)</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('savoir-faire')}
              className="px-6 py-3.5 text-xs font-display font-semibold uppercase tracking-wider text-[#F8F4EE] bg-[#4A2C21] border border-[#C29958]/40 rounded-[8px] hover:bg-[#392118] transition-colors inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Traçabilité & Pipeline 6 Étapes</span>
            </button>

            <button
              onClick={() => onNavigate('contact')}
              className="px-5 py-3.5 text-xs font-display font-semibold uppercase tracking-wider text-[#C29958] hover:text-[#FFFFFF] transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Demande RFQ & Échantillons</span>
            </button>
          </div>
        </div>

        {/* Industrial KPI Metrics Strip */}
        <div className="mt-14 pt-8 border-t border-[#4A2C21]/80 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <div className="font-mono text-2xl sm:text-3xl font-bold text-[#FFFFFF] tabular-nums">
              85 000 <span className="text-sm font-sans font-normal text-[#C29958]">T/an</span>
            </div>
            <div className="font-display text-[11px] uppercase tracking-wider text-[#E4DDD3]/70 mt-1">
              Capacité de Broyage Annuelle
            </div>
          </div>

          <div>
            <div className="font-mono text-2xl sm:text-3xl font-bold text-[#FFFFFF] tabular-nums">
              450 <span className="text-sm font-sans font-normal text-[#C29958]">BARS</span>
            </div>
            <div className="font-display text-[11px] uppercase tracking-wider text-[#E4DDD3]/70 mt-1">
              Pressage Isotherme Beurre PPP
            </div>
          </div>

          <div>
            <div className="font-mono text-2xl sm:text-3xl font-bold text-[#FFFFFF] tabular-nums">
              99.85 <span className="text-sm font-sans font-normal text-[#C29958]">%</span>
            </div>
            <div className="font-display text-[11px] uppercase tracking-wider text-[#E4DDD3]/70 mt-1">
              Finesse Alpine &lt; 75 µm
            </div>
          </div>

          <div>
            <div className="font-mono text-2xl sm:text-3xl font-bold text-[#FFFFFF] tabular-nums">
              99.2 <span className="text-sm font-sans font-normal text-[#C29958]">/ 100</span>
            </div>
            <div className="font-display text-[11px] uppercase tracking-wider text-[#E4DDD3]/70 mt-1">
              Score d'Audit FSSC 22000 Ver. 6.0
            </div>
          </div>
        </div>
      </section>

      {/* 2. Segments de Marché B2B façon Barry Callebaut */}
      <section className="space-y-8">
        <div className="border-b border-[#E4DDD3] pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="font-mono text-xs text-[#C29958] uppercase tracking-wider font-bold">
              SOLUTIONS SUR-MESURE POUR LES INDUSTRIELS
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#221510] mt-1">
              Trois Grands Segments Métier
            </h2>
          </div>
          <p className="font-body text-xs text-[#5D5753] max-w-md">
            Chaque filière industrielle bénéficie de spécifications physico-chimiques et de conditionnements adaptés à ses contraintes opératoires.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Segment 1: Chocolaterie */}
          <div className="bg-[#FFFFFF] border border-[#E4DDD3] rounded-[10px] p-6 space-y-4 hover:border-[#C29958] transition-all group shadow-xs">
            <div className="w-12 h-12 rounded-[8px] bg-[#221510] text-[#C29958] flex items-center justify-center">
              <Factory className="w-6 h-6" />
            </div>
            <div>
              <span className="font-mono text-[10px] font-bold text-[#C29958] uppercase tracking-wider block">
                SEGMENT 01
              </span>
              <h3 className="font-display text-lg font-bold text-[#221510] group-hover:text-[#4A2C21] transition-colors mt-0.5">
                Chocolaterie Fine & Industrielle
              </h3>
            </div>
            <p className="font-body text-xs text-[#4f4541] leading-relaxed">
              Masse pure de cacao à granulométrie sub-micrométrique (&lt; 20 µm) pour un conchage accéléré, beurre de cacao Pure Prime Pressed (PPP) à cristallisation bêta V sonore, et poudres riches 20-22% pour ganaches de prestige.
            </p>
            <ul className="space-y-1.5 text-xs text-[#221510] pt-2 border-t border-[#E4DDD3]/60">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2E5A36] shrink-0" />
                <span>Masse Pure 52/54 (Pains 25 kg ou Citerne 24T)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2E5A36] shrink-0" />
                <span>Beurre Naturel Doré (FFA &lt; 1.75%)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2E5A36] shrink-0" />
                <span>Poudre Alcalinisée 20-22% Haut de Gamme</span>
              </li>
            </ul>
            <div className="pt-2">
              <button
                onClick={() => onNavigate('catalogue')}
                className="text-xs font-display font-semibold uppercase tracking-wider text-[#C29958] hover:text-[#221510] inline-flex items-center gap-1 cursor-pointer"
              >
                <span>Voir les ingrédients chocolatiers</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Segment 2: Biscuiterie & Glacerie */}
          <div className="bg-[#FFFFFF] border border-[#E4DDD3] rounded-[10px] p-6 space-y-4 hover:border-[#C29958] transition-all group shadow-xs">
            <div className="w-12 h-12 rounded-[8px] bg-[#4A2C21] text-[#C29958] flex items-center justify-center">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <span className="font-mono text-[10px] font-bold text-[#C29958] uppercase tracking-wider block">
                SEGMENT 02
              </span>
              <h3 className="font-display text-lg font-bold text-[#221510] group-hover:text-[#4A2C21] transition-colors mt-0.5">
                Biscuiterie, Confiserie & Glacerie
              </h3>
            </div>
            <p className="font-body text-xs text-[#4f4541] leading-relaxed">
              Poudres de cacao alcalinisées Dutch 10-12% hautement dispersibles sans grumeaux, poudres naturelles fruitées sans additif, tourteaux compacts (« Troutrou ») pour meunerie et beurres désodorisés à goût neutre.
            </p>
            <ul className="space-y-1.5 text-xs text-[#221510] pt-2 border-t border-[#E4DDD3]/60">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2E5A36] shrink-0" />
                <span>Poudre Alcalinisée 10-12% (Dispersibilité flash)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2E5A36] shrink-0" />
                <span>Beurre Désodorisé Blanc Raffiné (Neutre inodore)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2E5A36] shrink-0" />
                <span>Tourteaux 10-12% (Big Bags 1 000 kg)</span>
              </li>
            </ul>
            <div className="pt-2">
              <button
                onClick={() => onNavigate('catalogue')}
                className="text-xs font-display font-semibold uppercase tracking-wider text-[#C29958] hover:text-[#221510] inline-flex items-center gap-1 cursor-pointer"
              >
                <span>Découvrir les poudres & tourteaux</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Segment 3: Cosmétique & Dermopharmacie */}
          <div className="bg-[#FFFFFF] border border-[#E4DDD3] rounded-[10px] p-6 space-y-4 hover:border-[#C29958] transition-all group shadow-xs">
            <div className="w-12 h-12 rounded-[8px] bg-[#2E5A36] text-[#FFFFFF] flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <span className="font-mono text-[10px] font-bold text-[#C29958] uppercase tracking-wider block">
                SEGMENT 03
              </span>
              <h3 className="font-display text-lg font-bold text-[#221510] group-hover:text-[#4A2C21] transition-colors mt-0.5">
                Cosmétique & Dermopharmacie
              </h3>
            </div>
            <p className="font-body text-xs text-[#4f4541] leading-relaxed">
              Matières premières végétales certifiées Ecocert Cosmos. Beurre de cacao cosmétique pur (INCI: Theobroma Cacao Seed Butter, CAS: 8002-31-1) et masses concentrées en polyphénols antioxydants et théobromine pour soins réparateurs.
            </p>
            <ul className="space-y-1.5 text-xs text-[#221510] pt-2 border-t border-[#E4DDD3]/60">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2E5A36] shrink-0" />
                <span>Beurre Cosmétique Pur (Fusion corporelle 32°C)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2E5A36] shrink-0" />
                <span>Masse Cosmétique Détox (&gt; 4 000 mg polyphénols)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2E5A36] shrink-0" />
                <span>Contrôle microbiologique stérile Ph. Eur.</span>
              </li>
            </ul>
            <div className="pt-2">
              <button
                onClick={() => onNavigate('catalogue')}
                className="text-xs font-display font-semibold uppercase tracking-wider text-[#C29958] hover:text-[#221510] inline-flex items-center gap-1 cursor-pointer"
              >
                <span>Consulter la gamme cosmétique</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Bento Grid : Capacités & Gouvernance Industrielle */}
      <section className="space-y-6">
        <div className="border-b border-[#E4DDD3] pb-4">
          <span className="font-mono text-xs text-[#C29958] uppercase tracking-wider font-bold">
            EXCELLENCE OPÉRATIONNELLE & CONFORMITÉ MONDIALE
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#221510] mt-1">
            Infrastructures & Capacités Certifiées
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Bento Card 1 : Grand bloc Traçabilité EUDR */}
          <div className="md:col-span-2 bg-[#F8F4EE] border border-[#E4DDD3] rounded-[10px] p-6 sm:p-8 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-[#2E5A36] font-bold">
                <Globe2 className="w-4 h-4" />
                <span>REGLEMENT UE 2023/1115 · ZERO DEFORESTATION GARANTIE</span>
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-[#221510]">
                Traçabilité Polygonale GPS de l'Arbre au Conteneur
              </h3>
              <p className="font-body text-xs sm:text-sm text-[#4f4541] leading-relaxed max-w-2xl">
                100% de nos fèves proviennent de parcelles agricoles cartographiées par polygones GPS. Chaque lot expédié est audité par imagerie satellitaire radar (Sentinel-2) attestant l'absence totale de déforestation post-décembre 2020.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#E4DDD3] font-mono">
              <div>
                <span className="text-xl sm:text-2xl font-bold text-[#221510]">38 450 ha</span>
                <span className="block text-[11px] text-[#5D5753]">Superficie Géomappée</span>
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-bold text-[#221510]">14 250</span>
                <span className="block text-[11px] text-[#5D5753]">Polygones GPS Validés</span>
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-bold text-[#2E5A36]">100%</span>
                <span className="block text-[11px] text-[#5D5753]">Conforme EUDR</span>
              </div>
            </div>
          </div>

          {/* Bento Card 2 : Laboratoire ISO 17025 */}
          <div className="bg-[#FFFFFF] border border-[#E4DDD3] rounded-[10px] p-6 flex flex-col justify-between space-y-4 shadow-xs">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-[6px] bg-[#221510] text-[#C29958] flex items-center justify-center">
                <FlaskConical className="w-5 h-5" />
              </div>
              <h3 className="font-display text-lg font-bold text-[#221510]">
                Laboratoire Interne ISO 17025
              </h3>
              <p className="font-body text-xs text-[#5D5753] leading-relaxed">
                Spectrométrie ICP-MS pour le dosage ultra-précis du cadmium (&lt; 0.050 ppm) selon Règl. UE 488/2014, PCR temps réel pour Salmonella sp., et chromatographie HPLC mycotoxines.
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onNavigate('qualite')}
                className="w-full py-2 px-3 text-xs font-display font-semibold uppercase tracking-wider text-[#221510] bg-[#F8F4EE] border border-[#E4DDD3] rounded-[6px] hover:bg-[#C29958] transition-colors cursor-pointer text-center"
              >
                Explorer la Matrice Labo
              </button>
            </div>
          </div>

          {/* Bento Card 3 : Badges & Certifications Globales */}
          <div className="bg-[#FFFFFF] border border-[#E4DDD3] rounded-[10px] p-6 space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-[6px] bg-[#C29958]/20 text-[#C29958] flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-display text-lg font-bold text-[#221510]">
              Accréditations Mondiales
            </h3>
            <p className="font-body text-xs text-[#5D5753]">
              Lignes de production auditées en continu : FSSC 22000, ISO 9001, Halal International, Casher Parve, Ecocert Cosmos et Rainforest Alliance.
            </p>
            <div className="flex flex-wrap gap-1.5 pt-2 font-mono text-[10px]">
              <span className="bg-[#F8F4EE] border border-[#E4DDD3] px-2 py-0.5 rounded-[4px] text-[#221510]">FSSC 22000</span>
              <span className="bg-[#F8F4EE] border border-[#E4DDD3] px-2 py-0.5 rounded-[4px] text-[#221510]">ISO 9001</span>
              <span className="bg-[#F8F4EE] border border-[#E4DDD3] px-2 py-0.5 rounded-[4px] text-[#221510]">Halal</span>
              <span className="bg-[#F8F4EE] border border-[#E4DDD3] px-2 py-0.5 rounded-[4px] text-[#221510]">Kosher</span>
              <span className="bg-[#F8F4EE] border border-[#E4DDD3] px-2 py-0.5 rounded-[4px] text-[#221510]">Bio / EOS</span>
            </div>
          </div>

          {/* Bento Card 4 : Conditionnements & Logistique Maritime FCL/LCL */}
          <div className="md:col-span-2 bg-[#221510] text-[#F8F4EE] border border-[#4A2C21] rounded-[10px] p-6 sm:p-8 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-[#C29958] uppercase">
                <PackageCheck className="w-4 h-4" />
                <span>EXPÉDITIONS INTERNATIONALES FCL & LCL · INCOTERMS FOB / CIF</span>
              </div>
              <h3 className="font-display text-xl font-bold text-[#FFFFFF]">
                Conditionnements Industriels & Cadencement
              </h3>
              <p className="font-body text-xs sm:text-sm text-[#E4DDD3]/80 leading-relaxed max-w-2xl">
                Cartons export 25 kg sous doublure PE hermétique, sacs kraft multicouches soudés, fûts métalliques thermolaqués de 190 kg, Big Bags de 1 000 kg et citernes calorifugées inox 316L (24 tonnes liquides à 45°C).
              </p>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <span className="text-xs font-mono text-[#C29958]">Départ : Port Autonome de San Pedro / Hub Le Havre</span>
              <button
                onClick={() => onNavigate('contact')}
                className="px-4 py-2 text-xs font-display font-semibold uppercase tracking-wider text-[#221510] bg-[#C29958] rounded-[6px] hover:bg-[#b08745] transition-colors cursor-pointer"
              >
                Demander une cotation FOB / CIF
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Aperçu des 9 Ingrédients Clés */}
      <section className="space-y-6">
        <div className="border-b border-[#E4DDD3] pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="font-mono text-xs text-[#C29958] uppercase tracking-wider font-bold">
              CATALOGUE OFFICIEL DES FRACTIONS DE CACAO
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#221510] mt-1">
              Les 9 Ingrédients Industriels de Référence
            </h2>
          </div>
          <button
            onClick={() => onNavigate('catalogue')}
            className="text-xs font-display font-bold uppercase tracking-wider text-[#221510] bg-[#FFFFFF] border border-[#E4DDD3] hover:border-[#C29958] px-4 py-2 rounded-[6px] transition-colors inline-flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
          >
            <span>Voir la grille complète & filtres</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#C29958]" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {COCOA_PRODUCTS.slice(0, 6).map((product) => {
            const isAdded = selectedRfqProductIds.includes(product.id);
            return (
              <div
                key={product.id}
                className="bg-[#FFFFFF] border border-[#E4DDD3] rounded-[8px] overflow-hidden flex flex-col justify-between hover:border-[#C29958] hover:shadow-md transition-all group"
              >
                <div>
                  <div className="relative h-44 w-full bg-[#F1EDE7] overflow-hidden">
                    <ProductImage
                      src={product.image_url}
                      alt={product.name}
                      productName={product.name}
                      category={product.category}
                      className="group-hover:scale-105"
                    />
                    <div className="absolute top-2.5 right-2.5">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-[4px] bg-[#221510]/80 text-[#C29958] backdrop-blur-xs">
                        {product.category.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 space-y-2">
                    <span className="font-mono text-[10px] text-[#5D5753] block">
                      MOQ : {product.moq}
                    </span>
                    <h3 className="font-display text-base font-bold text-[#221510] group-hover:text-[#4A2C21] transition-colors leading-snug">
                      {product.name}
                    </h3>
                    <p className="font-body text-xs text-[#5D5753] line-clamp-2">
                      {product.description}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-[#E4DDD3]/60 grid grid-cols-2 gap-2 mt-2 pt-3">
                  <button
                    onClick={() => onNavigate('produit', product.id)}
                    className="w-full py-1.5 px-2 text-center text-xs font-display font-semibold uppercase tracking-wider text-[#221510] bg-[#F8F4EE] border border-[#E4DDD3] rounded-[6px] hover:border-[#C29958] transition-colors cursor-pointer"
                  >
                    Fiche Produit
                  </button>
                  <button
                    onClick={() => onToggleRfq(product)}
                    className={`w-full py-1.5 px-2 text-center text-xs font-display font-semibold uppercase tracking-wider rounded-[6px] transition-colors cursor-pointer ${
                      isAdded
                        ? 'bg-[#2E5A36] text-[#FFFFFF]'
                        : 'bg-[#C29958] text-[#221510] hover:bg-[#b08745]'
                    }`}
                  >
                    {isAdded ? 'Ajouté ✓' : '+ RFQ'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. Bannière d'Appel à l'Action B2B Finale */}
      <section className="bg-[#FAF7F2] border border-[#E4DDD3] rounded-[12px] p-8 sm:p-12 text-center space-y-6">
        <div className="max-w-2xl mx-auto space-y-3">
          <div className="w-12 h-12 bg-[#221510] text-[#C29958] rounded-full flex items-center justify-center mx-auto mb-2">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#221510]">
            Prêt à Homologuer nos Ingrédients dans vos Formulations ?
          </h2>
          <p className="font-body text-xs sm:text-sm text-[#5D5753] leading-relaxed">
            Notre cellule R&D et notre desk export vous accompagnent. Demandez des échantillons pilotes de 250 g à 1 kg expédiés sous 48h ou établissez votre calendrier annuel de livraison conteneurisée.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={() => onNavigate('contact')}
            className="px-6 py-3 text-xs font-display font-bold uppercase tracking-wider text-[#221510] bg-[#C29958] rounded-[8px] hover:bg-[#b08745] transition-colors cursor-pointer shadow-sm"
          >
            Déposer une Demande de Cotation & Échantillon
          </button>
          <button
            onClick={() => onNavigate('catalogue')}
            className="px-6 py-3 text-xs font-display font-semibold uppercase tracking-wider text-[#221510] bg-[#FFFFFF] border border-[#E4DDD3] rounded-[8px] hover:bg-[#F8F4EE] transition-colors cursor-pointer"
          >
            Voir les 9 Produits
          </button>
        </div>
      </section>
    </div>
  );
};
