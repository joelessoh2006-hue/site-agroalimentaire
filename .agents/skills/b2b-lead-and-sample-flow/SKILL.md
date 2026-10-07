---
name: b2b-lead-and-sample-flow
description: Protocole de conception et de validation des flux de conversion B2B pour le secteur agro-industriel et cosmétique. À utiliser pour les formulaires de demande d'échantillons R&D, les cotations de volume FCL/LCL, la validation anti-spam et le routage commercial.
---

# B2B Lead & Sample Flow (Qualification & Conversion Industrielle)

Ce skill formalise les exigences fonctionnelles et logiques pour transformer les visiteurs professionnels (acheteurs, formulateurs R&D, traders) en leads industriels qualifiés.

---

## 1. Typologie des Demandes B2B

| Type de Requête | Cible Typique | Quantités Typiques | Champs Critiques | Délai de Réponse Garanti |
| :--- | :--- | :--- | :--- | :--- |
| **Demande d'Échantillon Laboratoire** | Formulateurs R&D, Responsables Qualité | 250 g, 500 g, 1 kg | Application finale, n° TVA/SIRET, adresse de laboratoire | 48h ouvrées (expédition DHL/FedEx) |
| **Demande de Cotation Industrielle (Spot)** | Responsables Achats, Sourcing | 1 à 10 Palettes (1 à 10 MT) | Incoterm recherché (FOB, CIF, EXW), port de destination, délai souhaité | 24h ouvrées |
| **Contrat Cadre Annuel** | Directeurs des Achats Grands Comptes | 50 MT à 500+ MT (Conteneurs FCL) | Calendrier de cadencement, formule de couverture cours Londres/NY, spécifications sur mesure | Contact direct Direction Export |

---

## 2. Règles de Qualification et Détection des Fraudes

1. **Validation E-mail d'Entreprise :**
   - Refuser ou inciter fortement à ne pas utiliser des domaines génériques gratuits (`gmail.com`, `yahoo.com`, `hotmail.com`, `protonmail.com`).
   - Règle UI : Afficher un avertissement informatif : *"Pour accélérer le traitement de votre demande d'échantillon, veuillez renseigner une adresse e-mail professionnelle associée à votre domaine d'entreprise."*

2. **Champs Obligatoires B2B :**
   - **Raison Sociale / Nom légal de l'entreprise** (min. 2 caractères).
   - **Identifiant Fiscal / N° de TVA Intracommunautaire / Registration Number**.
   - **Pays et Code Postal** (détermine la zone commerciale export assignée).
   - **Numéro de téléphone avec indicatif international** (format E.164 : `+33...`).
   - **Produits ciblés & Grade précis** (pré-rempli via le contexte de la fiche produit).

3. **Protection Double Barrière Anti-Bot :**
   - **Champ Honeypot :** Champ caché invisible (CSS `position: absolute; opacity: 0; pointer-events: none`) nommé de manière attrayante pour un bot (ex: `tax_registration_internal_id`). Si renseigné, la requête est acceptée en apparence (retour `200 OK`) mais ignorée en base.
   - **Cloudflare Turnstile :** Validation token côté serveur obligatoire avant émission de tout email ou webhook.

---

## 3. Modèle de Données Payload (Schéma Zod)

```typescript
import { z } from 'zod';

export const B2BLeadSchema = z.object({
  requestType: z.enum(['sample', 'quote', 'contract']),
  companyName: z.string().min(2, "Le nom de l'entreprise est obligatoire"),
  taxOrVatNumber: z.string().min(3, "L'identifiant fiscal ou TVA est requis"),
  contactName: z.string().min(2, "Nom et prénom du contact requis"),
  contactEmail: z.string().email("Adresse email invalide"),
  contactPhone: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Numéro de téléphone au format international requis"),
  industrySector: z.enum(['food_chocolate', 'confectionery', 'cosmetics', 'pharma', 'distribution']),
  country: z.string().length(2, "Code pays ISO à 2 lettres"),
  
  // Détail des volumes / échantillons
  productId: z.string(),
  productName: z.string(),
  sampleSize: z.enum(['250g', '500g', '1kg']).optional(),
  targetVolumeMetricTons: z.number().positive().optional(),
  preferredIncoterm: z.enum(['EXW', 'FOB', 'CIF', 'CFR', 'DAP']).optional(),
  destinationPort: z.string().optional(),
  
  // Message et contexte projet
  projectDescription: z.string().max(2000).optional(),
  
  // Anti-spam
  honeypot: z.string().max(0, "Tentative de spam détectée").optional(),
  turnstileToken: z.string().min(1, "Vérification de sécurité obligatoire"),
  
  // Conformité
  rgpdConsent: z.literal(true, {
    errorMap: () => ({ message: "Le consentement au traitement des données commerciales est obligatoire" }),
  }),
});
```

---

## 4. Notifications & Boucle de Traitement Commercial

1. **Accusé de Réception Automatique (Client) :**
   - Template HTML bilingue haut de gamme, avec logo vectoriel, numéro de référence de dossier unique (`LEAD-2026-XXXX`).
   - Mention des prochaines étapes : transmission à l'ingénieur commercial de la zone géographique concernée.
2. **Notification Équipe Commerciale & R&D :**
   - Dispatch automatique par pays :
     - Europe / Amériques : Desk Export Paris / Genève.
     - Afrique / Moyen-Orient : Desk Usine Abidjan / San Pedro.
   - Payload JSON envoyé au Webhook CRM (HubSpot / Odoo) avec étiquette de priorité selon le volume prévisionnel.
