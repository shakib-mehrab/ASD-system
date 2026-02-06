# ASD Therapy System - Dual-User Implementation

A comprehensive VR therapy management system for Autism Spectrum Disorder (ASD) with separate portals for **Therapists** and **Guardians**, featuring AI-driven adaptive guidance, real-time session monitoring, and ABA-compliant reporting.

## 🎯 Key Features

### Therapist Portal
- **Patient Management Dashboard** - View all assigned patients with readiness indicators
- **Universal VR Control Panel** - Configure and conduct VR therapy sessions with:
  - Patient selection
  - VR scene selection (10 therapeutic scenarios)
  - Real-time parameter adjustments (sound, lighting, crowd density)
  - ABA data tracking (frequency, duration, latency, task analysis)
  - Session report generation
- **AI Insights Dashboard** - Readiness scores and predictive analytics
- **Progress Reports** - Long-term tracking with charts and trends

### Guardian Portal
- **Initial Assessment (CRP)** - 12-question Comprehensive Rehabilitation Plan questionnaire
- **Dashboard** - Visual progress tracking with gamified metrics:
  - Session completion stats
  - Engagement levels
  - Independence rates
  - Goal achievements
- **Session History** - View past VR session reports in parent-friendly language
- **Upcoming Sessions** - Calendar view of scheduled therapy

## 🚀 Quick Start

### Installation
```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## 🔐 Demo Credentials

### Therapist Login
- **Therapist 1**: ID: `T001` | Phone: `+1-555-0101`
- **Therapist 2**: ID: `T002` | Phone: `+1-555-0102`

### Guardian Login (Patient ID + Guardian Phone)
- **Patient 1**: ID: `P001` | Phone: `+1-555-1001` (Emma Johnson - Completed Onboarding)
- **Patient 2**: ID: `P002` | Phone: `+1-555-1002` (Liam Martinez - Completed Onboarding)
- **Patient 3**: ID: `P003` | Phone: `+1-555-1003` (Sophia Patel - Completed Onboarding)
- **Patient 4**: ID: `P004` | Phone: `+1-555-1004` (Noah Thompson - **Needs Onboarding**)

**OTP Verification**: Enter any 4-digit code (mock authentication)

## 📋 Demo Walkthrough

### For Therapists

1. **Login**
   - Go to Landing Page → Select "Therapist"
   - Enter credentials (T001 / +1-555-0101)
   - Enter any 4-digit OTP code

2. **View Patients**
   - Dashboard loads with all assigned patients
   - See patient cards with diagnosis, age, guardian info
   - Check onboarding status badges

3. **Conduct VR Session**
   - Navigate to "VR Control" in sidebar
   - Select a patient (e.g., P001 - Emma)
   - Choose a VR scene (e.g., "Supermarket Interaction")
   - Adjust clinical parameters:
     - Crowd Density: 0-100%
     - Sound Level: 0-100 dB
     - Lighting Brightness: 0-100%
     - Time of Day: Morning/Afternoon/Evening
   - Start Session
   - Enter ABA tracking data:
     - Baseline vs Achieved metrics
     - Independent vs Prompted trials
     - Positive responses & challenging behaviors
     - Session notes
   - End Session → Report saved to patient history

4. **Review AI Insights**
   - Navigate to "AI Insights"
   - View readiness scores and trends
   - See AI-generated recommendations

5. **Generate Reports**
   - Navigate to "Reports"
   - View progress charts and analytics

### For Guardians

#### Scenario A: New Patient (Needs Onboarding)

1. **Login**
   - Go to Landing Page → Select "Parent / Guardian"
   - Enter Patient ID: `P004` | Phone: `+1-555-1004`
   - Enter any 4-digit OTP code

2. **Complete Assessment**
   - Answer 12 CRP questions about child's behavior
   - Questions cover:
     - Social interaction
     - Eye contact
     - Sensory sensitivities
     - Communication skills
     - Emotional regulation
     - Focus and attention
   - View recommended VR scenes based on responses
   - Redirected to Dashboard

#### Scenario B: Existing Patient (Completed Onboarding)

1. **Login**
   - Use Patient ID: `P001` | Phone: `+1-555-1001`
   - Enter any 4-digit OTP code

2. **View Dashboard**
   - See colorful stat cards:
     - Sessions Completed: 2 (for P001)
     - Engagement Level: 75%
     - Independence Rate: 61%
     - Goals Achieved: 0
   - Review current therapy goals
   - Check upcoming sessions
   - View recent session reports with:
     - Success badges (Excellent! / Great Progress / Good Effort)
     - Independence percentage
     - Positive behaviors count
     - Session duration
     - Therapist notes

## 🗂️ Data Architecture

### Mock JSON Files (Located in `/public/data/`)

1. **users.json**
   - 2 Therapists (T001, T002)
   - 4 Patients (P001-P004) with guardian details
   - Fields: ID, name, phone, diagnosis, sensory profile, therapy goals

2. **onboarding_questions.json**
   - 12 CRP questions
   - Multiple choice options with scoring
   - Recommended VR scenes mapping

3. **vr_scenes.json**
   - 10 therapeutic VR scenarios:
     1. Supermarket Interaction
     2. Eye Contact Trainer
     3. Sensory Classroom
     4. Emotion Recognition Garden
     5. Playground Social Navigator
     6. Restaurant Etiquette
     7. Task Completion Challenge
     8. Birthday Party Simulation
     9. Transition Training Center
     10. Safe Space Explorer
   - Each with: difficulty, duration, ABA parameters, environment settings, preferences

4. **session_reports.json**
   - Sample session reports with ABA data
   - Fields: patient/therapist IDs, scene ID, duration, completion status, behavioral observations

### Data Persistence

- **localStorage** is used for persistence (simulates backend database)
- On first load, JSON files are imported into localStorage
- All CRUD operations update localStorage
- Data survives page refreshes

## 🏗️ Technical Architecture

### State Management
- **AuthContext**: Global authentication state
  - User sessions (therapist/guardian)
  - Role-based access control
  - Patient context for guardians

### Authentication Flow
1. User enters ID + Phone
2. Mock OTP sent (accept any 4-digit code)
3. Credentials verified against users.json
4. Session stored in localStorage
5. Protected routes enforce role-based access

### Components Structure

```
src/
├── app/
│   └── components/
│       ├── LandingPage.tsx (Role selection)
│       ├── DashboardLayout.tsx (Sidebar navigation)
│       ├── TherapistLogin.tsx
│       ├── TherapistPatientList.tsx
│       ├── TherapistVRControl.tsx (NEW)
│       ├── TherapistAIDashboard.tsx
│       ├── TherapistReports.tsx
│       ├── GuardianLogin.tsx (NEW)
│       ├── GuardianOnboarding.tsx (NEW)
│       ├── GuardianDashboard.tsx (NEW)
│       └── [Patient components...]
├── contexts/
│   └── AuthContext.tsx (NEW)
├── components/
│   └── ProtectedRoute.tsx (NEW)
├── services/
│   └── dataService.ts (NEW - CRUD operations)
└── types/
    └── index.ts (NEW - TypeScript interfaces)
```

### Navigation

#### Therapist Sidebar
- Patients
- VR Control
- AI Insights
- Reports
- Logout

#### Guardian Sidebar
- Dashboard
- Sessions
- Progress
- Resources
- Logout

## 🎨 UI/UX Design

### Therapist Portal
- **Color Scheme**: Clinical blues and greens (Sky/Emerald)
- **Style**: Professional, data-dense
- **Features**: Charts, metrics, detailed controls

### Guardian Portal
- **Color Scheme**: Warm ambers and oranges
- **Style**: Friendly, visual, gamified
- **Features**: Icons, badges, celebratory language

## 🔧 Key Technologies

- **React 18** + **TypeScript**
- **Vite** (Build tool)
- **React Router DOM 7** (Routing)
- **Tailwind CSS** (Styling)
- **Radix UI** (UI Components - shadcn/ui pattern)
- **Recharts** (Data visualization)
- **Lucide React** (Icons)
- **date-fns** (Date formatting)

## 📊 ABA Parameters

The system tracks Applied Behavior Analysis metrics:

- **Frequency**: Number of occurrences of target behavior
- **Duration**: Length of time behavior is maintained
- **Latency**: Time between prompt and response
- **Task Analysis**: Steps completed in multi-step tasks
- **Prompt Levels**: Full physical → Partial → Gestural → Verbal → Independent
- **Percentage Independent**: (Independent Trials / Total Trials) × 100

## 🔒 Security & Privacy

- Mock authentication (production would use real OTP/2FA)
- HIPAA-compliant design patterns
- Role-based access control
- Session management
- No actual PHI in demo data

## 🚧 Future Enhancements

- Real backend integration (Node.js + PostgreSQL)
- Actual OTP/SMS integration
- Real-time WebSocket for live monitoring
- Video recording of VR sessions
- Parent mobile app
- Multi-language support
- Export reports to PDF
- Calendar integration for appointments

## 📝 Notes

- **No Backend**: All data is stored in localStorage
- **Mock Authentication**: Any 4-digit OTP works
- **Demo Data**: Pre-seeded with 2 therapists, 4 patients, 10 scenes
- **Onboarding Logic**: P004 requires onboarding; others skip to dashboard

## 🎓 Educational Value

This project demonstrates:
- Complex state management
- Role-based authentication
- Protected routing
- Form validation
- Data persistence patterns
- Dashboard design
- TypeScript interfaces
- Component composition
- Responsive design
- Accessibility considerations

---

**Built with ❤️ for ASD therapy support**
