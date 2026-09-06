import React from 'react';
import { useTranslation } from 'react-i18next';

export const FamilyAccountSection: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-8">{t('landing.familyAccount')}</h2>
        <p className="text-slate-600">Easily manage profiles for your whole family under one account.</p>
      </div>
    </section>
  );
};
