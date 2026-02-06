import { useNavigate } from 'react-router-dom';
import { Users, Stethoscope, Heart, Shield } from 'lucide-react';
import DemoNav from './DemoNav';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-emerald-50">
      <DemoNav />
      <div className="max-w-4xl mx-auto px-6 py-16 flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-6 px-6 py-3 bg-white rounded-full shadow-sm">
            <Heart className="w-6 h-6 text-sky-600" />
            <span className="text-sky-900">AI-Guided VR Clinical Platform</span>
          </div>
          
          <h1 className="text-5xl mb-4 text-slate-900 leading-tight">
            Welcome
          </h1>
          
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Clinical decision support platform for autism spectrum disorder therapy
          </p>
        </div>

        {/* Role Selection */}
        <div className="w-full max-w-3xl">
          <h2 className="text-2xl text-center mb-8 text-slate-700">Select Your Role</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Patient / Child Portal */}
            <button
              onClick={() => navigate('/patient/session-start')}
              className="bg-white hover:bg-sky-50 rounded-3xl shadow-lg hover:shadow-xl transition-all p-8 text-center group border-4 border-transparent hover:border-sky-200"
            >
              <div className="w-20 h-20 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-sky-200 transition-colors">
                <Users className="w-10 h-10 text-sky-600" />
              </div>
              <h3 className="text-xl mb-2 text-slate-900">Patient / Child</h3>
              <p className="text-sm text-slate-600">
                Start your therapy session
              </p>
            </button>

            {/* Guardian Portal */}
            <button
              onClick={() => navigate('/guardian/login')}
              className="bg-white hover:bg-amber-50 rounded-3xl shadow-lg hover:shadow-xl transition-all p-8 text-center group border-4 border-transparent hover:border-amber-200"
            >
              <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-200 transition-colors">
                <Heart className="w-10 h-10 text-amber-600" />
              </div>
              <h3 className="text-xl mb-2 text-slate-900">Parent / Guardian</h3>
              <p className="text-sm text-slate-600">
                View progress & reports
              </p>
            </button>

            {/* Therapist Portal */}
            <button
              onClick={() => navigate('/therapist/login')}
              className="bg-white hover:bg-emerald-50 rounded-3xl shadow-lg hover:shadow-xl transition-all p-8 text-center group border-4 border-transparent hover:border-emerald-200"
            >
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-emerald-200 transition-colors">
                <Stethoscope className="w-10 h-10 text-emerald-600" />
              </div>
              <h3 className="text-xl mb-2 text-slate-900">Therapist</h3>
              <p className="text-sm text-slate-600">
                Access clinical dashboard
              </p>
            </button>
          </div>
        </div>

        {/* Ethics Note */}
        <div className="mt-12 max-w-2xl bg-white/60 rounded-2xl p-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Shield className="w-5 h-5 text-slate-500" />
            <p className="text-sm text-slate-600">
              AI assists — Therapist decides
            </p>
          </div>
          <button
            onClick={() => navigate('/privacy-ethics')}
            className="text-xs text-sky-600 hover:text-sky-700 transition-colors"
          >
            View Privacy & Ethics Policy
          </button>
        </div>
      </div>
    </div>
  );
}
