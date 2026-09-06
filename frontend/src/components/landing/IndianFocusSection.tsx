import React from 'react';
import { useTranslation } from 'react-i18next';

export const IndianFocusSection: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-8">{t('landing.indianFocus')}</h2>
        <p className="text-slate-600">Built keeping diverse Indian skin tones and local environmental factors in mind.</p>
      </div>
    </section>
  );
};
