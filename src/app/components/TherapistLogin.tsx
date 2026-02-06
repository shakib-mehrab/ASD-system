import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Lock, User, Shield, ArrowRight, AlertCircle } from 'lucide-react';

export default function TherapistLogin() {
  const navigate = useNavigate();
  const { loginTherapist } = useAuth();
  const [therapistId, setTherapistId] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState('');

  const handleSendOTP = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate OTP sending delay
    setTimeout(() => {
      setShowOTP(true);
      setIsLoading(false);
    }, 1000);
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Mock OTP verification (accept any 4-digit code)
    if (otp.length !== 4) {
      setError('Please enter a valid 4-digit code');
      setIsLoading(false);
      return;
    }

    // Attempt login
    const success = await loginTherapist(therapistId, phone);
    
    if (success) {
      navigate('/therapist/patients');
    } else {
      setError('Invalid Therapist ID or phone number. Please check your credentials.');
      setShowOTP(false);
      setOtp('');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-emerald-50">
      <div className="max-w-md mx-auto px-6 py-16 flex flex-col items-center justify-center min-h-screen">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-10 h-10 text-emerald-600" />
          </div>
          <h1 className="text-3xl mb-2 text-slate-900">Therapist Portal</h1>
          <p className="text-slate-600">Secure clinical access</p>
        </div>

        {/* Login Form */}
        {!showOTP ? (
          <form onSubmit={handleSendOTP} className="w-full bg-white rounded-3xl shadow-lg p-8">
            <div className="mb-6">
              <label className="block text-sm mb-2 text-slate-700 font-medium">
                Therapist ID
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  value={therapistId}
                  onChange={(e) => setTherapistId(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-emerald-400 transition-colors"
                  placeholder="e.g., T001"
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm mb-2 text-slate-700 font-medium">
                Phone Number
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-emerald-400 transition-colors"
                  placeholder="+1-555-0101"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? 'Sending Code...' : 'Send Verification Code'}
              <ArrowRight className="w-5 h-5" />
            </button>

            <div className="mt-6 p-4 bg-sky-50 rounded-xl">
              <p className="text-xs text-sky-900 font-medium mb-1">Demo Credentials:</p>
              <p className="text-xs text-sky-700">T001 / 018 or T002 / 017</p>
            </div>
          </form>
        ) : (
          <form onSubmit={handleVerifyOTP} className="w-full bg-white rounded-3xl shadow-lg p-8">
            <div className="mb-6">
              <label className="block text-sm mb-2 text-slate-700 font-medium">
                Verification Code
              </label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 4))}
                className="w-full py-4 text-3xl text-center tracking-widest font-semibold border-2 border-slate-200 rounded-xl focus:outline-none focus:border-emerald-400 transition-colors"
                placeholder="• • • •"
                required
                maxLength={4}
              />
              <p className="text-sm text-slate-500 mt-2 text-center">
                Code sent to {phone}
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading || otp.length !== 4}
              className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? 'Verifying...' : 'Verify & Sign In'}
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={() => {
                setShowOTP(false);
                setOtp('');
                setError('');
              }}
              className="w-full mt-4 py-3 text-slate-600 hover:text-slate-900 transition-colors"
            >
              Use Different Number
            </button>
          </form>
        )}

        {/* Security Note */}
        <div className="mt-6 text-center">
          <p className="text-xs text-slate-500">
            HIPAA-compliant secure authentication
          </p>
        </div>

        {/* Back to Home */}
        <button
          onClick={() => navigate('/')}
          className="mt-6 text-sm text-slate-600 hover:text-sky-600 transition-colors"
        >
          ← Back to Home
        </button>
      </div>
    </div>
  );
}
