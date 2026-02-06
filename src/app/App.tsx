import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import { ProtectedRoute } from '../components/ProtectedRoute';
import LandingPage from './components/LandingPage';
import PatientSessionStart from './components/PatientSessionStart';
import PatientVRSession from './components/PatientVRSession';
import PatientVRInterface from './components/PatientVRInterface';
import PatientAdaptiveGuidance from './components/PatientAdaptiveGuidance';
import PatientSessionCompletion from './components/PatientSessionCompletion';
import TherapistLogin from './components/TherapistLogin';
import TherapistPatientList from './components/TherapistPatientList';
import TherapistPatientDetail from './components/TherapistPatientDetail';
import TherapistAIDashboard from './components/TherapistAIDashboard';
import TherapistReports from './components/TherapistReports';
import { TherapistVRControl } from './components/TherapistVRControl';
import TherapistVRInterface from './components/TherapistVRInterface';
import { GuardianLogin } from './components/GuardianLogin';
import { GuardianOnboarding } from './components/GuardianOnboarding';
import { GuardianDashboard } from './components/GuardianDashboard';
import { GuardianSessions } from './components/GuardianSessions';
import { GuardianProgress } from './components/GuardianProgress';
import { GuardianResources } from './components/GuardianResources';
import { GuardianPractice } from './components/GuardianPractice';
import TherapistPatientOnboarding from './components/TherapistPatientOnboarding';
import PrivacyEthics from './components/PrivacyEthics';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          
          {/* Patient Portal Routes (Public for demo) */}
          <Route path="/patient/session-start" element={<PatientSessionStart />} />
          <Route path="/patient/vr-session" element={<PatientVRSession />} />
          <Route path="/patient/vr-interface" element={<PatientVRInterface />} />
          <Route path="/patient/adaptive-guidance" element={<PatientAdaptiveGuidance />} />
          <Route path="/patient/completion" element={<PatientSessionCompletion />} />
          
          {/* Therapist Authentication */}
          <Route path="/therapist/login" element={<TherapistLogin />} />
          
          {/* Protected Therapist Routes */}
          <Route path="/therapist/patients" element={
            <ProtectedRoute requiredRole="therapist">
              <TherapistPatientList />
            </ProtectedRoute>
          } />
          <Route path="/therapist/patient-detail" element={
            <ProtectedRoute requiredRole="therapist">
              <TherapistPatientDetail />
            </ProtectedRoute>
          } />
          <Route path="/therapist/ai-dashboard" element={
            <ProtectedRoute requiredRole="therapist">
              <TherapistAIDashboard />
            </ProtectedRoute>
          } />
          <Route path="/therapist/vr-control" element={
            <ProtectedRoute requiredRole="therapist">
              <TherapistVRControl />
            </ProtectedRoute>
          } />
          <Route path="/therapist/vr-interface" element={
            <ProtectedRoute requiredRole="therapist">
              <TherapistVRInterface />
            </ProtectedRoute>
          } />
          <Route path="/therapist/reports" element={
            <ProtectedRoute requiredRole="therapist">
              <TherapistReports />
            </ProtectedRoute>
          } />
          <Route path="/therapist/patient-onboarding" element={
            <ProtectedRoute requiredRole="therapist">
              <TherapistPatientOnboarding />
            </ProtectedRoute>
          } />
          
          {/* Guardian Authentication */}
          <Route path="/guardian/login" element={<GuardianLogin />} />
          
          {/* Protected Guardian Routes */}
          <Route path="/guardian/onboarding" element={
            <ProtectedRoute requiredRole="guardian">
              <GuardianOnboarding />
            </ProtectedRoute>
          } />
          <Route path="/guardian/dashboard" element={
            <ProtectedRoute requiredRole="guardian">
              <GuardianDashboard />
            </ProtectedRoute>
          } />
          <Route path="/guardian/practice" element={
            <ProtectedRoute requiredRole="guardian">
              <GuardianPractice />
            </ProtectedRoute>
          } />
          <Route path="/guardian/sessions" element={
            <ProtectedRoute requiredRole="guardian">
              <GuardianSessions />
            </ProtectedRoute>
          } />
          <Route path="/guardian/progress" element={
            <ProtectedRoute requiredRole="guardian">
              <GuardianProgress />
            </ProtectedRoute>
          } />
          <Route path="/guardian/resources" element={
            <ProtectedRoute requiredRole="guardian">
              <GuardianResources />
            </ProtectedRoute>
          } />
          
          {/* Shared Routes */}
          <Route path="/privacy-ethics" element={<PrivacyEthics />} />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
