import React, { useState } from 'react';
import { INDUSTRIAL_PIPELINE_6_STEPS, PROCESSING_BATCHES_DATA, ESG_EUDR_METRICS } from '../../data/pipelineData';
import { ProcessingBatch } from '../../types';
import { FileSpreadsheet, MapPin } from 'lucide-react';

interface SavoirFaireViewProps {
  onOpenCoaForBatch: (batch: ProcessingBatch) => void;
  onNavigate: (view: string) => void;
}

const UNIT_CODES: Record<string, string> = {
  '01': 'REC-01',
  '02': 'TOR-02',
  '03': 'MOY-03',
  '04': 'PRS-04',
  '05': 'ALC-05',
  '06': 'EMB-06',
};

const SHORT_STEP_TITLES: Record<string, string> = {
  '01': 'Réception Fèves',
  '02': 'Torréfaction',
  '03': 'Broyage & Affinage',
  '04': 'Pressage',
  '05': 'Alcalinisation',
  '06': 'Conditionnement',
};

const STEP_FLOW_SPECS: Record<string, { input: string; output: string; ccp: string }> = {
  '01': {
    input: 'Fèves brutes en sacs de jute (humidité < 7.5%, parcelles GPS vérifiées)',
    output: 'Fèves calibrées, dépoussiérées et épierrées en silos tempérés',
    ccp: 'Séparation magnétique néodyme, impuretés < 0.05%, calibre > 95 fèves/100g',
  },
  '02': {
    input: 'Fèves calibrées et dépoussiérées',
    output: 'Éclats de cacao (nibs) torréfiés, coques résiduelles séparées (< 1.25%)',
    ccp: 'Profil thermique continu 118-138°C, humidité résiduelle < 1.4%',
  },
  '03': {
    input: 'Éclats torréfiés (nibs)',
    output: 'Masse de cacao pure affinée (liqueur 52-54% MG)',
    ccp: 'Finesse laser Alpine < 20 µm, viscosité Casson 1.2-2.5 Pa·s, tamis 150 µm',
  },
  '04': {
    input: 'Masse de cacao pure à 95-105°C',
    output: 'Beurre de pression PPP limpide + Galettes de tourteaux ("Troutrou")',
    ccp: 'Asservissement 450 bar, MG tourteau 10-12% ou 20-22%, double filtration',
  },
  '05': {
    input: 'Tourteaux concassés + Solution alcalinisante K₂CO₃ alimentaire',
    output: 'Poudres de cacao micronisées (Naturelles & Alcalinisées Dutch)',
    ccp: 'Granulométrie 99.8% < 75 µm (Alpine 200 mesh), contrôle pH (5.2 à 8.4)',
  },
  '06': {
    input: 'Beurres, poudres micronisées et masses conditionnées en vrac',
    output: 'Cartons 25 kg liner PE, sacs kraft étanches, fûts 190 kg, citernes 24 T',
    ccp: 'Détection métaux X-Ray 100%, traçabilité GS1-128, scellé conteneur FCL',
  },
};

export const SavoirFaireView: React.FC<SavoirFaireViewProps> = ({
  onOpenCoaForBatch,
  onNavigate,
}) => {
  const [activeStepIndex, setActiveStepIndex] = useState(2); // Broyage Fin par défaut
  const [selectedLotCode, setSelectedLotCode] = useState<string>(PROCESSING_BATCHES_DATA[0].lotCode);

  const activeStep = INDUSTRIAL_PIPELINE_6_STEPS[activeStepIndex];
  const selectedBatch = PROCESSING_BATCHES_DATA.find((b) => b.lotCode === selectedLotCode) || PROCESSING_BATCHES_DATA[0];
  const activeFlowSpec = STEP_FLOW_SPECS[activeStep.stepNumber] || {
    input: 'Matière première brute',
    output: 'Produit transformé',
    ccp: activeStep.checkpoint,
  };

  return (
    <div className="space-y-14">
      {/* 1. Header & Introduction */}
      <div className="border-b border-[#E4DDD3] pb-5 space-y-2">
        <div className="flex items-center gap-2 text-xs font-mono text-[#C29958] uppercase tracking-wider">
          <span>INGÉNIERIE INDUSTRIELLE & CONFORMITÉ RÈGLEMENT UE 2023/1115</span>
          <span>·</span>
          <span>LIGNES DE PRODUCTION SAN PEDRO</span>
        </div>

        <div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#221510]">
            Savoir-faire Industriel & Traçabilité EUDR
          </h1>
          <p className="font-body text-xs sm:text-sm text-[#5D5753] max-w-3xl mt-1">
            Ligne continue de raffinage du cacao fève à fûts/cartons, adossée au géoréférencement GPS et au contrôle analytique en temps réel.
          </p>
        </div>
      </div>

      {/* 2. Pipeline Industriel en 6 Étapes (Barre segmentée continue) */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[#E4DDD3]/60 pb-3">
          <div>
            <span className="font-mono text-xs text-[#C29958] uppercase tracking-wider font-bold">
              PROCÉDÉ CONTINU DE RAFFINAGE DU CACAO
            </span>
            <h2 className="font-display text-2xl font-bold text-[#221510] mt-0.5">
              Les 6 Étapes de Transformation
            </h2>
          </div>
          <span className="text-xs text-[#78716C]">
            Sélectionnez une unité pour afficher les flux matières et le point critique (CCP)
          </span>
        </div>

        {/* 6 Step Continuous Segmented Control Bar */}
        <div className="border border-[#E4DDD3] rounded-lg bg-white overflow-hidden overflow-x-auto">
          <div className="divide-x divide-[#E4DDD3] grid grid-cols-6 min-w-[680px] lg:min-w-0">
            {INDUSTRIAL_PIPELINE_6_STEPS.map((step, idx) => {
              const isActive = idx === activeStepIndex;
              const unitCode = step.unitCode || UNIT_CODES[step.stepNumber] || `UN-0${idx + 1}`;
              const shortTitle = SHORT_STEP_TITLES[step.stepNumber] || step.title;
              return (
                <button
                  key={step.stepNumber}
                  onClick={() => setActiveStepIndex(idx)}
                  className={`p-3 sm:p-3.5 text-left transition-colors cursor-pointer flex flex-col justify-between border-t-2 relative ${
                    isActive
                      ? 'bg-[#FAF7F2] border-[#C29958]'
                      : 'bg-white border-transparent hover:bg-[#FAF7F2]/60'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className={`font-mono text-xs ${isActive ? 'text-[#9C7336] font-bold' : 'text-[#78716C]'}`}>
                      {step.stepNumber} · {unitCode}
                    </span>
                    <span className={`font-mono text-xs ${isActive ? 'text-[#9C7336] font-medium' : 'text-[#78716C]'}`}>
                      {step.capacityPerHour}
                    </span>
                  </div>
                  <div className="mt-2.5">
                    <span className={`font-display text-xs sm:text-sm block whitespace-nowrap ${isActive ? 'text-[#1C1917] font-semibold' : 'text-[#221510]'}`}>
                      {shortTitle}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Step Deep Dive Card */}
        <div className="bg-[#FFFFFF] border border-[#E4DDD3] rounded-[8px] p-5 sm:p-7 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E4DDD3]">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs text-[#C29958] font-bold">
                <span>{activeStep.stepNumber} · {activeStep.unitCode || UNIT_CODES[activeStep.stepNumber]}</span>
                <span className="text-[#5D5753]">·</span>
                <span className="uppercase text-[#78716C] font-normal">{activeStep.english}</span>
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-[#221510] mt-0.5">
                {activeStep.title}
              </h3>
            </div>

            {/* Quick Metrics Badge */}
            <div className="flex items-center gap-3 shrink-0 font-mono text-xs">
              <div className="px-3.5 py-2 bg-[#FAF7F2] rounded-[6px] border border-[#E4DDD3]">
                <span className="text-[#78716C] block text-[10px] font-sans">TEMPÉRATURE</span>
                <strong className="text-[#221510] text-xs font-bold">{activeStep.temperature}</strong>
              </div>
              <div className="px-3.5 py-2 bg-[#FAF7F2] rounded-[6px] border border-[#E4DDD3]">
                <span className="text-[#78716C] block text-[10px] font-sans">DÉBIT VOLUMIQUE</span>
                <strong className="text-[#221510] text-xs font-bold">{activeStep.capacityPerHour}</strong>
              </div>
            </div>
          </div>

          {/* Tableau télégraphique compact à 3 colonnes */}
          <div className="border border-[#E4DDD3] rounded-[6px] overflow-hidden bg-[#FAF7F2]">
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#E4DDD3] text-xs">
              <div className="p-3.5 space-y-1">
                <span className="font-mono text-[10px] text-[#78716C] uppercase font-bold tracking-wider block">
                  Matière entrante (Input)
                </span>
                <p className="font-body text-[#221510] text-xs leading-snug">
                  {activeFlowSpec.input}
                </p>
              </div>

              <div className="p-3.5 space-y-1">
                <span className="font-mono text-[10px] text-[#78716C] uppercase font-bold tracking-wider block">
                  Produit fini d'étape (Output)
                </span>
                <p className="font-body text-[#221510] text-xs leading-snug">
                  {activeFlowSpec.output}
                </p>
              </div>

              <div className="p-3.5 space-y-1">
                <span className="font-mono text-[10px] text-[#78716C] uppercase font-bold tracking-wider block">
                  Point de contrôle critique (CCP)
                </span>
                <p className="font-mono text-[#221510] text-xs leading-snug font-medium">
                  {activeFlowSpec.ccp}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Bloc EUDR & Géomapping (Conteneur clair minéral avec 4 KPIs) */}
      <section className="bg-[#FAF7F2] rounded-[8px] border border-[#E4DDD3] p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E4DDD3]">
          <div>
            <span className="font-mono text-xs text-[#C29958] uppercase font-bold tracking-wider block">
              DILIGENCE RAISONNÉE EUROPÉENNE (DDS) · RÈGLEMENT UE 2023/1115
            </span>
            <h2 className="font-display text-2xl font-bold text-[#221510] mt-0.5">
              Traçabilité Polygonale & Zéro Déforestation
            </h2>
          </div>

          <button
            onClick={() => onNavigate('contact')}
            className="px-4 py-2 text-xs font-display font-bold uppercase tracking-wider text-[#221510] bg-[#C29958] rounded-[6px] hover:bg-[#b08745] transition-colors cursor-pointer self-start sm:self-auto border border-[#b08745]"
          >
            Demander un Audit de Traçabilité
          </button>
        </div>

        {/* Metrics Grid (4 Statistiques géantes en JetBrains Mono) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono">
          <div className="bg-[#FFFFFF] p-4 rounded-[8px] border border-[#E4DDD3] hover:border-[#C29958] transition-colors">
            <span className="text-xl sm:text-2xl font-bold text-[#221510]">{ESG_EUDR_METRICS.totalGeoMappedHectares}</span>
            <span className="block text-[11px] text-[#C29958] mt-1 font-sans font-semibold">Superficie Cartographiée</span>
            <span className="text-[10px] text-[#78716C] block mt-0.5">Parcelles GPS polygonales</span>
          </div>

          <div className="bg-[#FFFFFF] p-4 rounded-[8px] border border-[#E4DDD3] hover:border-[#C29958] transition-colors">
            <span className="text-xl sm:text-2xl font-bold text-[#221510]">{ESG_EUDR_METRICS.polygonalPlotsVerified}</span>
            <span className="block text-[11px] text-[#C29958] mt-1 font-sans font-semibold">Parcelles Auditées</span>
            <span className="text-[10px] text-[#78716C] block mt-0.5">Contrôlées par satellites radar</span>
          </div>

          <div className="bg-[#FFFFFF] p-4 rounded-[8px] border border-[#E4DDD3] hover:border-[#C29958] transition-colors">
            <span className="text-xl sm:text-2xl font-bold text-[#2E5A36] inline-block">100%</span>
            <span className="block text-[11px] text-[#2E5A36] mt-1 font-sans font-semibold">Zéro Déforestation</span>
            <span className="text-[10px] text-[#78716C] block mt-0.5">Conformité post-2020 prouvée</span>
          </div>

          <div className="bg-[#FFFFFF] p-4 rounded-[8px] border border-[#E4DDD3] hover:border-[#C29958] transition-colors">
            <span className="text-xl sm:text-2xl font-bold text-[#221510]">-42% CO₂</span>
            <span className="block text-[11px] text-[#C29958] mt-1 font-sans font-semibold">Gain Carbone FCL</span>
            <span className="text-[10px] text-[#78716C] block mt-0.5">Raffinage local à la source</span>
          </div>
        </div>
      </section>

      {/* 4. Traçabilité des Lots Réels & Registre des Expéditions */}
      <section className="space-y-6">
        <div className="border-b border-[#E4DDD3] pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="font-mono text-xs text-[#C29958] uppercase tracking-wider font-bold">
              CONTRÔLE PAR LOT DE FABRICATION
            </span>
            <h2 className="font-display text-2xl font-bold text-[#221510] mt-0.5">
              Registre des Lots Industriels en Cours d'Expédition
            </h2>
          </div>
          <p className="font-body text-xs text-[#78716C] max-w-sm">
            Cliquez sur un lot pour afficher ses paramètres analytiques LIMS et ouvrir son certificat CoA.
          </p>
        </div>

        {/* Batch selector cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {PROCESSING_BATCHES_DATA.map((batch) => {
            const isSelected = batch.lotCode === selectedLotCode;
            return (
              <button
                key={batch.lotCode}
                onClick={() => setSelectedLotCode(batch.lotCode)}
                className={`p-3.5 text-left rounded-[6px] border transition-colors cursor-pointer flex flex-col justify-between space-y-2.5 ${
                  isSelected
                    ? 'bg-[#FFFFFF] border-[#C29958]'
                    : 'bg-[#FFFFFF] border-[#E4DDD3] hover:border-[#C29958] hover:bg-[#FAF7F2]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#221510]">{batch.lotCode}</span>
                    <span
                      className={`text-[9px] font-mono px-1.5 py-0.5 rounded-[4px] font-bold border ${
                        batch.status === 'VALIDÉ EXPORT'
                          ? 'bg-[#2E5A36]/10 text-[#2E5A36] border-[#2E5A36]/30'
                          : 'bg-[#C29958]/20 text-[#221510] border-[#C29958]/40'
                      }`}
                    >
                      {batch.status}
                    </span>
                  </div>
                  <span className="text-[11px] font-display font-semibold text-[#4A2C21] block mt-1 truncate">
                    {batch.originCountry} · {batch.cooperative.split('(')[0]}
                  </span>
                </div>

                <div className="font-mono text-[10px] text-[#78716C] border-t border-[#E4DDD3]/60 pt-2 flex justify-between">
                  <span>Fermentation: <strong className="text-[#221510]">{batch.fermentationScore}/100</strong></span>
                  <span>Cd: <strong className="text-[#221510]">{batch.cadmiumPpm} ppm</strong></span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Batch Detailed Card (Bande rectiligne et compacte) */}
        <div className="bg-[#FFFFFF] border border-[#E4DDD3] rounded-[8px] p-5 sm:p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-[#E4DDD3]">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs text-[#C29958] font-bold">
                <MapPin className="w-3.5 h-3.5 text-[#C29958]" />
                <span>LOT {selectedBatch.lotCode} · {selectedBatch.originCountry}</span>
              </div>
              <h3 className="font-display text-lg font-bold text-[#221510] mt-0.5">
                {selectedBatch.cooperative}
              </h3>
            </div>

            <button
              onClick={() => onOpenCoaForBatch(selectedBatch)}
              className="px-4 py-2 text-xs font-display font-bold uppercase tracking-wider text-[#221510] bg-[#C29958] rounded-[6px] hover:bg-[#b08745] transition-colors inline-flex items-center gap-2 cursor-pointer border border-[#b08745] self-start sm:self-auto"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Ouvrir le Certificat CoA</span>
            </button>
          </div>

          {/* Bande de métriques compacte et rectiligne */}
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#E4DDD3] bg-[#FAF7F2] border border-[#E4DDD3] rounded-[6px] font-mono text-xs">
            <div className="p-3">
              <span className="text-[10px] text-[#78716C] uppercase block font-sans">Fermentation</span>
              <strong className="text-sm font-bold text-[#221510] block mt-0.5">{selectedBatch.fermentationScore} / 100</strong>
              <span className="text-[10px] text-[#78716C] block font-sans">Grade export I</span>
            </div>
            <div className="p-3">
              <span className="text-[10px] text-[#78716C] uppercase block font-sans">Cadmium (ICP-MS)</span>
              <strong className="text-sm font-bold text-[#2E5A36] block mt-0.5">{selectedBatch.cadmiumPpm} mg/kg</strong>
              <span className="text-[10px] text-[#78716C] block font-sans">&lt; Seuil UE 0.050</span>
            </div>
            <div className="p-3">
              <span className="text-[10px] text-[#78716C] uppercase block font-sans">Calibre</span>
              <strong className="text-sm font-bold text-[#221510] block mt-0.5">{selectedBatch.beanCountPer100g} fèves / 100g</strong>
              <span className="text-[10px] text-[#78716C] block font-sans">Humidité &lt; 7.5%</span>
            </div>
            <div className="p-3">
              <span className="text-[10px] text-[#78716C] uppercase block font-sans">Statut sanitaire LIMS</span>
              <strong className="text-xs font-bold text-[#221510] block mt-0.5 truncate">{selectedBatch.fsscSeal}</strong>
              <span className="text-[10px] text-[#2E5A36] block font-sans font-bold">100% Libéré</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

