import React, { useState } from 'react';
import { CatalogProduct } from '../types';
import { CATALOG_PRODUCTS } from '../data/catalogData';
import { Send, CheckCircle2, ShieldCheck, Box, Truck, FileSpreadsheet, Trash2, Plus } from 'lucide-react';

interface SampleRfqViewProps {
  selectedProducts: CatalogProduct[];
  onRemoveFromRfq: (id: string) => void;
  onAddProductToRfq: (product: CatalogProduct) => void;
}

export const SampleRfqView: React.FC<SampleRfqViewProps> = ({
  selectedProducts,
  onRemoveFromRfq,
  onAddProductToRfq,
}) => {
  const [companyName, setCompanyName] = useState('');
  const [vatNumber, setVatNumber] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [applicationSector, setApplicationSector] = useState('Chocolaterie Industrielle');
  const [targetVolume, setTargetVolume] = useState('25 000 kg (Conteneur 40ft FCL)');
  const [packagingType, setPackagingType] = useState('Cartons de 25 kg avec sachet intérieur polyéthylène');
  const [incoterm, setIncoterm] = useState('CIF Port du Havre (France)');
  const [requestSamples, setRequestSamples] = useState(true);
  const [notes, setNotes] = useState('');

  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName || !email || !contactName) return;

    const randomRef = `RFQ-AGRO-${Math.floor(100000 + Math.random() * 900000)}`;
    setSubmittedRef(randomRef);
  };

  const handleReset = () => {
    setSubmittedRef(null);
  };

  if (submittedRef) {
    return (
      <div className="max-w-2xl mx-auto bg-[#FFFFFF] border border-[#E4DDD3] rounded-[8px] p-8 sm:p-12 text-center space-y-6 shadow-sm">
        <div className="w-14 h-14 bg-[#2E5A36]/10 text-[#2E5A36] rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="font-mono text-xs text-[#C29958] uppercase tracking-widest font-bold">
            DEMANDE RFQ ENREGISTRÉE DANS NOTRE LIMS COMMERCIAL
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#221510]">
            Cotation & Échantillons B2B Validés
          </h2>
          <p className="font-body text-xs text-[#5D5753] max-w-md mx-auto">
            Votre dossier a été transmis à notre cellule logistique industrielle et au directeur commercial export.
          </p>
        </div>

        <div className="bg-[#F8F4EE] border border-[#E4DDD3] rounded-[6px] p-4 text-left font-mono text-xs space-y-2">
          <div className="flex justify-between border-b border-[#E4DDD3] pb-2">
            <span className="text-[#5D5753]">RÉFÉRENCE OFFICIELLE :</span>
            <strong className="text-[#221510] font-bold">{submittedRef}</strong>
          </div>
          <div className="flex justify-between">
            <span className="text-[#5D5753]">Entreprise :</span>
            <span className="text-[#221510] font-medium">{companyName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#5D5753]">Volume Cible :</span>
            <span className="text-[#221510] font-medium">{targetVolume}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#5D5753]">Incoterm & Destination :</span>
            <span className="text-[#221510] font-medium">{incoterm}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#5D5753]">Envoi d'Échantillons 2kg :</span>
            <span className="text-[#2E5A36] font-bold">{requestSamples ? 'OUI (Chronopost Express)' : 'NON'}</span>
          </div>
          <div className="border-t border-[#E4DDD3] pt-2">
            <span className="text-[#5D5753] block mb-1">Produits demandés ({selectedProducts.length}) :</span>
            <ul className="list-disc pl-4 text-[#221510]">
              {selectedProducts.map((p) => (
                <li key={p.id}>{p.name}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={handleReset}
            className="px-6 py-2.5 text-xs font-display font-semibold uppercase tracking-wider text-[#221510] bg-[#C29958] rounded-[8px] hover:bg-[#b08745] transition-colors cursor-pointer"
          >
            Nouvelle Demande de Cotation
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Title Header */}
      <div className="border-b border-[#E4DDD3] pb-6 space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono text-[#C29958] uppercase tracking-wider">
          <span>PORTAIL D'ACHAT EN GROS & D'ÉCHANTILLONNAGE R&D · VOLUMES INDUSTRIELS</span>
        </div>

        <div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#221510]">
            Demande de Cotation (RFQ) & Échantillons Pilotes
          </h1>
          <p className="font-body text-sm text-[#4f4541] max-w-2xl mt-1">
            Formulez votre appel d'offres pour volumes spot ou contrats pluriannuels. Envoi gracieux d'échantillons d'homologation de 2 kg sous 48h pour laboratoires qualifiés.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Form */}
        <div className="lg:col-span-8 bg-[#FFFFFF] border border-[#E4DDD3] rounded-[8px] p-6 sm:p-8 space-y-6 shadow-xs">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Section 1: Corporate Profile */}
            <div className="space-y-4">
              <h3 className="font-display text-sm font-bold uppercase tracking-wider text-[#4A2C21] border-b border-[#E4DDD3] pb-2">
                01. Identification de la Société Acheteuse
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-display text-[11px] font-bold uppercase tracking-wider text-[#4A2C21] mb-1">
                    Raison Sociale / Société *
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Ex: Manufacture Chocolatière Alpine SA"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#FFFFFF] border border-[#E4DDD3] rounded-[8px] focus:outline-none focus:border-[#C29958]"
                  />
                </div>

                <div>
                  <label className="block font-display text-[11px] font-bold uppercase tracking-wider text-[#4A2C21] mb-1">
                    N° TVA Intracommunautaire / SIRET
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: FR89123456789"
                    value={vatNumber}
                    onChange={(e) => setVatNumber(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#FFFFFF] border border-[#E4DDD3] rounded-[8px] focus:outline-none focus:border-[#C29958]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-display text-[11px] font-bold uppercase tracking-wider text-[#4A2C21] mb-1">
                    Responsable Achats / R&D *
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Nom & Prénom"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#FFFFFF] border border-[#E4DDD3] rounded-[8px] focus:outline-none focus:border-[#C29958]"
                  />
                </div>

                <div>
                  <label className="block font-display text-[11px] font-bold uppercase tracking-wider text-[#4A2C21] mb-1">
                    Email Professionnel *
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="achats@groupe-agro.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#FFFFFF] border border-[#E4DDD3] rounded-[8px] focus:outline-none focus:border-[#C29958]"
                  />
                </div>

                <div>
                  <label className="block font-display text-[11px] font-bold uppercase tracking-wider text-[#4A2C21] mb-1">
                    Téléphone Ligne Directe
                  </label>
                  <input
                    type="tel"
                    placeholder="+33 1 ..."
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#FFFFFF] border border-[#E4DDD3] rounded-[8px] focus:outline-none focus:border-[#C29958]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-display text-[11px] font-bold uppercase tracking-wider text-[#4A2C21] mb-1">
                  Secteur Industriel d'Application
                </label>
                <select
                  value={applicationSector}
                  onChange={(e) => setApplicationSector(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#FFFFFF] border border-[#E4DDD3] rounded-[8px] focus:outline-none focus:border-[#C29958]"
                >
                  <option value="Chocolaterie Industrielle">Chocolaterie Industrielle & Confiserie</option>
                  <option value="Biscuiterie & Boulangerie Industrielle">Biscuiterie & Boulangerie Industrielle</option>
                  <option value="Cosmétique & Laboratoires Dermatologiques">Cosmétique & Laboratoires Dermatologiques</option>
                  <option value="Glacerie & Desserts Surgelés">Glacerie & Desserts Surgelés</option>
                  <option value="Boissons & Poudres Instantanées">Boissons & Poudres Instantanées</option>
                  <option value="R&D et Laboratoire d'Essais">R&D et Formulation Pilote</option>
                </select>
              </div>
            </div>

            {/* Section 2: Logistics & Volumes */}
            <div className="space-y-4 pt-4 border-t border-[#E4DDD3]">
              <h3 className="font-display text-sm font-bold uppercase tracking-wider text-[#4A2C21] border-b border-[#E4DDD3] pb-2">
                02. Volumes & Spécifications Logistiques
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-display text-[11px] font-bold uppercase tracking-wider text-[#4A2C21] mb-1">
                    Volume Annuel Envisagé
                  </label>
                  <select
                    value={targetVolume}
                    onChange={(e) => setTargetVolume(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#FFFFFF] border border-[#E4DDD3] rounded-[8px] focus:outline-none focus:border-[#C29958]"
                  >
                    <option value="Échantillons Homologation R&D (2 à 10 kg)">Échantillons Homologation R&D (2 à 10 kg)</option>
                    <option value="Palette d'Essai Pilote (1 000 kg)">Palette d'Essai Pilote (1 000 kg)</option>
                    <option value="Lot Régulier (5 000 à 10 000 kg)">Lot Régulier (5 000 à 10 000 kg)</option>
                    <option value="Conteneur 20ft (18 000 kg FCL)">Conteneur 20ft (18 000 kg FCL)</option>
                    <option value="Conteneur 40ft (25 000 kg FCL)">Conteneur 40ft (25 000 kg FCL)</option>
                    <option value="Campagne Annuelle (> 100 Tonnes)">Campagne Annuelle (&gt; 100 Tonnes)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-display text-[11px] font-bold uppercase tracking-wider text-[#4A2C21] mb-1">
                    Format de Conditionnement
                  </label>
                  <select
                    value={packagingType}
                    onChange={(e) => setPackagingType(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#FFFFFF] border border-[#E4DDD3] rounded-[8px] focus:outline-none focus:border-[#C29958]"
                  >
                    <option value="Cartons de 25 kg avec sachet intérieur polyéthylène">Cartons de 25 kg avec liner polyéthylène</option>
                    <option value="Sacs kraft 25 kg multicouches barrière d'humidité">Sacs kraft multicouches 25 kg</option>
                    <option value="Seaux hermétiques de 20 kg (Cosmétique)">Seaux hermétiques 20 kg (Cosmétique)</option>
                    <option value="Big-Bags industriels 1 000 kg avec valve">Big-Bags industriels 1 000 kg avec valve</option>
                    <option value="Fûts métalliques de 180-190 kg">Fûts métalliques de 180-190 kg</option>
                    <option value="Citerne calorifugée vrac 24T">Citerne calorifugée vrac 24T (Liqueur liquide 50°C)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-display text-[11px] font-bold uppercase tracking-wider text-[#4A2C21] mb-1">
                  Incoterm 2020 Souhaité & Destination
                </label>
                <select
                  value={incoterm}
                  onChange={(e) => setIncoterm(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#FFFFFF] border border-[#E4DDD3] rounded-[8px] focus:outline-none focus:border-[#C29958]"
                >
                  <option value="CIF Port du Havre (France)">CIF Port du Havre (France) - Transit 12 jours</option>
                  <option value="CIF Port de Rotterdam (Pays-Bas)">CIF Port de Rotterdam (Pays-Bas) - Transit 11 jours</option>
                  <option value="CIF Port d'Anvers (Belgique)">CIF Port d'Anvers (Belgique) - Transit 12 jours</option>
                  <option value="CIF Port de Hambourg (Allemagne)">CIF Port de Hambourg (Allemagne) - Transit 14 jours</option>
                  <option value="CIF Port de New York / Newark (USA)">CIF Port de New York / Newark (USA) - Transit 18 jours</option>
                  <option value="FOB Port de San Pedro (Côte d'Ivoire)">FOB Port Autonome de San Pedro (Côte d'Ivoire)</option>
                  <option value="DAP Livré Usine Client (Europe)">DAP Livré Entrepôt Usine Client (Europe)</option>
                </select>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="sampleBox"
                  checked={requestSamples}
                  onChange={(e) => setRequestSamples(e.target.checked)}
                  className="w-4 h-4 text-[#C29958] rounded-[4px] border-[#E4DDD3] focus:ring-[#C29958]"
                />
                <label htmlFor="sampleBox" className="text-xs text-[#221510] font-medium cursor-pointer">
                  Expédier un kit d'échantillons d'homologation de 2 kg à l'adresse de l'entreprise
                </label>
              </div>

              <div>
                <label className="block font-display text-[11px] font-bold uppercase tracking-wider text-[#4A2C21] mb-1">
                  Remarques Particulières ou Tolérances Rhéologiques
                </label>
                <textarea
                  rows={3}
                  placeholder="Précisez ici les contraintes spécifiques (point de fusion, indice de saponification, granulométrie, couleur...)"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#FFFFFF] border border-[#E4DDD3] rounded-[8px] focus:outline-none focus:border-[#C29958]"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 text-xs font-display font-semibold uppercase tracking-wider text-[#221510] bg-[#C29958] rounded-[8px] hover:bg-[#b08745] transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-xs"
              >
                <Send className="w-4 h-4 text-[#221510]" />
                <span>Soumettre la Demande RFQ Officielle</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Selected Products In Quote Cart */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#FFFFFF] border border-[#E4DDD3] rounded-[8px] p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-[#E4DDD3] pb-3">
              <div className="font-display text-xs font-bold uppercase tracking-wider text-[#221510] flex items-center gap-2">
                <Box className="w-4 h-4 text-[#C29958]" />
                <span>Produits Sélectionnés ({selectedProducts.length})</span>
              </div>
            </div>

            {selectedProducts.length === 0 ? (
              <div className="text-center py-8 space-y-3">
                <p className="text-xs text-[#5D5753]">
                  Aucun produit sélectionné depuis le catalogue.
                </p>
                <p className="text-[11px] text-[#817470]">
                  Sélectionnez des beurres, poudres ou masses depuis la grille du catalogue ci-dessous.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {selectedProducts.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 bg-[#FAF7F2] border border-[#E4DDD3] rounded-[6px] flex items-start justify-between gap-3 text-xs"
                  >
                    <div>
                      <div className="font-display font-bold text-[#221510]">{item.name}</div>
                      <div className="font-mono text-[10px] text-[#5D5753]">
                        Catégorie: {item.category} · {item.industry.join(', ')}
                      </div>
                    </div>
                    <button
                      onClick={() => onRemoveFromRfq(item.id)}
                      className="text-[#5D5753] hover:text-[#ba1a1a] transition-colors cursor-pointer p-1"
                      title="Retirer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Quick Add Available Products from Catalog */}
            <div className="pt-4 border-t border-[#E4DDD3] space-y-2">
              <span className="font-display text-[10px] font-bold uppercase tracking-wider text-[#5D5753] block">
                Ajout Rapide de Fractions Disponibles
              </span>
              <div className="space-y-1.5 max-h-56 overflow-y-auto">
                {CATALOG_PRODUCTS.filter(
                  (p) => !selectedProducts.some((sp) => sp.id === p.id)
                ).map((p) => (
                  <button
                    key={p.id}
                    onClick={() => onAddProductToRfq(p)}
                    className="w-full text-left p-2 rounded-[4px] hover:bg-[#F8F4EE] border border-transparent hover:border-[#E4DDD3] text-xs flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span className="truncate pr-2 text-[#221510] font-medium">{p.name}</span>
                    <Plus className="w-3.5 h-3.5 text-[#C29958] shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Institutional Trust Card */}
          <div className="bg-[#221510] text-[#F8F4EE] rounded-[8px] border border-[#4A2C21] p-6 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-[#C29958]">
              <ShieldCheck className="w-4 h-4" />
              <span>GARANTIES CONTRACTUELLES B2B</span>
            </div>
            <ul className="space-y-2 text-xs text-[#E4DDD3]/80">
              <li>· Échantillons certifiés 100% identiques aux lots d'expédition</li>
              <li>· Fiches de spécifications d'analyses et Certificats d'Analyse (CoA)</li>
              <li>· Conformité Codex Alimentarius, FDA et Cosmétopée européenne</li>
              <li>· Arbitrage Federation of Cocoa Commerce (FCC)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
