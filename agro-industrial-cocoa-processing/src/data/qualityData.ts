import { CertificationBadge, LabAssayProtocol } from '../types';

export const QUALITY_CERTIFICATIONS: CertificationBadge[] = [
  {
    id: 'fssc-22000',
    name: 'FSSC 22000 Ver. 6.0',
    organization: 'Foundation for Food Safety Certification (GFSI Recognized)',
    scope: 'Transformation intégrale des fèves de cacao en liqueur, beurre et poudres alimentaires',
    validityYear: '2026 - 2029 (Audit continu annuel)',
    code: 'FSSC-CERT-8942-CI',
    category: 'safety',
    description: 'Norme internationale suprême de sécurité des denrées alimentaires associant les exigences ISO 22000, les programmes prérequis sectoriels (ISO/TS 22002-1) et les exigences strictes de la Global Food Safety Initiative (GFSI).',
    authorizedClaim: 'Système de management de la sécurité sanitaire des denrées alimentaires certifié selon les standards GFSI les plus stricts.'
  },
  {
    id: 'iso-9001',
    name: 'ISO 9001:2015',
    organization: 'Bureau Veritas Certification',
    scope: 'Management de la qualité industrielle, R&D formulation, traçabilité et relation client export',
    validityYear: '2025 - 2028',
    code: 'BV-FR-9001-COCOA',
    category: 'quality',
    description: 'Cadre rigoureux de gouvernance industrielle garantissant la répétabilité exacte des spécifications contractuelles, le calibrage métrologique de nos instruments et l\'amélioration continue des rendements.',
    authorizedClaim: 'Management de la qualité certifié, garantissant la constance lot par lot et la conformité aux fiches techniques (TDS).'
  },
  {
    id: 'eudr-traceability',
    name: 'Conformité EUDR 2023/1115',
    organization: 'Système Européen de Diligence Raisonnée (DDS)',
    scope: 'Traçabilité géolocalisée polygonale de 100% des parcelles d\'approvisionnement',
    validityYear: 'Permanent (Mise à jour en temps réel)',
    code: 'EUDR-COMPLIANT-2026',
    category: 'sustainability',
    description: 'Garantie formelle d\'approvisionnement zéro déforestation (aucune déforestation post-31 décembre 2020) avec enregistrement des coordonnées GPS et vérification satellitaire radar.',
    authorizedClaim: 'Ingrédients 100% issus de parcelles délimitées par polygones GPS, certifiés sans déforestation et conformes au règlement UE 2023/1115.'
  },
  {
    id: 'halal-certified',
    name: 'Certification Halal Internationale',
    organization: 'Halal Quality Control (HQC) / Conseil International',
    scope: 'Lignes industrielles de broyage, pressage et conditionnement',
    validityYear: '2026 - 2027',
    code: 'HQC-HAL-0094-EXPORT',
    category: 'religious',
    description: 'Validation de l\'absence totale d\'additifs illicites, de dérivés porcins ou d\'alcool dans l\'ensemble du flux industriel, avec audits de désinfection conformes à la jurisprudence islamique.',
    authorizedClaim: 'Lignes de fabrication auditées et certifiées conformes aux exigences rituelles Halal pour l\'exportation mondiale.'
  },
  {
    id: 'kosher-certified',
    name: 'Casher Parve & Passover',
    organization: 'Orthodox Union (OU) / Badatz International',
    scope: 'Beurres de cacao, masses de cacao et poudres de cacao pures',
    validityYear: '2026 - 2027',
    code: 'OU-PARVE-COCOA-98',
    category: 'religious',
    description: 'Audit sur site garantissant l\'absence de toute contamination croisée laitière ou carnée sur l\'intégralité des cuves, presses et conduits d\'évacuation (statut Parve strict).',
    authorizedClaim: 'Ingrédients purs certifiés Casher Parve (adaptés à la fabrication de chocolats noirs et confiseries sans composant laitier).'
  },
  {
    id: 'rainforest-alliance',
    name: 'Rainforest Alliance',
    organization: 'Rainforest Alliance Standard v1.3',
    scope: 'Coopératives agricoles partenaires de Côte d\'Ivoire et du Ghana',
    validityYear: 'Campagne 2025 / 2026',
    code: 'RA-COOP-88210',
    category: 'sustainability',
    description: 'Programme protégeant les forêts tropicales, favorisant l\'agroforesterie, interdisant le travail des enfants et assurant des primes de durabilité directes aux familles de planteurs.',
    authorizedClaim: 'Fèves issues de coopératives certifiées préservant les écosystèmes forestiers et soutenant les revenus des communautés productrices.'
  },
  {
    id: 'organic-bio',
    name: 'Agriculture Biologique (EOS UE & NOP)',
    organization: 'Ecocert France SAS',
    scope: 'Lignes dédiées de transformation de fèves de cacao biologiques',
    validityYear: '2026 - 2027',
    code: 'ECOCERT-BIO-CI-01',
    category: 'sustainability',
    description: 'Certification de filière biologique intégrée, garantissant une absence absolue de résidus d\'engrais de synthèse, fongicides chimiques ou insecticides sur l\'arbre et le fruit.',
    authorizedClaim: 'Ingrédients 100% issus de l\'agriculture biologique certifiée selon les règlements CE 848/2018 et USDA NOP.'
  },
  {
    id: 'ecocert-cosmos',
    name: 'Ecocert Cosmos Approved',
    organization: 'Cosmos-Standard AISBL',
    scope: 'Beurre de cacao cosmétique & Masse de cacao cosmétique',
    validityYear: '2026 - 2028',
    code: 'COSMOS-RAW-MAT-2026',
    category: 'quality',
    description: 'Attestation de matière première cosmétique d\'origine 100% naturelle et végétale, obtenue par procédés physiques doux respectueux des principes de la chimie verte.',
    authorizedClaim: 'Matière première 100% d\'origine naturelle certifiée Cosmos pour les formulations dermatologiques et cosmétiques propres.'
  }
];

export const LAB_ASSAY_PROTOCOLS: LabAssayProtocol[] = [
  {
    parameter: 'Teneur en Cadmium (Cd)',
    standardMethod: 'Spectrométrie d\'émission atomique ICP-MS ISO 17294-2',
    unit: 'mg/kg (ppm)',
    detectionEquipment: 'Agilent 7900 ICP-MS à quadruple filtre',
    europeanRegulationLimit: '≤ 0.100 mg/kg (beurre/masse) / ≤ 0.600 mg/kg (poudre)',
    internalFactoryThreshold: '≤ 0.045 mg/kg (Seuil de sécurité d\'usine renforcé)',
    frequency: '100% des lots entrants et sortants (libération sur certificat)',
    isoAccredited: true
  },
  {
    parameter: 'Teneur en Plomb (Pb)',
    standardMethod: 'ICP-MS ISO 17294-2 après digestion micro-ondes acide',
    unit: 'mg/kg (ppm)',
    detectionEquipment: 'Digesteur micro-ondes Anton Paar Multiwave 5000 + ICP-MS',
    europeanRegulationLimit: '≤ 0.100 mg/kg (Règl. UE 2023/915)',
    internalFactoryThreshold: '≤ 0.025 mg/kg',
    frequency: 'Chaque lot de 25 tonnes',
    isoAccredited: true
  },
  {
    parameter: 'Salmonella sp. (Sécurité Sanitaire)',
    standardMethod: 'Détection moléculaire PCR temps réel ISO 6579-1 / AFNOR BIO-12',
    unit: 'Absence / 2 x 375 g',
    detectionEquipment: 'Système PCR Bio-Rad CFX96 Deep Well',
    europeanRegulationLimit: 'Absence stricte dans 2 x 375 g',
    internalFactoryThreshold: 'Absence confirmée en double test (Tolérance zéro)',
    frequency: 'Contrôle systématique de fin de ligne avant empotage',
    isoAccredited: true
  },
  {
    parameter: 'Mycotoxines (Aflatoxines B1, B2, G1, G2 & Ochratoxine A)',
    standardMethod: 'Chromatographie liquide haute performance HPLC-FLD ISO 16050',
    unit: 'µg/kg (ppb)',
    detectionEquipment: 'Shimadzu Prominence HPLC avec détecteur de fluorescence',
    europeanRegulationLimit: 'B1 ≤ 5.0 µg/kg / Totales ≤ 10.0 µg/kg / OTA ≤ 3.0 µg/kg',
    internalFactoryThreshold: 'Aflatoxine B1 < 1.0 µg/kg / OTA < 1.5 µg/kg',
    frequency: 'Par lot de fèves à réception et produit fini',
    isoAccredited: true
  },
  {
    parameter: 'Humidité Résiduelle & Teneur en Eau',
    standardMethod: 'Titrage coulométrique Karl Fischer ISO 12937 & Étuve 103 °C',
    unit: '% w/w',
    detectionEquipment: 'Titreur coulométrique Metrohm 899 Coulometer',
    europeanRegulationLimit: '≤ 0.20% (beurre) / ≤ 5.0% (poudre)',
    internalFactoryThreshold: '≤ 0.08% (beurre désodorisé) / ≤ 4.2% (poudre)',
    frequency: 'Contrôle continu en ligne toutes les 2 heures',
    isoAccredited: true
  },
  {
    parameter: 'Finesse Particulaire & Granulométrie',
    standardMethod: 'Tamisage humide tamis Alpine 200LS sous dépression d\'air',
    unit: '% passant < 75 µm',
    detectionEquipment: 'Granulomètre laser Malvern Mastersizer 3000 & Alpine 200LS',
    europeanRegulationLimit: '≥ 99.5% passant au tamis 200 mesh',
    internalFactoryThreshold: '≥ 99.85% sous 75 µm (< 20 µm pour masse pure)',
    frequency: 'Échantillonnage horaire sur broyeurs et séparateurs',
    isoAccredited: true
  },
  {
    parameter: 'Acides Gras Libres (FFA exprimé en acide oléique)',
    standardMethod: 'Titrage acido-basique potentiométrique automatique ISO 660',
    unit: '% d\'acide oléique',
    detectionEquipment: 'Autotitreur Mettler Toledo T5 avec électrode combinée pH',
    europeanRegulationLimit: '≤ 1.75% (Codex Stan 87-1981)',
    internalFactoryThreshold: '≤ 1.15% (Beurre PPP) / ≤ 0.85% (Beurre désodorisé)',
    frequency: 'Par batch de pressage hydraulique',
    isoAccredited: true
  },
  {
    parameter: 'Point de Fusion / Glissement Polymorphique',
    standardMethod: 'Méthode du tube capillaire ouvert ISO 6321 / DSC Calorimétrie',
    unit: '°C',
    detectionEquipment: 'Calorimètre différentiel à balayage Mettler Toledo DSC 3',
    europeanRegulationLimit: '31.0 - 35.0 °C',
    internalFactoryThreshold: '33.5 - 34.8 °C (Forme stable bêta V)',
    frequency: 'Par lot de cristallisation du beurre',
    isoAccredited: true
  }
];
