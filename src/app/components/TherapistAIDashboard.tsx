import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from './DashboardLayout';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowLeft, Brain, TrendingUp, AlertCircle, Info, Shield } from 'lucide-react';

const readinessData = [
  { date: 'Jan 8', score: 72 },
  { date: 'Jan 10', score: 68 },
  { date: 'Jan 13', score: 75 },
  { date: 'Jan 15', score: 78 },
];

const factorData = [
  { factor: 'Recent Success', impact: 85 },
  { factor: 'Session Consistency', impact: 70 },
  { factor: 'Sensory Comfort', impact: 65 },
  { factor: 'Time of Day', impact: 55 },
];

export default function TherapistAIDashboard() {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <button
          onClick={() => navigate('/therapist/patient-detail')}
          className="flex items-center gap-2 text-slate-600 hover:text-emerald-600 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Patient Detail
        </button>

        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <h1 className="text-3xl mb-2 text-slate-900">AI Clinical Decision Support</h1>
            <p className="text-slate-600">Patient: Child A (ASD-047)</p>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 border-2 border-amber-200 rounded-xl">
            <Shield className="w-5 h-5 text-amber-700" />
            <span className="text-sm text-amber-900">AI Assists — Therapist Decides</span>
          </div>
        </div>

        {/* Main Dashboard */}
        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          {/* Readiness Score */}
          <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-emerald-500">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-slate-600 mb-1">AI-Assisted Readiness Score</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl text-slate-900">78</span>
                  <span className="text-lg text-slate-500">/100</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
            <p className="text-sm text-emerald-700">Good readiness for next session</p>
          </div>

          {/* Safety Indicator */}
          <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-sky-500">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-slate-600 mb-1">Safety Status</p>
                <span className="text-2xl text-slate-900">All Clear</span>
              </div>
              <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-sky-600" />
              </div>
            </div>
            <p className="text-sm text-sky-700">No risk indicators detected</p>
          </div>

          {/* Trend Indicator */}
          <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-violet-500">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-slate-600 mb-1">Performance Trend</p>
                <span className="text-2xl text-slate-900">↗ Improving</span>
              </div>
              <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-violet-600" />
              </div>
            </div>
            <p className="text-sm text-violet-700">+6 pts over 2 weeks</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Readiness Over Time */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl text-slate-900">Readiness Score Trend</h2>
              <Info className="w-5 h-5 text-slate-400" />
            </div>

            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={readinessData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="date" tick={{ fill: '#64748b', fontSize: 12 }} />
                <YAxis tick={{ fill: '#64748b', fontSize: 12 }} domain={[0, 100]} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '2px solid #e2e8f0', 
                    borderRadius: '12px',
                    padding: '8px 12px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  dot={{ fill: '#10b981', r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>

            <p className="text-sm text-slate-500 mt-4">
              AI model: Random Forest • Confidence: 82%
            </p>
          </div>

          {/* Contributing Factors */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl text-slate-900">Contributing Factors</h2>
              <Brain className="w-5 h-5 text-violet-600" />
            </div>

            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={factorData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis type="number" tick={{ fill: '#64748b', fontSize: 12 }} domain={[0, 100]} />
                <YAxis type="category" dataKey="factor" tick={{ fill: '#64748b', fontSize: 12 }} width={130} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '2px solid #e2e8f0', 
                    borderRadius: '12px',
                    padding: '8px 12px'
                  }}
                />
                <Bar dataKey="impact" fill="#8b5cf6" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>

            <p className="text-sm text-slate-500 mt-4">
              Factors ranked by impact on readiness prediction
            </p>
          </div>
        </div>

        {/* AI Explanation Panel */}
        <div className="mt-6 bg-gradient-to-r from-violet-50 to-sky-50 border-2 border-violet-200 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-violet-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Brain className="w-5 h-5 text-violet-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg mb-2 text-slate-900">AI Reasoning Explanation</h3>
              <p className="text-slate-700 leading-relaxed mb-4">
                The AI model predicts <strong>high readiness (78/100)</strong> based on:
              </p>
              <ul className="space-y-2 text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 mt-1">✓</span>
                  <span>Consistent improvement in recent sessions (+3 pts per session average)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 mt-1">✓</span>
                  <span>Low sensory overload incidents in last 3 sessions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 mt-1">✓</span>
                  <span>Optimal session timing (afternoon sessions show 12% better outcomes)</span>
                </li>
              </ul>
              
              <div className="mt-4 p-4 bg-white rounded-xl border border-violet-200">
                <p className="text-sm text-slate-600 mb-2"><strong>Clinical Recommendation:</strong></p>
                <p className="text-sm text-slate-700">
                  Consider progressing to difficulty level 4 with continued sensory monitoring. 
                  Patient shows strong response to visual cues.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Risk & Safety Monitoring */}
        <div className="mt-6 grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="w-5 h-5 text-amber-600" />
              <h2 className="text-lg text-slate-900">Risk Indicators</h2>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-xl">
                <span className="text-sm text-slate-700">Sensory Overload Risk</span>
                <span className="text-sm text-emerald-700 bg-emerald-100 px-3 py-1 rounded-lg">Low</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-xl">
                <span className="text-sm text-slate-700">Disengagement Risk</span>
                <span className="text-sm text-emerald-700 bg-emerald-100 px-3 py-1 rounded-lg">Low</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-sky-50 rounded-xl">
                <span className="text-sm text-slate-700">Fatigue Indicators</span>
                <span className="text-sm text-sky-700 bg-sky-100 px-3 py-1 rounded-lg">Normal</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-emerald-600" />
              <h2 className="text-lg text-slate-900">Safety Metrics</h2>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-slate-600">Sessions Without Incident</span>
                <span className="text-slate-900">12</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-slate-600">Early Exit Rate</span>
                <span className="text-slate-900">8%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-slate-600">Comfort Level Avg</span>
                <span className="text-slate-900">4.2/5</span>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 bg-amber-50 border-2 border-amber-200 rounded-2xl p-4">
          <p className="text-sm text-amber-900">
            <strong>Clinical Decision Authority:</strong> All AI predictions are advisory only. 
            Therapist maintains full clinical authority over treatment decisions, session parameters, 
            and patient safety protocols.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
