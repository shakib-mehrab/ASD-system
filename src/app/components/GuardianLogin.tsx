import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { Heart, ArrowLeft, Shield } from 'lucide-react';

export function GuardianLogin() {
  const [patientId, setPatientId] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState('');
  
  const navigate = useNavigate();
  const { loginGuardian } = useAuth();

  const handleSendOTP = async (e: React.FormEvent) => {
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
    const success = await loginGuardian(patientId, phone);
    
    if (success) {
      navigate('/guardian/dashboard');
    } else {
      setError('Invalid Patient ID or phone number. Please check your credentials.');
      setShowOTP(false);
      setOtp('');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-6 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        <Card className="p-8 shadow-2xl bg-white/90 backdrop-blur border-0">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Guardian Access
            </h1>
            <p className="text-gray-600">
              Access your child's therapy progress and sessions
            </p>
          </div>

          {!showOTP ? (
            <form onSubmit={handleSendOTP} className="space-y-6">
              <div>
                <Label htmlFor="patientId" className="text-gray-700 font-medium">
                  Patient ID
                </Label>
                <Input
                  id="patientId"
                  type="text"
                  placeholder="e.g., P001"
                  value={patientId}
                  onChange={(e) => setPatientId(e.target.value)}
                  required
                  className="mt-2 h-12 text-lg"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Your child's Patient ID from registration
                </p>
              </div>

              <div>
                <Label htmlFor="phone" className="text-gray-700 font-medium">
                  Guardian Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1-555-1001"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="mt-2 h-12 text-lg"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Registered phone number
                </p>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
                  <Shield className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 text-lg bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-lg"
              >
                {isLoading ? 'Sending Code...' : 'Send Verification Code'}
              </Button>

              <div className="mt-4 p-4 bg-amber-50 rounded-xl border border-amber-200">
                <p className="text-xs text-amber-900 font-semibold mb-2">Demo Credentials:</p>
                <div className="space-y-1">
                  <p className="text-xs text-amber-800"><strong>Patient ID:</strong> P001, P002, P003, or P004</p>
                  <p className="text-xs text-amber-800"><strong>Phone:</strong> 01, 02, +1-555-1003, or +1-555-1004</p>
                  <p className="text-xs text-amber-700 mt-2 italic">Use any 4-digit code for OTP verification</p>
                </div>
              </div>
            </form>
          ) : (
            <form onSubmit={handleVerifyOTP} className="space-y-6">
              <div>
                <Label htmlFor="otp" className="text-gray-700 font-medium">
                  Verification Code
                </Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="Enter 4-digit code"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  required
                  maxLength={4}
                  className="mt-2 h-12 text-2xl text-center tracking-widest font-semibold"
                />
                <p className="text-sm text-gray-500 mt-1 text-center">
                  Code sent to {phone}
                </p>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
                  <Shield className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              <div className="space-y-3">
                <Button
                  type="submit"
                  disabled={isLoading || otp.length !== 4}
                  className="w-full h-12 text-lg bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-lg"
                >
                  {isLoading ? 'Verifying...' : 'Verify & Login'}
                </Button>
                
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowOTP(false);
                    setOtp('');
                    setError('');
                  }}
                  className="w-full h-12"
                >
                  Use Different Number
                </Button>
              </div>
            </form>
          )}

          {/* <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-center text-sm text-gray-600">
              For demo: Use any Patient ID (P001-P004) with their guardian phone from registration
            </p>
          </div> */}
        </Card>
      </div>
    </div>
  );
}
