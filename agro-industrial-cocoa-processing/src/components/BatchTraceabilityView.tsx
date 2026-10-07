import React, { useState } from 'react';
import { PROCESSING_BATCHES } from '../data/cocoaData';
import { ProcessingBatch } from '../types';
import { ShieldCheck, MapPin, Calendar, CheckCircle2, FileText, Search, AlertCircle, Droplets, Flame, Award } from 'lucide-react';

interface BatchTraceabilityViewProps {
  selectedLotCode: string;
  onSelectLotCode: (lotCode: string) => void;
  onOpenCoaForBatch: (batch: ProcessingBatch) => void;
}

export const BatchTraceabilityView: React.FC<BatchTraceabilityViewProps> = ({
  selectedLotCode,
  onSelectLotCode,
  onOpenCoaForBatch,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const currentBatch =
    PROCESSING_BATCHES.find((b) => b.lotCode === selectedLotCode) || PROCESSING_BATCHES[0];

  const filteredBatches = PROCESSING_BATCHES.filter(
    (b) =>
      b.lotCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.originCountry.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.cooperative.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-10">
      {/* Page Header */}
      <div className="border-b border-[#E4DDD3] pb-6 space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono text-[#C29958] uppercase tracking-wider">
          <span>GRAND LIVRE DE TRAÇABILITÉ DES LOTS · CONFORMITÉ UEDR & BLOC-CHAÎNE AGRO</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#221510]">
              Inspection & Généalogie des Lots Industriels
            </h1>
            <p className="font-body text-sm text-[#4f4541] max-w-2xl mt-1">
              Vérifiez la traçabilité complète de la parcelle agricole jusqu'au silo d'affinage. Données de fermentation, conformité métaux lourds et validation FSSC 22000.
            </p>
          </div>

          <div className="w-full md:w-72">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-[#5D5753] absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Chercher numéro de lot, coopérative..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-[#FFFFFF] border border-[#E4DDD3] rounded-[8px] focus:outline-none focus:border-[#C29958]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Lot Selection Ribbon */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredBatches.map((batch) => {
          const isSelected = batch.lotCode === currentBatch.lotCode;
          return (
            <button
              key={batch.lotCode}
              onClick={() => onSelectLotCode(batch.lotCode)}
              className={`p-4 text-left border rounded-[8px] transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[#221510] text-[#F8F4EE] border-[#221510] shadow-md ring-1 ring-[#C29958]'
                  : 'bg-[#FFFFFF] text-[#221510] border-[#E4DDD3] hover:border-[#C29958]'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`font-mono text-xs font-bold ${isSelected ? 'text-[#C29958]' : 'text-[#221510]'}`}>
                  {batch.lotCode}
                </span>
                <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-[4px] ${
                  isSelected ? 'bg-[#C29958] text-[#221510]' : 'bg-[#2E5A36]/10 text-[#2E5A36]'
                }`}>
                  {batch.status}
                </span>
              </div>
              <div className="font-display text-xs font-bold uppercase tracking-tight">
                {batch.originCountry} · {batch.region.split(',')[0]}
              </div>
              <div className={`text-[11px] truncate mt-0.5 ${isSelected ? 'text-[#E4DDD3]/70' : 'text-[#5D5753]'}`}>
                {batch.cooperative}
              </div>
            </button>
          );
        })}
      </div>

      {/* Comprehensive Batch Dossier */}
      <div className="bg-[#FFFFFF] border border-[#E4DDD3] rounded-[8px] p-6 sm:p-10 space-y-8 shadow-xs">
        {/* Dossier Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-6 border-b border-[#E4DDD3] gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <span className="font-mono text-sm font-bold text-[#221510] px-2.5 py-1 bg-[#F1ECE3] rounded-[4px]">
                {currentBatch.lotCode}
              </span>
              <span className="font-mono text-xs font-semibold text-[#2E5A36] flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-[#2E5A36]" />
                AUDIT CONFORME FSSC 22000
              </span>
            </div>
            <h2 className="font-display text-2xl font-bold text-[#221510] pt-2">
              Dossier de Libération de Lot · {currentBatch.originCountry}
            </h2>
            <p className="font-body text-xs text-[#5D5753]">
              Affectation industrielle : <strong className="text-[#4A2C21]">{currentBatch.allocatedDerivative}</strong> · Emplacement usine : {currentBatch.tankerVesselRef}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onOpenCoaForBatch(currentBatch)}
              className="px-4 py-2.5 text-xs font-display font-semibold uppercase tracking-wider text-[#221510] bg-[#C29958] hover:bg-[#b08745] rounded-[8px] transition-colors cursor-pointer inline-flex items-center gap-2 shadow-xs"
            >
              <FileText className="w-4 h-4 text-[#221510]" />
              <span>Générer Certificat d'Analyse (CoA)</span>
            </button>
          </div>
        </div>

        {/* 3-Column Agricultural & Analytical Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Col 1: Origin & Plantation */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-display text-xs font-bold uppercase tracking-wider text-[#4A2C21] border-b border-[#E4DDD3] pb-2">
              <MapPin className="w-4 h-4 text-[#C29958]" />
              <span>Origine Parcellaire & Coopérative</span>
            </div>

            <div className="space-y-2 text-xs">
              <div>
                <span className="text-[#5D5753] block text-[11px]">Coopérative Partenaire</span>
                <strong className="text-[#221510] font-medium">{currentBatch.cooperative}</strong>
              </div>

              <div>
                <span className="text-[#5D5753] block text-[11px]">Zone Géographique & Bassin</span>
                <strong className="text-[#221510] font-medium">{currentBatch.region}</strong>
              </div>

              <div>
                <span className="text-[#5D5753] block text-[11px]">Campagne de Récolte</span>
                <strong className="text-[#221510] font-medium">{currentBatch.cropSeason}</strong>
              </div>

              <div>
                <span className="text-[#5D5753] block text-[11px]">Arrivée Usine San Pedro</span>
                <strong className="text-[#221510] font-medium">{currentBatch.arrivalDate}</strong>
              </div>
            </div>
          </div>

          {/* Col 2: Fermentation & Bean Quality */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-display text-xs font-bold uppercase tracking-wider text-[#4A2C21] border-b border-[#E4DDD3] pb-2">
              <Droplets className="w-4 h-4 text-[#C29958]" />
              <span>Agronomie & Fermentation</span>
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-[#5D5753]">Indice de Fermentation (Cut-test)</span>
                  <span className="font-mono font-bold text-[#221510]">{currentBatch.fermentationScore}%</span>
                </div>
                <div className="w-full bg-[#E4DDD3] h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#2E5A36] h-full rounded-full"
                    style={{ width: `${currentBatch.fermentationScore}%` }}
                  />
                </div>
                <span className="text-[10px] text-[#2E5A36] mt-0.5 block">Seuil export requis : &gt; 80%</span>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-[#5D5753]">Taux d'Humidité Fèves</span>
                  <span className="font-mono font-bold text-[#221510]">{currentBatch.moisturePercent}%</span>
                </div>
                <div className="w-full bg-[#E4DDD3] h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#C29958] h-full rounded-full"
                    style={{ width: `${(currentBatch.moisturePercent / 10) * 100}%` }}
                  />
                </div>
                <span className="text-[10px] text-[#5D5753] mt-0.5 block">Norme internationale : &lt; 7.5%</span>
              </div>

              <div className="pt-1">
                <span className="text-[#5D5753] block text-[11px]">Calibrage Fèves (Grainage)</span>
                <strong className="text-[#221510] font-mono font-bold text-xs">
                  {currentBatch.beanCountPer100g} fèves / 100g (Grade 1 Supérieur)
                </strong>
              </div>
            </div>
          </div>

          {/* Col 3: Heavy Metals & Food Safety (ICP-MS) */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-display text-xs font-bold uppercase tracking-wider text-[#4A2C21] border-b border-[#E4DDD3] pb-2">
              <Award className="w-4 h-4 text-[#C29958]" />
              <span>Conformité Métaux Lourds ICP-MS</span>
            </div>

            <div className="space-y-3 bg-[#F8F4EE] p-4 rounded-[6px] border border-[#E4DDD3]">
              <div>
                <div className="flex justify-between text-xs mb-0.5">
                  <span className="text-[#5D5753]">Cadmium (Cd) mesuré</span>
                  <span className="font-mono font-bold text-[#2E5A36]">{currentBatch.cadmiumPpm} mg/kg</span>
                </div>
                <div className="text-[10px] text-[#5D5753]">
                  Limite maximale autorisée UE : 0.10 mg/kg
                </div>
                <div className="w-full bg-[#E4DDD3] h-1.5 rounded-full overflow-hidden mt-1">
                  <div
                    className="bg-[#2E5A36] h-full rounded-full"
                    style={{ width: `${(currentBatch.cadmiumPpm / 0.10) * 100}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-0.5">
                  <span className="text-[#5D5753]">Plomb (Pb) mesuré</span>
                  <span className="font-mono font-bold text-[#2E5A36]">{currentBatch.leadPpm} mg/kg</span>
                </div>
                <div className="text-[10px] text-[#5D5753]">
                  Limite maximale autorisée UE : 0.05 mg/kg
                </div>
                <div className="w-full bg-[#E4DDD3] h-1.5 rounded-full overflow-hidden mt-1">
                  <div
                    className="bg-[#2E5A36] h-full rounded-full"
                    style={{ width: `${(currentBatch.leadPpm / 0.05) * 100}%` }}
                  />
                </div>
              </div>

              <div className="pt-1 text-[11px] font-mono text-[#2E5A36] font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>RÉSULTAT : TOTALEMENT CONFORME UE & FDA</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sensory Organoleptic Signature (Clean unboxed tags) */}
        <div className="pt-4 border-t border-[#E4DDD3] space-y-2">
          <span className="font-display text-xs font-bold uppercase tracking-wider text-[#4A2C21] block">
            Profil Sensoriel & Notes de Dégustation de Masse
          </span>
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#221510]">
            {currentBatch.sensoryNotes.map((note, index) => (
              <React.Fragment key={note}>
                <span className="bg-[#FAF7F2] border border-[#E4DDD3] px-3 py-1 rounded-[4px] font-sans">
                  {note}
                </span>
                {index < currentBatch.sensoryNotes.length - 1 && <span className="text-[#C29958]">·</span>}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
