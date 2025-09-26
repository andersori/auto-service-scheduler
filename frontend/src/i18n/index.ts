import { Language, Translations } from '../types/i18n';
import { ptBR } from './pt-BR';
import { enUS } from './en-US';

const translations: Record<Language, Translations> = {
  'pt-BR': ptBR,
  'en-US': enUS
};

export const getTranslations = (language: Language): Translations => {
  return translations[language] || translations['pt-BR'];
};

export const detectLanguage = (): Language => {
  const browserLang = navigator.language || navigator.languages?.[0];
  
  if (browserLang?.startsWith('en')) {
    return 'en-US';
  }
  
  return 'pt-BR'; // Default to Portuguese
};