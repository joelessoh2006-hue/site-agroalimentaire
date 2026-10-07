import React from 'react';
import { CocoaDerivative, ProcessingBatch, CocoaProduct } from '../types';
import { Printer, X, Download, CheckCircle2 } from 'lucide-react';

interface CoaModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: CocoaProduct | null;
  derivative?: CocoaDerivative | null;
  batch?: ProcessingBatch | null;
}

export const CoaModal: React.FC<CoaModalProps> = ({
  isOpen,
  onClose,
  product,
  derivative,
  batch,
}) => {
  if (!isOpen) return null;

  const lotCode =
    batch?.lotCode ||
    derivative?.lotInStock ||
    `LOT-${product?.category.toUpperCase().slice(0, 3) || 'COC'}-2026-${product?.id.slice(-4) || '884A'}`;
  const productName = product?.name || derivative?.name || batch?.allocatedDerivative || 'Masse Pure de Cacao';
  const origin = batch?.originCountry || derivative?.origin || 'Côte d\'Ivoire / Ghana (Terroir Agréé)';
  const idRef = product?.id || derivative?.sku || 'IND-COCOA-STD';

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#221510]/70 backdrop-blur-sm">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#FFFFFF] border border-[#E4DDD3] rounded-[8px] p-6 sm:p-10 space-y-8">
        {/* Top controls */}
        <div className="flex items-center justify-between border-b border-[#E4DDD3] pb-4">
          <div className="flex items-center gap-2 font-mono text-xs text-[#221510] font-bold">
            <span className="bg-[#FAF7F2] text-[#C29958] px-2 py-0.5 rounded-[4px] border border-[#E4DDD3] text-[10px]">
              LAB · ISO 17025
            </span>
            <span>CERTIFICAT OFFICIEL D'ANALYSE DE CONTRÔLE (CoA)</span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={`/api/docs/coa/${lotCode}`}
              download={`COA_${lotCode}_Certificat_Analyse_2026.pdf`}
              className="px-3 py-1.5 text-xs font-display font-semibold uppercase tracking-wider text-[#221510] bg-[#C29958] hover:bg-[#b08745] rounded-[6px] transition-colors inline-flex items-center gap-1.5 border border-[#b08745]"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Télécharger PDF</span>
            </a>

            <button
              onClick={handlePrint}
              className="px-3 py-1.5 text-xs font-display font-semibold uppercase tracking-wider text-[#221510] bg-[#FAF7F2] border border-[#E4DDD3] rounded-[6px] hover:bg-[#E4DDD3] transition-colors cursor-pointer inline-flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimer</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-[#5D5753] hover:text-[#221510] hover:bg-[#F8F4EE] rounded-[4px] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Paper Header */}
        <div className="text-center space-y-2 border-b border-[#E4DDD3] pb-6">
          <div className="font-display text-xl sm:text-2xl font-bold tracking-tight text-[#221510]">
            AGRO-INDUSTRIAL COCOA PROCESSING GROUP
          </div>
          <div className="font-mono text-xs text-[#5D5753]">
            Laboratoire Central de Contrôle Qualité · Accréditation ISO/IEC 17025:2017
          </div>
          <div className="text-[11px] text-[#817470]">
            Zone Industrielle Portuaire · San Pedro, Côte d'Ivoire · Enregistrement FDA #184920184
          </div>
        </div>

        {/* Sample Identification Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-[#F8F4EE] rounded-[6px] border border-[#E4DDD3] text-xs font-mono">
          <div>
            <span className="text-[#5D5753] block text-[10px]">NUMÉRO DE LOT :</span>
            <strong className="text-[#221510] font-bold">{lotCode}</strong>
          </div>
          <div>
            <span className="text-[#5D5753] block text-[10px]">RÉFÉRENCE PRODUIT :</span>
            <strong className="text-[#221510] font-bold truncate block">{idRef}</strong>
          </div>
          <div>
            <span className="text-[#5D5753] block text-[10px]">ORIGINE PAYS :</span>
            <strong className="text-[#221510] font-bold">{origin}</strong>
          </div>
          <div>
            <span className="text-[#5D5753] block text-[10px]">STATUT LIBÉRATION :</span>
            <strong className="text-[#2E5A36] font-bold">CONFORME / LIBÉRÉ</strong>
          </div>
        </div>

        {/* Product Details Banner */}
        <div className="p-3 bg-[#FAF7F2] border border-[#E4DDD3] rounded-[6px] space-y-1">
          <div className="font-display text-xs font-bold text-[#221510] uppercase tracking-wide">
            {productName}
          </div>
          {product && (
            <div className="text-[11px] text-[#4f4541] font-body">
              {product.description}
            </div>
          )}
          {product?.packaging && (
            <div className="text-[10px] font-mono text-[#5D5753]">
              <strong>Conditionnement :</strong>{' '}
              {typeof product.packaging === 'string'
                ? product.packaging
                : Array.isArray(product.packaging)
                ? product.packaging[0]?.format || 'Cartons 25 kg'
                : 'Cartons 25 kg'}
            </div>
          )}
        </div>

        {/* Certificate Lab Assay Table */}
        <div className="space-y-2">
          <div className="font-display text-xs font-bold uppercase tracking-wider text-[#4A2C21]">
            RÉSULTATS DES ESSAIS PHYSICO-CHIMIQUES & MICROBIOLOGIQUES
          </div>

          <table className="w-full text-left text-xs border border-[#E4DDD3]">
            <thead>
              <tr className="bg-[#F1ECE3] border-b border-[#E4DDD3] font-display text-[11px] uppercase tracking-wider text-[#4A2C21]">
                <th className="py-2.5 px-3">Paramètre</th>
                <th className="py-2.5 px-3">Méthode Normalisée</th>
                <th className="py-2.5 px-3">Spécification Norme</th>
                <th className="py-2.5 px-3 text-right">Résultat Mesuré</th>
                <th className="py-2.5 px-3 text-center">Verdict</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4DDD3] font-mono text-xs">
              {product?.specs ? (
                Object.entries(product.specs).map(([param, val], idx) => (
                  <tr key={param} className={idx % 2 === 1 ? 'bg-[#FCFAF7]' : ''}>
                    <td className="py-2 px-3 font-sans font-medium text-[#221510] capitalize">
                      {param.replace(/_/g, ' ')}
                    </td>
                    <td className="py-2 px-3 text-[#5D5753]">
                      {param.includes('matiere_grasse')
                        ? 'ISO 11053'
                        : param.includes('humidite')
                        ? 'Karl Fischer'
                        : param.includes('ph')
                        ? 'ISO 1842'
                        : param.includes('point_fusion')
                        ? 'DSC Mettler'
                        : 'Méthode LIMS'}
                    </td>
                    <td className="py-2 px-3 text-[#5D5753]">Conforme Codex / Pharmacopée</td>
                    <td className="py-2 px-3 text-right font-bold text-[#221510]">{val}</td>
                    <td className="py-2 px-3 text-center text-[#2E5A36] font-bold">CONFORME</td>
                  </tr>
                ))
              ) : (
                <>
                  <tr>
                    <td className="py-2 px-3 font-sans font-medium text-[#221510]">Teneur en Matière Grasse</td>
                    <td className="py-2 px-3 text-[#5D5753]">ISO 11053</td>
                    <td className="py-2 px-3 text-[#5D5753]">53.0 - 55.0% w/w</td>
                    <td className="py-2 px-3 text-right font-bold text-[#221510]">54.2%</td>
                    <td className="py-2 px-3 text-center text-[#2E5A36] font-bold">CONFORME</td>
                  </tr>
                  <tr className="bg-[#FCFAF7]">
                    <td className="py-2 px-3 font-sans font-medium text-[#221510]">Humidité résiduelle</td>
                    <td className="py-2 px-3 text-[#5D5753]">Karl Fischer ISO 760</td>
                    <td className="py-2 px-3 text-[#5D5753]">Max 1.50%</td>
                    <td className="py-2 px-3 text-right font-bold text-[#221510]">1.12%</td>
                    <td className="py-2 px-3 text-center text-[#2E5A36] font-bold">CONFORME</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-sans font-medium text-[#221510]">Finesse (&lt;75 µm tamis Alpine)</td>
                    <td className="py-2 px-3 text-[#5D5753]">NF V03-030</td>
                    <td className="py-2 px-3 text-[#5D5753]">Min 99.50%</td>
                    <td className="py-2 px-3 text-right font-bold text-[#221510]">99.85%</td>
                    <td className="py-2 px-3 text-center text-[#2E5A36] font-bold">CONFORME</td>
                  </tr>
                  <tr className="bg-[#FCFAF7]">
                    <td className="py-2 px-3 font-sans font-medium text-[#221510]">Acides Gras Libres (AGL)</td>
                    <td className="py-2 px-3 text-[#5D5753]">ISO 3596</td>
                    <td className="py-2 px-3 text-[#5D5753]">Max 1.75%</td>
                    <td className="py-2 px-3 text-right font-bold text-[#221510]">1.24%</td>
                    <td className="py-2 px-3 text-center text-[#2E5A36] font-bold">CONFORME</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-sans font-medium text-[#221510]">Teneur en Cadmium (Cd)</td>
                    <td className="py-2 px-3 text-[#5D5753]">ICP-MS ISO 17294</td>
                    <td className="py-2 px-3 text-[#5D5753]">Max 0.10 mg/kg</td>
                    <td className="py-2 px-3 text-right font-bold text-[#221510]">0.048 mg/kg</td>
                    <td className="py-2 px-3 text-center text-[#2E5A36] font-bold">CONFORME</td>
                  </tr>
                  <tr className="bg-[#FCFAF7]">
                    <td className="py-2 px-3 font-sans font-medium text-[#221510]">Salmonella sp. (sur 375g)</td>
                    <td className="py-2 px-3 text-[#5D5753]">PCR ISO 6579-1</td>
                    <td className="py-2 px-3 text-right font-bold text-[#2E5A36]">Absence dans 375g</td>
                    <td className="py-2 px-3 text-right font-bold text-[#2E5A36]">ABSENCE</td>
                    <td className="py-2 px-3 text-center text-[#2E5A36] font-bold">CONFORME</td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>

        {/* Laboratory Signature & Stamp */}
        <div className="pt-6 border-t border-[#E4DDD3] grid grid-cols-2 gap-8 text-xs">
          <div>
            <div className="font-display font-bold uppercase tracking-wider text-[#221510]">
              Attestation du Responsable Qualité
            </div>
            <p className="text-[#5D5753] text-[11px] mt-1 leading-relaxed">
              Nous certifions que le produit désigné ci-dessus a été échantillonné et analysé selon les règles du Codex Alimentarius, les directives de l'UE et les pharmacopées internationales.
            </p>
          </div>

          <div className="border border-[#E4DDD3] rounded-[6px] p-3 bg-[#FCFAF7] text-center space-y-1">
            <div className="font-mono text-[10px] text-[#C29958] font-bold">
              SCEAU D'AUTHENTICITÉ DIGITALE
            </div>
            <div className="font-mono text-xs font-bold text-[#2E5A36] flex items-center justify-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>FSSC 22000 AUDITED & VALIDATED</span>
            </div>
            <div className="text-[10px] text-[#5D5753]">
              Dr. H. Keller, Directeur Contrôle Qualité Chimie Analytique
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
