import React from 'react';
import { useTranslation } from 'react-i18next';
import { Sparkles, Users, MapPin, Shield, Languages, LineChart } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export const WhyDermaAsistSection: React.FC = () => {
  const { t } = useTranslation();

  const reasons = [
    { icon: Sparkles, titleKey: 'landing.aiAssessment', desc: 'State-of-the-art machine learning models.' },
    { icon: Users, titleKey: 'landing.familyAccount', desc: 'Manage up to 4 family members in one place.' },
    { icon: MapPin, titleKey: 'landing.indianFocus', desc: 'Trained specifically on diverse Indian skin tones.' },
    { icon: Shield, titleKey: 'landing.privacy', desc: 'Strict data protection and privacy measures.' },
    { icon: Languages, titleKey: 'landing.languageSupport', desc: 'Available in English and Hindi natively.' },
    { icon: LineChart, titleKey: 'landing.routineReminders', desc: 'Track your routine and monitor progress.' },
  ];

  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{t('landing.whyDermaAsist')}</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, idx) => (
            <Card key={idx} className="bg-white">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary-100 flex items-center justify-center text-primary-600 mb-4">
                  <reason.icon className="h-6 w-6" />
                </div>
                <CardTitle>{t(reason.titleKey)}</CardTitle>
                <CardDescription>{reason.desc}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
