import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Calendar, Target, Settings, Activity, FileText, Play } from 'lucide-react';
// import DemoNav from '@/app/components/DemoNav';
import { DashboardLayout } from './DashboardLayout';

export default function TherapistPatientDetail() {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <button
          onClick={() => navigate('/therapist/patients')}
          className="flex items-center gap-2 text-slate-600 hover:text-emerald-600 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Patient List
        </button>

        <div className="flex items-start justify-between mb-8 flex-wrap gap-4">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-sky-100 rounded-2xl flex items-center justify-center">
              <User className="w-8 h-8 text-sky-600" />
            </div>
            <div>
              <h1 className="text-3xl mb-1 text-slate-900">Child A</h1>
              <p className="text-slate-600">Patient ID: ASD-047 • Age 8</p>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => navigate('/therapist/configure')}
              className="px-5 py-3 bg-white hover:bg-slate-50 border-2 border-slate-200 rounded-xl transition-all flex items-center gap-2"
            >
              <Settings className="w-5 h-5" />
              Configure Session
            </button>
            <button
              onClick={() => navigate('/therapist/monitor')}
              className="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-all flex items-center gap-2"
            >
              <Play className="w-5 h-5" />
              Start Session
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Therapy Goals */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-5 h-5 text-emerald-600" />
                <h2 className="text-xl text-slate-900">Current Therapy Goals</h2>
              </div>
              
              <div className="space-y-3">
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-slate-900">Street Crossing Safety</h3>
                    <span className="text-sm text-emerald-700 bg-emerald-100 px-3 py-1 rounded-lg">Active</span>
                  </div>
                  <p className="text-sm text-slate-600">Practice pedestrian safety skills in controlled VR environment</p>
                  <div className="mt-3 h-2 bg-emerald-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-600 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Progress: 65%</p>
                </div>

                <div className="p-4 bg-sky-50 border border-sky-200 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-slate-900">Social Interaction</h3>
                    <span className="text-sm text-sky-700 bg-sky-100 px-3 py-1 rounded-lg">Planning</span>
                  </div>
                  <p className="text-sm text-slate-600">Develop greetings and turn-taking skills</p>
                </div>
              </div>
            </div>

            {/* Session History */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-5 h-5 text-sky-600" />
                <h2 className="text-xl text-slate-900">Recent Session History</h2>
              </div>

              <div className="space-y-3">
                {[
                  { date: 'Jan 15, 2026', duration: '25 min', outcome: 'Completed' },
                  { date: 'Jan 13, 2026', duration: '22 min', outcome: 'Completed' },
                  { date: 'Jan 10, 2026', duration: '18 min', outcome: 'Early exit' },
                  { date: 'Jan 8, 2026', duration: '30 min', outcome: 'Completed' },
                ].map((session, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      <div>
                        <p className="text-sm text-slate-900">{session.date}</p>
                        <p className="text-xs text-slate-500">{session.duration}</p>
                      </div>
                    </div>
                    <span className="text-sm text-slate-600">{session.outcome}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => navigate('/therapist/reports')}
                className="w-full mt-4 py-2 text-sky-600 hover:bg-sky-50 rounded-xl transition-colors text-sm"
              >
                View Full History →
              </button>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Sensory Tolerance Settings */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <div className="flex items-center gap-2 mb-4">
                <Activity className="w-5 h-5 text-violet-600" />
                <h2 className="text-lg text-slate-900">Sensory Tolerance</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-slate-600">Visual Sensitivity</span>
                    <span className="text-sm text-slate-900">Medium</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full">
                    <div className="h-full bg-violet-500 rounded-full" style={{ width: '50%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-slate-600">Auditory Sensitivity</span>
                    <span className="text-sm text-slate-900">High</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-slate-600">Motion Tolerance</span>
                    <span className="text-sm text-slate-900">Low</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: '30%' }}></div>
                  </div>
                </div>
              </div>

              <button className="w-full mt-4 py-2 text-violet-600 hover:bg-violet-50 rounded-xl transition-colors text-sm">
                Adjust Settings
              </button>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-lg mb-4 text-slate-900">Quick Actions</h2>
              
              <div className="space-y-2">
                <button
                  onClick={() => navigate('/therapist/ai-dashboard')}
                  className="w-full py-3 px-4 bg-sky-50 hover:bg-sky-100 text-sky-900 rounded-xl transition-colors text-left flex items-center gap-3"
                >
                  <Activity className="w-5 h-5" />
                  View AI Insights
                </button>
                
                <button className="w-full py-3 px-4 bg-slate-50 hover:bg-slate-100 text-slate-900 rounded-xl transition-colors text-left flex items-center gap-3">
                  <FileText className="w-5 h-5" />
                  Clinical Notes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
