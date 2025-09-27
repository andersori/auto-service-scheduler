import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Language } from '../types/i18n';
import { getTranslations, detectLanguage } from '../i18n';
import './AppointmentSuccess.css';

const BrazilFlag: React.FC<{ size?: number }> = ({ size = 20 }) => (
  <svg width={size} height={size * 0.7} viewBox="0 0 60 42" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
    <rect width="60" height="42" fill="#009639" />
    <polygon points="30,6 54,21 30,36 6,21" fill="#FEDF00" />
    <circle cx="30" cy="21" r="7" fill="#002776" />
    <path d="M25,18 Q30,15 35,18 Q30,24 25,18" fill="#FEDF00" />
  </svg>
);

const USFlag: React.FC<{ size?: number }> = ({ size = 20 }) => (
  <svg width={size} height={size * 0.7} viewBox="0 0 60 42" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
    <rect width="60" height="42" fill="#B22234" />
    <rect y="0" width="60" height="3.23" fill="#FFFFFF" />
    <rect y="6.46" width="60" height="3.23" fill="#FFFFFF" />
    <rect y="12.92" width="60" height="3.23" fill="#FFFFFF" />
    <rect y="19.38" width="60" height="3.23" fill="#FFFFFF" />
    <rect y="25.84" width="60" height="3.23" fill="#FFFFFF" />
    <rect y="32.3" width="60" height="3.23" fill="#FFFFFF" />
    <rect y="38.76" width="60" height="3.23" fill="#FFFFFF" />
    <rect width="24" height="21" fill="#3C3B6E" />
  </svg>
);

interface LocationState {
  language: Language;
  appointmentData: {
    clientName: string;
    appointmentDate: string;
    appointmentTime: string;
    serviceTypes: string[];
  };
}

export const AppointmentSuccess: React.FC = () => {
  const location = useLocation();
  const state = location.state as LocationState;
  const language = state?.language || detectLanguage();
  const appointmentData = state?.appointmentData;
  
  const t = getTranslations(language);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return language === 'pt-BR' 
      ? date.toLocaleDateString('pt-BR')
      : date.toLocaleDateString('en-US');
  };

  return (
    <div className="appointment-success-container">
      <div className="language-info">
        {language === 'pt-BR' ? (
          <><BrazilFlag size={18} />&nbsp;BR</>
        ) : (
          <><USFlag size={18} />&nbsp;US</>
        )}
      </div>

      <div className="success-content">
        <div className="success-icon">
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="#4CAF50" strokeWidth="2"/>
            <path d="m9 12 2 2 4-4" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <h1 className="success-title">{t['message.success']}</h1>
        
        {appointmentData && (
          <div className="appointment-details">
            <h3>{t['success.appointmentDetails']}</h3>
            <div className="detail-row">
              <span className="detail-label">{t['form.clientName']}:</span>
              <span className="detail-value">{appointmentData.clientName}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">{t['form.serviceType']}:</span>
              <span className="detail-value">{appointmentData.serviceTypes.join(', ')}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">{t['form.appointmentDate']}:</span>
              <span className="detail-value">{formatDate(appointmentData.appointmentDate)}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">{t['form.appointmentTime']}:</span>
              <span className="detail-value">{appointmentData.appointmentTime}</span>
            </div>
          </div>
        )}

        <p className="success-message">
          {t['success.message']}
        </p>

        <div className="action-buttons">
          <Link to="/" className="btn btn-primary">
            {t['success.backToForm']}
          </Link>
        </div>
      </div>
    </div>
  );
};