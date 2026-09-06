export interface ImageMetadata {
  filePath: string;
  mimeType: string;
  fileSize: number;
}

export interface ImageAnalysis {
  quality: ImageQualityResult;
  features: Record<string, any>;
}

export interface ImageQualityResult {
  isAcceptable: boolean;
  blurScore: number;
  brightnessScore: number;
  issues: string[];
}

export interface SymptomData {
  mainProblems: string[];
  duration: string;
  progression: string;
  severity: string;
  hasPain: boolean;
  hasItching: boolean;
  hasSwelling: boolean;
  hasBleeding: boolean;
  hasDischarge: boolean;
  hasTreatment: boolean;
  treatmentDescription?: string;
  freeTextDescription?: string;
  bodyArea?: string;
}

export interface SymptomAnalysis {
  identifiedSymptoms: string[];
  riskFactors: string[];
  urgencyIndicators: string[];
}

export interface PossibleCondition {
  name: string;
  confidence: number;
  description: string;
}

export interface Assessment {
  possibleConditions: PossibleCondition[];
  overallConfidence: number;
  severity: 'mild' | 'moderate' | 'severe';
  symptomsSummary: string[];
}

export interface RiskAssessment {
  urgency: 'low' | 'medium' | 'high' | 'emergency';
  redFlags: string[];
  requiresImmediateAttention: boolean;
}

export interface Recommendation {
  type: string;
  title: string;
  description: string;
  priority: number | string;
}

export interface FullAssessmentResult {
  modelVersion: string;
  aiProvider: string;
  possibleConditions: any[];
  confidence: number;
  severity: 'mild' | 'moderate' | 'severe';
  urgency: 'low' | 'medium' | 'high' | 'emergency';
  symptomsSummary: any;
  imageQuality: any;
  redFlags: string[];
  recommendations: Recommendation[];
  disclaimer: string;
}

export interface SkinAssessmentModel {
  readonly modelName?: string;
  readonly modelVersion?: string;
  readonly provider?: string;
  readonly datasetInfo?: string;

  analyzeImage?(imageData: Buffer, metadata: ImageMetadata): Promise<ImageAnalysis>;
  analyzeSymptoms?(symptoms: SymptomData): Promise<SymptomAnalysis>;
  generateAssessment?(imageAnalysis: ImageAnalysis, symptomAnalysis: SymptomAnalysis): Promise<Assessment>;
  calculateRisk?(assessment: Assessment, symptoms: SymptomData): Promise<RiskAssessment>;
  getRecommendations?(assessment: Assessment, risk: RiskAssessment): Promise<Recommendation[]>;
  getFullAssessment(imageData: Buffer, imageMetadata: ImageMetadata, symptoms: SymptomData): Promise<FullAssessmentResult>;
}

export type AIService = SkinAssessmentModel;
export type AIResult = FullAssessmentResult;
