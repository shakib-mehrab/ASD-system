// Data service layer for managing JSON data with localStorage persistence
import type {
  Therapist,
  Patient,
  OnboardingQuestion,
  VRScene,
  SessionReport,
  OnboardingResult
} from '../types';

// Storage keys
const STORAGE_KEYS = {
  USERS: 'asd_users',
  QUESTIONS: 'asd_onboarding_questions',
  SCENES: 'asd_vr_scenes',
  REPORTS: 'asd_session_reports',
  ONBOARDING_RESULTS: 'asd_onboarding_results'
};

// Initialize data from JSON files and store in localStorage
async function initializeData() {
  try {
    // Check if data already exists in localStorage
    const hasUsers = localStorage.getItem(STORAGE_KEYS.USERS);
    
    if (!hasUsers) {
      // Load from JSON files
      const [usersRes, questionsRes, scenesRes, reportsRes] = await Promise.all([
        fetch('/data/users.json'),
        fetch('/data/onboarding_questions.json'),
        fetch('/data/vr_scenes.json'),
        fetch('/data/session_reports.json')
      ]);

      const [users, questions, scenes, reports] = await Promise.all([
        usersRes.json(),
        questionsRes.json(),
        scenesRes.json(),
        reportsRes.json()
      ]);

      // Store in localStorage
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
      localStorage.setItem(STORAGE_KEYS.QUESTIONS, JSON.stringify(questions));
      localStorage.setItem(STORAGE_KEYS.SCENES, JSON.stringify(scenes));
      localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(reports));
      localStorage.setItem(STORAGE_KEYS.ONBOARDING_RESULTS, JSON.stringify({ results: [] }));
    }
  } catch (error) {
    console.error('Failed to initialize data:', error);
    throw new Error('Data initialization failed');
  }
}

// User Management
export async function getAllUsers() {
  await initializeData();
  const data = localStorage.getItem(STORAGE_KEYS.USERS);
  return data ? JSON.parse(data) : { therapists: [], patients: [] };
}

export async function getTherapists(): Promise<Therapist[]> {
  const users = await getAllUsers();
  return users.therapists || [];
}

export async function getPatients(): Promise<Patient[]> {
  const users = await getAllUsers();
  return users.patients || [];
}

export async function getPatientById(id: string): Promise<Patient | null> {
  const patients = await getPatients();
  return patients.find(p => p.id === id) || null;
}

export async function getPatientsByTherapist(therapistId: string): Promise<Patient[]> {
  const patients = await getPatients();
  return patients.filter(p => p.assignedTherapist === therapistId);
}

export async function getPatientByGuardianPhone(phone: string): Promise<Patient | null> {
  const patients = await getPatients();
  return patients.find(p => p.guardianPhone === phone) || null;
}

export async function updatePatient(patientId: string, updates: Partial<Patient>): Promise<Patient> {
  const users = await getAllUsers();
  const patientIndex = users.patients.findIndex((p: Patient) => p.id === patientId);
  
  if (patientIndex === -1) {
    throw new Error('Patient not found');
  }
  
  users.patients[patientIndex] = { ...users.patients[patientIndex], ...updates };
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  
  return users.patients[patientIndex];
}

export async function addPatient(patient: Patient): Promise<Patient> {
  const users = await getAllUsers();
  users.patients.push(patient);
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  console.log('✅ Patient added successfully:', patient.id);
  return patient;
}

// Authentication
export async function authenticateTherapist(id: string, phone: string): Promise<Therapist | null> {
  const therapists = await getTherapists();
  const therapist = therapists.find(t => t.id === id && t.phone === phone);
  return therapist || null;
}

export async function authenticateGuardian(patientId: string, phone: string): Promise<{ patient: Patient; guardian: { name: string; phone: string } } | null> {
  const patient = await getPatientById(patientId);
  
  if (patient && patient.guardianPhone === phone) {
    return {
      patient,
      guardian: {
        name: patient.guardianName,
        phone: patient.guardianPhone
      }
    };
  }
  
  return null;
}

// Onboarding Questions
export async function getOnboardingQuestions(): Promise<OnboardingQuestion[]> {
  await initializeData();
  const data = localStorage.getItem(STORAGE_KEYS.QUESTIONS);
  const questions = data ? JSON.parse(data) : { questions: [] };
  return questions.questions || [];
}

export async function saveOnboardingResult(result: OnboardingResult): Promise<void> {
  await initializeData();
  const data = localStorage.getItem(STORAGE_KEYS.ONBOARDING_RESULTS);
  const results = data ? JSON.parse(data) : { results: [] };
  
  // Remove existing result for this patient if any
  results.results = results.results.filter((r: OnboardingResult) => r.patientId !== result.patientId);
  results.results.push(result);
  
  localStorage.setItem(STORAGE_KEYS.ONBOARDING_RESULTS, JSON.stringify(results));
  
  // Update patient's onboarding status
  await updatePatient(result.patientId, { hasCompletedOnboarding: true });
}

export async function getOnboardingResult(patientId: string): Promise<OnboardingResult | null> {
  await initializeData();
  const data = localStorage.getItem(STORAGE_KEYS.ONBOARDING_RESULTS);
  const results = data ? JSON.parse(data) : { results: [] };
  
  return results.results.find((r: OnboardingResult) => r.patientId === patientId) || null;
}

// VR Scenes
export async function getVRScenes(): Promise<VRScene[]> {
  await initializeData();
  const data = localStorage.getItem(STORAGE_KEYS.SCENES);
  const scenes = data ? JSON.parse(data) : { scenes: [] };
  return scenes.scenes || [];
}

export async function getVRSceneById(id: string): Promise<VRScene | null> {
  const scenes = await getVRScenes();
  return scenes.find(s => s.id === id) || null;
}

// Session Reports
export async function getSessionReports(): Promise<SessionReport[]> {
  await initializeData();
  const data = localStorage.getItem(STORAGE_KEYS.REPORTS);
  const reports = data ? JSON.parse(data) : { reports: [] };
  return reports.reports || [];
}

export async function getSessionReportsByPatient(patientId: string): Promise<SessionReport[]> {
  const reports = await getSessionReports();
  return reports.filter(r => r.patientId === patientId);
}

export async function getSessionReportsByTherapist(therapistId: string): Promise<SessionReport[]> {
  const reports = await getSessionReports();
  return reports.filter(r => r.therapistId === therapistId);
}

export async function addSessionReport(report: SessionReport): Promise<SessionReport> {
  await initializeData();
  const data = localStorage.getItem(STORAGE_KEYS.REPORTS);
  const reports = data ? JSON.parse(data) : { reports: [] };
  
  reports.reports.push(report);
  localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(reports));
  
  return report;
}

export async function getLatestSessionReport(patientId: string): Promise<SessionReport | null> {
  const reports = await getSessionReportsByPatient(patientId);
  if (reports.length === 0) return null;
  
  return reports.sort((a, b) => 
    new Date(b.sessionDate).getTime() - new Date(a.sessionDate).getTime()
  )[0];
}

// Utility function to generate unique IDs
export function generateId(prefix: string): string {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `${prefix}${timestamp}${random}`;
}

// Clear all data (useful for testing)
export function clearAllData(): void {
  Object.values(STORAGE_KEYS).forEach(key => {
    localStorage.removeItem(key);
  });
}

// Export storage keys for direct access if needed
export { STORAGE_KEYS };
