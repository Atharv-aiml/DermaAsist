import { useTranslation } from 'react-i18next';

export const useLanguage = () => {
  const { i18n, t } = useTranslation();

  const currentLanguage = i18n.language;

  const changeLanguage = (lng: 'en' | 'hi') => {
    i18n.changeLanguage(lng);
  };

  const toggleLanguage = () => {
    changeLanguage(currentLanguage === 'en' ? 'hi' : 'en');
  };

  return {
    language: currentLanguage,
    changeLanguage,
    toggleLanguage,
    t
  };
};
