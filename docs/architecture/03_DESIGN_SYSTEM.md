# Système de Design & Charte d'Interface (DESIGN_SYSTEM)

## Plateforme Agro-Industrielle B2B : Transformation & Exportation de Cacao Pur

* **Projet :** Agro-Industrial Cocoa Processing Platform
* **Document :** 03_DESIGN_SYSTEM.md
* **Version :** 1.2.0
* **Date :** Octobre 2026

---

## 1. Principes Directeurs de Conception

L'expérience visuelle de la plateforme est fondée sur les standards d'ingénierie des leaders mondiaux de la transformation des matières premières agricoles (Barry Callebaut, Bühler Group, Olam Agri, Cargill Cocoa). 

Elle rejette catégoriquement les poncifs du web grand public et les automatismes d'interface SaaS :
* **Zéro Dégradé Fluorescent ni Teinte Violette :** Palette ancrée dans les matières premières réelles (liqueur pure de cacao, laiton d'usine, sacs de jute, papier kraft).
* **Zéro Ombres Portées Floues :** Remplacement des ombres diffuses par des séparateurs fins et nets de 1px (`#E4DDD3`) assurant une lisibilité optimale sur écran d'usine ou de bureau commercial.
* **Sobriété Typographique Forte :** Binarité stricte entre un sans-serif néo-grotesque d'entreprise et une typographie monospace de haute précision pour tous les chiffres de contrôle.
* **Proportion des Arrondis (Border Radius) :** Harmonie globale sans aspérité excessive :
  * Conteneurs principaux et modales : `rounded-[8px]` ou `rounded-xl`
  * Contrôles de formulaires et boutons : `rounded-[6px]`
  * Badges normatifs et trigrammes : `rounded-[4px]`

---

## 2. Tokens de Design & Palette Chromatique

```
[#221510] Chocolat Torréfié Profond  -->  Fond Hero, en-têtes majeurs, boutons principaux
[#1C1917] Noir d'Encre Minéral       -->  Titres de produits, textes à fort contraste
[#C29958] Laiton Doré Industriel     -->  Boutons d'action RFQ, accents interactifs
[#9C7336] Cuivre d'Atelier           -->  Trigrammes de filières, étiquettes techniques
[#2E5A36] Vert Feuille Durable       -->  Indicateurs EUDR 2023/1115, statut LIMS libéré
[#FAF7F2] Fond Écru Minéral          -->  Surfaces de travail, cadrans de données, inputs
[#F8F4EE] Kraft Raffiné              -->  En-têtes de tableaux, fonds de badges
[#E4DDD3] Ligne Séparatrice Fine     -->  Bordures strictes de 1px, diviseurs verticaux
[#78716C] Gris Pierre Neutre         -->  Libellés d'unités, métadonnées secondaires
```

### Table des Variables CSS & Utilitaires Tailwind

| Token | Code Hexadécimal | Rôle d'Interface | Exemple d'Application |
| :--- | :--- | :--- | :--- |
| `primary-dark` | `#221510` | Fond institutionnel d'autorité | Bandeau Hero, cartes de contact sombre |
| `text-dark` | `#1C1917` | Lisibilité textuelle maximale | Titres de fiches produits, valeurs clés |
| `accent-brass` | `#C29958` | Accent de conversion B2B | Bouton RFQ, liseré de surbrillance de bordure |
| `accent-copper` | `#9C7336` | Réf. machines & filières | Trigrammes d'unités `SEG · 01 / CHO` |
| `status-green` | `#2E5A36` | Conformité environnementale & QA | Puces EUDR Zéro Déforestation, statut LIMS |
| `bg-sand` | `#FAF7F2` | Fond de zone technique | Grille de spécifications 2x2, inputs de saisie |
| `bg-kraft` | `#F8F4EE` | Fond d'appui secondaire | En-tête de matrice analytique, badges actifs |
| `border-line` | `#E4DDD3` | Délimitation structurelle nette | Bordures de cartes, diviseurs verticaux |
| `text-muted` | `#78716C` | Typographie d'ingénierie | Unités de mesure, débits massiques T/h |

---

## 3. Typographie

### 3.1 Typographie Éditoriale & Institutionnelle (`Source Sans 3` / Sans-serif)
* **Utilisation :** Titres de sections, corps de texte commercial, labels de formulaires, boutons de navigation.
* **Propriétés :** Graisses `font-normal` (400), `font-semibold` (600) et `font-bold` (700). Espacement optique naturel garantissant une lecture rapide de longs cahiers des charges.

### 3.2 Typographie Métrologique & Normative (`JetBrains Mono` / `font-mono`)
* **Règle absolue :** Tout nombre, code atelier, référence de lot, norme internationale, seuil physico-chimique et débit massique **doit obligatoirement** être stylisé avec la classe `font-mono`.
* **Exemples :**
  * `15.0 T/h` (débit de nettoyage)
  * `< 0.050 ppm` (teneur en cadmium par spectrométrie ICP-MS)
  * `pH 5.2 - 6.0` (acidité de poudre naturelle)
  * `LOT-CI-2026-904A` (identifiant de traçabilité)
  * `CAS 8002-31-1` (numéro d'enregistrement substance cosmétique)

---

## 4. Politique d'Iconographie & Trigrammes Industriels

### 4.1 Éradication des Icônes Génériques Grand Public
Dans le cadre de l'alignement sur les standards Barry Callebaut, toutes les icônes purement illustratives ont été éliminées :
* Bannissement des icônes d'usines stylisées (`Factory`), d'étincelles (`Sparkles`), d'engrenages décoratifs (`Cog`), de biscuits de cookies ou de boîtes cadeaux.
* Conservation stricte des **seules icônes utilitaires à forte valeur ergonomique** : loupe de recherche (`Search`), croix de fermeture de modale (`X`), flèche de téléchargement (`Download`), imprimante officielle (`Printer`), coche d'état validé (`CheckCircle2`).

### 4.2 Trigrammes Normatifs & Monospace
Chaque entité de production est désignée par son code machine officiel :
* Ateliers de transformation : `REC-01`, `TOR-02`, `MOY-03`, `PRS-04`, `ALC-05`, `EMB-06`
* Segments de marché : `SEG · 01 / CHO` (Chocolaterie), `SEG · 02 / BIS` (Biscuiterie), `INCI / COSMOS` (Cosmétique)
* Emplacements logistiques : `LOC · FAC-01` (Usine San Pedro), `LOG · HUB-EUR` (Le Havre), `HQ · SALES` (Bureaux export)
* Protocoles analytiques : `LAB · ICP-MS`, `REG · TRACE`, `AUDIT QA · SLA 48H`

---

## 5. Spécifications des Composants UI Maîtres

### 5.1 Fiche Produit Standard (Product Card Grille 2×2)
Composant officiel : [`ProductCard.tsx`](file:///d:/Bureau/Site%20Agroalimentaire/agro-industrial-cocoa-processing/src/components/ProductCard.tsx)

```
+--------------------------------------------------------------+
| [Visuel Ingrédient / Mire Technique]      [BADGE SECTEUR]    |
|                                            (ex: AGROALIMENT.)|
+--------------------------------------------------------------+
| CATEGORIE EN PETITES CAPITALES (ex: BEURRES PURS)            |
| Titre Officiel du Produit (ex: Beurre Naturel PPP)           |
+--------------------------------------------------------------+
| [ Grille 2x2 Fond Minéral #FAF7F2 Bordé #E4DDD3 ]            |
|   Matière Grasse (MG)          |   FFA / Acidité             |
|   min. 99.5%                   |   max. 1.75%                |
|   -----------------------------+--------------------------   |
|   Point de Fusion              |   Conditionnement Export    |
|   32.0 - 35.0 °C               |   Carton export 25 kg       |
+--------------------------------------------------------------+
| Détails techniques ->                 [ + Devis RFQ ]       |
+--------------------------------------------------------------+
```

* **Interaction au Survol :** La carte entière possède un curseur pointeur avec transition douce `hover:border-[#C29958]` et légère élévation d'accentuation.
* **Indépendance d'Action :** Le clic sur `+ Devis RFQ` stoppe la propagation d'événement (`e.stopPropagation()`) pour basculer l'état du panier sans déclencher l'ouverture de la fiche détaillée.

### 5.2 Mire Technique d'Usine (`ProductImage.tsx`)
Composant officiel : [`ProductImage.tsx`](file:///d:/Bureau/Site%20Agroalimentaire/agro-industrial-cocoa-processing/src/components/common/ProductImage.tsx)

En cas de chargement ou d'absence temporaire du visuel studio, le composant ne bascule jamais sur une image placeholder générique. Il affiche une **mire d'usine de laboratoire haute précision** comprenant :
* Code SKU en `JetBrains Mono` grand format (`SKU · BUT-PPP-NAT`)
* Trame millimétrée industrielle avec réticule central
* Format de conditionnement officiel certifié
