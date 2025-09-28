import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserService from '../services/userService';
import { LoginData } from '../types/user';
import { getTranslations } from '../i18n';
import { useLanguage } from '../hooks/useLanguage';
import { isValidEmail } from '../utils/validation';
import './Login.css';
import Header from './header/Header';

interface FormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { language, changeLanguage } = useLanguage();
  const t = getTranslations(language);

  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: ''
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

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.email.trim()) {
      newErrors.email = t['error.requiredFields'];
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = t['user.error.invalidEmail'];
    }

    if (!formData.password.trim()) {
      newErrors.password = t['error.requiredFields'];
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
      const loginData: LoginData = {
        email: formData.email.trim(),
        password: formData.password
      };

      const loginResponse = await UserService.loginUser(loginData, language);

      // Store user info in localStorage
      localStorage.setItem('user', JSON.stringify(loginResponse.user));

      // Show success message and redirect to dashboard
      alert(loginResponse.message);
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Login error:', error);

      if (error.message === 'INVALID_CREDENTIALS') {
        setErrors({ email: t['user.login.error.invalid'] });
      } else {
        alert(t['user.login.error.general']);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app">
      <Header language={language} changeLanguage={changeLanguage} />

      <div className="login-container">
        <div className="login-form">
          <div className="form-header">
            <h1>{t['user.login.title']}</h1>
            <p>{t['user.login.subtitle']}</p>
          </div>

          <form onSubmit={handleSubmit}>
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

            <button
              type="submit"
              className="submit-btn"
              disabled={isLoading}
            >
              {isLoading ? t['user.login.processing'] : t['user.login.submit']}
            </button>
          </form>

          <div className="form-footer">
            <p>{t['user.login.noAccount']}
              <button
                type="button"
                className="link-btn"
                onClick={() => navigate('/register')}
              >
                {t['user.login.registerLink']}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;