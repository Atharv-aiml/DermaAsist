import React from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { Button } from '@/components/ui/button';

export const LanguageSelector: React.FC = () => {
  const { language, changeLanguage } = useLanguage();

  return (
    <div className="flex items-center bg-slate-100 rounded-lg p-1">
      <Button 
        variant={language === 'en' ? 'default' : 'ghost'} 
        size="sm" 
        className={`h-7 px-2 py-1 text-xs ${language === 'en' ? 'shadow-sm' : ''}`}
        onClick={() => changeLanguage('en')}
      >
        EN
      </Button>
      <Button 
        variant={language === 'hi' ? 'default' : 'ghost'} 
        size="sm" 
        className={`h-7 px-2 py-1 text-xs ${language === 'hi' ? 'shadow-sm' : ''}`}
        onClick={() => changeLanguage('hi')}
      >
        हिं
      </Button>
    </div>
  );
};
