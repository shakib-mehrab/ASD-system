import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, Check, Lock, Eye, UserCheck, FileText, AlertCircle, Heart } from 'lucide-react';
import DemoNav from './DemoNav';

export default function PrivacyEthics() {
  const navigate = useNavigate();

  const safetyChecklist = [
    {
      icon: Eye,
      title: 'No Facial Recognition',
      description: 'System does not use facial recognition, emotion detection, or any biometric identification technologies',
      color: 'emerald'
    },
    {
      icon: Lock,
      title: 'Anonymized Behavioral Data',
      description: 'All patient data is anonymized using secure ID codes. No names, photos, or personally identifying information is stored',
      color: 'sky'
    },
    {
      icon: Shield,
      title: 'Encrypted Storage',
      description: 'All data transmission and storage uses AES-256 encryption and complies with HIPAA security standards',
      color: 'violet'
    },
    {
      icon: UserCheck,
      title: 'Parental Consent Required',
      description: 'Written informed consent from parent/guardian is mandatory before any system use or data collection',
      color: 'rose'
    },
    {
      icon: Heart,
      title: 'Therapist-Only Decision Authority',
      description: 'AI provides recommendations only. All clinical decisions require explicit authorization from licensed therapists',
      color: 'amber'
    }
  ];

  const ethicalPrinciples = [
    {
      title: 'Human-in-the-Loop Design',
      points: [
        'Therapists maintain complete control over all treatment decisions',
        'AI serves as a decision support tool, never as an autonomous decision-maker',
        'Override capabilities available at all times during VR sessions',
        'All AI recommendations include transparent explanations'
      ]
    },
    {
      title: 'Child Safety & Well-being',
      points: [
        'Sessions can be paused or stopped immediately at any time',
        'Sensory load and difficulty are carefully controlled and monitored',
        'Real-time stress indicators with automatic alerts for potential overload',
        'Age-appropriate, non-threatening virtual environments'
      ]
    },
    {
      title: 'Data Minimization',
      points: [
        'Only behavioral interaction data is collected (no audio, video, or biometrics)',
        'Data retention limited to clinical necessity period',
        'Automatic data anonymization and aggregation',
        'Parents can request data deletion at any time'
      ]
    },
    {
      title: 'Transparency & Explainability',
      points: [
        'All AI insights include clear data sources and reasoning',
        'No "black box" predictions without clinical context',
        'Visual data representations accessible to non-technical stakeholders',
        'Regular reporting to parents/guardians in simplified language'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-emerald-50">
      <DemoNav />
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-slate-600 hover:text-sky-600 transition-colors mb-3"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </button>
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-emerald-600" />
            <div>
              <h1 className="text-2xl text-slate-900">Privacy, Ethics & Safety Standards</h1>
              <p className="text-sm text-slate-600">Commitment to Responsible AI in Healthcare</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Introduction */}
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-300 rounded-2xl p-8 mb-8">
          <h2 className="text-2xl mb-4 text-emerald-900">Our Commitment to Ethical AI</h2>
          <p className="text-emerald-800 text-lg leading-relaxed mb-4">
            This Clinical Decision Support System is built on principles of transparency, safety, and 
            human-centered design. We recognize the sensitive nature of working with vulnerable populations 
            and have implemented rigorous safeguards to protect patient privacy and ensure ethical use of AI.
          </p>
          <p className="text-emerald-800 text-lg leading-relaxed">
            <strong>This system is designed to assist therapists, not replace them.</strong> Clinical 
            judgment and human empathy remain at the center of all treatment decisions.
          </p>
        </div>

        {/* Safety Checklist */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Check className="w-7 h-7 text-emerald-600" />
            <h2 className="text-2xl text-slate-900">Safety & Privacy Checklist</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {safetyChecklist.map((item, index) => {
              const Icon = item.icon;
              const colorClasses = {
                emerald: 'bg-emerald-50 border-emerald-200 text-emerald-700',
                sky: 'bg-sky-50 border-sky-200 text-sky-700',
                violet: 'bg-violet-50 border-violet-200 text-violet-700',
                rose: 'bg-rose-50 border-rose-200 text-rose-700',
                amber: 'bg-amber-50 border-amber-200 text-amber-700'
              };

              return (
                <div key={index} className={`${colorClasses[item.color as keyof typeof colorClasses]} border-2 rounded-xl p-6`}>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                        <Icon className="w-6 h-6" />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Check className="w-5 h-5 text-green-600" />
                        <h3 className="text-lg">{item.title}</h3>
                      </div>
                      <p className="text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Ethical Principles */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <FileText className="w-7 h-7 text-violet-600" />
            <h2 className="text-2xl text-slate-900">Core Ethical Principles</h2>
          </div>

          <div className="space-y-6">
            {ethicalPrinciples.map((principle, index) => (
              <div key={index} className="border-2 border-slate-200 rounded-xl p-6">
                <h3 className="text-xl mb-4 text-slate-900">{principle.title}</h3>
                <div className="space-y-2">
                  {principle.points.map((point, pointIndex) => (
                    <div key={pointIndex} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <p className="text-slate-700">{point}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Regulatory Compliance */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-7 h-7 text-sky-600" />
            <h2 className="text-2xl text-slate-900">Regulatory Compliance</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-sky-50 border-2 border-sky-200 rounded-xl p-5 text-center">
              <Shield className="w-10 h-10 text-sky-600 mx-auto mb-3" />
              <h3 className="mb-2 text-sky-900">HIPAA Compliant</h3>
              <p className="text-sm text-sky-700">
                Adheres to Health Insurance Portability and Accountability Act privacy and security requirements
              </p>
            </div>

            <div className="bg-violet-50 border-2 border-violet-200 rounded-xl p-5 text-center">
              <Lock className="w-10 h-10 text-violet-600 mx-auto mb-3" />
              <h3 className="mb-2 text-violet-900">FDA Guidelines</h3>
              <p className="text-sm text-violet-700">
                Designed as Clinical Decision Support (not diagnostic), following FDA software classification
              </p>
            </div>

            <div className="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-5 text-center">
              <UserCheck className="w-10 h-10 text-emerald-600 mx-auto mb-3" />
              <h3 className="mb-2 text-emerald-900">IRB Approved</h3>
              <p className="text-sm text-emerald-700">
                All research protocols reviewed and approved by Institutional Review Board
              </p>
            </div>
          </div>
        </div>

        {/* What This System Does NOT Do */}
        <div className="bg-red-50 border-2 border-red-300 rounded-2xl p-6 mb-8">
          <div className="flex gap-4 items-start">
            <AlertCircle className="w-7 h-7 text-red-700 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl mb-3 text-red-900">Important Limitations</h3>
              <div className="space-y-2 text-red-800">
                <p className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">✗</span>
                  <span><strong>NOT a diagnostic tool</strong> - Does not diagnose autism or any medical condition</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">✗</span>
                  <span><strong>NOT autonomous treatment</strong> - Cannot provide therapy without human supervision</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">✗</span>
                  <span><strong>NOT a replacement for therapists</strong> - Designed to support, not replace, clinical expertise</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">✗</span>
                  <span><strong>NOT for emergency use</strong> - This is a skill-training tool, not for crisis intervention</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">✗</span>
                  <span><strong>NOT suitable for all patients</strong> - Clinical assessment required to determine appropriateness</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact & Accountability */}
        <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-6">
          <h3 className="text-xl mb-4 text-slate-900">Accountability & Transparency</h3>
          <div className="space-y-3 text-slate-700">
            <p>
              <strong>Questions or Concerns?</strong> Parents, guardians, and patients have the right to 
              understand how their data is used and how clinical decisions are made.
            </p>
            <p>
              <strong>Data Access:</strong> Parents/guardians may request access to, correction of, or deletion 
              of their child's data at any time.
            </p>
            <p>
              <strong>Reporting:</strong> Any ethical concerns, privacy incidents, or safety issues can be 
              reported to the institutional review board or clinical oversight committee.
            </p>
          </div>

          <div className="mt-6 p-4 bg-white rounded-xl">
            <p className="text-sm text-slate-600">
              <strong>Version:</strong> 1.0 | <strong>Last Updated:</strong> January 2026 | 
              <strong> Compliance Officer:</strong> healthcare-ethics@example.org
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
