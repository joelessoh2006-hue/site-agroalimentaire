---
name: tds-spec-sheet-generator
description: Procédure de normalisation, de génération et de distribution sécurisée des Fiches Techniques (Technical Data Sheet - TDS), Certificats d'Analyse (COA) et Fiches de Sécurité (MSDS) pour ingrédients dérivés du cacao. À utiliser pour structurer les documents téléchargeables et les modales de lead capture technique.
---

# Technical Data Sheet (TDS) & Documentation Standards

Ce skill définit la structure réglementaire et le protocole de diffusion des fiches techniques (TDS), certificats d'analyse (COA) et fiches de données de sécurité (MSDS/FDS) pour les dérivés industriels du cacao.

---

## 1. Structure Réglementaire d'une Fiche Technique Cacao (TDS)

Une TDS professionnelle doit impérativement comporter 7 sections normalisées :

```
+-------------------------------------------------------------------------------+
| SECTION 1 : IDENTIFICATION DU PRODUIT & CONTACT FABRICANT                     |
| - Nom commercial complet, grade industriel, code article interne             |
| - Dénomination légale selon Codex Stan 87-1981 / Règlement UE                |
| - Nom INCI (pour cosmétique) & CAS / EINECS number                            |
| - Coordonnées complètes du site de transformation industrielle                |
+-------------------------------------------------------------------------------+
| SECTION 2 : CARACTÉRISTIQUES ORGANOLEPTIQUES                                 |
| - Aspect physique à 20°C (solide, poudre libre micronisée, liquide fondu)     |
| - Couleur (nuancier Lovibond / HunterLab ou description normalisée)           |
| - Odeur & Saveur (franc cacao, note grillée, arôme neutre désodorisé)         |
+-------------------------------------------------------------------------------+
| SECTION 3 : PARAMÈTRES PHYSICO-CHIMIQUES & CRITÈRES QUALITÉ                   |
| - Teneur en matière grasse (%)                                                |
| - Acides Gras Libres - FFA (%) exprimé en acide oléique                       |
| - Indice de peroxyde (meq O2/kg)                                              |
| - Point de fusion / point de glissement (°C)                                  |
| - Humidité résiduelle (%)                                                     |
| - pH (solution aqueuse à 10%)                                                 |
| - Granulométrie / Finesse au tamis 200 mesh (75 microns)                      |
| - Teneur en cendres totales et cendres insolubles                             |
+-------------------------------------------------------------------------------+
| SECTION 4 : CRITÈRES MICROBIOLOGIQUES (Normes ISO / AFNOR)                    |
| - Flore aérobie mésophile totale : < 5 000 UFC/g (poudres) / < 1 000 (beurre) |
| - Levures et moisissures : < 50 UFC/g                                         |
| - Entérobactéries : < 10 UFC/g                                                |
| - Escherichia coli : Absence dans 1 g                                         |
| - Salmonella : Absence stricte dans 2 x 375 g                                 |
+-------------------------------------------------------------------------------+
| SECTION 5 : CONTAMINANTS & SÉCURITÉ SANITAIRE                                 |
| - Métaux lourds : Plomb (Pb), Cadmium (Cd selon règlement UE 488/2014),       |
|   Arsenic (As), Mercure (Hg)                                                  |
| - Mycotoxines : Aflatoxines B1, B2, G1, G2, Ochratoxine A                     |
| - Pesticides : Conformes aux Limites Maximales de Résidus (LMR) UE            |
| - Statut OGM : Non OGM (conformément règlements CE 1829/2003 et 1830/2003)   |
| - Statut Ionisation : Produit non ionisé et non irradié                       |
+-------------------------------------------------------------------------------+
| SECTION 6 : ALLERGÈNES & CERTIFICATIONS                                       |
| - Déclaration allergènes (Règlement UE 1169/2011) : Sans allergènes majeurs   |
| - Certifications : FSSC 22000, ISO 9001, Halal, Kosher, Ecocert Cosmos        |
+-------------------------------------------------------------------------------+
| SECTION 7 : CONDITIONNEMENT, STOCKAGE & DURABILITÉ                            |
| - Conditionnements standards (Cartons 25kg poche PE, fûts 200L, vrac)         |
| - Conditions recommandées : Température 15 - 20°C, Humidité relative < 60%    |
| - Durée de vie (DLUO / Shelf Life) : 24 mois à compter de la date de fabrication|
+-------------------------------------------------------------------------------+
```

---

## 2. Protocole de Distribution Sécurisée (Lead-Gated TDS)

Pour valoriser les documents techniques tout en enrichissant le pipeline commercial :
1. **Accès Immédiat avec Capture Légère :**
   - L'utilisateur clique sur *"Télécharger la Fiche Technique (TDS)"*.
   - Une modale épurée s'ouvre : saisie de l'e-mail professionnel et du nom de l'entreprise.
   - Dès validation, le téléchargement direct du PDF se déclenche côté client (`window.open(downloadUrl)`) ET une copie est envoyée sur l'adresse e-mail renseignée.
2. **En-têtes HTTP de Distribution :**
   ```http
   Content-Type: application/pdf
   Content-Disposition: attachment; filename="TDS-Beurre-Cacao-Desodorise-Blanc-Ref2026.pdf"
   Cache-Control: public, max-age=86400, s-maxage=604800
   X-Content-Type-Options: nosniff
   ```
3. **Traçabilité Interne :**
   - Émission d'un événement analytics : `lead_download_tds` avec le nom du produit et l'adresse e-mail.
