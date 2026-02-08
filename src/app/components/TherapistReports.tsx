import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowLeft, TrendingUp, Calendar, FileText, Award, Target, Download } from 'lucide-react';
// import DemoNav from '@/app/components/DemoNav';
import { DashboardLayout } from './DashboardLayout';
import { Card } from './ui/card';

const sessionData = [
  { date: 'Jan 1', completion: 45, accuracy: 72, engagement: 68 },
  { date: 'Jan 4', completion: 52, accuracy: 75, engagement: 71 },
  { date: 'Jan 8', completion: 58, accuracy: 78, engagement: 75 },
  { date: 'Jan 10', completion: 55, accuracy: 74, engagement: 69 },
  { date: 'Jan 13', completion: 65, accuracy: 82, engagement: 80 },
  { date: 'Jan 15', completion: 70, accuracy: 85, engagement: 83 },
];

export default function TherapistReports() {
  const navigate = useNavigate();
  const [showDateRangeDialog, setShowDateRangeDialog] = useState(false);
  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);
  const [showEditNoteDialog, setShowEditNoteDialog] = useState(false);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [newNote, setNewNote] = useState('');
  const [editNote, setEditNote] = useState('');

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <button
          onClick={() => navigate('/therapist/patients')}
          className="flex items-center gap-2 text-slate-600 hover:text-emerald-600 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Patient List
        </button>

        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <h1 className="text-3xl mb-2 text-slate-900">Progress Reports & Tracking</h1>
            <p className="text-slate-600">Patient: Child A (ASD-047)</p>
          </div>

          <div className="flex gap-3">
            <button 
              onClick={() => setShowDateRangeDialog(true)}
              className="px-5 py-3 bg-white hover:bg-slate-50 border-2 border-slate-200 rounded-xl transition-all flex items-center gap-2"
            >
              <Calendar className="w-5 h-5" />
              Date Range
            </button>
            <button 
              onClick={() => {
                alert('Exporting report as PDF...\n\nReport includes:\n- Performance trends\n- Session summaries\n- Clinical notes\n- Progress metrics\n\nDownload will start shortly.');
              }}
              className="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-all flex items-center gap-2"
            >
              <Download className="w-5 h-5" />
              Export Report
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-emerald-500">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-slate-600">Total Sessions</p>
              <Calendar className="w-5 h-5 text-emerald-600" />
            </div>
            <p className="text-3xl text-slate-900 mb-1">24</p>
            <p className="text-sm text-emerald-700">+3 this week</p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-sky-500">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-slate-600">Avg Completion</p>
              <Target className="w-5 h-5 text-sky-600" />
            </div>
            <p className="text-3xl text-slate-900 mb-1">68%</p>
            <p className="text-sm text-sky-700">↗ +12% vs last month</p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-violet-500">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-slate-600">Accuracy Rate</p>
              <Award className="w-5 h-5 text-violet-600" />
            </div>
            <p className="text-3xl text-slate-900 mb-1">82%</p>
            <p className="text-sm text-violet-700">↗ +8% improvement</p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-amber-500">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-slate-600">Engagement</p>
              <TrendingUp className="w-5 h-5 text-amber-600" />
            </div>
            <p className="text-3xl text-slate-900 mb-1">High</p>
            <p className="text-sm text-amber-700">Consistent trend</p>
          </div>
        </div>

        {/* Progress Chart */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl text-slate-900">Performance Trends</h2>
            <div className="flex gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                <span className="text-slate-600">Completion</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-sky-500 rounded-full"></div>
                <span className="text-slate-600">Accuracy</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-violet-500 rounded-full"></div>
                <span className="text-slate-600">Engagement</span>
              </div>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={sessionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="date" tick={{ fill: '#64748b', fontSize: 12 }} />
              <YAxis tick={{ fill: '#64748b', fontSize: 12 }} domain={[0, 100]} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '2px solid #e2e8f0', 
                  borderRadius: '12px',
                  padding: '8px 12px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="completion" 
                stroke="#10b981" 
                strokeWidth={3}
                dot={{ fill: '#10b981', r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="accuracy" 
                stroke="#0ea5e9" 
                strokeWidth={3}
                dot={{ fill: '#0ea5e9', r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="engagement" 
                stroke="#8b5cf6" 
                strokeWidth={3}
                dot={{ fill: '#8b5cf6', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Session Comparison */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-sky-600" />
              <h2 className="text-xl text-slate-900">Recent Sessions</h2>
            </div>

            <div className="space-y-3">
              {[
                { date: 'Jan 15, 2026', time: '25 min', completion: '70%', status: 'Excellent' },
                { date: 'Jan 13, 2026', time: '22 min', completion: '65%', status: 'Good' },
                { date: 'Jan 10, 2026', time: '18 min', completion: '55%', status: 'Fair' },
                { date: 'Jan 8, 2026', time: '28 min', completion: '58%', status: 'Good' },
                { date: 'Jan 4, 2026', time: '20 min', completion: '52%', status: 'Fair' },
              ].map((session, idx) => (
                <div key={idx} className="p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-900">{session.date}</span>
                    <span className={`text-sm px-3 py-1 rounded-lg ${
                      session.status === 'Excellent' ? 'bg-emerald-100 text-emerald-700' :
                      session.status === 'Good' ? 'bg-sky-100 text-sky-700' :
                      'bg-slate-200 text-slate-700'
                    }`}>
                      {session.status}
                    </span>
                  </div>
                  <div className="flex gap-4 text-sm text-slate-600">
                    <span>Duration: {session.time}</span>
                    <span>Completion: {session.completion}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Goal Progress */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-5 h-5 text-emerald-600" />
              <h2 className="text-xl text-slate-900">Goal Progress</h2>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-slate-900">Street Crossing Safety</h3>
                  <span className="text-sm text-emerald-700">65%</span>
                </div>
                <div className="h-3 bg-emerald-100 rounded-full overflow-hidden mb-2">
                  <div className="h-full bg-emerald-600 rounded-full" style={{ width: '65%' }}></div>
                </div>
                <p className="text-sm text-slate-600">Target: 80% • Est. completion: 2 weeks</p>
              </div>

              <div className="p-4 bg-sky-50 border border-sky-200 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-slate-900">Response Accuracy</h3>
                  <span className="text-sm text-sky-700">82%</span>
                </div>
                <div className="h-3 bg-sky-100 rounded-full overflow-hidden mb-2">
                  <div className="h-full bg-sky-600 rounded-full" style={{ width: '82%' }}></div>
                </div>
                <p className="text-sm text-slate-600">Target: 85% • On track</p>
              </div>

              <div className="p-4 bg-violet-50 border border-violet-200 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-slate-900">Session Duration</h3>
                  <span className="text-sm text-violet-700">78%</span>
                </div>
                <div className="h-3 bg-violet-100 rounded-full overflow-hidden mb-2">
                  <div className="h-full bg-violet-600 rounded-full" style={{ width: '78%' }}></div>
                </div>
                <p className="text-sm text-slate-600">Target: 30 min sustained • Improving</p>
              </div>
            </div>
          </div>
        </div>

        {/* Clinical Notes Section */}
        <div className="mt-6 bg-white rounded-2xl shadow-md p-6">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5 text-slate-600" />
            <h2 className="text-xl text-slate-900">Clinical Notes</h2>
          </div>
          
          <div className="space-y-3">
            <div className="p-4 bg-slate-50 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-500">Jan 15, 2026 - Dr. Smith</span>
                <button 
                  onClick={() => {
                    setEditNote('Excellent progress in pedestrian safety awareness. Child demonstrated improved attention to traffic signals. Recommend maintaining current difficulty level for 2 more sessions.');
                    setShowEditNoteDialog(true);
                  }}
                  className="text-sm text-sky-600 hover:text-sky-700"
                >
                  Edit
                </button>
              </div>
              <p className="text-slate-700">
                Excellent progress in pedestrian safety awareness. Child demonstrated improved attention 
                to traffic signals. Recommend maintaining current difficulty level for 2 more sessions.
              </p>
            </div>
            
            <button 
              onClick={() => setShowAddNoteDialog(true)}
              className="w-full py-3 text-emerald-600 hover:bg-emerald-50 rounded-xl transition-colors"
            >
              + Add Clinical Note
            </button>
          </div>
        </div>

        {/* Date Range Dialog */}
        {showDateRangeDialog && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <Card className="bg-white p-6 max-w-md w-full">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Select Date Range</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Start Date</label>
                  <input 
                    type="date"
                    value={dateRange.start}
                    onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">End Date</label>
                  <input 
                    type="date"
                    value={dateRange.end}
                    onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => {
                    setShowDateRangeDialog(false);
                    setDateRange({ start: '', end: '' });
                  }}
                  className="flex-1 px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    console.log('Applying date range:', dateRange);
                    alert('Date range applied: ' + dateRange.start + ' to ' + dateRange.end);
                    setShowDateRangeDialog(false);
                  }}
                  className="flex-1 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors font-medium"
                >
                  Apply
                </button>
              </div>
            </Card>
          </div>
        )}

        {/* Add Clinical Note Dialog */}
        {showAddNoteDialog && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <Card className="bg-white p-6 max-w-2xl w-full">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Add Clinical Note</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Clinical Note
                  </label>
                  <textarea 
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 min-h-[200px] resize-none"
                    placeholder="Enter clinical observations, progress notes, recommendations, or any relevant information..."
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => {
                    setShowAddNoteDialog(false);
                    setNewNote('');
                  }}
                  className="flex-1 px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    console.log('Adding clinical note:', newNote);
                    alert('Clinical note added successfully!');
                    setShowAddNoteDialog(false);
                    setNewNote('');
                  }}
                  className="flex-1 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors font-medium"
                >
                  Save Note
                </button>
              </div>
            </Card>
          </div>
        )}

        {/* Edit Clinical Note Dialog */}
        {showEditNoteDialog && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <Card className="bg-white p-6 max-w-2xl w-full">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Edit Clinical Note</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Clinical Note
                  </label>
                  <textarea 
                    value={editNote}
                    onChange={(e) => setEditNote(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 min-h-[200px] resize-none"
                    placeholder="Edit clinical note..."
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => {
                    setShowEditNoteDialog(false);
                    setEditNote('');
                  }}
                  className="flex-1 px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    console.log('Updating clinical note:', editNote);
                    alert('Clinical note updated successfully!');
                    setShowEditNoteDialog(false);
                    setEditNote('');
                  }}
                  className="flex-1 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors font-medium"
                >
                  Save Changes
                </button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
