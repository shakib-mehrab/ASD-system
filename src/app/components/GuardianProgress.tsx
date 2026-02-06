import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { DashboardLayout } from './DashboardLayout';
import { getSessionReportsByPatient } from '../../services/dataService';
import type { SessionReport } from '../../types';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { TrendingUp, TrendingDown, Award, Target, Brain, Heart, Zap } from 'lucide-react';

export function GuardianProgress() {
  const { patient } = useAuth();
  const [reports, setReports] = useState<SessionReport[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [patient]);

  const loadData = async () => {
    if (!patient) return;

    try {
      setLoading(true);
      const reportsData = await getSessionReportsByPatient(patient.id);
      setReports(reportsData.sort((a, b) => 
        new Date(a.sessionDate).getTime() - new Date(b.sessionDate).getTime()
      ));
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateTrend = (values: number[]) => {
    if (values.length < 2) return 0;
    const recent = values.slice(-3);
    const earlier = values.slice(0, 3);
    const recentAvg = recent.reduce((a, b) => a + b, 0) / recent.length;
    const earlierAvg = earlier.reduce((a, b) => a + b, 0) / earlier.length;
    return recentAvg - earlierAvg;
  };

  const independenceScores = reports.map(r => r.abaData.percentageIndependent);
  const positiveResponses = reports.map(r => r.behavioralObservations.positiveResponses);
  const avgIndependence = independenceScores.length > 0 
    ? Math.round(independenceScores.reduce((a, b) => a + b, 0) / independenceScores.length)
    : 0;
  const independenceTrend = calculateTrend(independenceScores);

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
          <h1 className="text-3xl font-bold mb-2 text-slate-900">Progress Tracking</h1>
          <p className="text-slate-600">Monitor {patient?.name}'s therapy progress and milestones</p>
        </div>

        {/* Overall Progress Card */}
        <Card className="p-8 mb-8 bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center">
              <Award className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Overall Progress</h2>
              <p className="text-slate-600">Based on {reports.length} completed sessions</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-slate-700">Independence Level</p>
                <span className="text-2xl font-bold text-emerald-700">{avgIndependence}%</span>
              </div>
              <Progress value={avgIndependence} className="h-3 mb-2" />
              <div className="flex items-center gap-2 text-sm">
                {independenceTrend > 0 ? (
                  <>
                    <TrendingUp className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-600">+{Math.abs(Math.round(independenceTrend))}% improvement</span>
                  </>
                ) : independenceTrend < 0 ? (
                  <>
                    <TrendingDown className="w-4 h-4 text-amber-600" />
                    <span className="text-amber-600">{Math.abs(Math.round(independenceTrend))}% decrease</span>
                  </>
                ) : (
                  <span className="text-slate-600">Stable progress</span>
                )}
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-32 rounded-full border-8 border-emerald-200 flex items-center justify-center bg-white mb-3">
                  <span className="text-4xl font-bold text-emerald-700">{reports.length}</span>
                </div>
                <p className="text-sm font-medium text-slate-700">Sessions Completed</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Skills Progress */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <Brain className="w-6 h-6 text-purple-600" />
              <h3 className="text-xl font-semibold text-slate-900">Cognitive Skills</h3>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-700">Attention Span</span>
                  <span className="text-sm font-semibold text-slate-900">78%</span>
                </div>
                <Progress value={78} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-700">Problem Solving</span>
                  <span className="text-sm font-semibold text-slate-900">65%</span>
                </div>
                <Progress value={65} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-700">Memory Recall</span>
                  <span className="text-sm font-semibold text-slate-900">82%</span>
                </div>
                <Progress value={82} className="h-2" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <Heart className="w-6 h-6 text-rose-600" />
              <h3 className="text-xl font-semibold text-slate-900">Social Skills</h3>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-700">Eye Contact</span>
                  <span className="text-sm font-semibold text-slate-900">71%</span>
                </div>
                <Progress value={71} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-700">Turn-Taking</span>
                  <span className="text-sm font-semibold text-slate-900">68%</span>
                </div>
                <Progress value={68} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-700">Communication</span>
                  <span className="text-sm font-semibold text-slate-900">75%</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
            </div>
          </Card>
        </div>

        {/* Therapy Goals */}
        <Card className="p-6 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Target className="w-6 h-6 text-sky-600" />
            <h3 className="text-xl font-semibold text-slate-900">Therapy Goals</h3>
          </div>
          <div className="space-y-4">
            {patient?.therapyGoals && patient.therapyGoals.length > 0 ? (
              patient.therapyGoals.map((goal, index) => (
                <div key={index} className="bg-slate-50 rounded-lg p-4 flex items-start gap-3">
                  <div className="w-6 h-6 bg-sky-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-slate-900 font-medium mb-2">{goal}</p>
                    <div className="flex items-center gap-2">
                      <Progress value={Math.min(60 + (reports.length * 5), 95)} className="h-2 flex-1" />
                      <span className="text-sm text-slate-600 font-medium">
                        {Math.min(60 + (reports.length * 5), 95)}%
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-slate-500 text-center py-4">No therapy goals set yet</p>
            )}
          </div>
        </Card>

        {/* Milestones */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <Zap className="w-6 h-6 text-amber-600" />
            <h3 className="text-xl font-semibold text-slate-900">Recent Milestones</h3>
          </div>
          <div className="space-y-3">
            {reports.length >= 5 && (
              <div className="flex items-start gap-3 bg-emerald-50 border-l-4 border-emerald-500 rounded-lg p-4">
                <Award className="w-5 h-5 text-emerald-600 mt-0.5" />
                <div>
                  <p className="font-medium text-emerald-900">5 Sessions Milestone!</p>
                  <p className="text-sm text-emerald-700">Completed 5 therapy sessions</p>
                </div>
              </div>
            )}
            {avgIndependence >= 70 && (
              <div className="flex items-start gap-3 bg-purple-50 border-l-4 border-purple-500 rounded-lg p-4">
                <Award className="w-5 h-5 text-purple-600 mt-0.5" />
                <div>
                  <p className="font-medium text-purple-900">Independence Achievement!</p>
                  <p className="text-sm text-purple-700">Reached 70%+ independence level</p>
                </div>
              </div>
            )}
            {reports.length >= 10 && (
              <div className="flex items-start gap-3 bg-sky-50 border-l-4 border-sky-500 rounded-lg p-4">
                <Award className="w-5 h-5 text-sky-600 mt-0.5" />
                <div>
                  <p className="font-medium text-sky-900">Consistency Champion!</p>
                  <p className="text-sm text-sky-700">Completed 10+ therapy sessions</p>
                </div>
              </div>
            )}
            {reports.length === 0 && (
              <p className="text-slate-500 text-center py-8">Complete more sessions to unlock milestones!</p>
            )}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
