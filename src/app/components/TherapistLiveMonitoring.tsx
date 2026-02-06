import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Activity, Pause, Square, AlertTriangle, 
  CheckCircle, Eye, Volume2, TrendingDown, Shield, Brain, XCircle, Zap
} from 'lucide-react';
import DemoNav from './DemoNav';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';

interface AdaptiveAlert {
  id: string;
  timestamp: number;
  severity: 'info' | 'warning' | 'critical';
  type: string;
  message: string;
  aiSuggestion: string;
  autoAction?: string;
  dismissed: boolean;
}

export default function TherapistLiveMonitoring() {
  const navigate = useNavigate();
  const [isSessionActive, setIsSessionActive] = useState(true);
  const [sessionTime, setSessionTime] = useState(0);
  const [heartRate, setHeartRate] = useState(78);
  const [stressLevel, setStressLevel] = useState(25);
  const [focusLevel, setFocusLevel] = useState(85);
  const [adaptiveAlerts, setAdaptiveAlerts] = useState<AdaptiveAlert[]>([]);
  const [anomalyDetected, setAnomalyDetected] = useState(false);

  useEffect(() => {
    if (isSessionActive) {
      const timer = setInterval(() => {
        setSessionTime((prev) => prev + 1);
        
        // Simulate realistic biometric variations with occasional spikes
        const timeProgress = sessionTime;
        
        // Simulate stress spike at 45 seconds
        if (timeProgress === 45 && !adaptiveAlerts.find(a => a.id === 'stress-spike-1')) {
          setHeartRate(108);
          setStressLevel(72);
          setFocusLevel(55);
          setAnomalyDetected(true);
          
          const newAlert: AdaptiveAlert = {
            id: 'stress-spike-1',
            timestamp: Date.now(),
            severity: 'warning',
            type: 'elevated_stress',
            message: 'Heart rate elevated to 108 bpm (baseline: 78 bpm)',
            aiSuggestion: 'Recommend pausing session for 30 seconds. Reduce crowd density from 15 to 8 NPCs.',
            autoAction: 'Auto-pause in 10 seconds if HR remains >105 bpm',
            dismissed: false
          };
          
          setAdaptiveAlerts(prev => [...prev, newAlert]);
        } else if (timeProgress > 45 && timeProgress < 55) {
          // Elevated period
          setHeartRate(105 + Math.floor(Math.random() * 8));
          setStressLevel(65 + Math.floor(Math.random() * 10));
          setFocusLevel(50 + Math.floor(Math.random() * 10));
        } else if (timeProgress === 55 && anomalyDetected) {
          // Recovery starts
          const recoveryAlert: AdaptiveAlert = {
            id: 'recovery-1',
            timestamp: Date.now(),
            severity: 'info',
            type: 'stress_recovery',
            message: 'Patient showing signs of recovery. HR decreasing.',
            aiSuggestion: 'Continue monitoring. Consider resuming at reduced difficulty.',
            dismissed: false
          };
          setAdaptiveAlerts(prev => [...prev, recoveryAlert]);
          setAnomalyDetected(false);
        } else if (timeProgress > 55) {
          // Back to normal with variation
          setHeartRate(75 + Math.floor(Math.random() * 10));
          setStressLevel(20 + Math.floor(Math.random() * 15));
          setFocusLevel(80 + Math.floor(Math.random() * 15));
        } else {
          // Normal baseline
          setHeartRate(75 + Math.floor(Math.random() * 10));
          setStressLevel(20 + Math.floor(Math.random() * 15));
          setFocusLevel(80 + Math.floor(Math.random() * 15));
        }

        // Check for focus drop
        if (timeProgress === 75 && !adaptiveAlerts.find(a => a.id === 'focus-drop-1')) {
          setFocusLevel(45);
          const focusAlert: AdaptiveAlert = {
            id: 'focus-drop-1',
            timestamp: Date.now(),
            severity: 'warning',
            type: 'low_engagement',
            message: 'Focus level dropped to 45% (normal: 80%+)',
            aiSuggestion: 'Introduce interactive prompt or increase reward frequency. Patient may be experiencing fatigue.',
            dismissed: false
          };
          setAdaptiveAlerts(prev => [...prev, focusAlert]);
        }
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isSessionActive, sessionTime, adaptiveAlerts, anomalyDetected]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePauseSession = () => {
    setIsSessionActive(!isSessionActive);
  };

  const handleStopSession = () => {
    navigate('/therapist/reports');
  };

  const dismissAlert = (alertId: string) => {
    setAdaptiveAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, dismissed: true } : alert
    ));
  };

  const implementAISuggestion = (alertId: string) => {
    // In production, this would trigger actual changes to the VR environment
    dismissAlert(alertId);
    alert('AI suggestion implemented. Session parameters adjusted.');
  };

  const getAlertColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'border-rose-500 bg-rose-50';
      case 'warning': return 'border-amber-500 bg-amber-50';
      case 'info': return 'border-sky-500 bg-sky-50';
      default: return 'border-slate-300 bg-slate-50';
    }
  };

  const getAlertIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return <AlertTriangle className="w-5 h-5 text-rose-600" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-amber-600" />;
      case 'info': return <CheckCircle className="w-5 h-5 text-sky-600" />;
      default: return <Activity className="w-5 h-5 text-slate-600" />;
    }
  };

  const activeAlerts = adaptiveAlerts.filter(a => !a.dismissed);
  const hasHighPriority = activeAlerts.some(a => a.severity === 'warning' || a.severity === 'critical');

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-emerald-50">
      <DemoNav />
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div>
            <h1 className="text-3xl mb-1 text-slate-900">Live Session Monitoring</h1>
            <p className="text-slate-600">Patient: Child A (ASD-047) • Scenario: Street Crossing</p>
          </div>

          <div className="flex items-center gap-2">
            <div className={`px-4 py-2 rounded-xl ${isSessionActive ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${isSessionActive ? 'bg-emerald-600 animate-pulse' : 'bg-amber-600'}`}></div>
                {isSessionActive ? 'Session Active' : 'Session Paused'}
              </div>
            </div>
            <div className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl">
              {formatTime(sessionTime)}
            </div>
          </div>
        </div>

        {/* Emergency Controls */}
        <div className="bg-white border-2 border-slate-200 rounded-2xl shadow-md p-6 mb-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-emerald-600" />
              <div>
                <h2 className="text-lg text-slate-900">Session Controls</h2>
                <p className="text-sm text-slate-600">Therapist maintains full authority</p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handlePauseSession}
                className="px-6 py-3 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-xl transition-all flex items-center gap-2 border-2 border-amber-300"
              >
                <Pause className="w-5 h-5" />
                {isSessionActive ? 'Pause' : 'Resume'}
              </button>
              <button
                onClick={handleStopSession}
                className="px-6 py-3 bg-red-100 hover:bg-red-200 text-red-900 rounded-xl transition-all flex items-center gap-2 border-2 border-red-300"
              >
                <Square className="w-5 h-5" />
                Stop Session
              </button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Real-time Metrics */}
          <div className="lg:col-span-2 space-y-6">
            {/* VR View Placeholder */}
            <div className="bg-slate-900 rounded-2xl shadow-lg aspect-video flex items-center justify-center relative overflow-hidden">
              <div className="text-center">
                <p className="text-3xl mb-3">🚦</p>
                <p className="text-white text-lg">VR Environment Feed</p>
                <p className="text-slate-400 text-sm">Street Crossing Scenario</p>
              </div>
              
              {/* Overlay Info */}
              <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-xl text-white text-sm">
                Current Task: Look both ways
              </div>
              
              <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-xl text-white text-sm">
                Difficulty: Level 3
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-xl mb-4 text-slate-900">Session Progress</h2>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-slate-600">Task Completion</span>
                    <span className="text-sm text-slate-900">3/5 steps</span>
                  </div>
                  <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-slate-600">Response Accuracy</span>
                    <span className="text-sm text-slate-900">85%</span>
                  </div>
                  <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-sky-500 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-slate-600">Engagement Level</span>
                    <span className="text-sm text-slate-900">High</span>
                  </div>
                  <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-violet-500 rounded-full" style={{ width: '90%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Monitoring Dashboard */}
          <div className="space-y-6">
            {/* Vital Signs */}
            <div className={`bg-white rounded-2xl shadow-md p-6 transition-all ${anomalyDetected ? 'ring-2 ring-amber-400' : ''}`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-sky-600" />
                  <h2 className="text-lg text-slate-900">Vital Signs</h2>
                </div>
                {anomalyDetected && (
                  <Badge className="bg-amber-100 text-amber-700 border-amber-300 border animate-pulse">
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    Anomaly
                  </Badge>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-slate-600">Heart Rate</span>
                    <span className={`text-lg ${heartRate > 100 ? 'text-amber-700 animate-pulse' : 'text-slate-900'}`}>
                      {heartRate} bpm
                    </span>
                  </div>
                  <p className={`text-xs ${heartRate > 100 ? 'text-amber-600' : 'text-emerald-600'}`}>
                    {heartRate > 100 ? '⚠️ Elevated (baseline: 78 bpm)' : 'Normal range'}
                  </p>
                </div>

                <div className="border-t border-slate-100 pt-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-slate-600">Stress Level</span>
                    <span className={`text-lg ${stressLevel > 60 ? 'text-amber-700 animate-pulse' : 'text-slate-900'}`}>
                      {stressLevel}%
                    </span>
                  </div>
                  <p className={`text-xs ${stressLevel > 60 ? 'text-amber-600' : 'text-emerald-600'}`}>
                    {stressLevel > 60 ? '⚠️ Above comfort zone' : 'Within comfort zone'}
                  </p>
                </div>

                <div className="border-t border-slate-100 pt-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-slate-600">Focus Level</span>
                    <span className={`text-lg ${focusLevel < 60 ? 'text-amber-700' : 'text-slate-900'}`}>
                      {focusLevel}%
                    </span>
                  </div>
                  <p className={`text-xs ${focusLevel < 60 ? 'text-amber-600' : 'text-emerald-600'}`}>
                    {focusLevel < 60 ? '⚠️ Below optimal' : 'Good engagement'}
                  </p>
                </div>
              </div>
            </div>

            {/* Sensory Status */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <div className="flex items-center gap-2 mb-4">
                <Eye className="w-5 h-5 text-violet-600" />
                <h2 className="text-lg text-slate-900">Sensory Status</h2>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-xl">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span className="text-sm text-slate-700">Visual</span>
                  </div>
                  <span className="text-xs text-emerald-700 bg-emerald-100 px-2 py-1 rounded-lg">Normal</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-xl">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span className="text-sm text-slate-700">Auditory</span>
                  </div>
                  <span className="text-xs text-emerald-700 bg-emerald-100 px-2 py-1 rounded-lg">Normal</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-sky-50 rounded-xl">
                  <div className="flex items-center gap-2">
                    <Volume2 className="w-4 h-4 text-sky-600" />
                    <span className="text-sm text-slate-700">Motion</span>
                  </div>
                  <span className="text-xs text-sky-700 bg-sky-100 px-2 py-1 rounded-lg">Comfortable</span>
                </div>
              </div>
            </div>

            {/* AI Alerts */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-violet-600" />
                  <h2 className="text-lg text-slate-900">AI Adaptive Alerts</h2>
                </div>
                {hasHighPriority && (
                  <Badge className="bg-amber-100 text-amber-700 border-amber-300 border animate-pulse">
                    {activeAlerts.length} Active
                  </Badge>
                )}
              </div>

              <div className="space-y-3 max-h-96 overflow-y-auto">
                {activeAlerts.length === 0 ? (
                  <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
                    <div className="flex items-center gap-2 mb-1">
                      <CheckCircle className="w-5 h-5 text-emerald-600" />
                      <span className="text-sm text-emerald-900">All Systems Normal</span>
                    </div>
                    <p className="text-xs text-emerald-700">No interventions needed</p>
                  </div>
                ) : (
                  activeAlerts.map((alert) => (
                    <Card key={alert.id} className={`p-4 border-l-4 ${getAlertColor(alert.severity)}`}>
                      <div className="flex items-start gap-3 mb-3">
                        {getAlertIcon(alert.severity)}
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <p className="text-sm text-slate-900"><strong>{alert.message}</strong></p>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => dismissAlert(alert.id)}
                              className="h-6 w-6 p-0 hover:bg-slate-200"
                            >
                              <XCircle className="w-4 h-4" />
                            </Button>
                          </div>

                          <div className="bg-white/80 p-3 rounded-lg mb-3 border border-slate-200">
                            <p className="text-xs text-violet-700 mb-1 flex items-center gap-1">
                              <Brain className="w-3 h-3" />
                              <strong>AI Recommendation:</strong>
                            </p>
                            <p className="text-xs text-slate-700">{alert.aiSuggestion}</p>
                          </div>

                          {alert.autoAction && (
                            <div className="bg-amber-100 border border-amber-300 p-2 rounded-lg mb-3">
                              <p className="text-xs text-amber-900 flex items-center gap-1">
                                <Zap className="w-3 h-3" />
                                {alert.autoAction}
                              </p>
                            </div>
                          )}

                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() => implementAISuggestion(alert.id)}
                              className="bg-violet-600 hover:bg-violet-700 text-xs h-7"
                            >
                              Implement AI Suggestion
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => dismissAlert(alert.id)}
                              className="text-xs h-7"
                            >
                              Override
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))
                )}
              </div>

              {adaptiveAlerts.filter(a => a.dismissed).length > 0 && (
                <div className="mt-3 pt-3 border-t border-slate-200">
                  <p className="text-xs text-slate-500">
                    {adaptiveAlerts.filter(a => a.dismissed).length} alert(s) dismissed
                  </p>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-lg mb-4 text-slate-900">Quick Actions</h2>
              
              <div className="space-y-2">
                <button className="w-full py-3 px-4 bg-sky-50 hover:bg-sky-100 text-sky-900 rounded-xl transition-colors text-left flex items-center gap-3">
                  <TrendingDown className="w-5 h-5" />
                  Reduce Difficulty
                </button>
                
                <button className="w-full py-3 px-4 bg-violet-50 hover:bg-violet-100 text-violet-900 rounded-xl transition-colors text-left flex items-center gap-3">
                  <Volume2 className="w-5 h-5" />
                  Lower Audio
                </button>
                
                <button className="w-full py-3 px-4 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 rounded-xl transition-colors text-left flex items-center gap-3">
                  <Eye className="w-5 h-5" />
                  Simplify Visuals
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
