import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  getOnboardingQuestions, 
  saveOnboardingResult,
  getVRSceneById 
} from '../../services/dataService';
import type { OnboardingQuestion, OnboardingResponse, Patient } from '../../types';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { ClipboardCheck, ArrowRight, CheckCircle, ArrowLeft, Home } from 'lucide-react';
import DemoNav from './DemoNav';

export default function TherapistPatientOnboarding() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const patient = location.state?.patient as Patient;

  const [questions, setQuestions] = useState<OnboardingQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState<OnboardingResponse[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState(false);
  const [recommendedScenes, setRecommendedScenes] = useState<string[]>([]);

  useEffect(() => {
    if (!patient) {
      navigate('/therapist/patients');
      return;
    }
    loadQuestions();
  }, [patient]);

  const loadQuestions = async () => {
    try {
      const data = await getOnboardingQuestions();
      setQuestions(data);
    } catch (error) {
      console.error('Failed to load questions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (!selectedAnswer) return;

    const currentQuestion = questions[currentIndex];
    const selectedOption = currentQuestion.options.find(opt => opt.value === selectedAnswer);
    
    if (!selectedOption) return;

    const newResponse: OnboardingResponse = {
      questionId: currentQuestion.id,
      selectedValue: selectedAnswer,
      score: selectedOption.score
    };

    const updatedResponses = [...responses, newResponse];
    setResponses(updatedResponses);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer('');
    } else {
      // Complete onboarding
      completeOnboarding(updatedResponses);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setResponses(responses.slice(0, -1));
      setSelectedAnswer(responses[currentIndex - 1]?.selectedValue || '');
    }
  };

  const completeOnboarding = async (allResponses: OnboardingResponse[]) => {
    if (!patient) return;

    const totalScore = allResponses.reduce((sum, r) => sum + r.score, 0);
    
    // Calculate recommended scenes based on responses
    const sceneRecommendations = new Set<string>();
    allResponses.forEach((response, idx) => {
      const question = questions[idx];
      const scenesForAnswer = question.recommendedScenes[response.selectedValue] || [];
      scenesForAnswer.forEach(sceneId => sceneRecommendations.add(sceneId));
    });

    const recommended = Array.from(sceneRecommendations).slice(0, 5); // Top 5

    const result = {
      patientId: patient.id,
      responses: allResponses,
      totalScore,
      recommendedScenes: recommended,
      completedDate: new Date().toISOString()
    };

    try {
      await saveOnboardingResult(result);
      setRecommendedScenes(recommended);
      setCompleted(true);
    } catch (error) {
      console.error('Failed to save onboarding:', error);
    }
  };

  const handleComplete = () => {
    navigate('/therapist/patients');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-emerald-50">
        <DemoNav />
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600"></div>
        </div>
      </div>
    );
  }

  if (completed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-emerald-50">
        <DemoNav />
        <header className="bg-white border-b border-slate-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/')}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <Home className="w-5 h-5 text-slate-600" />
              </button>
              <div>
                <h1 className="text-2xl text-slate-900">Initial Assessment Complete</h1>
                <p className="text-sm text-slate-600">Patient onboarding completed successfully</p>
              </div>
            </div>
          </div>
        </header>

        <div className="flex items-center justify-center p-4 py-12">
          <Card className="max-w-2xl w-full p-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Assessment Complete!
              </h1>
              <p className="text-lg text-gray-600 mb-2">
                Initial assessment completed for <strong>{patient?.name}</strong>
              </p>
              <p className="text-sm text-gray-500 mb-8">
                Patient ID: {patient?.id}
              </p>

              <div className="bg-sky-50 rounded-xl p-6 mb-8 text-left border-2 border-sky-200">
                <h2 className="font-semibold text-lg mb-2 text-sky-900">Assessment Summary</h2>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-sky-700">Total Score</p>
                    <p className="text-2xl font-bold text-sky-900">
                      {responses.reduce((sum, r) => sum + r.score, 0)} / {questions.length * 5}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-sky-700">Recommended Scenes</p>
                    <p className="text-2xl font-bold text-sky-900">{recommendedScenes.length}</p>
                  </div>
                </div>
                <h3 className="font-semibold text-md mb-3 text-sky-900">Therapy Plan - VR Sessions:</h3>
                <ul className="space-y-2">
                  {recommendedScenes.map((sceneId, idx) => (
                    <li key={sceneId} className="flex items-center gap-2">
                      <span className="w-6 h-6 bg-sky-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                        {idx + 1}
                      </span>
                      <span className="text-gray-700 font-medium">{sceneId}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-sm text-gray-600 mb-6">
                The guardian can now access the patient dashboard with their credentials.
              </p>

              <Button
                onClick={handleComplete}
                className="h-12 px-8 bg-gradient-to-r from-sky-500 to-emerald-500 hover:from-sky-600 hover:to-emerald-600"
              >
                Back to Patient List
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-emerald-50">
      <DemoNav />
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/therapist/patients')}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-slate-600" />
            </button>
            <div>
              <h1 className="text-2xl text-slate-900">Initial Assessment</h1>
              <p className="text-sm text-slate-600">Patient: {patient?.name} (ID: {patient?.id})</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto p-6 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <ClipboardCheck className="w-8 h-8 text-sky-600" />
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Baseline Assessment Questionnaire
              </h2>
              <p className="text-gray-600">
                Question {currentIndex + 1} of {questions.length}
              </p>
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Card className="p-8">
          <div className="mb-6">
            <span className="inline-block px-3 py-1 bg-sky-100 text-sky-700 rounded-full text-sm font-medium mb-4">
              {currentQuestion.category.replace(/_/g, ' ').toUpperCase()}
            </span>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              {currentQuestion.question}
            </h2>
          </div>

          <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
            <div className="space-y-4">
              {currentQuestion.options.map((option) => (
                <div key={option.value} className="flex items-start space-x-3">
                  <RadioGroupItem 
                    value={option.value} 
                    id={option.value}
                    className="mt-1" 
                  />
                  <Label 
                    htmlFor={option.value}
                    className="flex-1 cursor-pointer p-4 rounded-lg border-2 transition-all hover:bg-sky-50"
                    style={{
                      borderColor: selectedAnswer === option.value ? '#0ea5e9' : '#e5e7eb',
                      backgroundColor: selectedAnswer === option.value ? '#e0f2fe' : 'white'
                    }}
                  >
                    <span className="text-lg text-gray-800">{option.label}</span>
                    <span className="ml-2 text-sm text-gray-500">(Score: {option.score})</span>
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>

          <div className="mt-8 flex justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentIndex === 0}
            >
              <ArrowLeft className="mr-2 w-5 h-5" />
              Previous
            </Button>

            <Button
              onClick={handleNext}
              disabled={!selectedAnswer}
              className="bg-gradient-to-r from-sky-500 to-emerald-500 hover:from-sky-600 hover:to-emerald-600"
            >
              {currentIndex < questions.length - 1 ? 'Next' : 'Complete Assessment'}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
