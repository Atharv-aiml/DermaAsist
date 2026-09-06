import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';

export const Footer: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <footer className="bg-slate-900 text-slate-300 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-1">
            <div className="mb-4 text-white">
              <Logo />
            </div>
            <p className="text-sm text-slate-400">
              AI-powered skin assessment and personalized care assistance, designed for Indian users.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/assessment/new" className="hover:text-white transition-colors">{t('nav.newCheck')}</Link></li>
              <li><Link to="/history" className="hover:text-white transition-colors">{t('nav.history')}</Link></li>
              <li><Link to="/family" className="hover:text-white transition-colors">{t('nav.family')}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/support" className="hover:text-white transition-colors">{t('support.faq')}</Link></li>
              <li><Link to="/support" className="hover:text-white transition-colors">{t('support.contactSupport')}</Link></li>
              <li><Link to="/support" className="hover:text-white transition-colors">{t('support.privacyQuestions')}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-800 pt-8 text-sm flex flex-col md:flex-row items-center justify-between">
          <p>© {new Date().getFullYear()} DermaAsist. All rights reserved.</p>
          <p className="text-slate-500 mt-2 md:mt-0 max-w-lg text-center md:text-right text-xs">
            {t('medical.disclaimer')}
          </p>
        </div>
      </div>
    </footer>
  );
};
