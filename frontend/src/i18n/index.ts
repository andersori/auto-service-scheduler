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
  // Verifica se há linguagem salva no localStorage
  const savedLanguage = localStorage.getItem('app-language') as Language;
  if (savedLanguage && (savedLanguage === 'pt-BR' || savedLanguage === 'en-US')) {
    return savedLanguage;
  }

  // Detecta linguagem do navegador
  const browserLanguages = navigator.languages || [navigator.language];
    
  for (const lang of browserLanguages) {
    // Verifica português (Brasil, Portugal, etc.)
    if (lang.startsWith('pt')) {
      console.log('✅ Português detectado, usando pt-BR');
      localStorage.setItem('app-language', 'pt-BR');
      return 'pt-BR';
    }
    // Verifica inglês (US, UK, etc.)
    if (lang.startsWith('en')) {
      console.log('✅ Inglês detectado, usando en-US');
      localStorage.setItem('app-language', 'en-US');
      return 'en-US';
    }
  }
  
  // Default para português brasileiro
  console.log('🇧🇷 Usando idioma padrão: pt-BR');
  localStorage.setItem('app-language', 'pt-BR');
  return 'pt-BR';
};

export const setLanguage = (language: Language): void => {
  localStorage.setItem('app-language', language);
};

export const getBrowserLanguages = (): readonly string[] => {
  return navigator.languages || [navigator.language];
};