import React from 'react';
import { Link } from 'react-router-dom';
import { Language } from '../types/i18n';
import { getTranslations } from '../i18n';
import { useLanguage } from '../hooks/useLanguage';
import './WorkshopList.css';

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

interface Workshop {
  id: string;
  name: string;
  address: string;
  phone: string;
  description: string;
  hours: string;
  services: string[];
}

export const WorkshopList: React.FC = () => {
  const { language, changeLanguage } = useLanguage();
  const t = getTranslations(language);

  const handleLanguageChange = (newLanguage: Language) => {
    changeLanguage(newLanguage);
  };

  // Mock data - será substituído por dados do backend posteriormente
  const workshops: Workshop[] = [
    {
      id: 'oficina-centro',
      name: 'AutoService Centro',
      address: 'Rua das Flores, 123 - Centro - São Paulo, SP',
      phone: '(11) 3456-7890',
      description: language === 'pt-BR' 
        ? 'Oficina especializada em serviços automotivos completos com mais de 20 anos de experiência.' 
        : 'Workshop specialized in complete automotive services with over 20 years of experience.',
      hours: language === 'pt-BR' 
        ? 'Segunda à Sexta: 8h às 18h | Sábado: 8h às 12h'
        : 'Monday to Friday: 8am to 6pm | Saturday: 8am to 12pm',
      services: language === 'pt-BR'
        ? ['Troca de óleo', 'Revisão completa', 'Freios', 'Suspensão']
        : ['Oil change', 'Full service', 'Brakes', 'Suspension']
    },
    {
      id: 'oficina-zona-sul',
      name: 'AutoService Zona Sul',
      address: 'Av. Paulista, 456 - Zona Sul - São Paulo, SP',
      phone: '(11) 2345-6789',
      description: language === 'pt-BR'
        ? 'Moderna oficina com equipamentos de última geração e atendimento personalizado.'
        : 'Modern workshop with state-of-the-art equipment and personalized service.',
      hours: language === 'pt-BR'
        ? 'Segunda à Sexta: 7h30 às 18h30 | Sábado: 8h às 13h'
        : 'Monday to Friday: 7:30am to 6:30pm | Saturday: 8am to 1pm',
      services: language === 'pt-BR'
        ? ['Alinhamento', 'Balanceamento', 'Ar condicionado', 'Elétrica']
        : ['Alignment', 'Balancing', 'Air conditioning', 'Electrical']
    },
    {
      id: 'oficina-zona-norte',
      name: 'AutoService Zona Norte',
      address: 'Rua dos Automóveis, 789 - Zona Norte - São Paulo, SP',
      phone: '(11) 1234-5678',
      description: language === 'pt-BR'
        ? 'Especializada em veículos nacionais e importados com preços competitivos.'
        : 'Specialized in national and imported vehicles with competitive prices.',
      hours: language === 'pt-BR'
        ? 'Segunda à Sexta: 8h às 17h | Sábado: 8h às 12h'
        : 'Monday to Friday: 8am to 5pm | Saturday: 8am to 12pm',
      services: language === 'pt-BR'
        ? ['Troca de pneus', 'Diagnóstico', 'Mecânica geral', 'Funilaria']
        : ['Tire replacement', 'Diagnostics', 'General mechanics', 'Body work']
    }
  ];

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
        <h1>{t['workshop.list.title']}</h1>
        <p>{t['workshop.list.subtitle']}</p>
      </div>

      <div className="workshops-grid">
        {workshops.map((workshop) => (
          <div key={workshop.id} className="workshop-card card">
            <div className="workshop-header">
              <h2 className="workshop-name">{workshop.name}</h2>
              <div className="workshop-rating">
                <span className="stars">★★★★★</span>
                <span className="rating-text">4.8</span>
              </div>
            </div>

            <div className="workshop-info">
              <div className="info-item">
                <span className="info-icon">📍</span>
                <span className="info-text">{workshop.address}</span>
              </div>
              
              <div className="info-item">
                <span className="info-icon">📞</span>
                <span className="info-text">{workshop.phone}</span>
              </div>
              
              <div className="info-item">
                <span className="info-icon">🕒</span>
                <span className="info-text">{workshop.hours}</span>
              </div>
            </div>

            <div className="workshop-description">
              <p>{workshop.description}</p>
            </div>

            <div className="workshop-services">
              <h4>{t['workshop.services']}</h4>
              <div className="services-tags">
                {workshop.services.map((service, index) => (
                  <span key={index} className="service-tag">
                    {service}
                  </span>
                ))}
              </div>
            </div>

            <div className="workshop-actions">
              <Link 
                to={`/${workshop.id}`} 
                className="btn btn-primary"
              >
                {t['workshop.schedule']}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};