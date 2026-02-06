import { useNavigate } from 'react-router-dom';
import { Eye, Hand, ArrowRight, Lightbulb } from 'lucide-react';
import DemoNav from './DemoNav';

export default function PatientAdaptiveGuidance() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-emerald-50">
      <DemoNav />
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl mb-4 text-slate-900">
            Helpful Tips
          </h1>
          <p className="text-xl text-slate-600">
            Here are some gentle reminders
          </p>
        </div>

        {/* Guidance Cards */}
        <div className="space-y-6 mb-12">
          {/* Hint Card 1 */}
          <div className="bg-white rounded-3xl shadow-lg p-8 flex items-start gap-6">
            <div className="w-16 h-16 bg-sky-100 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Eye className="w-8 h-8 text-sky-600" />
            </div>
            <div>
              <h3 className="text-2xl mb-2 text-slate-900">Look Both Ways</h3>
              <p className="text-lg text-slate-600">
                Turn your head to check for cars
              </p>
            </div>
          </div>

          {/* Hint Card 2 */}
          <div className="bg-white rounded-3xl shadow-lg p-8 flex items-start gap-6">
            <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Hand className="w-8 h-8 text-emerald-600" />
            </div>
            <div>
              <h3 className="text-2xl mb-2 text-slate-900">Wait for Green Light</h3>
              <p className="text-lg text-slate-600">
                Stop and wait when the light is red
              </p>
            </div>
          </div>

          {/* Hint Card 3 */}
          <div className="bg-white rounded-3xl shadow-lg p-8 flex items-start gap-6">
            <div className="w-16 h-16 bg-violet-100 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Lightbulb className="w-8 h-8 text-violet-600" />
            </div>
            <div>
              <h3 className="text-2xl mb-2 text-slate-900">Take Your Time</h3>
              <p className="text-lg text-slate-600">
                Walk at a comfortable pace
              </p>
            </div>
          </div>
        </div>

        {/* Sensory Reduction Indicator */}
        <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-6 mb-12 text-center">
          <p className="text-lg text-emerald-900">
            Environment adjusted for comfort
          </p>
          <p className="text-sm text-emerald-700 mt-1">
            Sounds are softer • Less visual motion
          </p>
        </div>

        {/* Continue Button */}
        <div className="text-center">
          <button
            onClick={() => navigate('/patient/completion')}
            className="px-12 py-6 bg-sky-600 hover:bg-sky-700 text-white rounded-3xl text-xl transition-all shadow-lg hover:shadow-xl inline-flex items-center gap-3"
          >
            I'm Ready
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
