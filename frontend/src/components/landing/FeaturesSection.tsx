import React from 'react';
import { useTranslation } from 'react-i18next';

export const FeaturesSection: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-12">{t('landing.keyFeatures')}</h2>
        <p className="text-slate-600 max-w-2xl mx-auto">Explore all the powerful tools built into DermaAsist to help you manage your skin health.</p>
      </div>
    </section>
  );
};
