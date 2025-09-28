import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppointmentCalendar from './AppointmentCalendar';
import Header from './header/Header';
import { WorkshopService, Workshop } from '../services/workshopService';
import { getTranslations } from '../i18n';
import { useLanguage } from '../hooks/useLanguage';
import './AppointmentCalendarPage.css';

const AppointmentCalendarPage: React.FC = () => {
  const navigate = useNavigate();
  const { language, changeLanguage } = useLanguage();
  const t = getTranslations(language);
  
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [selectedWorkshop, setSelectedWorkshop] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadWorkshops();
  }, [language]); // eslint-disable-line react-hooks/exhaustive-deps

  const loadWorkshops = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const workshopList = await WorkshopService.getAllWorkshops(language);
      setWorkshops(workshopList);
      
      // Auto-select first workshop if only one exists
      if (workshopList.length === 1) {
        setSelectedWorkshop(workshopList[0].id);
      }
    } catch (err) {
      console.error('Error loading workshops:', err);
      // Fallback to default workshops on error
      const defaultWorkshops = WorkshopService.getDefaultWorkshops(language);
      setWorkshops(defaultWorkshops);
      
      if (defaultWorkshops.length === 1) {
        setSelectedWorkshop(defaultWorkshops[0].id);
      }
      
      setError(t['error.loadWorkshops'] || 'Error loading workshops');
    } finally {
      setLoading(false);
    }
  };

  const handleWorkshopChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedWorkshop(event.target.value);
  };

  const goBack = () => {
    navigate('/dashboard');
  };

  if (loading) {
    return (
      <div className="app">
        <Header 
          language={language} 
          changeLanguage={changeLanguage}
          buttons={[]} 
        />
        <div className="calendar-page-container">
          <div className="loading-message">{t['loading.workshops']}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <Header 
        language={language} 
        changeLanguage={changeLanguage}
        buttons={[
          { label: t['dashboard.back'], onClick: goBack },
        ]} 
      />
      
      <div className="calendar-page-container">
        {error && (
          <div className="error-banner">
            {error}
          </div>
        )}
        
        <div className="workshop-selector-section">
          <label htmlFor="workshop-select" className="workshop-label">
            {t['form.title'] || 'Select Workshop'}:
          </label>
          <select 
            id="workshop-select"
            value={selectedWorkshop} 
            onChange={handleWorkshopChange}
            className="workshop-select"
          >
            <option value="">
              {t['message.selectWorkshop'] || 'Select a workshop'}
            </option>
            {workshops.map((workshop) => (
              <option key={workshop.id} value={workshop.id}>
                {workshop.name}
              </option>
            ))}
          </select>
        </div>

        {selectedWorkshop && (
          <AppointmentCalendar 
            workshop={selectedWorkshop} 
            language={language} 
          />
        )}
        
        {!selectedWorkshop && workshops.length > 1 && (
          <div className="no-workshop-selected">
            <p>{t['message.selectWorkshopToView'] || 'Please select a workshop to view appointments'}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentCalendarPage;