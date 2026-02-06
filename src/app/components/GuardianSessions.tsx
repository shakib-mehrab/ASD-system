import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { DashboardLayout } from './DashboardLayout';
import { getSessionReportsByPatient, getVRScenes } from '../../services/dataService';
import type { SessionReport, VRScene } from '../../types';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Calendar, Clock, CheckCircle, XCircle, Play, TrendingUp, Award } from 'lucide-react';
import { format } from 'date-fns';

export function GuardianSessions() {
  const navigate = useNavigate();
  const { patient } = useAuth();
  const [reports, setReports] = useState<SessionReport[]>([]);
  const [scenes, setScenes] = useState<VRScene[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
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
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getSceneName = (sceneId: string) => {
    const scene = scenes.find(s => s.id === sceneId);
    return scene?.name || sceneId;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-emerald-600" />;
      case 'interrupted':
        return <XCircle className="w-5 h-5 text-amber-600" />;
      default:
        return <Clock className="w-5 h-5 text-slate-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'interrupted':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
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
          <h1 className="text-3xl font-bold mb-2 text-slate-900">Therapy Sessions</h1>
          <p className="text-slate-600">View all therapy sessions for {patient?.name}</p>
        </div>

        {/* Start Home Practice Button */}
        <Card className="p-6 mb-8 bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-900 mb-2">Ready for Practice?</h2>
              <p className="text-slate-600 mb-4">
                Visit the VR Practice section to start customized home sessions
              </p>
            </div>
            <Button
              onClick={() => navigate('/guardian/practice')}
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 h-12 px-6"
            >
              <Play className="w-5 h-5 mr-2" />
              Go to VR Practice
            </Button>
          </div>
        </Card>

        {/* Session Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-slate-600">Total Sessions</p>
              <Calendar className="w-5 h-5 text-sky-600" />
            </div>
            <p className="text-3xl font-bold text-slate-900">{reports.length}</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-slate-600">Completed</p>
              <CheckCircle className="w-5 h-5 text-emerald-600" />
            </div>
            <p className="text-3xl font-bold text-slate-900">
              {reports.filter(r => r.completionStatus === 'completed').length}
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-slate-600">This Month</p>
              <TrendingUp className="w-5 h-5 text-amber-600" />
            </div>
            <p className="text-3xl font-bold text-slate-900">
              {reports.filter(r => {
                const sessionDate = new Date(r.sessionDate);
                const now = new Date();
                return sessionDate.getMonth() === now.getMonth() && 
                       sessionDate.getFullYear() === now.getFullYear();
              }).length}
            </p>
          </Card>
        </div>

        {/* Sessions List */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-slate-900">Session History</h2>
          {reports.length === 0 ? (
            <Card className="p-12 text-center">
              <p className="text-gray-500 text-lg mb-4">No sessions yet</p>
              <Button
                onClick={() => navigate('/patient/session-start')}
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
              >
                <Play className="w-5 h-5 mr-2" />
                Start First Session
              </Button>
            </Card>
          ) : (
            <div className="space-y-4">
              {reports.map((report) => (
                <Card key={report.id} className="p-6 hover:shadow-lg transition-all">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        {getStatusIcon(report.completionStatus)}
                        <h3 className="text-lg font-semibold text-slate-900">
                          {getSceneName(report.sceneId)}
                        </h3>
                        <Badge className={`${getStatusColor(report.completionStatus)} border`}>
                          {report.completionStatus}
                        </Badge>
                      </div>

                      <div className="flex gap-6 text-sm text-slate-600 mb-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {format(new Date(report.sessionDate), 'MMM d, yyyy')}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          {report.duration} minutes
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div className="bg-emerald-50 rounded-lg p-3">
                          <p className="text-xs text-emerald-700 mb-1">Independence</p>
                          <p className="text-lg font-bold text-emerald-900">
                            {report.abaData.percentageIndependent}%
                          </p>
                        </div>
                        <div className="bg-sky-50 rounded-lg p-3">
                          <p className="text-xs text-sky-700 mb-1">Engagement</p>
                          <p className="text-lg font-bold text-sky-900 capitalize">
                            {report.behavioralObservations.engagementLevel}
                          </p>
                        </div>
                        <div className="bg-purple-50 rounded-lg p-3">
                          <p className="text-xs text-purple-700 mb-1">Positive Responses</p>
                          <p className="text-lg font-bold text-purple-900">
                            {report.behavioralObservations.positiveResponses}
                          </p>
                        </div>
                        <div className="bg-amber-50 rounded-lg p-3">
                          <p className="text-xs text-amber-700 mb-1">Emotional State</p>
                          <p className="text-lg font-bold text-amber-900 capitalize">
                            {report.behavioralObservations.emotionalState}
                          </p>
                        </div>
                      </div>

                      {report.therapistNotes && (
                        <div className="bg-slate-50 rounded-lg p-4">
                          <p className="text-sm text-slate-700">
                            <strong>Therapist Notes:</strong> {report.therapistNotes}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
