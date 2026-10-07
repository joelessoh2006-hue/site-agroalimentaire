---
name: b2b-faceted-catalog-engine
description: Architecture et implémentation du moteur de filtrage à facettes pour catalogue B2B d'ingrédients industriels. Couvre le tri combinatoire, la synchronisation réactive de l'état dans l'URL, l'accessibilité ARIA et la performance sans rechargement de page.
---

# B2B Faceted Catalog Engine (Architecture & Filtrage Réactif)

Ce skill décrit l'implémentation technique d'un catalogue B2B haute performance permettant aux acheteurs et formulateurs d'isoler instantanément l'ingrédient répondant à leur cahier des charges.

---

## 1. Principes d'Ingénierie Clés

1. **Zéro Rechargement de Page (Client-Side Reactive Filter) :**
   - Le catalogue charge initialement l'index des produits (format JSON compact statique pré-compilé).
   - Le filtrage s'exécute en mémoire côté client en moins de **15ms**.
2. **Synchronisation Bidirectionnelle avec l'URL (Deep Linking Commercial) :**
   - Tout changement d'état de filtre met à jour les paramètres de requête de l'URL via `history.pushState` ou `URLSearchParams` sans rafraîchissement complet.
   - *Exemple :* `/catalogue?industry=cosmetics&category=butter&cert=organic`
   - Permet aux commerciaux de partager des sélections de produits pré-filtrées directement par e-mail ou WhatsApp Business.
3. **Zéro Cumulative Layout Shift (CLS = 0) :**
   - La grille conserve sa structure grâce à CSS Grid ou Flexbox avec des placeholders de hauteur fixe. Les transitions d'apparition et de disparition s'exécutent avec `opacity` et `transform` accélérées par le GPU.

---

## 2. Structure des Facettes & Algorithme de Filtrage

```typescript
export interface CatalogFilters {
  industry: 'all' | 'food' | 'cosmetics';
  category: 'all' | 'butter' | 'powder' | 'mass_derivative';
  certifications: string[]; // ['organic', 'halal', 'kosher', 'fairtrade']
  searchQuery: string;
}

export function filterCatalogProducts(
  products: CocoaProduct[],
  filters: CatalogFilters
): CocoaProduct[] {
  return products.filter((product) => {
    // 1. Filtre Industrie / Secteur
    if (filters.industry !== 'all' && !product.sectors.includes(filters.industry)) {
      return false;
    }

    // 2. Filtre Catégorie d'ingrédient
    if (filters.category !== 'all' && product.category !== filters.category) {
      return false;
    }

    // 3. Filtre Certifications (intersection inclusive)
    if (filters.certifications.length > 0) {
      const hasAllCerts = filters.certifications.every((cert) =>
        product.certifications.map((c) => c.toLowerCase()).includes(cert.toLowerCase())
      );
      if (!hasAllCerts) return false;
    }

    // 4. Recherche textuelle (Titre, INCI, Caractéristiques)
    if (filters.searchQuery.trim() !== '') {
      const q = filters.searchQuery.toLowerCase();
      const matchTitle =
        product.title.fr.toLowerCase().includes(q) ||
        product.title.en.toLowerCase().includes(q);
      const matchInci = product.inciName?.toLowerCase().includes(q) ?? false;
      const matchDesc =
        product.description?.fr?.toLowerCase().includes(q) ||
        product.description?.en?.toLowerCase().includes(q) ?? false;

      if (!matchTitle && !matchInci && !matchDesc) return false;
    }

    return true;
  });
}
```

---

## 3. Accessibilité & Standards ARIA

- **Conteneur des filtres :** `<aside role="search" aria-label="Filtres du catalogue de produits">`
- **Groupes de filtres :** Balises sémantiques `<fieldset>` avec `<legend>` explicites (ex: `<legend>Secteur d'application</legend>`).
- **Compteur de résultats en direct :** `<div aria-live="polite" aria-atomic="true" class="results-count">8 produits trouvés</div>`
- **État vide (No results fallback) :** Si aucun produit ne correspond, afficher un message d'aide avec un bouton *"Réinitialiser les filtres"* et un lien direct vers *"Demander une formulation sur-mesure à nos ingénieurs R&D"*.

---

## 4. Carte Produit Optimisée (Card Anatomy)

Chaque carte de la grille doit comporter de manière compacte et lisible :
1. **Badges d'en-tête :** Secteur (`Agroalimentaire` vert / `Cosmétique` violet) + Badge de certification principal (`Bio` ou `FSSC 22000`).
2. **Visuel produit haute définition :** Image avec ratio `4:3` et `loading="lazy"`.
3. **Titre et Grade :** Nom commercial en gras (ex: *Beurre de Cacao Désodorisé Blanc*).
4. **Attributs techniques clés :**
   - Point de fusion / Taux de matière grasse (ex: `MG: 10-12% | pH: 7.2`).
   - MOQ minimum (ex: `1 Palette / 1 000 kg`).
5. **Actions rapides :**
   - Bouton de consultation détaillée : *Découvrir la fiche*.
   - Déclencheur modal rapide : *Demander un échantillon*.
