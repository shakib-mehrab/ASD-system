import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Pause, 
  Play, 
  Square, 
  Volume2, 
  VolumeX, 
  Maximize2,
  Activity,
  Heart,
  Brain,
  Eye,
  Timer,
  TrendingUp
} from 'lucide-react';

export default function PatientVRInterface() {
  const navigate = useNavigate();
  const location = useLocation();
  const sceneData = location.state?.scene || {
    id: 'VR001',
    name: 'Street Crossing Practice',
    category: 'Real-world Navigation'
  };

  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);
  const [heartRate, setHeartRate] = useState(85);
  const [focusLevel, setFocusLevel] = useState(78);
  const [engagement, setEngagement] = useState(82);
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

  // Simulate biometric updates
  useEffect(() => {
    const interval = setInterval(() => {
      setHeartRate(prev => Math.max(70, Math.min(110, prev + (Math.random() - 0.5) * 5)));
      setFocusLevel(prev => Math.max(60, Math.min(95, prev + (Math.random() - 0.5) * 10)));
      setEngagement(prev => Math.max(65, Math.min(98, prev + (Math.random() - 0.5) * 8)));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleExit = () => {
    setShowSummary(true);
  };

  const handleBackToDashboard = () => {
    navigate('/guardian/dashboard');
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* VR Viewport - Main Scene */}
      <div className="relative h-screen flex items-center justify-center">
        {/* 3D Scene Placeholder - Professional VR Look */}
        <div className="absolute inset-0 bg-gradient-to-b from-sky-400 via-sky-300 to-emerald-200">
          {/* Grid overlay for VR effect */}
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
                <p className="text-3xl font-bold text-white mb-2">{sceneData.name}</p>
                <p className="text-lg text-white/80">{sceneData.category}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Top Status Bar - Minimal & Clean */}
        <div className="absolute top-0 left-0 right-0 p-4 z-10">
          <div className="flex items-center justify-between">
            {/* Session Info */}
            <div className="flex gap-3">
              <div className="bg-black/40 backdrop-blur-md rounded-xl px-4 py-2 border border-white/20">
                <div className="flex items-center gap-2">
                  <Timer className="w-4 h-4 text-emerald-400" />
                  <span className="text-white font-mono text-lg">{formatTime(sessionTime)}</span>
                </div>
              </div>
              <div className="bg-black/40 backdrop-blur-md rounded-xl px-4 py-2 border border-white/20">
                <span className="text-white/80 text-sm">Scene: {sceneData.id}</span>
              </div>
            </div>

            {/* Quick Stats - Floating Pills */}
            <div className="flex gap-3">
              <div className="bg-gradient-to-br from-rose-500/80 to-pink-600/80 backdrop-blur-md rounded-full px-4 py-2 border border-white/20 shadow-lg">
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-white animate-pulse" />
                  <span className="text-white font-semibold">{Math.round(heartRate)} BPM</span>
                </div>
              </div>
              <div className="bg-gradient-to-br from-purple-500/80 to-indigo-600/80 backdrop-blur-md rounded-full px-4 py-2 border border-white/20 shadow-lg">
                <div className="flex items-center gap-2">
                  <Brain className="w-4 h-4 text-white" />
                  <span className="text-white font-semibold">{Math.round(focusLevel)}%</span>
                </div>
              </div>
              <div className="bg-gradient-to-br from-emerald-500/80 to-teal-600/80 backdrop-blur-md rounded-full px-4 py-2 border border-white/20 shadow-lg">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-white" />
                  <span className="text-white font-semibold">{Math.round(engagement)}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Immersive Control Panel - Bottom */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <div className="bg-black/60 backdrop-blur-xl rounded-3xl p-4 border border-white/20 shadow-2xl">
            <div className="flex items-center gap-4">
              {/* Pause/Play */}
              <button
                onClick={() => setIsPaused(!isPaused)}
                className="w-14 h-14 bg-gradient-to-br from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 rounded-2xl flex items-center justify-center transition-all transform hover:scale-105 shadow-lg"
                title={isPaused ? 'Resume' : 'Pause'}
              >
                {isPaused ? (
                  <Play className="w-7 h-7 text-white" fill="white" />
                ) : (
                  <Pause className="w-7 h-7 text-white" />
                )}
              </button>

              {/* Sound Toggle */}
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="w-14 h-14 bg-gradient-to-br from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 rounded-2xl flex items-center justify-center transition-all transform hover:scale-105 shadow-lg"
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? (
                  <VolumeX className="w-7 h-7 text-white" />
                ) : (
                  <Volume2 className="w-7 h-7 text-white" />
                )}
              </button>

              {/* Divider */}
              <div className="h-10 w-px bg-white/20" />

              {/* Fullscreen */}
              <button
                className="w-14 h-14 bg-gradient-to-br from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 rounded-2xl flex items-center justify-center transition-all transform hover:scale-105 shadow-lg"
                title="Fullscreen"
              >
                <Maximize2 className="w-6 h-6 text-white" />
              </button>

              {/* Divider */}
              <div className="h-10 w-px bg-white/20" />

              {/* Complete Session */}
              <button
                onClick={handleExit}
                className="px-8 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-2xl flex items-center gap-3 transition-all transform hover:scale-105 shadow-lg font-semibold"
              >
                <Square className="w-5 h-5" />
                Complete Session
              </button>
            </div>
          </div>
        </div>

        {/* Pause Overlay - Professional */}
        {isPaused && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-lg flex items-center justify-center z-20">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-12 text-center shadow-2xl max-w-md border border-white/10">
              <div className="w-20 h-20 bg-gradient-to-br from-sky-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Pause className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-4xl font-bold mb-3 text-white">Session Paused</h2>
              <p className="text-lg text-white/70 mb-8">Take a moment to breathe</p>
              <button
                onClick={() => setIsPaused(false)}
                className="w-full px-12 py-5 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white rounded-2xl text-xl font-semibold transition-all shadow-lg"
              >
                Resume Session
              </button>
            </div>
          </div>
        )}

        {/* VR Lens Effect Corners */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-32 h-32 border-t-4 border-l-4 border-white/20 rounded-tl-3xl" />
          <div className="absolute top-0 right-0 w-32 h-32 border-t-4 border-r-4 border-white/20 rounded-tr-3xl" />
          <div className="absolute bottom-0 left-0 w-32 h-32 border-b-4 border-l-4 border-white/20 rounded-bl-3xl" />
          <div className="absolute bottom-0 right-0 w-32 h-32 border-b-4 border-r-4 border-white/20 rounded-br-3xl" />
        </div>
      </div>

      {/* Session Completion Summary Modal - Guardian Friendly */}
      {showSummary && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Great Session!</h2>
              <p className="text-lg text-slate-600">Here's how your child did today</p>
            </div>

            {/* Session Overview */}
            <div className="bg-gradient-to-r from-sky-50 to-blue-50 rounded-xl p-6 mb-6 border border-sky-200">
              <h3 className="font-semibold text-slate-900 mb-4 text-lg">Session Summary</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4">
                  <div className="text-3xl font-bold text-sky-600 mb-1">
                    {Math.floor(sessionTime / 60)} min {sessionTime % 60} sec
                  </div>
                  <div className="text-sm text-slate-600">Practice Time</div>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <div className="text-3xl font-bold text-emerald-600 mb-1">{sceneData.name}</div>
                  <div className="text-sm text-slate-600">Activity</div>
                </div>
              </div>
            </div>

            {/* Performance Metrics - Simple Language */}
            <div className="space-y-4 mb-6">
              <h3 className="font-semibold text-slate-900 text-lg">How They Did</h3>
              
              {/* Focus */}
              <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Brain className="w-5 h-5 text-purple-600" />
                    <span className="font-semibold text-slate-900">Attention & Focus</span>
                  </div>
                  <span className="text-2xl font-bold text-purple-600">{focusLevel}%</span>
                </div>
                <p className="text-sm text-slate-700">
                  {focusLevel >= 80 ? 
                    "Excellent! Your child stayed focused throughout the session." :
                    focusLevel >= 60 ?
                    "Good work! They maintained decent attention during activities." :
                    "They tried their best today. Focus can improve with more practice."}
                </p>
              </div>

              {/* Engagement */}
              <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-emerald-600" />
                    <span className="font-semibold text-slate-900">Participation</span>
                  </div>
                  <span className="text-2xl font-bold text-emerald-600">{engagement}%</span>
                </div>
                <p className="text-sm text-slate-700">
                  {engagement >= 80 ? 
                    "Amazing! They were actively involved and enjoying the experience." :
                    engagement >= 60 ?
                    "They participated well and showed interest in the activities." :
                    "Keep encouraging them! Engagement will grow with time."}
                </p>
              </div>

              {/* Comfort Level */}
              <div className="bg-sky-50 rounded-xl p-4 border border-sky-200">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-sky-600" />
                    <span className="font-semibold text-slate-900">Comfort Level</span>
                  </div>
                  <span className="text-2xl font-bold text-sky-600">
                    {heartRate <= 90 ? 'Relaxed' : heartRate <= 100 ? 'Normal' : 'Excited'}
                  </span>
                </div>
                <p className="text-sm text-slate-700">
                  {heartRate <= 90 ? 
                    "They felt comfortable and relaxed during the session." :
                    heartRate <= 100 ?
                    "Normal energy levels - they were engaged but calm." :
                    "High energy today! This is normal during exciting activities."}
                </p>
              </div>
            </div>

            {/* Encouragement Message */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-4 mb-6 border border-amber-200">
              <p className="text-sm text-slate-700 leading-relaxed">
                <strong className="text-amber-900">Keep it up!</strong> Regular practice helps build skills and confidence. 
                Consider trying this activity again in a few days to reinforce learning.
              </p>
            </div>

            {/* Action Button */}
            <button
              onClick={handleBackToDashboard}
              className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-xl font-semibold text-lg transition-all shadow-lg"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
