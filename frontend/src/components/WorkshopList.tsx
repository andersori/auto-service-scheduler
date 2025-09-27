import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Language } from '../types/i18n';
import { getTranslations } from '../i18n';
import { useLanguage } from '../hooks/useLanguage';
import './WorkshopList.css';
import { BrazilFlag, USFlag } from './Flag';
import { WorkshopService, Workshop } from '../services/workshopService';

export const WorkshopList: React.FC = () => {
  const { language, changeLanguage } = useLanguage();
  const t = getTranslations(language);
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleLanguageChange = (newLanguage: Language) => {
    changeLanguage(newLanguage);
  };

  const fetchWorkshops = useCallback(async () => {
    setIsLoading(true);
    try {
      const workshopsData = await WorkshopService.getAllWorkshops(language);
      setWorkshops(workshopsData);
    } catch (error) {
      console.error('Failed to fetch workshops:', error);
      // Fall back to default workshops if backend is not available
      setWorkshops(WorkshopService.getDefaultWorkshops(language));
    } finally {
      setIsLoading(false);
    }
  }, [language]);

  useEffect(() => {
    fetchWorkshops();
  }, [fetchWorkshops]);

  return (
    <div className="app-container">
      <div className="language-selector">
        <button
          className={`lang-btn ${language === 'pt-BR' ? 'active' : ''}`}
          onClick={() => handleLanguageChange('pt-BR')}
          title="Português (Brasil)"
        >
          <BrazilFlag size={18} />&nbsp;BR
        </button>
        <button
          className={`lang-btn ${language === 'en-US' ? 'active' : ''}`}
          onClick={() => handleLanguageChange('en-US')}
          title="English (United States)"
        >
          <USFlag size={18} />&nbsp;US
        </button>
      </div>

      <div className="page-header">
        <h1>{t['workshop.list.title']}</h1>
        <p>{t['workshop.list.subtitle']}</p>
      </div>

      <div className="workshops-grid">
        {isLoading ? (
          <div className="loading-message">
            {language === 'pt-BR' ? 'Carregando oficinas...' : 'Loading workshops...'}
          </div>
        ) : (
          workshops.map((workshop) => (
            <div key={workshop.id} className="workshop-card card">
              <div className="workshop-header">
                <h2 className="workshop-name">{workshop.name}</h2>
                <div className="workshop-rating">
                  <span className="stars">★★★★★</span>
                  <span className="rating-text">{workshop.rating}</span>
                </div>
              </div>

            <div className="workshop-info">
              <div className="info-item">
                <span className="info-icon">📍</span>
                <span className="info-text">{workshop.address}</span>
              </div>
              
              <div className="info-item">
                <span className="info-icon">📞</span>
                <span className="info-text">{workshop.phone}</span>
              </div>
              
              <div className="info-item">
                <span className="info-icon">🕒</span>
                <span className="info-text">{workshop.hours}</span>
              </div>
            </div>

            <div className="workshop-description">
              <p>{workshop.description}</p>
            </div>

            <div className="workshop-services">
              <h4>{t['workshop.services']}</h4>
              <div className="services-tags">
                {workshop.services.map((service, index) => (
                  <span key={index} className="service-tag">
                    {service}
                  </span>
                ))}
              </div>
            </div>

            <div className="workshop-actions">
              <Link 
                to={`/${workshop.id}`} 
                className="btn btn-primary"
              >
                {t['workshop.schedule']}
              </Link>
            </div>
          </div>
        )))}
      </div>
    </div>
  );
};