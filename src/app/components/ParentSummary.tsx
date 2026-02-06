import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, TrendingUp, Target, Shield, Calendar, Award } from 'lucide-react';
import DemoNav from '../components/DemoNav';

export default function ParentSummary() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-emerald-50">
      <DemoNav />
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-slate-600 hover:text-sky-600 transition-colors mb-3"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </button>
          <div className="flex items-center gap-3">
            <Heart className="w-8 h-8 text-rose-500" />
            <div>
              <h1 className="text-2xl text-slate-900">Parent Summary View</h1>
              <p className="text-sm text-slate-600">Progress Update for Child-ASD-047</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Welcome Message */}
        <div className="bg-gradient-to-r from-rose-50 to-pink-50 border-2 border-rose-200 rounded-2xl p-8 mb-8">
          <h2 className="text-2xl mb-3 text-rose-900">Welcome to Your Child's Progress Summary</h2>
          <p className="text-rose-800 leading-relaxed">
            This simplified view provides an overview of your child's skill-building journey. All treatment 
            decisions are made by qualified therapists. This summary is designed to keep you informed and 
            celebrate progress together.
          </p>
        </div>

        {/* Current Skill Focus */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Target className="w-7 h-7 text-sky-600" />
            <h2 className="text-2xl text-slate-900">What We're Working On</h2>
          </div>
          
          <div className="bg-sky-50 rounded-xl p-6 mb-6">
            <h3 className="text-xl mb-3 text-sky-900">Safe Street Crossing Skills</h3>
            <p className="text-sky-800 text-lg leading-relaxed">
              Your child is learning important real-world skills like when it's safe to cross the street, 
              how to watch for cars, and how to make good decisions about traffic. These skills are practiced 
              in a safe virtual reality environment before trying them in the real world.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-emerald-50 rounded-xl p-5 text-center">
              <div className="text-4xl mb-2">✓</div>
              <div className="text-sm text-emerald-900">Recognizing Traffic Signals</div>
            </div>
            <div className="bg-sky-50 rounded-xl p-5 text-center">
              <div className="text-4xl mb-2">✓</div>
              <div className="text-sm text-sky-900">Looking Both Ways</div>
            </div>
            <div className="bg-violet-50 rounded-xl p-5 text-center">
              <div className="text-4xl mb-2">✓</div>
              <div className="text-sm text-violet-900">Making Safe Choices</div>
            </div>
          </div>
        </div>

        {/* Simple Progress Indicators */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-7 h-7 text-emerald-600" />
            <h2 className="text-2xl text-slate-900">How Your Child Is Doing</h2>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-lg text-slate-900">Overall Progress</span>
                <span className="text-lg text-emerald-600">Excellent</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-4 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full" style={{ width: '78%' }}></div>
              </div>
              <p className="text-sm text-slate-600 mt-2">Successfully completing tasks 78% of the time</p>
            </div>

            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-lg text-slate-900">Confidence Level</span>
                <span className="text-lg text-sky-600">Growing Strong</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-4 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-sky-400 to-sky-600 rounded-full" style={{ width: '83%' }}></div>
              </div>
              <p className="text-sm text-slate-600 mt-2">Showing more consistent decision-making each week</p>
            </div>

            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-lg text-slate-900">Response Speed</span>
                <span className="text-lg text-violet-600">Much Improved</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-4 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-violet-400 to-violet-600 rounded-full" style={{ width: '72%' }}></div>
              </div>
              <p className="text-sm text-slate-600 mt-2">Making decisions more quickly and confidently</p>
            </div>
          </div>
        </div>

        {/* Recent Sessions */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Calendar className="w-7 h-7 text-violet-600" />
            <h2 className="text-2xl text-slate-900">Recent Practice Sessions</h2>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-4 p-4 bg-emerald-50 rounded-xl">
              <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <div className="text-slate-900 mb-1">January 29, 2026</div>
                <div className="text-sm text-emerald-700">Great session! Showed improved awareness</div>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-sky-50 rounded-xl">
              <div className="w-12 h-12 bg-sky-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <div className="text-slate-900 mb-1">January 26, 2026</div>
                <div className="text-sm text-sky-700">Excellent progress with consistent performance</div>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-violet-50 rounded-xl">
              <div className="w-12 h-12 bg-violet-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <div className="text-slate-900 mb-1">January 22, 2026</div>
                <div className="text-sm text-violet-700">Strong session with faster decision-making</div>
              </div>
            </div>
          </div>
        </div>

        {/* Safety & Privacy */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-2xl p-6 mb-8">
          <div className="flex gap-4 items-start">
            <Shield className="w-7 h-7 text-green-700 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl mb-3 text-green-900">Your Child's Safety & Privacy</h3>
              <div className="space-y-2 text-green-800">
                <p className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>All practice happens in a safe, controlled virtual environment</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>Qualified therapists supervise every session</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>No personal information or images are collected</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>Only general progress data is shown in this summary</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>Your child can stop any practice session at any time</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Privacy Notice */}
        <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-6">
          <h3 className="text-lg mb-2 text-slate-900">What You Don't See Here</h3>
          <p className="text-slate-700 leading-relaxed">
            This summary is intentionally simplified. Detailed behavioral data, clinical assessments, and 
            treatment decisions remain confidential between your child's therapist and clinical team. 
            For specific questions about treatment progress, please contact your child's therapist directly.
          </p>
        </div>
      </div>
    </div>
  );
}
