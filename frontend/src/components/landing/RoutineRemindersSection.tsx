import React from 'react';
import { useTranslation } from 'react-i18next';

export const RoutineRemindersSection: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-8">{t('landing.routineReminders')}</h2>
        <p className="text-slate-600">Never miss your skin care routine or medication.</p>
      </div>
    </section>
  );
};
