import React, { useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import html2canvas from 'html2canvas';
import { Language } from '../types/i18n';
import { getTranslations, detectLanguage } from '../i18n';
import './AppointmentSuccess.css';
import { BrazilFlag, USFlag } from './header/Flag';

interface LocationState {
  language: Language;
  appointmentData: {
    clientName: string;
    clientPhone: string;
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
      const canvas = await html2canvas(receiptRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
        useCORS: true,
        allowTaint: false,
        width: receiptRef.current.scrollWidth,
        height: receiptRef.current.scrollHeight,
        ignoreElements: (element) => element.classList?.contains('no-print'),
      });

      // Criar link para download
      const link = document.createElement('a');
      link.download = `comprovante-agendamento-${appointmentData?.clientName || 'agendamento'}-${new Date().toISOString().split('T')[0]}.png`;
      link.href = canvas.toDataURL('image/png', 1.0);

      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

    } catch (error) {
      alert(t['error.generateReceipt']);
    }
  };

  return (
    <div className="app">
      <div className="app-container">
        <div className="language-info">
          {language === 'pt-BR' ? (
            <><BrazilFlag size={18} />&nbsp;BR</>
          ) : (
            <><USFlag size={18} />&nbsp;US</>
          )}
        </div>

        <div className="content-container">
          <div className="appointment-success-container" ref={receiptRef}>
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
                  <span className="detail-label">{t['form.clientPhone']}:</span>
                  <span className="detail-value">{appointmentData.clientPhone}</span>
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

            <div className="action-buttons no-print">
              {appointmentData && (
                <button onClick={generateReceipt} className="btn btn-primary">
                  📄 {t['success.generateReceipt']}
                </button>
              )}
              <Link to="/" className="btn btn-secondary">
                {t['success.backToForm']}
              </Link>
            </div>

            <div className="generated-message">
              {`${t['success.generateReceiptDateMessage']}: ${new Date().toLocaleString(language)}`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};