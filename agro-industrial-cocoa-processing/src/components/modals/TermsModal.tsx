import React from 'react';
import { X, FileText, Anchor, ShieldCheck, Scale } from 'lucide-react';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="terms-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
    >
      <div className="bg-[#FFFFFF] text-[#221510] w-full max-w-3xl max-h-[85vh] rounded-[8px] flex flex-col border border-[#d8cfc4]">
        {/* En-tête */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e5ded6] bg-[#f9f6f0]">
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-[#C29958]" />
            <h2 id="terms-modal-title" className="font-title text-lg font-bold text-[#221510]">
              Conditions Générales de Vente B2B & Export
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Fermer"
            className="p-1 text-[#5c4033] hover:text-[#221510] transition-colors rounded-[4px]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Corps défilable */}
        <div className="overflow-y-auto p-6 space-y-6 text-xs md:text-sm text-[#443831] leading-relaxed">
          <section className="space-y-2">
            <h3 className="font-title font-bold text-sm md:text-base text-[#221510] flex items-center gap-2">
              <Scale className="w-4 h-4 text-[#C29958]" />
              1. Champ d'application et Identification
            </h3>
            <p>
              Les présentes Conditions Générales régissent l'ensemble des ventes de dérivés industriels de cacao (beurres de cacao, poudres, masses pures et tourteaux) conclues par Agro-Industrial Cocoa Processing Group auprès de ses clients professionnels et industriels de l'agroalimentaire ou de la cosmétique.
            </p>
            <p className="text-[11px] font-mono text-[#5c4033] bg-[#f9f6f0] p-2 rounded-[4px] border border-[#e5ded6]">
              Vendeur : Agro-Industrial Cocoa Processing SA - Port Autonome de San Pedro, Côte d'Ivoire. Bureau de liaison Europe : Terminal Océanique, Le Havre, France.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-title font-bold text-sm md:text-base text-[#221510] flex items-center gap-2">
              <Anchor className="w-4 h-4 text-[#C29958]" />
              2. Incoterms 2020 et Modalités de Livraison
            </h3>
            <p>
              Les expéditions internationales sont réalisées selon les règles officielles Incoterms 2020 de la Chambre de Commerce Internationale :
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>FOB Port de San Pedro :</strong> Le transfert des frais et des risques intervient dès le chargement complet des conteneurs ou des citernes à bord du navire désigné par l'acheteur.
              </li>
              <li>
                <strong>CIF Port de destination convenu (Le Havre, Rotterdam, Hambourg, Gênes) :</strong> Le vendeur assume le fret maritime et souscrit une assurance maritime tous risques (Institute Cargo Clauses A) au bénéfice de l'acheteur.
              </li>
              <li>
                <strong>Tolérance de volume :</strong> Conformément aux usages du commerce international du cacao (règles FCC), une marge de tolérance de plus ou moins 5% en poids est admise lors du chargement.
              </li>
            </ul>
          </section>

          <section className="space-y-2">
            <h3 className="font-title font-bold text-sm md:text-base text-[#221510] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#C29958]" />
              3. Conformité Réglementaire EUDR 2023/1115
            </h3>
            <p>
              Le vendeur garantit que 100% des dérivés commercialisés proviennent exclusivement de fèves de cacao issues de parcelles de production n'ayant pas fait l'objet de déforestation après le 31 décembre 2020.
            </p>
            <p>
              Pour chaque lot exporté, le vendeur fournit le numéro d'enregistrement de la Déclaration de Diligence Raisonnée (DDS) déposée sur le registre officiel de l'Union Européenne, accompagné du relevé polygonal des coordonnées GPS des coopératives productrices.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-title font-bold text-sm md:text-base text-[#221510]">
              4. Contrôle Qualité, Réclamations et Tolérances
            </h3>
            <p>
              Chaque livraison fait l'objet d'un Certificat d'Analyse (CoA) émis par notre laboratoire accrédité ISO 17025. Les caractéristiques physico-chimiques (teneur en matière grasse ISO 11053, acidité libre ISO 660, indice de peroxyde ISO 3960) font foi.
            </p>
            <p>
              Toute contestation relative à la conformité qualitative doit être formulée par notification écrite sous 14 jours calendaires à compter de la mise à disposition de la marchandise au port de destination, accompagnée d'un échantillon scellé contradictoire.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-title font-bold text-sm md:text-base text-[#221510]">
              5. Règlement, Réserve de Propriété et Juridiction
            </h3>
            <p>
              Sauf accord contractuel spécifique, les règlements s'effectuent par Crédit Documentaire irrévocable et confirmé (L/C at sight) ou virement bancaire SWIFT avant embarquement. Les marchandises demeurent la propriété du vendeur jusqu'à encaissement intégral du montant facturé.
            </p>
            <p>
              En cas de litige non résolu à l'amiable, le différend sera soumis aux règles d'arbitrage de la Fédération du Commerce des Cacaos (FCC).
            </p>
          </section>
        </div>

        {/* Pied de modale */}
        <div className="px-6 py-4 border-t border-[#e5ded6] bg-[#f9f6f0] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-[#221510] hover:bg-[#3c251c] text-[#F8F4EE] text-xs font-semibold rounded-[6px] transition-colors"
          >
            Fermer le document
          </button>
        </div>
      </div>
    </div>
  );
};
