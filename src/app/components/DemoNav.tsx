import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Home, Users, Stethoscope, PlayCircle, Target, 
  CheckCircle, Lock, UserCheck, Activity, Brain, 
  Settings, BarChart3, Shield
} from 'lucide-react';

export default function DemoNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    
    // Patient Portal
    { path: '/patient/session-start', label: 'Patient: Start', icon: Users },
    { path: '/patient/vr-session', label: 'Patient: VR', icon: PlayCircle },
    { path: '/patient/adaptive-guidance', label: 'Patient: Guidance', icon: Target },
    { path: '/patient/completion', label: 'Patient: Complete', icon: CheckCircle },
    
    // Therapist Portal
    { path: '/therapist/login', label: 'Therapist: Login', icon: Lock },
    { path: '/therapist/patients', label: 'Therapist: Patients', icon: UserCheck },
    { path: '/therapist/patient-detail', label: 'Therapist: Detail', icon: Activity },
    { path: '/therapist/ai-dashboard', label: 'Therapist: AI', icon: Brain },
    { path: '/therapist/configure', label: 'Therapist: Config', icon: Settings },
    { path: '/therapist/monitor', label: 'Therapist: Monitor', icon: Stethoscope },
    { path: '/therapist/reports', label: 'Therapist: Reports', icon: BarChart3 },
    
    // Shared
    { path: '/privacy-ethics', label: 'Privacy', icon: Shield },
  ];

  return (
    <div className="bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-3">
        <div className="flex gap-1 justify-center flex-wrap">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`px-3 py-2 rounded-xl transition-all flex items-center gap-2 ${
                  isActive 
                    ? 'bg-sky-600 text-white shadow-md' 
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
                title={item.label}
              >
                <Icon className="w-4 h-4" />
                <span className="text-xs hidden lg:inline">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
