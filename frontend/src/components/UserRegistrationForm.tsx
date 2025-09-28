import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserService from '../services/userService';
import { UserRegistration } from '../types/user';
import { Language } from '../types/i18n';
import { getTranslations } from '../i18n';
import { useLanguage } from '../hooks/useLanguage';
import { formatPhone, isValidPhone, isValidEmail } from '../utils/validation';
import './UserRegistrationForm.css';
import Header from './header/Header';

interface FormData {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

const UserRegistrationForm: React.FC = () => {
  const navigate = useNavigate();
  const { language, changeLanguage } = useLanguage();
  const t = getTranslations(language);

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
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
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = t['user.error.invalidEmail'];
    }

    if (!formData.phone.trim()) {
      newErrors.phone = t['error.requiredFields'];
    } else if (!isValidPhone(formData.phone, language)) {
      newErrors.phone = t['error.invalidPhone'];
    }

    if (!formData.password.trim()) {
      newErrors.password = t['error.requiredFields'];
    } else if (formData.password.length < 6) {
      newErrors.password = t['user.error.passwordTooShort'];
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = t['error.requiredFields'];
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t['user.error.passwordMismatch'];
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
        phone: formData.phone,
        password: formData.password
      };

      await UserService.registerUser(userRegistration, language);
      // Show success message and redirect
      alert(t['user.message.success']);
      navigate('/');
    } catch (error: any) {
      console.error(t['console.error.registration'], error);
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
    // Reformat phone when language changes
    setFormData(prev => ({
      ...prev,
      phone: formatPhone(prev.phone.replace(/\D/g, ''), newLanguage)
    }));
  };

  return (
    <div className="app">
      <Header
        language={language}
        changeLanguage={changeLanguage}
        handleLanguageChange={handleLanguageChange}
      />
      <div className="user-registration-container">

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

            <div className="form-group">
              <label htmlFor="password">{t['user.form.password']}</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder={t['user.placeholder.password']}
                required
                className={errors.password ? 'error' : ''}
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">{t['user.form.confirmPassword']}</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder={t['user.placeholder.confirmPassword']}
                required
                className={errors.confirmPassword ? 'error' : ''}
              />
              {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
            </div>

            <button
              type="submit"
              className="submit-btn"
              disabled={isLoading}
            >
              {isLoading ? t['user.form.processing'] : t['user.form.submit']}
            </button>
          </form>

          <div className="form-footer">
            <p>{t['user.registration.alreadyWithAccount']}
              <button
                type="button"
                className="link-btn"
                onClick={() => navigate('/login')}
              >
                {t['user.registration.LoginLink']}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRegistrationForm;