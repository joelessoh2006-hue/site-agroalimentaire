import React, { useState } from 'react';
import { INDUSTRIAL_PIPELINE_6_STEPS, PROCESSING_BATCHES_DATA, ESG_EUDR_METRICS } from '../../data/pipelineData';
import { ProcessingBatch } from '../../types';
import {
  Factory,
  Globe2,
  ShieldCheck,
  CheckCircle2,
  Flame,
  Cog,
  Layers,
  Sparkles,
  Package,
  Calendar,
  FileSpreadsheet,
  ArrowRight,
  MapPin,
  Satellite
} from 'lucide-react';

interface SavoirFaireViewProps {
  onOpenCoaForBatch: (batch: ProcessingBatch) => void;
  onNavigate: (view: string) => void;
}

export const SavoirFaireView: React.FC<SavoirFaireViewProps> = ({
  onOpenCoaForBatch,
  onNavigate,
}) => {
  const [activeStepIndex, setActiveStepIndex] = useState(2); // Broyage Fin par défaut
  const [selectedLotCode, setSelectedLotCode] = useState<string>(PROCESSING_BATCHES_DATA[0].lotCode);

  const activeStep = INDUSTRIAL_PIPELINE_6_STEPS[activeStepIndex];
  const selectedBatch = PROCESSING_BATCHES_DATA.find((b) => b.lotCode === selectedLotCode) || PROCESSING_BATCHES_DATA[0];

  const getStepIcon = (idx: number) => {
    switch (idx) {
      case 0: return <Factory className="w-5 h-5 text-[#C29958]" />;
      case 1: return <Flame className="w-5 h-5 text-[#C29958]" />;
      case 2: return <Cog className="w-5 h-5 text-[#C29958]" />;
      case 3: return <Layers className="w-5 h-5 text-[#C29958]" />;
      case 4: return <Sparkles className="w-5 h-5 text-[#C29958]" />;
      case 5: return <Package className="w-5 h-5 text-[#C29958]" />;
      default: return <Cog className="w-5 h-5 text-[#C29958]" />;
    }
  };

  return (
    <div className="space-y-16">
      {/* 1. Header & Introduction */}
      <div className="border-b border-[#E4DDD3] pb-6 space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono text-[#C29958] uppercase tracking-wider">
          <span>INGÉNIERIE INDUSTRIELLE & CONFORMITÉ RÈGLEMENT UE 2023/1115</span>
          <span>·</span>
          <span>LIGNES DE PRODUCTION SAN PEDRO</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#221510]">
              Savoir-faire Industriel & Traçabilité EUDR
            </h1>
            <p className="font-body text-sm text-[#4f4541] max-w-2xl mt-1">
              De la parcelle agricole géoréférencée par polygone GPS au conditionnement hermétique d'export. Une chaîne opératoire continue en 6 étapes sans rupture de traçabilité.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-[#2E5A36] bg-[#2E5A36]/10 border border-[#2E5A36]/30 px-3 py-1.5 rounded-[6px] font-bold">
              100% ZÉRO DÉFORESTATION POST-2020
            </span>
          </div>
        </div>
      </div>

      {/* 2. Pipeline Industriel en 6 Étapes (Interactif) */}
      <section className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 border-b border-[#E4DDD3]/60 pb-3">
          <div>
            <span className="font-mono text-xs text-[#C29958] uppercase tracking-wider font-bold">
              PROCÉDÉ CONTINU DE RAFFINAGE DU CACAO
            </span>
            <h2 className="font-display text-2xl font-bold text-[#221510] mt-0.5">
              Les 6 Étapes de Transformation
            </h2>
          </div>
          <span className="text-xs text-[#5D5753]">
            Sélectionnez une unité pour afficher les paramètres physico-chimiques et points de contrôle
          </span>
        </div>

        {/* 6 Step Navigation Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {INDUSTRIAL_PIPELINE_6_STEPS.map((step, idx) => {
            const isActive = idx === activeStepIndex;
            return (
              <button
                key={step.stepNumber}
                onClick={() => setActiveStepIndex(idx)}
                className={`p-3 text-left rounded-[8px] border transition-all cursor-pointer flex flex-col justify-between min-h-[92px] ${
                  isActive
                    ? 'bg-[#221510] text-[#FFFFFF] border-[#221510] shadow-sm'
                    : 'bg-[#FFFFFF] text-[#4A2C21] border-[#E4DDD3] hover:border-[#C29958] hover:bg-[#F8F4EE]'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className={`font-mono text-xs font-bold ${isActive ? 'text-[#C29958]' : 'text-[#817470]'}`}>
                    {step.stepNumber}
                  </span>
                  {getStepIcon(idx)}
                </div>
                <div>
                  <span className={`font-display text-xs font-bold block truncate ${isActive ? 'text-[#FFFFFF]' : 'text-[#221510]'}`}>
                    {step.title.split(',')[0]}
                  </span>
                  <span className={`text-[10px] block truncate ${isActive ? 'text-[#E4DDD3]/70' : 'text-[#5D5753]'}`}>
                    {step.capacityPerHour}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Step Deep Dive Card */}
        <div className="bg-[#FFFFFF] border border-[#E4DDD3] rounded-[10px] p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-[#E4DDD3]">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-[#C29958] font-bold">
                  ÉTAPE {activeStep.stepNumber} / 06
                </span>
                <span className="text-xs text-[#5D5753]">·</span>
                <span className="font-mono text-xs text-[#5D5753] uppercase">{activeStep.english}</span>
              </div>
              <h3 className="font-display text-2xl font-bold text-[#221510]">
                {activeStep.title}
              </h3>
              <p className="font-body text-xs sm:text-sm text-[#4f4541] leading-relaxed">
                {activeStep.description}
              </p>
            </div>

            {/* Quick Metrics Badge */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 shrink-0 font-mono text-xs">
              <div className="p-3 bg-[#F8F4EE] rounded-[6px] border border-[#E4DDD3]">
                <span className="text-[#5D5753] block text-[10px]">TEMPÉRATURE</span>
                <strong className="text-[#221510] text-sm font-bold">{activeStep.temperature}</strong>
              </div>
              <div className="p-3 bg-[#F8F4EE] rounded-[6px] border border-[#E4DDD3]">
                <span className="text-[#5D5753] block text-[10px]">DÉBIT MASSIQUE</span>
                <strong className="text-[#221510] text-sm font-bold">{activeStep.capacityPerHour}</strong>
              </div>
            </div>
          </div>

          {/* Details & Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="space-y-3">
              <h4 className="font-display text-xs font-bold uppercase tracking-wider text-[#4A2C21] flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#2E5A36]" />
                <span>Paramètres Critiques & Points de Contrôle :</span>
              </h4>
              <ul className="space-y-2 text-xs text-[#221510]">
                {activeStep.criticalParameters.map((param, i) => (
                  <li key={i} className="flex items-start gap-2 bg-[#F8F4EE] p-2.5 rounded-[6px] border border-[#E4DDD3]/60">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#2E5A36] shrink-0 mt-0.5" />
                    <span>{param}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-display text-xs font-bold uppercase tracking-wider text-[#4A2C21] flex items-center gap-1.5">
                <Globe2 className="w-4 h-4 text-[#C29958]" />
                <span>Exigence Réglementaire EUDR & Bilan Matière :</span>
              </h4>
              <div className="bg-[#FAF7F2] border border-[#E4DDD3] rounded-[8px] p-4 space-y-3 text-xs">
                <div className="font-mono text-[11px] text-[#221510] font-semibold">
                  POINT DE VÉRIFICATION : {activeStep.checkpoint}
                </div>
                <p className="text-[#4f4541] leading-relaxed text-[11px]">
                  {activeStep.eudrRelevance}
                </p>
                <div className="text-[10px] text-[#5D5753] font-mono border-t border-[#E4DDD3] pt-2">
                  Validation automatique par le système MES d'usine et synchronisation ERP export.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Cadre Zéro Déforestation EUDR & Indicateurs ESG */}
      <section className="bg-[#221510] text-[#F8F4EE] rounded-[12px] border border-[#4A2C21] p-8 sm:p-12 space-y-8 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#4A2C21]/80 pb-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono text-[#C29958] uppercase">
              <Satellite className="w-4 h-4" />
              <span>DILIGENCE RAISONNÉE EUROPÉENNE (DDS) · RÈGLEMENT UE 2023/1115</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#FFFFFF]">
              Engagements Zéro Déforestation & Géomapping
            </h2>
            <p className="font-body text-xs sm:text-sm text-[#E4DDD3]/80 leading-relaxed">
              Pour chaque lot exporté vers les ports de l'Union Européenne (Le Havre, Rotterdam, Anvers), nous émettons un numéro de référence DDS officiel adossé aux polygones cartographiques de chaque coopérative productrice.
            </p>
          </div>

          <div className="shrink-0">
            <button
              onClick={() => onNavigate('contact')}
              className="px-4 py-2.5 text-xs font-display font-semibold uppercase tracking-wider text-[#221510] bg-[#C29958] rounded-[6px] hover:bg-[#b08745] transition-colors cursor-pointer"
            >
              Demander un Audit de Traçabilité
            </button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 font-mono">
          <div className="bg-[#301C15] p-4 rounded-[8px] border border-[#4A2C21]">
            <span className="text-xl sm:text-2xl font-bold text-[#FFFFFF]">{ESG_EUDR_METRICS.totalGeoMappedHectares}</span>
            <span className="block text-[11px] text-[#C29958] mt-1">Superficie Cartographiée</span>
            <span className="text-[10px] text-[#E4DDD3]/60 block mt-0.5">Parcelles GPS polygonales</span>
          </div>

          <div className="bg-[#301C15] p-4 rounded-[8px] border border-[#4A2C21]">
            <span className="text-xl sm:text-2xl font-bold text-[#FFFFFF]">{ESG_EUDR_METRICS.polygonalPlotsVerified}</span>
            <span className="block text-[11px] text-[#C29958] mt-1">Parcelles Auditées</span>
            <span className="text-[10px] text-[#E4DDD3]/60 block mt-0.5">Contrôlées par satellites radar</span>
          </div>

          <div className="bg-[#301C15] p-4 rounded-[8px] border border-[#4A2C21]">
            <span className="text-xl sm:text-2xl font-bold text-[#2E5A36] bg-[#2E5A36]/20 px-2 py-0.5 rounded-[4px] inline-block">100% CONFORME</span>
            <span className="block text-[11px] text-[#C29958] mt-1">Déforestation Post-2020</span>
            <span className="text-[10px] text-[#E4DDD3]/60 block mt-0.5">Zéro déforestation prouvée</span>
          </div>

          <div className="bg-[#301C15] p-4 rounded-[8px] border border-[#4A2C21]">
            <span className="text-xl sm:text-2xl font-bold text-[#FFFFFF]">-42% CO₂</span>
            <span className="block text-[11px] text-[#C29958] mt-1">Gain Carbone Maritime</span>
            <span className="text-[10px] text-[#E4DDD3]/60 block mt-0.5">Raffinage local à la source</span>
          </div>
        </div>

        {/* 3 Pillars of Sourcing */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 text-xs">
          <div className="space-y-2">
            <h4 className="font-display font-bold text-sm text-[#C29958] uppercase">
              1. Rémunération Décente & Primes
            </h4>
            <p className="text-[#E4DDD3]/80 leading-relaxed">
              Versement direct de primes de qualité et de durabilité aux membres des coopératives certifiées Rainforest Alliance et Fairtrade. Financement d'infrastructures scolaires et de santé communautaires.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-display font-bold text-sm text-[#C29958] uppercase">
              2. Imagerie Satellitaire Sentinel-2
            </h4>
            <p className="text-[#E4DDD3]/80 leading-relaxed">
              Croisement mensuel des contours parcellaires avec les images multispectrales haute résolution (10m) des satellites européens Sentinel pour détecter toute coupe forestière ou dégradation anormale du couvert.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-display font-bold text-sm text-[#C29958] uppercase">
              3. Valeur Ajoutée à la Source
            </h4>
            <p className="text-[#E4DDD3]/80 leading-relaxed">
              Notre modèle rompt avec l'exportation brute de fèves : 100% de la transformation a lieu dans nos usines de San Pedro et d'Abidjan, créant des emplois techniques qualifiés et réduisant le volume maritime exporté.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Traçabilité des Lots Réels & Visualisation des Certificats CoA */}
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
          <p className="font-body text-xs text-[#5D5753] max-w-sm">
            Cliquez sur un lot pour inspecter son terroir, ses critères analytiques et ouvrir son certificat officiel d'analyse (CoA).
          </p>
        </div>

        {/* Batch selector cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PROCESSING_BATCHES_DATA.map((batch) => {
            const isSelected = batch.lotCode === selectedLotCode;
            return (
              <button
                key={batch.lotCode}
                onClick={() => setSelectedLotCode(batch.lotCode)}
                className={`p-4 text-left rounded-[8px] border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                  isSelected
                    ? 'bg-[#FFFFFF] border-[#C29958] shadow-md ring-2 ring-[#C29958]/20'
                    : 'bg-[#FFFFFF] border-[#E4DDD3] hover:border-[#C29958] hover:bg-[#F8F4EE]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#221510]">{batch.lotCode}</span>
                    <span
                      className={`text-[9px] font-mono px-1.5 py-0.5 rounded-[4px] font-bold ${
                        batch.status === 'VALIDÉ EXPORT'
                          ? 'bg-[#2E5A36]/10 text-[#2E5A36]'
                          : 'bg-[#C29958]/20 text-[#221510]'
                      }`}
                    >
                      {batch.status}
                    </span>
                  </div>
                  <span className="text-[11px] font-display font-semibold text-[#4A2C21] block mt-1">
                    {batch.originCountry} · {batch.cooperative.split('(')[0]}
                  </span>
                </div>

                <div className="font-mono text-[10px] text-[#5D5753] border-t border-[#E4DDD3]/60 pt-2 space-y-0.5">
                  <div className="flex justify-between">
                    <span>Fermentation :</span>
                    <strong className="text-[#221510]">{batch.fermentationScore}/100</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Cadmium :</span>
                    <strong className="text-[#221510]">{batch.cadmiumPpm} ppm</strong>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Batch Detailed Card */}
        <div className="bg-[#FFFFFF] border border-[#E4DDD3] rounded-[10px] p-6 sm:p-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E4DDD3] pb-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#C29958] font-bold">
                <MapPin className="w-4 h-4 text-[#C29958]" />
                <span>DOSSIER QUALITÉ COMPLET : {selectedBatch.lotCode}</span>
              </div>
              <h3 className="font-display text-xl font-bold text-[#221510] mt-1">
                {selectedBatch.cooperative}
              </h3>
              <p className="text-xs text-[#5D5753]">
                Terroir : {selectedBatch.region} ({selectedBatch.originCountry}) · Campagne : {selectedBatch.cropSeason}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onOpenCoaForBatch(selectedBatch)}
                className="px-4 py-2 text-xs font-display font-bold uppercase tracking-wider text-[#221510] bg-[#C29958] rounded-[6px] hover:bg-[#b08745] transition-colors inline-flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>Ouvrir le Certificat CoA</span>
              </button>
            </div>
          </div>

          {/* Batch Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
            <div className="p-3 bg-[#F8F4EE] rounded-[6px] border border-[#E4DDD3]">
              <span className="text-[#5D5753] block text-[10px]">TAUX FERMENTATION</span>
              <strong className="text-[#221510] text-sm font-bold">{selectedBatch.fermentationScore} / 100</strong>
            </div>
            <div className="p-3 bg-[#F8F4EE] rounded-[6px] border border-[#E4DDD3]">
              <span className="text-[#5D5753] block text-[10px]">TENEUR CADMIUM (ICP-MS)</span>
              <strong className="text-[#2E5A36] text-sm font-bold">{selectedBatch.cadmiumPpm} mg/kg</strong>
            </div>
            <div className="p-3 bg-[#F8F4EE] rounded-[6px] border border-[#E4DDD3]">
              <span className="text-[#5D5753] block text-[10px]">CALIBRE (GRAINS/100G)</span>
              <strong className="text-[#221510] text-sm font-bold">{selectedBatch.beanCountPer100g}</strong>
            </div>
            <div className="p-3 bg-[#F8F4EE] rounded-[6px] border border-[#E4DDD3]">
              <span className="text-[#5D5753] block text-[10px]">SCEAU SANITAIRE</span>
              <strong className="text-[#221510] text-xs font-bold truncate block">{selectedBatch.fsscSeal}</strong>
            </div>
          </div>

          {/* Sensory & Tanker */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-body border-t border-[#E4DDD3] pt-4">
            <div>
              <span className="font-display font-bold text-xs uppercase text-[#4A2C21] block mb-1">
                Profil Sensoriel Validé au Panel Interne :
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedBatch.sensoryNotes.map((note, i) => (
                  <span key={i} className="px-2.5 py-1 bg-[#FAF7F2] border border-[#E4DDD3] rounded-[4px] text-[#221510] font-medium">
                    {note}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="font-display font-bold text-xs uppercase text-[#4A2C21] block mb-1">
                Emplacement Logistique & Destination :
              </span>
              <div className="font-mono text-xs text-[#221510] bg-[#FAF7F2] p-2.5 rounded-[4px] border border-[#E4DDD3]">
                {selectedBatch.tankerVesselRef} · Dérivé alloué : {selectedBatch.allocatedDerivative}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
