import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select';
import { AppointmentService } from '../services/appointmentService';
import { ServiceTypeService } from '../services/serviceTypeService';
import { VehicleCatalogService } from '../services/vehicleCatalogService';
import { FormData, AvailableTimeSlot, ServiceType } from '../types/appointment';
import { VehicleCatalog } from '../types/vehicle';
import { Language } from '../types/i18n';
import { getTranslations, detectLanguage } from '../i18n';
import './AppointmentForm.css';

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: 30 }, (_, i) => CURRENT_YEAR - i);

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

export const AppointmentForm: React.FC = () => {
  const navigate = useNavigate();
  const { workshop } = useParams<{ workshop: string }>();
  
  const [language, setLanguage] = useState<Language>(detectLanguage());
  const t = getTranslations(language);
  const [modelOptions, setModelOptions] = useState<string[]>([]);

  const [vehicleCatalog, setVehicleCatalog] = useState<VehicleCatalog>({});
  const [isLoadingVehicleCatalog, setIsLoadingVehicleCatalog] = useState(false);

  const [serviceTypes, setServiceTypes] = useState<ServiceType[]>([]);
  const [isLoadingServiceTypes, setIsLoadingServiceTypes] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    clientName: '',
    clientPhone: '',
    vehicleBrand: '',
    vehicleModel: '',
    vehicleYear: '',
    serviceTypes: [],
    appointmentDate: '',
    appointmentTime: ''
  });

  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
  };

  const fetchServiceTypes = useCallback(async () => {
    if (!workshop) return;
    setIsLoadingServiceTypes(true);
    try {
      const types = await ServiceTypeService.getActiveServiceTypes(workshop);
      setServiceTypes(types);
    } catch (error) {
      console.error('Error fetching service types:', error);
      setServiceTypes([]);
    } finally {
      setIsLoadingServiceTypes(false);
    }
  }, [workshop]);

  const fetchVehicleCatalog = useCallback(async () => {
    if (!workshop) return;
    setIsLoadingVehicleCatalog(true);
    try {
      const catalog = await VehicleCatalogService.getVehicleCatalog(workshop, language);
      setVehicleCatalog(catalog);
    } catch (error) {
      console.error('Error fetching vehicle catalog:', error);
      // Fallback to hardcoded catalog if API fails
      setVehicleCatalog({
        Toyota: ["Corolla", "Hilux", "Yaris", "Etios", "SW4", "RAV4", "Camry"],
        Volkswagen: ["Gol", "Polo", "Virtus", "T-Cross", "Nivus", "Saveiro", "Jetta"],
        Ford: ["Ka", "Fiesta", "Focus", "EcoSport", "Ranger", "Fusion", "Edge"],
        Chevrolet: ["Onix", "Prisma", "S10", "Tracker", "Spin", "Cruze", "Cobalt"],
        Honda: ["Civic", "Fit", "HR-V", "City", "WR-V", "CR-V"],
        Hyundai: ["HB20", "Creta", "Tucson", "Santa Fe", "ix35"],
        Nissan: ["Kicks", "Versa", "March", "Sentra", "Frontier"]
      });
    } finally {
      setIsLoadingVehicleCatalog(false);
    }
  }, [workshop, language]);

  useEffect(() => {
    fetchServiceTypes();
    fetchVehicleCatalog();
  }, [fetchServiceTypes, fetchVehicleCatalog]);

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

  const handleBrandChange = (selected: { value: string; label: string } | null) => {
    const brand = selected ? selected.value : '';
    setFormData(prev => ({
      ...prev,
      vehicleBrand: brand,
      vehicleModel: ''
    }));
    setModelOptions(vehicleCatalog[brand] || []);
  };

  const fetchAvailableTimeSlots = async (date: string) => {
    if (!date || !workshop) return;

    setIsLoading(true);
    try {
      const slots: AvailableTimeSlot = await AppointmentService.getAvailableTimeSlots(date, workshop, language);
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
    if (!workshop) return;
    
    // Validation
    if (!formData.clientName || !formData.clientPhone || !formData.vehicleBrand || 
        !formData.vehicleModel || !formData.vehicleYear || formData.serviceTypes.length === 0 ||
        !formData.appointmentDate || !formData.appointmentTime) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    
    setIsLoading(true);

    try {
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
            appointmentDate: formData.appointmentDate,
            appointmentTime: formData.appointmentTime,
            serviceTypes: formData.serviceTypes
          }
        }
      });

    } catch (error) {
      console.error('Error creating appointment:', error);
      // Manter a mensagem de erro no formulário
      alert(t['message.error']);
    } finally {
      setIsLoading(false);
    }
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

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

  return (
    <div className="appointment-form-container">
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

      <h2>{t['form.title']}</h2>

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
          <div className="form-group">
            <label htmlFor="vehicleBrand">{t['form.vehicleBrand']}</label>
            <Select
              id="vehicleBrand"
              name="vehicleBrand"
              options={Object.keys(vehicleCatalog).map(brand => ({ value: brand, label: brand }))}
              value={formData.vehicleBrand ? { value: formData.vehicleBrand, label: formData.vehicleBrand } : null}
              onChange={handleBrandChange}
              placeholder={isLoadingVehicleCatalog ? t['message.loading'] : t['form.vehicleBrand']}
              isClearable
              isSearchable
              isLoading={isLoadingVehicleCatalog}
              classNamePrefix="react-select"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="vehicleModel">{t['form.vehicleModel']}</label>
              <Select
                id="vehicleModel"
                name="vehicleModel"
                options={modelOptions.map(model => ({ value: model, label: model }))}
                value={formData.vehicleModel ? { value: formData.vehicleModel, label: formData.vehicleModel } : null}
                onChange={(selected) => {
                  const model = selected ? selected.value : '';
                  setFormData(prev => ({ ...prev, vehicleModel: model }));
                }}
                placeholder={t['form.vehicleModel']}
                isClearable
                isSearchable
                isDisabled={!formData.vehicleBrand}
                classNamePrefix="react-select"
              />
            </div>
            <div className="form-group">
              <label htmlFor="vehicleYear">{t['form.vehicleYear']}</label>
              <Select
                id="vehicleYear"
                name="vehicleYear"
                options={YEARS.map(year => ({ value: year.toString(), label: year.toString() }))}
                value={formData.vehicleYear ? { value: formData.vehicleYear, label: formData.vehicleYear } : null}
                onChange={(selected) => {
                  const year = selected ? selected.value : '';
                  setFormData(prev => ({ ...prev, vehicleYear: year }));
                }}
                placeholder={t['message.selectYear']}
                isClearable
                isSearchable
                classNamePrefix="react-select"
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>{t['form.serviceScheduling']}</h3>
          <div className="form-group">
            <label htmlFor="serviceType">{t['form.serviceType']}</label>
            <Select
              id="serviceType"
              name="serviceType"
              options={serviceTypes.map(service => ({ value: service.name, label: service.name }))}
              value={formData.serviceTypes.map(type => ({ value: type, label: type }))}
              onChange={(selected) => {
                const types = selected ? (selected as any[]).map((item: any) => item.value) : [];
                setFormData(prev => ({ ...prev, serviceTypes: types }));
              }}
              placeholder={isLoadingServiceTypes ? t['message.loading'] : t['message.selectService']}
              isClearable
              isSearchable
              isMulti
              isDisabled={isLoadingServiceTypes}
              classNamePrefix="react-select"
            />
          </div>

          <div className="form-group">
            <label htmlFor="appointmentDate">{t['form.appointmentDate']}</label>
            <input
              type="date"
              id="appointmentDate"
              name="appointmentDate"
              value={formData.appointmentDate}
              onChange={handleInputChange}
              onClick={(e) => {
                const target = e.target as HTMLInputElement;
                target.showPicker();
              }}
              min={getTomorrowDate()}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="appointmentTime">{t['form.appointmentTime']}</label>
            <Select
              id="appointmentTime"
              name="appointmentTime"
              className="select-appointment-time"
              options={availableSlots.map(time => ({ value: time, label: time }))}
              value={formData.appointmentTime ? { value: formData.appointmentTime, label: formData.appointmentTime } : null}
              onChange={(selected) => {
                const time = selected ? selected.value : '';
                setFormData(prev => ({ ...prev, appointmentTime: time }));
              }}
              placeholder={isLoading ? t['message.loading'] : t['message.selectTime']}
              isClearable
              isSearchable
              isDisabled={!formData.appointmentDate || isLoading}
              classNamePrefix="react-select"
            />
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