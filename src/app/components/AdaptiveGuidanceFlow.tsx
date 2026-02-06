import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle, AlertTriangle, Settings, Brain, User, Shield } from 'lucide-react';
import DemoNav from './DemoNav';

export default function AdaptiveGuidanceFlow() {
  const navigate = useNavigate();

  const steps = [
    {
      icon: User,
      color: 'sky',
      title: 'Child Hesitation Detected',
      description: 'VR system identifies multiple retry attempts or extended decision time during crossing scenario',
      details: 'Behavioral markers: 3+ hesitations, >8s decision time, incomplete action sequences'
    },
    {
      icon: Brain,
      color: 'violet',
      title: 'AI Flags Potential Overload',
      description: 'Machine learning model recognizes pattern consistent with cognitive overload based on historical data',
      details: 'Confidence: 87% | Similar patterns in 23 previous sessions across patient cohort'
    },
    {
      icon: Settings,
      color: 'emerald',
      title: 'System Suggests Complexity Reduction',
      description: 'Automated recommendation generated to reduce difficulty from Level 3 to Level 2',
      details: 'Proposed changes: Reduce traffic density by 30%, increase decision window to 10s'
    },
    {
      icon: Shield,
      color: 'amber',
      title: 'Therapist Approval Required',
      description: 'Alert sent to therapist dashboard - no changes implemented without explicit approval',
      details: 'Therapist can: Accept, Modify, Reject, or Override with custom parameters'
    },
    {
      icon: CheckCircle,
      color: 'green',
      title: 'Implementation After Approval',
      description: 'Only after therapist authorization are any environmental modifications applied to VR session',
      details: 'All decisions logged with timestamp, therapist ID, and clinical rationale'
    }
  ];

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
            <Settings className="w-8 h-8 text-emerald-600" />
            <div>
              <h1 className="text-2xl text-slate-900">Adaptive Guidance System Logic</h1>
              <p className="text-sm text-slate-600">Safety-First Automated Response Protocol</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Introduction */}
        <div className="bg-violet-50 border-2 border-violet-200 rounded-2xl p-6 mb-8">
          <h2 className="text-xl mb-3 text-violet-900">How Adaptive Support Works</h2>
          <p className="text-violet-800 leading-relaxed">
            This system uses real-time behavioral analysis to identify when a child may be experiencing difficulty. 
            <strong> All suggested adaptations require therapist approval before implementation.</strong> This ensures 
            clinical oversight while providing data-driven decision support.
          </p>
        </div>

        {/* Flow Diagram */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl mb-8 text-slate-900">Step-by-Step Process Flow</h2>
          
          <div className="space-y-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const colorClasses = {
                sky: {
                  bg: 'bg-sky-100',
                  text: 'text-sky-700',
                  border: 'border-sky-300',
                  iconBg: 'bg-sky-600'
                },
                violet: {
                  bg: 'bg-violet-100',
                  text: 'text-violet-700',
                  border: 'border-violet-300',
                  iconBg: 'bg-violet-600'
                },
                emerald: {
                  bg: 'bg-emerald-100',
                  text: 'text-emerald-700',
                  border: 'border-emerald-300',
                  iconBg: 'bg-emerald-600'
                },
                amber: {
                  bg: 'bg-amber-100',
                  text: 'text-amber-700',
                  border: 'border-amber-300',
                  iconBg: 'bg-amber-600'
                },
                green: {
                  bg: 'bg-green-100',
                  text: 'text-green-700',
                  border: 'border-green-300',
                  iconBg: 'bg-green-600'
                }
              };
              
              const colors = colorClasses[step.color as keyof typeof colorClasses];

              return (
                <div key={index}>
                  <div className={`${colors.bg} border-2 ${colors.border} rounded-2xl p-6`}>
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className={`w-14 h-14 ${colors.iconBg} rounded-xl flex items-center justify-center`}>
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className={`text-lg ${colors.text}`}>
                            Step {index + 1}: {step.title}
                          </h3>
                          <div className={`px-3 py-1 bg-white rounded-lg text-sm ${colors.text}`}>
                            {index === 0 && 'Detection'}
                            {index === 1 && 'Analysis'}
                            {index === 2 && 'Suggestion'}
                            {index === 3 && 'Authorization'}
                            {index === 4 && 'Implementation'}
                          </div>
                        </div>
                        
                        <p className={`mb-3 ${colors.text}`}>
                          {step.description}
                        </p>
                        
                        <div className="bg-white bg-opacity-70 rounded-lg p-3">
                          <p className={`text-sm ${colors.text}`}>
                            <strong>Technical Details:</strong> {step.details}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {index < steps.length - 1 && (
                    <div className="flex justify-center py-3">
                      <ArrowRight className="w-6 h-6 text-slate-400 rotate-90" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Configuration Panel */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl mb-6 text-slate-900">Therapist-Configurable Settings</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border-2 border-slate-200 rounded-xl p-5">
              <h3 className="mb-3 text-slate-900">Sensitivity Thresholds</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Hesitation trigger</span>
                  <span className="text-sm text-slate-900 font-medium">3 attempts</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Decision time threshold</span>
                  <span className="text-sm text-slate-900 font-medium">8 seconds</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Stress level alert</span>
                  <span className="text-sm text-slate-900 font-medium">60%</span>
                </div>
              </div>
              <button className="w-full mt-4 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-900 rounded-lg transition-colors">
                Customize Thresholds
              </button>
            </div>

            <div className="border-2 border-slate-200 rounded-xl p-5">
              <h3 className="mb-3 text-slate-900">Automation Permissions</h3>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="w-5 h-5 accent-sky-600" defaultChecked={false} />
                  <span className="text-sm text-slate-700">Allow automatic difficulty reduction</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="w-5 h-5 accent-sky-600" defaultChecked={false} />
                  <span className="text-sm text-slate-700">Allow automatic sensory adjustment</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="w-5 h-5 accent-sky-600" defaultChecked={true} />
                  <span className="text-sm text-slate-700">Require approval for all changes</span>
                </label>
              </div>
              <p className="text-xs text-slate-500 mt-4">
                Currently configured: All modifications require explicit therapist authorization
              </p>
            </div>
          </div>
        </div>

        {/* Safety Guarantee */}
        <div className="bg-green-50 border-2 border-green-300 rounded-2xl p-6">
          <div className="flex gap-4 items-start">
            <Shield className="w-6 h-6 text-green-700 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg mb-2 text-green-900">Clinical Safety Guarantee</h3>
              <p className="text-green-800 leading-relaxed">
                <strong>All automatic adjustments are therapist-configurable and logged.</strong> The system defaults 
                to requiring explicit approval for any environmental changes. Therapists maintain complete authority 
                to accept, modify, or reject any AI-generated suggestions. No autonomous decisions are made without 
                clinical oversight.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
