import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Home, Users, Stethoscope, Shield
} from 'lucide-react';

export default function DemoNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/therapist/login', label: 'Therapist Portal', icon: Stethoscope },
    { path: '/guardian/login', label: 'Guardian Portal', icon: Users },
    { path: '/privacy-ethics', label: 'Privacy & Ethics', icon: Shield },
  ];

  return (
    <div className="bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex gap-3 justify-center items-center">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 font-medium ${
                  isActive 
                    ? 'bg-sky-600 text-white shadow-md' 
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
