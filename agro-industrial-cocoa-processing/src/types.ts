export type ProductCategory = 'beurres' | 'poudres' | 'masses';
export type IndustrySector = 'alimentaire' | 'cosmetique' | 'agricole';

// Legacy Aliases for existing mock components
export type CatalogCategory = ProductCategory;
export type CatalogIndustry = IndustrySector;
export type DerivativeCategory = 'liquor' | 'butter' | 'cake' | 'powder';

export interface ChemicalSpec {
  parameter: string;
  value: string;
  standardMethod?: string;
  unit?: string;
}

export interface IndustrialPackaging {
  format: string; // Ex: "Carton ondulé 25 kg avec poche intérieure PE thermoscellée"
  netWeightKg: number;
  grossWeightKg?: number;
  palletSpec: string; // Ex: "Palette Europe 1 000 kg net (40 cartons filmés)"
}

export interface CocoaProduct {
  id: string;
  slug: string;
  name: string;
  commercialName: string;
  subtitle: string;
  category: ProductCategory;
  industry: IndustrySector[];
  fatContentPercentage?: string;
  phRange?: string;
  inciName?: string;
  casNumber?: string;
  einecsNumber?: string;
  origin: string;
  moq: string;
  shelfLife: string;
  storageConditions: string;
  colorGrade: string;
  meltingPoint?: string;
  description: string;
  sensoryProfile: string;
  applications: string[];
  keyFeatures: string[];
  certifications: string[];
  specs: Record<string, string>;
  detailedSpecs: ChemicalSpec[];
  microbiologicalSpecs: {
    parameter: string;
    target: string;
    standardMethod: string;
  }[];
  contaminantsSpecs: {
    parameter: string;
    limit: string;
    compliance: string;
  }[];
  packaging: IndustrialPackaging[];
  image_url: string;
  macro_image_url: string;
  coaAvailable: boolean;
  tdsAvailable: boolean;
  tdsPdfUrl?: string;
  coaPdfUrl?: string;
}

// Backward-compatible alias for existing mock components
export type CatalogProduct = CocoaProduct;

export interface CocoaDerivative {
  id: string;
  sku: string;
  name: string;
  commercialName: string;
  category: DerivativeCategory;
  origin: string;
  processingMethod: string;
  fatContent: string;
  moisture: string;
  ph: string;
  fineness: string;
  freeFattyAcids: string;
  colorGrade: string;
  meltingPoint?: string;
  certifications: string[];
  packaging: string;
  shelfLife: string;
  applications: string[];
  description: string;
  lotInStock: string;
  coaAvailable: boolean;
  minOrderQty: string;
}

export interface PipelineStep {
  stepNumber: string;
  unitCode?: string;
  title: string;
  english: string;
  description: string;
  temperature: string;
  capacityPerHour: string;
  checkpoint: string;
  criticalParameters: string[];
  eudrRelevance: string;
}

export interface ProcessingBatch {
  lotCode: string;
  originCountry: string;
  cooperative: string;
  region: string;
  cropSeason: string;
  arrivalDate: string;
  releaseDate: string;
  status: 'VALIDÉ EXPORT' | 'CONTRÔLE LABORATOIRE' | 'EN MATURATION';
  moisturePercent: number;
  fermentationScore: number;
  cadmiumPpm: number;
  leadPpm: number;
  sensoryNotes: string[];
  beanCountPer100g: number;
  fsscSeal: string;
  allocatedDerivative: string;
  tankerVesselRef: string;
  gpsCoordinates?: {
    lat: number;
    lng: number;
    polygonPlotsCount: number;
  };
}

export interface LabAssayParameter {
  parameter: string;
  method: string;
  unit: string;
  liquorPure: string;
  butterDeodorized: string;
  powderNatural: string;
  powderAlkalized: string;
  powderBlackDutch: string;
  tolerance: string;
}

export interface CertificationBadge {
  id: string;
  name: string;
  organization: string;
  scope: string;
  validityYear: string;
  code: string;
  category: 'safety' | 'sustainability' | 'religious' | 'quality';
  description: string;
  authorizedClaim: string;
}

export interface LabAssayProtocol {
  parameter: string;
  standardMethod: string;
  unit: string;
  detectionEquipment: string;
  europeanRegulationLimit: string;
  internalFactoryThreshold: string;
  frequency: string;
  isoAccredited: boolean;
}

export interface RfqLeadPayload {
  requestType: 'quote' | 'sample' | 'contract';
  companyName: string;
  taxOrVatNumber: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  country: string;
  industrySector: string;
  selectedProductIds: string[];
  sampleSize?: '250g' | '500g' | '1kg';
  targetVolumeMetricTons?: string;
  preferredIncoterm?: 'FOB' | 'CIF' | 'EXW' | 'CFR';
  destinationPort?: string;
  projectDescription?: string;
  honeypot?: string;
}
