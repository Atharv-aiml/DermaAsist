import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CheckCircle2, Circle, Loader2 } from 'lucide-react';
import { assessmentService } from '@/services/assessment.service';

export default function AnalyzingPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [currentStep, setCurrentStep] = useState(0);
  const [analysisComplete, setAnalysisComplete] = useState(false);

  useEffect(() => {
    let isMounted = true;
    
    const runApi = async () => {
      try {
        await assessmentService.runAnalysis(id || 'mock-id');
      } catch (err) {
        console.error("Analysis error:", err);
      } finally {
        if (isMounted) setAnalysisComplete(true);
      }
    };
    runApi();

    const timer1 = setTimeout(() => setCurrentStep(1), 1000);
    const timer2 = setTimeout(() => setCurrentStep(2), 2000);
    const timer3 = setTimeout(() => setCurrentStep(3), 3000);
    const timer4 = setTimeout(() => setCurrentStep(4), 4000);
    
    return () => {
      isMounted = false;
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [id]);

  useEffect(() => {
    if (currentStep === 4 && analysisComplete) {
      setTimeout(() => {
        navigate(`/assessment/${id || 'mock-id'}/results`);
      }, 500);
    }
  }, [currentStep, analysisComplete, navigate, id]);

  const steps = [
    { label: t('analyzing.step1') || 'Image received securely', time: 0 },
    { label: t('analyzing.step2') || 'Image quality verified', time: 1 },
    { label: t('analyzing.step3') || 'Symptoms and history processed', time: 2 },
    { label: t('analyzing.step4') || 'AI model analyzing condition...', time: 3 },
    { label: t('analyzing.step5') || 'Preparing comprehensive report...', time: 4 },
  ];

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-teal-50 to-white -z-10 animate-pulse"></div>
      
      <div className="w-24 h-24 bg-white rounded-2xl shadow-xl flex items-center justify-center mb-8 border-2 border-teal-100">
        <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center relative">
          <div className="absolute inset-0 border-4 border-teal-200 rounded-full animate-ping opacity-75"></div>
          <span className="text-white text-2xl font-bold">DA</span>
        </div>
      </div>
      
      <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">{t('analyzing.title') || 'Analyzing your image...'}</h1>
      <p className="text-slate-500 mb-12 text-center max-w-md">
        {t('analyzing.subtitle') || 'Our AI is carefully examining the provided information and image to generate an assessment.'}
      </p>

      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 space-y-6">
        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const isDone = index < currentStep;
          
          return (
            <div key={index} className={`flex items-center gap-4 transition-all duration-500 ${isDone || isActive ? 'opacity-100 translate-x-0' : 'opacity-40 translate-x-4'}`}>
              <div className="flex-shrink-0">
                {isDone ? (
                  <CheckCircle2 className="w-6 h-6 text-teal-500" />
                ) : isActive ? (
                  <Loader2 className="w-6 h-6 text-purple-500 animate-spin" />
                ) : (
                  <Circle className="w-6 h-6 text-slate-300" />
                )}
              </div>
              <div className="flex-1">
                <p className={`font-medium ${isDone ? 'text-slate-700' : isActive ? 'text-purple-700' : 'text-slate-400'}`}>
                  {step.label}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-12 text-xs text-slate-400 max-w-lg text-center px-4 bg-slate-50 p-3 rounded-lg border border-slate-100">
        {t('disclaimer.short') || 'Medical Disclaimer: This AI-generated assessment is for informational purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment.'}
      </div>
    </div>
  );
}
