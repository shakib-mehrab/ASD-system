import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Activity, Pause, Square, AlertTriangle, 
  CheckCircle, Eye, Volume2, TrendingDown, Shield 
} from 'lucide-react';
import DemoNav from './DemoNav';

export default function TherapistLiveMonitoring() {
  const navigate = useNavigate();
  const [isSessionActive, setIsSessionActive] = useState(true);
  const [sessionTime, setSessionTime] = useState(0);
  const [heartRate, setHeartRate] = useState(78);
  const [stressLevel, setStressLevel] = useState(25);

  useEffect(() => {
    if (isSessionActive) {
      const timer = setInterval(() => {
        setSessionTime((prev) => prev + 1);
        // Simulate varying metrics
        setHeartRate(75 + Math.floor(Math.random() * 10));
        setStressLevel(20 + Math.floor(Math.random() * 15));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isSessionActive]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePauseSession = () => {
    setIsSessionActive(!isSessionActive);
  };

  const handleStopSession = () => {
    navigate('/therapist/reports');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-emerald-50">
      <DemoNav />
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div>
            <h1 className="text-3xl mb-1 text-slate-900">Live Session Monitoring</h1>
            <p className="text-slate-600">Patient: Child A (ASD-047) • Scenario: Street Crossing</p>
          </div>

          <div className="flex items-center gap-2">
            <div className={`px-4 py-2 rounded-xl ${isSessionActive ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${isSessionActive ? 'bg-emerald-600 animate-pulse' : 'bg-amber-600'}`}></div>
                {isSessionActive ? 'Session Active' : 'Session Paused'}
              </div>
            </div>
            <div className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl">
              {formatTime(sessionTime)}
            </div>
          </div>
        </div>

        {/* Emergency Controls */}
        <div className="bg-white border-2 border-slate-200 rounded-2xl shadow-md p-6 mb-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-emerald-600" />
              <div>
                <h2 className="text-lg text-slate-900">Session Controls</h2>
                <p className="text-sm text-slate-600">Therapist maintains full authority</p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handlePauseSession}
                className="px-6 py-3 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-xl transition-all flex items-center gap-2 border-2 border-amber-300"
              >
                <Pause className="w-5 h-5" />
                {isSessionActive ? 'Pause' : 'Resume'}
              </button>
              <button
                onClick={handleStopSession}
                className="px-6 py-3 bg-red-100 hover:bg-red-200 text-red-900 rounded-xl transition-all flex items-center gap-2 border-2 border-red-300"
              >
                <Square className="w-5 h-5" />
                Stop Session
              </button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Real-time Metrics */}
          <div className="lg:col-span-2 space-y-6">
            {/* VR View Placeholder */}
            <div className="bg-slate-900 rounded-2xl shadow-lg aspect-video flex items-center justify-center relative overflow-hidden">
              <div className="text-center">
                <p className="text-3xl mb-3">🚦</p>
                <p className="text-white text-lg">VR Environment Feed</p>
                <p className="text-slate-400 text-sm">Street Crossing Scenario</p>
              </div>
              
              {/* Overlay Info */}
              <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-xl text-white text-sm">
                Current Task: Look both ways
              </div>
              
              <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-xl text-white text-sm">
                Difficulty: Level 3
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-xl mb-4 text-slate-900">Session Progress</h2>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-slate-600">Task Completion</span>
                    <span className="text-sm text-slate-900">3/5 steps</span>
                  </div>
                  <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-slate-600">Response Accuracy</span>
                    <span className="text-sm text-slate-900">85%</span>
                  </div>
                  <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-sky-500 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-slate-600">Engagement Level</span>
                    <span className="text-sm text-slate-900">High</span>
                  </div>
                  <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-violet-500 rounded-full" style={{ width: '90%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Monitoring Dashboard */}
          <div className="space-y-6">
            {/* Vital Signs */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <div className="flex items-center gap-2 mb-4">
                <Activity className="w-5 h-5 text-sky-600" />
                <h2 className="text-lg text-slate-900">Vital Signs</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-slate-600">Heart Rate</span>
                    <span className="text-lg text-slate-900">{heartRate} bpm</span>
                  </div>
                  <p className="text-xs text-emerald-600">Normal range</p>
                </div>

                <div className="border-t border-slate-100 pt-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-slate-600">Stress Level</span>
                    <span className="text-lg text-slate-900">{stressLevel}%</span>
                  </div>
                  <p className="text-xs text-emerald-600">Within comfort zone</p>
                </div>
              </div>
            </div>

            {/* Sensory Status */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <div className="flex items-center gap-2 mb-4">
                <Eye className="w-5 h-5 text-violet-600" />
                <h2 className="text-lg text-slate-900">Sensory Status</h2>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-xl">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span className="text-sm text-slate-700">Visual</span>
                  </div>
                  <span className="text-xs text-emerald-700 bg-emerald-100 px-2 py-1 rounded-lg">Normal</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-xl">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span className="text-sm text-slate-700">Auditory</span>
                  </div>
                  <span className="text-xs text-emerald-700 bg-emerald-100 px-2 py-1 rounded-lg">Normal</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-sky-50 rounded-xl">
                  <div className="flex items-center gap-2">
                    <Volume2 className="w-4 h-4 text-sky-600" />
                    <span className="text-sm text-slate-700">Motion</span>
                  </div>
                  <span className="text-xs text-sky-700 bg-sky-100 px-2 py-1 rounded-lg">Comfortable</span>
                </div>
              </div>
            </div>

            {/* AI Alerts */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                <h2 className="text-lg text-slate-900">AI Alerts</h2>
              </div>

              <div className="space-y-2">
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span className="text-sm text-emerald-900">All Systems Normal</span>
                  </div>
                  <p className="text-xs text-emerald-700">No interventions needed</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-lg mb-4 text-slate-900">Quick Actions</h2>
              
              <div className="space-y-2">
                <button className="w-full py-3 px-4 bg-sky-50 hover:bg-sky-100 text-sky-900 rounded-xl transition-colors text-left flex items-center gap-3">
                  <TrendingDown className="w-5 h-5" />
                  Reduce Difficulty
                </button>
                
                <button className="w-full py-3 px-4 bg-violet-50 hover:bg-violet-100 text-violet-900 rounded-xl transition-colors text-left flex items-center gap-3">
                  <Volume2 className="w-5 h-5" />
                  Lower Audio
                </button>
                
                <button className="w-full py-3 px-4 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 rounded-xl transition-colors text-left flex items-center gap-3">
                  <Eye className="w-5 h-5" />
                  Simplify Visuals
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
