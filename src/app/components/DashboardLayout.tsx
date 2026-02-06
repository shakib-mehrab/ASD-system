import { ReactNode } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from './ui/button';
import { 
  LayoutDashboard, 
  Users, 
  Activity, 
  BarChart3, 
  Settings, 
  LogOut,
  Brain,
  Gamepad2,
  Home,
  Calendar,
  BookOpen,
  Heart
} from 'lucide-react';
import { cn } from './ui/utils';

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, role, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const therapistNavItems = [
    { path: '/therapist/patients', icon: Users, label: 'Patients' },
    { path: '/therapist/vr-control', icon: Gamepad2, label: 'VR Control' },
    { path: '/therapist/ai-dashboard', icon: Brain, label: 'AI Insights' },
    { path: '/therapist/reports', icon: BarChart3, label: 'Reports' }
  ];

  const guardianNavItems = [
    { path: '/guardian/dashboard', icon: Home, label: 'Dashboard' },
    { path: '/guardian/practice', icon: Gamepad2, label: 'VR Practice' },
    { path: '/guardian/sessions', icon: Calendar, label: 'Sessions' },
    { path: '/guardian/progress', icon: Activity, label: 'Progress' },
    { path: '/guardian/resources', icon: BookOpen, label: 'Resources' }
  ];

  const navItems = role === 'therapist' ? therapistNavItems : guardianNavItems;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Sidebar */}
      <aside className={cn(
        "fixed left-0 top-0 h-full w-64 border-r shadow-xl z-50",
        role === 'therapist' 
          ? "bg-gradient-to-b from-sky-600 to-indigo-700" 
          : "bg-gradient-to-b from-amber-500 to-orange-600"
      )}>
        {/* Logo/Brand */}
        <div className="p-6 border-b border-white/20">
          <div className="flex items-center gap-3">
            {role === 'therapist' ? (
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
            ) : (
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
            )}
            <div>
              <h1 className="text-white font-bold text-lg">
                {role === 'therapist' ? 'Therapist Portal' : 'Guardian Portal'}
              </h1>
              <p className="text-white/70 text-xs">ASD Therapy System</p>
            </div>
          </div>
        </div>

        {/* User Info */}
        <div className="p-4 border-b border-white/20">
          <div className="bg-white/10 backdrop-blur rounded-xl p-3">
            <p className="text-white text-sm font-medium truncate">
              {user?.name}
            </p>
            <p className="text-white/70 text-xs truncate">
              {user?.phone}
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2 flex-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                  isActive 
                    ? "bg-white text-gray-900 shadow-lg font-medium" 
                    : "text-white/90 hover:bg-white/10 hover:text-white"
                )}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-white/20">
          <Button
            onClick={handleLogout}
            variant="ghost"
            className="w-full justify-start text-white hover:bg-white/10 hover:text-white"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 min-h-screen">
        {children}
      </main>
    </div>
  );
}
