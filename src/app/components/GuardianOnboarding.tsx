import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  getOnboardingQuestions, 
  saveOnboardingResult,
  getVRSceneById 
} from '../../services/dataService';
import type { OnboardingQuestion, OnboardingResponse } from '../../types';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { ClipboardCheck, ArrowRight, CheckCircle } from 'lucide-react';

export function GuardianOnboarding() {
  const { patient } = useAuth();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<OnboardingQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState<OnboardingResponse[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState(false);
  const [recommendedScenes, setRecommendedScenes] = useState<string[]>([]);

  useEffect(() => {
    loadQuestions();
  }, []);

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

  const handleGoToDashboard = () => {
    navigate('/guardian/dashboard');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  if (completed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full p-8">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Assessment Complete!
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Thank you for completing the assessment for {patient?.name}. 
              We've created a personalized therapy plan based on your responses.
            </p>

            <div className="bg-amber-50 rounded-xl p-6 mb-8 text-left">
              <h2 className="font-semibold text-lg mb-4">Recommended VR Sessions:</h2>
              <ul className="space-y-2">
                {recommendedScenes.map((sceneId, idx) => (
                  <li key={sceneId} className="flex items-center gap-2">
                    <span className="w-6 h-6 bg-amber-500 text-white rounded-full flex items-center justify-center text-sm">
                      {idx + 1}
                    </span>
                    <span className="text-gray-700">{sceneId}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Button
              onClick={handleGoToDashboard}
              className="h-12 px-8 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
            >
              Go to Dashboard
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 p-4">
      <div className="max-w-3xl mx-auto py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <ClipboardCheck className="w-8 h-8 text-amber-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Initial Assessment for {patient?.name}
              </h1>
              <p className="text-gray-600">
                Question {currentIndex + 1} of {questions.length}
              </p>
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Card className="p-8">
          <div className="mb-6">
            <span className="inline-block px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium mb-4">
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
                    className="flex-1 cursor-pointer p-4 rounded-lg border-2 transition-all hover:bg-amber-50"
                    style={{
                      borderColor: selectedAnswer === option.value ? '#f59e0b' : '#e5e7eb',
                      backgroundColor: selectedAnswer === option.value ? '#fef3c7' : 'white'
                    }}
                  >
                    <span className="text-lg text-gray-800">{option.label}</span>
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>

          <div className="mt-8 flex justify-between">
            <Button
              variant="outline"
              onClick={() => {
                if (currentIndex > 0) {
                  setCurrentIndex(currentIndex - 1);
                  setResponses(responses.slice(0, -1));
                  setSelectedAnswer(responses[currentIndex - 1]?.selectedValue || '');
                }
              }}
              disabled={currentIndex === 0}
            >
              Previous
            </Button>

            <Button
              onClick={handleNext}
              disabled={!selectedAnswer}
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
            >
              {currentIndex < questions.length - 1 ? 'Next' : 'Complete'}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
