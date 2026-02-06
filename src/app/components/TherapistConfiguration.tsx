import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Settings, Sliders, Target, Volume2, Eye, Play } from 'lucide-react';
import DemoNav from './DemoNav';

export default function TherapistConfiguration() {
  const navigate = useNavigate();
  const [difficulty, setDifficulty] = useState(3);
  const [sensoryVisual, setSensoryVisual] = useState(50);
  const [sensoryAudio, setSensoryAudio] = useState(30);
  const [sensoryMotion, setSensoryMotion] = useState(40);
  const [selectedScenario, setSelectedScenario] = useState('street-crossing');

  const scenarios = [
    { id: 'street-crossing', name: 'Street Crossing', icon: '🚦' },
    { id: 'grocery-store', name: 'Grocery Shopping', icon: '🛒' },
    { id: 'playground', name: 'Playground Social', icon: '🎮' },
    { id: 'classroom', name: 'Classroom Setting', icon: '📚' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-emerald-50">
      <DemoNav />
      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Header */}
        <button
          onClick={() => navigate('/therapist/patient-detail')}
          className="flex items-center gap-2 text-slate-600 hover:text-emerald-600 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Patient Detail
        </button>

        <div className="mb-8">
          <h1 className="text-3xl mb-2 text-slate-900">Therapy Session Configuration</h1>
          <p className="text-slate-600">Patient: Child A (ASD-047)</p>
        </div>

        {/* Configuration Form */}
        <div className="space-y-6">
          {/* Scenario Selection */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-5 h-5 text-emerald-600" />
              <h2 className="text-xl text-slate-900">Scenario Selection</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {scenarios.map((scenario) => (
                <button
                  key={scenario.id}
                  onClick={() => setSelectedScenario(scenario.id)}
                  className={`p-5 rounded-xl border-2 transition-all text-left ${
                    selectedScenario === scenario.id
                      ? 'border-emerald-500 bg-emerald-50'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className="text-3xl mb-2">{scenario.icon}</div>
                  <h3 className="text-lg text-slate-900">{scenario.name}</h3>
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty Level */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex items-center gap-2 mb-4">
              <Sliders className="w-5 h-5 text-sky-600" />
              <h2 className="text-xl text-slate-900">Difficulty Level</h2>
            </div>

            <div className="mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-slate-700">Current Level: {difficulty}</span>
                <span className="text-sm text-slate-500">Scale: 1 (Easy) to 5 (Advanced)</span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                value={difficulty}
                onChange={(e) => setDifficulty(Number(e.target.value))}
                className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>Easy</span>
                <span>Moderate</span>
                <span>Advanced</span>
              </div>
            </div>

            <div className="p-4 bg-sky-50 rounded-xl">
              <p className="text-sm text-slate-700">
                <strong>Level {difficulty}:</strong> {
                  difficulty === 1 ? 'Minimal distractions, simple tasks, extended time limits' :
                  difficulty === 2 ? 'Few distractions, basic tasks, generous time' :
                  difficulty === 3 ? 'Moderate environment, standard tasks, normal time' :
                  difficulty === 4 ? 'Increased complexity, multiple steps, tighter timing' :
                  'Real-world simulation, complex decisions, realistic time pressure'
                }
              </p>
            </div>
          </div>

          {/* Sensory Load Controls */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex items-center gap-2 mb-6">
              <Settings className="w-5 h-5 text-violet-600" />
              <h2 className="text-xl text-slate-900">Sensory Load Controls</h2>
            </div>

            <div className="space-y-6">
              {/* Visual Load */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Eye className="w-5 h-5 text-violet-600" />
                    <label className="text-slate-700">Visual Complexity</label>
                  </div>
                  <span className="text-sm text-slate-600">{sensoryVisual}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sensoryVisual}
                  onChange={(e) => setSensoryVisual(Number(e.target.value))}
                  className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-violet-600"
                />
                <p className="text-xs text-slate-500 mt-1">
                  Controls scene detail, color saturation, and visual motion
                </p>
              </div>

              {/* Audio Load */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Volume2 className="w-5 h-5 text-sky-600" />
                    <label className="text-slate-700">Audio Complexity</label>
                  </div>
                  <span className="text-sm text-slate-600">{sensoryAudio}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sensoryAudio}
                  onChange={(e) => setSensoryAudio(Number(e.target.value))}
                  className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
                />
                <p className="text-xs text-slate-500 mt-1">
                  Controls ambient sounds, voice volume, and audio frequency range
                </p>
              </div>

              {/* Motion Load */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Settings className="w-5 h-5 text-emerald-600" />
                    <label className="text-slate-700">Motion Intensity</label>
                  </div>
                  <span className="text-sm text-slate-600">{sensoryMotion}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sensoryMotion}
                  onChange={(e) => setSensoryMotion(Number(e.target.value))}
                  className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
                <p className="text-xs text-slate-500 mt-1">
                  Controls camera movement speed and environmental motion
                </p>
              </div>
            </div>
          </div>

          {/* Goal Setting */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-5 h-5 text-amber-600" />
              <h2 className="text-xl text-slate-900">Session Goal</h2>
            </div>

            <textarea
              className="w-full p-4 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-emerald-400 transition-colors resize-none"
              rows={4}
              placeholder="Enter specific therapeutic goals for this session..."
              defaultValue="Practice pedestrian safety: looking both ways, identifying safe crossing times, and responding to traffic signals."
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-end">
            <button
              onClick={() => navigate('/therapist/patient-detail')}
              className="px-6 py-3 bg-white hover:bg-slate-50 border-2 border-slate-200 text-slate-700 rounded-xl transition-all"
            >
              Cancel
            </button>
            <button className="px-6 py-3 bg-slate-600 hover:bg-slate-700 text-white rounded-xl transition-all">
              Save Configuration
            </button>
            <button
              onClick={() => navigate('/therapist/monitor')}
              className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-all flex items-center gap-2 shadow-lg"
            >
              <Play className="w-5 h-5" />
              Start Session
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
