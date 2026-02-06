import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { DashboardLayout } from './DashboardLayout';
import { 
  getSessionReportsByPatient,
  getVRScenes,
  getOnboardingResult
} from '../../services/dataService';
import type { SessionReport, VRScene } from '../../types';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Calendar, 
  TrendingUp, 
  Award, 
  Heart,
  Clock,
  Target,
  Star,
  ChevronRight
} from 'lucide-react';
import { format } from 'date-fns';

export function GuardianDashboard() {
  const navigate = useNavigate();
  const { patient } = useAuth();
  const [reports, setReports] = useState<SessionReport[]>([]);
  const [scenes, setScenes] = useState<VRScene[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalSessions: 0,
    averageEngagement: 0,
    improvementRate: 0,
    completedGoals: 0
  });

  useEffect(() => {
    if (patient) {
      loadData();
    }
  }, [patient]);

  const loadData = async () => {
    if (!patient) return;

    try {
      setLoading(true);
      const [reportsData, scenesData] = await Promise.all([
        getSessionReportsByPatient(patient.id),
        getVRScenes()
      ]);

      setReports(reportsData.sort((a, b) => 
        new Date(b.sessionDate).getTime() - new Date(a.sessionDate).getTime()
      ));
      setScenes(scenesData);

      // Calculate stats
      if (reportsData.length > 0) {
        const avgEngagement = reportsData.reduce((sum, r) => {
          const level = r.behavioralObservations.engagementLevel === 'high' ? 90 :
                       r.behavioralObservations.engagementLevel === 'moderate' ? 70 : 50;
          return sum + level;
        }, 0) / reportsData.length;

        const avgIndependence = reportsData.reduce((sum, r) => 
          sum + r.abaData.percentageIndependent, 0
        ) / reportsData.length;

        setStats({
          totalSessions: reportsData.length,
          averageEngagement: Math.round(avgEngagement),
          improvementRate: Math.round(avgIndependence),
          completedGoals: Math.floor(reportsData.length / 3)
        });
      }
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getScoreBadge = (percentage: number) => {
    if (percentage >= 80) return { color: 'bg-emerald-500', label: 'Excellent!' };
    if (percentage >= 60) return { color: 'bg-sky-500', label: 'Great Progress' };
    if (percentage >= 40) return { color: 'bg-amber-500', label: 'Good Effort' };
    return { color: 'bg-rose-500', label: 'Keep Trying' };
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back! 👋
          </h1>
          <p className="text-gray-600 text-lg">
            Here's how {patient?.name} is progressing
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 bg-gradient-to-br from-violet-500 to-purple-600 text-white border-0 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <Calendar className="w-8 h-8 opacity-80" />
              <span className="text-3xl font-bold">{stats.totalSessions}</span>
            </div>
            <h3 className="font-semibold text-lg">Sessions Completed</h3>
            <p className="text-white/80 text-sm mt-1">Total therapy sessions</p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-emerald-500 to-teal-600 text-white border-0 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <Heart className="w-8 h-8 opacity-80" />
              <span className="text-3xl font-bold">{stats.averageEngagement}%</span>
            </div>
            <h3 className="font-semibold text-lg">Engagement Level</h3>
            <p className="text-white/80 text-sm mt-1">Average across sessions</p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-amber-500 to-orange-600 text-white border-0 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-8 h-8 opacity-80" />
              <span className="text-3xl font-bold">{stats.improvementRate}%</span>
            </div>
            <h3 className="font-semibold text-lg">Independence Rate</h3>
            <p className="text-white/80 text-sm mt-1">Tasks done independently</p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-rose-500 to-pink-600 text-white border-0 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <Award className="w-8 h-8 opacity-80" />
              <span className="text-3xl font-bold">{stats.completedGoals}</span>
            </div>
            <h3 className="font-semibold text-lg">Goals Achieved</h3>
            <p className="text-white/80 text-sm mt-1">Therapy milestones reached</p>
          </Card>
        </div>

        {/* Therapy Goals */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Target className="w-6 h-6 text-amber-600" />
              Current Therapy Goals
            </h2>
            <div className="space-y-3">
              {patient?.therapyGoals.map((goal, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg">
                  <div className="w-6 h-6 bg-amber-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {idx + 1}
                  </div>
                  <p className="text-gray-700">{goal}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Calendar className="w-6 h-6 text-sky-600" />
              Upcoming Sessions
            </h2>
            <div className="space-y-3">
              <div className="p-4 bg-sky-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-gray-900">Next Session</span>
                  <Badge className="bg-sky-500">Tomorrow</Badge>
                </div>
                <p className="text-gray-600 text-sm">With Dr. {patient?.assignedTherapist}</p>
                <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>10:00 AM - 11:00 AM</span>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-gray-900">Follow-up</span>
                  <Badge variant="outline">Next Week</Badge>
                </div>
                <p className="text-gray-600 text-sm">Progress review meeting</p>
                <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>2:00 PM - 2:30 PM</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Recent Session Reports */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Star className="w-6 h-6 text-amber-500" />
              Recent Session Reports
            </h2>
            <Button variant="outline" size="sm">
              View All
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          <div className="space-y-4">
            {reports.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <p className="text-lg">No sessions yet</p>
                <p className="text-sm">Your child's session reports will appear here</p>
              </div>
            ) : (
              reports.slice(0, 5).map((report) => {
                const scene = scenes.find(s => s.id === report.sceneId);
                const scoreBadge = getScoreBadge(report.abaData.percentageIndependent);

                return (
                  <div key={report.id} className="p-4 border rounded-xl hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900">
                          {scene?.name || 'VR Session'}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {format(new Date(report.sessionDate), 'MMMM d, yyyy')}
                        </p>
                      </div>
                      <Badge className={`${scoreBadge.color} text-white`}>
                        {scoreBadge.label}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-3">
                      <div className="text-center p-3 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg">
                        <div className="text-2xl font-bold text-emerald-600">
                          {report.abaData.percentageIndependent}%
                        </div>
                        <div className="text-xs text-gray-600">Independence</div>
                      </div>
                      <div className="text-center p-3 bg-gradient-to-br from-sky-50 to-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-sky-600">
                          {report.behavioralObservations.positiveResponses}
                        </div>
                        <div className="text-xs text-gray-600">Positive Behaviors</div>
                      </div>
                      <div className="text-center p-3 bg-gradient-to-br from-violet-50 to-purple-50 rounded-lg">
                        <div className="text-2xl font-bold text-violet-600">
                          {report.duration} min
                        </div>
                        <div className="text-xs text-gray-600">Duration</div>
                      </div>
                    </div>

                    {report.therapistNotes && (
                      <div className="bg-amber-50 rounded-lg p-3 border-l-4 border-amber-400">
                        <p className="text-sm text-gray-700 italic">
                          "{report.therapistNotes}"
                        </p>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
