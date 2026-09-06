import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, ShieldCheck, HeartPulse } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary-50 to-white pt-20 pb-32">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 text-center lg:text-left z-10">
            <div className="inline-flex items-center rounded-full border border-primary-200 bg-primary-100/50 px-3 py-1 text-sm font-medium text-primary-800 mb-6">
              <Sparkles className="mr-2 h-4 w-4" />
              AI-Powered Dermatology Assistant
            </div>
            
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
              {t('landing.heroTitle')}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-600">
                {t('landing.heroSubtitle')}
              </span>
            </h1>
            
            <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto lg:mx-0">
              {t('landing.heroDescription')}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link to="/assessment/new">
                <Button size="xl" className="w-full sm:w-auto font-semibold">
                  {t('landing.startSkinCheck')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="#how-it-works">
                <Button size="xl" variant="outline" className="w-full sm:w-auto bg-white">
                  {t('landing.howItWorks')}
                </Button>
              </Link>
            </div>
            
            <div className="mt-10 flex items-center justify-center lg:justify-start gap-6 text-sm text-slate-500 font-medium">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-success-500" />
                <span>Privacy First</span>
              </div>
              <div className="flex items-center gap-2">
                <HeartPulse className="h-5 w-5 text-danger-500" />
                <span>Family Care</span>
              </div>
            </div>
          </div>
          
          <div className="flex-1 relative w-full max-w-lg lg:max-w-none">
            {/* Abstract illustration of the flow */}
            <div className="relative w-full aspect-square md:aspect-[4/3] lg:aspect-square">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary-100 to-accent-100 rounded-[2.5rem] transform rotate-3 scale-105 shadow-xl opacity-50 blur-xl"></div>
              <div className="absolute inset-0 bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden flex flex-col p-6 items-center justify-center">
                 <div className="relative w-full h-full border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center gap-4 bg-slate-50">
                    <div className="h-20 w-20 bg-primary-100 rounded-full flex items-center justify-center shadow-inner">
                      <Sparkles className="h-10 w-10 text-primary-600" />
                    </div>
                    <div className="h-4 w-3/4 bg-slate-200 rounded-full animate-pulse"></div>
                    <div className="h-4 w-1/2 bg-slate-200 rounded-full animate-pulse delay-75"></div>
                    
                    {/* Mock UI Cards floating */}
                    <div className="absolute -left-6 top-12 h-16 w-40 bg-white shadow-lg rounded-xl border border-slate-100 flex items-center p-3 gap-3 transform -rotate-6">
                      <div className="h-10 w-10 rounded-full bg-accent-100 flex items-center justify-center"><HeartPulse className="h-5 w-5 text-accent-600"/></div>
                      <div className="flex-1 space-y-2"><div className="h-2 w-full bg-slate-200 rounded"></div><div className="h-2 w-2/3 bg-slate-200 rounded"></div></div>
                    </div>
                    
                    <div className="absolute -right-6 bottom-12 h-16 w-40 bg-white shadow-lg rounded-xl border border-slate-100 flex items-center p-3 gap-3 transform rotate-6">
                       <div className="h-10 w-10 rounded-full bg-success-100 flex items-center justify-center"><ShieldCheck className="h-5 w-5 text-success-600"/></div>
                       <div className="flex-1 space-y-2"><div className="h-2 w-full bg-slate-200 rounded"></div><div className="h-2 w-2/3 bg-slate-200 rounded"></div></div>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
