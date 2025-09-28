import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { getTranslations } from '../i18n';
import { useLanguage } from '../hooks/useLanguage';
import './WorkshopList.css';
import { BrazilFlag, USFlag } from './header/Flag';
import { WorkshopService, Workshop } from '../services/workshopService';
import MainTitle from './header/MainTitle';
import Header from './header/Header';

export const WorkshopList: React.FC = () => {
  const { language, changeLanguage } = useLanguage();
  const t = getTranslations(language);
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchWorkshops = useCallback(async () => {
    setIsLoading(true);
    try {
      const workshopsData = await WorkshopService.getAllWorkshops(language);
      setWorkshops(workshopsData);
    } catch (error) {
      console.error(t['console.error.fetchWorkshops'], error);
      // Fall back to default workshops if backend is not available
      setWorkshops(WorkshopService.getDefaultWorkshops(language));
    } finally {
      setIsLoading(false);
    }
  }, [language, t]);

  useEffect(() => {
    fetchWorkshops();
  }, [fetchWorkshops]);

  return (
    <div className="app">
      <Header language={language} changeLanguage={changeLanguage} />

      <div className="app-container">
        <MainTitle
          title={t['workshop.invite.title']}
          subtitle={t['workshop.invite.subtitle']}
          showActions={true}
          actionText={t['workshop.invite.register']}
          actionLink='/dashboard'
        />

        <div className="page-header">
          <h1>{t['workshop.list.registeredTitle']}</h1>
          <p>{t['workshop.list.registeredSubtitle']}</p>
        </div>

        <div className="workshops-grid">
          {isLoading ? (
            <div className="loading-message">
              {t['loading.workshops']}
            </div>
          ) : (
            workshops.map((workshop) => (
              <div key={workshop.id} className="workshop-card card">
                <div className="workshop-header">
                  <h2 className="workshop-name">{workshop.name}</h2>
                  <div className="workshop-meta">
                    <div className="workshop-registration-language">
                      {workshop.registrationLanguage === 'pt-BR' ? (
                        <BrazilFlag size={16} />
                      ) : (
                        <USFlag size={16} />
                      )}
                      <span className="registration-lang-text">
                        {workshop.registrationLanguage === 'pt-BR' ? 'PT' : 'EN'}
                      </span>
                    </div>
                    <div className="workshop-rating">
                      <span className="stars">★★★★★</span>
                      <span className="rating-text">{workshop.rating}</span>
                    </div>
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
    </div>
  );
};