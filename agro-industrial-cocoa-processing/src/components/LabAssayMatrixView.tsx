import React, { useState } from 'react';
import { LAB_ASSAY_PARAMETERS } from '../data/cocoaData';
import { Download, SlidersHorizontal, ShieldCheck, Info, Check } from 'lucide-react';

export const LabAssayMatrixView: React.FC = () => {
  const [highlightTolerance, setHighlightTolerance] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleExportMatrix = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="space-y-8">
      {/* Title & Technical Protocol Header */}
      <div className="border-b border-[#E4DDD3] pb-6 space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono text-[#C29958] uppercase tracking-wider">
          <span>LABORATOIRE CENTRAL DE CONTRÔLE PHYSICO-CHIMIQUE · ACCRÉDITATION ISO/IEC 17025</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#221510]">
              Matrice Analytique & Spécifications de Laboratoire
            </h1>
            <p className="font-body text-sm text-[#4f4541] max-w-2xl mt-1">
              Tableau comparatif officiel des fractions de cacao. Dosage quantitatif par spectrométrie d'émission, titrage potentiométrique et microbiologie PCR temps réel.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setHighlightTolerance(!highlightTolerance)}
              className={`px-3 py-2 text-xs font-display font-semibold uppercase tracking-wider rounded-[8px] border transition-colors cursor-pointer inline-flex items-center gap-1.5 ${
                highlightTolerance
                  ? 'bg-[#221510] text-[#FFFFFF] border-[#221510]'
                  : 'bg-[#FFFFFF] text-[#221510] border-[#E4DDD3] hover:border-[#C29958]'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>{highlightTolerance ? 'Masquer Tolérances' : 'Afficher Tolérances'}</span>
            </button>

            <button
              onClick={handleExportMatrix}
              className="px-4 py-2 text-xs font-display font-semibold uppercase tracking-wider text-[#221510] bg-[#C29958] hover:bg-[#b08745] rounded-[8px] transition-colors cursor-pointer inline-flex items-center gap-1.5 shadow-xs"
            >
              {downloadSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#221510]" />
                  <span>Matrice Exportée (.CSV)</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5 text-[#221510]" />
                  <span>Exporter Matrice LIMS</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Analytical Protocol Card Summary */}
      <div className="bg-[#FFFFFF] border border-[#E4DDD3] rounded-[8px] p-5 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
        <div className="flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-[#2E5A36] shrink-0 mt-0.5" />
          <div>
            <strong className="font-display uppercase tracking-wider text-[#221510] block mb-0.5">
              Métaux Lourds & Règl. UE 488/2014
            </strong>
            <p className="text-[#5D5753] leading-relaxed">
              Teneur en Cadmium (Cd) garantie strictement inférieure aux limites réglementaires européennes (&lt; 0.10 ppm pour nos poudres, &lt; 0.60 ppm pour masse pure).
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-[#C29958] shrink-0 mt-0.5" />
          <div>
            <strong className="font-display uppercase tracking-wider text-[#221510] block mb-0.5">
              Microbiologie & Sécurité Sanitaire
            </strong>
            <p className="text-[#5D5753] leading-relaxed">
              Dépistage systématique de <em>Salmonella</em> par PCR sur 375 grammes par lot. Traitement thermique létal à l'étape de torréfaction avec F0 &gt; 12.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <SlidersHorizontal className="w-5 h-5 text-[#4A2C21] shrink-0 mt-0.5" />
          <div>
            <strong className="font-display uppercase tracking-wider text-[#221510] block mb-0.5">
              Granulométrie & Texture En Bouche
            </strong>
            <p className="text-[#5D5753] leading-relaxed">
              Passage au tamis à jet d'air Alpine 200LS avec résidu inférieur à 0.3% à 75 microns pour éviter toute granulosité sensorielle sur langue.
            </p>
          </div>
        </div>
      </div>

      {/* Pure White B2B Data Table (Design System Spec) */}
      <div className="bg-[#FFFFFF] rounded-[8px] border border-[#E4DDD3] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F1ECE3] border-b border-[#E4DDD3]">
                <th className="py-3.5 px-4 font-display text-xs font-bold uppercase tracking-wider text-[#4A2C21] whitespace-nowrap">
                  Paramètre Analytique
                </th>
                <th className="py-3.5 px-3 font-display text-[11px] font-bold uppercase tracking-wider text-[#4A2C21] whitespace-nowrap">
                  Méthode Normalisée
                </th>
                <th className="py-3.5 px-2 font-display text-[11px] font-bold uppercase tracking-wider text-[#4A2C21] text-center whitespace-nowrap">
                  Unité
                </th>
                <th className="py-3.5 px-3 font-display text-xs font-bold uppercase tracking-wider text-[#4A2C21] text-right whitespace-nowrap">
                  Liqueur Pure 53/55
                </th>
                <th className="py-3.5 px-3 font-display text-xs font-bold uppercase tracking-wider text-[#4A2C21] text-right whitespace-nowrap">
                  Beurre Deodorisé
                </th>
                <th className="py-3.5 px-3 font-display text-xs font-bold uppercase tracking-wider text-[#4A2C21] text-right whitespace-nowrap">
                  Poudre Naturelle 10/12
                </th>
                <th className="py-3.5 px-3 font-display text-xs font-bold uppercase tracking-wider text-[#4A2C21] text-right whitespace-nowrap">
                  Poudre Rouge Dutch 20/22
                </th>
                <th className="py-3.5 px-3 font-display text-xs font-bold uppercase tracking-wider text-[#4A2C21] text-right whitespace-nowrap">
                  Poudre Noir Ébène
                </th>
                {highlightTolerance && (
                  <th className="py-3.5 px-3 font-display text-[11px] font-bold uppercase tracking-wider text-[#C29958] text-right whitespace-nowrap">
                    Seuil Tolérance
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4DDD3] text-xs">
              {LAB_ASSAY_PARAMETERS.map((row, index) => {
                const isZebra = index % 2 === 1;
                return (
                  <tr
                    key={row.parameter}
                    className={`transition-colors hover:bg-[#FAF7F2] ${isZebra ? 'bg-[#FCFAF7]' : 'bg-[#FFFFFF]'}`}
                  >
                    <td className="py-3 px-4 font-medium text-[#221510] whitespace-nowrap">
                      {row.parameter}
                    </td>
                    <td className="py-3 px-3 text-[#5D5753] font-mono text-[11px] whitespace-nowrap">
                      {row.method}
                    </td>
                    <td className="py-3 px-2 text-[#5D5753] font-mono text-[11px] text-center whitespace-nowrap">
                      {row.unit}
                    </td>
                    <td className="py-3 px-3 text-right font-mono font-semibold text-[#221510] tabular-nums whitespace-nowrap">
                      {row.liquorPure}
                    </td>
                    <td className="py-3 px-3 text-right font-mono font-semibold text-[#221510] tabular-nums whitespace-nowrap">
                      {row.butterDeodorized}
                    </td>
                    <td className="py-3 px-3 text-right font-mono font-semibold text-[#221510] tabular-nums whitespace-nowrap">
                      {row.powderNatural}
                    </td>
                    <td className="py-3 px-3 text-right font-mono font-semibold text-[#221510] tabular-nums whitespace-nowrap">
                      {row.powderAlkalized}
                    </td>
                    <td className="py-3 px-3 text-right font-mono font-semibold text-[#221510] tabular-nums whitespace-nowrap">
                      {row.powderBlackDutch}
                    </td>
                    {highlightTolerance && (
                      <td className="py-3 px-3 text-right font-mono text-[11px] text-[#2E5A36] font-semibold tabular-nums whitespace-nowrap">
                        {row.tolerance}
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Explanatory Technical Footer */}
      <div className="text-[11px] font-mono text-[#5D5753] flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-[#E4DDD3] pt-4">
        <div>
          PROTOCOLE LIMS v2026.3 · ESSAIS EN DOUBLE EXÉCUTÉS SOUS ATMOSPHÈRE NORMALISÉE (20°C / 55% HR)
        </div>
        <div className="text-[#2E5A36] font-semibold">
          100% DES LOTS LIBÉRÉS SOUS CERTIFICAT D'ANALYSE INDIVIDUEL (CoA)
        </div>
      </div>
    </div>
  );
};
