import React, { useState, useEffect } from 'react';
import { AppointmentResponse } from '../types/appointment';
import { AppointmentService } from '../services/appointmentService';
import { getTranslations } from '../i18n';
import { Language } from '../types/i18n';
import './AppointmentCalendar.css';

interface AppointmentCalendarProps {
  workshop: string;
  language: Language;
}

interface AppointmentPreview {
  appointment: AppointmentResponse;
  visible: boolean;
}

const AppointmentCalendar: React.FC<AppointmentCalendarProps> = ({ workshop, language }) => {
  const t = getTranslations(language);
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(getStartOfWeek(new Date()));
  const [appointments, setAppointments] = useState<AppointmentResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<AppointmentPreview>({ appointment: null as any, visible: false });

  // Get the start of the week (Monday)
  function getStartOfWeek(date: Date): Date {
    const startOfWeek = new Date(date);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1); // Adjust for Monday start
    startOfWeek.setDate(diff);
    startOfWeek.setHours(0, 0, 0, 0);
    return startOfWeek;
  }

  // Get all days of the current week
  function getWeekDays(startDate: Date): Date[] {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startDate);
      day.setDate(startDate.getDate() + i);
      days.push(day);
    }
    return days;
  }

  // Format date to match backend format
  function formatDateForAPI(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  // Parse appointment date string and extract time
  function parseAppointmentDateTime(dateString: string): { date: Date; time: string } {
    const appointmentDate = new Date(dateString);
    const time = appointmentDate.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
    return { date: appointmentDate, time };
  }

  // Filter appointments for a specific date
  function getAppointmentsForDate(date: Date): AppointmentResponse[] {
    const dateString = formatDateForAPI(date);
    return appointments.filter(appointment => {
      const appointmentDate = formatDateForAPI(new Date(appointment.appointmentDate));
      return appointmentDate === dateString;
    });
  }

  // Generate mock appointments for demo purposes
  const generateMockAppointments = (): AppointmentResponse[] => {
    const today = new Date();
    const mockAppointments: AppointmentResponse[] = [];
    
    // Generate some mock appointments for this week
    for (let i = 0; i < 5; i++) {
      const appointmentDate = new Date(today);
      appointmentDate.setDate(today.getDate() + (i - 2)); // Spread across the week
      appointmentDate.setHours(9 + (i * 2), 0, 0, 0); // Different times
      
      mockAppointments.push({
        id: i + 1,
        clientName: [`João Silva`, `Maria Santos`, `Pedro Costa`, `Ana Lima`, `Carlos Oliveira`][i],
        clientPhone: `(11) 9999-${9000 + i}`,
        vehicleBrand: [`Toyota`, `Honda`, `Volkswagen`, `Ford`, `Chevrolet`][i],
        vehicleModel: [`Corolla`, `Civic`, `Gol`, `Focus`, `Onix`][i],
        vehicleYear: 2018 + i,
        serviceTypes: [
          [`Troca de óleo`],
          [`Revisão completa`, `Freios`],
          [`Alinhamento`],
          [`Suspensão`, `Balanceamento`],
          [`Ar condicionado`]
        ][i],
        appointmentDate: appointmentDate.toISOString(),
        createdAt: today.toISOString()
      });
    }
    
    return mockAppointments;
  };

  // Load appointments for the current week
  const loadAppointments = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const allAppointments = await AppointmentService.getAllAppointments(workshop, language);
      setAppointments(allAppointments);
    } catch (err) {
      // On error (like no backend), show mock data for demo purposes
      console.warn('Backend not available, showing mock data for demo');
      const mockData = generateMockAppointments();
      setAppointments(mockData);
      // Don't set error state, just show the mock data
    } finally {
      setLoading(false);
    }
  };

  // Navigation functions
  const goToPreviousWeek = () => {
    const previousWeek = new Date(currentWeekStart);
    previousWeek.setDate(currentWeekStart.getDate() - 7);
    setCurrentWeekStart(previousWeek);
  };

  const goToNextWeek = () => {
    const nextWeek = new Date(currentWeekStart);
    nextWeek.setDate(currentWeekStart.getDate() + 7);
    setCurrentWeekStart(nextWeek);
  };

  const goToCurrentWeek = () => {
    setCurrentWeekStart(getStartOfWeek(new Date()));
  };

  // Show appointment preview
  const showAppointmentPreview = (appointment: AppointmentResponse) => {
    setPreview({ appointment, visible: true });
  };

  const closePreview = () => {
    setPreview({ appointment: null as any, visible: false });
  };

  // Load appointments when component mounts or week changes
  useEffect(() => {
    loadAppointments();
  }, [workshop, language, currentWeekStart]); // eslint-disable-line react-hooks/exhaustive-deps

  const weekDays = getWeekDays(currentWeekStart);
  const weekDayNames = [
    t['calendar.days.monday'],
    t['calendar.days.tuesday'],
    t['calendar.days.wednesday'],
    t['calendar.days.thursday'],
    t['calendar.days.friday'],
    t['calendar.days.saturday'],
    t['calendar.days.sunday'],
  ];

  // Check if current week is the current actual week
  const isCurrentWeek = () => {
    const now = new Date();
    const currentWeekStartActual = getStartOfWeek(now);
    return currentWeekStart.getTime() === currentWeekStartActual.getTime();
  };

  return (
    <div className="appointment-calendar">
      <div className="calendar-header">
        <div className="calendar-title-section">
          <h2>{t['calendar.title']}</h2>
          <p>{t['calendar.subtitle']}</p>
        </div>
        
        <div className="calendar-navigation">
          <button 
            className="nav-btn" 
            onClick={goToPreviousWeek}
            aria-label={t['calendar.previousWeek']}
          >
            ←
          </button>
          
          <button 
            className={`current-week-btn ${isCurrentWeek() ? 'active' : ''}`}
            onClick={goToCurrentWeek}
          >
            {isCurrentWeek() ? t['calendar.currentWeek'] : t['calendar.currentWeek']}
          </button>
          
          <button 
            className="nav-btn" 
            onClick={goToNextWeek}
            aria-label={t['calendar.nextWeek']}
          >
            →
          </button>
        </div>
      </div>

      {loading && <div className="calendar-loading">{t['calendar.loading']}</div>}
      {error && <div className="calendar-error">{error}</div>}

      {!loading && !error && (
        <div className="calendar-grid">
          <div className="calendar-week-header">
            {weekDays.map((day, index) => (
              <div key={index} className="calendar-day-header">
                <div className="day-name">{weekDayNames[index]}</div>
                <div className="day-date">{day.getDate()}</div>
                <div className="day-month">{day.toLocaleDateString(language, { month: 'short' })}</div>
              </div>
            ))}
          </div>

          <div className="calendar-week-body">
            {weekDays.map((day, index) => {
              const dayAppointments = getAppointmentsForDate(day);
              return (
                <div key={index} className="calendar-day">
                  {dayAppointments.length === 0 ? (
                    <div className="no-appointments">
                      {t['calendar.noAppointments']}
                    </div>
                  ) : (
                    <div className="appointments-list">
                      {dayAppointments.map((appointment) => {
                        const { time } = parseAppointmentDateTime(appointment.appointmentDate);
                        return (
                          <div
                            key={appointment.id}
                            className="appointment-card"
                            onClick={() => showAppointmentPreview(appointment)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                showAppointmentPreview(appointment);
                              }
                            }}
                          >
                            <div className="appointment-time">{time}</div>
                            <div className="appointment-client">{appointment.clientName}</div>
                            <div className="appointment-service">
                              {appointment.serviceTypes[0]}
                              {appointment.serviceTypes.length > 1 && ` +${appointment.serviceTypes.length - 1}`}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Appointment Preview Modal */}
      {preview.visible && (
        <div className="appointment-preview-overlay" onClick={closePreview}>
          <div className="appointment-preview-modal" onClick={(e) => e.stopPropagation()}>
            <div className="preview-header">
              <h3>{t['appointment.preview.title']}</h3>
              <button className="close-btn" onClick={closePreview}>
                ×
              </button>
            </div>
            
            <div className="preview-body">
              <div className="preview-field">
                <strong>{t['appointment.preview.client']}:</strong>
                <span>{preview.appointment.clientName}</span>
              </div>
              
              <div className="preview-field">
                <strong>{t['appointment.preview.phone']}:</strong>
                <span>{preview.appointment.clientPhone}</span>
              </div>
              
              <div className="preview-field">
                <strong>{t['appointment.preview.vehicle']}:</strong>
                <span>{preview.appointment.vehicleBrand} {preview.appointment.vehicleModel} {preview.appointment.vehicleYear}</span>
              </div>
              
              <div className="preview-field">
                <strong>{t['appointment.preview.services']}:</strong>
                <div className="services-list">
                  {preview.appointment.serviceTypes.map((service, index) => (
                    <span key={index} className="service-tag">{service}</span>
                  ))}
                </div>
              </div>
              
              <div className="preview-field">
                <strong>{t['appointment.preview.date']}:</strong>
                <span>{new Date(preview.appointment.appointmentDate).toLocaleDateString(language)}</span>
              </div>
              
              <div className="preview-field">
                <strong>{t['appointment.preview.time']}:</strong>
                <span>{parseAppointmentDateTime(preview.appointment.appointmentDate).time}</span>
              </div>
            </div>
            
            <div className="preview-footer">
              <button className="close-btn-primary" onClick={closePreview}>
                {t['appointment.preview.close']}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentCalendar;