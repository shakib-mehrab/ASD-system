import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Activity, ArrowLeft, Play, Pause, Settings, AlertCircle, 
  CheckCircle, TrendingDown, Volume2, Eye, Target 
} from 'lucide-react';
// import DemoNav from '@/app/components/DemoNav';
import DemoNav from './DemoNav';

export default function VRSessionStatus() {
  const navigate = useNavigate();
  const [isRunning, setIsRunning] = useState(true);
  const [sessionTime, setSessionTime] = useState(0);
  const [stressLevel, setStressLevel] = useState(35);
  const [taskDifficulty, setTaskDifficulty] = useState(3);
  const [sensoryIntensity, setSensoryIntensity] = useState(2);
  const [alertShown, setAlertShown] = useState(false);

  useEffect(() => {
    let interval: number;
    if (isRunning) {
      interval = setInterval(() => {
        setSessionTime(prev => prev + 1);
        
        // Simulate stress level changes
        setStressLevel(prev => {
          const newValue = prev + (Math.random() * 10 - 5);
          return Math.max(0, Math.min(100, newValue));
        });

        // Show alert at 15 seconds
        if (sessionTime === 15 && !alertShown) {
          setAlertShown(true);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, sessionTime, alertShown]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleReduceDifficulty = () => {
    if (taskDifficulty > 1) {
      setTaskDifficulty(prev => prev - 1);
      setStressLevel(prev => Math.max(0, prev - 15));
    }
  };

  const handlePauseSession = () => {
    setIsRunning(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-emerald-50">
      <DemoNav />
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="inline-flex items-center gap-2 text-slate-600 hover:text-sky-600 transition-colors mb-3"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </button>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Activity className="w-8 h-8 text-sky-600" />
              <div>
                <h1 className="text-2xl text-slate-900">VR Session in Progress</h1>
                <p className="text-sm text-slate-600">Real-Time Therapist Monitoring</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-sm text-slate-600">Session Time</div>
                <div className="text-2xl text-slate-900">{formatTime(sessionTime)}</div>
              </div>
              {isRunning ? (
                <div className="flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full animate-pulse"></div>
                  <span>LIVE</span>
                </div>
              ) : (
                <div className="px-4 py-2 bg-amber-100 text-amber-700 rounded-lg">
                  PAUSED
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Current Scenario */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Target className="w-6 h-6 text-sky-600" />
            <h2 className="text-xl text-slate-900">Current VR Scenario</h2>
          </div>
          <div className="bg-sky-50 rounded-xl p-5">
            <h3 className="text-lg mb-2 text-sky-900">Urban Road Crossing - Moderate Traffic</h3>
            <p className="text-sky-800">
              Patient is practicing decision-making at a controlled intersection with moderate vehicle density. 
              Objectives: Identify safe crossing windows, respond to traffic signals, demonstrate situational awareness.
            </p>
          </div>
        </div>

        {/* Live Indicators */}
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          {/* Stress Level */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-5 h-5 text-slate-700" />
              <h3 className="text-lg text-slate-900">Stress Level</h3>
            </div>
            
            <div className="mb-4">
              <div className="flex items-end gap-2 mb-2">
                <span className="text-4xl text-slate-900">{Math.round(stressLevel)}%</span>
                <span className={`text-sm mb-2 ${stressLevel > 60 ? 'text-amber-600' : 'text-emerald-600'}`}>
                  {stressLevel > 60 ? 'Elevated' : 'Normal'}
                </span>
              </div>
              
              <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                <div 
                  className={`h-full transition-all duration-500 ${
                    stressLevel > 60 ? 'bg-amber-500' : 'bg-emerald-500'
                  }`}
                  style={{ width: `${stressLevel}%` }}
                ></div>
              </div>
            </div>

            <p className="text-xs text-slate-600">
              Based on interaction patterns and response hesitation
            </p>
          </div>

          {/* Task Difficulty */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <Settings className="w-5 h-5 text-slate-700" />
              <h3 className="text-lg text-slate-900">Task Difficulty</h3>
            </div>
            
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-4xl text-slate-900">Level {taskDifficulty}</span>
              </div>
              
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((level) => (
                  <div
                    key={level}
                    className={`flex-1 h-3 rounded ${
                      level <= taskDifficulty ? 'bg-sky-500' : 'bg-slate-200'
                    }`}
                  ></div>
                ))}
              </div>
            </div>

            <p className="text-xs text-slate-600">
              Traffic density, decision time windows, environmental complexity
            </p>
          </div>

          {/* Sensory Intensity */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <Eye className="w-5 h-5 text-slate-700" />
              <h3 className="text-lg text-slate-900">Sensory Intensity</h3>
            </div>
            
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-4xl text-slate-900">Level {sensoryIntensity}</span>
              </div>
              
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((level) => (
                  <div
                    key={level}
                    className={`flex-1 h-3 rounded ${
                      level <= sensoryIntensity ? 'bg-emerald-500' : 'bg-slate-200'
                    }`}
                  ></div>
                ))}
              </div>
            </div>

            <p className="text-xs text-slate-600">
              Visual stimuli, ambient sounds, color saturation, movement speed
            </p>
          </div>
        </div>

        {/* AI Alert */}
        {alertShown && (
          <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-6 mb-6 animate-pulse">
            <div className="flex gap-4 items-start">
              <AlertCircle className="w-6 h-6 text-amber-700 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="text-lg mb-2 text-amber-900">AI Alert: Possible Overload Detected</h3>
                <p className="text-amber-800 mb-4">
                  Increased hesitation patterns and elevated stress indicators suggest the patient may be 
                  experiencing cognitive overload. AI recommends reducing task difficulty.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={handleReduceDifficulty}
                    className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors inline-flex items-center gap-2"
                  >
                    <TrendingDown className="w-4 h-4" />
                    Accept - Reduce Difficulty
                  </button>
                  <button
                    onClick={() => setAlertShown(false)}
                    className="px-4 py-2 bg-white border-2 border-amber-300 text-amber-900 rounded-lg transition-colors hover:bg-amber-50"
                  >
                    Dismiss - Continue Current Settings
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Performance Indicators */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-xl mb-4 text-slate-900">Current Session Performance</h2>
          
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-emerald-50 rounded-xl p-4">
              <div className="text-sm text-emerald-700 mb-1">Successful Attempts</div>
              <div className="text-3xl text-emerald-900">7</div>
            </div>

            <div className="bg-amber-50 rounded-xl p-4">
              <div className="text-sm text-amber-700 mb-1">Hesitations</div>
              <div className="text-3xl text-amber-900">3</div>
            </div>

            <div className="bg-sky-50 rounded-xl p-4">
              <div className="text-sm text-sky-700 mb-1">Avg Response Time</div>
              <div className="text-3xl text-sky-900">4.1s</div>
            </div>

            <div className="bg-violet-50 rounded-xl p-4">
              <div className="text-sm text-violet-700 mb-1">Total Attempts</div>
              <div className="text-3xl text-violet-900">10</div>
            </div>
          </div>
        </div>

        {/* Control Panel */}
        <div className="bg-gradient-to-r from-slate-50 to-slate-100 border-2 border-slate-300 rounded-2xl p-6">
          <h2 className="text-xl mb-4 text-slate-900">Therapist Override Controls</h2>
          <p className="text-sm text-slate-600 mb-6">
            All adjustments are logged and override any AI-suggested modifications
          </p>
          
          <div className="grid md:grid-cols-3 gap-4">
            <button
              onClick={handleReduceDifficulty}
              disabled={taskDifficulty === 1}
              className="px-6 py-4 bg-white hover:bg-slate-50 border-2 border-slate-300 text-slate-900 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
            >
              <TrendingDown className="w-5 h-5" />
              Reduce Difficulty
            </button>

            <button
              onClick={handlePauseSession}
              disabled={!isRunning}
              className="px-6 py-4 bg-amber-600 hover:bg-amber-700 text-white rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
            >
              <Pause className="w-5 h-5" />
              Pause Session
            </button>

            <button
              onClick={() => {
                setIsRunning(false);
                setTimeout(() => navigate('/dashboard'), 500);
              }}
              className="px-6 py-4 bg-slate-700 hover:bg-slate-800 text-white rounded-xl transition-colors inline-flex items-center justify-center gap-2"
            >
              <CheckCircle className="w-5 h-5" />
              End Session
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
