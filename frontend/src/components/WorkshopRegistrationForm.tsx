import React, { useState } from 'react';
import { getTranslations } from '../i18n';
import { useLanguage } from '../hooks/useLanguage';
import { formatPhone, isValidPhone } from '../utils/validation';
import './WorkshopRegistrationForm.css';

interface FormData {
  name: string;
  address: string;
  phone: string;
  description: string;
  hours: string;
  services: string[];
}

const availableServices = [
  'Troca de óleo',
  'Revisão completa',
  'Alinhamento e balanceamento',
  'Troca de pneus',
  'Freios',
  'Suspensão',
  'Ar condicionado',
  'Outros'
];

const availableServicesEN = [
  'Oil change',
  'Full revision',
  'Alignment and balancing',
  'Tire replacement',
  'Brakes',
  'Suspension',
  'Air conditioning',
  'Others'
];

const WorkshopRegistrationForm: React.FC = () => {
  const { language } = useLanguage();
  const t = getTranslations(language);
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    address: '',
    phone: '',
    description: '',
    hours: '',
    services: []
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const masked = formatPhone(raw, language);
    setFormData(prev => ({ ...prev, phone: masked }));
    
    // Clear phone error when user starts typing
    if (errors.phone) {
      setErrors(prev => ({ ...prev, phone: '' }));
    }
  };

  const handleServiceToggle = (service: string) => {
    setFormData(prev => {
      const services = prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service];
      
      return { ...prev, services };
    });

    // Clear services error when user selects a service
    if (errors.services) {
      setErrors(prev => ({ ...prev, services: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = t['error.requiredFields'];
    }

    if (!formData.address.trim()) {
      newErrors.address = t['error.requiredFields'];
    }

    if (!formData.phone.trim()) {
      newErrors.phone = t['error.requiredFields'];
    } else if (!isValidPhone(formData.phone, language)) {
      newErrors.phone = t['error.invalidPhone'];
    }

    if (!formData.description.trim()) {
      newErrors.description = t['error.requiredFields'];
    }

    if (!formData.hours.trim()) {
      newErrors.hours = t['error.requiredFields'];
    }

    if (formData.services.length === 0) {
      newErrors.services = t['workshop.form.error.noServices'];
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // For now, just show success - later implement actual workshop registration API
      const workshopData = {
        ...formData,
        services: formData.services,
        registrationLanguage: language
      };

      console.log('Workshop registration data:', workshopData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert(t['workshop.form.success']);
      
      // Reset form
      setFormData({
        name: '',
        address: '',
        phone: '',
        description: '',
        hours: '',
        services: []
      });
    } catch (error: any) {
      console.error('Workshop registration error:', error);
      alert(t['workshop.form.error']);
    } finally {
      setIsLoading(false);
    }
  };

  const serviceList = language === 'pt-BR' ? availableServices : availableServicesEN;

  return (
    <div className="workshop-registration-form">
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">{t['workshop.form.name']}</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder={t['workshop.form.placeholder.name']}
              required
              className={errors.name ? 'error' : ''}
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="phone">{t['workshop.form.phone']}</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handlePhoneChange}
              placeholder={t['user.placeholder.phone']}
              required
              className={errors.phone ? 'error' : ''}
            />
            {errors.phone && <span className="error-message">{errors.phone}</span>}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="address">{t['workshop.form.address']}</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder={t['workshop.form.placeholder.address']}
            required
            className={errors.address ? 'error' : ''}
          />
          {errors.address && <span className="error-message">{errors.address}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="description">{t['workshop.form.description']}</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder={t['workshop.form.placeholder.description']}
            required
            className={errors.description ? 'error' : ''}
            rows={4}
          />
          {errors.description && <span className="error-message">{errors.description}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="hours">{t['workshop.form.hours']}</label>
          <input
            type="text"
            id="hours"
            name="hours"
            value={formData.hours}
            onChange={handleInputChange}
            placeholder={t['workshop.form.placeholder.hours']}
            required
            className={errors.hours ? 'error' : ''}
          />
          {errors.hours && <span className="error-message">{errors.hours}</span>}
        </div>

        <div className="form-group">
          <label>{t['workshop.form.services']}</label>
          <div className="services-grid">
            {serviceList.map(service => (
              <label key={service} className="service-checkbox">
                <input
                  type="checkbox"
                  checked={formData.services.includes(service)}
                  onChange={() => handleServiceToggle(service)}
                />
                <span className="checkmark"></span>
                {service}
              </label>
            ))}
          </div>
          {errors.services && <span className="error-message">{errors.services}</span>}
        </div>

        <button 
          type="submit" 
          className="submit-btn" 
          disabled={isLoading}
        >
          {isLoading ? t['workshop.form.processing'] : t['workshop.form.submit']}
        </button>
      </form>
    </div>
  );
};

export default WorkshopRegistrationForm;