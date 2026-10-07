import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeView } from './components/home/HomeView';
import { SavoirFaireView } from './components/savoir-faire/SavoirFaireView';
import { CatalogueView } from './components/catalogue/CatalogueView';
import { ProductDetailView } from './components/product/ProductDetailView';
import { QualityView } from './components/quality/QualityView';
import { ContactRfqView } from './components/contact/ContactRfqView';
import { CoaModal } from './components/modals/CoaModal';
import { TdsDownloadModal } from './components/modals/TdsDownloadModal';
import { COCOA_PRODUCTS } from './data/products';
import { PROCESSING_BATCHES_DATA } from './data/pipelineData';
import { CocoaProduct, ProcessingBatch } from './types';

// Helper to extract initial route from pathname
function parseLocation(): { view: string; productId?: string } {
  const path = window.location.pathname.replace(/^\/|\/$/g, '');
  if (!path || path === 'home') {
    return { view: 'home' };
  }
  if (path === 'savoir-faire') {
    return { view: 'savoir-faire' };
  }
  if (path === 'catalogue') {
    return { view: 'catalogue' };
  }
  if (path.startsWith('produit/')) {
    const id = path.split('/')[1];
    return { view: 'produit', productId: id };
  }
  if (path === 'qualite') {
    return { view: 'qualite' };
  }
  if (path === 'contact' || path === 'rfq') {
    return { view: 'contact' };
  }
  // Fallback to home
  return { view: 'home' };
}

// Métadonnées SEO par page
function getPageMeta(view: string, productId?: string): { title: string; description: string } {
  if (view === 'savoir-faire') {
    return {
      title: 'Savoir-Faire & Traçabilité EUDR 2023/1115 | Agro-Industrial Cocoa',
      description:
        'Procédé industriel en 6 étapes : nettoyage, torréfaction, mouture, pressage 450 bars et micronisation alpine. Traçabilité polygonale GPS par lot de cacao certifié.',
    };
  }
  if (view === 'catalogue') {
    return {
      title: 'Catalogue des Dérivés de Cacao Purs (9 Ingrédients B2B) | Agro-Industrial Cocoa',
      description:
        'Catalogue technique complet : beurres naturels PPP, beurres désodorisés, poudres naturelles et alcalinisées, masses pures et tourteaux de cacao pour industriels.',
    };
  }
  if (view === 'produit' && productId) {
    const product = COCOA_PRODUCTS.find((p) => p.id === productId || p.slug === productId);
    if (product) {
      return {
        title: `${product.name} | Spécifications B2B & TDS`,
        description: `Spécifications techniques industrielles pour ${product.name} : matière grasse, acidité libre FFA, microbiologie et fiches TDS/CoA téléchargeables.`,
      };
    }
  }
  if (view === 'qualite') {
    return {
      title: 'Qualité, Laboratoire ISO 17025 & Certifications | Agro-Industrial Cocoa',
      description:
        'Analyses de pointe : dosage cadmium par ICP-MS (UE 488/2014), dépistage Salmonella PCR 2x375g. Certifications FSSC 22000, Rainforest Alliance, Halal et Casher.',
    };
  }
  if (view === 'contact') {
    return {
      title: 'Demande de Cotation B2B (RFQ) & Échantillons R&D | Agro-Industrial Cocoa',
      description:
        'Formulaire de cotation industrielle spot ou contrat annuel, et demande d’échantillons R&D (250g, 500g, 1kg). Réponse technique garantie sous 24 à 48 heures.',
    };
  }
  // Accueil par défaut
  return {
    title: 'Transformation Industrielle du Cacao B2B | Agro-Industrial Cocoa Processing',
    description:
      'Unité industrielle intégrée à San Pedro (Côte d’Ivoire) et hub logistique au Havre. Fournisseur B2B de dérivés de cacao de haute précision certifiés FSSC 22000 et conformes EUDR.',
  };
}

export default function App() {
  const initialRoute = parseLocation();
  const [currentView, setCurrentView] = useState<string>(initialRoute.view);
  const [selectedProductId, setSelectedProductId] = useState<string>(
    initialRoute.productId || COCOA_PRODUCTS[0].id
  );

  // RFQ Basket state (initial with 2 representative products)
  const [selectedRfqProductIds, setSelectedRfqProductIds] = useState<string[]>([
    'beurre-cacao-naturel-alimentaire',
    'poudre-cacao-naturelle-alimentaire',
  ]);

  // Modal states
  const [coaModalOpen, setCoaModalOpen] = useState<boolean>(false);
  const [coaProduct, setCoaProduct] = useState<CocoaProduct | null>(null);
  const [coaBatch, setCoaBatch] = useState<ProcessingBatch | null>(null);

  const [tdsModalOpen, setTdsModalOpen] = useState<boolean>(false);
  const [tdsProduct, setTdsProduct] = useState<CocoaProduct | null>(null);

  // Sync route on popstate (browser back/forward button)
  useEffect(() => {
    const handlePopState = () => {
      const route = parseLocation();
      setCurrentView(route.view);
      if (route.productId) {
        setSelectedProductId(route.productId);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Sync document.title and meta description dynamically based on current route
  useEffect(() => {
    const meta = getPageMeta(currentView, selectedProductId);
    document.title = meta.title;

    let descTag = document.querySelector('meta[name="description"]');
    if (!descTag) {
      descTag = document.createElement('meta');
      descTag.setAttribute('name', 'description');
      document.head.appendChild(descTag);
    }
    descTag.setAttribute('content', meta.description);

    const ogTitleTag = document.querySelector('meta[property="og:title"]');
    if (ogTitleTag) {
      ogTitleTag.setAttribute('content', meta.title);
    }

    const ogDescTag = document.querySelector('meta[property="og:description"]');
    if (ogDescTag) {
      ogDescTag.setAttribute('content', meta.description);
    }
  }, [currentView, selectedProductId]);

  // Navigation handler with URL pushState
  const navigateTo = (view: string, productId?: string) => {
    let targetPath = '/';
    if (view === 'savoir-faire') targetPath = '/savoir-faire';
    else if (view === 'catalogue') targetPath = '/catalogue';
    else if (view === 'produit' && productId) targetPath = `/produit/${productId}`;
    else if (view === 'qualite') targetPath = '/qualite';
    else if (view === 'contact') targetPath = '/contact';

    window.history.pushState(null, '', targetPath);
    setCurrentView(view);
    if (productId) {
      setSelectedProductId(productId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // RFQ handlers
  const handleToggleRfq = (product: CocoaProduct) => {
    setSelectedRfqProductIds((prev) =>
      prev.includes(product.id) ? prev.filter((id) => id !== product.id) : [...prev, product.id]
    );
  };

  const handleAddProductToRfq = (product: CocoaProduct) => {
    if (!selectedRfqProductIds.includes(product.id)) {
      setSelectedRfqProductIds((prev) => [...prev, product.id]);
    }
  };

  const handleRemoveFromRfq = (id: string) => {
    setSelectedRfqProductIds((prev) => prev.filter((item) => item !== id));
  };

  // Modal open handlers
  const handleOpenSpecsForProduct = (product: CocoaProduct) => {
    setCoaProduct(product);
    setCoaBatch(null);
    setCoaModalOpen(true);
  };

  const handleOpenCoaForBatch = (batch: ProcessingBatch) => {
    setCoaBatch(batch);
    setCoaProduct(null);
    setCoaModalOpen(true);
  };

  const handleOpenGeneralCoa = () => {
    setCoaProduct(COCOA_PRODUCTS[0]);
    setCoaBatch(PROCESSING_BATCHES_DATA[0]);
    setCoaModalOpen(true);
  };

  const handleOpenTdsModal = (product: CocoaProduct) => {
    setTdsProduct(product);
    setTdsModalOpen(true);
  };

  const selectedProductsForRfq = COCOA_PRODUCTS.filter((p) =>
    selectedRfqProductIds.includes(p.id)
  );

  return (
    <div className="min-h-screen bg-[#fdf9f3] text-[#1c1c18] flex flex-col font-body">
      {/* 1. Header with corporate navigation and actions */}
      <Header
        currentView={currentView}
        onNavigate={navigateTo}
        onOpenRfq={() => navigateTo('contact')}
        onOpenCoa={handleOpenGeneralCoa}
        rfqItemsCount={selectedRfqProductIds.length}
      />

      {/* 2. Main Page Content Container */}
      <main className="flex-1 max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Page 1: Accueil B2B */}
        {currentView === 'home' && (
          <HomeView
            onNavigate={navigateTo}
            onOpenSpecs={handleOpenSpecsForProduct}
            onToggleRfq={handleToggleRfq}
            selectedRfqProductIds={selectedRfqProductIds}
          />
        )}

        {/* Page 2: Savoir-faire & Traçabilité EUDR */}
        {currentView === 'savoir-faire' && (
          <SavoirFaireView
            onOpenCoaForBatch={handleOpenCoaForBatch}
            onNavigate={navigateTo}
          />
        )}

        {/* Page 3: Catalogue Produits (9) */}
        {currentView === 'catalogue' && (
          <CatalogueView
            onOpenSpecs={handleOpenSpecsForProduct}
            onOpenTdsModal={handleOpenTdsModal}
            onToggleRfq={handleToggleRfq}
            onSelectProduct={(id) => navigateTo('produit', id)}
            selectedRfqProductIds={selectedRfqProductIds}
          />
        )}

        {/* Page 4: Fiche Produit Type */}
        {currentView === 'produit' && (
          <ProductDetailView
            productId={selectedProductId}
            onBack={() => navigateTo('catalogue')}
            onOpenTdsModal={handleOpenTdsModal}
            onToggleRfq={handleToggleRfq}
            onSelectProduct={(id) => navigateTo('produit', id)}
            isAddedToRfq={selectedRfqProductIds.includes(selectedProductId)}
          />
        )}

        {/* Page 5: Qualité & Conformité */}
        {currentView === 'qualite' && (
          <QualityView
            onOpenCoa={handleOpenGeneralCoa}
            onNavigate={navigateTo}
          />
        )}

        {/* Page 6: Demande de Cotation RFQ & Contact */}
        {currentView === 'contact' && (
          <ContactRfqView
            selectedProducts={selectedProductsForRfq}
            onRemoveFromRfq={handleRemoveFromRfq}
            onAddProductToRfq={handleAddProductToRfq}
          />
        )}
      </main>

      {/* 3. Corporate Agro-Industrial Footer */}
      <Footer onNavigate={navigateTo} />

      {/* 4. Official Certificate of Analysis (CoA) Modal */}
      <CoaModal
        isOpen={coaModalOpen}
        onClose={() => setCoaModalOpen(false)}
        product={coaProduct}
        batch={coaBatch}
      />

      {/* 5. Lead-Gated Technical Data Sheet (TDS) Download Modal */}
      <TdsDownloadModal
        isOpen={tdsModalOpen}
        onClose={() => setTdsModalOpen(false)}
        product={tdsProduct}
      />
    </div>
  );
}
