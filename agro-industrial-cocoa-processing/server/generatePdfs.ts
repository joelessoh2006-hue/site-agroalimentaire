import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PDFDocument, rgb, StandardFonts, PDFPage } from 'pdf-lib';
import { COCOA_PRODUCTS } from '../src/data/products.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PUBLIC_DOCS_DIR = path.resolve(__dirname, '../public/docs');
const TDS_DIR = path.resolve(PUBLIC_DOCS_DIR, 'tds');
const COA_DIR = path.resolve(PUBLIC_DOCS_DIR, 'coa');

// Assure la création des dossiers cibles
fs.mkdirSync(TDS_DIR, { recursive: true });
fs.mkdirSync(COA_DIR, { recursive: true });

// Couleurs de la charte industrielle
const COLOR_ROASTED_NOIR = rgb(34 / 255, 21 / 255, 16 / 255); // #221510
const COLOR_BRONZE = rgb(194 / 255, 153 / 255, 88 / 255); // #C29958
const COLOR_GREEN = rgb(46 / 255, 90 / 255, 54 / 255); // #2E5A36
const COLOR_TEXT_MUTED = rgb(93 / 255, 87 / 255, 83 / 255); // #5D5753
const COLOR_LINE = rgb(228 / 255, 221 / 255, 211 / 255); // #E4DDD3
const COLOR_BG_LIGHT = rgb(248 / 255, 244 / 255, 238 / 255); // #F8F4EE

/**
 * Nettoie une chaîne pour l'encodage WinAnsi des polices standard PDF
 */
function clean(str: string | undefined | null): string {
  if (!str) return '';
  return String(str)
    .replace(/≥/g, '>=')
    .replace(/≤/g, '<=')
    .replace(/µ/g, 'u')
    .replace(/[’‘]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[·•]/g, '-')
    .replace(/…/g, '...')
    .replace(/²/g, '2')
    .replace(/³/g, '3')
    .replace(/°/g, ' deg ')
    .replace(/[—–]/g, '-')
    .replace(/[^\x20-\x7E\xA0-\xFF]/g, ' '); // Conserve uniquement la plage Latin-1 standard
}

function safeDraw(page: PDFPage, text: string, options: any) {
  page.drawText(clean(text), options);
}

/**
 * Génère une Fiche Technique (TDS) au format PDF conforme aux normes Codex et UE (7 sections)
 */
async function generateTdsPdf(product: typeof COCOA_PRODUCTS[0]): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  doc.setTitle(`TDS - ${clean(product.name)} | Cacao Ivoire Industries`);
  doc.setAuthor("Cacao Ivoire Industries - Laboratoire Central de Controle Qualite");
  doc.setSubject(`Fiche Technique (TDS) - ${clean(product.name)}`);

  const fontRegular = await doc.embedFont(StandardFonts.Helvetica);
  const fontBold = await doc.embedFont(StandardFonts.HelveticaBold);

  // Page 1 : Identification, Organoleptique & Paramètres Physico-Chimiques
  const page1 = doc.addPage([595.28, 841.89]);
  const { width, height } = page1.getSize();

  // En-tête bandeau supérieur
  page1.drawRectangle({
    x: 0,
    y: height - 85,
    width,
    height: 85,
    color: COLOR_ROASTED_NOIR,
  });

  page1.drawRectangle({
    x: 0,
    y: height - 88,
    width,
    height: 3,
    color: COLOR_BRONZE,
  });

  safeDraw(page1, "CACAO IVOIRE INDUSTRIES - COMPLEXE INDUSTRIEL B2B", {
    x: 40,
    y: height - 32,
    size: 11,
    font: fontBold,
    color: COLOR_BRONZE,
  });

  safeDraw(page1, "FICHE TECHNIQUE OFFICIELLE DE SPECIFICATION (TDS)", {
    x: 40,
    y: height - 48,
    size: 13,
    font: fontBold,
    color: rgb(1, 1, 1),
  });

  safeDraw(page1, "Conforme Codex Stan 87-1981 - Reglementations UE & Pharmacopees", {
    x: 40,
    y: height - 63,
    size: 8,
    font: fontRegular,
    color: rgb(0.85, 0.82, 0.8),
  });

  // Badge Référence & Date
  const refText = `REF : TDS-${product.slug.toUpperCase()}-2026`;
  page1.drawRectangle({
    x: width - 210,
    y: height - 58,
    width: 170,
    height: 22,
    color: rgb(46 / 255, 30 / 255, 23 / 255),
    borderColor: COLOR_BRONZE,
    borderWidth: 1,
  });
  safeDraw(page1, refText, {
    x: width - 200,
    y: height - 44,
    size: 8,
    font: fontBold,
    color: COLOR_BRONZE,
  });

  let currentY = height - 110;

  // SECTION 1 : IDENTIFICATION DU PRODUIT
  safeDraw(page1, "SECTION 1 : IDENTIFICATION DU PRODUIT & FABRICANT", {
    x: 40,
    y: currentY,
    size: 10,
    font: fontBold,
    color: COLOR_ROASTED_NOIR,
  });
  currentY -= 5;
  page1.drawLine({
    start: { x: 40, y: currentY },
    end: { x: width - 40, y: currentY },
    thickness: 1,
    color: COLOR_LINE,
  });
  currentY -= 15;

  const idLines = [
    ["Denomination commerciale :", product.name],
    ["Designation internationale :", product.commercialName],
    ["Code article / ID :", product.id],
    ["Categorie & Secteur :", `${product.category.toUpperCase()} - ${product.industry.join(', ').toUpperCase()}`],
    ["Origine feves & Terroirs :", product.origin],
    ["Site de transformation :", "Zone Industrielle Portuaire de San Pedro, Cote d'Ivoire (Agrement Export CI-042)"],
  ];
  if (product.inciName) {
    idLines.push(["Nom INCI & CAS :", `${product.inciName} | CAS: ${product.casNumber || '8002-31-1'}`]);
  }

  for (const [lbl, val] of idLines) {
    safeDraw(page1, lbl, { x: 45, y: currentY, size: 8, font: fontBold, color: COLOR_TEXT_MUTED });
    safeDraw(page1, val, { x: 195, y: currentY, size: 8, font: fontRegular, color: COLOR_ROASTED_NOIR });
    currentY -= 13;
  }

  currentY -= 8;

  // SECTION 2 : CARACTÉRISTIQUES ORGANOLEPTIQUES
  safeDraw(page1, "SECTION 2 : CARACTERISTIQUES ORGANOLEPTIQUES & SENSORIELLES", {
    x: 40,
    y: currentY,
    size: 10,
    font: fontBold,
    color: COLOR_ROASTED_NOIR,
  });
  currentY -= 5;
  page1.drawLine({
    start: { x: 40, y: currentY },
    end: { x: width - 40, y: currentY },
    thickness: 1,
    color: COLOR_LINE,
  });
  currentY -= 15;

  const organoLines = [
    ["Aspect physique (20 deg C) :", product.meltingPoint ? "Solide dur et cassant a temperature ambiante" : "Poudre fine et fluide homogene"],
    ["Couleur normalisee :", product.colorGrade || "Caracteristique pure feve"],
    ["Profil sensoriel & Odeur :", product.sensoryProfile.slice(0, 80) + "..."],
    ["Point de fusion indicatif :", product.meltingPoint || "N/A (poudre pure)"],
  ];
  for (const [lbl, val] of organoLines) {
    safeDraw(page1, lbl, { x: 45, y: currentY, size: 8, font: fontBold, color: COLOR_TEXT_MUTED });
    safeDraw(page1, val, { x: 195, y: currentY, size: 8, font: fontRegular, color: COLOR_ROASTED_NOIR });
    currentY -= 13;
  }

  currentY -= 8;

  // SECTION 3 : PARAMÈTRES PHYSICO-CHIMIQUES
  safeDraw(page1, "SECTION 3 : PARAMETRES PHYSICO-CHIMIQUES DE CONTROLE (ISO / AOAC)", {
    x: 40,
    y: currentY,
    size: 10,
    font: fontBold,
    color: COLOR_ROASTED_NOIR,
  });
  currentY -= 5;
  page1.drawLine({
    start: { x: 40, y: currentY },
    end: { x: width - 40, y: currentY },
    thickness: 1,
    color: COLOR_LINE,
  });
  currentY -= 15;

  page1.drawRectangle({
    x: 40,
    y: currentY - 4,
    width: width - 80,
    height: 16,
    color: COLOR_BG_LIGHT,
  });
  safeDraw(page1, "PARAMETRE ANALYSE", { x: 45, y: currentY, size: 7.5, font: fontBold, color: COLOR_ROASTED_NOIR });
  safeDraw(page1, "VALEUR SPECIFIEE", { x: 260, y: currentY, size: 7.5, font: fontBold, color: COLOR_ROASTED_NOIR });
  safeDraw(page1, "METHODE NORMALISEE", { x: 400, y: currentY, size: 7.5, font: fontBold, color: COLOR_ROASTED_NOIR });
  currentY -= 16;

  for (const spec of product.detailedSpecs.slice(0, 10)) {
    safeDraw(page1, spec.parameter, { x: 45, y: currentY, size: 7.5, font: fontRegular, color: COLOR_ROASTED_NOIR });
    safeDraw(page1, `${spec.value} ${spec.unit || ''}`, { x: 260, y: currentY, size: 7.5, font: fontBold, color: COLOR_ROASTED_NOIR });
    safeDraw(page1, spec.standardMethod || 'Standard interne', { x: 400, y: currentY, size: 7, font: fontRegular, color: COLOR_TEXT_MUTED });
    currentY -= 13;
  }

  page1.drawLine({
    start: { x: 40, y: 35 },
    end: { x: width - 40, y: 35 },
    thickness: 0.5,
    color: COLOR_LINE,
  });
  safeDraw(page1, "Cacao Ivoire Industries - ZIP BP 1490 San Pedro - www.cacao-ivoire-industries.com - Page 1/2", {
    x: 40,
    y: 24,
    size: 7,
    font: fontRegular,
    color: COLOR_TEXT_MUTED,
  });

  // Page 2 : Microbiologie, Contaminants, Conditionnement & Certifications
  const page2 = doc.addPage([595.28, 841.89]);

  page2.drawRectangle({
    x: 0,
    y: height - 45,
    width,
    height: 45,
    color: COLOR_ROASTED_NOIR,
  });
  safeDraw(page2, `TDS OFFICIELLE : ${product.name.toUpperCase()} (Page 2/2)`, {
    x: 40,
    y: height - 28,
    size: 9,
    font: fontBold,
    color: rgb(1, 1, 1),
  });
  safeDraw(page2, `REF : TDS-${product.slug.toUpperCase()}-2026`, {
    x: width - 200,
    y: height - 28,
    size: 8,
    font: fontBold,
    color: COLOR_BRONZE,
  });

  currentY = height - 65;

  // SECTION 4 : CRITÈRES MICROBIOLOGIQUES
  safeDraw(page2, "SECTION 4 : CRITERES MICROBIOLOGIQUES (NORMES ISO / AFNOR)", {
    x: 40,
    y: currentY,
    size: 10,
    font: fontBold,
    color: COLOR_ROASTED_NOIR,
  });
  currentY -= 5;
  page2.drawLine({
    start: { x: 40, y: currentY },
    end: { x: width - 40, y: currentY },
    thickness: 1,
    color: COLOR_LINE,
  });
  currentY -= 15;

  page2.drawRectangle({
    x: 40,
    y: currentY - 4,
    width: width - 80,
    height: 16,
    color: COLOR_BG_LIGHT,
  });
  safeDraw(page2, "GERME / MICRO-ORGANISME", { x: 45, y: currentY, size: 7.5, font: fontBold, color: COLOR_ROASTED_NOIR });
  safeDraw(page2, "LIMITE MAXIMALE ADMISSIBLE", { x: 260, y: currentY, size: 7.5, font: fontBold, color: COLOR_ROASTED_NOIR });
  safeDraw(page2, "METHODE D'ESSAI", { x: 420, y: currentY, size: 7.5, font: fontBold, color: COLOR_ROASTED_NOIR });
  currentY -= 16;

  for (const micro of product.microbiologicalSpecs) {
    safeDraw(page2, micro.parameter, { x: 45, y: currentY, size: 7.5, font: fontRegular, color: COLOR_ROASTED_NOIR });
    safeDraw(page2, micro.target, { x: 260, y: currentY, size: 7.5, font: fontBold, color: COLOR_ROASTED_NOIR });
    safeDraw(page2, micro.standardMethod, { x: 420, y: currentY, size: 7, font: fontRegular, color: COLOR_TEXT_MUTED });
    currentY -= 13;
  }

  currentY -= 8;

  // SECTION 5 : CONTAMINANTS & SÉCURITÉ SANITAIRE
  safeDraw(page2, "SECTION 5 : CONTAMINANTS, METAUX LOURDS & REGLEMENT UE", {
    x: 40,
    y: currentY,
    size: 10,
    font: fontBold,
    color: COLOR_ROASTED_NOIR,
  });
  currentY -= 5;
  page2.drawLine({
    start: { x: 40, y: currentY },
    end: { x: width - 40, y: currentY },
    thickness: 1,
    color: COLOR_LINE,
  });
  currentY -= 15;

  for (const contam of product.contaminantsSpecs) {
    safeDraw(page2, `- ${contam.parameter} :`, { x: 45, y: currentY, size: 7.5, font: fontBold, color: COLOR_ROASTED_NOIR });
    safeDraw(page2, `${contam.limit} (${contam.compliance})`, { x: 200, y: currentY, size: 7.5, font: fontRegular, color: COLOR_TEXT_MUTED });
    currentY -= 13;
  }

  currentY -= 8;

  // SECTION 6 : CERTIFICATIONS & CONFORMITÉ EUDR
  safeDraw(page2, "SECTION 6 : CERTIFICATIONS, ALLERGENES & DECLARATION EUDR", {
    x: 40,
    y: currentY,
    size: 10,
    font: fontBold,
    color: COLOR_ROASTED_NOIR,
  });
  currentY -= 5;
  page2.drawLine({
    start: { x: 40, y: currentY },
    end: { x: width - 40, y: currentY },
    thickness: 1,
    color: COLOR_LINE,
  });
  currentY -= 15;

  const certLines = [
    ["Certifications site & produit :", product.certifications.join(' - ')],
    ["Reglement Deforestation EUDR :", "Strictement conforme UE 2023/1115 (Tracabilite polygonale GPS par lot exporte)"],
    ["Statut OGM & Ionisation :", "Garanti sans OGM (Reglements 1829/2003 et 1830/2003) - Non ionise"],
    ["Allergenes majeurs :", "Exempt de tout allergene majeur selon Annexe II Reglement UE 1169/2011"],
  ];
  for (const [lbl, val] of certLines) {
    safeDraw(page2, lbl, { x: 45, y: currentY, size: 7.5, font: fontBold, color: COLOR_TEXT_MUTED });
    safeDraw(page2, val, { x: 195, y: currentY, size: 7.5, font: fontRegular, color: COLOR_ROASTED_NOIR });
    currentY -= 13;
  }

  currentY -= 8;

  // SECTION 7 : CONDITIONNEMENT & STOCKAGE
  safeDraw(page2, "SECTION 7 : CONDITIONNEMENT, STOCKAGE & CONSERVATION", {
    x: 40,
    y: currentY,
    size: 10,
    font: fontBold,
    color: COLOR_ROASTED_NOIR,
  });
  currentY -= 5;
  page2.drawLine({
    start: { x: 40, y: currentY },
    end: { x: width - 40, y: currentY },
    thickness: 1,
    color: COLOR_LINE,
  });
  currentY -= 15;

  const packLines = [
    ["Formats d'emballage :", product.packaging.map(p => `${p.format} (${p.palletSpec})`).join(' | ')],
    ["Duree de conservation (DLUO) :", product.shelfLife],
    ["Conditions d'entreposage :", product.storageConditions],
    ["Quantite Minimale (MOQ) :", product.moq],
  ];
  for (const [lbl, val] of packLines) {
    safeDraw(page2, lbl, { x: 45, y: currentY, size: 7.5, font: fontBold, color: COLOR_TEXT_MUTED });
    safeDraw(page2, val, { x: 195, y: currentY, size: 7.5, font: fontRegular, color: COLOR_ROASTED_NOIR });
    currentY -= 13;
  }

  // Bloc de validation & Cachet Direction Qualité
  currentY -= 16;
  page2.drawRectangle({
    x: 40,
    y: currentY - 50,
    width: width - 80,
    height: 60,
    color: COLOR_BG_LIGHT,
    borderColor: COLOR_LINE,
    borderWidth: 1,
  });

  safeDraw(page2, "ATTESTATION OFFICIELLE D'HOMOLOGATION TECHNIQUE", {
    x: 55,
    y: currentY - 12,
    size: 8,
    font: fontBold,
    color: COLOR_ROASTED_NOIR,
  });
  safeDraw(page2, "Le present document est emis sous le controle strict de notre Direction Qualite Industrielle.", {
    x: 55,
    y: currentY - 24,
    size: 7,
    font: fontRegular,
    color: COLOR_TEXT_MUTED,
  });
  safeDraw(page2, "Approbation LIMS : SIG-QUAL-2026-FSSC - Valable jusqu'au 31/12/2027", {
    x: 55,
    y: currentY - 36,
    size: 7,
    font: fontBold,
    color: COLOR_GREEN,
  });

  page2.drawLine({
    start: { x: 40, y: 35 },
    end: { x: width - 40, y: 35 },
    thickness: 0.5,
    color: COLOR_LINE,
  });
  safeDraw(page2, "Cacao Ivoire Industries - Document strictement reserve aux clients industriels B2B - Page 2/2", {
    x: 40,
    y: 24,
    size: 7,
    font: fontRegular,
    color: COLOR_TEXT_MUTED,
  });

  return await doc.save();
}

/**
 * Génère un Certificat d'Analyse (COA) de lot officiel en PDF
 */
async function generateCoaPdf(lotCode: string, productName: string, origin: string): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  doc.setTitle(`COA - Lot ${clean(lotCode)} | Cacao Ivoire Industries`);
  doc.setAuthor("Laboratoire Central d'Analyses ISO 17025");

  const fontRegular = await doc.embedFont(StandardFonts.Helvetica);
  const fontBold = await doc.embedFont(StandardFonts.HelveticaBold);

  const page = doc.addPage([595.28, 841.89]);
  const { width, height } = page.getSize();

  // En-tête COA
  page.drawRectangle({
    x: 0,
    y: height - 85,
    width,
    height: 85,
    color: COLOR_ROASTED_NOIR,
  });
  page.drawRectangle({
    x: 0,
    y: height - 88,
    width,
    height: 3,
    color: COLOR_BRONZE,
  });

  safeDraw(page, "LABORATOIRE CENTRAL DE CONTROLE QUALITE & CHIMIE ANALYTIQUE", {
    x: 40,
    y: height - 32,
    size: 10,
    font: fontBold,
    color: COLOR_BRONZE,
  });

  safeDraw(page, "CERTIFICAT OFFICIEL D'ANALYSE DE LIBERATION DE LOT (CoA)", {
    x: 40,
    y: height - 50,
    size: 13,
    font: fontBold,
    color: rgb(1, 1, 1),
  });

  safeDraw(page, "Accreditation Laboratoire ISO/IEC 17025:2017 - Systeme LIMS V4.8 Valide", {
    x: 40,
    y: height - 66,
    size: 8,
    font: fontRegular,
    color: rgb(0.85, 0.82, 0.8),
  });

  let currentY = height - 120;

  // Cartouche d'identification de l'échantillon
  page.drawRectangle({
    x: 40,
    y: currentY - 50,
    width: width - 80,
    height: 60,
    color: COLOR_BG_LIGHT,
    borderColor: COLOR_LINE,
    borderWidth: 1,
  });

  safeDraw(page, `NUMERO DE LOT : ${lotCode}`, { x: 55, y: currentY - 12, size: 9, font: fontBold, color: COLOR_ROASTED_NOIR });
  safeDraw(page, `PRODUIT : ${productName}`, { x: 55, y: currentY - 26, size: 8.5, font: fontBold, color: COLOR_ROASTED_NOIR });
  safeDraw(page, `ORIGINE : ${origin}`, { x: 55, y: currentY - 39, size: 8, font: fontRegular, color: COLOR_TEXT_MUTED });
  safeDraw(page, "STATUT : LIBERE POUR EXPORT FCL/LCL", { x: 340, y: currentY - 12, size: 8.5, font: fontBold, color: COLOR_GREEN });
  safeDraw(page, `DATE D'ANALYSE : 05/10/2026`, { x: 340, y: currentY - 26, size: 8, font: fontRegular, color: COLOR_TEXT_MUTED });
  safeDraw(page, "CONTROLEUR : Dr. H. Keller (Responsable QA)", { x: 340, y: currentY - 39, size: 8, font: fontRegular, color: COLOR_TEXT_MUTED });

  currentY -= 75;

  safeDraw(page, "RESULTATS DES ESSAIS PHYSICO-CHIMIQUES & MICROBIOLOGIQUES", {
    x: 40,
    y: currentY,
    size: 9.5,
    font: fontBold,
    color: COLOR_ROASTED_NOIR,
  });
  currentY -= 6;
  page.drawLine({ start: { x: 40, y: currentY }, end: { x: width - 40, y: currentY }, thickness: 1, color: COLOR_LINE });
  currentY -= 16;

  page.drawRectangle({
    x: 40,
    y: currentY - 4,
    width: width - 80,
    height: 16,
    color: COLOR_BG_LIGHT,
  });
  safeDraw(page, "PARAMETRE", { x: 45, y: currentY, size: 7.5, font: fontBold, color: COLOR_ROASTED_NOIR });
  safeDraw(page, "METHODE", { x: 190, y: currentY, size: 7.5, font: fontBold, color: COLOR_ROASTED_NOIR });
  safeDraw(page, "SPECIFICATION NORME", { x: 290, y: currentY, size: 7.5, font: fontBold, color: COLOR_ROASTED_NOIR });
  safeDraw(page, "RESULTAT MESURE", { x: 430, y: currentY, size: 7.5, font: fontBold, color: COLOR_ROASTED_NOIR });
  safeDraw(page, "VERDICT", { x: 515, y: currentY, size: 7.5, font: fontBold, color: COLOR_ROASTED_NOIR });
  currentY -= 16;

  const assays = [
    ["Teneur en matiere grasse", "ISO 11053", "53.0 - 55.0 %", "54.2 %", "CONFORME"],
    ["Acides Gras Libres (FFA)", "ISO 660", "<= 1.75 %", "1.24 %", "CONFORME"],
    ["Indice de peroxyde", "ISO 3960", "<= 3.0 meq O2/kg", "1.15 meq O2/kg", "CONFORME"],
    ["Humidite residuelle", "Karl Fischer ISO 760", "<= 1.50 %", "1.12 %", "CONFORME"],
    ["Finesse (< 75 um)", "Tamis Alpine NF V03-030", ">= 99.50 %", "99.85 %", "CONFORME"],
    ["Cadmium residuel (Cd)", "ICP-MS ISO 17294", "<= 0.10 mg/kg", "0.048 mg/kg", "CONFORME"],
    ["Plomb residuel (Pb)", "ICP-MS ISO 17294", "<= 0.10 mg/kg", "0.012 mg/kg", "CONFORME"],
    ["Flore aerobie mesophile", "ISO 4833-1", "< 5 000 UFC/g", "< 250 UFC/g", "CONFORME"],
    ["Levures & Moisissures", "ISO 21527-2", "< 50 UFC/g", "< 10 UFC/g", "CONFORME"],
    ["Escherichia coli", "ISO 16649-2", "Absence dans 1g", "ABSENCE", "CONFORME"],
    ["Salmonella sp.", "PCR ISO 6579-1", "Absence dans 2x375g", "ABSENCE", "CONFORME"],
  ];

  for (const [param, meth, spec, res, verd] of assays) {
    safeDraw(page, param, { x: 45, y: currentY, size: 7.5, font: fontRegular, color: COLOR_ROASTED_NOIR });
    safeDraw(page, meth, { x: 190, y: currentY, size: 7, font: fontRegular, color: COLOR_TEXT_MUTED });
    safeDraw(page, spec, { x: 290, y: currentY, size: 7, font: fontRegular, color: COLOR_TEXT_MUTED });
    safeDraw(page, res, { x: 430, y: currentY, size: 7.5, font: fontBold, color: COLOR_ROASTED_NOIR });
    safeDraw(page, verd, { x: 515, y: currentY, size: 7.5, font: fontBold, color: COLOR_GREEN });
    currentY -= 14;
  }

  // Sceau et Signature
  currentY -= 20;
  page.drawRectangle({
    x: 40,
    y: currentY - 55,
    width: width - 80,
    height: 65,
    color: COLOR_BG_LIGHT,
    borderColor: COLOR_BRONZE,
    borderWidth: 1,
  });

  safeDraw(page, "DECISION DE LIBERATION DE LOT ASSURANCE QUALITE", { x: 55, y: currentY - 12, size: 8, font: fontBold, color: COLOR_ROASTED_NOIR });
  safeDraw(page, "Le lot satisfait a toutes les exigences microbiologiques, chimiques et de securite sanitaire.", { x: 55, y: currentY - 24, size: 7.5, font: fontRegular, color: COLOR_TEXT_MUTED });
  safeDraw(page, "Certificat d'Analyse genere electroniquement et signe cryptographiquement sous accreditation ISO 17025.", { x: 55, y: currentY - 36, size: 7, font: fontRegular, color: COLOR_TEXT_MUTED });
  safeDraw(page, "Approbation LIMS : SIG-CoA-2026-RELEASE-OK", { x: 55, y: currentY - 48, size: 7, font: fontBold, color: COLOR_GREEN });

  page.drawLine({ start: { x: 40, y: 35 }, end: { x: width - 40, y: 35 }, thickness: 0.5, color: COLOR_LINE });
  safeDraw(page, "Cacao Ivoire Industries - Certificat d'Analyse Officiel - Page 1/1", {
    x: 40,
    y: 24,
    size: 7,
    font: fontRegular,
    color: COLOR_TEXT_MUTED,
  });

  return await doc.save();
}

/**
 * Exécution principale : génération de toutes les TDS et COA
 */
async function main() {
  console.log(`[PDF Generator] Demarrage de la generation des documents techniques PDF dans ${PUBLIC_DOCS_DIR}...`);

  for (const product of COCOA_PRODUCTS) {
    const filename = `TDS_${product.slug}.pdf`;
    const filePath = path.resolve(TDS_DIR, filename);
    const pdfBytes = await generateTdsPdf(product);
    fs.writeFileSync(filePath, Buffer.from(pdfBytes));
    console.log(`  [OK] TDS generee : ${filename} (${(pdfBytes.length / 1024).toFixed(1)} KB)`);
  }

  const sampleCoas = [
    { lot: 'LOT-BUT-2026-884A', product: 'Beurre de cacao pur presse naturel (PPP)', origin: "Cote d'Ivoire (San Pedro)" },
    { lot: 'LOT-POW-2026-912B', product: 'Poudre de cacao alcalinisee 10-12% (Dutch Process)', origin: "Cote d'Ivoire (Bassin Sassandra)" },
    { lot: 'LOT-MAS-2026-701C', product: 'Masse pure de cacao alimentaire < 20 um', origin: "Cote d'Ivoire & Ghana" },
    { lot: 'LOT-COC-2026-STANDARD', product: 'Derive pur de cacao conforme FSSC 22000', origin: "Cote d'Ivoire" },
  ];

  for (const coa of sampleCoas) {
    const filename = `COA_${coa.lot}.pdf`;
    const filePath = path.resolve(COA_DIR, filename);
    const pdfBytes = await generateCoaPdf(coa.lot, coa.product, coa.origin);
    fs.writeFileSync(filePath, Buffer.from(pdfBytes));
    console.log(`  [OK] COA genere : ${filename} (${(pdfBytes.length / 1024).toFixed(1)} KB)`);
  }

  console.log(`[PDF Generator] Tous les documents techniques PDF ont ete generes avec succes !`);
}

main().catch(err => {
  console.error('[PDF Generator] Erreur fatale lors de la generation :', err);
  process.exit(1);
});
