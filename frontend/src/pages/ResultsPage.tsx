import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { AlertTriangle, Download, Share2, Calendar, Stethoscope, ShieldAlert, Info, Loader2 } from 'lucide-react';
import { assessmentService } from '@/services/assessment.service';
import { SkinAssessment } from '@/types';

export default function ResultsPage() {
  const { t } = useTranslation();
  const { id } = useParams();
  const [acknowledged, setAcknowledged] = useState(false);
  const [assessment, setAssessment] = useState<SkinAssessment | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      assessmentService.getResults(id)
        .then(data => setAssessment(data))
        .catch(err => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) {
    return <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-primary-500" /></div>;
  }

  if (!assessment || !assessment.result) {
    return <div className="text-center py-20">Assessment not found or still processing.</div>;
  }

  const result = assessment.result as any;
  const recommendations = assessment.recommendations || result.recommendations || [];
  
  const primaryCondition = result.possibleConditions?.[0] || { condition: 'Unknown', confidenceScore: 0 };
  const severityColors: Record<string, string> = {
    mild: 'bg-green-100 text-green-800 border-green-200',
    moderate: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    severe: 'bg-red-100 text-red-800 border-red-200'
  };

  return (
    <div className="container max-w-5xl mx-auto py-8 px-4 space-y-6">
      
      {/* Medical Disclaimer Banner */}
      <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-lg flex gap-3 shadow-sm">
        <AlertTriangle className="text-orange-600 flex-shrink-0 w-6 h-6" />
        <div>
          <h3 className="text-orange-800 font-bold">{t('results.disclaimerTitle') || 'Important Medical Disclaimer'}</h3>
          <p className="text-orange-700 text-sm mt-1">{result.disclaimer}</p>
        </div>
      </div>

      {/* Urgency Banner if high/emergency */}
      {result.urgency === 'high' && (
        <div className="bg-red-600 text-white p-4 rounded-lg flex items-center justify-between shadow-md animate-in fade-in slide-in-from-top-4">
          <div className="flex items-center gap-3">
            <ShieldAlert className="w-8 h-8" />
            <div>
              <h3 className="font-bold text-lg">Medical Attention Recommended</h3>
              <p className="text-red-100 text-sm">Based on your symptoms, we suggest consulting a healthcare professional soon.</p>
            </div>
          </div>
          <Button variant="secondary" className="bg-white text-red-600 hover:bg-red-50">Find Doctor</Button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">{t('results.title') || 'Assessment Results'}</h1>
          <p className="text-slate-500 text-sm mt-1">ID: {result.assessmentId} • {assessment.createdAt} • {assessment.bodyArea}</p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <Button variant="outline" className="flex-1 md:flex-none"><Download className="w-4 h-4 mr-2"/> PDF</Button>
          <Button variant="outline" className="flex-1 md:flex-none"><Share2 className="w-4 h-4 mr-2"/> Share</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Main Column */}
        <div className="md:col-span-2 space-y-6">
          
          {/* Primary Result Card */}
          <Card className="border-t-4 border-t-teal-600 shadow-md">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start mb-2">
                <Badge variant="outline" className="bg-teal-50 text-teal-700 border-teal-200">Primary Match</Badge>
                <Badge variant="outline" className={severityColors[result.severity]}>
                  {result.severity.charAt(0).toUpperCase() + result.severity.slice(1)} Severity
                </Badge>
              </div>
              <CardTitle className="text-3xl text-teal-900">{primaryCondition.name}</CardTitle>
              <CardDescription className="text-base mt-2 text-slate-700">
                {primaryCondition.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-slate-700">AI Confidence</span>
                  <span className="font-bold text-teal-700">{Math.round(primaryCondition.confidence * 100)}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-3">
                  <div className="bg-teal-500 h-3 rounded-full" style={{ width: `${primaryCondition.confidence * 100}%` }}></div>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Detected Symptoms</h4>
                <div className="flex flex-wrap gap-2">
                  {(result.symptomsSummary || []).map((sym: string) => (
                    <Badge key={sym} variant="secondary" className="bg-slate-100 text-slate-700">{sym}</Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card>
            <CardHeader>
              <CardTitle>Recommended Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recommendations.map((rec: any, idx: number) => (
                <div key={idx} className="flex gap-4 p-4 rounded-lg bg-slate-50 border border-slate-100">
                  <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center font-bold flex-shrink-0">
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">{rec.title}</h4>
                    <p className="text-slate-600 text-sm mt-1">{rec.description}</p>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full text-teal-600 border-teal-200 hover:bg-teal-50">
                <Calendar className="w-4 h-4 mr-2" /> Add to Daily Routine
              </Button>
            </CardFooter>
          </Card>

          {/* Other Possibilities */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Other Potential Conditions</CardTitle>
              <CardDescription>The AI also considered these possibilities based on the visual evidence.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {result.possibleConditions.slice(1).map((cond: any, idx: number) => (
                <div key={idx} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-slate-800">{cond.name}</span>
                    <span className="text-sm text-slate-500">{Math.round(cond.confidence * 100)}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div className="bg-slate-300 h-2 rounded-full" style={{ width: `${cond.confidence * 100}%` }}></div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-6">
          
          <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-indigo-900">
                <Stethoscope className="w-5 h-5" /> Professional Care
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-indigo-800">For a definitive diagnosis and treatment plan, consult a certified dermatologist.</p>
              <div className="space-y-3">
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700">Book Teleconsultation</Button>
                <Button variant="outline" className="w-full border-indigo-200 text-indigo-700 hover:bg-indigo-100">Find Nearby Clinic</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 pt-6 space-y-4">
              <div className="flex items-start gap-3">
                <Checkbox id="ack" checked={acknowledged} onCheckedChange={(v) => setAcknowledged(v as boolean)} />
                <label htmlFor="ack" className="text-sm text-slate-600 leading-snug cursor-pointer">
                  I understand that this is an AI-generated analysis and not a substitute for professional medical diagnosis.
                </label>
              </div>
              <Button className="w-full" disabled={!acknowledged}>Save to History</Button>
            </CardContent>
          </Card>

          <div className="text-xs text-slate-400 flex items-start gap-2 bg-slate-50 p-3 rounded-md">
            <Info className="w-4 h-4 flex-shrink-0" />
            <div>
              <p>Model: {result.aiProvider}</p>
              <p>Version: {result.modelVersion}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
