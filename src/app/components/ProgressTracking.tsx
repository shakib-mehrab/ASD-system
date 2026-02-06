import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { ArrowLeft, TrendingUp, Calendar, FileText, Award, Target } from 'lucide-react';
import DemoNav from './DemoNav';

const sessionData = [
  { date: 'Jan 5', success: 45, reaction: 6.8, consistency: 52 },
  { date: 'Jan 8', success: 52, reaction: 6.2, consistency: 58 },
  { date: 'Jan 12', success: 61, reaction: 5.5, consistency: 64 },
  { date: 'Jan 15', success: 68, reaction: 5.1, consistency: 71 },
  { date: 'Jan 19', success: 72, reaction: 4.7, consistency: 76 },
  { date: 'Jan 22', success: 78, reaction: 4.2, consistency: 82 },
  { date: 'Jan 26', success: 81, reaction: 4.0, consistency: 85 },
  { date: 'Jan 29', success: 78, reaction: 4.2, consistency: 83 },
];

const therapistNotes = [
  {
    date: 'Jan 29, 2026',
    note: 'Excellent progress in traffic awareness. Patient demonstrates improved confidence but shows slight regression at higher difficulty levels. Recommend maintaining Level 3 for next 2 sessions.',
    therapist: 'Dr. Sarah Chen, BCBA'
  },
  {
    date: 'Jan 22, 2026',
    note: 'Significant improvement in decision-making speed. Reduced hesitation frequency. Patient ready to maintain current difficulty with gradual sensory load increase.',
    therapist: 'Dr. Sarah Chen, BCBA'
  },
  {
    date: 'Jan 15, 2026',
    note: 'Patient showing consistent skill acquisition. Error rate decreased by 40% from baseline. Continue current intervention protocol.',
    therapist: 'Dr. Sarah Chen, BCBA'
  }
];

export default function ProgressTracking() {
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
            <TrendingUp className="w-8 h-8 text-emerald-600" />
            <div>
              <h1 className="text-2xl text-slate-900">Long-Term Progress Tracking</h1>
              <p className="text-sm text-slate-600">Patient: Child-ASD-047 | Therapy Start: Dec 18, 2025</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Clinical Purpose Banner */}
        <div className="bg-sky-50 border-2 border-sky-200 rounded-2xl p-6 mb-8">
          <div className="flex gap-4 items-start">
            <Target className="w-6 h-6 text-sky-700 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-lg mb-2 text-sky-900">Supports Longitudinal Therapy Planning</h2>
              <p className="text-sky-800">
                This view provides clinical evidence for treatment efficacy, helps identify optimal intervention 
                parameters, and supports data-driven therapy adjustments over extended periods.
              </p>
            </div>
          </div>
        </div>

        {/* Key Performance Indicators */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-2 mb-3">
              <Award className="w-5 h-5 text-emerald-600" />
              <span className="text-sm text-slate-600">Total Sessions</span>
            </div>
            <div className="text-4xl text-slate-900 mb-1">8</div>
            <div className="text-sm text-emerald-600">Over 6 weeks</div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-5 h-5 text-sky-600" />
              <span className="text-sm text-slate-600">Success Rate</span>
            </div>
            <div className="text-4xl text-slate-900 mb-1">78%</div>
            <div className="text-sm text-sky-600">+33% from baseline</div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-5 h-5 text-violet-600" />
              <span className="text-sm text-slate-600">Consistency</span>
            </div>
            <div className="text-4xl text-slate-900 mb-1">83%</div>
            <div className="text-sm text-violet-600">+31% improvement</div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-5 h-5 text-amber-600" />
              <span className="text-sm text-slate-600">Avg Reaction</span>
            </div>
            <div className="text-4xl text-slate-900 mb-1">4.2s</div>
            <div className="text-sm text-amber-600">-2.6s faster</div>
          </div>
        </div>

        {/* Timeline Visualization */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center gap-2 mb-6">
            <Calendar className="w-6 h-6 text-slate-700" />
            <h2 className="text-2xl text-slate-900">Session-by-Session Timeline</h2>
          </div>
          
          <div className="mb-6">
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={sessionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="date" stroke="#64748b" />
                <YAxis stroke="#64748b" label={{ value: 'Score (%)', angle: -90, position: 'insideLeft' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    padding: '12px'
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="success" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  name="Success Rate (%)"
                  dot={{ fill: '#10b981', r: 5 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="consistency" 
                  stroke="#8b5cf6" 
                  strokeWidth={3}
                  name="Consistency Score (%)"
                  dot={{ fill: '#8b5cf6', r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-emerald-50 rounded-xl p-4">
              <h3 className="text-sm text-emerald-900 mb-2">Success Rate Trend</h3>
              <p className="text-xs text-emerald-700">
                Steady upward trajectory with slight plateau in latest session. Overall 33% improvement from baseline.
              </p>
            </div>
            <div className="bg-violet-50 rounded-xl p-4">
              <h3 className="text-sm text-violet-900 mb-2">Consistency Pattern</h3>
              <p className="text-xs text-violet-700">
                Strong correlation with success rate. Minor dip in session 8 suggests need to maintain current difficulty.
              </p>
            </div>
            <div className="bg-sky-50 rounded-xl p-4">
              <h3 className="text-sm text-sky-900 mb-2">Clinical Interpretation</h3>
              <p className="text-xs text-sky-700">
                Patient demonstrates significant skill acquisition with evidence of learning retention across sessions.
              </p>
            </div>
          </div>
        </div>

        {/* Therapist Notes */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center gap-2 mb-6">
            <FileText className="w-6 h-6 text-slate-700" />
            <h2 className="text-2xl text-slate-900">Clinical Notes & Observations</h2>
          </div>

          <div className="space-y-4">
            {therapistNotes.map((entry, index) => (
              <div key={index} className="border-2 border-slate-200 rounded-xl p-5">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-500" />
                    <span className="text-sm text-slate-600">{entry.date}</span>
                  </div>
                  <span className="text-xs text-slate-500">{entry.therapist}</span>
                </div>
                <p className="text-slate-800 leading-relaxed">{entry.note}</p>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <button className="w-full px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-900 rounded-xl transition-colors inline-flex items-center justify-center gap-2">
              <FileText className="w-5 h-5" />
              Add New Clinical Note
            </button>
          </div>
        </div>

        {/* Treatment Recommendations */}
        <div className="mt-8 bg-gradient-to-r from-emerald-50 to-sky-50 border-2 border-emerald-200 rounded-2xl p-6">
          <div className="flex gap-4 items-start">
            <Award className="w-6 h-6 text-emerald-700 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg mb-2 text-emerald-900">Data-Driven Treatment Recommendations</h3>
              <div className="space-y-2 text-emerald-800">
                <p className="flex items-start gap-2">
                  <span className="text-emerald-600 mt-1">•</span>
                  <span>Continue current difficulty level (3) for 2-3 additional sessions to reinforce skill mastery</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-emerald-600 mt-1">•</span>
                  <span>Monitor for consistency stabilization above 85% before advancing to Level 4</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-emerald-600 mt-1">•</span>
                  <span>Consider gradual introduction of novel environmental variables (weather, time of day)</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-emerald-600 mt-1">•</span>
                  <span>Schedule parent consultation to discuss generalization strategies for real-world application</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
