import { useNavigate } from 'react-router-dom';
import { Play, CheckCircle, Target, Home } from 'lucide-react';
import DemoNav from './DemoNav';

export default function PatientSessionStart() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-emerald-50">
      <DemoNav />
      <div className="max-w-3xl mx-auto px-6 py-16 flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
        {/* Therapist Approved Badge */}
        <div className="mb-8 inline-flex items-center gap-2 px-6 py-3 bg-emerald-100 rounded-full">
          <CheckCircle className="w-6 h-6 text-emerald-700" />
          <span className="text-emerald-900">Therapist Approved Session</span>
        </div>

        {/* Welcome Message */}
        <h1 className="text-4xl mb-4 text-slate-900 text-center">
          Ready to Practice?
        </h1>
        <p className="text-xl text-slate-600 mb-12 text-center">
          Today we'll work on crossing the street safely
        </p>

        {/* Goal Icons */}
        <div className="mb-12 w-full">
          <h2 className="text-xl text-center mb-6 text-slate-700">Today's Goal</h2>
          <div className="flex justify-center gap-6">
            <div className="text-center">
              <div className="w-32 h-32 bg-white rounded-3xl shadow-lg flex items-center justify-center mb-4 border-4 border-sky-200">
                <Target className="w-16 h-16 text-sky-600" />
              </div>
              <p className="text-lg text-slate-700">Cross Street</p>
            </div>
          </div>
        </div>

        {/* Start Button */}
        <button
          onClick={() => navigate('/patient/vr-interface')}
          className="px-16 py-8 bg-sky-600 hover:bg-sky-700 text-white rounded-3xl text-2xl transition-all shadow-xl hover:shadow-2xl flex items-center gap-4"
        >
          <Play className="w-8 h-8" />
          Start Session
        </button>

        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="mt-8 px-6 py-3 bg-white hover:bg-slate-50 text-slate-700 rounded-2xl transition-all shadow-md flex items-center gap-2"
        >
          <Home className="w-5 h-5" />
          Back to Home
        </button>
      </div>
    </div>
  );
}
