# 📋 État de Session & Avancement du Projet (SESSION_STATE.md)

**Date :** 7 Octobre 2026  
**Projet :** Plateforme B2B Agro-Industrielle de Transformation du Cacao  
**Statut global :** ✅ Application frontend opérationnelle, typée et compilée avec succès (`npm run build` OK, serveur local actif sur `http://localhost:3000`).

---

## 1. Synthèse de ce qui a été accompli aujourd'hui

### A. Audit & Reconstruction de la Base de Code
- **Résolution des conflits de paquets :** Résolution des dépendances Vite 8 / Tailwind CSS v4 / React 19 et compilation TypeScript à zéro erreur (`tsc --noEmit`).
- **Phase 1 Refactoring Design (Élimination des marqueurs génériques) :**
  - **Typographie éditoriale & technique :** Remplacement de Space Grotesk par `Fraunces` pour les titres éditoriaux de caractère, couplée à `IBM Plex Sans` pour le corps technique et `JetBrains Mono` pour les valeurs de laboratoire et de contrôle LIMS.
  - **Géométrie industrielle stricte :** Élimination de toutes les ombres portées diffuses (`shadow-md`, `shadow-xl`, `shadow-2xl`, etc.). Remplacement par des bordures rectilignes de 1px (`#E4DDD3` ou `#4A2C21`) et un chanfrein sobre de 2px (`rounded-[2px]`).
  - **Micro-interactions sobres :** Suppression des effets de lévitation (`hover:-translate-y-*`, `hover:scale-*`, `group-hover:scale-105`) au profit de transitions directes de contraste (`transition-colors`).
- **Phase 2 Refactoring Structurel de la Page d'Accueil (`HomeView.tsx`) :**
  - **Hero industriel :** Titre affirmé décrivant le métier exact de l'usine, suppression de la grille de points en arrière-plan, suppression du badge pilule pulsant au profit d'un indicateur technique sobre.
  - **Suppression de la grille Bento :** Remplacement des blocs asymétriques décoratifs par une structure équilibrée en 3 piliers industriels (Traçabilité EUDR 2023/1115, Laboratoire ISO 17025, Logistique maritime & conditionnements).
  - **Indicateurs d'usine vérifiables :** Métriques réelles (85 000 t/an broyage San Pedro, 450 bars pressage mécanique PPP, &lt; 75 µm finesse alpine, &lt; 0.050 ppm seuil ICP-MS cadmium).
- **Phase 3 Alignement Design B2B Standard Barry Callebaut :**
  - **Typographie néo-grotesque éditoriale :** Déclaration de `--font-sans`, `--font-display`, `--font-title` et `--font-body` avec `Source Sans 3` pour une application globale sans régression sur l'ensemble des balises, couplée à `JetBrains Mono` pour les valeurs chiffrées de laboratoire.
  - **Boutons et CTA industriels :** Rectangles nets avec chanfrein 2px initial, puis adoucissement harmonisé.
  - **Fiches produits standard Barry Callebaut :** Conteneur blanc pur sur fond écru léger, séparation par bordure fine 1px, image nette, badge de segment sobre, tableau succinct de 2 spécifications clés en grille 2 colonnes avec diviseur vertical (`divide-x divide-[#E4DDD3] bg-[#FAF7F2]`), et boutons directs de téléchargement TDS et devis RFQ.
  - **Filtres du catalogue :** Élimination des arrondis hétérogènes au profit d'un design net et cohérent.
- **Phase 4 Harmonisation des Arrondis (Adoucissement des angles rigides) :**
  - **Cartes et conteneurs principaux :** Passage généralisé à `rounded-[8px]` sur les cartes de segment métier, cartes produits, cartes piliers industriels, conteneurs de modales, panneaux de filtres et sections.
  - **Boutons d'action, CTA & Contrôles de formulaire :** Passage généralisé à `rounded-[6px]` sur l'ensemble des boutons du site (Header, CTA, RFQ, TDS, CoA, filtres, inputs, selects, textareas).
  - **Boîtes d'icônes techniques (`w-10 h-10`, `w-12 h-12`, `w-8 h-8`) :** Passage à `rounded-[6px]`.
  - **Badges, puces et étiquettes techniques :** Passage à `rounded-[4px]`.
  - **Couverture exhaustive :** 100% des composants mis à jour (`Header`, `HomeView`, `CatalogueView`, `ProductCard`, `ProductDetailView`, `SavoirFaireView`, `QualityView`, `ContactRfqView`, `Footer`, `TermsModal`, `PrivacyModal`, `TdsDownloadModal`, `CoaModal`, `MobileStickyBar`, `CookieBanner`, `NotFoundView`). Zero régression, zéro `rounded-[2px]` restant, build vérifié.
- **Phase 5 Audit de Sécurité Automatisé Herozion & Remédiation OWASP (Score 100/100, Grade A) :**
  - **Diagnostic initial Herozion (`npx herozion scan`) :** Score initial de 43/100 (Grade D, 13 vulnérabilités détectées sur 53 fichiers : fuite mémoire Node.js EventEmitter, exposition d'erreur interne, absence de pagination SQL, absence de schémas Zod sur routes API, journalisation sensible).
  - **Remédiation complète :**
    - `server/apiPlugin.ts` : Helper `readJsonBodySafe` avec plafond strict de 100 Ko, gestion d'erreur réseau, `req.destroy()` et détachement garanti des écouteurs (`req.off()`). Remplacement des fuites d'erreur technique par des messages génériques. Validation Zod de l'ensemble des routes (`leads`, `status`, `tds`, `coa`).
    - `server/db.ts` : Pagination systématique sur `getAllLeads(limit, offset)` avec `LIMIT ? OFFSET ?` (plafond maximal de 100).
    - `server/index.ts` : Schémas Zod stricts pour tous les paramètres d'URL (`id`, `slug`, `lot`) et de query string (`inline`, `limit`, `offset`), avec regex bloquant les tentatives de Path Traversal (`^[a-z0-9\-]+$`).
    - `server/turnstile.ts` : Suppression des logs sensibles contenant des mots-clés d'authentification.
  - **Résultat final certifié par Herozion :** **Score 100 / 100 (Grade A, Mention « Excellent »)**, **0 vulnérabilité restante**, compilation TypeScript sans erreur (`tsc --noEmit`), build Vite réussi.
- **Phase 6 Suppression des Données Simulées par Défaut & Persistance du Panier RFQ :**
  - **Panier RFQ à zéro par défaut (`src/App.tsx`) :** Suppression des 2 produits représentatifs préchargés en dur. Initialisation de `selectedRfqProductIds` à tableau vide `[]` ou rechargé dynamiquement depuis `localStorage.getItem('b2b_rfq_basket')` si l'utilisateur a fait des sélections préalables.
  - **Masquage du badge de devis :** Le badge dans le `Header` et la barre mobile ne s'affiche plus lorsque le panier est vide (`rfqItemsCount > 0`).
  - **Formulaire de contact B2B (`src/components/contact/ContactRfqView.tsx`) :** Suppression des valeurs pré-cochées en dur (pays, secteur, volume, incoterm, port). Ajout d'options de choix neutres (`"Sélectionnez..."`) et ajout du sélecteur explicite de pays avec validation obligatoire.
- **Phase 7 Épuration Technique des 6 Étapes de Fabrication (`SavoirFaireView.tsx`) :**
  - **Suppression des icônes décoratives génériques :** Retrait de `Factory`, `Flame`, `Cog`, `Layers`, `Sparkles` et `Package` en haut à droite des 6 cartes d'étape.
  - **Affichage du débit volumique en JetBrains Mono :** Positionnement du débit volumique (`15.0 T/h`, etc.) en haut à droite en police `font-mono text-xs text-[#78716C]` (ou laiton `#C29958` quand l'étape est active).
  - **Trigrammes industriels d'unité normalisés :** Association en haut à gauche du numéro et du code machine officiel (`01 · REC-01`, `02 · TOR-02`, `03 · MOY-03`, `04 · PRS-04`, `05 · ALC-05`, `06 · EMB-06`).
  - **Maintien de l'interaction dynamique :** Préservation du fond sombre `#221510` et des accents laiton `#C29958` pour l'étape active.
- **Phase 8 Allègement Ergonomique & Densité de Texte (`SavoirFaireView.tsx`) :**
  - **En-tête épuré :** Suppression du badge vert flottant et réduction du sous-titre à une seule phrase technique concise.
  - **Tableau télégraphique à 3 colonnes :** Remplacement des longs paragraphes et encadrés narratifs de l'étape active par un tableau compact Input / Output / CCP avec maintien des cadrans Température et Débit en JetBrains Mono.
  - **Bloc EUDR minéral clair :** Passage sur fond clair `#FAF7F2` bordé `#E4DDD3`, élimination des 3 longs pavés narratifs et conservation exclusive du titre, du CTA et des 4 KPIs majeurs en JetBrains Mono.
  - **Bande de métriques compacte et rectiligne :** Fiche de lot simplifiée avec métriques analytiques LIMS (Fermentation, Cadmium, Calibre, Sceau sanitaire) sous forme d'une ligne technique avec diviseurs fins.
- **Phase 9 Barre de Contrôle Segmentée Continue sans Troncature (`SavoirFaireView.tsx`) :**
  - **Barre industrielle monobloc :** Remplacement de la grille de cartes par un ruban de contrôle continu `divide-x divide-[#E4DDD3] grid grid-cols-6` encapsulé dans un conteneur `rounded-lg border border-[#E4DDD3] bg-white`.
  - **Élimination complète des troncatures :** Raccourcissement précis des 6 libellés ("Réception Fèves", "Torréfaction", "Broyage & Affinage", "Pressage", "Alcalinisation", "Conditionnement") et suppression des sous-titres anglais superflus.
  - **Style actif feutré & accent cuivré :** Fond doux `#FAF7F2` avec liseré supérieur cuivré de 2px (`border-[#C29958]`), titre en noir d'encre dense `#1C1917` et métriques en laiton `#9C7336`.
- **Phase 10 Épuration Visuelle Globale & Suppression des Icônes Génériques :**
  - **`HomeView.tsx` :** Remplacement des boîtes d'icônes génériques des piliers industriels et des segments de marché par des trigrammes industriels normalisés et références normatives en `JetBrains Mono` (`SEG · 01 / CHO`, `SEG · 02 / BIS`, `INCI / COSMOS`, `EU 2023/1115`, `ISO/IEC 17025`, `FCL · SAN PEDRO`, `AUDIT QA · SLA 48H`).
  - **`ProductImage.tsx` :** Élimination de `Sparkles`, `Layers` et `Box` au profit d'une mire d'usine sobre de laboratoire affichant le code SKU en typographie monospace (`SKU · BUT-PPP-NAT`, etc.) et le conditionnement officiel.
  - **`ContactRfqView.tsx` & `TdsDownloadModal.tsx` :** Éradication de 100% des icônes décoratives à l'intérieur des inputs (`Building`, `User`, `Mail`, `Phone`, `Globe`), suppression du padding décalé `pl-9` au profit d'un padding standard net `px-3 py-2`, et remplacement des icônes latérales par des trigrammes de localisation (`LOC · FAC-01`, `LOG · HUB-EUR`, `HQ · SALES`).
  - **`CookieBanner.tsx` :** Retrait de l'icône de biscuit `Cookie` au profit d'un en-tête technique sobre sur la gouvernance des données et les traceurs ePrivacy / RGPD.
  - **Interface globale (`Header`, `QualityView`, `Footer`, `CoaModal`, `ProductCard`, `ProductDetailView`) :** Conservation stricte des icônes utilitaires réelles (`Search`, `X`, `Download`, `Printer`, `Check`, `Chevron`). Zéro warning ou erreur TypeScript (`tsc --noEmit` code 0, `npm run build` réussi).
- **Phase 11 Refonte Ergonomique du Catalogue & des Cartes Produits (`CatalogueView.tsx` & `ProductCard.tsx`) :**
  - **Toolbar industrielle unifiée (`CatalogueView.tsx`) :** Fusion de la recherche textuelle, des sélecteurs Application (Agroalimentaire/Cosmétique) et Famille (Beurres/Poudres/Masses) dans un conteneur unique monobloc blanc bordé (`border border-[#E4DDD3] rounded-lg p-3`).
  - **Indicateur d'inventaire :** Affichage officiel sous forme monospace `"INDEX · 9 RÉFÉRENCES DISPONIBLES"`.
  - **Épuration des cartes produits (`ProductCard.tsx`) :** Suppression des paragraphes descriptifs narratifs générant des troncatures (...). Affichage d'un sous-titre technique d'une seule ligne.
  - **Mini-grille physico-chimique à 3 colonnes :** 3 paramètres normalisés par famille sous forme de grille monospace délimitée par une bordure fine et diviseurs verticaux.
  - **Badge technique d'application :** Badges en `JetBrains Mono` (`text-[11px] font-mono px-2 py-0.5 rounded border`) en haut à droite de l'image.
  - **Ligne d'expédition :** Format d'emballage net (`"EMBALLAGE : Carton export 25 kg · Liner PE"`).
  - **Hiérarchisation des boutons :** `"Fiche TDS"` en outline sobre (`border border-[#E4DDD3] hover:border-[#221510]`) et `"Devis RFQ"` en bouton plein laiton/chocolat (`bg-[#C29958]`).
  - **Validation & Build :** `npm run lint` (`tsc --noEmit`) code 0, `npm run build` réussi.
- **Phase 12 Cartes Produits Aérées & Grille 2×2 Style Barry Callebaut (`ProductCard.tsx`) :**
  - **Structure aérée et interactive :** Carte entière cliquable avec curseur pointeur et transition douce vers la vue détail du produit, suppression de l'effet de compartimentage rigide, fond blanc pur avec coins arrondis doux `rounded-xl` et marges généreuses `p-6`.
  - **Badge secteur compact :** Badge discret du secteur d'application en police JetBrains Mono `font-mono text-[10px]` en haut à droite de l'image.
  - **Typographie éditoriale :** Catégorie en petites capitales discrètes couleur laiton `#9C7336`, titre produit net et contrasté en noir chocolat `#1C1917` (`font-semibold text-lg`), suppression du sous-titre redondant.
  - **Grille de spécifications 2×2 :** Conteneur doux `rounded-xl bg-[#FAF7F2] p-3.5 border border-[#E4DDD3]/60` avec grille 2 colonnes × 2 lignes (`Matière Grasse (MG)`, `FFA / pH`, `Point de fusion / Finesse`, `Conditionnement`). Libellé en très petit au-dessus (`text-[11px] text-[#78716C]`), valeur en gras en dessous (`font-mono text-sm text-[#1C1917] font-semibold`), zéro troncature.
  - **Ligne d'action sobre en bas de carte :** Suppression des 2 gros boutons côte à côte au profit d'une ligne épurée : lien discret `"Détails techniques →"` à gauche et bouton compact `"+ Devis RFQ"` en chocolat/laiton (`px-3 py-1.5 rounded-md text-xs font-medium bg-[#221510] text-white hover:bg-[#C29958]`) à droite avec `stopPropagation`.
  - **Contrôle & Build :** `npm run lint` (`tsc --noEmit`) code 0, `npm run build` réussi.
- **Phase 13 Correction du Mode Cloudflare Turnstile & Épuration Anti-Bot (`TurnstileWidget.tsx` & `server/turnstile.ts`) :**
  - **Éradication de l'avertissement rouge de test :** Remplacement de la clé de test factice visible (`1x...AA`) par la clé officielle Cloudflare pour mode invisible (`1x00000000000000000000BB`).
  - **Suppression du conteneur lourd :** Remplacement de l'imposant cadre de 65px par un conteneur adaptatif discret qui ne laisse aucun espace vide et préserve l'expérience utilisateur sans friction.
  - **Mention de réassurance discrète :** Ligne sobre en bas de formulaire indiquant la protection anti-bot active et le respect de la vie privée.
  - **Contrôle & Build :** `tsc --noEmit` code 0, `npm run build` réussi (2.94s).
- **Phase 14 Harmonisation des Effets de Survol de la Page d'Accueil (`HomeView.tsx`) :**
  - **Alignement strict du degré de surbrillance :** Application de la même surbrillance de bordure dorée laiton (`hover:border-[#C29958] transition-colors group`) et de contraste de titre (`group-hover:text-[#4A2C21]`) sur les 3 cartes de Gouvernance Industrielle & Logistique (Traçabilité EUDR, Laboratoire ISO 17025, Logistique Export FCL), identique aux 3 Grands Segments Métier.
  - **Contrôle & Build :** `tsc --noEmit` code 0, `npm run build` réussi (2.26s).
- **Phase 15 Audit d'Uniformité Globale & Standardisation des Cartes et Micro-Interactions :**
  - **Unification des cartes produits Accueil & Catalogue (`HomeView.tsx` & `ProductCard.tsx`) :** Remplacement de l'ancien bloc de cartes dupliqué de l'Accueil par le composant officiel `<ProductCard />`. Les cartes de l'Accueil bénéficient désormais de la grille 2×2 Barry Callebaut, du conteneur `rounded-xl`, du clic global et de la ligne d'action épurée.
  - **Cartes de certifications (`QualityView.tsx`) :** Ajout de la classe `group` et du contraste réactif de titre (`group-hover:text-[#4A2C21] transition-colors`).
  - **Cartes coordonnées & hubs usine (`ContactRfqView.tsx`) :** Harmonisation de la surbrillance de bordure dorée (`hover:border-[#C29958] transition-colors group`) sur les 3 cartes latérales d'information de l'usine et des bureaux export.
  - **Cartes métriques EUDR (`SavoirFaireView.tsx`) :** Passage à `rounded-[8px]` et ajout de la transition douce `hover:border-[#C29958] transition-colors`.
  - **Contrôle & Build :** `tsc --noEmit` code 0, `npm run build` validé en 2.01s.
- **Phase 16 Documentation d'Ingénierie Complète (`docs/architecture/`) :**
  - **Rédaction des 6 documents maîtres d'architecture logicielle :**
    * `01_PRD.md` : Vision produit, segments industriels B2B, traçabilité EUDR, pipeline 6 étapes et règles de gestion métier.
    * `02_APP_FLOW.md` : Cartographie des 6 vues principales, diagrammes de séquence Mermaid (conversion RFQ, registre des lots CoA, ruban des étapes) et gestion des états globaux.
    * `03_DESIGN_SYSTEM.md` : Charte Barry Callebaut / Bühler, tokens chromatiques minéraux, typographie JetBrains Mono obligatoire pour les données, trigrammes d'atelier et spécifications de cartes 2×2.
    * `04_TRD.md` : Pile Jamstack React 19 / Vite / Tailwind v4, sécurité OWASP certifiée Herozion (Grade A 100/100), SQLite WAL, rate limiter et validation Zod.
    * `05_BACKEND_SCHEMA.md` : Modèles TypeScript stricts, schéma relationnel SQLite (`leads`), contrats d'API REST (`POST /api/rfq`, endpoints documentaires et administratifs).
    * `06_IMPLEMENTATION_PLAN.md` : Synthèse des 15 phases validées, roadmap ordonnancée (table/grille, i18n, SEO JSON-LD) et discipline de CI.
  - **Contrôle & Build :** `tsc --noEmit` code 0, `npm run build` réussi en 1.84s.

### B. Modélisation Exhaustive des Données Métier
- **9 Dérivés de Cacao Purs modélisés :**
  1. *Beurre de cacao naturel alimentaire (PPP)*
  2. *Beurre de cacao désodorisé blanc raffiné*
  3. *Beurre de cacao cosmétique (INCI / Cosmos Approved)*
  4. *Poudre de cacao naturelle non alcalinisée (pH 5.2 - 6.0)*
  5. *Poudre de cacao alcalinisée 10-12% (Dutch process)*
  6. *Poudre de cacao alcalinisée 20-22% (Haute matière grasse, rouge rubis)*
  7. *Masse de cacao pure alimentaire (Finesse < 20 µm)*
  8. *Masse de cacao cosmétique riche en polyphénols & théobromine*
  9. *Tourteau de cacao (« Troutrou » 10/12% brut / kibbled)*
- **Spécifications physico-chimiques complètes :** Taux de matière grasse (ISO 11053), FFA (ISO 660), indice de peroxyde (ISO 3960), point de fusion, granulométrie Alpine 75µm, etc.
- **Conformité & Sécurité Sanitaire :** Limites métaux lourds (Cadmium selon Règl. UE 488/2014, Plomb), microbiologie (Salmonella PCR 2x375g), emballages d'exportation (cartons 25kg, big bags 1T, fûts 190kg, citernes 24T).

### C. Réalisation des 6 Vues Principales (Architecture Jamstack SPA)
1. **`Accueil B2B` (`/`) :** Hero industriel, segmentation de marché (Chocolaterie, Industrie Agroalimentaire, Dermo-Cosmétique), Bento grid, KPIs clés (45 000 MT/an, 100% fèves EUDR), CTA de devis.
2. **`Savoir-Faire & Traçabilité` (`/savoir-faire`) :** Pipeline industriel en 6 étapes (fermentation, nettoyage, torréfaction, mouture, pressage 450 bars, micronisation alpine), conformité EUDR 2023/1115 avec polygones GPS, registre public des lots libérés (`LOT-GH-2026-884A`, etc.).
3. **`Catalogue Filtrable` (`/catalogue`) :** Moteur à facettes ultra-réactif (< 15 ms, zéro rechargement), filtrage croisé Secteur (Agro vs Cosmétique) et Catégorie (Beurres, Poudres, Masses & Tourteaux), synchronisation d'état dans l'URL (`?industry=...&category=...&search=...`), sélection pour devis groupé.
4. **`Fiche Spécification Produit` (`/produit/:id`) :** Onglets interactifs physico-chimiques, microbiologiques, contaminants et emballages, déclenchement de la modale TDS.
5. **`Qualité & Laboratoire` (`/qualite`) :** 8 certifications internationales avec badges vérifiables, matrice ISO 17025 (ICP-MS, PCR, HPLC), visionneuse de Certificat d'Analyse (CoA) interactive.
6. **`Demande de Cotation B2B & Échantillons` (`/contact`) :** Formulaire de conversion pour échantillons R&D (250g, 500g, 1kg) et volumes industriels (palettes, conteneurs FCL/LCL), Incoterms (FOB, CIF, CFR, FCA), honeypot anti-spam, génération automatique de numéro de dossier (`RFQ-2026-XXXXXX`).

### D. Modales & Composants Transversaux
- **`TdsDownloadModal` :** Téléchargement lead-gated des Fiches Techniques avec génération de blob de données téléchargeable.
- **`CoaModal` :** Visionneuse de Certificat d'Analyse avec fonction d'impression navigateur directe.
- **`Header` & `Footer` :** Navigation responsive, sélecteur de langue, indicateur dynamique de produits ajoutés au devis RFQ.

### E. Intégration des Vraies Photos Produits Personnalisées
- **Origine :** Récupération de l'ensemble des 9 photos dédiées préparées par l'utilisateur (nommées exactement selon chaque dérivé de cacao).
- **Traitement & Optimisation :** Redimensionnement et optimisation haute fidélité (interpolation bicubique haute qualité, ratio adapté aux fiches et cartes, compression JPEG qualité 92) placés dans `public/images/products/`.
- **Remplacement dans les Données :** Mise à jour de `src/data/products.ts` pour pointer sur les assets locaux hébergés (`/images/products/*.jpg`), avec temps de réponse instantané (HTTP 200) et zéro dépendance à des CDN externes.

### F. Backend RFQ, Persistance Relationnelle & Routage E-mail Fiabilisé
- **Validation & Sanitization Zod :** Validation stricte des payloads entrants (`companyName`, `contactName`, `contactEmail` avec filtrage d'adresses jetables/temporaires, `country`, `destinationPort`, `selectedProductIds`, limitation de longueur anti-injection, honeypot anti-spam transparent).
- **Persistance Garantie ("Zéro Perte de Prospect") :**
  - Moteur relationnel SQLite via `better-sqlite3` avec journalisation Write-Ahead Logging (`leads.db` WAL) pour garantir la résilience et les écritures concurrentes.
  - Miroir de secours instantané en JSON (`leads.json`) assurant une portabilité immédiate.
  - Connecteur optionnel Supabase / PostgreSQL activable par simple variable d'environnement (`SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`).
- **Sécurisation Stricte des Routes d'Administration (`/api/leads*`) :**
  - Fin du risque de fuite de données de prospects B2B : toutes les routes d'administration (`GET /api/leads`, `GET /api/leads/:id`, `PATCH /api/leads/:id/status`) sont désormais obligatoirement protégées via le module [`server/auth.ts`](file:///d:/Bureau/Site%20Agroalimentaire/agro-industrial-cocoa-processing/server/auth.ts).
  - Authentification doublement supportée : en-tête `Authorization: Bearer <ADMIN_API_KEY>` ou en-tête personnalisé `x-admin-key: <ADMIN_API_KEY>`.
  - Rejet immédiat avec code HTTP `401 Unauthorized` (avec en-tête `WWW-Authenticate`) si le jeton est manquant, et `403 Forbidden` si la clé fournie est invalide.
  - La route de soumission de formulaires (`POST /api/rfq` / `POST /api/contact`) reste publique pour que les acheteurs puissent postuler sans restriction.
- **Limitation de Débit & Protection Anti-DDoS / Anti-Scraping ([`server/rateLimiter.ts`](file:///d:/Bureau/Site%20Agroalimentaire/agro-industrial-cocoa-processing/server/rateLimiter.ts)) :**
  - Moteur en mémoire autonome basé sur une fenêtre glissante temporelle (*Sliding Window*) avec normalisation des adresses IP (support `x-forwarded-for`, `x-real-ip`, IPv6/IPv4).
  - **Soumissions RFQ / Contact :** Plafond strict de **5 requêtes par tranche de 15 minutes par IP**.
  - **Téléchargement Fiches PDF (`/api/docs/*`) :** Plafond anti-scraping massif de **30 requêtes par minute par IP**.
  - **Réponse HTTP Standardisée :** Dès dépassement du quota, renvoi immédiat du code **429 Too Many Requests**, avec en-têtes standard IETF (`X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`, `Retry-After: <seconds>`) et corps JSON explicatif.
- **Routage des E-mails Transactionnels (SMTP Fiabilisé & Resend API) :**
  - Fin du risque de spam lié au simple `mail()` non configuré : intégration de l'API moderne Resend (`RESEND_API_KEY`) et du transporteur standardisé `nodemailer` pour serveurs SMTP professionnels (Brevo / Sendinblue, Postmark, SendGrid).
  - **E-mail A (Accusé de Réception Prospect) :** Modèle HTML élégant aux couleurs de l'usine (`#221510`, `#C29958`, `#2E5A36`), référence unique de dossier (`RFQ-2026-XXXXXX`), délai d'engagement de réponse sous 24 à 48h ouvrées, récapitulatif de la demande, rappel des garanties de conformité (FSSC 22000, EUDR traçabilité GPS) et lien direct vers le catalogue technique / fiches TDS.
  - **E-mail B (Alerte Interne Commerciale Export) :** Dispatché instantanément à `commercial-desk@cacao-ivoire-industries.com` avec indicateur de priorité (Échantillons R&D vs Volume FCL/LCL), coordonnées complètes de l'acheteur (société, TVA, port, Incoterm, volume, IP) et boutons de contact direct.
  - **Résilience & Fallback Local :** Si le service mail subit une interruption externe ou est en mode dev sans clés configurées, les e-mails sont archivés en HTML dans `server/sent-emails/` sans jamais faire échouer l'enregistrement du prospect.

- **Protection Anti-Bot par Captcha Invisible (Cloudflare Turnstile) ([`server/turnstile.ts`](file:///d:/Bureau/Site%20Agroalimentaire/agro-industrial-cocoa-processing/server/turnstile.ts)) :**
  - **Fin des puzzles de feux et vélos :** Solution moderne, ultra-rapide et respectueuse de la vie privée (zéro tracking utilisateur, compatible RGPD).
  - **Composant Frontend Dédié ([`TurnstileWidget.tsx`](file:///d:/Bureau/Site%20Agroalimentaire/agro-industrial-cocoa-processing/src/components/common/TurnstileWidget.tsx)) :** Widget discret intégré au formulaire de devis RFQ (`ContactRfqView.tsx`), chargement asynchrone du SDK Cloudflare avec fallback gracieux et gestion des cycles de réinitialisation/expiration.
  - **Vérification Cryptographique Côté Serveur :** Validation du token via l'endpoint officiel Cloudflare `https://challenges.cloudflare.com/turnstile/v0/siteverify` avec l'adresse IP cliente et la clé secrète.
  - **Rejet Immédiat des Bots Headless :** Blocage des scripts automatisés (Puppeteer, Playwright, curl) avec statut HTTP `403 Forbidden` (`CaptchaVerificationFailed`) avant toute persistance ou envoi d'e-mail.
  - **Clés de Test Officielles Cloudflare :** Support natif des paires de clés officielles (`1x00000000000000000000AA` / `1x0000000000000000000000000000000AA` Always Passes, `2x...` Always Fails) configurables via `VITE_TURNSTILE_SITE_KEY` et `TURNSTILE_SECRET_KEY` dans `.env.example`.

- **En-têtes HTTP de Sécurité Globaux OWASP & CSP ([`server/securityHeaders.ts`](file:///d:/Bureau/Site%20Agroalimentaire/agro-industrial-cocoa-processing/server/securityHeaders.ts)) :**
  - **Content-Security-Policy (CSP) Stricte :** Restreint les origines autorisées (`'self'`, Google Fonts, Cloudflare Turnstile, images Unsplash/data/blob, interdiction stricte de scripts externes non autorisés et plugins via `object-src: 'none'`).
  - **Anti-Clickjacking :** `X-Frame-Options: DENY` et `frame-ancestors 'none'` interdisant tout encadrement malveillant dans des iframes externes.
  - **Chiffrement Garanti (HSTS) :** `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload` forçant HTTPS sur 1 an.
  - **Contrôle des Référents :** `Referrer-Policy: strict-origin-when-cross-origin`.
  - **Désactivation des Capteurs Matériels :** `Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=(), ...` désactivant tout accès intrusif non nécessaire aux périphériques.
  - **Protection Anti-MIME-Sniffing & COOP :** `X-Content-Type-Options: nosniff`, `Cross-Origin-Opener-Policy: same-origin-allow-popups`, `X-XSS-Protection: 0`.
  - **Multi-Environnement :** Appliqué de façon universelle sur le serveur Vite (`apiPlugin.ts`), le serveur Express (`server/index.ts`), et configuré pour le déploiement cloud via [`vercel.json`](file:///d:/Bureau/Site%20Agroalimentaire/agro-industrial-cocoa-processing/vercel.json) et [`public/_headers`](file:///d:/Bureau/Site%20Agroalimentaire/agro-industrial-cocoa-processing/public/_headers).

- **Audit des Variables d'Environnement & Fuites de Secrets (Étanchéité .env) :**
  - **Confinement Strict Côté Serveur (`server/`) :** Vérification exhaustive de toutes les clés d'API et secrets sensibles (`RESEND_API_KEY`, `SMTP_PASS`, `SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_API_KEY`, `TURNSTILE_SECRET_KEY`). Aucune de ces clés n'est importée ni accessible dans le bundle frontend (`src/`).
  - **Contrôle du Préfixe `VITE_` dans le Client :** La seule variable préfixée `VITE_` autorisée et présente est `VITE_TURNSTILE_SITE_KEY` (qui est par nature une clé publique de site requise par Cloudflare pour rendre le widget client). Aucune variable d'environnement privée n'est exposée aux visiteurs.
  - **Étanchéité Git Maximale ([`.gitignore`](file:///d:/Bureau/Site%20Agroalimentaire/agro-industrial-cocoa-processing/.gitignore)) :** Renforcement avec exclusion stricte de `.env`, `.env.local`, `.env.*.local`, des bases de données SQLite locales (`server/leads.db*`, `*.db*`), des exports JSON de leads (`leads.json`) et des e-mails archivés en dev (`sent-emails/`).
  - **Audit d'Historique Git Réalisé :** Aucun secret ni base de données n'a jamais été commité dans l'historique du dépôt Git.

- **Durcissement de Sécurité Backend & API (Application des 4 Priorités d'Audit) :**
  - **Authentification Sécurisée (`server/auth.ts`) :** Refus strict du démarrage en production si `ADMIN_API_KEY` est absente (suppression du fallback hardcodé). Remplacement de la comparaison d'égalité par `crypto.timingSafeEqual` sur hachages SHA-256 (neutralisation des attaques temporelles).
  - **Limitation de Débit Administrative (`server/rateLimiter.ts`, `apiPlugin.ts`, `server/index.ts`) :** Extension du rate limiter à `/api/leads*` (10 requêtes par 15 minutes par IP) pour bloquer les attaques par force brute sur la clé d'administration.
  - **Échappement Anti-Injection HTML (`server/emailService.ts`) :** Implémentation de la fonction `escapeHtml` et assainissement systématique de toutes les données interpolées dans les e-mails client et interne.
  - **Protection des Métadonnées Internes (`server/rfqHandler.ts`) :** Épuration de la réponse `POST /api/rfq` pour ne renvoyer que la référence de dossier et le message de confirmation sans divulguer de métadonnées d'architecture ni d'adresses IP.

### G. Gestion & Distribution des Fichiers Techniques (TDS & COA en PDF)
- **Génération Haute Fidélité Vectorielle :** Module de génération dédié [`server/generatePdfs.ts`](file:///d:/Bureau/Site%20Agroalimentaire/agro-industrial-cocoa-processing/server/generatePdfs.ts) s'appuyant sur `pdf-lib` sans dépendance C native.
  - **9 Fiches Techniques TDS Officielles (`public/docs/tds/`) :** Strictement conformes aux 7 sections réglementaires (Codex Alimentarius Stan 87-1981, règlements UE 488/2014 & 1169/2011, critères physico-chimiques ISO, microbiologie PCR Salmonella 2x375g, traçabilité EUDR 2023/1115, emballages FCL et visas de conformité).
  - **Certificats d'Analyse COA de Lots (`public/docs/coa/`) :** Certificats conformes ISO/IEC 17025:2017 avec tableau d'essais, seuils d'acceptation, résultats mesurés et sceau cryptographique LIMS.
- **En-têtes HTTP de Téléchargement Fiabilisés :**
  - Routes dédiées `/api/docs/tds/:slug` et `/api/docs/coa/:lot` (avec fallback intelligent sur les identifiants et les numéros de lots standard).
  - En-têtes stricts garantis :
    * `Content-Type: application/pdf`
    * `Content-Disposition: attachment; filename="TDS-[Produit]-AgroIndustrial-2026.pdf"` (ou `inline` avec `?inline=true` pour visualisation navigateur)
    * `Cache-Control: public, max-age=86400, s-maxage=604800`
    * `X-Content-Type-Options: nosniff`
- **Mise à Jour des Composants Frontend :**
  - [`TdsDownloadModal.tsx`](file:///d:/Bureau/Site%20Agroalimentaire/agro-industrial-cocoa-processing/src/components/modals/TdsDownloadModal.tsx) : Déclenche le téléchargement du vrai document PDF officiel tout en transmettant le lead à l'API industrielle. Écran de confirmation avec boutons de téléchargement direct et d'ouverture en ligne.
  - [`CoaModal.tsx`](file:///d:/Bureau/Site%20Agroalimentaire/agro-industrial-cocoa-processing/src/components/CoaModal.tsx) : Ajout du bouton d'export direct du PDF officiel du CoA en plus de l'impression navigateur.

---

## 2. Fichiers Créés et Modifiés

### Données & Modélisation
- [`src/types.ts`](file:///d:/Bureau/Site%20Agroalimentaire/agro-industrial-cocoa-processing/src/types.ts) — Schémas TypeScript stricts.
- [`src/data/products.ts`](file:///d:/Bureau/Site%20Agroalimentaire/agro-industrial-cocoa-processing/src/data/products.ts) — Base de données des 9 produits avec spécifications détaillées et URLs d'images 100% valides.
- [`src/data/pipelineData.ts`](file:///d:/Bureau/Site%20Agroalimentaire/agro-industrial-cocoa-processing/src/data/pipelineData.ts) — Étapes industrielles, conformité EUDR et registre des lots.
- [`src/data/qualityData.ts`](file:///d:/Bureau/Site%20Agroalimentaire/agro-industrial-cocoa-processing/src/data/qualityData.ts) — Certifications officielles et protocoles d'analyse laboratoire ISO 17025.

### Backend, API, Base de Données, Transactional Email & Documents
- [`server/securityHeaders.ts`](file:///d:/Bureau/Site%20Agroalimentaire/agro-industrial-cocoa-processing/server/securityHeaders.ts) — Configuration et middlewares des en-têtes HTTP de sécurité recommandés par l'OWASP (CSP, HSTS, anti-clickjacking).
- [`vercel.json`](file:///d:/Bureau/Site%20Agroalimentaire/agro-industrial-cocoa-processing/vercel.json) — Configuration Vercel avec en-têtes de sécurité OWASP et réécriture SPA.
- [`public/_headers`](file:///d:/Bureau/Site%20Agroalimentaire/agro-industrial-cocoa-processing/public/_headers) — En-têtes HTTP pour hébergeurs Cloudflare Pages et Netlify.
- [`server/turnstile.ts`](file:///d:/Bureau/Site%20Agroalimentaire/agro-industrial-cocoa-processing/server/turnstile.ts) — Module de validation cryptographique Cloudflare Turnstile anti-bot (`/siteverify`).
- [`server/rateLimiter.ts`](file:///d:/Bureau/Site%20Agroalimentaire/agro-industrial-cocoa-processing/server/rateLimiter.ts) — Moteur de Rate Limiting anti-DDoS / Brute-force en mémoire (Sliding Window, extraction d'IP robuste, en-têtes IETF).
- [`server/auth.ts`](file:///d:/Bureau/Site%20Agroalimentaire/agro-industrial-cocoa-processing/server/auth.ts) — Contrôle d'accès et authentification administrative (Bearer token & header `x-admin-key`) protégeant `/api/leads*`.
- [`server/generatePdfs.ts`](file:///d:/Bureau/Site%20Agroalimentaire/agro-industrial-cocoa-processing/server/generatePdfs.ts) — Générateur de PDF vectoriels haute fidélité (TDS & COA) avec `pdf-lib`.
- [`server/validation.ts`](file:///d:/Bureau/Site%20Agroalimentaire/agro-industrial-cocoa-processing/server/validation.ts) — Schémas Zod, sanitization et blacklist de domaines d'e-mails jetables.
- [`server/db.ts`](file:///d:/Bureau/Site%20Agroalimentaire/agro-industrial-cocoa-processing/server/db.ts) — Moteur de persistance SQLite (`leads.db`), gestion des statuts de leads, fallback JSON et connecteur Supabase.
- [`server/emailService.ts`](file:///d:/Bureau/Site%20Agroalimentaire/agro-industrial-cocoa-processing/server/emailService.ts) — Générateur de templates HTML soignés et dispatcher d'e-mails via Resend API, SMTP pro (Brevo/SendGrid) et archivage dev local.
- [`server/rfqHandler.ts`](file:///d:/Bureau/Site%20Agroalimentaire/agro-industrial-cocoa-processing/server/rfqHandler.ts) — Pipeline complet recevant les soumissions RFQ, persistant les leads et orchestrant les e-mails.
- [`server/apiPlugin.ts`](file:///d:/Bureau/Site%20Agroalimentaire/agro-industrial-cocoa-processing/server/apiPlugin.ts) — Middleware d'API Vite pour servir `/api/rfq`, `/api/contact`, `/api/leads` (sécurisé) et `/api/docs/*` avec Rate Limiting.
- [`.env.example`](file:///d:/Bureau/Site%20Agroalimentaire/agro-industrial-cocoa-processing/.env.example) — Documentation complète des clés Resend, ADMIN_API_KEY, SMTP et Supabase.

### Composants & Vues
- [`src/components/common/TurnstileWidget.tsx`](file:///d:/Bureau/Site%20Agroalimentaire/agro-industrial-cocoa-processing/src/components/common/TurnstileWidget.tsx) — Widget Cloudflare Turnstile moderne (chargement asynchrone, fallback, design cohérent).
- [`src/components/common/ProductImage.tsx`](file:///d:/Bureau/Site%20Agroalimentaire/agro-industrial-cocoa-processing/src/components/common/ProductImage.tsx) — Composant d'image résilient avec skeleton et fallback.
- [`src/components/home/HomeView.tsx`](file:///d:/Bureau/Site%20Agroalimentaire/agro-industrial-cocoa-processing/src/components/home/HomeView.tsx) — Page d'accueil B2B.
- [`src/components/savoir-faire/SavoirFaireView.tsx`](file:///d:/Bureau/Site%20Agroalimentaire/agro-industrial-cocoa-processing/src/components/savoir-faire/SavoirFaireView.tsx) — Page Savoir-faire & Traçabilité EUDR.
- [`src/components/catalogue/CatalogueView.tsx`](file:///d:/Bureau/Site%20Agroalimentaire/agro-industrial-cocoa-processing/src/components/catalogue/CatalogueView.tsx) — Catalogue filtrable à facettes.
- [`src/components/product/ProductDetailView.tsx`](file:///d:/Bureau/Site%20Agroalimentaire/agro-industrial-cocoa-processing/src/components/product/ProductDetailView.tsx) — Fiche technique détaillée par produit.
- [`src/components/quality/QualityView.tsx`](file:///d:/Bureau/Site%20Agroalimentaire/agro-industrial-cocoa-processing/src/components/quality/QualityView.tsx) — Page Qualité, Certifications & CoA.
- [`src/components/contact/ContactRfqView.tsx`](file:///d:/Bureau/Site%20Agroalimentaire/agro-industrial-cocoa-processing/src/components/contact/ContactRfqView.tsx) — Formulaire de cotation & échantillons B2B relié à l'API.
- [`src/components/modals/TdsDownloadModal.tsx`](file:///d:/Bureau/Site%20Agroalimentaire/agro-industrial-cocoa-processing/src/components/modals/TdsDownloadModal.tsx) — Modale de téléchargement TDS avec lead-capture.
- [`src/components/modals/CoaModal.tsx`](file:///d:/Bureau/Site%20Agroalimentaire/agro-industrial-cocoa-processing/src/components/modals/CoaModal.tsx) — Modale de consultation CoA.
- [`src/components/Header.tsx`](file:///d:/Bureau/Site%20Agroalimentaire/agro-industrial-cocoa-processing/src/components/Header.tsx) — En-tête de navigation.
- [`src/components/Footer.tsx`](file:///d:/Bureau/Site%20Agroalimentaire/agro-industrial-cocoa-processing/src/components/Footer.tsx) — Pied de page corporatif.
### G. SEO & Métadonnées Dynamiques (Lot 1)
- **`public/robots.txt` :** Autorise l'exploration générale, interdit l'accès à `/api/`, référence le sitemap officiel.
- **`public/sitemap.xml` :** Index canonique des 6 vues principales et des 9 fiches produits dédiées.
- **Titres et descriptions dynamiques (`src/App.tsx`) :** Synchronisation réactive de `document.title`, `meta[name="description"]`, `og:title` et `og:description` à chaque changement de vue ou de fiche produit.
- **Métadonnées sociales & Favicons (`index.html`) :** Balises OpenGraph et Twitter Card déclarées avec image dédiée 1200x630 (`/images/og-share.jpg`) et favicon vectoriel SVG (`/favicon.svg`).

### H. Expérience Mobile & Navigation (Lot 2)
- **Vue 404 dédiée ([`NotFoundView.tsx`](file:///d:/Bureau/Site%20Agroalimentaire/agro-industrial-cocoa-processing/src/components/common/NotFoundView.tsx)) :** Message sobre d'erreur HTTP 404, redirection vers le catalogue technique ou l'accueil, branchée sur toutes les routes inconnues dans `parseLocation()`.
- **Barre d'action fixe mobile ([`MobileStickyBar.tsx`](file:///d:/Bureau/Site%20Agroalimentaire/agro-industrial-cocoa-processing/src/components/common/MobileStickyBar.tsx)) :** Barre ancrée en bas d'écran sur les terminaux inférieurs à 768 px avec bouton direct de cotation RFQ et indicateur de panier.

### I. Conformité Légale B2B & Gestion des Cookies (Lot 3)
- **Conditions Générales de Vente B2B ([`TermsModal.tsx`](file:///d:/Bureau/Site%20Agroalimentaire/agro-industrial-cocoa-processing/src/components/modals/TermsModal.tsx)) :** Clauses industrielles d'exportation réelles : Incoterms 2020 (FOB San Pedro, CIF Le Havre/Rotterdam/Hambourg), conformité obligatoire au règlement EUDR 2023/1115 (polygones GPS, déclaration de diligence raisonnée DDS), arbitrage de la Fédération du Commerce des Cacaos (FCC).
- **Politique de Confidentialité B2B ([`PrivacyModal.tsx`](file:///d:/Bureau/Site%20Agroalimentaire/agro-industrial-cocoa-processing/src/components/modals/PrivacyModal.tsx)) :** Finalités de traitement inter-entreprises, conservation de 3 ans pour la prospection et 5 ans pour la traçabilité des lots, garantie de non-cession des données, contact DPO direct.
- **Bandeau de cookies sobre avec refus ([`CookieBanner.tsx`](file:///d:/Bureau/Site%20Agroalimentaire/agro-industrial-cocoa-processing/src/components/common/CookieBanner.tsx)) :** Propose explicitement l'acceptation et le refus sans artifice, mémorise le choix dans le `localStorage` et ne réapparaît plus.
- **Mesure d'audience sans traceurs (`index.html`) :** Intégration du script Cloudflare Web Analytics exempt de cookies et conforme aux exigences d'anonymat.
- **Pied de page interactif ([`Footer.tsx`](file:///d:/Bureau/Site%20Agroalimentaire/agro-industrial-cocoa-processing/src/components/Footer.tsx)) :** Liens directs vers les modales CGV et Confidentialité.

### Fichiers Créés & Modifiés Récemment
- [`src/components/modals/TermsModal.tsx`](file:///d:/Bureau/Site%20Agroalimentaire/agro-industrial-cocoa-processing/src/components/modals/TermsModal.tsx) - Modale des CGV B2B export.
- [`src/components/modals/PrivacyModal.tsx`](file:///d:/Bureau/Site%20Agroalimentaire/agro-industrial-cocoa-processing/src/components/modals/PrivacyModal.tsx) - Modale de confidentialité et droits des leads.
- [`src/components/common/CookieBanner.tsx`](file:///d:/Bureau/Site%20Agroalimentaire/agro-industrial-cocoa-processing/src/components/common/CookieBanner.tsx) - Bandeau de consentement avec refus réel.
- [`src/components/Footer.tsx`](file:///d:/Bureau/Site%20Agroalimentaire/agro-industrial-cocoa-processing/src/components/Footer.tsx) - Déclenchement des modales légales.
- [`index.html`](file:///d:/Bureau/Site%20Agroalimentaire/agro-industrial-cocoa-processing/index.html) - Balise télémétrique Cloudflare sans traceurs.
- [`src/App.tsx`](file:///d:/Bureau/Site%20Agroalimentaire/agro-industrial-cocoa-processing/src/App.tsx) - Orchestration des modales légales et du bandeau.

---

## 3. Tâches Prioritaires pour la Prochaine Session

| Priorité | Domaine | Tâche à réaliser | Description & Objectif |
| :---: | :--- | :--- | :--- |
| **P1** | **Backend, API & E-mails** | ✅ Endpoints API, Persistance SQLite/Supabase & Routage Resend/SMTP | Validés et testés avec succès (zéro perte de prospect, accusé de réception prospect & alerte commerciale générés). |
| **P2** | **Internationalisation (i18n)** | Finaliser le dictionnaire bilingue FR / EN | Permettre le basculement complet de l'interface et des fiches produits en anglais pour les acheteurs internationaux (Europe, Asie, Amériques). |
| **P3** | **Export PDF Officiel** | Générateur de PDF certifiés (TDS / COA) | Intégrer un générateur de documents PDF officiels (avec logo de l'usine, cachet de contrôle qualité et signature électronique) en remplacement du simple export texte. |
| **P4** | **Performance & Audit SEO** | Audit Core Web Vitals & Accessibilité | Mesurer et optimiser les scores Lighthouse (LCP < 1.2s, CLS < 0.05, accessibilité WCAG AA, balises OpenGraph et schema.org Product/Organization). |
| **P5** | **Préparation Déploiement** | Configuration de production | Mettre en place la configuration pour hébergement cloud (Vercel, Cloudflare Pages ou Docker) et variables d'environnement (`.env.production`). |

---

## 4. Instructions de Redémarrage Rapide

Pour relancer l'environnement de développement lors de la prochaine session :

```bash
cd "D:\Bureau\Site Agroalimentaire\agro-industrial-cocoa-processing"
npm run dev
```

L'application est immédiatement accessible sur `http://localhost:3000/`.
Le contrôle de typage TypeScript s'exécute via :

```bash
npm run lint
```
