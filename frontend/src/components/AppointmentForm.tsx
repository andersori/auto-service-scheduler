import React, { useState } from 'react';
import { AppointmentService } from '../services/appointmentService';
import { FormData, AvailableTimeSlot } from '../types/appointment';
import { Language } from '../types/i18n';
import { getTranslations, detectLanguage } from '../i18n';
import './AppointmentForm.css';

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: 30 }, (_, i) => CURRENT_YEAR - i);

export const AppointmentForm: React.FC = () => {
  const [language, setLanguage] = useState<Language>(detectLanguage());
  const t = getTranslations(language);

  const SERVICE_TYPES = [
    { value: t['service.oilChange'], label: t['service.oilChange'] },
    { value: t['service.fullRevision'], label: t['service.fullRevision'] },
    { value: t['service.alignment'], label: t['service.alignment'] },
    { value: t['service.tireChange'], label: t['service.tireChange'] },
    { value: t['service.brakes'], label: t['service.brakes'] },
    { value: t['service.suspension'], label: t['service.suspension'] },
    { value: t['service.airConditioning'], label: t['service.airConditioning'] },
    { value: t['service.others'], label: t['service.others'] }
  ];

  const [formData, setFormData] = useState<FormData>({
    clientName: '',
    clientPhone: '',
    vehicleBrand: '',
    vehicleModel: '',
    vehicleYear: '',
    vehiclePlate: '',
    serviceType: '',
    appointmentDate: '',
    appointmentTime: ''
  });

  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
    setMessage(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear appointment time when date changes
    if (name === 'appointmentDate') {
      setFormData(prev => ({ ...prev, appointmentTime: '' }));
      fetchAvailableTimeSlots(value);
    }
  };

  const fetchAvailableTimeSlots = async (date: string) => {
    if (!date) return;
    
    setIsLoading(true);
    try {
      const slots: AvailableTimeSlot = await AppointmentService.getAvailableTimeSlots(date, language);
      setAvailableSlots(slots.timeSlots);
    } catch (error) {
      console.error('Error fetching time slots:', error);
      setAvailableSlots([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      const appointmentRequest = {
        clientName: formData.clientName,
        clientPhone: formData.clientPhone,
        vehicleBrand: formData.vehicleBrand,
        vehicleModel: formData.vehicleModel,
        vehicleYear: parseInt(formData.vehicleYear),
        vehiclePlate: formData.vehiclePlate,
        serviceType: formData.serviceType,
        appointmentDate: `${formData.appointmentDate}T${formData.appointmentTime}:00`
      };

      await AppointmentService.createAppointment(appointmentRequest, language);
      
      setMessage({ type: 'success', text: t['message.success'] });
      
      // Reset form
      setFormData({
        clientName: '',
        clientPhone: '',
        vehicleBrand: '',
        vehicleModel: '',
        vehicleYear: '',
        vehiclePlate: '',
        serviceType: '',
        appointmentDate: '',
        appointmentTime: ''
      });
      setAvailableSlots([]);
      
    } catch (error) {
      console.error('Error creating appointment:', error);
      setMessage({ type: 'error', text: t['message.error'] });
    } finally {
      setIsLoading(false);
    }
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  return (
    <div className="appointment-form-container">
      <div className="language-selector">
        <button 
          className={`lang-btn ${language === 'pt-BR' ? 'active' : ''}`}
          onClick={() => handleLanguageChange('pt-BR')}
        >
          🇧🇷 PT
        </button>
        <button 
          className={`lang-btn ${language === 'en-US' ? 'active' : ''}`}
          onClick={() => handleLanguageChange('en-US')}
        >
          🇺🇸 EN
        </button>
      </div>
      
      <h2>{t['form.title']}</h2>
      
      {message && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="appointment-form">
        <div className="form-section">
          <h3>{t['form.clientInfo']}</h3>
          <div className="form-group">
            <label htmlFor="clientName">{t['form.clientName']}</label>
            <input
              type="text"
              id="clientName"
              name="clientName"
              value={formData.clientName}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="clientPhone">{t['form.clientPhone']}</label>
            <input
              type="tel"
              id="clientPhone"
              name="clientPhone"
              value={formData.clientPhone}
              onChange={handleInputChange}
              placeholder={t['placeholder.phone']}
              required
            />
          </div>
        </div>

        <div className="form-section">
          <h3>{t['form.vehicleInfo']}</h3>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="vehicleBrand">{t['form.vehicleBrand']}</label>
              <input
                type="text"
                id="vehicleBrand"
                name="vehicleBrand"
                value={formData.vehicleBrand}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="vehicleModel">{t['form.vehicleModel']}</label>
              <input
                type="text"
                id="vehicleModel"
                name="vehicleModel"
                value={formData.vehicleModel}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="vehicleYear">{t['form.vehicleYear']}</label>
              <select
                id="vehicleYear"
                name="vehicleYear"
                value={formData.vehicleYear}
                onChange={handleInputChange}
                required
              >
                <option value="">{t['message.selectYear']}</option>
                {YEARS.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="vehiclePlate">{t['form.vehiclePlate']}</label>
              <input
                type="text"
                id="vehiclePlate"
                name="vehiclePlate"
                value={formData.vehiclePlate}
                onChange={handleInputChange}
                placeholder={t['placeholder.licensePlate']}
                required
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>{t['form.serviceScheduling']}</h3>
          <div className="form-group">
            <label htmlFor="serviceType">{t['form.serviceType']}</label>
            <select
              id="serviceType"
              name="serviceType"
              value={formData.serviceType}
              onChange={handleInputChange}
              required
            >
              <option value="">{t['message.selectService']}</option>
              {SERVICE_TYPES.map(service => (
                <option key={service.value} value={service.value}>{service.label}</option>
              ))}
            </select>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="appointmentDate">{t['form.appointmentDate']}</label>
              <input
                type="date"
                id="appointmentDate"
                name="appointmentDate"
                value={formData.appointmentDate}
                onChange={handleInputChange}
                min={getTomorrowDate()}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="appointmentTime">{t['form.appointmentTime']}</label>
              <select
                id="appointmentTime"
                name="appointmentTime"
                value={formData.appointmentTime}
                onChange={handleInputChange}
                required
                disabled={!formData.appointmentDate || isLoading}
              >
                <option value="">
                  {isLoading ? t['message.loading'] : t['message.selectTime']}
                </option>
                {availableSlots.map(time => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <button 
          type="submit" 
          className="submit-button"
          disabled={isLoading}
        >
          {isLoading ? t['form.processing'] : t['form.submit']}
        </button>
      </form>
    </div>
  );
};