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
