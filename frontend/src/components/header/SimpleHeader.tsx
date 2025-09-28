import React from 'react';
import LanguageSelector from './LanguageSelector';
import { Language } from '../../types/i18n';
import './SimpleHeader.css';

export interface HeaderButton {
  label: string;
  link?: string;
  onClick?: () => void;
}

interface SimpleHeaderProps {
  language: Language;
  changeLanguage: (lang: Language) => void;
  handleLanguageChange?: (lang: Language) => void;
  buttons?: HeaderButton[];
}

const SimpleHeader: React.FC<SimpleHeaderProps> = ({
  language,
  changeLanguage,
  handleLanguageChange,
  buttons = []
}) => {
  return (
    <header className="simple-header">
      <div className="simple-header-container">
        {buttons.length > 0 && (
          <nav className="header-btns">
            {buttons.map((btn, idx) =>
              btn.link ? (
                <a
                  key={btn.label + idx}
                  href={btn.link}
                  className="header-btn"
                  onClick={btn.onClick}
                >
                  {btn.label}
                </a>
              ) : (
                <button
                  key={btn.label + idx}
                  className="header-btn"
                  onClick={btn.onClick}
                >
                  {btn.label}
                </button>
              )
            )}
          </nav>
        )}
        <LanguageSelector 
          language={language} 
          changeLanguage={changeLanguage} 
          onChange={handleLanguageChange}
        />
      </div>
    </header>
  );
};

export default SimpleHeader;