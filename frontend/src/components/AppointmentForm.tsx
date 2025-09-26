import React, { useState } from 'react';
import { AppointmentService } from '../services/appointmentService';
import { FormData, AvailableTimeSlot } from '../types/appointment';
import './AppointmentForm.css';

const SERVICE_TYPES = [
  'Troca de óleo',
  'Revisão completa',
  'Alinhamento e balanceamento',
  'Troca de pneus',
  'Freios',
  'Suspensão',
  'Ar condicionado',
  'Outros'
];

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: 30 }, (_, i) => CURRENT_YEAR - i);

export const AppointmentForm: React.FC = () => {
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
      const slots: AvailableTimeSlot = await AppointmentService.getAvailableTimeSlots(date);
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

      await AppointmentService.createAppointment(appointmentRequest);
      
      setMessage({ type: 'success', text: 'Agendamento realizado com sucesso!' });
      
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
      setMessage({ type: 'error', text: 'Erro ao criar agendamento. Tente novamente.' });
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
      <h2>Agendamento de Serviços</h2>
      
      {message && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="appointment-form">
        <div className="form-section">
          <h3>Informações do Cliente</h3>
          <div className="form-group">
            <label htmlFor="clientName">Nome completo *</label>
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
            <label htmlFor="clientPhone">Telefone *</label>
            <input
              type="tel"
              id="clientPhone"
              name="clientPhone"
              value={formData.clientPhone}
              onChange={handleInputChange}
              placeholder="(11) 99999-9999"
              required
            />
          </div>
        </div>

        <div className="form-section">
          <h3>Informações do Veículo</h3>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="vehicleBrand">Marca *</label>
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
              <label htmlFor="vehicleModel">Modelo *</label>
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
              <label htmlFor="vehicleYear">Ano *</label>
              <select
                id="vehicleYear"
                name="vehicleYear"
                value={formData.vehicleYear}
                onChange={handleInputChange}
                required
              >
                <option value="">Selecione o ano</option>
                {YEARS.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="vehiclePlate">Placa *</label>
              <input
                type="text"
                id="vehiclePlate"
                name="vehiclePlate"
                value={formData.vehiclePlate}
                onChange={handleInputChange}
                placeholder="ABC-1234"
                required
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Serviço e Agendamento</h3>
          <div className="form-group">
            <label htmlFor="serviceType">Tipo de serviço *</label>
            <select
              id="serviceType"
              name="serviceType"
              value={formData.serviceType}
              onChange={handleInputChange}
              required
            >
              <option value="">Selecione o serviço</option>
              {SERVICE_TYPES.map(service => (
                <option key={service} value={service}>{service}</option>
              ))}
            </select>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="appointmentDate">Data *</label>
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
              <label htmlFor="appointmentTime">Horário *</label>
              <select
                id="appointmentTime"
                name="appointmentTime"
                value={formData.appointmentTime}
                onChange={handleInputChange}
                required
                disabled={!formData.appointmentDate || isLoading}
              >
                <option value="">
                  {isLoading ? 'Carregando...' : 'Selecione o horário'}
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
          {isLoading ? 'Processando...' : 'Agendar Serviço'}
        </button>
      </form>
    </div>
  );
};