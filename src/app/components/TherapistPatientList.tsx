import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { DashboardLayout } from './DashboardLayout';
import { getPatientsByTherapist, getSessionReportsByPatient, addPatient } from '../../services/dataService';
import type { Patient } from '../../types';
import { User, Calendar, CheckCircle, AlertTriangle, Clock, Search, Plus, ArrowRight, X } from 'lucide-react';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

export default function TherapistPatientList() {
  const navigate = useNavigate();
  const { user, role } = useAuth();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    dateOfBirth: '',
    guardianName: '',
    guardianPhone: '',
    guardianEmail: '',
    primaryDiagnosis: 'Autism Spectrum Disorder',
    secondaryDiagnosis: '',
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadPatients();
  }, [user]);

  const loadPatients = async () => {
    if (!user || role !== 'therapist' || !('id' in user)) return;

    try {
      setLoading(true);
      const data = await getPatientsByTherapist(user.id);
      setPatients(data);
    } catch (error) {
      console.error('Failed to load patients:', error);
    } finally {
      setLoading(false);
    }
  };

  const getReadinessColor = (patient: Patient) => {
    // Calculate readiness based on recent activity
    if (patient.hasCompletedOnboarding) {
      return 'text-emerald-700 bg-emerald-100';
    }
    return 'text-amber-700 bg-amber-100';
  };

  const filteredPatients = patients.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const calculateAge = (dateOfBirth: string): number => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleAddPatient = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || role !== 'therapist' || !('id' in user)) return;

    setSubmitting(true);
    try {
      const age = calculateAge(formData.dateOfBirth);
      const patientId = `Child-ASD-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`;
      
      const newPatient: Patient = {
        id: patientId,
        name: formData.name,
        dateOfBirth: formData.dateOfBirth,
        age,
        guardianName: formData.guardianName,
        guardianPhone: formData.guardianPhone,
        guardianEmail: formData.guardianEmail,
        primaryDiagnosis: formData.primaryDiagnosis,
        secondaryDiagnosis: formData.secondaryDiagnosis || undefined,
        assignedTherapist: user.id,
        enrollmentDate: new Date().toISOString().split('T')[0],
        therapyGoals: [],
        sensoryProfile: {
          soundSensitivity: 'medium',
          visualSensitivity: 'medium',
          tactileSensitivity: 'medium',
          preferredEnvironments: []
        },
        hasCompletedOnboarding: false
      };

      const savedPatient = await addPatient(newPatient);
      setShowAddDialog(false);
      
      // Reset form
      setFormData({
        name: '',
        dateOfBirth: '',
        guardianName: '',
        guardianPhone: '',
        guardianEmail: '',
        primaryDiagnosis: 'Autism Spectrum Disorder',
        secondaryDiagnosis: '',
      });
      
      // Redirect to onboarding for the new patient
      navigate('/therapist/patient-onboarding', { state: { patient: savedPatient } });
    } catch (error) {
      console.error('Failed to add patient:', error);
      alert('Failed to add patient. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

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
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-slate-900">Patient Case Dashboard</h1>
          <p className="text-slate-600">Manage and monitor your assigned patients</p>
        </div>

        {/* Search and Actions */}
        <div className="flex gap-4 mb-6 flex-wrap">
          <div className="flex-1 min-w-[300px] relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search patients..."
              className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-xl bg-white focus:outline-none focus:border-emerald-400 transition-colors"
            />
          </div>
          <button 
            onClick={() => setShowAddDialog(true)}
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-all shadow-md flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            New Patient
          </button>
        </div>

        {/* Patient List */}
        <div className="space-y-4">
          {filteredPatients.length === 0 ? (
            <Card className="p-12 text-center">
              <p className="text-gray-500 text-lg">No patients found</p>
            </Card>
          ) : (
            filteredPatients.map((patient) => (
              <Card
                key={patient.id}
                className="p-6 cursor-pointer hover:shadow-lg transition-all border-2 border-transparent hover:border-emerald-200"
                onClick={() => navigate('/therapist/patient-detail', { state: { patient } })}
              >
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <User className="w-6 h-6 text-sky-600" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl text-slate-900 font-semibold">{patient.name}</h3>
                        <span className="text-sm text-slate-500">ID: {patient.id}</span>
                        {patient.hasCompletedOnboarding ? (
                          <CheckCircle className="w-5 h-5 text-emerald-600" />
                        ) : (
                          <AlertTriangle className="w-5 h-5 text-amber-600" />
                        )}
                      </div>
                      
                      <div className="flex gap-4 flex-wrap text-sm text-slate-600 mb-3">
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          Age {patient.age}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          Guardian: {patient.guardianName}
                        </div>
                      </div>

                      <div className="flex gap-2 flex-wrap">
                        <Badge variant="outline">{patient.primaryDiagnosis}</Badge>
                        {patient.secondaryDiagnosis && (
                          <Badge variant="outline">{patient.secondaryDiagnosis}</Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Readiness Indicator */}
                  <div className="flex flex-col gap-2 items-end">
                    <div className={`px-4 py-2 rounded-xl ${getReadinessColor(patient)}`}>
                      <p className="text-sm font-medium">
                        {patient.hasCompletedOnboarding ? 'Ready for therapy' : 'Needs onboarding'}
                      </p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-400" />
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-slate-600">Total Patients</p>
              <CheckCircle className="w-5 h-5 text-emerald-600" />
            </div>
            <p className="text-3xl font-bold text-slate-900">{patients.length}</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-slate-600">Ready for Therapy</p>
              <Calendar className="w-5 h-5 text-sky-600" />
            </div>
            <p className="text-3xl font-bold text-slate-900">
              {patients.filter(p => p.hasCompletedOnboarding).length}
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-slate-600">Needs Onboarding</p>
              <AlertTriangle className="w-5 h-5 text-amber-600" />
            </div>
            <p className="text-3xl font-bold text-slate-900">
              {patients.filter(p => !p.hasCompletedOnboarding).length}
            </p>
          </Card>
        </div>
      </div>

      {/* Add Patient Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">Add New Patient</DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleAddPatient} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Patient Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter patient name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date of Birth *</Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                required
                max={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="guardianName">Guardian Name *</Label>
              <Input
                id="guardianName"
                value={formData.guardianName}
                onChange={(e) => setFormData({ ...formData, guardianName: e.target.value })}
                placeholder="Enter guardian name"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="guardianPhone">Guardian Phone *</Label>
                <Input
                  id="guardianPhone"
                  type="tel"
                  value={formData.guardianPhone}
                  onChange={(e) => setFormData({ ...formData, guardianPhone: e.target.value })}
                  placeholder="+1234567890"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="guardianEmail">Guardian Email *</Label>
                <Input
                  id="guardianEmail"
                  type="email"
                  value={formData.guardianEmail}
                  onChange={(e) => setFormData({ ...formData, guardianEmail: e.target.value })}
                  placeholder="guardian@example.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="primaryDiagnosis">Primary Diagnosis *</Label>
              <Input
                id="primaryDiagnosis"
                value={formData.primaryDiagnosis}
                onChange={(e) => setFormData({ ...formData, primaryDiagnosis: e.target.value })}
                placeholder="e.g., Autism Spectrum Disorder"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="secondaryDiagnosis">Secondary Diagnosis (Optional)</Label>
              <Input
                id="secondaryDiagnosis"
                value={formData.secondaryDiagnosis}
                onChange={(e) => setFormData({ ...formData, secondaryDiagnosis: e.target.value })}
                placeholder="e.g., ADHD, Anxiety"
              />
            </div>

            <DialogFooter className="gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowAddDialog(false)}
                disabled={submitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={submitting}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                {submitting ? 'Adding...' : 'Add Patient'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
