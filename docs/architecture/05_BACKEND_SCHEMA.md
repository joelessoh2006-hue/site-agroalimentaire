# Schéma de Données & Contrats d'API (BACKEND_SCHEMA)

## Plateforme Agro-Industrielle B2B : Transformation & Exportation de Cacao Pur

* **Projet :** Agro-Industrial Cocoa Processing Platform
* **Document :** 05_BACKEND_SCHEMA.md
* **Version :** 1.2.0
* **Date :** Octobre 2026

---

## 1. Modèle de Données TypeScript Métier

Les définitions formelles suivantes régissent l'intégrité de l'ensemble de l'application dans [`src/types.ts`](file:///d:/Bureau/Site%20Agroalimentaire/agro-industrial-cocoa-processing/src/types.ts) :

### 1.1 Ingrédient Dérivé de Cacao Pur (`CocoaProduct`)

```typescript
export type ProductCategory = 'beurres' | 'poudres' | 'masses';
export type IndustrySector = 'alimentaire' | 'cosmetique' | 'agricole';

export interface ChemicalSpec {
  parameter: string;        // Ex: "Teneur en Matière Grasse", "Acidité Libre (FFA)"
  value: string;            // Ex: "min. 99.5%", "max. 1.75%"
  standardMethod?: string;  // Ex: "ISO 11053:2009", "ISO 660:2020"
  unit?: string;            // Ex: "%", "mg KOH/g", "meq O2/kg"
}

export interface IndustrialPackaging {
  format: string;           // Ex: "Carton export 25 kg avec poche polyéthylène thermoscellée"
  netWeightKg: number;      // Ex: 25, 190, 1000, 24000
  grossWeightKg?: number;
  palletSpec: string;       // Ex: "Palette Europe traitée NIMP 15 (1 000 kg net)"
}

export interface CocoaProduct {
  id: string;               // Ex: "beurre-cacao-naturel-ppp"
  slug: string;
  name: string;             // Ex: "Beurre de Cacao Naturel Pur (PPP)"
  commercialName: string;
  subtitle: string;
  category: ProductCategory;
  industry: IndustrySector[];
  fatContentPercentage?: string;
  phRange?: string;
  inciName?: string;        // Pour les cosmétiques : Theobroma Cacao Seed Butter
  casNumber?: string;       // Pour les cosmétiques : 8002-31-1
  einecsNumber?: string;
  origin: string;           // Ex: "San Pedro, République de Côte d'Ivoire"
  moq: string;              // Ex: "500 kg (1 palette)" ou "20 MT (1 conteneur 20' FCL)"
  shelfLife: string;        // Ex: "24 mois en emballage d'origine hermétique"
  storageConditions: string;
  colorGrade: string;
  meltingPoint?: string;    // Ex: "32.0 - 35.0 °C (Point de glissement)"
  description: string;
  sensoryProfile: string;
  applications: string[];
  keyFeatures: string[];
  certifications: string[];
  specs: Record<string, string>;
  detailedSpecs: ChemicalSpec[];
  microbiologicalSpecs: {
    parameter: string;      // Ex: "Salmonella spp."
    target: string;         // Ex: "Absence / 2 x 375 g"
    standardMethod: string; // Ex: "ISO 6579-1 / PCR temps réel"
  }[];
  contaminantsSpecs: {
    parameter: string;      // Ex: "Cadmium (Cd)"
    limit: string;          // Ex: "< 0.050 ppm"
    compliance: string;     // Ex: "Règlement UE 488/2014 & 2021/1323"
  }[];
  packaging: IndustrialPackaging[];
  image_url: string;
  macro_image_url: string;
  coaAvailable: boolean;
  tdsAvailable: boolean;
  tdsPdfUrl?: string;
  coaPdfUrl?: string;
}
```

---

### 1.2 Lot Industriel Libéré LIMS (`ProcessingBatch`)

```typescript
export interface ProcessingBatch {
  lotCode: string;          // Format normalisé : LOT-[PAYS]-[ANNÉE]-[IDENTIFIANT]
  originCountry: string;    // Ex: "Côte d'Ivoire"
  cooperative: string;      // Ex: "Coopérative SCOOPS-KAP (San Pedro)"
  region: string;           // Ex: "Bas-Sassandra"
  cropSeason: string;       // Ex: "Récolte Principale 2025/2026"
  arrivalDate: string;      // Date de réception d'usine
  releaseDate: string;      // Date de signature LIMS de libération
  status: 'VALIDÉ EXPORT' | 'CONTRÔLE LABORATOIRE' | 'EN MATURATION';
  moisturePercent: number;  // Humidité fèves (< 7.5%)
  fermentationScore: number;// Score de coupe cut-test (> 80/100)
  cadmiumPpm: number;       // Teneur réelle mesurée par ICP-MS (< 0.050 ppm)
  leadPpm: number;          // Teneur en plomb (< 0.10 ppm)
  sensoryNotes: string[];
  beanCountPer100g: number; // Calibre de fèves (95 - 105 fèves / 100g)
  fsscSeal: string;         // Empreinte cryptographique de scellé
  allocatedDerivative: string;
  tankerVesselRef: string;  // Référence conteneur ou navire
  gpsCoordinates?: {
    lat: number;
    lng: number;
    polygonPlotsCount: number; // Nombre de parcelles géomappées associées
  };
}
```

---

## 2. Schéma Relationnel de la Base de Données (SQLite `leads.db`)

La persistance des soumissions de devis RFQ et des téléchargements de fiches techniques repose sur la table `leads` :

```sql
CREATE TABLE IF NOT EXISTS leads (
  id TEXT PRIMARY KEY,                       -- Identifiant unique (UUID v4 ou RFQ-2026-XXXXXX)
  created_at TEXT NOT NULL,                  -- Horodatage ISO-8601 UTC
  request_type TEXT NOT NULL,                -- 'quote' | 'sample' | 'contract'
  status TEXT DEFAULT 'nouveau',             -- 'nouveau' | 'traite' | 'archive' | 'rejete'
  company_name TEXT NOT NULL,                -- Raison sociale de l'entreprise
  vat_number TEXT,                           -- Numéro TVA / Fiscal
  contact_name TEXT NOT NULL,                -- Nom et prénom de l'interlocuteur
  contact_email TEXT NOT NULL,               -- Adresse e-mail professionnelle vérifiée
  contact_phone TEXT,                        -- Téléphone direct ou indicatif export
  country TEXT NOT NULL,                     -- Pays de destination
  industry_sector TEXT,                      -- 'alimentaire' | 'cosmetique' | 'autre'
  selected_product_ids TEXT NOT NULL,        -- JSON stringified array des IDs produits
  sample_size TEXT,                          -- '250g' | '500g' | '1kg' (si request_type = 'sample')
  target_volume_metric_tons TEXT,            -- Volume souhaité en tonnes métriques
  preferred_incoterm TEXT,                   -- 'FOB' | 'CIF' | 'CFR' | 'FCA'
  destination_port TEXT,                     -- Port de déchargement convenu
  project_description TEXT,                  -- Cahier des charges et spécifications particulières
  ip_address TEXT,                           -- Adresse IP cliente pour audit de sécurité
  turnstile_verified INTEGER DEFAULT 0       -- 1 si validé cryptographiquement par Cloudflare
);

CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(contact_email);
```

---

## 3. Contrats d'API REST

### 3.1 Endpoint de Soumission RFQ : `POST /api/rfq`
Accessible publiquement sous protection de débit (5 requêtes/15 min) et anti-bot Turnstile.

#### Charge Utile Requise (Payload JSON) :
```json
{
  "requestType": "quote",
  "companyName": "Chocolaterie Artisanale du Rhône SAS",
  "vatNumber": "FR89849204859",
  "contactName": "Marc Descombes",
  "contactEmail": "m.descombes@chocolats-rhone.fr",
  "contactPhone": "+33 4 72 00 11 22",
  "country": "France",
  "industrySector": "alimentaire",
  "selectedProductIds": [
    "beurre-cacao-naturel-ppp",
    "masse-cacao-pure"
  ],
  "targetVolumeMetricTons": "24",
  "preferredIncoterm": "CIF",
  "destinationPort": "Le Havre (FRLEH)",
  "projectDescription": "Livraison cadencée en conteneur 20' FCL. Taux de FFA maximal exigé : 1.50%.",
  "turnstileToken": "0.X_example_token_cf..."
}
```

#### Réponses HTTP Normalisées :
* **HTTP 200 OK (Succès) :**
  ```json
  {
    "success": true,
    "rfqReference": "RFQ-2026-894102",
    "message": "Votre demande de cotation industrielle a été enregistrée avec succès. Notre Desk Export vous transmettra une proposition ferme sous 24 à 48 heures."
  }
  ```

* **HTTP 400 Bad Request (Erreur de Validation) :**
  ```json
  {
    "success": false,
    "error": "ValidationFailed",
    "details": [
      {
        "field": "contactEmail",
        "message": "Les adresses e-mails temporaires ou jetables ne sont pas acceptées pour les demandes professionnelles."
      }
    ]
  }
  ```

* **HTTP 403 Forbidden (Échec Anti-Bot) :**
  ```json
  {
    "success": false,
    "error": "CaptchaVerificationFailed",
    "message": "Échec de la validation de sécurité anti-bot Cloudflare Turnstile."
  }
  ```

* **HTTP 429 Too Many Requests (Dépassement de Quota) :**
  ```json
  {
    "success": false,
    "error": "RateLimitExceeded",
    "message": "Trop de soumissions détectées depuis cette adresse IP. Veuillez patienter avant de renouveler l’opération."
  }
  ```

---

### 3.2 Endpoint de Téléchargement Documentaire : `GET /api/docs/tds/:slug`
Délivre le fichier binaire PDF officiel de la fiche technique produit.

* **Paramètres d'URL :** `slug` (identifiant produit, ex: `beurre-cacao-naturel-ppp`).
* **Paramètres de Query :** `inline=true` (affichage navigateur) ou absent (téléchargement forcé).
* **En-têtes HTTP de réponse :**
  * `Content-Type: application/pdf`
  * `Content-Disposition: attachment; filename="TDS-beurre-cacao-naturel-ppp-AgroIndustrial-2026.pdf"`
  * `Cache-Control: public, max-age=86400, s-maxage=604800`

---

### 3.3 Endpoint Administratif Sécurisé : `GET /api/leads`
Permet la consultation des leads qualifiés par le Desk Export.

* **Authentification obligatoire :** En-tête `Authorization: Bearer <ADMIN_API_KEY>` ou `x-admin-key: <ADMIN_API_KEY>`.
* **Pagination sécurisée :** Paramètres `limit` (max 100) et `offset`.
* **Réponse :** Liste paginée des prospects avec statuts de traitement et dates d'enregistrement.
