import React, { useState } from 'react';
import { getTranslations } from '../../i18n';
import { useLanguage } from '../../hooks/useLanguage';
import { formatPhone, isValidPhone } from '../../utils/validation';
import './WorkshopRegistrationForm.css';
import { Language } from '../../types/i18n';

interface FormData {
  name: string;
  phone: string;
  description: string;
}

interface WorkshopRegistrationFormProps {
  language?: Language;
}

const WorkshopRegistrationForm: React.FC<WorkshopRegistrationFormProps> = ({ language }) => {
  const context = useLanguage();
  const lang = language || context.language;
  const t = getTranslations(lang);

  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    description: ''
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
    const masked = formatPhone(raw, lang);
    setFormData(prev => ({ ...prev, phone: masked }));

    // Clear phone error when user starts typing
    if (errors.phone) {
      setErrors(prev => ({ ...prev, phone: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = t['error.requiredFields'];
    }

    if (!formData.phone.trim()) {
      newErrors.phone = t['error.requiredFields'];
    } else if (!isValidPhone(formData.phone, lang)) {
      newErrors.phone = t['error.invalidPhone'];
    }

    if (!formData.description.trim()) {
      newErrors.description = t['error.requiredFields'];
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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert(t['workshop.form.success']);
      // Reset form
      setFormData({
        name: '',
        phone: '',
        description: ''
      });
    } catch (error: any) {
      console.error(t['console.error.workshopRegistration'], error);
      alert(t['workshop.form.error']);
    } finally {
      setIsLoading(false);
    }
  };

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