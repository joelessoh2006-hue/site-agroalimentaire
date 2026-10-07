# 📋 État de Session & Avancement du Projet (SESSION_STATE.md)

**Date :** 7 Octobre 2026  
**Projet :** Plateforme B2B Agro-Industrielle de Transformation du Cacao  
**Statut global :** ✅ Application frontend opérationnelle, typée et compilée avec succès (`npm run build` OK, serveur local actif sur `http://localhost:3000`).

---

## 1. Synthèse de ce qui a été accompli aujourd'hui

### A. Audit & Reconstruction de la Base de Code
- **Résolution des conflits de paquets :** Résolution des dépendances Vite 8 / Tailwind CSS v4 / React 19 et compilation TypeScript à zéro erreur (`tsc --noEmit`).
- **Design System Industriel Premium :** Intégration fidèle de la charte graphique :
  - Palette : `#221510` (Roasted Noir), `#4A2C21` (Cocoa Core), `#F8F4EE` (Cream Substrate), `#C29958` (Harvest Bronze), `#2E5A36` (Certified Green).
  - Typographie : Space Grotesk (titres), Hanken Grotesk (corps de texte), JetBrains Mono (données de labo et métriques de lots).

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

### Fichiers Créés & Modifiés Récemment
- [`src/components/common/NotFoundView.tsx`](file:///d:/Bureau/Site%20Agroalimentaire/agro-industrial-cocoa-processing/src/components/common/NotFoundView.tsx) - Vue 404 sobre avec retour au catalogue.
- [`src/components/common/MobileStickyBar.tsx`](file:///d:/Bureau/Site%20Agroalimentaire/agro-industrial-cocoa-processing/src/components/common/MobileStickyBar.tsx) - Barre d'action fixe en bas d'écran mobile.
- [`src/App.tsx`](file:///d:/Bureau/Site%20Agroalimentaire/agro-industrial-cocoa-processing/src/App.tsx) - Intégration de la route 404 et de la barre mobile fixe.
- [`public/robots.txt`](file:///d:/Bureau/Site%20Agroalimentaire/agro-industrial-cocoa-processing/public/robots.txt) - Configuration robots.txt.
- [`public/sitemap.xml`](file:///d:/Bureau/Site%20Agroalimentaire/agro-industrial-cocoa-processing/public/sitemap.xml) - Cartographie XML canonique.
- [`public/favicon.svg`](file:///d:/Bureau/Site%20Agroalimentaire/agro-industrial-cocoa-processing/public/favicon.svg) - Favicon vectoriel.
- [`public/images/og-share.jpg`](file:///d:/Bureau/Site%20Agroalimentaire/agro-industrial-cocoa-processing/public/images/og-share.jpg) - Visuel OpenGraph.
- [`index.html`](file:///d:/Bureau/Site%20Agroalimentaire/agro-industrial-cocoa-processing/index.html) - Balises d'en-tête et métadonnées.

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
