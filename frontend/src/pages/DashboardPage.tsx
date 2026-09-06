import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Camera, CheckCircle2, Clock, Users } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { assessmentService } from '@/services/assessment.service';
import { reminderService } from '@/services/reminder.service';

const DashboardPage: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  
  const [assessments, setAssessments] = useState<any[]>([]);
  const [reminders, setReminders] = useState<any[]>([]);

  useEffect(() => {
    assessmentService.getUserAssessments().then(data => setAssessments(data)).catch(console.error);
    reminderService.getReminders().then(data => setReminders(data)).catch(console.error);
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Greeting */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">{getGreeting()}, {user?.fullName.split(' ')[0]}</h1>
          <p className="text-slate-600">{t('dashboard.readyForCheck')}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main CTA */}
        <div className="md:col-span-2">
          <Card className="bg-gradient-to-br from-primary-600 to-accent-600 text-white border-none shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10 transform translate-x-4 -translate-y-4">
              <Camera className="h-32 w-32" />
            </div>
            <CardHeader className="relative z-10 pb-2">
              <CardTitle className="text-2xl text-white">Start a new skin check</CardTitle>
              <CardDescription className="text-primary-100">Upload a photo to get an instant AI assessment of any skin concern.</CardDescription>
            </CardHeader>
            <CardContent className="relative z-10 pt-4">
              <Link to="/assessment/new">
                <Button variant="secondary" size="lg" className="bg-white text-primary-700 hover:bg-slate-50 font-semibold shadow-md">
                  <Camera className="mr-2 h-5 w-5" />
                  {t('dashboard.startSkinCheck')}
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Routine */}
        <div>
          <Card className="h-full">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary-600" />
                {t('dashboard.todaysRoutine')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reminders.length === 0 ? (
                  <p className="text-sm text-slate-500">No reminders for today.</p>
                ) : (
                  reminders.slice(0, 3).map((rem, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className={`mt-1 h-5 w-5 rounded-full border-2 ${i === 1 ? 'border-primary-500 bg-primary-500 flex items-center justify-center' : 'border-slate-300'}`}>
                        {i === 1 && <CheckCircle2 className="h-4 w-4 text-white" />}
                      </div>
                      <div>
                        <p className={`font-medium text-sm ${i === 1 ? 'line-through text-slate-500' : ''}`}>{rem.name}</p>
                        <p className="text-xs text-slate-500">{rem.reminderTime}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent History */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg">{t('dashboard.recentAssessment')}</CardTitle>
            <Link to="/history" className="text-sm font-medium text-primary-600">{t('dashboard.viewAll')}</Link>
          </CardHeader>
          <CardContent>
            {assessments.length === 0 ? (
              <p className="text-sm text-slate-500">No recent assessments.</p>
            ) : (
              assessments.slice(0, 3).map((assessment, i) => (
                <div key={i} className="flex items-center gap-4 rounded-lg border border-slate-100 p-3 bg-slate-50 mb-3">
                  <div className="h-12 w-12 rounded-md bg-slate-200 overflow-hidden flex items-center justify-center">
                    {assessment.image ? (
                      <img src={`/api/assessments/${assessment.id}/image`} alt="Skin area" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-slate-300" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{assessment.bodyArea || 'Unknown Area'} • {assessment.result?.possibleConditions?.[0]?.condition || 'Analysis'}</p>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                      <Clock className="h-3 w-3" />
                      <span>{new Date(assessment.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  {assessment.result && (
                    <div className={`px-2 py-1 rounded text-xs font-medium ${
                      assessment.result.severity === 'severe' ? 'bg-red-100 text-red-700' :
                      assessment.result.severity === 'moderate' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {assessment.result.severity}
                    </div>
                  )}
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Family */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg">{t('dashboard.familyMembers')}</CardTitle>
            <Link to="/family" className="text-sm font-medium text-primary-600">{t('dashboard.viewAll')}</Link>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="flex flex-col items-center gap-2">
                <Avatar className="h-12 w-12 border-2 border-primary-100">
                  <AvatarFallback className="bg-primary-50 text-primary-700">{user?.fullName.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="text-xs font-medium">{t('family.relationships.me')}</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <button className="h-12 w-12 rounded-full border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-400 hover:border-primary-400 hover:text-primary-600 transition-colors">
                  <Users className="h-5 w-5" />
                </button>
                <span className="text-xs font-medium text-slate-500">Add</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
