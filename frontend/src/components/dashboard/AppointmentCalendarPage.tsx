import React, { useState, useEffect } from 'react';
import AppointmentCalendar from './AppointmentCalendar';
import { WorkshopService, Workshop } from '../../services/workshopService';
import { getTranslations } from '../../i18n';
import { useLanguage } from '../../hooks/useLanguage';
import './AppointmentCalendarPage.css';
import { Language } from '../../types/i18n';

interface AppointmentCalendarPageProps {
  language?: Language;
}

const AppointmentCalendarPage: React.FC<AppointmentCalendarPageProps> = ({ language }) => {
  const context = useLanguage();
  const lang = language || context.language;
  const t = getTranslations(lang);

  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [selectedWorkshop, setSelectedWorkshop] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadWorkshops();
  }, [language]);

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
      const defaultWorkshops = WorkshopService.getDefaultWorkshops(language);
      setWorkshops(defaultWorkshops);

      if (defaultWorkshops.length === 1) {
        setSelectedWorkshop(defaultWorkshops[0].id);
      }

      setError(t['error.loadWorkshops']);
    } finally {
      setLoading(false);
    }
  };

  const handleWorkshopChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedWorkshop(event.target.value);
  };

  if (loading) {
    return (
      <div className="calendar-page-container">
          <div className="loading-message">{t['loading.workshops']}</div>
        </div>
    );
  }

  return (
    <div className="calendar-page-container">
      {error && (
        <div className="error-banner">
          <span>{error}</span>
          <button
            className="close-error-btn"
            onClick={() => setError(null)}
            aria-label={t['error.close']}
          >
            ×
          </button>
        </div>
      )}

      <div className="workshop-selector-section">
        <label htmlFor="workshop-select" className="workshop-label">
          {t['form.title']}:
        </label>
        <select
          id="workshop-select"
          value={selectedWorkshop}
          onChange={handleWorkshopChange}
          className="workshop-select"
        >
          <option value="">
            {t['message.selectWorkshop']}
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
          language={lang}
        />
      )}

      {!selectedWorkshop && workshops.length > 1 && (
        <div className="no-workshop-selected">
          <p>{t['message.selectWorkshopToView']}</p>
        </div>
      )}
    </div>
  );
};

export default AppointmentCalendarPage;