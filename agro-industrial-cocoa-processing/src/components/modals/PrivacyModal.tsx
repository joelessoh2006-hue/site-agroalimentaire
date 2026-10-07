import React from 'react';
import { X, Shield, Lock, Eye, Mail, Database } from 'lucide-react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
    >
      <div className="bg-[#FFFFFF] text-[#221510] w-full max-w-3xl max-h-[85vh] rounded-[10px] shadow-2xl flex flex-col border border-[#d8cfc4]">
        {/* En-tête */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e5ded6] bg-[#f9f6f0]">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-[#C29958]" />
            <h2 id="privacy-modal-title" className="font-title text-lg font-bold text-[#221510]">
              Politique de Confidentialité & Protection des Données
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Fermer"
            className="p-1 text-[#5c4033] hover:text-[#221510] transition-colors rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Corps défilable */}
        <div className="overflow-y-auto p-6 space-y-6 text-xs md:text-sm text-[#443831] leading-relaxed">
          <section className="space-y-2">
            <h3 className="font-title font-bold text-sm md:text-base text-[#221510] flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#C29958]" />
              1. Responsable de Traitement et Finalités B2B
            </h3>
            <p>
              Agro-Industrial Cocoa Processing Group s'engage à protéger les informations professionnelles collectées dans le cadre de ses relations commerciales inter-entreprises.
            </p>
            <p>
              Les données recueillies via nos formulaires de demande de cotation (RFQ), de demandes d'échantillons et de téléchargement de fiches techniques (TDS) sont exclusivement destinées au traitement technique et commercial de vos dossiers.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-title font-bold text-sm md:text-base text-[#221510] flex items-center gap-2">
              <Database className="w-4 h-4 text-[#C29958]" />
              2. Nature des Données et Durée de Conservation
            </h3>
            <p>
              Nous collectons uniquement les informations professionnelles strictement nécessaires :
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Identité du contact (nom, prénom, fonction) et de l'entreprise cliente.</li>
              <li>Coordonnées professionnelles (adresse électronique, téléphone, pays, port d'acheminement).</li>
              <li>Spécifications techniques du projet (dérivés sélectionnés, volumes prévisionnels, applications industrielles).</li>
            </ul>
            <p>
              Les données de prospection commerciale sont conservées pour une durée maximale de 3 ans à compter du dernier contact actif. Les enregistrements de transactions et de conformité réglementaire des lots (règlement EUDR 2023/1115) sont conservés pendant 5 ans pour satisfaire aux obligations légales de traçabilité.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-title font-bold text-sm md:text-base text-[#221510] flex items-center gap-2">
              <Eye className="w-4 h-4 text-[#C29958]" />
              3. Sécurité, Non-Cession et Destinataires
            </h3>
            <p>
              Aucune donnée collectée n'est cédée, louée ou commercialisée à des tiers. Les informations sont uniquement accessibles aux services internes habilités (direction commerciale, service logistique et laboratoire qualité).
            </p>
            <p>
              Les flux sont protégés par chiffrement en transit (HTTPS / TLS 1.3) et stockés sur des serveurs sécurisés bénéficiant de contrôles d'accès stricts.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-title font-bold text-sm md:text-base text-[#221510] flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#C29958]" />
              4. Exercice de vos Droits (Accès, Rectification, Suppression)
            </h3>
            <p>
              Conformément à la réglementation sur la protection des données personnelles, vous disposez d'un droit permanent d'accès, de rectification, de portabilité et de suppression de vos données professionnelles.
            </p>
            <p>
              Pour exercer ces droits, vous pouvez adresser votre demande par courrier électronique à notre délégué à la protection des données :
            </p>
            <p className="font-mono text-xs bg-[#f9f6f0] p-2.5 rounded border border-[#e5ded6] text-[#221510]">
              Courriel : dpo@agro-cocoa-processing.com<br />
              Adresse postale : Agro-Industrial Cocoa Processing Group, Direction Juridique, Port Autonome de San Pedro, Côte d'Ivoire.
            </p>
          </section>
        </div>

        {/* Pied de modale */}
        <div className="px-6 py-4 border-t border-[#e5ded6] bg-[#f9f6f0] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-[#221510] hover:bg-[#3c251c] text-[#F8F4EE] text-xs font-semibold rounded transition-colors"
          >
            Fermer le document
          </button>
        </div>
      </div>
    </div>
  );
};
