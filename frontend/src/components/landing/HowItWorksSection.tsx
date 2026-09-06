import React from 'react';
import { useTranslation } from 'react-i18next';
import { Camera, ClipboardList, MessageSquare, Brain, FileCheck, Heart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export const HowItWorksSection: React.FC = () => {
  const { t } = useTranslation();

  const steps = [
    { id: '1', icon: Camera, color: 'bg-blue-100 text-blue-600' },
    { id: '2', icon: ClipboardList, color: 'bg-emerald-100 text-emerald-600' },
    { id: '3', icon: MessageSquare, color: 'bg-amber-100 text-amber-600' },
    { id: '4', icon: Brain, color: 'bg-purple-100 text-purple-600' },
    { id: '5', icon: FileCheck, color: 'bg-primary-100 text-primary-600' },
    { id: '6', icon: Heart, color: 'bg-rose-100 text-rose-600' },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{t('landing.howItWorks')}</h2>
          <p className="text-lg text-slate-600">A simple, guided process to understand your skin better.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
          {steps.map((step) => (
            <Card key={step.id} className="relative border-none shadow-soft hover:shadow-card transition-shadow">
              <CardContent className="pt-8 flex flex-col items-center text-center">
                <div className={`h-16 w-16 rounded-2xl flex items-center justify-center mb-6 ${step.color}`}>
                  <step.icon className="h-8 w-8" />
                </div>
                <div className="absolute -top-4 -left-4 h-10 w-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-lg border-4 border-white shadow-sm">
                  {step.id}
                </div>
                <h3 className="text-xl font-semibold mb-2">{t(`landing.steps.${step.id}.title`)}</h3>
                <p className="text-slate-600">{t(`landing.steps.${step.id}.desc`)}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
