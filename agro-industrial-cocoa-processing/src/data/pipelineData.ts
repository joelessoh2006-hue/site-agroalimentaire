import { PipelineStep, ProcessingBatch } from '../types';

export const INDUSTRIAL_PIPELINE_6_STEPS: PipelineStep[] = [
  {
    stepNumber: '01',
    title: 'Sourcing, Réception & Nettoyage Densimétrique',
    english: 'Bean Reception, Destoning & Air Classification',
    description: 'Contrôle à quai de l\'hygrométrie des sacs en toile de jute (taux cible < 7.5%). Séparation densimétrique par table gravimétrique, épierrage à cyclone et passage sous barreau magnétique néodyme haute puissance pour éliminer tout corps étranger avant stockage en silos tempérés.',
    temperature: '20 - 24 °C',
    capacityPerHour: '15.0 T/h',
    checkpoint: 'Taux d\'impuretés < 0.05% · Calibre > 95 fèves / 100g',
    criticalParameters: [
      'Mesure humidité diélectrique par sonde capacitive',
      'Élimination des fèves plates, brisées et moisies',
      'Scan QR code de traçabilité coopérative EUDR à quai'
    ],
    eudrRelevance: 'Vérification de la validité du polygone GPS de la parcelle associée au camion entrant.'
  },
  {
    stepNumber: '02',
    title: 'Décoquillage & Torréfaction Continue Convective',
    english: 'Winnowing & Continuous Convective Roasting',
    description: 'Craquage délicat des fèves sous rouleaux cannelés pour libérer les éclats (nibs) sans concassage excessif. Séparation aéraulique précise des coques résiduelles (< 1.5% de coque résiduelle). Torréfaction en tambour rotatif à air chaud indirect modulé, développant les précurseurs d\'arômes sans pyrolyse thermique.',
    temperature: '118 - 138 °C (gradient progressif)',
    capacityPerHour: '10.5 T/h',
    checkpoint: 'Humidité résiduelle < 1.4% · Taux de coques résiduelles < 1.25%',
    criticalParameters: [
      'Contrôle automatique du temps de séjour et température à cœur',
      'Élimination de l\'astringence et préservation des flavanols nobles',
      'Destruction thermique certifiée des micro-organismes végétatifs'
    ],
    eudrRelevance: 'Enregistrement de la référence de lot thermique continu dans le LIMS d\'usine.'
  },
  {
    stepNumber: '03',
    title: 'Broyage Fin & Affinage de la Masse de Cacao',
    english: 'Fine Milling & Ball Mill Liquor Refining',
    description: 'Prébroyage des éclats par broyeur à marteaux percutants pour liquéfier le beurre de cacao contenu dans les cellules végétales. Affinage secondaire au broyeur à billes en céramique d\'alumine d\'ultra-haute dureté pour microniser les particules solides de cacao sous le seuil sensoriel de détection (< 20 microns).',
    temperature: '65 - 80 °C',
    capacityPerHour: '8.0 T/h',
    checkpoint: 'Finesse < 20 µm (Alpine 200LS) · Viscosité Casson 1.2 - 2.5 Pa·s',
    criticalParameters: [
      'Désactivation enzymatique et rupture complète des vacuoles de graisse',
      'Contrôle micrométrique continu par granulométrie laser',
      'Filtration de sécurité sur tamis vibrant inox 150 microns'
    ],
    eudrRelevance: 'Ségrégation stricte des lots conventionnels et des lots 100% bio / déforestation-zéro.'
  },
  {
    stepNumber: '04',
    title: 'Pressage Hydraulique Haute Pression (450 Bar)',
    english: 'High-Pressure Hydraulic Cake & Butter Separation',
    description: 'Distribution de la masse chaude dans les pots de presses horizontales hydrauliques géantes. Compression progressive jusqu\'à 450 bars pour extraire le beurre de cacao limpide. Séparation de la phase liquide (beurre de cacao pur) et de la phase solide compacte (disques de tourteaux « Troutrou »).',
    temperature: '95 - 105 °C',
    capacityPerHour: '6.5 T/h',
    checkpoint: 'MG résiduelle du tourteau calibrée à 10-12% ou 20-22% ± 0.5%',
    criticalParameters: [
      'Pression de travail stabilisée à 450 bar par servovalves numériques',
      'Double filtration du beurre brut sur papier cellulose stérile',
      'Refroidissement ou maintien en cuves inox 316L sous azote'
    ],
    eudrRelevance: 'Isolation des flux pour garantir le bilan matière (Mass Balance vs Segregated).'
  },
  {
    stepNumber: '05',
    title: 'Alcalinisation Dutch & Micronisation Poudre',
    english: 'Dutch Alkalization & Alpine Micronized Milling',
    description: 'Pour les poudres alcalinisées, immersion des tourteaux dans une solution aqueuse de régulateurs de pH alimentaires (carbonate de potassium K₂CO₃) sous pression de vapeur contrôlée pour intensifier la couleur et neutraliser l\'acidité. Après séchage, le tourteau est pulvérisé dans des broyeurs cryogéniques sous jet d\'air classificateur Alpine.',
    temperature: 'Variable (25 °C à 90 °C selon profil)',
    capacityPerHour: '5.5 T/h',
    checkpoint: 'Granulométrie 99.8% < 75 µm · pH ajusté (5.5 à 8.4 selon recette)',
    criticalParameters: [
      'Stabilité colorimétrique mesurée au spectrophotomètre CIELAB',
      'Dispersion et mouillabilité instantanées en phase liquide',
      'Refroidissement immédiat sous flux d\'air sec pour éviter le mottage'
    ],
    eudrRelevance: 'Traçabilité complète des additifs et audits HACCP.'
  },
  {
    stepNumber: '06',
    title: 'Conditionnement Aseptique & Expédition Maritime',
    english: 'Aseptic Industrial Packaging & Maritime Containerization',
    description: 'Conditionnement automatisé en salle blanche sous filtration HEPA. Ensachage des poudres en sacs kraft hermétiques avec soudure étanche, moulage du beurre et de la masse en cartons de 25 kg avec liner polyéthylène vierge ou fûts thermolaqués. Palettisation robotisée avec houssage étirable complet et scellé de sécurité numéroté pour expédition FCL.',
    temperature: '16 - 19 °C (atmosphère contrôlée)',
    capacityPerHour: '12.0 T/h',
    checkpoint: 'Détection métaux X-Ray 100% · Étanchéité thermique certifiée',
    criticalParameters: [
      'Contrôle automatique du poids net par pesage dynamique',
      'Traçabilité RFID et étiquetage GS1-128 avec numéro de lot et QR code',
      'Validation de propreté et empotage des conteneurs maritimes 20ft/40ft'
    ],
    eudrRelevance: 'Émission de la Déclaration de Diligence Raisonnée (DDS) avec identifiants douaniers UE.'
  }
];

export const PROCESSING_BATCHES_DATA: ProcessingBatch[] = [
  {
    lotCode: 'LOT-GH-2026-884A',
    originCountry: 'Ghana',
    cooperative: 'Kuapa Kokoo Farmers Union (Certifié Fairtrade & Bio)',
    region: 'Suhum District, Eastern Forest Belt',
    cropSeason: 'Main Crop 2025/2026',
    arrivalDate: '14 Janvier 2026',
    releaseDate: '02 Mars 2026',
    status: 'VALIDÉ EXPORT',
    moisturePercent: 6.8,
    fermentationScore: 89.4,
    cadmiumPpm: 0.048,
    leadPpm: 0.021,
    sensoryNotes: ['Chocolat noir profond', 'Fruits rouges séchés', 'Notes grillées maltées'],
    beanCountPer100g: 94,
    fsscSeal: 'FSSC-QC-884-GH-PASSED',
    allocatedDerivative: 'Masse Pure de Cacao Alimentaire (IND-LIQ-5355)',
    tankerVesselRef: 'Silo Tempéré #04 (Hub San Pedro)',
    gpsCoordinates: {
      lat: 6.0412,
      lng: -0.4503,
      polygonPlotsCount: 412
    }
  },
  {
    lotCode: 'LOT-CI-2026-912B',
    originCountry: "Côte d'Ivoire",
    cooperative: 'Coopérative ECAM Meagui (Habilitée EUDR)',
    region: 'Nawa, District du Bas-Sassandra',
    cropSeason: 'Main Crop 2025/2026',
    arrivalDate: '28 Janvier 2026',
    releaseDate: '10 Mars 2026',
    status: 'VALIDÉ EXPORT',
    moisturePercent: 7.1,
    fermentationScore: 92.1,
    cadmiumPpm: 0.035,
    leadPpm: 0.018,
    sensoryNotes: ['Beurre onctueux', 'Brioche tiède', 'Noisette fraîche'],
    beanCountPer100g: 96,
    fsscSeal: 'FSSC-QC-912-CI-PASSED',
    allocatedDerivative: 'Beurre de Cacao Pure Pression PPP (IND-BUT-PPP)',
    tankerVesselRef: 'Cuve Inox 316L #02 (Zone Export)',
    gpsCoordinates: {
      lat: 5.4124,
      lng: -6.5518,
      polygonPlotsCount: 685
    }
  },
  {
    lotCode: 'LOT-EC-2026-504C',
    originCountry: 'Équateur',
    cooperative: 'Asociación Fino de Aroma Esmeraldas',
    region: 'Esmeraldas Bio-Reserve Rainforest',
    cropSeason: 'Harvest Winter 2026',
    arrivalDate: '08 Février 2026',
    releaseDate: '24 Février 2026',
    status: 'VALIDÉ EXPORT',
    moisturePercent: 6.5,
    fermentationScore: 94.7,
    cadmiumPpm: 0.082,
    leadPpm: 0.015,
    sensoryNotes: ['Fleurs de jasmin', 'Agrumes confits', 'Balsamique doux'],
    beanCountPer100g: 88,
    fsscSeal: 'FSSC-QC-504-EC-PASSED',
    allocatedDerivative: 'Tourteau de Cacao & Masse Grand Cru',
    tankerVesselRef: 'Zone Stockage Agréée Bio #01',
    gpsCoordinates: {
      lat: 0.9682,
      lng: -79.6517,
      polygonPlotsCount: 198
    }
  },
  {
    lotCode: 'LOT-CAM-2026-302E',
    originCountry: 'Cameroun',
    cooperative: 'Union Planteurs Kumba (Sol Volcanique)',
    region: 'Sud-Ouest, Terroir Volcanique du Mont Cameroun',
    cropSeason: 'Crop 2025/2026',
    arrivalDate: '18 Février 2026',
    releaseDate: '14 Mars 2026',
    status: 'CONTRÔLE LABORATOIRE',
    moisturePercent: 7.3,
    fermentationScore: 86.8,
    cadmiumPpm: 0.052,
    leadPpm: 0.024,
    sensoryNotes: ['Bois de cèdre fumé', 'Cacao brut terreux', 'Épices chaudes'],
    beanCountPer100g: 99,
    fsscSeal: 'LAB-PENDING-STAGE3',
    allocatedDerivative: 'Poudre de Cacao Alcalinisée 10-12% & 20-22%',
    tankerVesselRef: 'Réacteur Dutch #03',
    gpsCoordinates: {
      lat: 4.6364,
      lng: 9.4468,
      polygonPlotsCount: 320
    }
  }
];

export const ESG_EUDR_METRICS = {
  totalGeoMappedHectares: '38 450 ha',
  polygonalPlotsVerified: '14 250 parcelles',
  zeroDeforestationComplianceRate: '100% (parcelles post-décembre 2020)',
  cooperativeNetworkFarmersCount: '12 800 producteurs partenaires',
  satelliteMonitoringSystem: 'Croisement radar Sentinel-2 & Landsat 8 (résolution 10m)',
  dueDiligenceRegistrySystem: 'Système d\'Information Tracé Européen (DDS automatisé)',
  localValueAddedTransformationRatio: '100% transformé à l\'origine (Côte d\'Ivoire / Ghana)',
  carbonReductionSeaFreight: '-42% d\'émissions CO₂/tonne par transport d\'ingrédients raffinés vs fèves brutes volumineuses'
};
