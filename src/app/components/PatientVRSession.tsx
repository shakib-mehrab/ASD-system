import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pause, Square, Volume2, VolumeX } from 'lucide-react';
import DemoNav from './DemoNav';

export default function PatientVRSession() {
  const navigate = useNavigate();
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-sky-50 to-emerald-50">
      <DemoNav />
      
      {/* VR Environment Simulation */}
      <div className="relative h-[calc(100vh-80px)] flex items-center justify-center">
        {/* Calm VR Environment Placeholder */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center p-12 bg-white/30 backdrop-blur-sm rounded-3xl">
            <p className="text-3xl text-slate-700 mb-4">🏙️</p>
            <p className="text-xl text-slate-600">Virtual Street Environment</p>
            <p className="text-sm text-slate-500 mt-2">Calm, controlled practice space</p>
          </div>
        </div>

        {/* Minimal Overlay UI */}
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 flex gap-4">
          {/* Environment Indicator */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-lg">
            <p className="text-sm text-slate-600">Environment: Street Crossing</p>
          </div>
        </div>

        {/* Bottom Controls */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4">
          {/* Pause Button */}
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="w-16 h-16 bg-white hover:bg-slate-50 rounded-full shadow-xl flex items-center justify-center transition-all"
            title={isPaused ? 'Resume' : 'Pause'}
          >
            <Pause className="w-8 h-8 text-slate-700" />
          </button>

          {/* Sound Toggle */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="w-16 h-16 bg-white hover:bg-slate-50 rounded-full shadow-xl flex items-center justify-center transition-all"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? (
              <VolumeX className="w-8 h-8 text-slate-700" />
            ) : (
              <Volume2 className="w-8 h-8 text-slate-700" />
            )}
          </button>

          {/* Exit Button */}
          <button
            onClick={() => navigate('/patient/adaptive-guidance')}
            className="px-8 py-4 bg-sky-600 hover:bg-sky-700 text-white rounded-full shadow-xl flex items-center gap-2 transition-all"
          >
            <Square className="w-5 h-5" />
            Continue
          </button>
        </div>

        {/* Pause Overlay */}
        {isPaused && (
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-white rounded-3xl p-12 text-center shadow-2xl max-w-md">
              <h2 className="text-3xl mb-4 text-slate-900">Paused</h2>
              <p className="text-lg text-slate-600 mb-8">Take your time</p>
              <button
                onClick={() => setIsPaused(false)}
                className="px-12 py-5 bg-sky-600 hover:bg-sky-700 text-white rounded-2xl text-xl transition-all"
              >
                Resume
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
