import React from 'react';
import { Language } from '../../types/i18n';
import { BrazilFlag, USFlag } from './Flag';
import './LanguageSelector.css';

interface LanguageSelectorProps {
  language: Language;
  changeLanguage: (lang: Language) => void;
  onChange?: (lang: Language) => void;
}


const LanguageSelector: React.FC<LanguageSelectorProps> = ({ language, changeLanguage, onChange }) => {
  const handleLanguageClick = (lang: Language) => {
    if (language !== lang) {
      changeLanguage(lang);
      if (onChange) onChange(lang);
    }
  };
  return (
    <div className="language-selector-tabs">
      <div
        className={`language-tab ${language === 'pt-BR' ? 'active' : ''}`}
        onClick={() => handleLanguageClick('pt-BR')}
      >
        <BrazilFlag size={16} />
        {language === 'pt-BR' && <span>BR</span>}
      </div>
      <div
        className={`language-tab ${language === 'en-US' ? 'active' : ''}`}
        onClick={() => handleLanguageClick('en-US')}
      >
        <USFlag size={16} />
        {language === 'en-US' && <span>US</span>}
      </div>
    </div>
  );
};

export default LanguageSelector;
