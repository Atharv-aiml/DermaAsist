export interface User {
  id: string;
  email: string;
  fullName: string;
  phone?: string;
  dateOfBirth?: string;
  gender?: string;
  preferredLanguage: 'en' | 'hi';
  city?: string;
  state?: string;
  role: 'user' | 'admin';
  emailVerified: boolean;
  createdAt: string;
}

export interface Family {
  id: string;
  name: string;
  primaryUserId: string;
  members: FamilyMember[];
  createdAt: string;
}

export interface FamilyMember {
  id: string;
  familyId: string;
  userId?: string;
  name: string;
  age: number;
  gender: string;
  relationship: string;
  isAuthorized: boolean;
  createdAt: string;
}

export interface SkinAssessment {
  id: string;
  familyMemberId: string;
  userId: string;
  status: 'draft' | 'analyzing' | 'completed' | 'failed';
  bodyArea?: string;
  image?: SkinImage;
  questionnaire?: QuestionnaireAnswers;
  result?: AIResult;
  recommendations?: Recommendation[];
  createdAt: string;
}

export interface SkinImage {
  id: string;
  assessmentId: string;
  url: string;
  originalName: string;
  mimeType: string;
  fileSize: number;
  qualityMetrics?: ImageQualityMetrics;
  uploadedAt: string;
}

export interface ImageQualityMetrics {
  isAcceptable: boolean;
  blurScore: number;
  brightnessScore: number;
  issues: string[];
}

export interface QuestionnaireAnswers {
  id: string;
  assessmentId: string;
  answers: Record<string, any>;
  freeTextDescription?: string;
  language: string;
}

export interface AIResult {
  assessmentId: string;
  modelVersion: string;
  aiProvider: string;
  possibleConditions: PossibleCondition[];
  confidence: number;
  severity: 'mild' | 'moderate' | 'severe';
  urgency: 'low' | 'medium' | 'high' | 'emergency';
  symptomsSummary: string[];
  imageQuality: ImageQualityMetrics;
  redFlags: string[];
  recommendations: Recommendation[];
  disclaimer: string;
  analyzedAt: string;
}

export interface PossibleCondition {
  name: string;
  confidence: number;
  description: string;
}

export interface Recommendation {
  type: 'care' | 'medical' | 'lifestyle' | 'urgent';
  title: string;
  description: string;
  priority: number;
}

export interface Reminder {
  id: string;
  userId: string;
  familyMemberId?: string;
  name: string;
  description?: string;
  reminderTime: string;
  repeatSchedule: 'daily' | 'weekly' | 'custom' | 'once';
  startDate: string;
  endDate?: string;
  isActive: boolean;
  completions: ReminderCompletion[];
  createdAt: string;
}

export interface ReminderCompletion {
  id: string;
  reminderId: string;
  completionDate: string;
  completedAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'reminder' | 'assessment' | 'appointment' | 'family' | 'system';
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export interface Appointment {
  id: string;
  familyMemberId: string;
  type: 'in-person' | 'teleconsultation';
  doctorName?: string;
  appointmentDate: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
}
