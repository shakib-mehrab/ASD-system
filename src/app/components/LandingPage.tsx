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
            <span className="text-sky-900 font-medium">AI-Guided VR Therapy Platform</span>
          </div>
          
          <h1 className="text-5xl mb-4 text-slate-900 leading-tight font-bold">
            ASD Therapy System
          </h1>
          
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Supporting therapists and families with AI-powered VR therapy for autism spectrum disorder
          </p>
        </div>

        {/* Role Selection */}
        <div className="w-full max-w-4xl">
          <h2 className="text-2xl text-center mb-8 text-slate-700 font-semibold">Choose Your Portal</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Therapist Portal */}
            <div className="bg-white rounded-3xl shadow-lg p-8 border-2 border-slate-100">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Stethoscope className="w-10 h-10 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-slate-900 text-center">Therapist Portal</h3>
              <p className="text-slate-600 mb-6 text-center leading-relaxed">
                Access clinical tools to manage patients, configure VR therapy sessions, and monitor real-time progress with AI-powered insights.
              </p>
              <ul className="space-y-3 mb-6 text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <Users className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>Manage patient cases and therapy plans</span>
                </li>
                <li className="flex items-start gap-2">
                  <Shield className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>Configure VR sessions with custom settings</span>
                </li>
                <li className="flex items-start gap-2">
                  <Heart className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>Real-time monitoring with biometric data</span>
                </li>
              </ul>
              <button
                onClick={() => navigate('/therapist/login')}
                className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-all shadow-md hover:shadow-lg font-semibold text-lg"
              >
                Access Therapist Portal →
              </button>
            </div>

            {/* Guardian Portal */}
            <div className="bg-white rounded-3xl shadow-lg p-8 border-2 border-slate-100">
              <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-10 h-10 text-amber-600" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-slate-900 text-center">Guardian Portal</h3>
              <p className="text-slate-600 mb-6 text-center leading-relaxed">
                View your child's therapy progress, start practice sessions at home, and stay informed with easy-to-understand reports.
              </p>
              <ul className="space-y-3 mb-6 text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <Users className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span>Track progress and therapy milestones</span>
                </li>
                <li className="flex items-start gap-2">
                  <Shield className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span>Start guided home practice sessions</span>
                </li>
                <li className="flex items-start gap-2">
                  <Heart className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span>Parent-friendly performance summaries</span>
                </li>
              </ul>
              <button
                onClick={() => navigate('/guardian/login')}
                className="w-full py-4 bg-amber-600 hover:bg-amber-700 text-white rounded-xl transition-all shadow-md hover:shadow-lg font-semibold text-lg"
              >
                Access Guardian Portal →
              </button>
            </div>
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
