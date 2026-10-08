# Parcours Utilisateur & Cartographie Applicative (APP_FLOW)

## Plateforme Agro-Industrielle B2B : Transformation & Exportation de Cacao Pur

* **Projet :** Agro-Industrial Cocoa Processing Platform
* **Document :** 02_APP_FLOW.md
* **Version :** 1.2.0
* **Date :** Octobre 2026

---

## 1. Cartographie des Vues & Routes

L'application est construite comme une Single Page Application (SPA) réactive à haute performance. L'état de navigation est synchronisé avec l'historique du navigateur via la fonction `parseLocation()` et les événements `popstate`.

```mermaid
graph TD
    A[Accueil : HomeView] -->|Filtrer / Explorer| B[Catalogue : CatalogueView]
    A -->|Audit & Procédés| C[Savoir-Faire & EUDR : SavoirFaireView]
    A -->|Normes & Laboratoire| D[Qualité & Laboratoire : QualityView]
    A -->|Demande Directe| E[Cotation RFQ & Contact : ContactRfqView]
    
    B -->|Sélection Produit| F[Fiche Technique : ProductDetailView]
    B -->|Ajout au panier| G[Panier RFQ Persistant]
    
    F -->|Demande Fiche PDF| H[Modale Lead TDS : TdsDownloadModal]
    F -->|Ajouter référence| G
    
    C -->|Sélection Lot Export| I[Modale Certificat : CoaModal]
    D -->|Ouvrir Modèle CoA| I
    
    G -->|Finaliser Dossier| E
    
    Z[Route Inconnue] --> K[Page 404 : NotFoundView]
```

### Table des Vues Principales

| Vue | Route Virtuelle | Composant Source | Fonction Métier Principale |
| :--- | :--- | :--- | :--- |
| **Accueil** | `/` | [`HomeView.tsx`](file:///d:/Bureau/Site%20Agroalimentaire/agro-industrial-cocoa-processing/src/components/home/HomeView.tsx) | Hero industriel, 3 segments filières, 3 piliers de gouvernance, extraits du catalogue technique. |
| **Savoir-Faire** | `/savoir-faire` | [`SavoirFaireView.tsx`](file:///d:/Bureau/Site%20Agroalimentaire/agro-industrial-cocoa-processing/src/components/savoir-faire/SavoirFaireView.tsx) | Ruban continu des 6 ateliers, KPIs EUDR géoréférencés, registre des lots industriels libérés. |
| **Catalogue** | `/catalogue` | [`CatalogueView.tsx`](file:///d:/Bureau/Site%20Agroalimentaire/agro-industrial-cocoa-processing/src/components/catalogue/CatalogueView.tsx) | Moteur à facettes ultra-réactif (< 15 ms), filtrage combinatoire (Secteur / Famille / Recherche). |
| **Fiche Produit** | `/produit/:id` | [`ProductDetailView.tsx`](file:///d:/Bureau/Site%20Agroalimentaire/agro-industrial-cocoa-processing/src/components/product/ProductDetailView.tsx) | Spécifications complètes ISO, microbiologie PCR, contaminants métaux lourds, emballages FCL. |
| **Qualité & Labo** | `/qualite` | [`QualityView.tsx`](file:///d:/Bureau/Site%20Agroalimentaire/agro-industrial-cocoa-processing/src/components/quality/QualityView.tsx) | 8 certifications internationales, matrice des protocoles ISO 17025, protocole de Positive Release. |
| **Cotation RFQ** | `/contact` | [`ContactRfqView.tsx`](file:///d:/Bureau/Site%20Agroalimentaire/agro-industrial-cocoa-processing/src/components/contact/ContactRfqView.tsx) | Formulaire de conversion B2B, échantillons R&D, volumes FCL, Incoterms, anti-bot Turnstile invisible. |
| **Erreur 404** | `/404` (fallback) | [`NotFoundView.tsx`](file:///d:/Bureau/Site%20Agroalimentaire/agro-industrial-cocoa-processing/src/components/common/NotFoundView.tsx) | Écran sobre de redirection vers le catalogue ou l'accueil en cas d'URL non reconnue. |

---

## 2. Diagrammes des Flux d'Interaction Clés

### Parcours A : Découverte Commerciale & Conversion RFQ

Ce flux illustre le parcours classique d'un acheteur industriel ou d'un responsable R&D agroalimentaire.

```mermaid
sequenceDiagram
    autonumber
    actor Acheteur as Acheteur Industriel (Client)
    participant Cat as CatalogueView & ProductCard
    participant Det as ProductDetailView
    participant Mod as TdsDownloadModal
    participant RFQ as ContactRfqView
    participant API as Backend Express / Vite Plugin
    participant DB as SQLite leads.db

    Acheteur->>Cat: Applique les filtres (Alimentaire + Beurres)
    Cat-->>Acheteur: Mise à jour instantanée des cartes (grille 2x2)
    Acheteur->>Cat: Clic sur "+ Devis RFQ"
    Cat->>Cat: Persistance produit dans localStorage (b2b_rfq_basket)
    Acheteur->>Det: Clic sur la carte pour consulter les specs
    Det-->>Acheteur: Affichage granulométrie, indice peroxyde, FFA
    Acheteur->>Mod: Clic sur "Télécharger Fiche Technique TDS"
    Mod->>API: Soumission coordonnées lead TDS (POST /api/leads)
    API->>DB: Sauvegarde du lead technique
    Mod-->>Acheteur: Téléchargement immédiat du PDF vectoriel
    Acheteur->>RFQ: Navigation vers "/contact"
    RFQ-->>Acheteur: Formulaire pré-rempli avec les références sélectionnées
    Acheteur->>RFQ: Saisie société, Incoterm CIF Le Havre, volume 50T
    RFQ->>API: Soumission dossier complet (POST /api/rfq)
    API->>DB: Écriture sécurisée WAL avec référence RFQ-2026-XXXXXX
    API-->>RFQ: HTTP 200 { success: true, rfqReference }
    RFQ-->>Acheteur: Confirmation écran + Référence officielle
```

---

### Parcours B : Consultation du Registre des Lots & Certification CoA

Ce flux illustre la vérification de conformité par un responsable Qualité ou un auditeur export.

```mermaid
sequenceDiagram
    autonumber
    actor Qualite as Responsable Qualité / Auditeur
    participant SF as SavoirFaireView
    participant ModCoA as CoaModal
    participant API as Endpoint /api/docs/coa/:lot
    
    Qualite->>SF: Accède à la section Registre des Lots
    SF-->>Qualite: Affichage des 4 derniers lots (Statut, Coopérative, Fermentation, Cd)
    Qualite->>SF: Sélectionne le lot "LOT-CI-2026-904A"
    SF-->>Qualite: Mise à jour du bandeau analytique LIMS
    Qualite->>SF: Clic sur "Ouvrir le Certificat CoA"
    SF->>ModCoA: Déclenchement de la modale d'inspection
    ModCoA-->>Qualite: Visualisation intégrale des résultats d'essais ISO 17025
    Qualite->>ModCoA: Clic sur "Télécharger le PDF Officiel"
    ModCoA->>API: Requête GET /api/docs/coa/LOT-CI-2026-904A
    API-->>Qualite: Téléchargement du fichier PDF certifié avec cachet LIMS
```

---

### Parcours C : Ruban Continu des 6 Étapes de Raffinage

Ce flux illustre l'interaction de découverte technique sur le pipeline d'ingénierie.

```mermaid
sequenceDiagram
    autonumber
    actor Visiteur as Visiteur / Acheteur Technique
    participant SF as SavoirFaireView (Ruban 6 Unités)
    
    Visiteur->>SF: Clic sur l'étape 04 ("PRS-04 · Pressage")
    SF->>SF: Mise à jour de l'état activeStepIndex (3)
    SF-->>Visiteur: Activation du fond sombre et liseré laiton sur PRS-04
    SF-->>Visiteur: Cadran Température: 95-105°C | Cadran Débit: 6.5 T/h
    SF-->>Visiteur: Tableau compact 3 colonnes :
    Note over SF: Input: Masse pure 52-54% MG<br/>Output: Beurre PPP limpide + Galettes tourteaux<br/>CCP: Asservissement 450 bar, double filtration
```

---

## 3. Gestion des États Globaux

L'application orchestre son état de manière fluide à la racine dans [`App.tsx`](file:///d:/Bureau/Site%20Agroalimentaire/agro-industrial-cocoa-processing/src/App.tsx) :

1. **État du Panier RFQ (`selectedRfqProductIds: string[]`) :**
   * Initialisé au montage depuis `localStorage.getItem('b2b_rfq_basket')` ou initialisé à tableau vide `[]`.
   * Synchronisé immédiatement à chaque appel de `toggleRfqProduct(product)`.
   * Accessible en lecture par l'en-tête de navigation, le catalogue, les fiches produits et le formulaire de contact.

2. **État de la Navigation (`currentView` et `selectedProductId`) :**
   * Synchronisation bi-directionnelle avec `window.location.pathname` et `window.location.search`.
   * Défilement automatique vers le haut (`window.scrollTo({ top: 0, behavior: 'smooth' })`) lors de chaque transition de vue.
   * Mise à jour synchrone des balises documentaires SEO (`document.title`, `meta description`, balises OpenGraph).

3. **État des Modales Modulaires :**
   * `isTdsModalOpen` + `activeTdsProduct` : Modale de capture de lead technique.
   * `isCoaModalOpen` + `activeCoaBatch` : Modale de consultation et d'export de Certificat d'Analyse.
   * `isTermsModalOpen` : Modale des Conditions Générales de Vente B2B export.
   * `isPrivacyModalOpen` : Modale de conformité RGPD et politique de gestion des données des leads.

4. **Notifications & Feedback d'Erreur :**
   * Gestion réactive des alertes de soumission dans le formulaire RFQ (indicateur de chargement, message de succès stylisé avec référence unique, bannière d'erreur explicite en cas de rejet réseau ou validation Zod).
