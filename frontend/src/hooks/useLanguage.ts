import { useState, useEffect } from 'react';
import { Language } from '../types/i18n';
import { detectLanguage, setLanguage as saveLanguage } from '../i18n';

export const useLanguage = () => {
  const [language, setLanguage] = useState<Language>(detectLanguage());

  const changeLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
    saveLanguage(newLanguage);
    
    // Atualiza o atributo lang do HTML
    document.documentElement.lang = newLanguage === 'pt-BR' ? 'pt-BR' : 'en-US';
  };

  useEffect(() => {
    // Configura a linguagem inicial no HTML
    document.documentElement.lang = language === 'pt-BR' ? 'pt-BR' : 'en-US';
  }, [language]);

  return {
    language,
    changeLanguage
  };
};