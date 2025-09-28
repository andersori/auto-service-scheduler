import React from 'react';
import { Link } from 'react-router-dom';
import LanguageSelector from './LanguageSelector';
import { Language } from '../../types/i18n';
import './Header.css';
import { getTranslations } from '../../i18n';

export interface HeaderButton {
  label: string;
  link?: string;
  onClick?: () => void;
}

interface HeaderProps {
  language: Language;
  changeLanguage: (lang: Language) => void;
  handleLanguageChange?: (lang: Language) => void;
  buttons?: HeaderButton[];
}

const Header: React.FC<HeaderProps> = ({
  language,
  changeLanguage,
  handleLanguageChange,
  buttons = []
}) => {
  const t = getTranslations(language);

  return (
    <header className="header">
      <div className="header-container">
        {/* Left: project title */}
        <Link to="/" className="header-title header-title-link">{t['header.title']}</Link>
        {/* Right: buttons and language selector */}
        <div className="header-actions">
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
      </div>
    </header>
  );
};

export default Header;