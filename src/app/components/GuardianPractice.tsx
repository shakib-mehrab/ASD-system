import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { DashboardLayout } from './DashboardLayout';
import { getVRScenes, getOnboardingResult } from '../../services/dataService';
import type { VRScene } from '../../types';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Slider } from './ui/slider';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { 
  Play, 
  Settings, 
  Star, 
  Volume2, 
  Sun, 
  Users, 
  Clock,
  Sparkles,
  Target,
  CheckCircle,
  Wifi,
  Battery
} from 'lucide-react';

export function GuardianPractice() {
  const navigate = useNavigate();
  const { patient } = useAuth();
  const [scenes, setScenes] = useState<VRScene[]>([]);
  const [recommendedScenes, setRecommendedScenes] = useState<string[]>([]);
  const [selectedScene, setSelectedScene] = useState<VRScene | null>(null);
  const [loading, setLoading] = useState(true);
  const [showCustomize, setShowCustomize] = useState(false);
  const [showStartModal, setShowStartModal] = useState(false);
  const [deviceConnected, setDeviceConnected] = useState(true);
  const [deviceBattery, setDeviceBattery] = useState(85);

  // Practice preferences
  const [preferences, setPreferences] = useState({
    soundLevel: 50,
    brightness: 70,
    crowdDensity: 30,
    duration: 15,
    enableGuidance: true,
    enableRewards: true,
    autoAdjustDifficulty: true
  });

  useEffect(() => {
    loadData();
  }, [patient]);

  const loadData = async () => {
    if (!patient) return;

    try {
      setLoading(true);
      const [scenesData, onboardingData] = await Promise.all([
        getVRScenes(),
        getOnboardingResult(patient.id)
      ]);

      setScenes(scenesData);
      if (onboardingData) {
        setRecommendedScenes(onboardingData.recommendedScenes);
      }
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSceneSelect = (scene: VRScene) => {
    setSelectedScene(scene);
    setShowCustomize(true);
  };

  const handleStartPractice = () => {
    if (!selectedScene) return;
    setShowStartModal(true);
  };

  const confirmStartSession = () => {
    if (!selectedScene) return;
    
    // Navigate directly to VR interface with all settings
    navigate('/patient/vr-interface', {
      state: {
        scene: selectedScene,
        preferences,
        patient,
        isHomeSession: true
      }
    });
  };

  const isRecommended = (sceneId: string) => {
    return recommendedScenes.includes(sceneId);
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-slate-900">VR Practice Sessions</h1>
          <p className="text-slate-600">
            Start a customized home practice session for {patient?.name}
          </p>
        </div>

        {/* Quick Start Info */}
        <Card className="p-6 mb-8 bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-slate-900 mb-2">
                Home Practice Made Simple
              </h2>
              <p className="text-slate-700 text-sm mb-3">
                Select a VR scene below, customize the experience to your child's comfort level, 
                and start practicing at home. All sessions are tracked and reviewed by your therapist.
              </p>
              <div className="flex gap-4 text-sm">
                <div className="flex items-center gap-2 text-slate-600">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  Safe environment
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  Adjustable settings
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  Real-time guidance
                </div>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Scene Selection */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold mb-4 text-slate-900">
              Select a Practice Scene
            </h2>

            {/* Recommended Scenes */}
            {recommendedScenes.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                  <h3 className="font-semibold text-slate-900">Recommended for Your Child</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {scenes
                    .filter(scene => isRecommended(scene.id))
                    .map((scene) => (
                      <Card
                        key={scene.id}
                        className={`p-4 cursor-pointer transition-all hover:shadow-lg ${
                          selectedScene?.id === scene.id
                            ? 'border-2 border-amber-500 bg-amber-50'
                            : 'border-2 border-transparent hover:border-amber-200'
                        }`}
                        onClick={() => handleSceneSelect(scene)}
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Target className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-slate-900 mb-1">{scene.name}</h4>
                            <p className="text-xs text-slate-600 mb-2">{scene.description}</p>
                            <div className="flex gap-2 flex-wrap">
                              <Badge variant="outline" className="text-xs">
                                {scene.difficulty}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {scene.duration} min
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                </div>
              </div>
            )}

            {/* All Scenes */}
            <div>
              <h3 className="font-semibold text-slate-900 mb-3">All Available Scenes</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {scenes
                  .filter(scene => !isRecommended(scene.id))
                  .map((scene) => (
                    <Card
                      key={scene.id}
                      className={`p-4 cursor-pointer transition-all hover:shadow-lg ${
                        selectedScene?.id === scene.id
                          ? 'border-2 border-amber-500 bg-amber-50'
                          : 'border-2 border-transparent hover:border-slate-200'
                      }`}
                      onClick={() => handleSceneSelect(scene)}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-slate-400 to-slate-600 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Target className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-slate-900 mb-1">{scene.name}</h4>
                          <p className="text-xs text-slate-600 mb-2">{scene.description}</p>
                          <div className="flex gap-2 flex-wrap">
                            <Badge variant="outline" className="text-xs">
                              {scene.difficulty}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {scene.duration} min
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
              </div>
            </div>
          </div>

          {/* Customization Panel */}
          <div>
            <Card className="p-6 sticky top-8">
              <div className="flex items-center gap-2 mb-6">
                <Settings className="w-5 h-5 text-amber-600" />
                <h2 className="text-lg font-semibold text-slate-900">Customize Experience</h2>
              </div>

              {!selectedScene ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Play className="w-8 h-8 text-slate-400" />
                  </div>
                  <p className="text-slate-500 text-sm">
                    Select a scene to customize settings
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Selected Scene Info */}
                  <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                    <p className="text-sm text-amber-800 mb-1">Selected Scene</p>
                    <p className="font-semibold text-amber-900">{selectedScene.name}</p>
                  </div>

                  {/* Sound Level */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="flex items-center gap-2">
                        <Volume2 className="w-4 h-4 text-slate-600" />
                        Sound Level
                      </Label>
                      <span className="text-sm font-medium text-slate-900">
                        {preferences.soundLevel}%
                      </span>
                    </div>
                    <Slider
                      value={[preferences.soundLevel]}
                      onValueChange={(value) => 
                        setPreferences({ ...preferences, soundLevel: value[0] })
                      }
                      max={100}
                      step={5}
                      className="w-full"
                    />
                  </div>

                  {/* Brightness */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="flex items-center gap-2">
                        <Sun className="w-4 h-4 text-slate-600" />
                        Brightness
                      </Label>
                      <span className="text-sm font-medium text-slate-900">
                        {preferences.brightness}%
                      </span>
                    </div>
                    <Slider
                      value={[preferences.brightness]}
                      onValueChange={(value) => 
                        setPreferences({ ...preferences, brightness: value[0] })
                      }
                      max={100}
                      step={5}
                      className="w-full"
                    />
                  </div>

                  {/* Crowd Density */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-slate-600" />
                        Environment Complexity
                      </Label>
                      <span className="text-sm font-medium text-slate-900">
                        {preferences.crowdDensity}%
                      </span>
                    </div>
                    <Slider
                      value={[preferences.crowdDensity]}
                      onValueChange={(value) => 
                        setPreferences({ ...preferences, crowdDensity: value[0] })
                      }
                      max={100}
                      step={10}
                      className="w-full"
                    />
                  </div>

                  {/* Duration */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-slate-600" />
                        Session Duration
                      </Label>
                      <span className="text-sm font-medium text-slate-900">
                        {preferences.duration} min
                      </span>
                    </div>
                    <Slider
                      value={[preferences.duration]}
                      onValueChange={(value) => 
                        setPreferences({ ...preferences, duration: value[0] })
                      }
                      min={5}
                      max={30}
                      step={5}
                      className="w-full"
                    />
                  </div>

                  {/* Toggle Options */}
                  <div className="space-y-4 pt-4 border-t">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="guidance" className="text-sm">
                        Voice Guidance
                      </Label>
                      <Switch
                        id="guidance"
                        checked={preferences.enableGuidance}
                        onCheckedChange={(checked) =>
                          setPreferences({ ...preferences, enableGuidance: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="rewards" className="text-sm">
                        Reward Feedback
                      </Label>
                      <Switch
                        id="rewards"
                        checked={preferences.enableRewards}
                        onCheckedChange={(checked) =>
                          setPreferences({ ...preferences, enableRewards: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="auto-adjust" className="text-sm">
                        Auto-Adjust Difficulty
                      </Label>
                      <Switch
                        id="auto-adjust"
                        checked={preferences.autoAdjustDifficulty}
                        onCheckedChange={(checked) =>
                          setPreferences({ ...preferences, autoAdjustDifficulty: checked })
                        }
                      />
                    </div>
                  </div>

                  {/* Start Button */}
                  <Button
                    onClick={handleStartPractice}
                    className="w-full h-12 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-lg"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Start Practice Session
                  </Button>
                </div>
              )}
            </Card>
          </div>
        </div>

        {/* Session Start Modal */}
        {showStartModal && selectedScene && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <Card className="bg-white p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Play className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Ready to Start?</h2>
                <p className="text-slate-600">Review session details before beginning</p>
              </div>

              {/* Session Information */}
              <div className="space-y-4 mb-6">
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-200">
                  <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                    <Target className="w-5 h-5 text-amber-600" />
                    Session Details
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Scene:</span>
                      <span className="font-semibold text-slate-900">{selectedScene.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Duration:</span>
                      <span className="font-semibold text-slate-900">{preferences.duration} minutes</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Difficulty:</span>
                      <span className="font-semibold text-slate-900">{selectedScene.difficulty}</span>
                    </div>
                  </div>
                </div>

                {/* Device Status */}
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                  <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                    <Settings className="w-5 h-5 text-slate-600" />
                    Device Status
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Connection</span>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${deviceConnected ? 'bg-emerald-500' : 'bg-red-500'} animate-pulse`} />
                        <span className={`text-sm font-semibold ${deviceConnected ? 'text-emerald-600' : 'text-red-600'}`}>
                          {deviceConnected ? 'Connected' : 'Disconnected'}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Battery Level</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${
                              deviceBattery > 50 ? 'bg-emerald-500' : 
                              deviceBattery > 20 ? 'bg-amber-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${deviceBattery}%` }}
                          />
                        </div>
                        <span className="text-sm font-semibold text-slate-900">{deviceBattery}%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Settings Summary */}
                <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
                  <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-purple-600" />
                    Active Settings
                  </h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      {preferences.enableGuidance ? <CheckCircle className="w-4 h-4 text-emerald-500" /> : <div className="w-4 h-4" />}
                      <span className="text-slate-700">Voice Guidance</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {preferences.enableRewards ? <CheckCircle className="w-4 h-4 text-emerald-500" /> : <div className="w-4 h-4" />}
                      <span className="text-slate-700">Rewards</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-600">Sound: {preferences.soundLevel}%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-600">Brightness: {preferences.brightness}%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  onClick={() => setShowStartModal(false)}
                  variant="outline"
                  className="flex-1 h-12"
                >
                  Cancel
                </Button>
                <Button
                  onClick={confirmStartSession}
                  disabled={!deviceConnected}
                  className="flex-1 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Start Now
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
