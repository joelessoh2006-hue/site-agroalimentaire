import React, { useState } from 'react';
import { CocoaProduct } from '../../types';
import { COCOA_PRODUCTS } from '../../data/products';
import {
  Send,
  CheckCircle2,
  Building,
  Mail,
  User,
  Phone,
  Globe,
  Truck,
  Box,
  Trash2,
  Plus,
  AlertCircle,
  Clock,
  MapPin,
  ShieldCheck,
  FileText
} from 'lucide-react';

import { TurnstileWidget } from '../common/TurnstileWidget';

interface ContactRfqViewProps {
  selectedProducts: CocoaProduct[];
  onRemoveFromRfq: (id: string) => void;
  onAddProductToRfq: (product: CocoaProduct) => void;
}

export const ContactRfqView: React.FC<ContactRfqViewProps> = ({
  selectedProducts,
  onRemoveFromRfq,
  onAddProductToRfq,
}) => {
  const [requestType, setRequestType] = useState<'quote' | 'sample' | 'contract'>('quote');
  const [companyName, setCompanyName] = useState('');
  const [vatNumber, setVatNumber] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [country, setCountry] = useState('FR');
  const [industrySector, setIndustrySector] = useState('Chocolaterie Industrielle');
  const [targetVolume, setTargetVolume] = useState('25 000 kg (Conteneur 20ft FCL)');
  const [sampleSize, setSampleSize] = useState<'250g' | '500g' | '1kg'>('500g');
  const [incoterm, setIncoterm] = useState('CIF Port du Havre (France)');
  const [destinationPort, setDestinationPort] = useState('Le Havre, France');
  const [projectDescription, setProjectDescription] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const isFreeEmailDomain =
    /@(gmail\.com|yahoo\.[a-z]+|hotmail\.[a-z]+|outlook\.[a-z]+|proton\.[a-z]+)$/i.test(contactEmail);

  // Available products to add if not yet in selected list
  const unselectedProducts = COCOA_PRODUCTS.filter(
    (p) => !selectedProducts.some((sp) => sp.id === p.id)
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setFieldErrors({});

    // Vérification du panier de produits
    if (selectedProducts.length === 0) {
      setErrorMessage('Veuillez sélectionner au moins un ingrédient ou échantillon dans votre demande.');
      return;
    }

    if (!companyName.trim() || !contactEmail.trim() || !contactName.trim()) {
      setErrorMessage('Veuillez renseigner les champs obligatoires (Entreprise, Contact, E-mail).');
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        requestType,
        companyName: companyName.trim(),
        vatNumber: vatNumber.trim(),
        contactName: contactName.trim(),
        contactEmail: contactEmail.trim(),
        contactPhone: contactPhone.trim(),
        country,
        industrySector,
        targetVolume,
        sampleSize,
        incoterm,
        destinationPort: destinationPort.trim(),
        projectDescription: projectDescription.trim(),
        selectedProductIds: selectedProducts.map((p) => p.id),
        honeypot,
        turnstileToken: turnstileToken || undefined,
      };

      const response = await fetch('/api/rfq', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.message || 'Une erreur est survenue lors de la validation de votre demande.');
        if (data.errors && Array.isArray(data.errors)) {
          const mappedErrors: Record<string, string> = {};
          data.errors.forEach((err: { field: string; message: string }) => {
            mappedErrors[err.field] = err.message;
          });
          setFieldErrors(mappedErrors);
        }
        return;
      }

      // Succès
      setSubmittedRef(data.reference || `RFQ-2026-${Math.floor(100000 + Math.random() * 900000)}`);
    } catch (err) {
      setErrorMessage(
        'Impossible de joindre le serveur de traitement. Veuillez vérifier votre connexion ou réessayer ultérieurement.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmittedRef(null);
    setErrorMessage(null);
    setFieldErrors({});
    setTurnstileToken(null);
  };

  if (submittedRef) {
    return (
      <div className="max-w-3xl mx-auto bg-[#FFFFFF] border border-[#E4DDD3] rounded-[8px] p-8 sm:p-12 text-center space-y-6">
        <div className="w-14 h-14 bg-[#2E5A36]/10 text-[#2E5A36] rounded-[8px] border border-[#2E5A36]/30 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="font-mono text-xs text-[#C29958] uppercase tracking-widest font-bold">
            DOSSIER COMMERCIAL ENREGISTRÉ AVEC SUCCÈS
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#221510]">
            Votre Demande B2B est Validée
          </h2>
          <p className="font-body text-xs sm:text-sm text-[#5D5753] max-w-lg mx-auto">
            Votre dossier a été assigné à notre Desk Export. Un ingénieur commercial dédié prendra contact sous 24 à 48 heures ouvrées pour vous transmettre la cotation officielle ou confirmer l'envoi d'échantillons.
          </p>
        </div>

        <div className="bg-[#F8F4EE] border border-[#E4DDD3] rounded-[6px] p-5 text-left font-mono text-xs space-y-2.5 max-w-xl mx-auto">
          <div className="flex justify-between border-b border-[#E4DDD3] pb-2 text-sm">
            <span className="text-[#5D5753]">RÉFÉRENCE UNIQUE DE DOSSIER :</span>
            <strong className="text-[#221510] font-bold">{submittedRef}</strong>
          </div>
          <div className="flex justify-between">
            <span className="text-[#5D5753]">Type de Demande :</span>
            <span className="text-[#221510] font-semibold uppercase">
              {requestType === 'quote' ? 'Cotation de Volume FCL/LCL' : requestType === 'sample' ? 'Échantillons R&D Laboratoire' : 'Contrat Cadre Annuel'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#5D5753]">Entreprise :</span>
            <span className="text-[#221510] font-medium">{companyName} (N° TVA: {vatNumber || 'En cours'})</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#5D5753]">Contact Référent :</span>
            <span className="text-[#221510] font-medium">{contactName} ({contactEmail})</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#5D5753]">Volume / Échantillon :</span>
            <span className="text-[#221510] font-medium">
              {requestType === 'sample' ? `Échantillon R&D ${sampleSize}` : targetVolume}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#5D5753]">Incoterm & Destination :</span>
            <span className="text-[#221510] font-medium">{incoterm} ({destinationPort})</span>
          </div>

          <div className="border-t border-[#E4DDD3] pt-2">
            <span className="text-[#5D5753] block mb-1.5 font-bold">
              Produits ciblés ({selectedProducts.length}) :
            </span>
            <ul className="list-disc pl-5 text-[#221510] space-y-0.5">
              {selectedProducts.map((p) => (
                <li key={p.id}>{p.name}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-2 flex justify-center gap-4">
          <button
            onClick={handleReset}
            className="px-6 py-2.5 text-xs font-display font-semibold uppercase tracking-wider text-[#221510] bg-[#C29958] rounded-[6px] hover:bg-[#b08745] transition-colors cursor-pointer border border-[#b08745]"
          >
            Nouvelle Demande
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* 1. Header */}
      <div className="border-b border-[#E4DDD3] pb-6 space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono text-[#C29958] uppercase tracking-wider">
          <span>PORTAIL D'ACHAT EN GROS & D'ÉCHANTILLONNAGE R&D · VOLUMES INDUSTRIELS</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#221510]">
              Demande de Cotation (RFQ) & Contact Usine
            </h1>
            <p className="font-body text-sm text-[#4f4541] max-w-2xl mt-1">
              Formulez votre appel d'offres pour commandes spot (FCL/LCL) ou contrats de campagne annuels. Envoi d'échantillons d'homologation de 250 g à 1 kg sous 48h pour laboratoires qualifiés.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-[#2E5A36] bg-[#2E5A36]/10 px-3 py-1.5 rounded-[4px] border border-[#2E5A36]/30 font-bold">
            <Clock className="w-3.5 h-3.5" />
            <span>RÉPONSE COMMERCIALE GARANTIE SOUS 24-48H</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Form (8 cols) */}
        <div className="lg:col-span-8 bg-[#FFFFFF] border border-[#E4DDD3] rounded-[8px] p-6 sm:p-8 space-y-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Honeypot hidden input */}
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

            {/* Error banner from API Validation */}
            {errorMessage && (
              <div
                role="alert"
                className="p-4 bg-red-50 border border-red-200 rounded-[6px] flex items-start gap-3 text-red-800"
              >
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div className="space-y-1 text-xs">
                  <span className="font-bold block">{errorMessage}</span>
                  {Object.keys(fieldErrors).length > 0 && (
                    <ul className="list-disc pl-4 space-y-0.5 text-red-700">
                      {Object.entries(fieldErrors).map(([field, msg]) => (
                        <li key={field}>
                          <strong className="font-semibold">{field} :</strong> {msg}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            )}

            {/* Type de Demande */}
            <div className="space-y-2">
              <label className="font-display text-xs font-bold uppercase tracking-wider text-[#4A2C21] block">
                1. Nature de Votre Requête B2B :
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setRequestType('quote')}
                  className={`p-3 text-left rounded-[6px] border text-xs font-display font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                    requestType === 'quote'
                      ? 'bg-[#221510] text-[#FFFFFF] border-[#221510]'
                      : 'bg-[#FAF7F2] text-[#4A2C21] border-[#E4DDD3] hover:border-[#C29958]'
                  }`}
                >
                  <span className="block font-bold">Cotation Volume (Spot)</span>
                  <span className="text-[10px] block opacity-80 mt-0.5 normal-case font-body">
                    1 à 10+ Conteneurs FCL
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setRequestType('sample')}
                  className={`p-3 text-left rounded-[6px] border text-xs font-display font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                    requestType === 'sample'
                      ? 'bg-[#221510] text-[#FFFFFF] border-[#221510]'
                      : 'bg-[#FAF7F2] text-[#4A2C21] border-[#E4DDD3] hover:border-[#C29958]'
                  }`}
                >
                  <span className="block font-bold">Échantillons R&D</span>
                  <span className="text-[10px] block opacity-80 mt-0.5 normal-case font-body">
                    250 g à 1 kg d'homologation
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setRequestType('contract')}
                  className={`p-3 text-left rounded-[6px] border text-xs font-display font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                    requestType === 'contract'
                      ? 'bg-[#221510] text-[#FFFFFF] border-[#221510]'
                      : 'bg-[#FAF7F2] text-[#4A2C21] border-[#E4DDD3] hover:border-[#C29958]'
                  }`}
                >
                  <span className="block font-bold">Contrat Cadre Annuel</span>
                  <span className="text-[10px] block opacity-80 mt-0.5 normal-case font-body">
                    50 MT à 500+ MT cadencées
                  </span>
                </button>
              </div>
            </div>

            {/* Produits Sélectionnés (Panier RFQ) */}
            <div className="space-y-3 border-t border-[#E4DDD3] pt-6">
              <div className="flex items-center justify-between">
                <label className="font-display text-xs font-bold uppercase tracking-wider text-[#4A2C21] block">
                  2. Ingrédients Ciblés ({selectedProducts.length} sélectionnés) :
                </label>
                {unselectedProducts.length > 0 && (
                  <span className="text-[11px] text-[#5D5753]">
                    Ajoutez d'autres ingrédients ci-dessous si besoin
                  </span>
                )}
              </div>

              {selectedProducts.length > 0 ? (
                <div className="space-y-2">
                  {selectedProducts.map((p) => (
                    <div
                      key={p.id}
                      className="flex items-center justify-between p-3 bg-[#FAF7F2] border border-[#E4DDD3] rounded-[6px] text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C29958]" />
                        <span className="font-bold text-[#221510]">{p.name}</span>
                        <span className="font-mono text-[10px] text-[#5D5753]">({p.category.toUpperCase()})</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => onRemoveFromRfq(p.id)}
                        className="text-[#817470] hover:text-red-700 p-1 transition-colors cursor-pointer"
                        title="Retirer de la demande"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 bg-[#F8F4EE] border border-dashed border-[#E4DDD3] rounded-[6px] text-center text-xs text-[#5D5753]">
                  Aucun produit sélectionné pour le moment. Choisissez parmi les ingrédients ci-dessous :
                </div>
              )}

              {/* Add more products picker */}
              {unselectedProducts.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {unselectedProducts.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => onAddProductToRfq(p)}
                      className="px-2.5 py-1 text-[11px] font-sans bg-[#FFFFFF] border border-[#E4DDD3] hover:border-[#C29958] rounded-[4px] text-[#4A2C21] inline-flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <Plus className="w-3 h-3 text-[#C29958]" />
                      <span>{p.name.split('(')[0]}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Volumes & Incoterms */}
            <div className="space-y-4 border-t border-[#E4DDD3] pt-6">
              <label className="font-display text-xs font-bold uppercase tracking-wider text-[#4A2C21] block">
                3. Spécifications Logistiques & Volumes :
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {requestType === 'sample' ? (
                  <div>
                    <label className="block text-xs font-display font-semibold uppercase text-[#4A2C21] mb-1">
                      Format d'Échantillon Laboratoire :
                    </label>
                    <select
                      value={sampleSize}
                      onChange={(e) => setSampleSize(e.target.value as any)}
                      className="w-full p-2 text-xs bg-[#FAF7F2] border border-[#E4DDD3] rounded-[6px] focus:outline-none focus:border-[#C29958]"
                    >
                      <option value="250g">250 g (Pilote chromatographique / R&D)</option>
                      <option value="500g">500 g (Essais de formulation & texture)</option>
                      <option value="1kg">1 kg (Tests pilote d'atelier complets)</option>
                    </select>
                  </div>
                ) : (
                  <div>
                    <label className="block text-xs font-display font-semibold uppercase text-[#4A2C21] mb-1">
                      Volume Prévisionnel :
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: 50 Tonnes Métriques (2 Conteneurs 40ft)"
                      value={targetVolume}
                      onChange={(e) => setTargetVolume(e.target.value)}
                      className="w-full p-2 text-xs bg-[#FAF7F2] border border-[#E4DDD3] rounded-[6px] focus:outline-none focus:border-[#C29958]"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-display font-semibold uppercase text-[#4A2C21] mb-1">
                    Incoterm Souhaité :
                  </label>
                  <select
                    value={incoterm}
                    onChange={(e) => setIncoterm(e.target.value)}
                    className="w-full p-2 text-xs bg-[#FAF7F2] border border-[#E4DDD3] rounded-[6px] focus:outline-none focus:border-[#C29958]"
                  >
                    <option value="CIF Port du Havre (France)">CIF Port du Havre (France)</option>
                    <option value="CIF Port de Rotterdam (Pays-Bas)">CIF Port de Rotterdam (Pays-Bas)</option>
                    <option value="CIF Port d'Anvers (Belgique)">CIF Port d'Anvers (Belgique)</option>
                    <option value="CIF New York / New Jersey (USA)">CIF New York / NJ (USA)</option>
                    <option value="FOB Port de San Pedro (Côte d'Ivoire)">FOB Port de San Pedro (Côte d'Ivoire)</option>
                    <option value="FOB Port d'Abidjan (Côte d'Ivoire)">FOB Port d'Abidjan (Côte d'Ivoire)</option>
                    <option value="EXW Usine San Pedro">EXW Usine San Pedro</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-display font-semibold uppercase text-[#4A2C21] mb-1">
                  Port ou Ville de Destination Finale :
                </label>
                <input
                  type="text"
                  placeholder="Ex: Le Havre, France ou Hambourg, Allemagne"
                  value={destinationPort}
                  onChange={(e) => setDestinationPort(e.target.value)}
                  className="w-full p-2 text-xs bg-[#FAF7F2] border border-[#E4DDD3] rounded-[6px] focus:outline-none focus:border-[#C29958]"
                />
              </div>
            </div>

            {/* Coordonnées de l'Entreprise */}
            <div className="space-y-4 border-t border-[#E4DDD3] pt-6">
              <label className="font-display text-xs font-bold uppercase tracking-wider text-[#4A2C21] block">
                4. Informations Entreprise & Contact Pro :
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-display font-semibold uppercase text-[#4A2C21] mb-1">
                    Raison Sociale / Société <span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <Building className="w-4 h-4 text-[#5D5753] absolute left-3 top-2.5" />
                    <input
                      type="text"
                      required
                      placeholder="Nom officiel de votre entreprise"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs bg-[#FAF7F2] border border-[#E4DDD3] rounded-[6px] focus:outline-none focus:border-[#C29958] focus:bg-[#FFFFFF]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-display font-semibold uppercase text-[#4A2C21] mb-1">
                    Numéro TVA Intracommunautaire / SIRET / Tax ID :
                  </label>
                  <input
                    type="text"
                    placeholder="FR12345678901 ou Registration Number"
                    value={vatNumber}
                    onChange={(e) => setVatNumber(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E4DDD3] rounded-[6px] focus:outline-none focus:border-[#C29958] focus:bg-[#FFFFFF]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-display font-semibold uppercase text-[#4A2C21] mb-1">
                    Nom & Fonction du Responsable <span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#5D5753] absolute left-3 top-2.5" />
                    <input
                      type="text"
                      required
                      placeholder="Prénom et Nom du contact"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs bg-[#FAF7F2] border border-[#E4DDD3] rounded-[6px] focus:outline-none focus:border-[#C29958] focus:bg-[#FFFFFF]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-display font-semibold uppercase text-[#4A2C21] mb-1">
                    E-mail Professionnel d'Entreprise <span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#5D5753] absolute left-3 top-2.5" />
                    <input
                      type="email"
                      required
                      placeholder="contact@votre-entreprise.com"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className={`w-full pl-9 pr-3 py-2 text-xs bg-[#FAF7F2] border rounded-[6px] focus:outline-none focus:bg-[#FFFFFF] ${
                        fieldErrors['contactEmail']
                          ? 'border-red-500 focus:border-red-600'
                          : 'border-[#E4DDD3] focus:border-[#C29958]'
                      }`}
                    />
                  </div>
                  {fieldErrors['contactEmail'] && (
                    <span className="text-[11px] text-red-600 block mt-1 font-medium">
                      {fieldErrors['contactEmail']}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-display font-semibold uppercase text-[#4A2C21] mb-1">
                    Téléphone (avec indicatif international) :
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#5D5753] absolute left-3 top-2.5" />
                    <input
                      type="tel"
                      placeholder="+33 1 23 45 67 89"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs bg-[#FAF7F2] border border-[#E4DDD3] rounded-[6px] focus:outline-none focus:border-[#C29958] focus:bg-[#FFFFFF]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-display font-semibold uppercase text-[#4A2C21] mb-1">
                    Secteur d'Activité :
                  </label>
                  <select
                    value={industrySector}
                    onChange={(e) => setIndustrySector(e.target.value)}
                    className="w-full p-2 text-xs bg-[#FAF7F2] border border-[#E4DDD3] rounded-[6px] focus:outline-none focus:border-[#C29958]"
                  >
                    <option value="Chocolaterie Industrielle">Chocolaterie Industrielle</option>
                    <option value="Biscuiterie & Pâtisserie">Biscuiterie & Pâtisserie Industrielle</option>
                    <option value="Confiserie & Glacerie">Confiserie & Glacerie</option>
                    <option value="Cosmétique & Dermopharmacie">Cosmétique & Dermopharmacie</option>
                    <option value="Trading & Distribution Matières Premières">Trading & Distribution Matières Premières</option>
                  </select>
                </div>
              </div>

              {isFreeEmailDomain && (
                <div className="flex items-start gap-2 p-3 bg-[#FAF7F2] border border-[#E4DDD3] rounded-[4px] text-xs text-[#A0522D]">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>
                    Remarque : L'utilisation d'une adresse de messagerie d'entreprise (domaine propre) permet d'accélérer l'attribution prioritaire d'un numéro de dossier et l'envoi d'échantillons laboratoire.
                  </span>
                </div>
              )}

              <div>
                <label className="block text-xs font-display font-semibold uppercase text-[#4A2C21] mb-1">
                  Notes Complémentaires ou Spécifications Particulières :
                </label>
                <textarea
                  rows={3}
                  placeholder="Précisez ici vos critères particuliers (taux de pH précis, tolérance cadmium renforcée, cadencement mensuel, etc.)"
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  className="w-full p-2.5 text-xs bg-[#FAF7F2] border border-[#E4DDD3] rounded-[6px] focus:outline-none focus:border-[#C29958] focus:bg-[#FFFFFF]"
                />
              </div>
            </div>

            {/* Protection anti-bot Cloudflare Turnstile */}
            <div className="pt-2">
              <TurnstileWidget
                action="rfq-submission"
                onVerify={(token) => {
                  setTurnstileToken(token);
                  setErrorMessage(null);
                }}
                onExpire={() => {
                  setTurnstileToken(null);
                }}
                onError={(errCode) => {
                  console.warn('[Contact] Erreur challenge Turnstile :', errCode);
                }}
              />
            </div>

            <div className="pt-2 border-t border-[#E4DDD3]">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 text-xs font-display font-bold uppercase tracking-wider text-[#221510] bg-[#C29958] rounded-[6px] hover:bg-[#b08745] disabled:opacity-50 transition-colors cursor-pointer flex items-center justify-center gap-2 border border-[#b08745]"
              >
                <Send className="w-4 h-4" />
                <span>
                  {isSubmitting ? 'Transmission en cours...' : 'Soumettre la Demande de Cotation B2B'}
                </span>
              </button>
            </div>
          </form>
        </div>

        {/* Right Contact Details (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Usine Principale */}
          <div className="bg-[#FFFFFF] border border-[#E4DDD3] rounded-[8px] p-6 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-[#C29958] font-bold">
              <MapPin className="w-4 h-4" />
              <span>SITE DE PRODUCTION PRINCIPAL</span>
            </div>
            <h3 className="font-display text-base font-bold text-[#221510]">
              Usine Industrielle de San Pedro
            </h3>
            <p className="font-body text-xs text-[#5D5753] leading-relaxed">
              Zone Industrielle Portuaire (ZIP) · BP 1490 San Pedro, République de Côte d'Ivoire.
            </p>
            <div className="pt-2 text-xs font-mono text-[#221510] space-y-1 border-t border-[#E4DDD3]/60">
              <div>Capacité : 85 000 MT/an</div>
              <div>Accréditation : FSSC 22000 Ver. 6.0</div>
              <div>Embarquement direct : Port Autonome de San Pedro</div>
            </div>
          </div>

          {/* Hub Export Europe */}
          <div className="bg-[#FFFFFF] border border-[#E4DDD3] rounded-[8px] p-6 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-[#C29958] font-bold">
              <Truck className="w-4 h-4" />
              <span>HUB LOGISTIQUE EUROPE</span>
            </div>
            <h3 className="font-display text-base font-bold text-[#221510]">
              Entrepôt Avancé Le Havre
            </h3>
            <p className="font-body text-xs text-[#5D5753] leading-relaxed">
              Terminal Conteneurs Océaniques · 76600 Le Havre, France. Stock tampon sous douane pour livraisons express en Europe (J+3).
            </p>
          </div>

          {/* Bureaux Export & Trading */}
          <div className="bg-[#221510] text-[#F8F4EE] border border-[#4A2C21] rounded-[8px] p-6 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-[#C29958] font-bold">
              <Building className="w-4 h-4" />
              <span>DESK EXPORT COMMERCIAL</span>
            </div>
            <div className="space-y-2 text-xs">
              <div>
                <strong className="block text-[#FFFFFF] font-bold">Bureau Europe (Paris / Genève) :</strong>
                <span className="text-[#E4DDD3]/70 font-mono">export@agro-cocoa-processing.com</span>
              </div>
              <div>
                <strong className="block text-[#FFFFFF] font-bold">Hotline Commerciale B2B :</strong>
                <span className="text-[#E4DDD3]/70 font-mono">+33 (0)1 89 45 20 00</span>
              </div>
              <div className="pt-2 border-t border-[#4A2C21] text-[11px] text-[#C29958]">
                Heures d'ouverture : Lun - Ven (08h00 - 18h30 CET)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
