import React from 'react';
import { useTranslation } from 'react-i18next';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export const FAQSection: React.FC = () => {
  const { t } = useTranslation();
  
  // Use a fallback array if the translation is not ready or complex to type
  const faqs = t('landing.faqs', { returnObjects: true }) as Array<{q: string, a: string}>;

  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-3xl font-bold text-center mb-12">{t('landing.faq')}</h2>
        <Accordion type="single" collapsible className="w-full bg-white rounded-xl shadow-soft p-6">
          {Array.isArray(faqs) && faqs.map((faq, idx) => (
            <AccordionItem key={idx} value={`item-${idx}`}>
              <AccordionTrigger className="text-left font-medium">{faq.q}</AccordionTrigger>
              <AccordionContent className="text-slate-600">{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
