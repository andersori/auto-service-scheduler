import React, { useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import html2canvas from 'html2canvas';
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
  const receiptRef = useRef<HTMLDivElement>(null);

  const t = getTranslations(language);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return language === 'pt-BR'
      ? date.toLocaleDateString('pt-BR')
      : date.toLocaleDateString('en-US');
  };

  const generateReceipt = async () => {
    if (!receiptRef.current) {
      console.error('Receipt container not found');
      return;
    }

    try {
      // Configurações para html2canvas
      const canvas = await html2canvas(receiptRef.current, {
        scale: 2, // Alta qualidade
        backgroundColor: '#ffffff',
        logging: false,
        useCORS: true,
        allowTaint: false,
        width: receiptRef.current.scrollWidth,
        height: receiptRef.current.scrollHeight,
      });

      // Criar link para download
      const link = document.createElement('a');
      link.download = `comprovante-agendamento-${appointmentData?.clientName || 'agendamento'}-${new Date().toISOString().split('T')[0]}.png`;
      link.href = canvas.toDataURL('image/png', 1.0);

      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      console.log('Comprovante gerado com sucesso!');
    } catch (error) {
      console.error('Erro ao gerar comprovante:', error);
      alert(language === 'pt-BR'
        ? 'Erro ao gerar comprovante. Tente novamente.'
        : 'Error generating receipt. Please try again.');
    }
  };

  return (
    <div className="app-container">
      <div className="language-info">
        {language === 'pt-BR' ? (
          <><BrazilFlag size={18} />&nbsp;BR</>
        ) : (
          <><USFlag size={18} />&nbsp;US</>
        )}
      </div>

      <div className="content-container">
        <div
          className="appointment-success-container"
          ref={receiptRef}
        >
          <div className="success-icon">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" stroke="#4CAF50" strokeWidth="2" />
              <path d="m9 12 2 2 4-4" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <div className="page-header">
            <h1>{t['message.success']}</h1>
          </div>

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
            {appointmentData && (
              <button onClick={generateReceipt} className="btn btn-secondary">
                📄 {t['success.generateReceipt']}
              </button>
            )}
          </div>

          <div className="generated-message">
            {`${t['success.generateReceipt']}: ${new Date().toLocaleString(language)}`}
          </div>
        </div>
      </div>
    </div>
  );
};