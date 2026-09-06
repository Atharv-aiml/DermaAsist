import React from 'react';
import { useTranslation } from 'react-i18next';
import { AlertTriangle } from 'lucide-react';

export const DisclaimerSection: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section className="py-12 bg-warning-50 border-t border-warning-100">
      <div className="container mx-auto px-4 text-center">
        <div className="inline-flex items-center justify-center p-3 bg-warning-100 rounded-full mb-4">
          <AlertTriangle className="h-8 w-8 text-warning-600" />
        </div>
        <h2 className="text-2xl font-bold mb-4 text-warning-900">{t('landing.disclaimer')}</h2>
        <p className="text-warning-800 max-w-4xl mx-auto font-medium">
          {t('medical.disclaimer')}
        </p>
      </div>
    </section>
  );
};
