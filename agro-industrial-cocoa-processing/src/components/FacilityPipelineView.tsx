import React, { useState } from 'react';
import { INDUSTRIAL_PIPELINE_STEPS, FACILITY_KPI_METRICS, PROCESSING_BATCHES } from '../data/cocoaData';
import { CocoaPodSchematic, IndustrialPressDiagram } from './Illustrations';
import { ArrowRight, CheckCircle2, Gauge, Flame, Cog, Layers, Sparkles, Building, ChevronRight } from 'lucide-react';

interface FacilityPipelineViewProps {
  onNavigate: (view: string) => void;
  onSelectLot: (lotCode: string) => void;
}

export const FacilityPipelineView: React.FC<FacilityPipelineViewProps> = ({
  onNavigate,
  onSelectLot
}) => {
  const [activeStepIndex, setActiveStepIndex] = useState(2); // Broyage Fin par défaut

  const currentStep = INDUSTRIAL_PIPELINE_STEPS[activeStepIndex];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#221510] text-[#F8F4EE] rounded-[12px] border border-[#4A2C21] p-8 md:p-14 shadow-md">
        {/* Subtle geometric pattern overlay */}
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#C29958_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="relative z-10 max-w-4xl space-y-6">
          <div className="flex items-center gap-3 text-xs font-mono text-[#C29958] tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-[#C29958] inline-block animate-pulse" />
            <span>INGÉNIERIE AGRO-INDUSTRIELLE · SITE PRINCIPAL SAN PEDRO / HUB LE HAVRE</span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#FFFFFF] leading-[1.15] text-balance">
            TRANSFORMATION DU CACAO INDUSTRIEL DE HAUTE PRÉCISION
          </h1>

          <p className="font-body text-base md:text-lg text-[#E4DDD3]/90 leading-relaxed max-w-3xl">
            Du grain fermenté à la liqueur pure, au beurre de pression et aux poudres micronisées d’une finesse absolue. Nous combinons l'exigence agronomique africaine et sud-américaine avec les standards de raffinage suisses les plus stricts pour approvisionner les chocolatiers et industriels mondiaux.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={() => onNavigate('derivatives')}
              className="px-6 py-3 text-xs font-display font-semibold uppercase tracking-wider text-[#221510] bg-[#C29958] rounded-[8px] hover:bg-[#d4aa63] transition-colors inline-flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <span>Consulter le Catalogue Dérivés</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => onNavigate('rfq')}
              className="px-6 py-3 text-xs font-display font-semibold uppercase tracking-wider text-[#F8F4EE] bg-[#4A2C21] border border-[#C29958]/50 rounded-[8px] hover:bg-[#382118] transition-colors cursor-pointer"
            >
              Demander des Échantillons & Cotation
            </button>
          </div>
        </div>

        {/* Industrial KPI Metrics Strip */}
        <div className="mt-12 pt-8 border-t border-[#4A2C21]/80 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <div className="font-mono text-2xl sm:text-3xl font-bold text-[#FFFFFF] tabular-nums">
              {FACILITY_KPI_METRICS.annualCapacityMetricTons} <span className="text-sm font-sans font-normal text-[#C29958]">T/an</span>
            </div>
            <div className="font-display text-[11px] uppercase tracking-wider text-[#E4DDD3]/70 mt-1">
              Capacité de Broyage Annuelle
            </div>
          </div>

          <div>
            <div className="font-mono text-2xl sm:text-3xl font-bold text-[#FFFFFF] tabular-nums">
              450 <span className="text-sm font-sans font-normal text-[#C29958]">BAR</span>
            </div>
            <div className="font-display text-[11px] uppercase tracking-wider text-[#E4DDD3]/70 mt-1">
              Pressage Isotherme Beurre PPP
            </div>
          </div>

          <div>
            <div className="font-mono text-2xl sm:text-3xl font-bold text-[#FFFFFF] tabular-nums">
              99.85<span className="text-sm font-sans font-normal text-[#C29958]">%</span>
            </div>
            <div className="font-display text-[11px] uppercase tracking-wider text-[#E4DDD3]/70 mt-1">
              Granulométrie &lt; 75 µm Tamis Alpine
            </div>
          </div>

          <div>
            <div className="font-mono text-2xl sm:text-3xl font-bold text-[#FFFFFF] tabular-nums">
              {FACILITY_KPI_METRICS.fsscAuditScore}
            </div>
            <div className="font-display text-[11px] uppercase tracking-wider text-[#E4DDD3]/70 mt-1">
              Score d'Audit FSSC 22000 Ver. 6.0
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Process Pipeline Architecture */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E4DDD3] pb-4">
          <div>
            <span className="font-mono text-xs text-[#C29958] uppercase tracking-wider">
              LIGNE CONTINUE D'EXTRACTION INDUSTRIELLE
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#221510] mt-1">
              Architecture du Procédé en 5 Étapes
            </h2>
          </div>
          <p className="font-body text-xs text-[#5D5753] max-w-md">
            Chaque unité opératoire est asservie par régulateurs thermiques et granulométriques en temps réel, garantissant une stabilité rhéologique constante.
          </p>
        </div>

        {/* Step buttons ribbon */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
          {INDUSTRIAL_PIPELINE_STEPS.map((step, idx) => {
            const isActive = idx === activeStepIndex;
            return (
              <button
                key={step.stepNumber}
                onClick={() => setActiveStepIndex(idx)}
                className={`p-3.5 text-left border rounded-[8px] transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#221510] text-[#F8F4EE] border-[#221510] shadow-sm'
                    : 'bg-[#FFFFFF] text-[#221510] border-[#E4DDD3] hover:border-[#C29958] hover:bg-[#FAF7F2]'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`font-mono text-xs font-bold ${isActive ? 'text-[#C29958]' : 'text-[#817470]'}`}>
                    ÉTAPE {step.stepNumber}
                  </span>
                  {isActive && <CheckCircle2 className="w-3.5 h-3.5 text-[#C29958]" />}
                </div>
                <div className="font-display text-xs font-bold uppercase tracking-tight line-clamp-1">
                  {step.name.split(',')[0]}
                </div>
                <div className={`text-[10px] truncate mt-0.5 ${isActive ? 'text-[#E4DDD3]/70' : 'text-[#5D5753]'}`}>
                  {step.english}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Stage Detailed Workbench */}
        <div className="bg-[#FFFFFF] border border-[#E4DDD3] rounded-[8px] p-6 sm:p-8 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold px-2 py-0.5 bg-[#F1EDE7] text-[#4A2C21] rounded-[4px]">
                  ÉTAPE {currentStep.stepNumber} // 05
                </span>
                <span className="font-mono text-xs text-[#2E5A36] font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2E5A36]" />
                  CONTRÔLE QUALITÉ EN LIGNE ACTIF
                </span>
              </div>

              <h3 className="font-display text-xl sm:text-2xl font-bold text-[#221510]">
                {currentStep.name}
              </h3>
              <p className="font-body text-xs font-semibold text-[#C29958] uppercase tracking-wider">
                {currentStep.english}
              </p>

              <p className="font-body text-sm text-[#4f4541] leading-relaxed">
                {currentStep.description}
              </p>

              {/* Technical parameter metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#E4DDD3]">
                <div className="p-3 bg-[#F8F4EE] rounded-[6px]">
                  <div className="flex items-center gap-1.5 text-xs text-[#5D5753] font-medium mb-1">
                    <Flame className="w-3.5 h-3.5 text-[#C29958]" />
                    <span>Plage Thermique</span>
                  </div>
                  <div className="font-mono text-sm font-bold text-[#221510]">
                    {currentStep.temperature}
                  </div>
                </div>

                <div className="p-3 bg-[#F8F4EE] rounded-[6px]">
                  <div className="flex items-center gap-1.5 text-xs text-[#5D5753] font-medium mb-1">
                    <Gauge className="w-3.5 h-3.5 text-[#C29958]" />
                    <span>Cadence Opérationnelle</span>
                  </div>
                  <div className="font-mono text-sm font-bold text-[#221510]">
                    {currentStep.capacityPerHour}
                  </div>
                </div>

                <div className="p-3 bg-[#F8F4EE] rounded-[6px]">
                  <div className="flex items-center gap-1.5 text-xs text-[#5D5753] font-medium mb-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#2E5A36]" />
                    <span>Seuil de Tolérance</span>
                  </div>
                  <div className="font-mono text-xs font-bold text-[#2E5A36]">
                    {currentStep.checkpoint}
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Technical Diagram */}
            <div className="lg:col-span-5 bg-[#FCFAF7] border border-[#E4DDD3] p-4 rounded-[6px]">
              {activeStepIndex === 3 ? (
                <IndustrialPressDiagram className="w-full h-auto max-h-56" />
              ) : (
                <CocoaPodSchematic className="w-full h-auto max-h-56" />
              )}
              <div className="mt-2 text-[10px] text-center font-mono text-[#5D5753]">
                RÉFÉRENCE SCHÉMATIQUE UNITAIRE // ATELIER USINE SAN PEDRO #02
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Engineering Foundations: Raw Agriculture to Purified Chemistry */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-[#FFFFFF] border border-[#E4DDD3] rounded-[8px] p-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-semibold text-[#C29958]">
              01 // QUALITÉ AGRONOMIQUE & AMONT
            </span>
            <span className="font-mono text-xs text-[#5D5753]">14 250 PRODUCTEURS</span>
          </div>
          <h3 className="font-display text-lg font-bold text-[#221510]">
            Sélection Variétale & Fermentation Dirigée
          </h3>
          <p className="font-body text-xs text-[#4f4541] leading-relaxed">
            Nos fèves proviennent exclusivement de coopératives certifiées traçables au polygone GPS. Les fèves Forastero et Trinitario subissent 6 jours de fermentation sous feuilles de bananier avec aération biquotidienne pour libérer les précurseurs aromatiques du chocolat.
          </p>
          <ul className="space-y-2 text-xs text-[#1c1c18] pt-2">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C29958]" />
              <span>Indice de fermentation minimum garanti : <strong>&ge; 85% fèves saines</strong></span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C29958]" />
              <span>Taux d'humidité réceptacle usine : <strong>6.5% - 7.5% maximum</strong></span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C29958]" />
              <span>Conformité zéro déforestation UEDR (EU 2023/1115)</span>
            </li>
          </ul>
        </div>

        <div className="bg-[#FFFFFF] border border-[#E4DDD3] rounded-[8px] p-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-semibold text-[#C29958]">
              02 // EXCELLENCE DE PRESSAGE
            </span>
            <span className="font-mono text-xs text-[#2E5A36] font-semibold">SANS SOLVANT (100% MÉCANIQUE)</span>
          </div>
          <h3 className="font-display text-lg font-bold text-[#221510]">
            Fractionnement Lipidique & Rhéologie Maîtrisée
          </h3>
          <p className="font-body text-xs text-[#4f4541] leading-relaxed">
            L'extraction du beurre de cacao est 100% mécanique par presses hydrauliques fermées. Aucun hexane ni solvant chimique n'entre dans nos ateliers. Le beurre obtenu préserve sa forme cristalline bêta-prime idéale pour la casse et le tempérage du chocolat fin.
          </p>
          <ul className="space-y-2 text-xs text-[#1c1c18] pt-2">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C29958]" />
              <span>Pureté matière grasse : <strong>&ge; 99.85% (Beurre Pure Pression)</strong></span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C29958]" />
              <span>Acides gras libres (FFA) : <strong>&le; 1.25% exprimé en oléique</strong></span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C29958]" />
              <span>Point de fusion précis : <strong>34.0 °C à 35.2 °C</strong></span>
            </li>
          </ul>
        </div>
      </section>

      {/* Currently Available Lots in Factory Silos */}
      <section className="bg-[#F8F4EE] border border-[#E4DDD3] rounded-[8px] p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="font-mono text-xs text-[#C29958] uppercase tracking-wider">
              REGISTRE TEMPS RÉEL DE PRODUCTION
            </span>
            <h3 className="font-display text-xl font-bold text-[#221510] mt-0.5">
              Lots Disponibles & Traçables en Cuves Tempérées
            </h3>
          </div>
          <button
            onClick={() => onNavigate('traceability')}
            className="text-xs font-display font-semibold uppercase tracking-wider text-[#4A2C21] hover:text-[#221510] flex items-center gap-1 cursor-pointer"
          >
            <span>Consulter le Registre Complet</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {PROCESSING_BATCHES.map((batch) => (
            <div
              key={batch.lotCode}
              className="bg-[#FFFFFF] border border-[#E4DDD3] rounded-[8px] p-4 flex flex-col justify-between hover:border-[#C29958] transition-colors"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] font-bold text-[#221510]">
                    {batch.lotCode}
                  </span>
                  <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-[4px] ${
                    batch.status === 'VALIDÉ EXPORT'
                      ? 'bg-[#2E5A36]/10 text-[#2E5A36]'
                      : 'bg-[#C29958]/15 text-[#4A2C21]'
                  }`}>
                    {batch.status}
                  </span>
                </div>
                <div className="font-display text-xs font-bold text-[#4A2C21]">
                  Origine : {batch.originCountry}
                </div>
                <div className="text-[11px] text-[#5D5753] line-clamp-1">
                  {batch.cooperative}
                </div>
                <div className="font-mono text-[11px] text-[#221510] pt-1">
                  Humidité : <span className="font-semibold">{batch.moisturePercent}%</span> · Fermentation : <span className="font-semibold">{batch.fermentationScore}%</span>
                </div>
              </div>

              <div className="pt-4 mt-3 border-t border-[#E4DDD3]">
                <button
                  onClick={() => {
                    onSelectLot(batch.lotCode);
                    onNavigate('traceability');
                  }}
                  className="w-full py-1.5 text-center text-xs font-display font-semibold uppercase tracking-wider text-[#221510] bg-[#FAF7F2] border border-[#E4DDD3] rounded-[6px] hover:bg-[#C29958] hover:text-[#221510] transition-colors cursor-pointer"
                >
                  Inspecter le Lot
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
