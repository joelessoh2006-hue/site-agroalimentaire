import { CocoaProduct } from '../types';

export const COCOA_PRODUCTS: CocoaProduct[] = [
  {
    id: 'beurre-cacao-naturel-alimentaire',
    slug: 'beurre-cacao-naturel-alimentaire',
    name: 'Beurre de cacao naturel alimentaire',
    commercialName: 'Pure Prime Pressed (PPP) Natural Cocoa Butter',
    subtitle: 'Grade Alimentaire — Extraction Hydraulique 450 Bar',
    category: 'beurres',
    industry: ['alimentaire'],
    fatContentPercentage: '≥ 99.85%',
    phRange: 'Neutre (Indice d\'acide < 1.75)',
    origin: "Côte d'Ivoire (Bassin de San Pedro) & Ghana",
    moq: '1 palette (1 000 kg net / 40 cartons)',
    shelfLife: '24 mois à compter de la date de fabrication',
    storageConditions: 'Température 15 - 20°C, humidité relative < 60%, à l\'abri de la lumière et des odeurs étrangères',
    colorGrade: 'Jaune paille doré caractéristique (Lovibond Y 35, R 1.8)',
    meltingPoint: '32.0 - 35.0 °C (Point de glissement)',
    description: "Beurre pur extrait exclusivement par première pression mécanique continue de masse de cacao rigoureusement sélectionnée. Non désodorisé, il conserve l'arôme franc, riche et chaleureux de la fève de cacao noble. Idéal pour la chocolaterie fine et les applications nécessitant une casse sonore nette et une cristallisation bêta stable.",
    sensoryProfile: 'Arôme franc de cacao grillé, notes délicatement boisées, fusion corporelle immédiate et cassure franche à température ambiante.',
    applications: [
      'Chocolaterie fine (chocolat au lait & noir)',
      'Confiserie artisanale et industrielle',
      'Régulateur de viscosité de masse de couverture',
      'Pâtes à glacer de prestige',
      'Biscuiterie fine'
    ],
    keyFeatures: [
      'Extraction pure pression sans solvant ni additif chimique',
      'Haute résistance thermique et brillance supérieure au tempérage',
      'Cristallisation uniforme en forme polymorphe bêta V',
      'Faible teneur en acides gras libres (FFA < 1.75%)'
    ],
    certifications: [
      'FSSC 22000 Ver. 6.0',
      'ISO 9001:2015',
      'Rainforest Alliance',
      'Halal',
      'Casher Parve',
      'Conforme EUDR 2023/1115'
    ],
    specs: {
      'matiere_grasse': '≥ 99.85%',
      'acides_gras_libres_ffa': '≤ 1.75% (acide oléique)',
      'indice_peroxyde': '≤ 3.0 meq O₂/kg',
      'point_fusion': '32.0 - 35.0 °C',
      'indice_iode': '33 - 42 g I₂/100g',
      'indice_saponification': '188 - 198 mg KOH/g',
      'humidite': '≤ 0.10%'
    },
    detailedSpecs: [
      { parameter: 'Teneur en matière grasse totale', value: '≥ 99.85 %', unit: '% w/w', standardMethod: 'ISO 11053 (Soxhlet)' },
      { parameter: 'Acides gras libres (FFA en acide oléique)', value: '≤ 1.75 %', unit: '%', standardMethod: 'ISO 660 / IOCCC 1972' },
      { parameter: 'Indice de peroxyde', value: '≤ 3.0', unit: 'meq O₂/kg', standardMethod: 'ISO 3960' },
      { parameter: 'Point de fusion (glissement)', value: '32.0 - 35.0', unit: '°C', standardMethod: 'ISO 6321' },
      { parameter: 'Indice d\'iode (Wijs)', value: '33.0 - 42.0', unit: 'g I₂/100g', standardMethod: 'ISO 3961' },
      { parameter: 'Indice de saponification', value: '188 - 198', unit: 'mg KOH/g', standardMethod: 'ISO 3657' },
      { parameter: 'Matières insaponifiables', value: '≤ 0.35 %', unit: '%', standardMethod: 'ISO 3596' },
      { parameter: 'Humidité résiduelle', value: '≤ 0.10 %', unit: '%', standardMethod: 'Karl Fischer ISO 12937' },
      { parameter: 'Teneur en solides gras à 20°C (SFC)', value: '76 - 82 %', unit: '%', standardMethod: 'RMN pulsée ISO 8292' }
    ],
    microbiologicalSpecs: [
      { parameter: 'Flore aérobie mésophile totale (30°C)', target: '< 1 000 UFC/g', standardMethod: 'NF EN ISO 4833-1' },
      { parameter: 'Levures et moisissures', target: '< 50 UFC/g', standardMethod: 'NF ISO 21527-2' },
      { parameter: 'Entérobactéries', target: '< 10 UFC/g', standardMethod: 'NF ISO 21528-2' },
      { parameter: 'Escherichia coli', target: 'Absence dans 1 g', standardMethod: 'ISO 16649-2' },
      { parameter: 'Salmonella sp.', target: 'Absence stricte dans 2 x 375 g', standardMethod: 'PCR ISO 6579-1' }
    ],
    contaminantsSpecs: [
      { parameter: 'Cadmium (Cd)', limit: '≤ 0.050 mg/kg', compliance: 'Conforme Règl. UE 488/2014' },
      { parameter: 'Plomb (Pb)', limit: '≤ 0.050 mg/kg', compliance: 'Conforme Règl. UE 2023/915' },
      { parameter: 'Pesticides résiduels', limit: '< LMR européennes', compliance: 'Screening multirésidus GC-MS/LC-MS' },
      { parameter: 'Statut OGM', limit: 'Non OGM', compliance: 'Règl. CE 1829/2003 & 1830/2003' }
    ],
    packaging: [
      {
        format: 'Carton ondulé export 25 kg avec liner polyéthylène bleu de qualité alimentaire',
        netWeightKg: 25,
        grossWeightKg: 26.2,
        palletSpec: 'Palette Europe filmée 1000 kg net (40 cartons)'
      },
      {
        format: 'Fût métallique thermolaqué 190 kg avec liner étanche pour liquide chauffé',
        netWeightKg: 190,
        grossWeightKg: 205,
        palletSpec: 'Palette 4 fûts (760 kg net)'
      },
      {
        format: 'Citerne routière isotherme inox 316L (vrac liquide à 45°C)',
        netWeightKg: 24000,
        palletSpec: 'Transport citerne calorifugée dédiée'
      }
    ],
    image_url: '/images/products/beurre-cacao-naturel-alimentaire.jpg',
    macro_image_url: '/images/products/beurre-cacao-naturel-alimentaire.jpg',
    coaAvailable: true,
    tdsAvailable: true
  },
  {
    id: 'beurre-cacao-desodorise-blanc-raffine',
    slug: 'beurre-cacao-desodorise-blanc-raffine',
    name: 'Beurre de cacao désodorisé blanc raffiné',
    commercialName: 'Fully Deodorized White Cocoa Butter (Refined)',
    subtitle: 'Grade Alimentaire Haute Pureté — Désodorisation Vapeur Neutre',
    category: 'beurres',
    industry: ['alimentaire'],
    fatContentPercentage: '≥ 99.90%',
    phRange: 'Neutre (FFA < 1.00%)',
    origin: "Sélection Bassin Ouest-Africain & Terroirs Équateur",
    moq: '1 palette (1 000 kg net / 40 cartons)',
    shelfLife: '30 mois en emballage d\'origine hermétique',
    storageConditions: 'Température 15 - 20°C, humidité relative < 60%, à l\'abri du rayonnement solaire direct',
    colorGrade: 'Blanc ivoire très clair à limpide (Lovibond Y 15, R 0.8)',
    meltingPoint: '33.5 - 35.0 °C',
    description: "Beurre de cacao pur soumis à un procédé de désodorisation physique par entraînement à la vapeur d'eau sous vide poussé, suivi d'une filtration fine sur plaques de cellulose. Couleur blanc ivoire remarquable et neutralité olfactive totale, sans aucune altération de sa dureté ni de son comportement de fusion.",
    sensoryProfile: 'Totalement neutre, sans note olfactive résiduelle ni arrière-goût acide, fonte suave et soyeuse en bouche.',
    applications: [
      'Chocolat blanc de haute gastronomie',
      'Pâtes à glacer blanches et colorées',
      'Confiserie et ganaches aux arômes délicats (agrumes, vanille)',
      'Barres diététiques et substituts nutritionnels',
      'Enrobages pour crèmes glacées'
    ],
    keyFeatures: [
      'Neutralité organoleptique absolue respectant les arômes nobles',
      'Teinte ivoire ultra-claire idéale pour colorations précises',
      'Teneur résiduelle en acides gras libres exceptionnellement basse (< 1.00%)',
      'Indice de peroxyde minimal garantissant une longue stabilité oxydative'
    ],
    certifications: [
      'FSSC 22000 Ver. 6.0',
      'ISO 9001:2015',
      'Halal',
      'Casher Parve',
      'ISO 22000',
      'Conforme EUDR 2023/1115'
    ],
    specs: {
      'matiere_grasse': '≥ 99.90%',
      'acides_gras_libres_ffa': '≤ 1.00% (acide oléique)',
      'indice_peroxyde': '≤ 2.0 meq O₂/kg',
      'point_fusion': '33.5 - 35.0 °C',
      'indice_iode': '33 - 40 g I₂/100g',
      'arome_gout': 'Neutre inodore',
      'humidite': '≤ 0.08%'
    },
    detailedSpecs: [
      { parameter: 'Teneur en matière grasse', value: '≥ 99.90 %', unit: '% w/w', standardMethod: 'ISO 11053' },
      { parameter: 'Acides gras libres (FFA)', value: '≤ 1.00 %', unit: '%', standardMethod: 'ISO 660' },
      { parameter: 'Indice de peroxyde', value: '≤ 2.0', unit: 'meq O₂/kg', standardMethod: 'ISO 3960' },
      { parameter: 'Point de glissement', value: '33.5 - 35.0', unit: '°C', standardMethod: 'ISO 6321' },
      { parameter: 'Indice d\'iode (Wijs)', value: '33.0 - 40.0', unit: 'g I₂/100g', standardMethod: 'ISO 3961' },
      { parameter: 'Humidité résiduelle', value: '≤ 0.08 %', unit: '%', standardMethod: 'Karl Fischer' },
      { parameter: 'Indice de réfraction (40°C)', value: '1.456 - 1.459', unit: 'nD', standardMethod: 'ISO 6320' }
    ],
    microbiologicalSpecs: [
      { parameter: 'Flore aérobie mésophile', target: '< 500 UFC/g', standardMethod: 'ISO 4833-1' },
      { parameter: 'Levures & Moisissures', target: '< 20 UFC/g', standardMethod: 'ISO 21527-2' },
      { parameter: 'Entérobactéries', target: '< 10 UFC/g', standardMethod: 'ISO 21528-2' },
      { parameter: 'Salmonella sp.', target: 'Absence dans 2 x 375 g', standardMethod: 'PCR ISO 6579-1' }
    ],
    contaminantsSpecs: [
      { parameter: 'Cadmium (Cd)', limit: '≤ 0.020 mg/kg', compliance: 'Conforme Règl. UE 488/2014' },
      { parameter: 'Plomb (Pb)', limit: '≤ 0.030 mg/kg', compliance: 'Conforme Règl. UE 2023/915' },
      { parameter: 'HAP (Hydrocarbures Aromatiques Polycycliques)', limit: '< seuils UE', compliance: 'ISO 22959' }
    ],
    packaging: [
      {
        format: 'Carton renforcé 25 kg avec poche intérieure PE thermoscellée étanche',
        netWeightKg: 25,
        palletSpec: 'Palette Europe filmée 1 000 kg net (40 cartons)'
      },
      {
        format: 'Fût métallique thermolaqué alimentaire 190 kg',
        netWeightKg: 190,
        palletSpec: 'Palette 4 fûts (760 kg net)'
      },
      {
        format: 'Conteneur chauffant IBC 1 000 Litres (environ 920 kg net)',
        netWeightKg: 920,
        palletSpec: 'Conteneur palettisé gerbable avec vanne DIN 50'
      }
    ],
    image_url: '/images/products/beurre-cacao-desodorise-blanc-raffine.jpg',
    macro_image_url: '/images/products/beurre-cacao-desodorise-blanc-raffine.jpg',
    coaAvailable: true,
    tdsAvailable: true
  },
  {
    id: 'beurre-cacao-cosmetique',
    slug: 'beurre-cacao-cosmetique',
    name: 'Beurre de cacao cosmétique',
    commercialName: 'Dermo-Grade Cosmetic Cocoa Butter',
    subtitle: 'Grade Cosmétique & Pharma — INCI Theobroma Cacao Seed Butter',
    category: 'beurres',
    industry: ['cosmetique'],
    fatContentPercentage: '100% végétal pur',
    inciName: 'Theobroma Cacao (Cocoa) Seed Butter',
    casNumber: '8002-31-1',
    einecsNumber: '310-127-6',
    origin: "Filière tracée Côte d'Ivoire & Madagascar",
    moq: '500 kg (20 cartons de 25 kg)',
    shelfLife: '24 mois à l\'abri de l\'oxydation',
    storageConditions: 'Lieu frais et sec (12 - 18°C), à l\'abri des UV et de l\'air',
    colorGrade: 'Ivoire pâle naturel à doré soyeux',
    meltingPoint: '31.0 - 34.5 °C (Point de fusion cutané parfait)',
    description: "Matière première cosmétique d'exception obtenue par pression et purification contrôlée sans aucun solvant de synthèse. Exceptionnellement concentré en triglycérides d'acides stéarique, palmitique et oléique, ce beurre procure un toucher riche, un glissant velouté et un pouvoir filmogène protecteur incomparable sans effet gras persistant.",
    sensoryProfile: 'Toucher fondant au contact thermique épidermique (32°C), non collant, fini poudré et satiné.',
    applications: [
      'Baumes à lèvres réparateurs et rouges à lèvres',
      'Émulsions riches & crèmes anti-âge',
      'Savonnerie artisanale à froid (surgras)',
      'Soins capillaires réparateurs et masques texturisants',
      'Beurres corporels fouettés et soins solaires'
    ],
    keyFeatures: [
      'Conforme aux exigences Cosmos / Ecocert matières premières naturelles',
      'Profil en acides gras : 34% stéarique, 34% oléique, 26% palmitique',
      'Excellente tolérance cutanée et oculaire validée en laboratoire',
      'Absence garantie d\'huiles minérales, conservateurs et OGM'
    ],
    certifications: [
      'Ecocert Cosmos Approved',
      'ISO 22716 (BPF Cosmétiques / GMP)',
      'FSSC 22000',
      'Cruelty-Free / Non testé sur animaux',
      'Halal',
      'Conforme EUDR'
    ],
    specs: {
      'inci': 'Theobroma Cacao (Cocoa) Seed Butter',
      'cas_number': '8002-31-1',
      'point_fusion': '31.0 - 34.5 °C',
      'indice_acide': '≤ 2.0 mg KOH/g',
      'indice_peroxyde': '≤ 2.5 meq O₂/kg',
      'indice_saponification': '188 - 198 mg KOH/g',
      'insaponifiables': '≤ 0.50%'
    },
    detailedSpecs: [
      { parameter: 'Nom INCI', value: 'Theobroma Cacao (Cocoa) Seed Butter', unit: 'Nomenclature' },
      { parameter: 'Numéro CAS / EINECS', value: '8002-31-1 / 310-127-6', unit: 'Identifiant légal' },
      { parameter: 'Point de fusion', value: '31.0 - 34.5', unit: '°C', standardMethod: 'Pharmacopée Européenne (Ph. Eur.)' },
      { parameter: 'Indice d\'acide', value: '≤ 2.0', unit: 'mg KOH/g', standardMethod: 'Ph. Eur. 2.5.1' },
      { parameter: 'Indice de peroxyde', value: '≤ 2.5', unit: 'meq O₂/kg', standardMethod: 'Ph. Eur. 2.5.5' },
      { parameter: 'Indice d\'iode', value: '33.0 - 42.0', unit: 'g I₂/100g', standardMethod: 'Ph. Eur. 2.5.4' },
      { parameter: 'Indice de saponification', value: '188 - 198', unit: 'mg KOH/g', standardMethod: 'Ph. Eur. 2.5.6' },
      { parameter: 'Matières insaponifiables', value: '≤ 0.50 %', unit: '%', standardMethod: 'Ph. Eur. 2.5.7' }
    ],
    microbiologicalSpecs: [
      { parameter: 'Flore aérobie mésophile totale', target: '< 100 UFC/g', standardMethod: 'ISO 21149' },
      { parameter: 'Levures et moisissures', target: '< 10 UFC/g', standardMethod: 'ISO 16212' },
      { parameter: 'Pseudomonas aeruginosa', target: 'Absence dans 1 g', standardMethod: 'ISO 22717' },
      { parameter: 'Staphylococcus aureus', target: 'Absence dans 1 g', standardMethod: 'ISO 22718' },
      { parameter: 'Candida albicans', target: 'Absence dans 1 g', standardMethod: 'ISO 18416' }
    ],
    contaminantsSpecs: [
      { parameter: 'Métaux lourds totaux (Pb, Cd, As, Hg)', limit: '< 5 ppm', compliance: 'ICP-MS Ph. Eur.' },
      { parameter: 'Solvants résiduels', limit: 'Absence stricte (aucun solvant utilisé)', compliance: 'Extraction 100% mécanique' }
    ],
    packaging: [
      {
        format: 'Carton blanc cosmétique 25 kg avec doublure polyéthylène vierge scellée',
        netWeightKg: 25,
        palletSpec: 'Palette 1 000 kg net (40 cartons)'
      },
      {
        format: 'Seaux hermétiques PP de 20 kg avec opercule inviolable',
        netWeightKg: 20,
        palletSpec: 'Palette de 32 seaux (640 kg net)'
      }
    ],
    image_url: '/images/products/beurre-cacao-cosmetique.jpg',
    macro_image_url: '/images/products/beurre-cacao-cosmetique.jpg',
    coaAvailable: true,
    tdsAvailable: true
  },
  {
    id: 'poudre-cacao-naturelle-alimentaire',
    slug: 'poudre-cacao-naturelle-alimentaire',
    name: 'Poudre de cacao alimentaire naturelle',
    commercialName: 'Pure Natural Light Brown Cocoa Powder (Non-Alkalized)',
    subtitle: 'Grade Alimentaire — Non Alcalinisée, pH 5.2 - 6.0',
    category: 'poudres',
    industry: ['alimentaire'],
    fatContentPercentage: '10.0 - 12.0%',
    phRange: '5.2 - 6.0 (Acidité fruitée d\'origine)',
    origin: 'Ghana (Région Ashanti) & Terroirs Ivoiriens',
    moq: '1 palette (1 000 kg net / 40 sacs)',
    shelfLife: '24 mois en emballage d\'origine hermétique',
    storageConditions: 'Température 15 - 20°C, humidité relative < 50%, local aéré',
    colorGrade: 'Brun clair doré naturel à ocre chaud (L* 38.5, a* 12.4, b* 15.6)',
    description: "Poudre micronisée issue du broyage cryogénique du tourteau de cacao vierge, sans aucun traitement chimique ni régulateur d'acidité (procédé non alcalinisé). Teinte claire et éclatante, arôme fruité préservé, très riche en flavanols antioxydants d'origine.",
    sensoryProfile: 'Saveur fruitée, légère acidité rafraîchissante, notes de noisette grillée et arôme franc de terroir.',
    applications: [
      'Pâtisserie artisanale et biscuiterie sèche',
      'Poudres chocolatées pour petit-déjeuner',
      'Céréales extrudées et snacks sains',
      'Barres nutritionnelles et compléments bien-être',
      'Pâtes à gâteaux et génoises traditionnelles'
    ],
    keyFeatures: [
      '100% naturelle sans sel minéral d\'alcalinisation',
      'Teneur exceptionnelle en polyphénols totaux (> 3 200 mg/100g)',
      'Micronisation fine alpine garantie à 99.7% sous 75 microns',
      'Faible humidité résiduelle (< 4.5%) prévenant tout mottage'
    ],
    certifications: [
      'FSSC 22000 Ver. 6.0',
      'Agriculture Biologique (UE & NOP)',
      'Rainforest Alliance',
      'Halal',
      'Casher Parve',
      'Conforme EUDR 2023/1115'
    ],
    specs: {
      'matiere_grasse': '10.0 - 12.0%',
      'ph': '5.2 - 6.0',
      'humidite': '≤ 4.5%',
      'finesse_tamis_75um': '≥ 99.5%',
      'cendres_totales': '≤ 6.0%'
    },
    detailedSpecs: [
      { parameter: 'Teneur en matière grasse résiduelle', value: '10.0 - 12.0 %', unit: '% w/w', standardMethod: 'ISO 11053 (Soxhlet)' },
      { parameter: 'Potentiel hydrogène (pH solution 10%)', value: '5.2 - 6.0', unit: 'pH', standardMethod: 'ISO 1842' },
      { parameter: 'Humidité résiduelle', value: '≤ 4.5 %', unit: '%', standardMethod: 'Étuve 103°C / Karl Fischer' },
      { parameter: 'Finesse particulaire (< 75 µm tamis Alpine)', value: '≥ 99.5 %', unit: '%', standardMethod: 'Tamisage humide Alpine 200LS' },
      { parameter: 'Cendres totales', value: '≤ 6.0 %', unit: '%', standardMethod: 'Incinération 550°C' },
      { parameter: 'Cendres insolubles dans l\'acide', value: '≤ 0.20 %', unit: '%', standardMethod: 'ISO 763' },
      { parameter: 'Teneur en théobromine', value: '1.8 - 2.4 %', unit: '%', standardMethod: 'HPLC' }
    ],
    microbiologicalSpecs: [
      { parameter: 'Flore aérobie mésophile totale', target: '< 4 000 UFC/g', standardMethod: 'ISO 4833-1' },
      { parameter: 'Levures et moisissures', target: '< 50 UFC/g', standardMethod: 'ISO 21527-2' },
      { parameter: 'Entérobactéries', target: '< 10 UFC/g', standardMethod: 'ISO 21528-2' },
      { parameter: 'Salmonella sp.', target: 'Absence stricte dans 2 x 375 g', standardMethod: 'PCR ISO 6579-1' }
    ],
    contaminantsSpecs: [
      { parameter: 'Cadmium (Cd)', limit: '≤ 0.080 mg/kg', compliance: 'Conforme Règl. UE 488/2014 (< 0.60 mg/kg poudres)' },
      { parameter: 'Plomb (Pb)', limit: '≤ 0.050 mg/kg', compliance: 'Conforme Règl. UE 2023/915' },
      { parameter: 'Aflatoxines B1 / Totales', limit: '< 2.0 / < 4.0 µg/kg', compliance: 'HPLC-FLD' }
    ],
    packaging: [
      {
        format: 'Sacs papier kraft multicouches 25 kg avec barrière intérieure étanche PE',
        netWeightKg: 25,
        grossWeightKg: 25.4,
        palletSpec: 'Palette Europe houssée 1 000 kg net (40 sacs)'
      },
      {
        format: 'Big Bag polypropylène 1 000 kg avec goulotte de décharge étanche',
        netWeightKg: 1000,
        palletSpec: '1 Big Bag par palette (1 000 kg net)'
      }
    ],
    image_url: '/images/products/poudre-cacao-naturelle-alimentaire.jpg',
    macro_image_url: '/images/products/poudre-cacao-naturelle-alimentaire.jpg',
    coaAvailable: true,
    tdsAvailable: true
  },
  {
    id: 'poudre-cacao-alcalinisee-10-12',
    slug: 'poudre-cacao-alcalinisee-10-12',
    name: 'Poudre de cacao alcalinisée 10-12%',
    commercialName: 'Medium Dutch Alkalized Cocoa Powder 10/12',
    subtitle: 'Grade Alimentaire — Procédé Hollandais Standard, pH 7.0 - 7.6',
    category: 'poudres',
    industry: ['alimentaire'],
    fatContentPercentage: '10.0 - 12.0%',
    phRange: '7.0 - 7.6 (Neutralité équilibrée)',
    origin: "Côte d'Ivoire (Bas-Sassandra) & Cameroun",
    moq: '1 palette (1 000 kg net / 40 sacs)',
    shelfLife: '24 mois à l\'abri de l\'humidité',
    storageConditions: 'Température 15 - 20°C, humidité relative < 50%',
    colorGrade: 'Brun chocolat chaud profond (L* 28.5, a* 12.8, b* 11.4)',
    description: "Poudre de cacao traitée avec des régulateurs d'acidité alimentaires sous atmosphère contrôlée (procédé Dutch). Neutralisation de l'acidité naturelle, développement d'un arôme doux et rond, excellente mouillabilité et solubilité en milieu aqueux ou lacté.",
    sensoryProfile: 'Saveur chocolatée douce, notes de caramel doux, absence d\'amertume astringente, excellente dispersion.',
    applications: [
      'Boissons chocolatées instantanées et poudres pour distributeurs',
      'Biscuits et garnitures intérieures de gaufrettes',
      'Desserts lactés et crèmes desserts réfrigérées',
      'Crèmes glacées et sorbets chocolatés',
      'Préparations pour pâtisseries industrielles'
    ],
    keyFeatures: [
      'Excellente dispersibilité en milieu froid et tiède',
      'Couleur brune intense et chaleureuse sans noircissement excessif',
      'Faible sédimentation dans les matrices liquides et lactées',
      'Contrôle microbiologique stérile après traitement thermique Dutch'
    ],
    certifications: [
      'FSSC 22000 Ver. 6.0',
      'ISO 9001:2015',
      'Rainforest Alliance',
      'Halal',
      'Casher Parve',
      'Conforme EUDR'
    ],
    specs: {
      'matiere_grasse': '10.0 - 12.0%',
      'ph': '7.0 - 7.6',
      'humidite': '≤ 4.5%',
      'finesse_tamis_75um': '≥ 99.8%',
      'solubilite': 'Excellente dispersion'
    },
    detailedSpecs: [
      { parameter: 'Matière grasse totale', value: '10.0 - 12.0 %', unit: '% w/w', standardMethod: 'ISO 11053' },
      { parameter: 'pH (solution à 10%)', value: '7.0 - 7.6', unit: 'pH', standardMethod: 'ISO 1842' },
      { parameter: 'Humidité résiduelle', value: '≤ 4.5 %', unit: '%', standardMethod: 'Étuve 103°C' },
      { parameter: 'Finesse particulaire (< 75 µm)', value: '≥ 99.8 %', unit: '%', standardMethod: 'Tamis Alpine' },
      { parameter: 'Cendres totales', value: '≤ 10.0 %', unit: '%', standardMethod: 'Incinération 550°C' },
      { parameter: 'Cendres insolubles dans l\'acide', value: '≤ 0.30 %', unit: '%', standardMethod: 'ISO 763' }
    ],
    microbiologicalSpecs: [
      { parameter: 'Flore aérobie mésophile totale', target: '< 2 500 UFC/g', standardMethod: 'ISO 4833-1' },
      { parameter: 'Levures et moisissures', target: '< 40 UFC/g', standardMethod: 'ISO 21527-2' },
      { parameter: 'Entérobactéries', target: '< 10 UFC/g', standardMethod: 'ISO 21528-2' },
      { parameter: 'Salmonella sp.', target: 'Absence dans 2 x 375 g', standardMethod: 'PCR ISO 6579-1' }
    ],
    contaminantsSpecs: [
      { parameter: 'Cadmium (Cd)', limit: '≤ 0.070 mg/kg', compliance: 'Conforme Règl. UE 488/2014' },
      { parameter: 'Plomb (Pb)', limit: '≤ 0.040 mg/kg', compliance: 'Conforme Règl. UE 2023/915' },
      { parameter: 'Aflatoxines', limit: '< seuils UE', compliance: 'HPLC' }
    ],
    packaging: [
      {
        format: 'Sacs kraft multicouches 25 kg soudés palettisés sous film étirable',
        netWeightKg: 25,
        palletSpec: 'Palette Europe filmée 1 000 kg net (40 sacs)'
      },
      {
        format: 'Big Bag 1 000 kg avec valve étanche anti-poussière',
        netWeightKg: 1000,
        palletSpec: '1 Big Bag par palette (1 000 kg net)'
      }
    ],
    image_url: '/images/products/poudre-cacao-alcalinisee-10-12.jpg',
    macro_image_url: '/images/products/poudre-cacao-alcalinisee-10-12.jpg',
    coaAvailable: true,
    tdsAvailable: true
  },
  {
    id: 'poudre-cacao-alcalinisee-20-22',
    slug: 'poudre-cacao-alcalinisee-20-22',
    name: 'Poudre de cacao alcalinisée 20-22%',
    commercialName: 'High-Fat Red Dutch Cocoa Powder 20/22',
    subtitle: 'Grade Alimentaire Premium — Haute Matière Grasse, pH 7.2 - 7.8',
    category: 'poudres',
    industry: ['alimentaire'],
    fatContentPercentage: '20.0 - 22.0%',
    phRange: '7.2 - 7.8 (Intense et soyeux)',
    origin: "Côte d'Ivoire (Terroir San Pedro) & Ghana",
    moq: '1 palette (1 000 kg net / 40 sacs)',
    shelfLife: '24 mois à température contrôlée',
    storageConditions: 'Température 15 - 18°C (crucial pour poudres grasses), HR < 50%',
    colorGrade: 'Brun rouge profond rubis (L* 26.2, a* 14.1, b* 10.8)',
    description: "Poudre d'élite conservant une haute proportion de beurre de cacao naturel (20 à 22%). Apporte une richesse en bouche inégalée, une sensation veloutée onctueuse et une teinte acajou rougeoyante convoitée par les chefs pâtissiers et formulateurs industriels haut de gamme.",
    sensoryProfile: 'Intensément chocolaté, texture en bouche crémeuse et enveloppante, notes aromatiques de truffe et vanille bourbon.',
    applications: [
      'Chocolats chauds épais façon salon de thé parisien',
      'Ganaches, truffes et intérieurs fondants',
      'Glaces et crèmes glacées gastronomiques',
      'Glaçages miroirs et sauces chocolatées de nappage',
      'Biscuiterie et génoises haut de gamme'
    ],
    keyFeatures: [
      'Double proportion de matière grasse noble (20-22% vs 10-12%)',
      'Onctuosité et viscosité accrues dans les émulsions liquides',
      'Couleur rouge foncé luxueuse sans aucun colorant artificiel',
      'Finesse micronique supérieure évitant toute granulosité en bouche'
    ],
    certifications: [
      'FSSC 22000 Ver. 6.0',
      'ISO 9001:2015',
      'Rainforest Alliance',
      'Halal',
      'Casher Parve',
      'Conforme EUDR'
    ],
    specs: {
      'matiere_grasse': '20.0 - 22.0%',
      'ph': '7.2 - 7.8',
      'humidite': '≤ 4.2%',
      'finesse_tamis_75um': '≥ 99.9%',
      'onctuosite': 'Haute viscosité'
    },
    detailedSpecs: [
      { parameter: 'Matière grasse totale', value: '20.0 - 22.0 %', unit: '% w/w', standardMethod: 'ISO 11053' },
      { parameter: 'pH (solution à 10%)', value: '7.2 - 7.8', unit: 'pH', standardMethod: 'ISO 1842' },
      { parameter: 'Humidité résiduelle', value: '≤ 4.2 %', unit: '%', standardMethod: 'Étuve 103°C' },
      { parameter: 'Finesse particulaire (< 75 µm)', value: '≥ 99.9 %', unit: '%', standardMethod: 'Tamis Alpine 200LS' },
      { parameter: 'Cendres totales', value: '≤ 12.0 %', unit: '%', standardMethod: 'Incinération 550°C' }
    ],
    microbiologicalSpecs: [
      { parameter: 'Flore aérobie mésophile totale', target: '< 2 000 UFC/g', standardMethod: 'ISO 4833-1' },
      { parameter: 'Levures et moisissures', target: '< 30 UFC/g', standardMethod: 'ISO 21527-2' },
      { parameter: 'Entérobactéries', target: '< 10 UFC/g', standardMethod: 'ISO 21528-2' },
      { parameter: 'Salmonella sp.', target: 'Absence dans 2 x 375 g', standardMethod: 'PCR ISO 6579-1' }
    ],
    contaminantsSpecs: [
      { parameter: 'Cadmium (Cd)', limit: '≤ 0.065 mg/kg', compliance: 'Conforme Règl. UE 488/2014' },
      { parameter: 'Plomb (Pb)', limit: '≤ 0.035 mg/kg', compliance: 'Conforme Règl. UE 2023/915' }
    ],
    packaging: [
      {
        format: 'Sacs kraft multicouches étanches 25 kg avec barrière aluminisée',
        netWeightKg: 25,
        palletSpec: 'Palette Europe filmée 1 000 kg net (40 sacs)'
      }
    ],
    image_url: '/images/products/poudre-cacao-alcalinisee-20-22.jpg',
    macro_image_url: '/images/products/poudre-cacao-alcalinisee-20-22.jpg',
    coaAvailable: true,
    tdsAvailable: true
  },
  {
    id: 'masse-cacao-alimentaire',
    slug: 'masse-cacao-alimentaire',
    name: 'Masse de cacao alimentaire',
    commercialName: 'Pure Single-Origin Cocoa Liquor / Mass 52/54',
    subtitle: 'Grade Alimentaire — 100% Pur Cacao Torréfié, Finesse < 20 µm',
    category: 'masses',
    industry: ['alimentaire'],
    fatContentPercentage: '52.0 - 54.5%',
    phRange: '5.4 - 5.8 (Profil fruité franc)',
    origin: "Ghana (Kuapa Kokoo) & Côte d'Ivoire",
    moq: '1 palette (1 000 kg net / 40 cartons)',
    shelfLife: '24 mois à 18 - 22°C',
    storageConditions: 'Température 18 - 22°C, humidité relative < 60%, endroit ventilé',
    colorGrade: 'Brun chocolat sombre profond (CIELAB L* 24.2)',
    meltingPoint: '32.5 - 34.8 °C',
    description: "100% fèves de cacao sélectionnées, nettoyées, torréfiées selon profil thermique helvétique et broyées sur broyeur à billes céramiques jusqu'à une finesse sub-micrométrique (< 20 microns). C'est la matière première originelle de toute fabrication de chocolat noir et au lait, délivrée sans aucun ingrédient rapporté.",
    sensoryProfile: 'Attaque franche de cacao puissant, notes de fruits rouges séchés, fond de bouche malté et toasté.',
    applications: [
      'Fabrication de chocolat noir de couverture (50% à 100%)',
      'Formulation de chocolat au lait gastronomique',
      'Arômes naturels concentrés de cacao pour biscuits et crèmes',
      'Enrobages et intérieurs de truffes',
      'Pâtes à tartiner B2B sans huile de palme'
    ],
    keyFeatures: [
      '100% fèves de cacao pures sans additif ni matière grasse végétale externe',
      'Micronisation extrême (< 20 µm) garantissant une texture lisse sans conchage prolongé',
      'Teneur naturelle en beurre de cacao comprise entre 52% et 54.5%',
      'Livraison en blocs solides 25 kg, pastilles faciles à fondre ou liquide en citerne'
    ],
    certifications: [
      'FSSC 22000 Ver. 6.0',
      'ISO 9001:2015',
      'Rainforest Alliance',
      'Fairtrade Max Havelaar',
      'Halal',
      'Casher Parve',
      'Conforme EUDR 2023/1115'
    ],
    specs: {
      'matiere_grasse': '52.0 - 54.5%',
      'humidite': '≤ 1.50%',
      'finesse_submicronique': '< 20 microns (Alpine)',
      'acides_gras_libres': '≤ 1.40%',
      'point_fusion': '32.5 - 34.8 °C'
    },
    detailedSpecs: [
      { parameter: 'Teneur en beurre de cacao (matière grasse)', value: '52.0 - 54.5 %', unit: '% w/w', standardMethod: 'ISO 11053' },
      { parameter: 'Humidité résiduelle', value: '≤ 1.50 %', unit: '%', standardMethod: 'Karl Fischer' },
      { parameter: 'Finesse micrométrique', value: '< 20', unit: 'µm', standardMethod: 'Micromètre digital & tamisage humide' },
      { parameter: 'Acides gras libres (FFA du beurre extrait)', value: '≤ 1.40 %', unit: '%', standardMethod: 'ISO 660' },
      { parameter: 'Teneur en cendres totales', value: '≤ 4.5 %', unit: '%', standardMethod: 'Incinération 550°C' },
      { parameter: 'Teneur en protéines brutes (N x 6.25)', value: '11.0 - 13.5 %', unit: '%', standardMethod: 'Kjeldahl' }
    ],
    microbiologicalSpecs: [
      { parameter: 'Flore aérobie mésophile totale', target: '< 2 500 UFC/g', standardMethod: 'ISO 4833-1' },
      { parameter: 'Levures et moisissures', target: '< 40 UFC/g', standardMethod: 'ISO 21527-2' },
      { parameter: 'Entérobactéries', target: '< 10 UFC/g', standardMethod: 'ISO 21528-2' },
      { parameter: 'Salmonella sp.', target: 'Absence dans 2 x 375 g', standardMethod: 'PCR ISO 6579-1' }
    ],
    contaminantsSpecs: [
      { parameter: 'Cadmium (Cd)', limit: '≤ 0.050 mg/kg', compliance: 'Conforme Règl. UE 488/2014' },
      { parameter: 'Plomb (Pb)', limit: '≤ 0.025 mg/kg', compliance: 'Conforme Règl. UE 2023/915' },
      { parameter: 'Ochratoxine A / Aflatoxines', limit: '< seuils UE', compliance: 'HPLC' }
    ],
    packaging: [
      {
        format: 'Carton 25 kg contenant 1 bloc massif ou pastilles en sachet PE bleu',
        netWeightKg: 25,
        palletSpec: 'Palette Europe filmée 1 000 kg net (40 cartons)'
      },
      {
        format: 'Citerne calorifugée inox 316L (vrac liquide maintenu à 45 - 50°C)',
        netWeightKg: 24000,
        palletSpec: 'Transport camion citerne dédié agroalimentaire'
      }
    ],
    image_url: '/images/products/masse-cacao-alimentaire.jpg',
    macro_image_url: '/images/products/masse-cacao-alimentaire.jpg',
    coaAvailable: true,
    tdsAvailable: true
  },
  {
    id: 'masse-cacao-cosmetique',
    slug: 'masse-cacao-cosmetique',
    name: 'Masse de cacao cosmétique',
    commercialName: 'Polyphenol-Rich Dermo Cosmetic Cocoa Mass',
    subtitle: 'Grade Cosmétique & Spa — Riche en Polyphénols & Théobromine',
    category: 'masses',
    industry: ['cosmetique'],
    fatContentPercentage: '52.0 - 54.0%',
    inciName: 'Theobroma Cacao (Cocoa) Extract / Seed Paste',
    casNumber: '84649-99-0',
    origin: "Filière Grand Bassam & Cameroun Volcanique",
    moq: '500 kg (25 seaux de 20 kg)',
    shelfLife: '24 mois sous azote ou emballage étanche',
    storageConditions: 'Température 15 - 20°C, abri strict de l\'humidité',
    colorGrade: 'Pâte dense brun ébène chaud',
    description: "Liqueur de cacao pure purifiée pour applications cosmétiques et dermo-esthétiques. Exceptionnellement concentrée en flavonoïdes antioxydants naturels (épicatéchines), théobromine stimulante et minéraux (magnésium, zinc). Idéale pour formulations raffermissantes, anti-âge et rituels spa exfoliants.",
    sensoryProfile: 'Arôme profond de chocolat noir brut, texture onctueuse après chauffe, haute concentration aromathérapique.',
    applications: [
      'Masques corporels exfoliants et raffermissants en thalasso & spa',
      'Savonnerie solide marbrée à froid au cacao pur',
      'Enveloppements détoxifiants et tonifiants anti-cellulite',
      'Crèmes pour le corps énergisantes',
      'Gommages gourmands riches en polyphénols'
    ],
    keyFeatures: [
      'Teneur exceptionnelle en flavanols antioxydants (> 4 000 mg/100g)',
      'Action lipolytique et tonifiante naturelle grâce à la théobromine',
      'Pigmentation naturelle brun chaud pour cosmétiques sans colorant CI',
      'Contrôle dermatologique et microbiologique strict'
    ],
    certifications: [
      'Ecocert Cosmos Approved',
      'ISO 22716 (GMP Cosmétique)',
      'Cruelty-Free',
      'Non-OGM',
      'Conforme EUDR'
    ],
    specs: {
      'matiere_grasse': '52.0 - 54.0%',
      'polyphénols_totaux': '> 4 000 mg/100g',
      'theobromine': '≥ 1.6%',
      'finesse': '< 25 microns',
      'statut': '100% pur dermo-compatible'
    },
    detailedSpecs: [
      { parameter: 'Teneur en matière grasse végétale', value: '52.0 - 54.0 %', unit: '% w/w', standardMethod: 'ISO 11053' },
      { parameter: 'Teneur en polyphénols totaux', value: '> 4 000', unit: 'mg/100g équiv. acide gallique', standardMethod: 'Folin-Ciocalteu' },
      { parameter: 'Teneur en théobromine', value: '1.6 - 2.2 %', unit: '%', standardMethod: 'HPLC' },
      { parameter: 'Humidité résiduelle', value: '≤ 1.8 %', unit: '%', standardMethod: 'Karl Fischer' },
      { parameter: 'Finesse granulométrique', value: '< 25', unit: 'µm', standardMethod: 'Micromètre' }
    ],
    microbiologicalSpecs: [
      { parameter: 'Flore aérobie mésophile totale', target: '< 500 UFC/g', standardMethod: 'ISO 21149' },
      { parameter: 'Levures et moisissures', target: '< 20 UFC/g', standardMethod: 'ISO 16212' },
      { parameter: 'Pathogènes cutanés (P. aeruginosa, S. aureus)', target: 'Absence stricte dans 1 g', standardMethod: 'ISO 22717/18' }
    ],
    contaminantsSpecs: [
      { parameter: 'Métaux lourds (Pb, Cd, As, Hg)', limit: '< 5 ppm combiné', compliance: 'Ph. Eur.' },
      { parameter: 'Pesticides résiduels', limit: '< Limite de quantification', compliance: 'GC-MS' }
    ],
    packaging: [
      {
        format: 'Seaux hermétiques polypropylène 20 kg avec opercule étanche',
        netWeightKg: 20,
        palletSpec: 'Palette 32 seaux (640 kg net)'
      },
      {
        format: 'Fûts métalliques operculés 180 kg',
        netWeightKg: 180,
        palletSpec: 'Palette 4 fûts (720 kg net)'
      }
    ],
    image_url: '/images/products/masse-cacao-cosmetique.jpg',
    macro_image_url: '/images/products/masse-cacao-cosmetique.jpg',
    coaAvailable: true,
    tdsAvailable: true
  },
  {
    id: 'tourteau-cacao-troutrou',
    slug: 'tourteau-cacao-troutrou',
    name: 'Tourteau de cacao (« Troutrou » de cacao)',
    commercialName: 'Raw Cocoa Expeller Press Cake ("Troutrou" 10/12)',
    subtitle: 'Matière Intermédiaire & Valorisation — Disques ou Concassé (Kibbled)',
    category: 'masses',
    industry: ['alimentaire', 'agricole'],
    fatContentPercentage: '10.0 - 12.0%',
    phRange: '5.2 - 5.8 (Non alcalinisé brut)',
    origin: "Usines de San Pedro & Abidjan (Côte d'Ivoire)",
    moq: '5 000 kg (5 Big Bags ou vrac conteneurisé)',
    shelfLife: '18 mois en milieu sec et ventilé',
    storageConditions: 'Température < 25°C, humidité relative < 60%, sur palettes surélevées',
    colorGrade: 'Brun naturel chaud terreux',
    description: "Galette solide compacte résultant du pressage hydraulique discontinu sous 450 bars de la masse pure de cacao pour en extraire le beurre. Également connu sous le vocable industriel de « Troutrou » en Afrique de l'Ouest, ce produit constitue la matière première par excellence pour les unités de micronisation en poudre, l'extraction de flavonoïdes ou la formulation de nutrition animale et humaine enrichie.",
    sensoryProfile: 'Arôme franc de cacao concentré, consistance dure et cassante, odeur naturelle de torréfaction.',
    applications: [
      'Matière première intermédiaire pour meuneries et broyeurs de poudre',
      'Extraction industrielle de théobromine et polyphénols',
      'Nutrition animale spécialisée haut de gamme (matière première certifiée GMP+)',
      'Compléments alimentaires hyperprotéinés et riches en fibres insolubles',
      'Substrats pour compostage agronomique et fertilisation bio'
    ],
    keyFeatures: [
      'Teneur résiduelle en matière grasse stabilisée entre 10% et 12%',
      'Richesse naturelle en fibres végétales (> 32%) et protéines brutes (> 22%)',
      'Format adaptable : disques bruts de presse ou concassé calibré (kibbled cake 10-30 mm)',
      'Traçabilité totale depuis les fèves jusqu\'au lot de presse hydraulique'
    ],
    certifications: [
      'FSSC 22000 Ver. 6.0',
      'ISO 22000',
      'Rainforest Alliance',
      'Non-OGM',
      'Conforme EUDR 2023/1115'
    ],
    specs: {
      'matiere_grasse_residuelle': '10.0 - 12.0%',
      'humidite': '≤ 5.0%',
      'teneur_en_fibres': '≥ 30.0%',
      'proteines_brutes': '20.0 - 24.0%',
      'forme': 'Disques compacts ou concassé kibbled (10-30 mm)'
    },
    detailedSpecs: [
      { parameter: 'Matière grasse résiduelle (Soxhlet)', value: '10.0 - 12.0 %', unit: '% w/w', standardMethod: 'ISO 11053' },
      { parameter: 'Humidité résiduelle', value: '≤ 5.0 %', unit: '%', standardMethod: 'Étuve 103°C' },
      { parameter: 'Protéines brutes (N x 6.25)', value: '20.0 - 24.0 %', unit: '%', standardMethod: 'Kjeldahl ISO 5983' },
      { parameter: 'Fibres alimentaires totales', value: '32.0 - 38.0 %', unit: '%', standardMethod: 'AOAC 991.43' },
      { parameter: 'Cendres brutes', value: '≤ 6.5 %', unit: '%', standardMethod: 'Incinération 550°C' }
    ],
    microbiologicalSpecs: [
      { parameter: 'Flore aérobie mésophile totale', target: '< 5 000 UFC/g', standardMethod: 'ISO 4833-1' },
      { parameter: 'Levures et moisissures', target: '< 50 UFC/g', standardMethod: 'ISO 21527-2' },
      { parameter: 'Salmonella sp.', target: 'Absence dans 2 x 375 g', standardMethod: 'PCR ISO 6579-1' }
    ],
    contaminantsSpecs: [
      { parameter: 'Cadmium (Cd)', limit: '≤ 0.080 mg/kg', compliance: 'Conforme Règl. UE 488/2014' },
      { parameter: 'Plomb (Pb)', limit: '≤ 0.050 mg/kg', compliance: 'Conforme Règl. UE 2023/915' },
      { parameter: 'Aflatoxines totales', limit: '< 4.0 µg/kg', compliance: 'HPLC' }
    ],
    packaging: [
      {
        format: 'Sacs en polypropylène tissé renforcé 50 kg avec doublure',
        netWeightKg: 50,
        palletSpec: 'Palette Europe 1 000 kg (20 sacs)'
      },
      {
        format: 'Big Bag 1 000 kg haute résistance avec boucles de levage 4 points',
        netWeightKg: 1000,
        palletSpec: '1 Big Bag par palette (1 000 kg net)'
      },
      {
        format: 'Conteneur maritime 20ft vrac avec linerbag étanche (environ 18-20 MT)',
        netWeightKg: 19000,
        palletSpec: 'Conteneur FCL vrac direct usine'
      }
    ],
    image_url: '/images/products/tourteau-cacao-troutrou.jpg',
    macro_image_url: '/images/products/tourteau-cacao-troutrou.jpg',
    coaAvailable: true,
    tdsAvailable: true
  }
];

// Attribution automatique et normalisée des liens de téléchargement PDF officiels
COCOA_PRODUCTS.forEach((product) => {
  product.tdsPdfUrl = `/api/docs/tds/${product.slug}`;
  product.coaPdfUrl = `/api/docs/coa/LOT-${product.category.toUpperCase().slice(0, 3)}-2026-884A`;
});

// Helper functions for easy filtering and lookup
export function getProductById(id: string): CocoaProduct | undefined {
  return COCOA_PRODUCTS.find((p) => p.id === id || p.slug === id);
}

export function getProductsByCategory(category: string): CocoaProduct[] {
  if (category === 'all') return COCOA_PRODUCTS;
  return COCOA_PRODUCTS.filter((p) => p.category === category);
}

export function getProductsByIndustry(industry: string): CocoaProduct[] {
  if (industry === 'all') return COCOA_PRODUCTS;
  return COCOA_PRODUCTS.filter((p) => p.industry.includes(industry as any));
}
