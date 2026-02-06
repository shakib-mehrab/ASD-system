import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { DashboardLayout } from './DashboardLayout';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowLeft, Brain, TrendingUp, AlertCircle, Info, Shield, CheckCircle, XCircle, Edit, Lightbulb, Activity, Target, AlertTriangle } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';

const readinessData = [
  { date: 'Jan 8', score: 72 },
  { date: 'Jan 10', score: 68 },
  { date: 'Jan 13', score: 75 },
  { date: 'Jan 15', score: 78 },
];

const factorData = [
  { factor: 'Recent Success', impact: 85 },
  { factor: 'Session Consistency', impact: 70 },
  { factor: 'Sensory Comfort', impact: 65 },
  { factor: 'Time of Day', impact: 55 },
];

interface AIRecommendation {
  id: string;
  patientId: string;
  patientName: string;
  timestamp: string;
  priority: 'high' | 'medium' | 'low';
  type: string;
  status: 'pending' | 'approved' | 'rejected';
  recommendation: {
    title: string;
    description: string;
    targetScene: string;
    sceneName: string;
    currentSettings?: any;
    suggestedSettings?: any;
    expectedOutcome: string;
  };
  aiAnalysis: {
    confidenceScore: number;
    dataSources: string[];
    keyInsights: string[];
    reasoningPath: string[];
  };
  therapistFeedback?: string;
  approvedBy?: string;
  rejectedBy?: string;
  rejectionReason?: string;
}

export default function TherapistAIDashboard() {
  const navigate = useNavigate();
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([]);
  const [selectedRec, setSelectedRec] = useState<AIRecommendation | null>(null);
  const [showExplainability, setShowExplainability] = useState(false);
  const [modifyingRec, setModifyingRec] = useState<string | null>(null);
  const [modificationNote, setModificationNote] = useState('');

  useEffect(() => {
    // Load AI recommendations from JSON
    fetch('/data/ai_recommendations.json')
      .then(res => res.json())
      .then(data => {
        setRecommendations(data.recommendations);
      })
      .catch(err => console.error('Failed to load recommendations:', err));
  }, []);

  const handleApprove = (recId: string) => {
    setRecommendations(prev => prev.map(rec => 
      rec.id === recId 
        ? { ...rec, status: 'approved', approvedBy: 'T001', therapistFeedback: 'Approved for implementation.' }
        : rec
    ));
    // In production, this would update the JSON via API
  };

  const handleReject = (recId: string) => {
    const reason = prompt('Please provide a reason for rejecting this recommendation:');
    if (reason) {
      setRecommendations(prev => prev.map(rec => 
        rec.id === recId 
          ? { ...rec, status: 'rejected', rejectedBy: 'T001', rejectionReason: reason }
          : rec
      ));
    }
  };

  const handleModify = (recId: string) => {
    setModifyingRec(recId);
  };

  const submitModification = (recId: string) => {
    if (modificationNote.trim()) {
      setRecommendations(prev => prev.map(rec => 
        rec.id === recId 
          ? { ...rec, status: 'approved', approvedBy: 'T001', therapistFeedback: `Modified: ${modificationNote}` }
          : rec
      ));
      setModifyingRec(null);
      setModificationNote('');
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-rose-100 text-rose-700 border-rose-300';
      case 'medium': return 'bg-amber-100 text-amber-700 border-amber-300';
      case 'low': return 'bg-sky-100 text-sky-700 border-sky-300';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'scene_modification': return <Target className="w-4 h-4" />;
      case 'progression': return <TrendingUp className="w-4 h-4" />;
      case 'safety_alert': return <AlertTriangle className="w-4 h-4" />;
      case 'reinforcement': return <Lightbulb className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const pendingRecs = recommendations.filter(r => r.status === 'pending');
  const approvedRecs = recommendations.filter(r => r.status === 'approved');
  const rejectedRecs = recommendations.filter(r => r.status === 'rejected');

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <button
          onClick={() => navigate('/therapist/patient-detail')}
          className="flex items-center gap-2 text-slate-600 hover:text-emerald-600 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Patient Detail
        </button>

        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <h1 className="text-3xl mb-2 text-slate-900">AI Clinical Decision Support</h1>
            <p className="text-slate-600">Patient: Emma Johnson (P001)</p>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 border-2 border-amber-200 rounded-xl">
            <Shield className="w-5 h-5 text-amber-700" />
            <span className="text-sm text-amber-900">AI Assists — Therapist Decides</span>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4 bg-gradient-to-br from-violet-50 to-violet-100 border-violet-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-violet-700 mb-1">Pending Review</p>
                <p className="text-3xl text-violet-900">{pendingRecs.length}</p>
              </div>
              <Brain className="w-8 h-8 text-violet-600" />
            </div>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-emerald-700 mb-1">Approved</p>
                <p className="text-3xl text-emerald-900">{approvedRecs.length}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-emerald-600" />
            </div>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-rose-50 to-rose-100 border-rose-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-rose-700 mb-1">High Priority</p>
                <p className="text-3xl text-rose-900">{recommendations.filter(r => r.priority === 'high' && r.status === 'pending').length}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-rose-600" />
            </div>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-sky-50 to-sky-100 border-sky-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-sky-700 mb-1">AI Confidence</p>
                <p className="text-3xl text-sky-900">87%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-sky-600" />
            </div>
          </Card>
        </div>

        {/* AI Recommendations - Pending */}
        <div className="mb-8">
          <h2 className="text-2xl text-slate-900 mb-4">Pending AI Recommendations</h2>
          {pendingRecs.length === 0 ? (
            <Card className="p-8 text-center">
              <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
              <p className="text-slate-600">No pending recommendations. All reviews complete!</p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pendingRecs.map((rec) => (
                <Card key={rec.id} className="p-4 border-l-4 border-violet-500 hover:shadow-lg transition-all flex flex-col">
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${getPriorityColor(rec.priority)}`}>
                      {getTypeIcon(rec.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base text-slate-900 mb-2 line-clamp-2">{rec.recommendation.title}</h3>
                      <div className="flex flex-wrap gap-1 mb-2">
                        <Badge className={`${getPriorityColor(rec.priority)} border text-xs`}>
                          {rec.priority.toUpperCase()}
                        </Badge>
                        <Badge variant="outline" className="bg-violet-50 text-violet-700 border-violet-300 text-xs">
                          {rec.aiAnalysis.confidenceScore}%
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 mb-3 line-clamp-2">{rec.recommendation.description}</p>
                  
                  <div className="bg-slate-50 p-2 rounded-lg mb-3">
                    <p className="text-xs text-slate-600">Target: <span className="text-slate-900">{rec.recommendation.sceneName}</span></p>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSelectedRec(rec);
                      setShowExplainability(true);
                    }}
                    className="text-violet-700 hover:text-violet-900 text-xs mb-3 justify-start p-0 h-auto"
                  >
                    <Info className="w-3 h-3 mr-1" />
                    View Full Details
                  </Button>

                  {/* Action Buttons */}
                  {modifyingRec === rec.id ? (
                    <div className="bg-slate-50 p-3 rounded-xl mt-auto">
                      <Label className="text-xs text-slate-700 mb-2 block">Modification Notes</Label>
                      <Textarea
                        value={modificationNote}
                        onChange={(e) => setModificationNote(e.target.value)}
                        placeholder="Describe modifications..."
                        className="mb-2 text-xs"
                        rows={2}
                      />
                      <div className="flex flex-col gap-2">
                        <Button 
                          onClick={() => submitModification(rec.id)}
                          className="bg-emerald-600 hover:bg-emerald-700 text-xs h-8 w-full"
                          size="sm"
                        >
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Approve
                        </Button>
                        <Button 
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setModifyingRec(null);
                            setModificationNote('');
                          }}
                          className="text-xs h-8 w-full"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2 mt-auto">
                      <Button 
                        onClick={() => handleApprove(rec.id)}
                        className="bg-emerald-600 hover:bg-emerald-700 text-xs h-8 w-full"
                        size="sm"
                      >
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Approve
                      </Button>
                      <div className="flex gap-2">
                        <Button 
                          onClick={() => handleModify(rec.id)}
                          variant="outline"
                          className="border-sky-300 text-sky-700 hover:bg-sky-50 text-xs h-8 flex-1"
                          size="sm"
                        >
                          <Edit className="w-3 h-3 mr-1" />
                          Modify
                        </Button>
                        <Button 
                          onClick={() => handleReject(rec.id)}
                          variant="outline"
                          className="border-rose-300 text-rose-700 hover:bg-rose-50 text-xs h-8 flex-1"
                          size="sm"
                        >
                          <XCircle className="w-3 h-3 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Recent Actions */}
        {(approvedRecs.length > 0 || rejectedRecs.length > 0) && (
          <div className="mb-8">
            <h2 className="text-2xl text-slate-900 mb-4">Recent Actions</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {/* Approved */}
              {approvedRecs.slice(0, 2).map((rec) => (
                <Card key={rec.id} className="p-4 bg-emerald-50 border-emerald-200">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm text-emerald-900 mb-1"><strong>{rec.recommendation.title}</strong></p>
                      <p className="text-xs text-emerald-700">Approved by {rec.approvedBy}</p>
                      {rec.therapistFeedback && (
                        <p className="text-xs text-emerald-800 mt-2 italic">"{rec.therapistFeedback}"</p>
                      )}
                    </div>
                  </div>
                </Card>
              ))}

              {/* Rejected */}
              {rejectedRecs.slice(0, 2).map((rec) => (
                <Card key={rec.id} className="p-4 bg-rose-50 border-rose-200">
                  <div className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-rose-600 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm text-rose-900 mb-1"><strong>{rec.recommendation.title}</strong></p>
                      <p className="text-xs text-rose-700">Rejected by {rec.rejectedBy}</p>
                      {rec.rejectionReason && (
                        <p className="text-xs text-rose-800 mt-2 italic">"{rec.rejectionReason}"</p>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Analytics Dashboard */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Readiness Over Time */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl text-slate-900">Readiness Score Trend</h2>
              <Info className="w-5 h-5 text-slate-400" />
            </div>

            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={readinessData}>
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
                  dataKey="score" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  dot={{ fill: '#10b981', r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>

            <p className="text-sm text-slate-500 mt-4">
              AI model: Random Forest • Confidence: 82%
            </p>
          </div>

          {/* Contributing Factors */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl text-slate-900">Contributing Factors</h2>
              <Brain className="w-5 h-5 text-violet-600" />
            </div>

            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={factorData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis type="number" tick={{ fill: '#64748b', fontSize: 12 }} domain={[0, 100]} />
                <YAxis type="category" dataKey="factor" tick={{ fill: '#64748b', fontSize: 12 }} width={130} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '2px solid #e2e8f0', 
                    borderRadius: '12px',
                    padding: '8px 12px'
                  }}
                />
                <Bar dataKey="impact" fill="#8b5cf6" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>

            <p className="text-sm text-slate-500 mt-4">
              Factors ranked by impact on readiness prediction
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-4">
          <p className="text-sm text-amber-900">
            <strong>Clinical Decision Authority:</strong> All AI predictions are advisory only. 
            Therapist maintains full clinical authority over treatment decisions, session parameters, 
            and patient safety protocols.
          </p>
        </div>

        {/* Explainability Modal */}
        <Dialog open={showExplainability} onOpenChange={setShowExplainability}>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-xl">
                <Brain className="w-6 h-6 text-violet-600" />
                Explainable AI: How This Recommendation Was Generated
              </DialogTitle>
            </DialogHeader>

            {selectedRec && (
              <div className="space-y-6">
                {/* Recommendation Summary */}
                <div className="bg-violet-50 p-4 rounded-xl">
                  <h3 className="text-lg text-violet-900 mb-2">{selectedRec.recommendation.title}</h3>
                  <p className="text-sm text-violet-800">{selectedRec.recommendation.description}</p>
                </div>

                {/* Confidence Score */}
                <div>
                  <Label className="text-sm text-slate-700 mb-2 block">AI Confidence Score</Label>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-slate-200 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-3 rounded-full transition-all"
                        style={{ width: `${selectedRec.aiAnalysis.confidenceScore}%` }}
                      />
                    </div>
                    <span className="text-lg text-slate-900">{selectedRec.aiAnalysis.confidenceScore}%</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">
                    Based on {selectedRec.aiAnalysis.dataSources.length} data sources and analysis of similar cases
                  </p>
                </div>

                {/* Data Sources */}
                <div>
                  <Label className="text-sm text-slate-700 mb-2 block">Data Sources Analyzed</Label>
                  <div className="flex flex-wrap gap-2">
                    {selectedRec.aiAnalysis.dataSources.map((source, idx) => (
                      <Badge key={idx} variant="outline" className="bg-sky-50 text-sky-700 border-sky-300">
                        {source.replace(/_/g, ' ')}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Key Insights */}
                <div>
                  <Label className="text-sm text-slate-700 mb-2 block">Key Insights</Label>
                  <div className="space-y-2">
                    {selectedRec.aiAnalysis.keyInsights.map((insight, idx) => (
                      <div key={idx} className="flex items-start gap-2 bg-emerald-50 p-3 rounded-lg">
                        <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-emerald-900">{insight}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Reasoning Path */}
                <div>
                  <Label className="text-sm text-slate-700 mb-2 block">AI Reasoning Path</Label>
                  <div className="space-y-2">
                    {selectedRec.aiAnalysis.reasoningPath.map((step, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-violet-100 text-violet-700 rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                          {idx + 1}
                        </div>
                        <p className="text-sm text-slate-700">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Settings Comparison */}
                {selectedRec.recommendation.currentSettings && selectedRec.recommendation.suggestedSettings && (
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm text-slate-700 mb-2 block">Current Settings</Label>
                      <Card className="p-3 bg-slate-50">
                        {Object.entries(selectedRec.recommendation.currentSettings).map(([key, value]) => (
                          <div key={key} className="flex justify-between text-sm mb-1">
                            <span className="text-slate-600">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                            <span className="text-slate-900">{String(value)}</span>
                          </div>
                        ))}
                      </Card>
                    </div>
                    <div>
                      <Label className="text-sm text-slate-700 mb-2 block">Suggested Settings</Label>
                      <Card className="p-3 bg-emerald-50 border-emerald-200">
                        {Object.entries(selectedRec.recommendation.suggestedSettings).map(([key, value]) => (
                          <div key={key} className="flex justify-between text-sm mb-1">
                            <span className="text-emerald-700">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                            <span className="text-emerald-900 font-medium">{String(value)}</span>
                          </div>
                        ))}
                      </Card>
                    </div>
                  </div>
                )}

                <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl">
                  <p className="text-sm text-amber-900">
                    <strong>Note:</strong> This explanation shows how the AI arrived at this recommendation. 
                    As the clinical expert, you have full authority to approve, modify, or reject based on your professional judgment.
                  </p>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
