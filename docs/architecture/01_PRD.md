# Product Requirements Document (PRD)

## Plateforme Agro-Industrielle B2B : Transformation & Exportation de Cacao Pur

* **Projet :** Agro-Industrial Cocoa Processing Platform
* **Version :** 1.2.0 (Norme Industrielle 2026)
* **Date de référence :** Octobre 2026
* **Statut :** Spécification de Référence

---

## 1. Vision Produit & Cibles Métier

### 1.1 Vision Industrielle
Fournir aux grands comptes de l'agro-industrie mondiale, de la chocolaterie fine et de la dermo-cosmétique une interface technique directe avec l'outil industriel de première transformation situé à San Pedro (Côte d'Ivoire).

La plateforme élimine les intermédiaires de courtage traditionnels en garantissant une traçabilité intégrale de la fève au conteneur export, validée par des données de laboratoire accrédité et un géoréférencement conforme aux exigences internationales les plus strictes.

### 1.2 Segments Clients Cibles

1. **Grands Industriels Chocolatiers & Confiseurs (Filière CHO) :**
   * *Besoins :* Masse de cacao pure à granulométrie sub-micrométrique (< 20 µm), beurre de cacao Pure Prime Pressed (PPP) à cristallisation bêta V certifiée, livraisons en citernes calorifugées 24 tonnes ou cartons export 25 kg.
   * *Exigences :* Cadmium ICP-MS strictement inférieur à 0.050 ppm, absence totale de graisses végétales d'addition (pur beurre de cacao 100%).

2. **Industries Biscuiterie, Produits Laitiers & Glacerie (Filière BIS) :**
   * *Besoins :* Poudres de cacao micronisées naturelles (pH 5.2 - 6.0) et alcalinisées Dutch process (10-12% et 20-22% MG, nuances brun chaud à rouge rubis), tourteaux concassés bruts (kibbled cake).
   * *Exigences :* Finesse Alpine 99.8% passant au tamis 75 µm (200 mesh), mouillabilité et dispersibilité instantanées.

3. **Laboratoires Cosmétiques & Dermo-Pharmacie (Filière INCI/COSMOS) :**
   * *Besoins :* Beurre de cacao cosmétique désodorisé blanc et brut certifié Ecocert Cosmos (INCI: *Theobroma Cacao Seed Butter*, CAS: 8002-31-1), masses concentrées en polyphénols antioxydants (> 4 000 mg/kg) et théobromine.
   * *Exigences :* Neutralité microbiologique conforme Pharmacopée Européenne (Ph. Eur.), point de fusion physiologique à 32-35°C.

---

## 2. Objectifs Business & Indicateurs Clés (KPIs)

* **Qualification des Leads B2B :** Taux de conversion élevé des requêtes d'acheteurs industriels grâce à un tunnel RFQ (*Request For Quotation*) structuré avec numérotation unique de dossier (`RFQ-2026-XXXXXX`).
* **Conformité Réglementaire EUDR (Règlement UE 2023/1115) :** Mise à disposition immédiate des identifiants polygonaux GPS de chaque lot exporté pour les déclarations de diligence raisonnée (DDS).
* **Autonomie R&D & Assurance Qualité :** Téléchargement lead-gated des Fiches Techniques officielles (TDS / PDS) et consultation publique du Registre des Certificats d'Analyse (CoA) émis par le laboratoire LIMS interne.
* **Réduction du Délai Commercial :** Engagement d'un traitement et d'une cotation ferme sous 24h à 48h ouvrées par le Desk Export.

---

## 3. Périmètre Fonctionnel Détaillé

### 3.1 Panier RFQ Persistant multi-produits
* **Stockage Local :** Persistance de l'état du panier dans le navigateur de l'acheteur via la clé `b2b_rfq_basket`.
* **Sélection Dynamique :** Possibilité d'ajouter ou de retirer n'importe lequel des 9 dérivés de cacao purs depuis le catalogue ou les fiches détaillées sans rechargement de page.
* **Indicateur Temps Réel :** Badge d'inventaire dans l'en-tête et la barre mobile affichant le nombre de références retenues.

### 3.2 Formulaire de Cotation Industrielle & Échantillonnage
* **Typologie de Demande :** Sélection exclusive entre Cotation de Volume FCL/LCL (`quote`), Demande d'Échantillons R&D (`sample`) et Contrat-Cadre Annuel (`contract`).
* **Conditionnements Échantillons R&D :** Formats calibrés de 250 g, 500 g ou 1 000 g sous vide hermétique pour tests applicatifs en laboratoire client.
* **Incoterms 2020 :** Sélection normalisée des conditions de livraison maritime :
  * `FOB San Pedro` (embarquement direct quai portuaire)
  * `CIF Le Havre / Rotterdam / Anvers / Hambourg`
  * `CFR` (Cost & Freight)
  * `FCA` (Free Carrier)
* **Champs Entreprise Obligatoires :** Raison sociale, numéro de TVA intracommunautaire ou d'immatriculation fiscale, pays de destination, port d'arrivée, coordonnées professionnelles.

### 3.3 Traçabilité EUDR 2023/1115 & Géomapping Polygonal
* **Prouvabilité Satellite :** Intégration des métriques d'audit radar Sentinel-2 démontrant l'absence de déforestation post-31 décembre 2020.
* **Registre Public des Lots Libérés :** Tableau interactif des lots récents avec état sanitaire LIMS, score de fermentation, taux de cadmium en ppm et coopérative d'origine géomappée.
* **Transparence d'Origine :** Cartographie des bassins de collecte (San Pedro, Sassandra, Soubré, Divo).

### 3.4 Pipeline Industriel de Raffinage en 6 Étapes
* **Barre de Contrôle Continue :** Navigation segmentée à travers les 6 ateliers de fabrication industrielle :
  * `01 · REC-01` : Réception & Nettoyage Fèves (15.0 T/h)
  * `02 · TOR-02` : Torréfaction Continue (10.5 T/h)
  * `03 · MOY-03` : Broyage & Affinage Liqueur (8.0 T/h)
  * `04 · PRS-04` : Pressage Mécanique PPP 450 bar (6.5 T/h)
  * `05 · ALC-05` : Alcalinisation & Micronisation Alpine (5.5 T/h)
  * `06 · EMB-06` : Conditionnement & Détection X-Ray (12.0 T/h)
* **Données Télégraphiques :** Affichage systématique par étape de la matière entrante (Input), du produit sortant (Output) et du point critique de contrôle sanitaire (CCP).

### 3.5 Gestion Documentaire Technique (TDS & CoA)
* **Génération PDF Haute Fidélité :** Production de documents PDF vectoriels avec métadonnées officielles via `pdf-lib`.
* **Lead Capture TDS :** Formulaire léger préalable au téléchargement de la fiche TDS, reliant automatiquement l'intérêt de l'acheteur à son compte prospect.
* **Visionneuse CoA Interactive :** Consultation des résultats d'essais réels avec fonction d'export direct ou impression formelle.

---

## 4. Règles de Gestion Métier & Critères d'Acceptation

| Réf. | Règle Métier | Critère d'Acceptation Technique |
| :--- | :--- | :--- |
| **RG-01** | Validation E-mail Professionnel | Rejet immédiat de toute adresse provenant d'un domaine jetable ou temporaire (blacklist Zod de 30+ domaines). |
| **RG-02** | Protection Anti-Bot Invisible | Vérification cryptographique silencieuse via Cloudflare Turnstile (`1x00...BB` / secret officiel). Blocage avec HTTP 403 en cas d'échec. |
| **RG-03** | Persistance Garantie ("Zéro Perte") | Enregistrement prioritaire dans SQLite avec WAL (`leads.db`), doublé d'un miroir de secours JSON (`leads.json`). |
| **RG-04** | Limitation de Débit (Rate Limiting) | Plafond strict de 5 soumissions RFQ par 15 minutes par adresse IP (code HTTP 429 avec en-têtes IETF `Retry-After`). |
| **RG-05** | Notification Multi-Canal | Accusé de réception HTML automatique au prospect et alerte instantanée au Desk Export avec coordonnées complètes. |
| **RG-06** | Accès Administratif Sécurisé | Les endpoints d'audit `/api/leads*` exigent impérativement une clé d'administration (`Bearer` ou `x-admin-key`) validée par temps constant (`timingSafeEqual`). |
| **RG-07** | Intégrité des Spécifications | Chaque produit du catalogue doit exposer au minimum 4 critères physico-chimiques vérifiables selon normes ISO (11053, 660, 3960). |
