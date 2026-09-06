import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { ChevronRight, CheckCircle2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { assessmentService } from '@/services/assessment.service';

const TOTAL_STEPS = 11;

const YesNoQuestion = ({ value, onChange, yesLabel, noLabel }: { value: boolean | null, onChange: (v: boolean) => void, yesLabel: string, noLabel: string }) => (
  <div className="flex gap-4 w-full">
    <Button
      type="button"
      variant={value === true ? 'default' : 'outline'}
      className="flex-1 h-16 text-lg"
      onClick={() => onChange(true)}
    >
      {yesLabel}
    </Button>
    <Button
      type="button"
      variant={value === false ? 'default' : 'outline'}
      className="flex-1 h-16 text-lg"
      onClick={() => onChange(false)}
    >
      {noLabel}
    </Button>
  </div>
);

export default function QuestionnairePage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
  const [answers, setAnswers] = useState<Record<string, any>>({
    mainProblems: [],
    duration: '',
    progression: '',
    severity: '',
    pain: null,
    itching: null,
    swelling: null,
    bleeding: null,
    discharge: null,
    usedTreatment: null,
    treatmentDescription: '',
    freeText: '',
    bodyArea: ''
  });

  const updateAnswer = (key: string, value: any) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
  };

  const toggleMainProblem = (problem: string) => {
    const current = answers.mainProblems;
    const updated = current.includes(problem)
      ? current.filter((p: string) => p !== problem)
      : [...current, problem];
    updateAnswer('mainProblems', updated);
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNext = async () => {
    if (step < TOTAL_STEPS) {
      setDirection('forward');
      setStep(prev => prev + 1);
    } else {
      setIsSubmitting(true);
      try {
        await assessmentService.submitQuestionnaire(id || 'mock-id', answers, answers.freeText, 'en');
        navigate(`/assessment/${id || 'mock-id'}/analyzing`);
      } catch (err) {
        console.error(err);
        alert('Failed to submit questionnaire');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setDirection('backward');
      setStep(prev => prev - 1);
    } else {
      navigate(-1);
    }
  };

  const renderStep = () => {
    const animationClass = direction === 'forward' ? 'animate-in slide-in-from-right-8 fade-in duration-300' : 'animate-in slide-in-from-left-8 fade-in duration-300';
    
    switch (step) {
      case 1: {
        const problems = ['itching', 'redness', 'swelling', 'pain', 'burning', 'dryness', 'scaling', 'rash', 'bumps', 'blisters', 'discoloration', 'wound', 'other'];
        return (
          <div className={`space-y-4 ${animationClass}`}>
            <h2 className="text-xl font-semibold mb-4">{t('questionnaire.q1')}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {problems.map((p) => (
                <div key={p} className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-slate-50 cursor-pointer" onClick={() => toggleMainProblem(p)}>
                  <Checkbox id={`prob-${p}`} checked={answers.mainProblems.includes(p)} onCheckedChange={() => toggleMainProblem(p)} />
                  <Label htmlFor={`prob-${p}`} className="flex-1 cursor-pointer">{t(`questionnaire.q1Options.${p}`)}</Label>
                </div>
              ))}
            </div>
          </div>
        );
      }
      case 2: {
        const durations = ['lessThan1Day', '1to3Days', '4to7Days', '1to4Weeks', 'moreThan1Month'];
        return (
          <div className={`space-y-4 ${animationClass}`}>
            <h2 className="text-xl font-semibold mb-4">{t('questionnaire.q2')}</h2>
            <RadioGroup value={answers.duration} onValueChange={(val) => updateAnswer('duration', val)} className="space-y-3">
              {durations.map(d => (
                <div key={d} className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-slate-50">
                  <RadioGroupItem value={d} id={`dur-${d}`} />
                  <Label htmlFor={`dur-${d}`} className="flex-1 cursor-pointer">{t(`questionnaire.q2Options.${d}`)}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        );
      }
      case 3: {
        const progressions = ['better', 'same', 'worse', 'comesAndGoes'];
        return (
          <div className={`space-y-4 ${animationClass}`}>
            <h2 className="text-xl font-semibold mb-4">{t('questionnaire.q3')}</h2>
            <RadioGroup value={answers.progression} onValueChange={(val) => updateAnswer('progression', val)} className="space-y-3">
              {progressions.map(p => (
                <div key={p} className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-slate-50">
                  <RadioGroupItem value={p} id={`prog-${p}`} />
                  <Label htmlFor={`prog-${p}`} className="flex-1 cursor-pointer">{t(`questionnaire.q3Options.${p}`)}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        );
      }
      case 4: {
        const severities = ['mild', 'moderate', 'severe'];
        const colors: Record<string, string> = { mild: 'bg-green-100 border-green-300', moderate: 'bg-yellow-100 border-yellow-300', severe: 'bg-red-100 border-red-300' };
        return (
          <div className={`space-y-4 ${animationClass}`}>
            <h2 className="text-xl font-semibold mb-4">{t('questionnaire.q4')}</h2>
            <RadioGroup value={answers.severity} onValueChange={(val) => updateAnswer('severity', val)} className="space-y-3">
              {severities.map(s => (
                <div key={s} className={`flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:opacity-90 ${answers.severity === s ? colors[s] : 'bg-white'}`}>
                  <RadioGroupItem value={s} id={`sev-${s}`} />
                  <Label htmlFor={`sev-${s}`} className="flex-1 cursor-pointer font-medium">{t(`questionnaire.q4Options.${s}`)}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        );
      }
      case 5:
        return (
          <div className={`space-y-4 ${animationClass}`}>
            <h2 className="text-xl font-semibold mb-4">{t('questionnaire.q5')}</h2>
            <YesNoQuestion value={answers.pain} onChange={(v) => updateAnswer('pain', v)} yesLabel={t('common.yes')} noLabel={t('common.no')} />
          </div>
        );
      case 6:
        return (
          <div className={`space-y-4 ${animationClass}`}>
            <h2 className="text-xl font-semibold mb-4">{t('questionnaire.q6')}</h2>
            <YesNoQuestion value={answers.itching} onChange={(v) => updateAnswer('itching', v)} yesLabel={t('common.yes')} noLabel={t('common.no')} />
          </div>
        );
      case 7:
        return (
          <div className={`space-y-4 ${animationClass}`}>
            <h2 className="text-xl font-semibold mb-4">{t('questionnaire.q7')}</h2>
            <YesNoQuestion value={answers.swelling} onChange={(v) => updateAnswer('swelling', v)} yesLabel={t('common.yes')} noLabel={t('common.no')} />
          </div>
        );
      case 8:
        return (
          <div className={`space-y-4 ${animationClass}`}>
            <h2 className="text-xl font-semibold mb-4">{t('questionnaire.q8')}</h2>
            <YesNoQuestion value={answers.bleeding} onChange={(v) => updateAnswer('bleeding', v)} yesLabel={t('common.yes')} noLabel={t('common.no')} />
          </div>
        );
      case 9:
        return (
          <div className={`space-y-4 ${animationClass}`}>
            <h2 className="text-xl font-semibold mb-4">{t('questionnaire.q9')}</h2>
            <YesNoQuestion value={answers.discharge} onChange={(v) => updateAnswer('discharge', v)} yesLabel={t('common.yes')} noLabel={t('common.no')} />
          </div>
        );
      case 10:
        return (
          <div className={`space-y-4 ${animationClass}`}>
            <h2 className="text-xl font-semibold mb-4">{t('questionnaire.q10')}</h2>
            <YesNoQuestion value={answers.usedTreatment} onChange={(v) => updateAnswer('usedTreatment', v)} yesLabel={t('common.yes')} noLabel={t('common.no')} />
            {answers.usedTreatment && (
              <div className="mt-4 animate-in fade-in duration-300">
                <Label htmlFor="treatment-desc" className="mb-2 block">{t('questionnaire.treatmentDescription') || 'Please describe the treatment:'}</Label>
                <Textarea id="treatment-desc" rows={3} value={answers.treatmentDescription} onChange={(e) => updateAnswer('treatmentDescription', e.target.value)} />
              </div>
            )}
          </div>
        );
      case 11:
        return (
          <div className={`space-y-6 ${animationClass}`}>
            <h2 className="text-xl font-semibold mb-4">{t('questionnaire.freeTextTitle')}</h2>
            
            <div className="space-y-2">
              <Label>{t('assessment.bodyAreaLabel') || 'Body Area'}</Label>
              <Select value={answers.bodyArea} onValueChange={(val) => updateAnswer('bodyArea', val)}>
                <SelectTrigger>
                  <SelectValue placeholder={t('assessment.bodyAreaPlaceholder') || 'Select body area'} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="face">{t('assessment.bodyAreas.face') || 'Face'}</SelectItem>
                  <SelectItem value="neck">{t('assessment.bodyAreas.neck') || 'Neck'}</SelectItem>
                  <SelectItem value="chest">{t('assessment.bodyAreas.chest') || 'Chest'}</SelectItem>
                  <SelectItem value="back">{t('assessment.bodyAreas.back') || 'Back'}</SelectItem>
                  <SelectItem value="arms">{t('assessment.bodyAreas.arms') || 'Arms'}</SelectItem>
                  <SelectItem value="hands">{t('assessment.bodyAreas.hands') || 'Hands'}</SelectItem>
                  <SelectItem value="legs">{t('assessment.bodyAreas.legs') || 'Legs'}</SelectItem>
                  <SelectItem value="feet">{t('assessment.bodyAreas.feet') || 'Feet'}</SelectItem>
                  <SelectItem value="other">{t('assessment.bodyAreas.other') || 'Other'}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>{t('questionnaire.additionalInfo') || 'Additional Information'}</Label>
              <Textarea 
                rows={5} 
                placeholder={t('questionnaire.freeTextPlaceholder') || 'e.g. It started after trying a new soap...'}
                value={answers.freeText}
                onChange={(e) => updateAnswer('freeText', e.target.value)}
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const isStepValid = () => {
    switch (step) {
      case 1: return answers.mainProblems.length > 0;
      case 2: return !!answers.duration;
      case 3: return !!answers.progression;
      case 4: return !!answers.severity;
      case 5: return answers.pain !== null;
      case 6: return answers.itching !== null;
      case 7: return answers.swelling !== null;
      case 8: return answers.bleeding !== null;
      case 9: return answers.discharge !== null;
      case 10: return answers.usedTreatment === false || (answers.usedTreatment === true && answers.treatmentDescription.trim() !== '');
      case 11: return !!answers.bodyArea;
      default: return true;
    }
  };

  return (
    <div className="container max-w-2xl mx-auto py-8 px-4">
      <Card className="shadow-lg border-t-4 border-t-teal-600">
        <CardHeader>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-slate-500">
              {t('common.step')} {step} {t('common.of')} {TOTAL_STEPS}
            </span>
          </div>
          <Progress value={(step / TOTAL_STEPS) * 100} className="h-2 bg-slate-100" />
        </CardHeader>
        <CardContent className="min-h-[300px] pt-6">
          <div className="overflow-hidden">
            {renderStep()}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t p-6">
          <Button variant="outline" onClick={handleBack}>
            {step === 1 ? t('common.cancel') : t('common.back')}
          </Button>
          <Button onClick={handleNext} disabled={!isStepValid() || isSubmitting} className="bg-teal-600 hover:bg-teal-700">
            {step === TOTAL_STEPS ? (
              <>
                <CheckCircle2 className="mr-2 h-4 w-4" />
                {t('common.submit')}
              </>
            ) : (
              <>
                {t('common.next')}
                <ChevronRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
