import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { DashboardLayout } from './DashboardLayout';
import { 
  getPatientsByTherapist, 
  getVRScenes, 
  addSessionReport,
  generateId 
} from '../../services/dataService';
import type { Patient, VRScene, SessionReport } from '../../types';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Slider } from './ui/slider';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Textarea } from './ui/textarea';
import { Gamepad2, Play, Square, User, Sparkles, Settings2, Save } from 'lucide-react';
import { Badge } from './ui/badge';

export function TherapistVRControl() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [scenes, setScenes] = useState<VRScene[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<string>('');
  const [selectedScene, setSelectedScene] = useState<string>('');
  const [sessionActive, setSessionActive] = useState(false);
  const [sessionStartTime, setSessionStartTime] = useState<Date | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Session configuration state
  const [envSettings, setEnvSettings] = useState<Record<string, any>>({});
  const [preferences, setPreferences] = useState<Record<string, any>>({});
  const [therapistNotes, setTherapistNotes] = useState('');
  
  // ABA data tracking
  const [abaData, setAbaData] = useState({
    baseline: 0,
    achieved: 0,
    independentTrials: 0,
    promptedTrials: 0,
    positiveResponses: 0,
    challengingBehaviors: 0
  });

  useEffect(() => {
    loadData();
  }, [user]);

  useEffect(() => {
    if (selectedScene) {
      const scene = scenes.find(s => s.id === selectedScene);
      if (scene) {
        // Initialize settings with defaults
        const envDefaults: Record<string, any> = {};
        const prefDefaults: Record<string, any> = {};
        
        Object.entries(scene.environmentSettings).forEach(([key, setting]) => {
          envDefaults[key] = setting.default;
        });
        
        Object.entries(scene.preferences).forEach(([key, setting]) => {
          prefDefaults[key] = setting.default;
        });
        
        setEnvSettings(envDefaults);
        setPreferences(prefDefaults);
      }
    }
  }, [selectedScene, scenes]);

  const loadData = async () => {
    try {
      setLoading(true);
      if (user && user.role === 'therapist' && 'id' in user) {
        const [patientsData, scenesData] = await Promise.all([
          getPatientsByTherapist(user.id),
          getVRScenes()
        ]);
        setPatients(patientsData);
        setScenes(scenesData);
      }
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStartSession = () => {
    if (!selectedPatient || !selectedScene) return;
    
    const patient = patients.find(p => p.id === selectedPatient);
    const scene = scenes.find(s => s.id === selectedScene);
    
    // Navigate to VR Interface with patient and scene data
    navigate('/therapist/vr-interface', {
      state: {
        patient,
        scene,
        envSettings,
        preferences
      }
    });
  };

  const handleEndSession = async () => {
    if (!selectedPatient || !selectedScene || !sessionStartTime || !user || user.role !== 'therapist' || !('id' in user)) return;
    
    const scene = scenes.find(s => s.id === selectedScene);
    if (!scene) return;

    const duration = Math.round((new Date().getTime() - sessionStartTime.getTime()) / 60000);
    const totalTrials = abaData.independentTrials + abaData.promptedTrials;
    const percentageIndependent = totalTrials > 0 
      ? Math.round((abaData.independentTrials / totalTrials) * 100)
      : 0;

    const report: SessionReport = {
      id: generateId('SR'),
      patientId: selectedPatient,
      therapistId: ('id' in user) ? user.id : '',
      sceneId: selectedScene,
      sessionDate: new Date().toISOString(),
      duration,
      completionStatus: 'completed',
      environmentSettings: envSettings,
      abaData: {
        targetBehavior: scene.abaParameters.targetBehavior,
        measurementType: scene.abaParameters.measurementType,
        baseline: abaData.baseline,
        achieved: abaData.achieved,
        unit: scene.abaParameters.measurementType === 'frequency' ? 'occurrences' :
              scene.abaParameters.measurementType === 'duration' ? 'seconds' :
              scene.abaParameters.measurementType === 'latency' ? 'seconds_to_response' :
              'steps_completed',
        promptsUsed: scene.abaParameters.promptLevels.slice(0, 2),
        independentTrials: abaData.independentTrials,
        promptedTrials: abaData.promptedTrials,
        percentageIndependent
      },
      behavioralObservations: {
        positiveResponses: abaData.positiveResponses,
        challengingBehaviors: abaData.challengingBehaviors,
        emotionalState: 'calm',
        engagementLevel: 'high'
      },
      therapistNotes: therapistNotes || 'Session completed successfully.',
      recommendationsForNext: 'Continue with current settings, consider gradual progression.'
    };

    try {
      await addSessionReport(report);
      
      // Reset session
      setSessionActive(false);
      setSessionStartTime(null);
      setTherapistNotes('');
      setAbaData({
        baseline: 0,
        achieved: 0,
        independentTrials: 0,
        promptedTrials: 0,
        positiveResponses: 0,
        challengingBehaviors: 0
      });
      
      alert('Session report saved successfully!');
    } catch (error) {
      console.error('Failed to save session report:', error);
      alert('Failed to save session report. Please try again.');
    }
  };

  const renderSettingControl = (key: string, setting: any, value: any, onChange: (val: any) => void) => {
    if (setting.options) {
      return (
        <Select value={String(value)} onValueChange={onChange}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {setting.options.map((option: string) => (
              <SelectItem key={option} value={option}>
                {option.replace(/_/g, ' ').toUpperCase()}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    } else if (typeof setting.min === 'number' && typeof setting.max === 'number') {
      return (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>{value} {setting.unit}</span>
          </div>
          <Slider
            min={setting.min}
            max={setting.max}
            step={(setting.max - setting.min) / 100}
            value={[value]}
            onValueChange={([val]) => onChange(val)}
            disabled={sessionActive}
          />
        </div>
      );
    }
    return null;
  };

  const currentScene = scenes.find(s => s.id === selectedScene);
  const currentPatient = patients.find(p => p.id === selectedPatient);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Gamepad2 className="w-8 h-8 text-sky-600" />
            Universal VR Control
          </h1>
          <p className="text-gray-600 mt-2">
            Configure and conduct VR therapy sessions with real-time parameter control
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Session Setup */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-sky-600" />
                Session Setup
              </h2>
              
              <div className="space-y-4">
                <div>
                  <Label>Select Patient</Label>
                  <Select 
                    value={selectedPatient} 
                    onValueChange={setSelectedPatient}
                    disabled={sessionActive}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Choose patient..." />
                    </SelectTrigger>
                    <SelectContent>
                      {patients.map(patient => (
                        <SelectItem key={patient.id} value={patient.id}>
                          {patient.name} ({patient.id})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {currentPatient && (
                  <div className="bg-sky-50 rounded-lg p-3 space-y-2">
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">Age:</span> {currentPatient.age} years
                    </p>
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">Diagnosis:</span> {currentPatient.primaryDiagnosis}
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      <Badge variant="outline">
                        Sound: {currentPatient.sensoryProfile.soundSensitivity}
                      </Badge>
                      <Badge variant="outline">
                        Visual: {currentPatient.sensoryProfile.visualSensitivity}
                      </Badge>
                    </div>
                  </div>
                )}

                <div>
                  <Label>Select VR Scene</Label>
                  <Select 
                    value={selectedScene} 
                    onValueChange={setSelectedScene}
                    disabled={sessionActive}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Choose scene..." />
                    </SelectTrigger>
                    <SelectContent>
                      {scenes.map(scene => (
                        <SelectItem key={scene.id} value={scene.id}>
                          {scene.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {currentScene && (
                  <div className="bg-violet-50 rounded-lg p-3">
                    <p className="text-sm text-gray-700 mb-2">{currentScene.description}</p>
                    <div className="flex gap-2 flex-wrap">
                      <Badge>{currentScene.category}</Badge>
                      <Badge variant="outline">{currentScene.difficulty}</Badge>
                      <Badge variant="outline">{currentScene.duration} min</Badge>
                    </div>
                  </div>
                )}

                {!sessionActive ? (
                  <Button
                    onClick={handleStartSession}
                    disabled={!selectedPatient || !selectedScene}
                    className="w-full h-12 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Start Session
                  </Button>
                ) : (
                  <Button
                    onClick={handleEndSession}
                    variant="destructive"
                    className="w-full h-12"
                  >
                    <Square className="w-5 h-5 mr-2" />
                    End Session & Save Report
                  </Button>
                )}
              </div>
            </Card>
          </div>

          {/* Middle Column - Environment Settings */}
          <div className="lg:col-span-1 space-y-6">
            {currentScene && (
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Settings2 className="w-5 h-5 text-sky-600" />
                  Clinical Parameters
                </h2>
                
                <div className="space-y-4">
                  {Object.entries(currentScene.environmentSettings).map(([key, setting]) => (
                    <div key={key}>
                      <Label className="text-sm font-medium">
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </Label>
                      <div className="mt-2">
                        {renderSettingControl(
                          key,
                          setting,
                          envSettings[key],
                          (val) => setEnvSettings(prev => ({ ...prev, [key]: val }))
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>

          {/* Right Column - Preferences & ABA Tracking */}
          <div className="lg:col-span-1 space-y-6">
            {currentScene && (
              <>
                <Card className="p-6">
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-violet-600" />
                    Preferences
                  </h2>
                  
                  <div className="space-y-4">
                    {Object.entries(currentScene.preferences).map(([key, setting]) => (
                      <div key={key}>
                        <Label className="text-sm font-medium">
                          {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                        </Label>
                        <div className="mt-2">
                          {renderSettingControl(
                            key,
                            setting,
                            preferences[key],
                            (val) => setPreferences(prev => ({ ...prev, [key]: val }))
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {sessionActive && (
                  <Card className="p-6">
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <Save className="w-5 h-5 text-emerald-600" />
                      ABA Data Tracking
                    </h2>
                    
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-xs">Baseline</Label>
                          <input
                            type="number"
                            value={abaData.baseline}
                            onChange={(e) => setAbaData(prev => ({ ...prev, baseline: Number(e.target.value) }))}
                            className="w-full mt-1 px-3 py-2 border rounded-lg"
                          />
                        </div>
                        <div>
                          <Label className="text-xs">Achieved</Label>
                          <input
                            type="number"
                            value={abaData.achieved}
                            onChange={(e) => setAbaData(prev => ({ ...prev, achieved: Number(e.target.value) }))}
                            className="w-full mt-1 px-3 py-2 border rounded-lg"
                          />
                        </div>
                        <div>
                          <Label className="text-xs">Independent Trials</Label>
                          <input
                            type="number"
                            value={abaData.independentTrials}
                            onChange={(e) => setAbaData(prev => ({ ...prev, independentTrials: Number(e.target.value) }))}
                            className="w-full mt-1 px-3 py-2 border rounded-lg"
                          />
                        </div>
                        <div>
                          <Label className="text-xs">Prompted Trials</Label>
                          <input
                            type="number"
                            value={abaData.promptedTrials}
                            onChange={(e) => setAbaData(prev => ({ ...prev, promptedTrials: Number(e.target.value) }))}
                            className="w-full mt-1 px-3 py-2 border rounded-lg"
                          />
                        </div>
                        <div>
                          <Label className="text-xs">Positive Responses</Label>
                          <input
                            type="number"
                            value={abaData.positiveResponses}
                            onChange={(e) => setAbaData(prev => ({ ...prev, positiveResponses: Number(e.target.value) }))}
                            className="w-full mt-1 px-3 py-2 border rounded-lg"
                          />
                        </div>
                        <div>
                          <Label className="text-xs">Challenging Behaviors</Label>
                          <input
                            type="number"
                            value={abaData.challengingBehaviors}
                            onChange={(e) => setAbaData(prev => ({ ...prev, challengingBehaviors: Number(e.target.value) }))}
                            className="w-full mt-1 px-3 py-2 border rounded-lg"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label>Session Notes</Label>
                        <Textarea
                          value={therapistNotes}
                          onChange={(e) => setTherapistNotes(e.target.value)}
                          placeholder="Observations, behaviors, recommendations..."
                          className="mt-2"
                          rows={4}
                        />
                      </div>
                    </div>
                  </Card>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
