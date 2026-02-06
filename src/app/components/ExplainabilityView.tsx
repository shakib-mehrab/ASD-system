import { useNavigate } from 'react-router-dom';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Brain, ArrowLeft, TrendingUp, AlertCircle, CheckCircle, Info } from 'lucide-react';
import DemoNav from './DemoNav';

const reactionTimeData = [
  { session: 'S1', time: 6.8 },
  { session: 'S2', time: 6.2 },
  { session: 'S3', time: 5.5 },
  { session: 'S4', time: 5.1 },
  { session: 'S5', time: 4.7 },
  { session: 'S6', time: 4.2 },
];

const errorFrequencyData = [
  { session: 'S1', errors: 8 },
  { session: 'S2', errors: 7 },
  { session: 'S3', errors: 5 },
  { session: 'S4', errors: 4 },
  { session: 'S5', errors: 3 },
  { session: 'S6', errors: 3 },
];

const hesitationData = [
  { difficulty: 'Level 1', hesitation: 5 },
  { difficulty: 'Level 2', hesitation: 12 },
  { difficulty: 'Level 3', hesitation: 23 },
  { difficulty: 'Level 4', hesitation: 31 },
  { difficulty: 'Level 5', hesitation: 42 },
];

export default function ExplainabilityView() {
  const navigate = useNavigate();

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
          <div className="flex items-center gap-3">
            <Brain className="w-8 h-8 text-violet-600" />
            <div>
              <h1 className="text-2xl text-slate-900">AI Explainability View</h1>
              <p className="text-sm text-slate-600">Understanding AI-Generated Insights</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Trust Banner */}
        <div className="bg-violet-50 border-2 border-violet-200 rounded-2xl p-6 mb-8">
          <div className="flex gap-4 items-start">
            <Info className="w-6 h-6 text-violet-700 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-lg mb-2 text-violet-900">Clinical Trust & Transparency</h2>
              <p className="text-violet-800">
                All AI recommendations are based on measurable behavioral patterns. This view explains 
                the data sources and reasoning behind each insight to support informed clinical decision-making.
              </p>
            </div>
          </div>
        </div>

        {/* Current AI Assessment */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-xl mb-6 text-slate-900">Current AI Assessment: Patient Child-ASD-047</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="w-6 h-6 text-emerald-600" />
                <h3 className="text-lg text-emerald-900">Readiness: Medium</h3>
              </div>
              <p className="text-emerald-800 mb-4">
                Patient shows improved consistency but increased hesitation under higher sensory load.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-1.5"></div>
                  <span className="text-emerald-700">Reaction time improved by 38% over 6 sessions</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-1.5"></div>
                  <span className="text-emerald-700">Error frequency reduced from 8 to 3 per session</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-1.5"></div>
                  <span className="text-emerald-700">Success rate increased 12% in last session</span>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <AlertCircle className="w-6 h-6 text-amber-600" />
                <h3 className="text-lg text-amber-900">Risk: Yellow - Monitor</h3>
              </div>
              <p className="text-amber-800 mb-4">
                Hesitation increases significantly at difficulty levels 4-5, suggesting current optimal range is levels 2-3.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mt-1.5"></div>
                  <span className="text-amber-700">23% hesitation at level 3 (current setting)</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mt-1.5"></div>
                  <span className="text-amber-700">42% hesitation projected at level 5</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mt-1.5"></div>
                  <span className="text-amber-700">Recommendation: Maintain current level or reduce to level 2</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Data Visualizations */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Reaction Time Trend */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-sky-600" />
              <h3 className="text-lg text-slate-900">Reaction Time Trend</h3>
            </div>
            <p className="text-sm text-slate-600 mb-4">Average time to initiate crossing decision (seconds)</p>
            
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={reactionTimeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="session" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px' 
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="time" 
                  stroke="#0ea5e9" 
                  strokeWidth={3}
                  dot={{ fill: '#0ea5e9', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>

            <div className="bg-sky-50 rounded-xl p-4 mt-4">
              <p className="text-sm text-sky-800">
                <strong>Analysis:</strong> Consistent downward trend indicates improved decision-making speed. 
                No regression observed.
              </p>
            </div>
          </div>

          {/* Error Frequency */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
              <h3 className="text-lg text-slate-900">Error Frequency</h3>
            </div>
            <p className="text-sm text-slate-600 mb-4">Incorrect decisions per session</p>
            
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={errorFrequencyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="session" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px' 
                  }}
                />
                <Bar dataKey="errors" fill="#10b981" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>

            <div className="bg-emerald-50 rounded-xl p-4 mt-4">
              <p className="text-sm text-emerald-800">
                <strong>Analysis:</strong> 62.5% reduction in errors from first to latest session. 
                Plateau at 3 errors suggests mastery approaching.
              </p>
            </div>
          </div>
        </div>

        {/* Hesitation by Difficulty */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="w-5 h-5 text-amber-600" />
            <h3 className="text-lg text-slate-900">Hesitation Frequency by Difficulty Level</h3>
          </div>
          <p className="text-sm text-slate-600 mb-4">Percentage of attempts with hesitation or retry behavior</p>
          
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={hesitationData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="difficulty" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px' 
                }}
              />
              <Bar dataKey="hesitation" fill="#f59e0b" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>

          <div className="bg-amber-50 rounded-xl p-4 mt-4">
            <p className="text-sm text-amber-800">
              <strong>Key Finding:</strong> Hesitation increases exponentially above level 3. 
              This indicates the patient performs optimally at levels 2-3 with current sensory load settings.
            </p>
          </div>
        </div>

        {/* Plain Language Explanation */}
        <div className="bg-gradient-to-r from-violet-50 to-purple-50 border-2 border-violet-200 rounded-2xl p-8">
          <h2 className="text-xl mb-4 text-violet-900">Plain-Language Clinical Summary</h2>
          <div className="space-y-4 text-violet-900">
            <p className="leading-relaxed">
              <strong>Progress Assessment:</strong> Based on analysis of 6 recent sessions, Child-ASD-047 demonstrates 
              significant improvement in road-crossing decision-making skills. Reaction time has decreased by 38%, 
              and error frequency has reduced from 8 to 3 per session, indicating strong skill acquisition.
            </p>
            <p className="leading-relaxed">
              <strong>Current Challenge:</strong> While the patient performs well at difficulty levels 1-3, hesitation 
              behavior increases substantially at levels 4-5. At the current level 3 setting, 23% of attempts involve 
              hesitation or retry behavior, suggesting the patient is appropriately challenged but not overwhelmed.
            </p>
            <p className="leading-relaxed">
              <strong>Clinical Recommendation:</strong> The AI suggests maintaining the current difficulty level (3) 
              for 2-3 more sessions to build confidence and consistency. Once hesitation drops below 15%, consider 
              gradual advancement to level 4 with reduced sensory load to prevent cognitive overload.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
