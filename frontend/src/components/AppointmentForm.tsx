import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select';
import { AppointmentService } from '../services/appointmentService';
import { ServiceTypeService } from '../services/serviceTypeService';
import { VehicleCatalogService } from '../services/vehicleCatalogService';
import { FormData, AvailableTimeSlot, ServiceType } from '../types/appointment';
import { VehicleCatalog } from '../types/vehicle';
import { Language } from '../types/i18n';
import { getTranslations } from '../i18n';
import { useLanguage } from '../hooks/useLanguage';
import { formatPhone, isValidPhone } from '../utils/validation';
import './AppointmentForm.css';
import { BrazilFlag, USFlag } from './Flag';

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: 30 }, (_, i) => CURRENT_YEAR - i);

export const AppointmentForm: React.FC = () => {
  const navigate = useNavigate();
  const { workshop } = useParams<{ workshop: string }>();

  const { language, changeLanguage } = useLanguage();
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
    changeLanguage(newLanguage);
    // Validar e ajustar telefone ao trocar idioma
    setFormData(prev => {
      const valid = isValidPhone(prev.clientPhone, newLanguage);
      return {
        ...prev,
        clientPhone: valid ? formatPhone(prev.clientPhone, newLanguage) : ''
      };
    });
  };

  const fetchServiceTypes = useCallback(async () => {
    if (!workshop) return;
    setIsLoadingServiceTypes(true);
    try {
      const types = await ServiceTypeService.getActiveServiceTypes(workshop);
      setServiceTypes(types);
    } catch (error) {
      console.error(t['console.error.fetchServiceTypes'], error);
      setServiceTypes(ServiceTypeService.getDefaultServiceTypes());
    } finally {
      setIsLoadingServiceTypes(false);
    }
  }, [workshop, t]);

  const fetchVehicleCatalog = useCallback(async () => {
    if (!workshop) return;
    setIsLoadingVehicleCatalog(true);
    try {
      const catalogResponse = await VehicleCatalogService.getVehicleCatalog(workshop, language);
      setVehicleCatalog(catalogResponse.vehicleCatalog);
    } catch (error) {
      console.error(t['console.error.fetchVehicleCatalog'], error);
      setVehicleCatalog(VehicleCatalogService.getDefaultVehicleCatalog().vehicleCatalog);
    } finally {
      setIsLoadingVehicleCatalog(false);
    }
  }, [workshop, language, t]);

  const fetchAvailableTimeSlots = async (date: string) => {
    if (!date || !workshop) return;

    setIsLoading(true);
    try {
      const slots: AvailableTimeSlot = await AppointmentService.getAvailableTimeSlots(date, workshop, language);
      setAvailableSlots(slots.timeSlots);
    } catch (error) {
      console.error(t['console.error.fetchTimeSlots'], error);
      setAvailableSlots(AppointmentService.getDefaultAvailableTimeSlots(date).timeSlots);
    } finally {
      setIsLoading(false);
    }
  };

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!workshop) return;

    // Validation
    if (!formData.clientName || !formData.clientPhone || !formData.vehicleBrand ||
      !formData.vehicleModel || !formData.vehicleYear || formData.serviceTypes.length === 0 ||
      !formData.appointmentDate || !formData.appointmentTime) {
      alert(t['error.requiredFields']);
      return;
    }

    // Phone validation
    if (!isValidPhone(formData.clientPhone, language)) {
      alert(t['error.invalidPhone']);
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
            clientPhone: formData.clientPhone,
            appointmentDate: formData.appointmentDate,
            appointmentTime: formData.appointmentTime,
            serviceTypes: formData.serviceTypes
          }
        }
      });

    } catch (error) {
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

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const masked = formatPhone(raw, language);
    setFormData(prev => ({ ...prev, clientPhone: masked }));
  };

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
        <h1>{t['form.title']}</h1>
      </div>

      <div className="form-container">
        <form onSubmit={handleSubmit} className="form">
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
                onChange={handlePhoneChange}
                placeholder={t['placeholder.phone']}
                required
              />
            </div>
          </div>

          <div className="form-section">
            <h3>{t['form.vehicleInfo']}</h3>
            <div className="form-group">
              <label htmlFor="react-select-vehicleBrand-input">{t['form.vehicleBrand']}</label>
              <Select
                inputId="react-select-vehicleBrand-input"
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
                <label htmlFor="react-select-vehicleModel-input">{t['form.vehicleModel']}</label>
                <Select
                  inputId="react-select-vehicleModel-input"
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
                <label htmlFor="react-select-vehicleYear-input">{t['form.vehicleYear']}</label>
                <Select
                  inputId="react-select-vehicleYear-input"
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
              <label htmlFor="react-select-serviceType-input">{t['form.serviceType']}</label>
              <Select
                inputId="react-select-serviceType-input"
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
                min={getTomorrowDate()}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="react-select-appointmentTime-input">{t['form.appointmentTime']}</label>
              <Select
                inputId="react-select-appointmentTime-input"
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
    </div>
  );
};