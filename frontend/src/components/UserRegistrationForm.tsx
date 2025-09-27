import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserService from '../services/userService';
import { UserRegistration } from '../types/user';
import { Language } from '../types/i18n';
import { getTranslations } from '../i18n';
import { useLanguage } from '../hooks/useLanguage';
import { BrazilFlag, USFlag } from './Flag';
import './UserRegistrationForm.css';

interface FormData {
  name: string;
  email: string;
  phone: string;
}

const UserRegistrationForm: React.FC = () => {
  const navigate = useNavigate();
  const { language, changeLanguage } = useLanguage();
  const t = getTranslations(language);
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Phone formatting function (reused from AppointmentForm)
  function formatPhone(value: string, lang: Language): string {
    if (lang === 'pt-BR') {
      // Remove tudo que não for número
      value = value.replace(/\D/g, '');
      // (99) 99999-9999
      if (value.length > 11) value = value.slice(0, 11);
      if (value.length > 7) return `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
      if (value.length > 6) return `(${value.slice(0, 2)}) ${value.slice(2, 7)}${value.slice(7)}`;
      if (value.length > 2) return `(${value.slice(0, 2)}) ${value.slice(2)}`;
      if (value.length > 0) return `(${value}`;
      return value;
    } else {
      // US: (999) 999-9999
      value = value.replace(/\D/g, '');
      if (value.length > 10) value = value.slice(0, 10);
      if (value.length > 7) return `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6)}`;
      if (value.length > 6) return `(${value.slice(0, 3)}) ${value.slice(3, 6)}${value.slice(6)}`;
      if (value.length > 3) return `(${value.slice(0, 3)}) ${value.slice(3)}`;
      if (value.length > 0) return `(${value}`;
      return value;
    }
  }

  // Phone validation function
  function isValidPhone(value: string, lang: Language): boolean {
    if (lang === 'pt-BR') {
      // (99) 99999-9999
      return /^\(\d{2}\) \d{5}-\d{4}$/.test(value);
    } else {
      // (999) 999-9999
      return /^\(\d{3}\) \d{3}-\d{4}$/.test(value);
    }
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const masked = formatPhone(raw, language);
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

    if (!formData.email.trim()) {
      newErrors.email = t['error.requiredFields'];
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t['user.error.invalidEmail'];
    }

    if (!formData.phone.trim()) {
      newErrors.phone = t['error.requiredFields'];
    } else if (!isValidPhone(formData.phone, language)) {
      newErrors.phone = t['error.invalidPhone'];
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
      const userRegistration: UserRegistration = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone
      };

      await UserService.registerUser(userRegistration, language);
      
      // Show success message and redirect
      alert(t['user.message.success']);
      navigate('/');
    } catch (error: any) {
      console.error('Registration error:', error);
      
      if (error.message === 'EMAIL_EXISTS') {
        setErrors({ email: t['user.message.emailExists'] });
      } else {
        alert(t['user.message.error']);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLanguageChange = (newLanguage: Language) => {
    changeLanguage(newLanguage);
    // Reformat phone when language changes
    setFormData(prev => ({
      ...prev,
      phone: formatPhone(prev.phone.replace(/\D/g, ''), newLanguage)
    }));
  };

  return (
    <div className="user-registration-container">
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

      <div className="user-registration-form">
        <div className="form-header">
          <h1>{t['user.registration.title']}</h1>
          <p>{t['user.registration.subtitle']}</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">{t['user.form.name']}</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder={t['user.placeholder.name']}
              required
              className={errors.name ? 'error' : ''}
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">{t['user.form.email']}</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder={t['user.placeholder.email']}
              required
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="phone">{t['user.form.phone']}</label>
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

          <button 
            type="submit" 
            className="submit-btn" 
            disabled={isLoading}
          >
            {isLoading ? t['user.form.processing'] : t['user.form.submit']}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserRegistrationForm;