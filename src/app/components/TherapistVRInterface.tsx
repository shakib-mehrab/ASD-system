import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Pause, 
  Play, 
  Square, 
  Volume2, 
  VolumeX,
  Settings,
  Activity,
  Heart,
  Brain,
  Eye,
  Timer,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Zap,
  Target,
  Users,
  MessageSquare
} from 'lucide-react';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import DemoNav from './DemoNav';

export default function TherapistVRInterface() {
  const navigate = useNavigate();
  const location = useLocation();
  const patientData = location.state?.patient || {
    id: 'P001',
    name: 'Emma Johnson'
  };

  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);
  const [heartRate, setHeartRate] = useState(85);
  const [focusLevel, setFocusLevel] = useState(78);
  const [engagement, setEngagement] = useState(82);
  const [stressLevel, setStressLevel] = useState(24);
  const [gazeTracking, setGazeTracking] = useState(88);
  const [completedTasks, setCompletedTasks] = useState(3);
  const [totalTasks] = useState(8);
  const [showSummary, setShowSummary] = useState(false);

  // Session timer
  useEffect(() => {
    if (!isPaused) {
      const timer = setInterval(() => {
        setSessionTime(prev => prev + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isPaused]);

  // Simulate real-time monitoring
  useEffect(() => {
    const interval = setInterval(() => {
      setHeartRate(prev => Math.max(70, Math.min(110, prev + (Math.random() - 0.5) * 5)));
      setFocusLevel(prev => Math.max(60, Math.min(95, prev + (Math.random() - 0.5) * 10)));
      setEngagement(prev => Math.max(65, Math.min(98, prev + (Math.random() - 0.5) * 8)));
      setStressLevel(prev => Math.max(10, Math.min(60, prev + (Math.random() - 0.5) * 5)));
      setGazeTracking(prev => Math.max(70, Math.min(100, prev + (Math.random() - 0.5) * 8)));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getStatusColor = (value: number, inverse = false) => {
    if (inverse) {
      if (value < 30) return 'text-emerald-500';
      if (value < 50) return 'text-amber-500';
      return 'text-rose-500';
    }
    if (value >= 80) return 'text-emerald-500';
    if (value >= 60) return 'text-amber-500';
    return 'text-rose-500';
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <DemoNav />
      
      <div className="flex h-[calc(100vh-80px)]">
        {/* Main VR Viewport - 70% */}
        <div className="flex-1 relative bg-gradient-to-b from-sky-400 via-sky-300 to-emerald-200">
          {/* Grid overlay */}
          <div className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
              backgroundSize: '50px 50px'
            }}
          />

          {/* Scene Content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-8xl mb-6">🏙️</div>
              <div className="bg-black/30 backdrop-blur-md rounded-2xl px-8 py-6 border border-white/20">
                <p className="text-3xl font-bold text-white mb-2">Street Crossing Practice</p>
                <p className="text-lg text-white/80">Patient View - Live Session</p>
              </div>
            </div>
          </div>

          {/* Session Timer Overlay */}
          <div className="absolute top-4 left-4">
            <div className="bg-black/60 backdrop-blur-md rounded-xl px-4 py-2 border border-white/20">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-rose-500 rounded-full animate-pulse" />
                <Timer className="w-4 h-4 text-white" />
                <span className="text-white font-mono text-lg font-bold">{formatTime(sessionTime)}</span>
              </div>
            </div>
          </div>

          {/* Patient Info Overlay */}
          <div className="absolute top-4 right-4">
            <div className="bg-black/60 backdrop-blur-md rounded-xl px-4 py-3 border border-white/20">
              <p className="text-white font-semibold">{patientData.name}</p>
              <p className="text-white/70 text-sm">{patientData.id}</p>
            </div>
          </div>

          {/* Control Bar */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="bg-black/60 backdrop-blur-xl rounded-3xl p-4 border border-white/20 shadow-2xl">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsPaused(!isPaused)}
                  className="w-14 h-14 bg-gradient-to-br from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 rounded-2xl flex items-center justify-center transition-all shadow-lg"
                >
                  {isPaused ? <Play className="w-7 h-7 text-white" fill="white" /> : <Pause className="w-7 h-7 text-white" />}
                </button>

                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="w-14 h-14 bg-gradient-to-br from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 rounded-2xl flex items-center justify-center transition-all shadow-lg"
                >
                  {isMuted ? <VolumeX className="w-7 h-7 text-white" /> : <Volume2 className="w-7 h-7 text-white" />}
                </button>

                <div className="h-10 w-px bg-white/20" />

                <button
                  className="w-14 h-14 bg-gradient-to-br from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 rounded-2xl flex items-center justify-center transition-all shadow-lg"
                >
                  <Settings className="w-6 h-6 text-white" />
                </button>

                <div className="h-10 w-px bg-white/20" />

                <button
                  onClick={() => navigate('/therapist/patients')}
                  className="px-8 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-2xl flex items-center gap-3 transition-all shadow-lg font-semibold"
                >
                  <Square className="w-5 h-5" />
                  End Session
                </button>
              </div>
            </div>
          </div>

          {/* VR Lens Corners */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 w-24 h-24 border-t-4 border-l-4 border-white/20 rounded-tl-3xl" />
            <div className="absolute top-0 right-0 w-24 h-24 border-t-4 border-r-4 border-white/20 rounded-tr-3xl" />
            <div className="absolute bottom-0 left-0 w-24 h-24 border-b-4 border-l-4 border-white/20 rounded-bl-3xl" />
            <div className="absolute bottom-0 right-0 w-24 h-24 border-b-4 border-r-4 border-white/20 rounded-br-3xl" />
          </div>

          {isPaused && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
              <div className="bg-slate-800 rounded-2xl p-8 border border-white/10">
                <Pause className="w-16 h-16 text-white mx-auto mb-4" />
                <p className="text-white text-2xl font-bold">Session Paused</p>
              </div>
            </div>
          )}
        </div>

        {/* Monitoring Panel - 30% */}
        <div className="w-[400px] bg-slate-800 border-l border-slate-700 overflow-y-auto">
          <div className="p-6 space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">Live Monitoring</h2>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-emerald-400 text-sm font-medium">Active</span>
              </div>
            </div>

            {/* Biometric Metrics */}
            <Card className="bg-slate-900/50 border-slate-700 p-4">
              <h3 className="text-sm font-semibold text-slate-300 mb-4 flex items-center gap-2">
                <Activity className="w-4 h-4" />
                Biometric Data
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white text-sm flex items-center gap-2">
                      <Heart className="w-4 h-4 text-rose-500" />
                      Heart Rate
                    </span>
                    <span className={`font-bold ${getStatusColor(100 - Math.abs(heartRate - 85))}`}>
                      {Math.round(heartRate)} BPM
                    </span>
                  </div>
                  <Progress value={heartRate} max={120} className="h-2" />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white text-sm flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-amber-500" />
                      Stress Level
                    </span>
                    <span className={`font-bold ${getStatusColor(stressLevel, true)}`}>
                      {Math.round(stressLevel)}%
                    </span>
                  </div>
                  <Progress value={stressLevel} className="h-2" />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white text-sm flex items-center gap-2">
                      <Eye className="w-4 h-4 text-sky-500" />
                      Gaze Tracking
                    </span>
                    <span className={`font-bold ${getStatusColor(gazeTracking)}`}>
                      {Math.round(gazeTracking)}%
                    </span>
                  </div>
                  <Progress value={gazeTracking} className="h-2" />
                </div>
              </div>
            </Card>

            {/* Cognitive Metrics */}
            <Card className="bg-slate-900/50 border-slate-700 p-4">
              <h3 className="text-sm font-semibold text-slate-300 mb-4 flex items-center gap-2">
                <Brain className="w-4 h-4" />
                Cognitive Performance
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white text-sm">Focus Level</span>
                    <span className={`font-bold ${getStatusColor(focusLevel)}`}>
                      {Math.round(focusLevel)}%
                    </span>
                  </div>
                  <Progress value={focusLevel} className="h-2" />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white text-sm">Engagement</span>
                    <span className={`font-bold ${getStatusColor(engagement)}`}>
                      {Math.round(engagement)}%
                    </span>
                  </div>
                  <Progress value={engagement} className="h-2" />
                </div>
              </div>
            </Card>

            {/* Task Progress */}
            <Card className="bg-slate-900/50 border-slate-700 p-4">
              <h3 className="text-sm font-semibold text-slate-300 mb-4 flex items-center gap-2">
                <Target className="w-4 h-4" />
                Task Progress
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-white text-sm">Completed Tasks</span>
                  <span className="text-emerald-400 font-bold">{completedTasks}/{totalTasks}</span>
                </div>
                <Progress value={(completedTasks / totalTasks) * 100} className="h-2" />
                
                <div className="pt-2 space-y-2">
                  <div className="flex items-center gap-2 text-xs">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    <span className="text-slate-300">Look before crossing</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    <span className="text-slate-300">Identify safe moment</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    <span className="text-slate-300">Wait for signal</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-4 h-4 border-2 border-slate-600 rounded-full" />
                    <span className="text-slate-500">Cross safely</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Real-time Alerts */}
            <Card className="bg-slate-900/50 border-slate-700 p-4">
              <h3 className="text-sm font-semibold text-slate-300 mb-4 flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Real-time Insights
              </h3>
              <div className="space-y-2">
                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3">
                  <p className="text-emerald-400 text-xs font-medium">Good eye contact maintained</p>
                </div>
                <div className="bg-sky-500/10 border border-sky-500/30 rounded-lg p-3">
                  <p className="text-sky-400 text-xs font-medium">Patient responding well to prompts</p>
                </div>
              </div>
            </Card>

            {/* Quick Actions */}
            <div className="space-y-2">
              <button className="w-full px-4 py-3 bg-sky-600 hover:bg-sky-700 text-white rounded-lg transition-all flex items-center justify-center gap-2 text-sm font-medium">
                <MessageSquare className="w-4 h-4" />
                Send Voice Prompt
              </button>
              <button className="w-full px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all flex items-center justify-center gap-2 text-sm font-medium">
                <Users className="w-4 h-4" />
                Adjust Scenario
              </button>
            </div>
          <