import React from 'react';
import { QUALITY_CERTIFICATIONS, LAB_ASSAY_PROTOCOLS } from '../../data/qualityData';
import {
  ShieldCheck,
  CheckCircle2,
  Award,
  FlaskConical,
  FileSpreadsheet,
  FileCheck,
  Globe2,
  ArrowRight,
  ExternalLink
} from 'lucide-react';

interface QualityViewProps {
  onOpenCoa: () => void;
  onNavigate: (view: string) => void;
}

export const QualityView: React.FC<QualityViewProps> = ({
  onOpenCoa,
  onNavigate,
}) => {
  return (
    <div className="space-y-16">
      {/* 1. Header Section */}
      <div className="border-b border-[#E4DDD3] pb-6 space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono text-[#C29958] uppercase tracking-wider">
          <span>ASSURANCE QUALITÉ INDUSTRIELLE · ACCRÉDITATION ISO 17025 & AUDITS GFSI</span>
          <span>·</span>
          <span>STATION SAN PEDRO</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#221510]">
              Qualité, Conformité & Laboratoire d'Analyses
            </h1>
            <p className="font-body text-sm text-[#4f4541] max-w-2xl mt-1">
              Garantie absolue d'innocuité et de régularité lot par lot. Notre laboratoire d'usine opère sous accréditation ISO 17025 pour libérer chaque conteneur selon les seuils les plus exigeants de l'Union Européenne et du Codex Alimentarius.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenCoa}
              className="px-4 py-2.5 text-xs font-display font-bold uppercase tracking-wider text-[#221510] bg-[#C29958] rounded-[6px] hover:bg-[#b08745] transition-colors inline-flex items-center gap-2 cursor-pointer border border-[#b08745]"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Visionneuse Certificat CoA</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Grille des 8 Badges & Certifications Officielles */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[#E4DDD3]/60 pb-3">
          <div>
            <span className="font-mono text-xs text-[#C29958] uppercase tracking-wider font-bold">
              CADRE NORMATIF INTERNATIONAL
            </span>
            <h2 className="font-display text-2xl font-bold text-[#221510] mt-0.5">
              Certifications & Agréments Mondiaux
            </h2>
          </div>
          <span className="text-xs text-[#5D5753]">
            Audits annuels renouvelés par organismes tiers accrédités
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {QUALITY_CERTIFICATIONS.map((cert) => (
            <div
              key={cert.id}
              className="bg-[#FFFFFF] border border-[#E4DDD3] rounded-[8px] p-5 space-y-3 flex flex-col justify-between hover:border-[#C29958] transition-colors"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-[4px] bg-[#F8F4EE] text-[#4A2C21] border border-[#E4DDD3]">
                    {cert.category.toUpperCase()}
                  </span>
                  <span className="font-mono text-[10px] text-[#2E5A36] font-bold">ACTIF</span>
                </div>

                <div>
                  <h3 className="font-display text-base font-bold text-[#221510]">
                    {cert.name}
                  </h3>
                  <span className="text-[11px] font-mono text-[#5D5753] block mt-0.5">
                    {cert.organization}
                  </span>
                </div>

                <p className="font-body text-xs text-[#4f4541] leading-relaxed">
                  {cert.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#E4DDD3]/60 space-y-1.5 text-[10px] font-mono">
                <div className="text-[#5D5753]">
                  Réf. Certificat : <strong className="text-[#221510]">{cert.code}</strong>
                </div>
                <div className="bg-[#FAF7F2] p-2 rounded-[4px] border border-[#E4DDD3]/50 text-[#4A2C21] font-sans italic text-[11px]">
                  « {cert.authorizedClaim} »
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Matrice des Protocoles de Laboratoire d'Usine (ISO 17025) */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E4DDD3] pb-4">
          <div>
            <span className="font-mono text-xs text-[#C29958] uppercase tracking-wider font-bold">
              SPECTROMÉTRIE ICP-MS · BIOLOGIE MOLÉCULAIRE PCR · CHROMATOGRAPHIE HPLC
            </span>
            <h2 className="font-display text-2xl font-bold text-[#221510] mt-0.5">
              Matrice des Protocoles de Contrôle en Laboratoire Interne
            </h2>
          </div>
          <p className="font-body text-xs text-[#5D5753] max-w-sm">
            Toutes nos mesures sont soumises à double vérification métrologique et tests inter-laboratoires d'aptitude.
          </p>
        </div>

        <div className="bg-[#FFFFFF] border border-[#E4DDD3] rounded-[8px] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-[#F8F4EE] border-b border-[#E4DDD3] font-display text-[11px] uppercase tracking-wider text-[#4A2C21]">
                  <th className="py-3 px-4">Paramètre & Détection</th>
                  <th className="py-3 px-4">Méthode Normalisée</th>
                  <th className="py-3 px-4">Équipement d'Analyse</th>
                  <th className="py-3 px-4">Norme Réglementaire UE</th>
                  <th className="py-3 px-4">Seuil Sécurité Usine</th>
                  <th className="py-3 px-4 text-center">Accréditation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E4DDD3] font-mono text-xs">
                {LAB_ASSAY_PROTOCOLS.map((protocol, idx) => (
                  <tr key={idx} className={idx % 2 === 1 ? 'bg-[#FCFAF7]' : ''}>
                    <td className="py-3 px-4 font-sans font-bold text-[#221510]">
                      {protocol.parameter}
                    </td>
                    <td className="py-3 px-4 text-[#5D5753]">
                      {protocol.standardMethod}
                    </td>
                    <td className="py-3 px-4 text-[#4A2C21] font-sans">
                      {protocol.detectionEquipment}
                    </td>
                    <td className="py-3 px-4 text-[#5D5753]">
                      {protocol.europeanRegulationLimit}
                    </td>
                    <td className="py-3 px-4 font-bold text-[#2E5A36]">
                      {protocol.internalFactoryThreshold}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="px-2 py-0.5 rounded-[4px] bg-[#2E5A36]/10 text-[#2E5A36] text-[10px] font-bold border border-[#2E5A36]/20">
                        ISO 17025
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 4. Procédure de Libération des Lots & Sécurité Sanitaire */}
      <section className="bg-[#221510] text-[#F8F4EE] rounded-[8px] border border-[#4A2C21] p-8 sm:p-10 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#4A2C21]/80 pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-[#C29958] uppercase">
              <ShieldCheck className="w-4 h-4" />
              <span>GOUVERNANCE POSITIVE RELEASE</span>
            </div>
            <h3 className="font-display text-2xl font-bold text-[#FFFFFF]">
              Protocole de Libération Positive des Lots Export
            </h3>
            <p className="font-body text-xs sm:text-sm text-[#E4DDD3]/80 max-w-2xl leading-relaxed">
              Aucun conteneur maritime ne quitte nos quais de San Pedro ou nos entrepôts sous douane sans que les analyses microbiologiques (PCR 375g négative à 100%) et la mesure ICP-MS du cadmium n'aient été validées et signées électroniquement par le Directeur Qualité.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <button
              onClick={onOpenCoa}
              className="px-5 py-2.5 text-xs font-display font-semibold uppercase tracking-wider text-[#221510] bg-[#C29958] rounded-[6px] hover:bg-[#b08745] transition-colors cursor-pointer"
            >
              Consulter un Modèle de CoA
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-body">
          <div className="space-y-1">
            <span className="font-display font-bold text-xs uppercase text-[#C29958]">1. Échantillonnage ISO 2859</span>
            <p className="text-[#E4DDD3]/70 leading-relaxed">
              Prélèvements représentatifs multipoints sur l'ensemble de la hauteur de chaque cuve et par carottage sur 10% des cartons de chaque palette.
            </p>
          </div>
          <div className="space-y-1">
            <span className="font-display font-bold text-xs uppercase text-[#C29958]">2. Quarantaine Thermique</span>
            <p className="text-[#E4DDD3]/70 leading-relaxed">
              Maintien des palettes en chambre tempérée sous scellé informatique d'interdiction de mouvement jusqu'à validation des résultats PCR (48h).
            </p>
          </div>
          <div className="space-y-1">
            <span className="font-display font-bold text-xs uppercase text-[#C29958]">3. Certificat Sécurisé LIMS</span>
            <p className="text-[#E4DDD3]/70 leading-relaxed">
              Génération du CoA avec horodatage cryptographique et QR code d'intégrité transmis au client avant l'arrivée du navire au port de déchargement.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
