// TypeScript interfaces for the application data models

export interface Therapist {
  id: string;
  name: string;
  phone: string;
  role: 'therapist';
  specialization: string;
  yearsExperience: number;
  email: string;
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  age: number;
  guardianName: string;
  guardianPhone: string;
  guardianEmail: string;
  primaryDiagnosis: string;
  secondaryDiagnosis?: string;
  assignedTherapist: string;
  enrollmentDate: string;
  therapyGoals: string[];
  sensoryProfile: SensoryProfile;
  hasCompletedOnboarding: boolean;
}

export interface SensoryProfile {
  soundSensitivity: 'low' | 'medium' | 'high';
  visualSensitivity: 'low' | 'medium' | 'high';
  tactileSensitivity: 'low' | 'medium' | 'high';
  preferredEnvironments: string[];
}

export interface OnboardingQuestion {
  id: string;
  category: string;
  question: string;
  options: QuestionOption[];
  recommendedScenes: Record<string, string[]>;
}

export interface QuestionOption {
  value: string;
  label: string;
  score: number;
}

export interface VRScene {
  id: string;
  name: string;
  description: string;
  category: string;
  difficulty: string;
  duration: number;
  targetSkills: string[];
  abaParameters: ABAParameters;
  environmentSettings: Record<string, EnvironmentSetting>;
  preferences: Record<string, EnvironmentSetting>;
}

export interface ABAParameters {
  targetBehavior: string;
  measurementType: 'frequency' | 'duration' | 'latency' | 'task_analysis';
  promptLevels: string[];
}

export interface EnvironmentSetting {
  min?: number;
  max?: number;
  default: number | string;
  unit?: string;
  options?: string[];
}

export interface SessionReport {
  id: string;
  patientId: string;
  therapistId: string;
  sceneId: string;
  sessionDate: string;
  duration: number;
  completionStatus: 'completed' | 'interrupted' | 'incomplete';
  environmentSettings: Record<string, any>;
  abaData: ABAData;
  behavioralObservations: BehavioralObservations;
  therapistNotes: string;
  recommendationsForNext: string;
}

export interface ABAData {
  targetBehavior: string;
  measurementType: string;
  baseline: number;
  achieved: number;
  unit: string;
  promptsUsed: string[];
  independentTrials: number;
  promptedTrials: number;
  percentageIndependent: number;
}

export interface BehavioralObservations {
  positiveResponses: number;
  challengingBehaviors: number;
  emotionalState: string;
  engagementLevel: string;
}

export interface User {
  id: string;
  name: string;
  phone: string;
  role: 'therapist' | 'guardian';
  patientId?: string; // For guardians
}

export interface OnboardingResponse {
  questionId: string;
  selectedValue: string;
  score: number;
}

export interface OnboardingResult {
  patientId: string;
  responses: OnboardingResponse[];
  totalScore: number;
  recommendedScenes: string[];
  completedDate: string;
}
