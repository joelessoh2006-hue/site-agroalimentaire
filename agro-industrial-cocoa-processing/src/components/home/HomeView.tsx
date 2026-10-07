import React from 'react';
import { CocoaProduct } from '../../types';
import { COCOA_PRODUCTS } from '../../data/products';
import {
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Send
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
      <section className="bg-[#221510] text-[#F8F4EE] rounded-[8px] border border-[#4A2C21] p-8 sm:p-12 lg:p-16">
        <div className="max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#301C15] border border-[#4A2C21] rounded-[4px] text-xs font-mono text-[#C29958] uppercase tracking-wider">
            <span>Usine de San Pedro · Hub logistique Le Havre · Export mondial FCL</span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#FFFFFF] leading-[1.12]">
            Transformateur de cacao pur : beurres, poudres et masses pour l'industrie
          </h1>

          <p className="font-body text-base sm:text-lg text-[#E4DDD3]/90 leading-relaxed max-w-3xl">
            Broyage, pressage mécanique et raffinage de fèves ivoiriennes tracées par polygone GPS. Nous approvisionnons les chocolatiers, formulateurs agroalimentaires et marques cosmétiques sous certification FSSC 22000 et conformité EUDR 2023/1115.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={() => onNavigate('catalogue')}
              className="px-6 py-3.5 text-xs font-display font-bold uppercase tracking-wider text-[#221510] bg-[#C29958] rounded-[6px] hover:bg-[#b08745] transition-colors inline-flex items-center gap-2 cursor-pointer border border-[#b08745]"
            >
              <span>Consulter le catalogue technique (9 dérivés)</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('contact')}
              className="px-6 py-3.5 text-xs font-display font-semibold uppercase tracking-wider text-[#F8F4EE] bg-[#4A2C21] border border-[#C29958]/40 rounded-[6px] hover:bg-[#392118] transition-colors inline-flex items-center gap-2 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Demande de cotation ou échantillon R&D</span>
            </button>

            <button
              onClick={() => onNavigate('savoir-faire')}
              className="px-5 py-3.5 text-xs font-display font-semibold uppercase tracking-wider text-[#C29958] hover:text-[#FFFFFF] transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            >
              <span>Traçabilité & Procédé usine</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Industrial KPI Metrics Strip */}
        <div className="mt-14 pt-8 border-t border-[#4A2C21]/80 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <div className="font-mono text-2xl sm:text-3xl font-bold text-[#FFFFFF] tabular-nums">
              85 000 <span className="text-sm font-sans font-normal text-[#C29958]">t/an</span>
            </div>
            <div className="font-display text-[11px] uppercase tracking-wider text-[#E4DDD3]/70 mt-1">
              Capacité de broyage à San Pedro
            </div>
          </div>

          <div>
            <div className="font-mono text-2xl sm:text-3xl font-bold text-[#FFFFFF] tabular-nums">
              450 <span className="text-sm font-sans font-normal text-[#C29958]">bars</span>
            </div>
            <div className="font-display text-[11px] uppercase tracking-wider text-[#E4DDD3]/70 mt-1">
              Pressage mécanique isotherme
            </div>
          </div>

          <div>
            <div className="font-mono text-2xl sm:text-3xl font-bold text-[#FFFFFF] tabular-nums">
              &lt; 75 <span className="text-sm font-sans font-normal text-[#C29958]">µm</span>
            </div>
            <div className="font-display text-[11px] uppercase tracking-wider text-[#E4DDD3]/70 mt-1">
              Finesse alpine 200 mesh
            </div>
          </div>

          <div>
            <div className="font-mono text-2xl sm:text-3xl font-bold text-[#FFFFFF] tabular-nums">
              &lt; 0.050 <span className="text-sm font-sans font-normal text-[#C29958]">ppm</span>
            </div>
            <div className="font-display text-[11px] uppercase tracking-wider text-[#E4DDD3]/70 mt-1">
              Seuil ICP-MS cadmium par lot
            </div>
          </div>
        </div>
      </section>

      {/* 2. Segments de Marché B2B */}
      <section className="space-y-8">
        <div className="border-b border-[#E4DDD3] pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="font-mono text-xs text-[#C29958] uppercase tracking-wider font-bold">
              SOLUTIONS PAR FILIÈRE INDUSTRIELLE
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
          <div className="bg-[#FFFFFF] border border-[#E4DDD3] rounded-[8px] p-6 space-y-4 hover:border-[#C29958] transition-colors group">
            <div className="flex items-center justify-between border-b border-[#E4DDD3]/60 pb-3">
              <span className="font-mono text-xs font-bold text-[#9C7336] bg-[#FAF7F2] border border-[#E4DDD3] px-2.5 py-1 rounded-[4px] tracking-wider">
                SEG · 01 / CHO
              </span>
              <span className="font-mono text-[10px] text-[#78716C]">
                PPP · LIQ · POW
              </span>
            </div>
            <div>
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
          <div className="bg-[#FFFFFF] border border-[#E4DDD3] rounded-[8px] p-6 space-y-4 hover:border-[#C29958] transition-colors group">
            <div className="flex items-center justify-between border-b border-[#E4DDD3]/60 pb-3">
              <span className="font-mono text-xs font-bold text-[#9C7336] bg-[#FAF7F2] border border-[#E4DDD3] px-2.5 py-1 rounded-[4px] tracking-wider">
                SEG · 02 / BIS
              </span>
              <span className="font-mono text-[10px] text-[#78716C]">
                ALK 10-12 · KIB
              </span>
            </div>
            <div>
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
          <div className="bg-[#FFFFFF] border border-[#E4DDD3] rounded-[8px] p-6 space-y-4 hover:border-[#C29958] transition-colors group">
            <div className="flex items-center justify-between border-b border-[#E4DDD3]/60 pb-3">
              <span className="font-mono text-xs font-bold text-[#2E5A36] bg-[#2E5A36]/10 border border-[#2E5A36]/30 px-2.5 py-1 rounded-[4px] tracking-wider">
                INCI / COSMOS
              </span>
              <span className="font-mono text-[10px] text-[#78716C]">
                CAS 8002-31-1
              </span>
            </div>
            <div>
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
      {/* 3. Piliers Industriels & Gouvernance Opérationnelle */}
      <section className="space-y-6">
        <div className="border-b border-[#E4DDD3] pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="font-mono text-xs text-[#C29958] uppercase tracking-wider font-bold">
              CADRE NORMATIF & CAPACITÉS D'USINE
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#221510] mt-1">
              Gouvernance Industrielle & Logistique
            </h2>
          </div>
          <p className="font-body text-xs text-[#5D5753] max-w-sm">
            Audits continus, contrôle laboratoire par lot et expéditions maritimes cadencées vers l'Europe et l'Amérique du Nord.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pilier 1 : Traçabilité EUDR */}
          <div className="bg-[#FFFFFF] border border-[#E4DDD3] rounded-[8px] p-6 sm:p-7 flex flex-col justify-between space-y-5">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-[#E4DDD3] pb-2">
                <span className="font-mono text-xs font-bold text-[#2E5A36] bg-[#EBF5ED] px-2 py-0.5 rounded-[4px] border border-[#C5E1CB]">
                  EU 2023/1115
                </span>
                <span className="font-mono text-[10px] text-[#78716C]">
                  REG · TRACE
                </span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-[#2E5A36] font-bold uppercase tracking-wider block">
                  RÈGLEMENT UE 2023/1115
                </span>
                <h3 className="font-display text-lg font-bold text-[#221510] mt-0.5">
                  Traçabilité Polygonale GPS
                </h3>
              </div>
              <p className="font-body text-xs text-[#4f4541] leading-relaxed">
                Chaque lot est adossé aux polygones cartographiques de nos coopératives partenaires. Audits réguliers par imagerie satellite Sentinel-2 prouvant l'absence de déforestation post-2020.
              </p>
            </div>

            <div className="pt-3 border-t border-[#E4DDD3] font-mono text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-[#5D5753]">Superficie géomappée :</span>
                <strong className="text-[#221510]">38 450 ha</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5D5753]">Polygones audités :</span>
                <strong className="text-[#221510]">14 250 parcelles</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5D5753]">Conformité EUDR :</span>
                <strong className="text-[#2E5A36]">100% vérifiée</strong>
              </div>
            </div>
          </div>

          {/* Pilier 2 : Laboratoire ISO 17025 */}
          <div className="bg-[#FFFFFF] border border-[#E4DDD3] rounded-[8px] p-6 sm:p-7 flex flex-col justify-between space-y-5">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-[#E4DDD3] pb-2">
                <span className="font-mono text-xs font-bold text-[#221510] bg-[#FAF7F2] px-2 py-0.5 rounded-[4px] border border-[#E4DDD3]">
                  ISO/IEC 17025
                </span>
                <span className="font-mono text-[10px] text-[#78716C]">
                  LAB · ICP-MS
                </span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-[#C29958] font-bold uppercase tracking-wider block">
                  ACCRÉDITATION ISO 17025
                </span>
                <h3 className="font-display text-lg font-bold text-[#221510] mt-0.5">
                  Laboratoire Analytique Interne
                </h3>
              </div>
              <p className="font-body text-xs text-[#4f4541] leading-relaxed">
                Spectrométrie ICP-MS pour le dosage du cadmium (&lt; 0.050 ppm) et plomb, PCR temps réel pour Salmonella (375 g) et chromatographie HPLC pour mycotoxines avant toute libération.
              </p>
            </div>

            <div className="pt-3 border-t border-[#E4DDD3] space-y-2">
              <div className="flex flex-wrap gap-1 font-mono text-[10px]">
                <span className="bg-[#F8F4EE] border border-[#E4DDD3] px-2 py-0.5 rounded-[4px] text-[#221510]">FSSC 22000</span>
                <span className="bg-[#F8F4EE] border border-[#E4DDD3] px-2 py-0.5 rounded-[4px] text-[#221510]">Halal</span>
                <span className="bg-[#F8F4EE] border border-[#E4DDD3] px-2 py-0.5 rounded-[4px] text-[#221510]">Kasher</span>
                <span className="bg-[#F8F4EE] border border-[#E4DDD3] px-2 py-0.5 rounded-[4px] text-[#221510]">Bio / Cosmos</span>
              </div>
              <button
                onClick={() => onNavigate('qualite')}
                className="w-full py-2 px-3 text-xs font-display font-semibold uppercase tracking-wider text-[#221510] bg-[#F8F4EE] border border-[#E4DDD3] rounded-[6px] hover:border-[#C29958] hover:bg-[#FAF7F2] transition-colors cursor-pointer text-center"
              >
                Consulter les protocoles d'analyse
              </button>
            </div>
          </div>

          {/* Pilier 3 : Conditionnements & Logistique */}
          <div className="bg-[#FFFFFF] border border-[#E4DDD3] rounded-[8px] p-6 sm:p-7 flex flex-col justify-between space-y-5">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-[#E4DDD3] pb-2">
                <span className="font-mono text-xs font-bold text-[#4A2C21] bg-[#FAF7F2] px-2 py-0.5 rounded-[4px] border border-[#E4DDD3]">
                  FCL · SAN PEDRO
                </span>
                <span className="font-mono text-[10px] text-[#78716C]">
                  LOG · 24T/CIT
                </span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-[#C29958] font-bold uppercase tracking-wider block">
                  LOGISTIQUE FCL & LCL
                </span>
                <h3 className="font-display text-lg font-bold text-[#221510] mt-0.5">
                  Formats Export & Cadencement
                </h3>
              </div>
              <p className="font-body text-xs text-[#4f4541] leading-relaxed">
                Cartons 25 kg sous liner PE, sacs kraft soudés, fûts métalliques 190 kg, Big Bags 1 000 kg et citernes inox 316L (24 t liquides maintenues à 45°C). Départ portuaire direct à San Pedro.
              </p>
            </div>

            <div className="pt-3 border-t border-[#E4DDD3] space-y-2">
              <div className="font-mono text-[11px] text-[#5D5753]">
                Incoterms : <strong className="text-[#221510]">FOB San Pedro / CIF Le Havre, Rotterdam, Anvers</strong>
              </div>
              <button
                onClick={() => onNavigate('contact')}
                className="w-full py-2 px-3 text-xs font-display font-semibold uppercase tracking-wider text-[#221510] bg-[#C29958] rounded-[6px] hover:bg-[#b08745] transition-colors cursor-pointer text-center border border-[#b08745]"
              >
                Demander une cotation logistique
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Aperçu des 6 Premiers Ingrédients du Catalogue */}
      <section className="space-y-6">
        <div className="border-b border-[#E4DDD3] pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="font-mono text-xs text-[#C29958] uppercase tracking-wider font-bold">
              INGRÉDIENTS INDUSTRIELS DE RÉFÉRENCE
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#221510] mt-1">
              Extraits du Catalogue Technique
            </h2>
          </div>
          <button
            onClick={() => onNavigate('catalogue')}
            className="text-xs font-display font-bold uppercase tracking-wider text-[#221510] bg-[#FFFFFF] border border-[#E4DDD3] hover:border-[#C29958] px-4 py-2 rounded-[6px] transition-colors inline-flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
          >
            <span>Voir les 9 produits & filtrer</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#C29958]" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {COCOA_PRODUCTS.slice(0, 6).map((product) => {
            const isAdded = selectedRfqProductIds.includes(product.id);
            return (
              <div
                key={product.id}
                className="bg-[#FFFFFF] border border-[#E4DDD3] rounded-[8px] overflow-hidden flex flex-col justify-between hover:border-[#C29958] transition-colors group"
              >
                <div>
                  <div className="relative h-44 w-full bg-[#F1EDE7] overflow-hidden border-b border-[#E4DDD3]">
                    <ProductImage
                      src={product.image_url}
                      alt={product.name}
                      productName={product.name}
                      category={product.category}
                    />
                    <div className="absolute top-2.5 right-2.5">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-[4px] bg-[#221510]/85 text-[#C29958] border border-[#4A2C21]">
                        {product.category.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <div>
                      <span className="font-mono text-[10px] text-[#5D5753] block">
                        MOQ : {product.moq.split('(')[0]}
                      </span>
                      <h3 className="font-display text-base font-bold text-[#221510] group-hover:text-[#4A2C21] transition-colors leading-snug">
                        {product.name}
                      </h3>
                    </div>

                    {/* 2 Spécifications Clés Standard Barry Callebaut */}
                    <div className="grid grid-cols-2 divide-x divide-[#E4DDD3] bg-[#FAF7F2] border border-[#E4DDD3] rounded-[4px] font-mono text-xs">
                      {Object.entries(product.specs).slice(0, 2).map(([key, val]) => (
                        <div key={key} className="p-2 space-y-0.5">
                          <span className="text-[10px] text-[#5D5753] block truncate uppercase font-sans font-semibold">
                            {key.replace(/_/g, ' ')}
                          </span>
                          <span className="font-bold text-[#221510] block truncate">
                            {String(val)}
                          </span>
                        </div>
                      ))}
                    </div>

                    <p className="font-body text-xs text-[#5D5753] line-clamp-2">
                      {product.description}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-[#E4DDD3]/60 grid grid-cols-2 gap-2 mt-2 pt-3">
                  <button
                    onClick={() => onNavigate('produit', product.id)}
                    className="w-full py-2.5 px-2 text-center text-xs font-display font-bold uppercase tracking-wider text-[#221510] bg-[#FFFFFF] border border-[#E4DDD3] rounded-[6px] hover:border-[#221510] hover:bg-[#FAF7F2] transition-colors cursor-pointer"
                  >
                    Fiche Produit
                  </button>
                  <button
                    onClick={() => onToggleRfq(product)}
                    className={`w-full py-2.5 px-2 text-center text-xs font-display font-bold uppercase tracking-wider rounded-[6px] transition-colors cursor-pointer border ${
                      isAdded
                        ? 'bg-[#2E5A36] text-[#FFFFFF] border-[#2E5A36]'
                        : 'bg-[#C29958] text-[#221510] border-[#b08745] hover:bg-[#b08745]'
                    }`}
                  >
                    {isAdded ? 'Ajouté ✓' : 'Devis RFQ'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. Appel à l'Action B2B Industriel */}
      <section className="bg-[#FAF7F2] border border-[#E4DDD3] rounded-[8px] p-8 sm:p-12 text-center space-y-6">
        <div className="max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center justify-center font-mono text-xs font-bold text-[#C29958] bg-[#221510] px-3.5 py-1.5 rounded-[4px] border border-[#4A2C21] tracking-wider mb-2">
            AUDIT QA · SLA 48H
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#221510]">
            Homologation d'Ingrédients dans vos Lignes de Production
          </h2>
          <p className="font-body text-xs sm:text-sm text-[#5D5753] leading-relaxed">
            Notre desk export et nos ingénieurs qualité traitent vos demandes de cotation volume (FCL/LCL) et organisent l'expédition d'échantillons d'essais sous 48 heures.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={() => onNavigate('contact')}
            className="px-6 py-3 text-xs font-display font-bold uppercase tracking-wider text-[#221510] bg-[#C29958] rounded-[6px] hover:bg-[#b08745] transition-colors cursor-pointer border border-[#b08745]"
          >
            Déposer une demande de cotation ou échantillon
          </button>
          <button
            onClick={() => onNavigate('catalogue')}
            className="px-6 py-3 text-xs font-display font-semibold uppercase tracking-wider text-[#221510] bg-[#FFFFFF] border border-[#E4DDD3] rounded-[6px] hover:bg-[#F8F4EE] transition-colors cursor-pointer"
          >
            Consulter les 9 fiches techniques
          </button>
        </div>
      </section>
    </div>
  );
};
