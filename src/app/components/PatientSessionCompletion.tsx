import { useNavigate } from 'react-router-dom';
import { CheckCircle, Star, Home } from 'lucide-react';
import DemoNav from './DemoNav';

export default function PatientSessionCompletion() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-emerald-50">
      <DemoNav />
      <div className="max-w-3xl mx-auto px-6 py-16 flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
        {/* Success Icon */}
        <div className="w-32 h-32 bg-emerald-100 rounded-full flex items-center justify-center mb-8">
          <CheckCircle className="w-16 h-16 text-emerald-600" />
        </div>

        {/* Positive Feedback */}
        <h1 className="text-5xl mb-4 text-slate-900 text-center">
          Great Job!
        </h1>
        <p className="text-2xl text-slate-600 mb-12 text-center">
          You completed today's session
        </p>

        {/* Progress Indicators (No Numbers) */}
        <div className="mb-12 w-full max-w-md">
          <div className="bg-white rounded-3xl shadow-lg p-8">
            <h2 className="text-xl mb-6 text-slate-700 text-center">Today's Progress</h2>
            
            {/* Visual Progress Bars */}
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-600">Practice Time</span>
                  <Star className="w-5 h-5 text-amber-500" />
                </div>
                <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-sky-500 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-600">Steps Completed</span>
                  <Star className="w-5 h-5 text-amber-500" />
                </div>
                <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: '90%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-600">Focus</span>
                  <Star className="w-5 h-5 text-amber-500" />
                </div>
                <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-violet-500 rounded-full" style={{ width: '80%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Finish Button */}
        <button
          onClick={() => navigate('/')}
          className="px-12 py-6 bg-sky-600 hover:bg-sky-700 text-white rounded-3xl text-xl transition-all shadow-lg hover:shadow-xl flex items-center gap-3"
        >
          <Home className="w-6 h-6" />
          Finish Session
        </button>

        {/* Therapist Note */}
        <div className="mt-8 text-center">
          <p className="text-sm text-slate-500">
            Your therapist will review this session with you
          </p>
        </div>
      </div>
    </div>
  );
}
