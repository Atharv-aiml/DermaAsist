import React from 'react';
import { useTranslation } from 'react-i18next';

export const PrivacySection: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-8">{t('landing.privacy')}</h2>
        <p className="text-slate-600">Your health data is encrypted and kept private. We do not sell your personal information.</p>
      </div>
    </section>
  );
};
