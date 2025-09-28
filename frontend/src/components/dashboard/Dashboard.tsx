import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserResponse } from '../../types/user';
import { getTranslations } from '../../i18n';
import { useLanguage } from '../../hooks/useLanguage';
import WorkshopRegistrationForm from './WorkshopRegistrationForm';
import BranchManagement from './BranchManagement';
import AppointmentCalendarPage from './AppointmentCalendarPage';
import './Dashboard.css';
import Header from '../header/Header';
import { BackIcon } from '../icon/Back';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { language, changeLanguage } = useLanguage();
  const t = getTranslations(language);

  const [user, setUser] = useState<UserResponse | null>(null);
  const [showWorkshopForm, setShowWorkshopForm] = useState(false);
  const [showBranchManagement, setShowBranchManagement] = useState(false);
  const [showAppointments, setShowAppointments] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
      return;
    }

    try {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
    } catch (error) {
      console.error(t['console.error.parseUser'], error);
      localStorage.removeItem('user');
      navigate('/login');
    }
  }, [navigate, t]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  if (!user) {
    return <div className="loading">{t['loading.workshops']}</div>;
  }

  return (
    <div className="app">
      <Header
        language={language}
        changeLanguage={changeLanguage}
        buttons={[
          { label: t['dashboard.logout'], onClick: handleLogout },
        ]}
      />

      <div className="dashboard-container">
        <div className="dashboard-content">
          {(showWorkshopForm || showBranchManagement || showAppointments) && (
            <button
              className="icon-back-btn"
              onClick={() => {
                setShowWorkshopForm(false);
                setShowBranchManagement(false);
                setShowAppointments(false);
              }}
              aria-label={t['dashboard.back']}
            >
              <BackIcon />
            </button>
          )}
          <div className="welcome-section">
            <h1>{t['dashboard.welcome']} {user.name}!</h1>
            <p className="user-info">{user.email} • {user.userType}</p>
          </div>

          {!showWorkshopForm && !showBranchManagement && !showAppointments ? (
            <div className="actions-section">
              <h2>{t['dashboard.actions.title']}</h2>
              <div className="action-cards">
                <div className="action-card">
                  <h3>{t['dashboard.workshops.title']}</h3>
                  <p>{t['dashboard.workshops.description']}</p>
                  <button
                    className="action-btn primary"
                    onClick={() => setShowWorkshopForm(true)}
                  >
                    {t['dashboard.workshops.register']}
                  </button>
                </div>

                <div className="action-card">
                  <h3>{t['branch.management.title']}</h3>
                  <p>{t['branch.management.subtitle']}</p>
                  <button
                    className="action-btn primary"
                    onClick={() => setShowBranchManagement(true)}
                  >
                    {t['dashboard.branches.manage']}
                  </button>
                </div>

                <div className="action-card">
                  <h3>{t['dashboard.appointments.title']}</h3>
                  <p>{t['dashboard.appointments.description']}</p>
                  <button
                    className="action-btn secondary"
                    onClick={() => setShowAppointments(true)}
                  >
                    {t['dashboard.appointments.view']}
                  </button>
                </div>
              </div>
            </div>
          ) : null}

          {showWorkshopForm && (
            <div className="workshop-form-section">
              <WorkshopRegistrationForm language={language} />
            </div>
          )}

          {showBranchManagement && (
            <div className="branch-management-section">
              <BranchManagement language={language} />
            </div>
          )}

          {showAppointments && (
            <div className="appointments-section">
              <AppointmentCalendarPage language={language} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;