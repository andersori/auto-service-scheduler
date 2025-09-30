import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppointmentService } from '../services/appointmentService';
import { FormData } from '../types/appointment';
import { useLanguage } from '../hooks/useLanguage';
import { getTranslations } from '../i18n';
import AppointmentFormBase from './AppointmentFormBase';
import Header from './header/Header';
import './AppointmentForm.css';

export const AppointmentForm: React.FC = () => {
  const navigate = useNavigate();
  const { workshop } = useParams<{ workshop: string }>();
  const { language, changeLanguage } = useLanguage();
  const t = getTranslations(language);

  // Redirecionar para home se não há workshop na URL
  useEffect(() => {
    if (!workshop) {
      navigate('/');
    }
  }, [workshop, navigate]);

  // Se não há workshop, não renderizar o componente
  if (!workshop) {
    return null;
  }

  // Handle submit
  const handleSubmit = async (formData: FormData) => {
    const appointmentRequest = {
      clientName: formData.clientName,
      clientPhone: formData.clientPhone,
      vehicleBrand: formData.vehicleBrand,
      vehicleModel: formData.vehicleModel,
      vehicleYear: parseInt(formData.vehicleYear),
      serviceTypes: formData.serviceTypes,
      appointmentDate: `${formData.appointmentDate}T${formData.appointmentTime}:00`
    };
    await AppointmentService.createAppointment(appointmentRequest, workshop, language);
    // Redirecionar para página de sucesso com dados do agendamento
    const successPath = `/${workshop}/success`;
    navigate(successPath, {
      state: {
        language,
        appointmentData: {
          clientName: formData.clientName,
          clientPhone: formData.clientPhone,
          appointmentDate: formData.appointmentDate,
          appointmentTime: formData.appointmentTime,
          serviceTypes: formData.serviceTypes
        }
      }
    });
  };

  return (
    <div className="app">
      <Header
        language={language}
        changeLanguage={changeLanguage}
        handleLanguageChange={() => { }}
      />
      <div className="app-container">
        <div className="page-header">
          <h1>{t['form.title']}</h1>
        </div>
        <div className="form-container">
          <AppointmentFormBase
            workshop={workshop}
            language={language}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};