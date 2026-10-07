# Skill : B2B Faceted Catalog Engine (Architecture & Filtrage Réactif)

Ce skill décrit l'implémentation technique d'un catalogue B2B haute performance permettant aux acheteurs et formulateurs d'isoler instantanément l'ingrédient répondant à leur cahier des charges.

---

## 1. Principes Clés

1. **Filtrage Instantané Côté Client :** En moins de 15ms en mémoire avec JavaScript léger.
2. **Synchronisation URL Bidirectionnelle :** Utilisation des query params (`?industry=cosmetics&category=butter`) pour partage direct par les commerciaux.
3. **Zéro Cumulative Layout Shift (CLS = 0) :** Structure CSS Grid stable et animations fluides accélérées matériellement.
4. **Accessibilité ARIA :** `<aside role="search">`, `<fieldset>`, `<legend>`, et zone `<div aria-live="polite">` pour l'annonce du nombre de résultats.
