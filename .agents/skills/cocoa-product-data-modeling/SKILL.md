---
name: cocoa-product-data-modeling
description: Guide technique pour la modélisation, le typage et la validation des ingrédients dérivés du cacao (beurres alimentaires et cosmétiques, poudres naturelles et alcalinisées, masses de cacao et tourteaux). À utiliser lors de la création ou mise à jour de fiches produits, schémas de données ou spécifications physico-chimiques.
---

# Cocoa Product Data Modeling (Ingrédients B2B Cacao)

Ce guide définit les règles de structuration, de typage TypeScript et de validation des données pour l'ensemble des dérivés industriels du cacao destinés aux marchés agroalimentaires et cosmétiques.

---

## 1. Familles de Produits et Attributs Standards

### A. Beurres de Cacao (Cocoa Butter)
- **Beurre Naturel Alimentaire (Pure Prime Pressed - PPP) :**
  - Couleur : Jaune doré pâle caractéristique.
  - Arôme : Odeur et saveur typiques de cacao franc.
  - FFA (Acides gras libres en acide oléique) : $\le 1.75\%$ (standard Codex : $\le 1.75\%$).
  - Indice de peroxyde : $\le 3.0\text{ meq O}_2/\text{kg}$.
  - Point de fusion (glissement) : $31.0 - 35.0^\circ\text{C}$.
  - Indice d'iode : $33 - 42\text{ g I}_2/100\text{g}$.
  - Indice de saponification : $188 - 198\text{ mg KOH/g}$.
  - Humidité : $\le 0.10\%$.

- **Beurre Désodorisé Blanc Raffiné (Deodorized / Filtered) :**
  - Procédé : Désodorisation physique à la vapeur d'eau sous vide poussé, filtration fine.
  - Couleur : Blanc cassé à ivoire très clair.
  - Goût & Arôme : Neutre, sans note résiduelle aromatique (idéal pour chocolat blanc et confiserie).
  - FFA : $\le 1.00\%$.
  - Indice de peroxyde : $\le 2.0\text{ meq O}_2/\text{kg}$.

- **Beurre de Cacao Cosmétique :**
  - INCI : *Theobroma Cacao (Cocoa) Seed Butter*.
  - CAS : 8002-31-1 | EINECS : 310-127-6.
  - Applications : Baumes, émulsions, savons solides, soins capillaires, beurres corporels.
  - Indice d'acide : $\le 2.0\text{ mg KOH/g}$.
  - Insaponifiables : $\le 0.5\%$.
  - Pureté microbiologique : Flore totale $< 100\text{ UFC/g}$, Levures & Moisissures $< 10\text{ UFC/g}$, absence de pathogènes (*Pseudomonas*, *S. aureus*, *C. albicans*).

---

### B. Poudres de Cacao (Cocoa Powder)
- **Poudre Naturelle (Non-alcalinisée) :**
  - pH : $5.2 - 6.0$.
  - Matière grasse résiduelle : $10 - 12\%$ standard.
  - Profil : Couleur brun clair à roux chaud, arôme fruité/acidulé d'origine.
  - Humidité : $\le 5.0\%$.
  - Finesse (tamis $75\ \mu\text{m} / 200\text{ mesh}$) : $\ge 99.5\%$.

- **Poudre Alcalinisée 10-12% (Medium Dutched / Brown to Dark) :**
  - pH : $7.0 - 7.6$.
  - Matière grasse résiduelle : $10 - 12\%$.
  - Propriétés : Solubilité et dispersibilité supérieures, arôme doux et rond sans amertume agressive.
  - Couleur : Brun chocolat chaud soutenu.

- **Poudre Alcalinisée 20-22% (High Fat Cocoa Powder) :**
  - pH : $7.2 - 7.8$.
  - Matière grasse résiduelle : $20 - 22\%$.
  - Applications : Chocolats chauds onctueux, crèmes desserts, ganaches, glacerie artisanale.
  - Richesse organoleptique : Texture veloutée, couleur intense, haute viscosité en émulsion.

---

### C. Masses & Dérivés (Cocoa Liquor & Cakes)
- **Masse de Cacao Alimentaire (Cocoa Liquor / Cocoa Mass) :**
  - Composition : $100\%$ fèves de cacao torréfiées broyées en pâte fluide.
  - Teneur en beurre de cacao : $52 - 54\%$.
  - Finesse : Micronisation fine ($< 25\ \mu\text{m}$).
  - Humidité : $\le 1.5\%$.

- **Masse de Cacao Cosmétique :**
  - Richesse naturelle en théobromine et polyphénols antioxydants.
  - Utilisation : Soins spa, masques d'enveloppement détoxifiants.

- **Tourteau de Cacao ("Troutrou" / Press Cake) :**
  - Définition : Résidu solide compact issu du pressage mécanique de la masse de cacao.
  - Teneur en matière grasse : $10 - 12\%$ ou $20 - 22\%$.
  - Formats industriels : Morceaux concassés (kibbled cake) ou disques compressés de presse hydraulique.
  - Destination : Broyage industriel en poudre ou formulation d'aliments composés.

---

## 2. Typage TypeScript de Référence

```typescript
export type IndustrySector = 'food' | 'cosmetics';
export type ProductCategory = 'butter' | 'powder' | 'mass_derivative';

export interface ChemicalSpec {
  parameter: string;
  value: string;
  standardMethod?: string;
  unit?: string;
}

export interface IndustrialPackaging {
  format: string; // Ex: "Carton 25 kg ondulé avec doublure PE"
  netWeightKg: number;
  grossWeightKg: number;
  palletSpec: string; // Ex: "Palette Europe filmée 1000 kg net (40 cartons)"
}

export interface CocoaProduct {
  id: string;
  slug: string;
  title: {
    fr: string;
    en: string;
  };
  category: ProductCategory;
  sectors: IndustrySector[];
  fatContentPercentage?: string; // Ex: "10-12%", "52-54%", "~100%"
  phRange?: string; // Ex: "5.2 - 5.8", "7.0 - 7.6"
  inciName?: string;
  casNumber?: string;
  moq: string; // Minimum Order Quantity
  certifications: string[]; // ["FSSC 22000", "ISO 9001", "Halal", "Kosher", "Bio", "Rainforest"]
  specifications: ChemicalSpec[];
  packaging: IndustrialPackaging[];
}
```

---

## 3. Règles de Validation Métier
1. **Cohérence Secteur / Ingrédient :** Tout ingrédient étiqueté `cosmetics` doit impérativement définir un `inciName` et un `casNumber`.
2. **Poudres de Cacao :** Doivent impérativement renseigner `fatContentPercentage` et `phRange`.
3. **Conditionnements Industriels :** Proposer au moins un packaging adapté aux expéditions maritimes conteneurisées (FCL/LCL).
