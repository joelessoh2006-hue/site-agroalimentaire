import React, { useState } from 'react';
import { CocoaProduct } from '../../types';
import { X, Download, ShieldCheck, FileText, CheckCircle2, Building, Mail, User, AlertCircle } from 'lucide-react';

interface TdsDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: CocoaProduct | null;
}

export const TdsDownloadModal: React.FC<TdsDownloadModalProps> = ({
  isOpen,
  onClose,
  product,
}) => {
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [name, setName] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [downloadStarted, setDownloadStarted] = useState(false);

  if (!isOpen || !product) return null;

  const isFreeEmailDomain =
    /@(gmail\.com|yahoo\.[a-z]+|hotmail\.[a-z]+|outlook\.[a-z]+|proton\.[a-z]+)$/i.test(email);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return; // Silent discard for bots
    if (!email || !company) return;

    setIsSubmitted(true);
    setDownloadStarted(true);

    // 1. Déclenchement du téléchargement direct du PDF officiel avec les en-têtes Content-Type: application/pdf
    const downloadUrl = `/api/docs/tds/${product.slug}`;
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = `TDS_${product.slug}_AgroIndustrial_2026.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    // 2. Traçabilité et enregistrement du prospect dans l'API industrielle
    fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        companyName: company,
        contactName: name || 'Responsable R&D / Achats',
        contactEmail: email,
        country: 'Non spécifié (Téléchargement Web)',
        destinationPort: 'Téléchargement Direct TDS PDF',
        requestType: 'sample',
        selectedProductIds: [product.id],
        projectDescription: `Lead capture via téléchargement de la Fiche Technique PDF : ${product.name} (${product.id})`,
        honeypot: honeypot || '',
      }),
    }).catch((err) => {
      console.warn('[TDS Download] Notification lead non critique :', err);
    });
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setDownloadStarted(false);
    setEmail('');
    setCompany('');
    setName('');
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="tds-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#221510]/80 backdrop-blur-xs"
    >
      <div className="bg-[#FFFFFF] border border-[#E4DDD3] rounded-[2px] max-w-xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#E4DDD3] bg-[#F8F4EE]">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-[#221510] text-[#C29958] rounded-[2px]">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <span className="font-mono text-[10px] text-[#C29958] font-bold uppercase tracking-wider block">
                DOCUMENT TECHNIQUE CERTIFIÉ B2B
              </span>
              <h3 id="tds-modal-title" className="font-display text-base font-bold text-[#221510]">
                Fiche Technique (TDS) : {product.name}
              </h3>
            </div>
          </div>
          <button
            onClick={handleReset}
            className="p-1.5 text-[#5D5753] hover:text-[#221510] hover:bg-[#E4DDD3]/50 rounded-[2px] transition-colors cursor-pointer"
            aria-label="Fermer la boîte de dialogue"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="bg-[#F8F4EE] border border-[#E4DDD3] rounded-[6px] p-3 text-xs text-[#4A2C21] space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-[#221510]">
                  <ShieldCheck className="w-4 h-4 text-[#2E5A36]" />
                  <span>Accès Réservé aux Professionnels & Formulateurs R&D</span>
                </div>
                <p className="text-[11px] text-[#5D5753] leading-relaxed">
                  Conformément à nos protocoles qualité, veuillez renseigner vos coordonnées d'entreprise. Vous recevrez le document complet (7 sections Codex & UE) immédiatement.
                </p>
              </div>

              {/* Honeypot anti-spam field */}
              <div className="hidden" aria-hidden="true">
                <input
                  type="text"
                  name="tax_registration_internal_id"
                  tabIndex={-1}
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  autoComplete="off"
                />
              </div>

              <div>
                <label className="block text-xs font-display font-semibold uppercase tracking-wider text-[#4A2C21] mb-1">
                  Société / Raison Sociale <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <Building className="w-4 h-4 text-[#5D5753] absolute left-3 top-2.5" />
                  <input
                    type="text"
                    required
                    placeholder="Ex: Chocolaterie Artisanale de Paris SAS"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-[#FFFFFF] border border-[#E4DDD3] rounded-[6px] focus:outline-none focus:border-[#C29958]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-display font-semibold uppercase tracking-wider text-[#4A2C21] mb-1">
                  Nom & Fonction du Contact <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#5D5753] absolute left-3 top-2.5" />
                  <input
                    type="text"
                    required
                    placeholder="Ex: Jean Dupont, Responsable R&D / Achats"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-[#FFFFFF] border border-[#E4DDD3] rounded-[6px] focus:outline-none focus:border-[#C29958]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-display font-semibold uppercase tracking-wider text-[#4A2C21] mb-1">
                  E-mail Professionnel <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#5D5753] absolute left-3 top-2.5" />
                  <input
                    type="email"
                    required
                    placeholder="jean.dupont@entreprise.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-[#FFFFFF] border border-[#E4DDD3] rounded-[6px] focus:outline-none focus:border-[#C29958]"
                  />
                </div>
                {isFreeEmailDomain && (
                  <div className="flex items-start gap-1.5 mt-1.5 text-[11px] text-[#A0522D] bg-[#F8F4EE] p-2 rounded-[2px] border border-[#E4DDD3]">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                    <span>
                      Pour accélérer le traitement de vos demandes d'échantillons ou d'audits, nous recommandons une adresse e-mail professionnelle d'entreprise.
                    </span>
                  </div>
                )}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 text-xs font-display font-semibold uppercase tracking-wider text-[#221510] bg-[#C29958] rounded-[2px] hover:bg-[#b08745] transition-colors flex items-center justify-center gap-2 cursor-pointer border border-[#b08745]"
                >
                  <Download className="w-4 h-4" />
                  <span>Générer & Télécharger la Fiche TDS</span>
                </button>
              </div>

              <p className="text-[10px] text-[#5D5753] text-center pt-1">
                En téléchargeant ce document, vous acceptez de recevoir des informations techniques relatives à nos dérivés industriels. Vos données restent strictement confidentielles (RGPD).
              </p>
            </form>
          ) : (
            <div className="text-center py-6 space-y-4">
              <div className="w-12 h-12 bg-[#2E5A36]/10 text-[#2E5A36] rounded-[2px] flex items-center justify-center mx-auto border border-[#2E5A36]/30">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h4 className="font-display text-lg font-bold text-[#221510]">
                  Fiche Technique Téléchargée avec Succès
                </h4>
                <p className="text-xs text-[#5D5753] max-w-sm mx-auto">
                  Le document officiel pour <strong>{product.name}</strong> a été généré et transféré sur votre appareil. Une copie a également été envoyée à <strong>{email}</strong>.
                </p>
              </div>

              <div className="bg-[#F8F4EE] border border-[#E4DDD3] rounded-[2px] p-3 text-left font-mono text-[11px] text-[#4A2C21] space-y-1">
                <div className="flex justify-between">
                  <span className="text-[#5D5753]">Réf. Document :</span>
                  <span className="font-bold">TDS-{product.slug.toUpperCase()}-2026</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#5D5753]">Destinataire :</span>
                  <span>{company} ({name})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#5D5753]">Statut Qualité :</span>
                  <span className="text-[#2E5A36] font-bold">CERTIFIÉ CONFORME FSSC 22000</span>
                </div>
              </div>

              <div className="pt-3 flex flex-wrap items-center justify-center gap-2">
                <a
                  href={`/api/docs/tds/${product.slug}`}
                  download={`TDS_${product.slug}_AgroIndustrial_2026.pdf`}
                  className="px-4 py-2 text-xs font-display font-semibold uppercase tracking-wider text-[#221510] bg-[#C29958] rounded-[2px] hover:bg-[#b08745] transition-colors inline-flex items-center gap-1.5 border border-[#b08745]"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Re-télécharger le PDF</span>
                </a>

                <a
                  href={`/api/docs/tds/${product.slug}?inline=true`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-xs font-display font-semibold uppercase tracking-wider text-[#221510] bg-[#FAF7F2] border border-[#E4DDD3] rounded-[2px] hover:bg-[#E4DDD3] transition-colors inline-flex items-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Ouvrir dans le navigateur</span>
                </a>

                <button
                  onClick={handleReset}
                  className="px-4 py-2 text-xs font-display font-semibold uppercase tracking-wider text-[#5D5753] hover:text-[#221510] hover:bg-[#F8F4EE] rounded-[6px] transition-colors cursor-pointer"
                >
                  Fermer
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
