import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, User, Plus, CheckSquare, Home, FileText, ClipboardList, Calendar, Activity, Target, Play, Settings, Volume2, Sun, Users, Clock, Sparkles } from 'lucide-react';
import { DashboardLayout } from './DashboardLayout';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Slider } from './ui/slider';
import { Label } from './ui/label';
import { Switch } from './ui/switch';

export default function TherapistPatientDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const patientData = location.state?.patient || {
    id: 'P001',
    name: 'Child A',
    age: 8,
    diagnosis: 'ASD Level 2'
  };

  const [selectedSession, setSelectedSession] = useState('session-1');
  const [showAddTaskDialog, setShowAddTaskDialog] = useState(false);
  const [showVRSetupModal, setShowVRSetupModal] = useState(false);
  const [selectedScene, setSelectedScene] = useState('grocery');

  // VR Preferences
  const [vrPreferences, setVrPreferences] = useState({
    soundLevel: 50,
    brightness: 70,
    crowdDensity: 30,
    duration: 20,
    enableGuidance: true,
    enableRewards: true
  });

  // Available VR scenes
  const vrScenes = [
    { id: 'grocery', name: 'Grocery Store', icon: '🛒', difficulty: 'Medium', description: 'Practice shopping and social interactions' },
    { id: 'street', name: 'Street Crossing', icon: '🚦', difficulty: 'Easy', description: 'Learn pedestrian safety skills' },
    { id: 'restaurant', name: 'Restaurant', icon: '🍽️', difficulty: 'Hard', description: 'Order food and interact with staff' },
    { id: 'playground', name: 'Playground', icon: '🎠', difficulty: 'Medium', description: 'Practice sharing and turn-taking' },
    { id: 'classroom', name: 'School Classroom', icon: '📚', difficulty: 'Hard', description: 'Follow instructions and group work' }
  ];

  // Mock sessions data
  const sessions = [
    {
      id: 'session-1',
      date: 'Feb 6, 2026',
      status: 'Active',
      scene: 'Grocery Store',
      tasks: [
        { id: 1, title: 'Navigate to produce section', status: 'completed' },
        { id: 2, title: 'Select 3 items from list', status: 'completed' },
        { id: 3, title: 'Wait in checkout line', status: 'in-progress' },
        { id: 4, title: 'Process payment interaction', status: 'pending' }
      ],
      todoList: [
        { id: 1, item: 'Review eye contact techniques', checked: true },
        { id: 2, item: 'Practice greeting phrases', checked: true },
        { id: 3, item: 'Prepare for crowded environment', checked: false }
      ],
      homePractice: [
        { id: 1, exercise: 'Watch grocery shopping video', duration: '10 min', completed: false },
        { id: 2, exercise: 'Role-play checkout scenario with parent', duration: '15 min', completed: false },
        { id: 3, exercise: 'Practice saying "excuse me" and "thank you"', duration: '5 min', completed: true }
      ],
      clinicalNotes: 'Patient showing good progress with social interactions. Recommend continuing grocery store scenario with increased crowd density.',
      review: 'Completed 2 out of 4 tasks. Patient maintained focus for 22 minutes. Heart rate stable throughout session.'
    },
    {
      id: 'session-2',
      date: 'Feb 3, 2026',
      status: 'Completed',
      scene: 'Street Crossing',
      tasks: [
        { id: 1, title: 'Identify crosswalk', status: 'completed' },
        { id: 2, title: 'Wait for walk signal', status: 'completed' },
        { id: 3, title: 'Look both ways before crossing', status: 'completed' },
        { id: 4, title: 'Cross street safely', status: 'completed' }
      ],
      todoList: [
        { id: 1, item: 'Review traffic light colors', checked: true },
        { id: 2, item: 'Practice stop and look technique', checked: true }
      ],
      homePractice: [
        { id: 1, exercise: 'Watch pedestrian safety video', duration: '8 min', completed: true },
        { id: 2, exercise: 'Practice with parent at nearby crossing', duration: '20 min', completed: true }
      ],
      clinicalNotes: 'Excellent session. Patient completed all tasks successfully. Ready to progress to busier street scenarios.',
      review: 'All tasks completed. Session duration: 25 minutes. No signs of stress or anxiety.'
    }
  ];

  const currentSession = sessions.find(s => s.id === selectedSession) || sessions[0];

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <button
          onClick={() => navigate('/therapist/patients')}
          className="flex items-center gap-2 text-slate-600 hover:text-emerald-600 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Patient List
        </button>

        <div className="flex items-start justify-between mb-8 flex-wrap gap-4">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-sky-100 rounded-2xl flex items-center justify-center">
              <User className="w-8 h-8 text-sky-600" />
            </div>
            <div>
              <h1 className="text-3xl mb-1 text-slate-900">{patientData.name}</h1>
              <p className="text-slate-600">Patient ID: {patientData.id} • Age {patientData.age}</p>
            </div>
          </div>

        <div className="flex gap-3">
          <button
            onClick={() => setShowVRSetupModal(true)}
            className="px-5 py-3 bg-sky-600 hover:bg-sky-700 text-white rounded-xl transition-all flex items-center gap-2 font-medium"
          >
            <Play className="w-5 h-5" />
            Start VR Session
          </button>
          <button
            onClick={() => setShowAddTaskDialog(true)}
            className="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-all flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Task
          </button>
        </div>
      </div>

      {/* Sessions Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {/* Total Sessions */}
        <Card className="bg-gradient-to-br from-emerald-50 to-sky-50 p-4 border-emerald-200">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-600" />
              <h3 className="text-base font-semibold text-slate-900">Sessions</h3>
            </div>
            <Badge className="bg-emerald-600 text-white text-sm px-3 py-1">{sessions.length}</Badge>
          </div>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {sessions.map(session => (
              <div 
                key={session.id}
                onClick={() => setSelectedSession(session.id)}
                className={`p-2 rounded-lg cursor-pointer transition-all ${
                  selectedSession === session.id 
                    ? 'bg-white shadow-md border-2 border-emerald-500' 
                    : 'bg-white/50 hover:bg-white border border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3 h-3 text-slate-500" />
                    <div>
                      <p className="font-medium text-slate-900 text-sm">{session.date}</p>
                      <p className="text-xs text-slate-600">{session.scene}</p>
                    </div>
                  </div>
                  <Badge className={`text-xs ${session.status === 'Active' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                    {session.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Upcoming Sessions */}
        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 border-purple-200 lg:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-purple-600" />
              <h3 className="text-base font-semibold text-slate-900">Upcoming Sessions</h3>
            </div>
            <Badge className="bg-purple-600 text-white text-sm px-3 py-1">3</Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-3 bg-white rounded-lg border border-purple-200">
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium text-slate-900 text-sm">Feb 9, 2026</p>
                <Badge className="bg-sky-100 text-sky-700 text-xs">Scheduled</Badge>
              </div>
              <p className="text-sm text-slate-600">Restaurant</p>
              <p className="text-xs text-slate-500 mt-1 line-clamp-1">Ordering food, social interaction</p>
            </div>
            <div className="p-3 bg-white rounded-lg border border-purple-200">
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium text-slate-900 text-sm">Feb 12, 2026</p>
                <Badge className="bg-sky-100 text-sky-700 text-xs">Scheduled</Badge>
              </div>
              <p className="text-sm text-slate-600">Playground</p>
              <p className="text-xs text-slate-500 mt-1 line-clamp-1">Sharing, turn-taking</p>
            </div>
            <div className="p-3 bg-white rounded-lg border border-purple-200">
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium text-slate-900 text-sm">Feb 15, 2026</p>
                <Badge className="bg-sky-100 text-sky-700 text-xs">Scheduled</Badge>
              </div>
              <p className="text-sm text-slate-600">Classroom</p>
              <p className="text-xs text-slate-500 mt-1 line-clamp-1">Following instructions, group work</p>
            </div>
          </div>
          <button className="w-full mt-3 py-2 text-purple-600 hover:bg-purple-100 rounded-lg transition-colors text-sm font-medium">
            + Schedule New Session
          </button>
        </Card>
      </div>

      {/* Recent VR Session Summary */}
      <Card className="bg-gradient-to-r from-violet-50 to-purple-50 p-6 mb-6 border-violet-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-violet-600" />
            <h3 className="text-lg font-semibold text-slate-900">Recent VR Sessions</h3>
          </div>
          <Badge className="bg-violet-600 text-white px-3 py-1">Last 5 Sessions</Badge>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {/* VR Session 1 */}
          <div className="bg-white rounded-lg p-3 border border-violet-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <CheckSquare className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">Grocery Store</p>
                  <p className="text-xs text-slate-600">Feb 6 • 22 min</p>
                </div>
              </div>
            </div>
            <Badge className="bg-emerald-100 text-emerald-700 text-xs mb-2">Completed</Badge>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-purple-50 rounded-lg p-2 text-center">
                <p className="text-xs text-slate-600">Focus</p>
                <p className="text-sm font-bold text-purple-600">78%</p>
              </div>
              <div className="bg-sky-50 rounded-lg p-2 text-center">
                <p className="text-xs text-slate-600">Engage</p>
                <p className="text-sm font-bold text-sky-600">82%</p>
              </div>
              <div className="bg-emerald-50 rounded-lg p-2 text-center">
                <p className="text-xs text-slate-600">Tasks</p>
                <p className="text-sm font-bold text-emerald-600">3/8</p>
              </div>
              <div className="bg-amber-50 rounded-lg p-2 text-center">
                <p className="text-xs text-slate-600">HR</p>
                <p className="text-sm font-bold text-amber-600">85</p>
              </div>
            </div>
          </div>

          {/* VR Session 2 */}
          <div className="bg-white rounded-lg p-3 border border-violet-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <CheckSquare className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">Street Crossing</p>
                  <p className="text-xs text-slate-600">Feb 3 • 25 min</p>
                </div>
              </div>
            </div>
            <Badge className="bg-emerald-100 text-emerald-700 text-xs mb-2">Completed</Badge>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-purple-50 rounded-lg p-2 text-center">
                <p className="text-xs text-slate-600">Focus</p>
                <p className="text-sm font-bold text-purple-600">92%</p>
              </div>
              <div className="bg-sky-50 rounded-lg p-2 text-center">
                <p className="text-xs text-slate-600">Engage</p>
                <p className="text-sm font-bold text-sky-600">88%</p>
              </div>
              <div className="bg-emerald-50 rounded-lg p-2 text-center">
                <p className="text-xs text-slate-600">Tasks</p>
                <p className="text-sm font-bold text-emerald-600">4/4</p>
              </div>
              <div className="bg-amber-50 rounded-lg p-2 text-center">
                <p className="text-xs text-slate-600">HR</p>
                <p className="text-sm font-bold text-amber-600">82</p>
              </div>
            </div>
          </div>

          {/* VR Session 3 */}
          <div className="bg-white rounded-lg p-3 border border-violet-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-sky-100 rounded-lg flex items-center justify-center">
                  <Play className="w-4 h-4 text-sky-600" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">Restaurant</p>
                  <p className="text-xs text-slate-600">Jan 30 • 18 min</p>
                </div>
              </div>
            </div>
            <Badge className="bg-amber-100 text-amber-700 text-xs mb-2">Early Exit</Badge>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-purple-50 rounded-lg p-2 text-center">
                <p className="text-xs text-slate-600">Focus</p>
                <p className="text-sm font-bold text-purple-600">65%</p>
              </div>
              <div className="bg-sky-50 rounded-lg p-2 text-center">
                <p className="text-xs text-slate-600">Engage</p>
                <p className="text-sm font-bold text-sky-600">72%</p>
              </div>
              <div className="bg-emerald-50 rounded-lg p-2 text-center">
                <p className="text-xs text-slate-600">Tasks</p>
                <p className="text-sm font-bold text-emerald-600">2/6</p>
              </div>
              <div className="bg-amber-50 rounded-lg p-2 text-center">
                <p className="text-xs text-slate-600">HR</p>
                <p className="text-sm font-bold text-amber-600">98</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Session Tabs */}
      <div className="mb-6 flex gap-3 overflow-x-auto pb-2">
        {sessions.map(session => (
          <button
            key={session.id}
            onClick={() => setSelectedSession(session.id)}
              className={`px-6 py-3 rounded-xl transition-all whitespace-nowrap flex items-center gap-2 ${
                selectedSession === session.id
                  ? 'bg-emerald-600 text-white shadow-lg'
                  : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span className="font-medium">{session.date}</span>
              <Badge className={session.status === 'Active' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'}>
                {session.status}
              </Badge>
            </button>
          ))}
        </div>

        {/* Session Content */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Tasks */}
            <Card className="bg-white p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-emerald-600" />
                  <h2 className="text-xl text-slate-900 font-semibold">Session Tasks</h2>
                </div>
                <Badge className="bg-sky-100 text-sky-700">{currentSession.scene}</Badge>
              </div>
              
              <div className="space-y-2">
                {currentSession.tasks.map(task => (
                  <div 
                    key={task.id}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      task.status === 'completed' 
                        ? 'bg-emerald-50 border-emerald-200' 
                        : task.status === 'in-progress'
                        ? 'bg-amber-50 border-amber-200'
                        : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        task.status === 'completed' ? 'bg-emerald-500 border-emerald-500' : 'border-slate-300'
                      }`}>
                        {task.status === 'completed' && (
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <span className={`flex-1 ${task.status === 'completed' ? 'text-slate-600' : 'text-slate-900'}`}>
                        {task.title}
                      </span>
                      <Badge className={
                        task.status === 'completed' ? 'bg-emerald-100 text-emerald-700' :
                        task.status === 'in-progress' ? 'bg-amber-100 text-amber-700' :
                        'bg-slate-100 text-slate-600'
                      }>
                        {task.status === 'completed' ? 'Done' : task.status === 'in-progress' ? 'In Progress' : 'Pending'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* To-Do List */}
            <Card className="bg-white p-6">
              <div className="flex items-center gap-2 mb-4">
                <CheckSquare className="w-5 h-5 text-sky-600" />
                <h2 className="text-xl text-slate-900 font-semibold">To-Do List</h2>
              </div>
              
              <div className="space-y-2">
                {currentSession.todoList.map(todo => (
                  <div key={todo.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                    <input 
                      type="checkbox" 
                      checked={todo.checked}
                      className="w-5 h-5 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                      readOnly
                    />
                    <span className={`flex-1 ${todo.checked ? 'text-slate-500 line-through' : 'text-slate-900'}`}>
                      {todo.item}
                    </span>
                  </div>
                ))}
              </div>
              
              <button className="w-full mt-4 py-2 text-sky-600 hover:bg-sky-50 rounded-lg transition-colors text-sm font-medium">
                + Add Item
              </button>
            </Card>

            {/* Session Review */}
            <Card className="bg-white p-6">
              <div className="flex items-center gap-2 mb-4">
                <Activity className="w-5 h-5 text-purple-600" />
                <h2 className="text-xl text-slate-900 font-semibold">Session Review</h2>
              </div>
              
              <p className="text-slate-700 leading-relaxed">{currentSession.review}</p>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {/* Home Practice */}
            <Card className="bg-white p-4">
              <div className="flex items-center gap-2 mb-3">
                <Home className="w-4 h-4 text-amber-600" />
                <h2 className="text-base text-slate-900 font-semibold">Home Practice</h2>
              </div>
              
              <div className="space-y-2">
                {currentSession.homePractice.map(practice => (
                  <div 
                    key={practice.id}
                    className={`p-2 rounded-lg border ${
                      practice.completed 
                        ? 'bg-emerald-50 border-emerald-200' 
                        : 'bg-amber-50 border-amber-200'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center mt-0.5 ${
                        practice.completed ? 'bg-emerald-500 border-emerald-500' : 'border-amber-300'
                      }`}>
                        {practice.completed && (
                          <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-slate-900 font-medium line-clamp-1">{practice.exercise}</p>
                        <p className="text-xs text-slate-600">{practice.duration}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full mt-3 py-1.5 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors text-xs font-medium">
                + Add Exercise
              </button>
            </Card>

            {/* Clinical Notes */}
            <Card className="bg-white p-6">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-5 h-5 text-violet-600" />
                <h2 className="text-xl text-slate-900 font-semibold">Clinical Notes</h2>
              </div>
              
              <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                <p className="text-slate-700 leading-relaxed whitespace-pre-line">{currentSession.clinicalNotes}</p>
              </div>

              <button className="w-full mt-4 py-2 text-violet-600 hover:bg-violet-50 rounded-lg transition-colors text-sm font-medium">
                Edit Notes
              </button>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-white p-6">
              <h2 className="text-lg mb-4 text-slate-900 font-semibold">Quick Actions</h2>
              
              <div className="space-y-2">
                <button 
                  onClick={() => navigate('/therapist/ai-dashboard')}
                  className="w-full py-3 px-4 bg-sky-50 hover:bg-sky-100 text-sky-900 rounded-lg transition-colors text-left flex items-center gap-3"
                >
                  <Activity className="w-5 h-5" />
                  View AI Insights
                </button>
                
                <button className="w-full py-3 px-4 bg-slate-50 hover:bg-slate-100 text-slate-900 rounded-lg transition-colors text-left flex items-center gap-3">
                  <ClipboardList className="w-5 h-5" />
                  Generate Report
                </button>
              </div>
            </Card>
          </div>
        </div>

        {/* VR Setup Modal */}
        {showVRSetupModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <Card className="bg-white p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">VR Session Setup</h3>
                  <p className="text-slate-600 mt-1">Configure scene and preferences for {patientData.name}</p>
                </div>
                <button
                  onClick={() => setShowVRSetupModal(false)}
                  className="text-slate-400 hover:text-slate-600 text-2xl"
                >
                  ×
                </button>
              </div>

              {/* Scene Selection */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-emerald-600" />
                  Select VR Scene
                </h4>
                <div className="grid md:grid-cols-3 gap-3">
                  {vrScenes.map(scene => (
                    <button
                      key={scene.id}
                      onClick={() => setSelectedScene(scene.id)}
                      className={`p-4 rounded-xl text-left transition-all border-2 ${
                        selectedScene === scene.id
                          ? 'border-emerald-500 bg-emerald-50 shadow-md'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <div className="text-3xl mb-2">{scene.icon}</div>
                      <h5 className="font-semibold text-slate-900 mb-1">{scene.name}</h5>
                      <p className="text-xs text-slate-600 mb-2">{scene.description}</p>
                      <Badge className={`text-xs ${
                        scene.difficulty === 'Easy' ? 'bg-emerald-100 text-emerald-700' :
                        scene.difficulty === 'Medium' ? 'bg-amber-100 text-amber-700' :
                        'bg-rose-100 text-rose-700'
                      }`}>
                        {scene.difficulty}
                      </Badge>
                    </button>
                  ))}
                </div>
              </div>

              {/* Preferences */}
              <div className="border-t pt-6">
                <h4 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <Settings className="w-5 h-5 text-purple-600" />
                  Customize Preferences
                </h4>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Sound Level */}
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-slate-700">
                      <Volume2 className="w-4 h-4" />
                      Sound Level: {vrPreferences.soundLevel}%
                    </Label>
                    <Slider
                      value={[vrPreferences.soundLevel]}
                      onValueChange={(value) => setVrPreferences({ ...vrPreferences, soundLevel: value[0] })}
                      min={0}
                      max={100}
                      step={10}
                      className="w-full"
                    />
                  </div>

                  {/* Brightness */}
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-slate-700">
                      <Sun className="w-4 h-4" />
                      Brightness: {vrPreferences.brightness}%
                    </Label>
                    <Slider
                      value={[vrPreferences.brightness]}
                      onValueChange={(value) => setVrPreferences({ ...vrPreferences, brightness: value[0] })}
                      min={0}
                      max={100}
                      step={10}
                      className="w-full"
                    />
                  </div>

                  {/* Crowd Density */}
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-slate-700">
                      <Users className="w-4 h-4" />
                      Crowd Density: {vrPreferences.crowdDensity}%
                    </Label>
                    <Slider
                      value={[vrPreferences.crowdDensity]}
                      onValueChange={(value) => setVrPreferences({ ...vrPreferences, crowdDensity: value[0] })}
                      min={0}
                      max={100}
                      step={10}
                      className="w-full"
                    />
                  </div>

                  {/* Session Duration */}
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-slate-700">
                      <Clock className="w-4 h-4" />
                      Duration: {vrPreferences.duration} minutes
                    </Label>
                    <Slider
                      value={[vrPreferences.duration]}
                      onValueChange={(value) => setVrPreferences({ ...vrPreferences, duration: value[0] })}
                      min={5}
                      max={45}
                      step={5}
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Toggle Options */}
                <div className="grid md:grid-cols-2 gap-4 mt-6">
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <Label className="flex items-center gap-2 text-slate-700">
                      <Sparkles className="w-4 h-4" />
                      Enable AI Guidance
                    </Label>
                    <Switch
                      checked={vrPreferences.enableGuidance}
                      onCheckedChange={(checked) => setVrPreferences({ ...vrPreferences, enableGuidance: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <Label className="flex items-center gap-2 text-slate-700">
                      <Target className="w-4 h-4" />
                      Enable Rewards
                    </Label>
                    <Switch
                      checked={vrPreferences.enableRewards}
                      onCheckedChange={(checked) => setVrPreferences({ ...vrPreferences, enableRewards: checked })}
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-8">
                <button
                  onClick={() => setShowVRSetupModal(false)}
                  className="flex-1 px-6 py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowVRSetupModal(false);
                    navigate('/therapist/vr-interface', { 
                      state: { 
                        patient: patientData,
                        scene: vrScenes.find(s => s.id === selectedScene),
                        preferences: vrPreferences
                      } 
                    });
                  }}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-600 to-sky-600 hover:from-emerald-700 hover:to-sky-700 text-white rounded-xl transition-all font-medium flex items-center justify-center gap-2"
                >
                  <Play className="w-5 h-5" />
                  Start VR Session
                </button>
              </div>
            </Card>
          </div>
        )}

        {/* Add Task Dialog */}
        {showAddTaskDialog && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <Card className="bg-white p-6 max-w-md w-full">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Add New Task</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Task Title</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Enter task description"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
                  <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                    <option>Session Task</option>
                    <option>To-Do Item</option>
                    <option>Home Practice</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowAddTaskDialog(false)}
                  className="flex-1 px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowAddTaskDialog(false)}
                  className="flex-1 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors font-medium"
                >
                  Add Task
                </button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
