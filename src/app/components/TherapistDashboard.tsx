import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Activity, Brain, TrendingUp, Clock, AlertTriangle, 
  CheckCircle, Settings, Play, ArrowRight, Info, Home,
  Shield, BarChart3, Workflow
} from 'lucide-react';
import DemoNav from './DemoNav';

export default function TherapistDashboard() {
  const navigate = useNavigate();
  const [selectedPatient, setSelectedPatient] = useState('Child-ASD-047');
  const [difficulty, setDifficulty] = useState(3);
  const [sensoryLoad, setSensoryLoad] = useState(2);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-emerald-50">
      <DemoNav />
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <Home className="w-5 h-5 text-slate-600" />
            </button>
            <div>
              <h1 className="text-2xl text-slate-900">Therapist Dashboard</h1>
              <p className="text-sm text-slate-600">Clinical Decision Support Interface</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/privacy-ethics')}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <Shield className="w-5 h-5 text-slate-600" />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Patient Selector */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <label className="block mb-2 text-slate-700">Active Patient (Anonymized ID)</label>
          <select
            value={selectedPatient}
            onChange={(e) => setSelectedPatient(e.target.value)}
            className="w-full max-w-md px-4 py-3 border-2 border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-sky-500"
          >
            <option value="Child-ASD-047">Child-ASD-047</option>
            <option value="Child-ASD-023">Child-ASD-023</option>
            <option value="Child-ASD-091">Child-ASD-091</option>
          </select>
        </div>

        {/* Current Therapy Goal */}
        <div className="bg-sky-50 border-2 border-sky-200 rounded-2xl p-6 mb-6">
          <div className="flex items-start gap-3">
            <Activity className="w-6 h-6 text-sky-700 mt-1" />
            <div>
              <h2 className="text-lg mb-1 text-sky-900">Current Therapy Goal</h2>
              <p className="text-sky-800">Safe street crossing with traffic awareness and decision-making skills</p>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          {/* Last Session Summary */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl mb-6 text-slate-900">Last Session Summary</h2>
            
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-emerald-50 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  <span className="text-sm text-emerald-900">Task Success Rate</span>
                </div>
                <p className="text-3xl text-emerald-700">78%</p>
                <p className="text-xs text-emerald-600 mt-1">+12% from previous</p>
              </div>

              <div className="bg-sky-50 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-5 h-5 text-sky-600" />
                  <span className="text-sm text-sky-900">Avg Reaction Time</span>
                </div>
                <p className="text-3xl text-sky-700">4.2s</p>
                <p className="text-xs text-sky-600 mt-1">-0.8s improvement</p>
              </div>

              <div className="bg-amber-50 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                  <span className="text-sm text-amber-900">Hesitation Frequency</span>
                </div>
                <p className="text-3xl text-amber-700">23%</p>
                <p className="text-xs text-amber-600 mt-1">Slight increase</p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => navigate('/progress')}
                className="flex-1 px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-900 rounded-xl transition-colors inline-flex items-center justify-center gap-2"
              >
                <BarChart3 className="w-5 h-5" />
                View Full Progress
              </button>
              <button
                onClick={() => navigate('/explainability')}
                className="flex-1 px-4 py-3 bg-violet-100 hover:bg-violet-200 text-violet-900 rounded-xl transition-colors inline-flex items-center justify-center gap-2"
              >
                <Info className="w-5 h-5" />
                See AI Analysis
              </button>
            </div>
          </div>

          {/* AI Insight Panel */}
          <div className="bg-gradient-to-br from-violet-50 to-purple-50 border-2 border-violet-200 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Brain className="w-6 h-6 text-violet-700" />
              <h2 className="text-lg text-violet-900">AI-Generated Support</h2>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="text-sm text-violet-700 block mb-2">Readiness Level</label>
                <div className="bg-white rounded-xl p-4 border-2 border-emerald-300">
                  <div className="flex items-center justify-between">
                    <span className="text-lg text-emerald-700">Medium</span>
                    <div className="flex gap-1">
                      <div className="w-2 h-8 bg-emerald-500 rounded"></div>
                      <div className="w-2 h-8 bg-emerald-500 rounded"></div>
                      <div className="w-2 h-8 bg-slate-200 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm text-violet-700 block mb-2">Risk Indicator</label>
                <div className="bg-white rounded-xl p-4 border-2 border-amber-300">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-amber-500 rounded-full"></div>
                    <span className="text-lg text-amber-700">Yellow - Monitor</span>
                  </div>
                  <p className="text-xs text-amber-600 mt-2">Increased hesitation at higher complexity</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate('/explainability')}
              className="w-full px-4 py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-xl transition-colors inline-flex items-center justify-center gap-2"
            >
              <Info className="w-5 h-5" />
              Why AI Thinks This
            </button>
          </div>
        </div>

        {/* Controls Section */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Difficulty Control */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <Settings className="w-6 h-6 text-slate-700" />
              <h2 className="text-lg text-slate-900">VR Difficulty Level</h2>
            </div>
            
            <div className="mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-slate-600">Current: Level {difficulty}</span>
                <span className="text-sm text-slate-600">Range: 1-5</span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                value={difficulty}
                onChange={(e) => setDifficulty(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>Simple</span>
                <span>Complex</span>
              </div>
            </div>

            <div className="bg-sky-50 rounded-xl p-4">
              <p className="text-sm text-sky-800">
                Controls: Traffic density, environmental distractions, decision time pressure
              </p>
            </div>
          </div>

          {/* Sensory Load Control */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <Settings className="w-6 h-6 text-slate-700" />
              <h2 className="text-lg text-slate-900">Sensory Load Intensity</h2>
            </div>
            
            <div className="mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-slate-600">Current: Level {sensoryLoad}</span>
                <span className="text-sm text-slate-600">Range: 1-5</span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                value={sensoryLoad}
                onChange={(e) => setSensoryLoad(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>Minimal</span>
                <span>High</span>
              </div>
            </div>

            <div className="bg-emerald-50 rounded-xl p-4">
              <p className="text-sm text-emerald-800">
                Controls: Visual stimuli, ambient sounds, movement speed, color saturation
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid md:grid-cols-2 gap-4">
          <button
            onClick={() => navigate('/vr-session')}
            className="px-8 py-5 bg-sky-600 hover:bg-sky-700 text-white rounded-2xl text-lg transition-all shadow-lg hover:shadow-xl inline-flex items-center justify-center gap-3"
          >
            <Play className="w-6 h-6" />
            Start Next VR Session
          </button>

          <button
            onClick={() => navigate('/adaptive-guidance')}
            className="px-8 py-5 bg-white hover:bg-slate-50 border-2 border-slate-300 text-slate-900 rounded-2xl text-lg transition-all inline-flex items-center justify-center gap-3"
          >
            <Workflow className="w-6 h-6" />
            View Adaptive System Logic
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
