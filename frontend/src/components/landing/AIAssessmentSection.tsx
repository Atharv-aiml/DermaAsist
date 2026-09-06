import React from 'react';
import { useTranslation } from 'react-i18next';

export const AIAssessmentSection: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section className="py-24 bg-slate-50 border-t border-slate-200">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-8">{t('landing.aiAssessment')}</h2>
        <div className="max-w-4xl mx-auto h-64 bg-slate-200 rounded-xl flex items-center justify-center">
          <span className="text-slate-500 font-medium">AI Analysis Flow Visualization</span>
        </div>
      </div>
    </section>
  );
};
