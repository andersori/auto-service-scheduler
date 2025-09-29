import React, { useState, useEffect } from 'react';
import { AppointmentResponse } from '../../types/appointment';
import { AppointmentService } from '../../services/appointmentService';
import { getTranslations } from '../../i18n';
import { Language } from '../../types/i18n';
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
  // Filtro de status
  const statusOptions = [
    { value: 'CREATED', label: 'Criada' },
    { value: 'PENDING_CONFIRMATION', label: 'Pendente Confirmação' },
    { value: 'CONFIRMED', label: 'Confirmada' },
    { value: 'COMPLETED', label: 'Realizada' },
    { value: 'CANCELLED', label: 'Cancelada' },
  ];
  const [selectedStatus, setSelectedStatus] = useState<string[]>(statusOptions.map(opt => opt.value));
  const handleStatusChange = (status: string) => {
    setSelectedStatus(prev =>
      prev.includes(status)
        ? prev.filter(s => s !== status)
        : [...prev, status]
    );
  };
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

  // Filter appointments for a specific date and sort by time (earliest first)
  function getAppointmentsForDate(date: Date): AppointmentResponse[] {
    const dateString = formatDateForAPI(date);
    return appointments
      .filter(appointment => {
        const appointmentDate = formatDateForAPI(new Date(appointment.appointmentDate));
        return appointmentDate === dateString && selectedStatus.includes(appointment.status);
      })
      .sort((a, b) => {
        const aDate = new Date(a.appointmentDate);
        const bDate = new Date(b.appointmentDate);
        return aDate.getTime() - bDate.getTime();
      });
  }

  // Generate mock appointments for demo purposes
  const generateMockAppointments = (): AppointmentResponse[] => {
    const today = new Date();
    const mockAppointments: AppointmentResponse[] = [];
    const clientNames = [
      'João Silva', 'Maria Santos', 'Pedro Costa', 'Ana Lima', 'Carlos Oliveira',
      'Lucas Souza', 'Fernanda Rocha', 'Paulo Mendes', 'Juliana Alves', 'Rafael Dias'
    ];
    const brands = [
      'Toyota', 'Honda', 'Volkswagen', 'Ford', 'Chevrolet',
      'Hyundai', 'Fiat', 'Renault', 'Peugeot', 'Nissan'
    ];
    const models = [
      'Corolla', 'Civic', 'Gol', 'Focus', 'Onix',
      'HB20', 'Argo', 'Sandero', '208', 'Versa'
    ];
    const serviceTypesList = [
      ['Troca de óleo'],
      ['Revisão completa', 'Freios'],
      ['Alinhamento'],
      ['Suspensão', 'Balanceamento'],
      ['Ar condicionado'],
      ['Pneus'],
      ['Elétrica'],
      ['Diagnóstico'],
      ['Embreagem'],
      ['Bateria']
    ];

    // Para cada dia da semana (segunda a domingo)
    for (let dayOffset = 0; dayOffset < 7; dayOffset++) {
      const baseDate = new Date(today);
      // Ajusta para o início da semana (segunda-feira)
      const day = baseDate.getDay();
      const diff = baseDate.getDate() - day + (day === 0 ? -6 : 1);
      baseDate.setDate(diff + dayOffset);
      baseDate.setHours(0, 0, 0, 0);

      // Entre 5 e 10 agendamentos por dia, horários aleatórios entre 8h e 18h
      const appointmentsCount = Math.floor(Math.random() * 6) + 5; // 5 a 10
      const usedHours: number[] = [];
      for (let i = 0; i < appointmentsCount; i++) {
        // Gera um horário aleatório entre 8h e 18h, sem repetir no mesmo dia
        let hour: number;
        do {
          hour = Math.floor(Math.random() * 11) + 8; // 8 a 18
        } while (usedHours.includes(hour));
        usedHours.push(hour);

        const appointmentDate = new Date(baseDate);
        appointmentDate.setHours(hour, 0, 0, 0);

        // Status alternando para simular variedade
        const statusList: import('../../types/appointment').AppointmentStatus[] = [
          'CREATED',
          'PENDING_CONFIRMATION',
          'CONFIRMED',
          'COMPLETED',
          'CANCELLED',
        ];
        const status = statusList[(i + dayOffset) % statusList.length];
        mockAppointments.push({
          id: dayOffset * 10 + i + 1,
          clientName: clientNames[(i + dayOffset) % clientNames.length],
          clientPhone: `(11) 9${(1000 + i + dayOffset * 10).toString().padStart(4, '0')}-000${i}`,
          vehicleBrand: brands[(i + dayOffset) % brands.length],
          vehicleModel: models[(i + dayOffset) % models.length],
          vehicleYear: 2015 + ((i + dayOffset) % 10),
          serviceTypes: serviceTypesList[(i + dayOffset) % serviceTypesList.length],
          appointmentDate: appointmentDate.toISOString(),
          createdAt: today.toISOString(),
          status: status,
        });
      }
    }
    console.log('Generated mock appointments:', mockAppointments);
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

  // Estado para controlar quais dias estão minimizados (mobile)
  const [minimizedDays, setMinimizedDays] = useState<boolean[]>(Array(7).fill(false));
  // Detecta se está em mobile (igual ao breakpoint do CSS)
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 1050);
  React.useEffect(() => {
    const onResize = () => {
      setIsMobile(window.innerWidth <= 1050);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  // Sempre expande todos os dias quando não for mobile
  React.useEffect(() => {
    if (!isMobile) {
      setMinimizedDays(Array(7).fill(false));
    } else {
      // Minimiza automaticamente todos os dias anteriores ao dia de hoje
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const week = getWeekDays(currentWeekStart);
      const minimized = week.map((day) => day < today);
      setMinimizedDays(minimized);
    }
  }, [isMobile, currentWeekStart]);
  const handleToggleDay = (index: number) => {
    if (!isMobile) return;
    setMinimizedDays((prev) => {
      const copy = [...prev];
      copy[index] = !copy[index];
      return copy;
    });
  };

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
            className={`action-btn primary ${isCurrentWeek() ? 'active' : ''}`}
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

      {error && <div className="calendar-error">{error}</div>}

      <div className="calendar-status-filter">
        {statusOptions.map(opt => (
          <label key={opt.value} className='calendar-status-filter-item' >
            <input
              type="checkbox"
              checked={selectedStatus.includes(opt.value)}
              onChange={() => handleStatusChange(opt.value)}
              style={{ accentColor: 'var(--status-' + opt.value.toLowerCase() + ')' }}
            />
            <span style={{ color: 'var(--status-' + opt.value.toLowerCase() + ')' }}>{opt.label}</span>
          </label>
        ))}
      </div>

      <div className="calendar-grid">
        {/* Desktop/tablet: full header row */}
        <div className="calendar-week-header desktop-header">
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
            // Detecta se está em mobile-header via CSS media query (JS não detecta, mas podemos sempre mostrar o botão e esconder via CSS se desktop)
            const isMinimized = isMobile && minimizedDays[index];
            return (
              <div key={index} className={`calendar-day${isMinimized ? ' minimized' : ''}`}>
                {/* Mobile: show header above each day */}
                <div className="calendar-day-header mobile-header">
                  <div className="day-name">{weekDayNames[index]}</div>
                  <div className="day-date">{day.getDate()}</div>
                  <div className="day-month">{day.toLocaleDateString(language, { month: 'short' })}</div>
                  <button
                    className="minimize-day-btn"
                    aria-label={isMinimized ? t['calendar.expandDay'] || 'Expandir' : t['calendar.minimizeDay'] || 'Minimizar'}
                    onClick={() => handleToggleDay(index)}
                    type="button"
                  >
                    {isMinimized ? '+' : '–'}
                  </button>
                </div>
                {!isMinimized && (
                  loading ? (
                    <div className="no-appointments calendar-loading">{t['calendar.loading']}</div>
                  ) : dayAppointments.length === 0 ? (
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
                            className={`appointment-card status-${appointment.status.toLowerCase()}`}
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
                  )
                )}
              </div>
            );
          })}
        </div>
      </div>

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
                <strong>{t['appointment.preview.status'] || 'Status'}:</strong>
                <span style={{
                  color: getComputedStyle(document.documentElement).getPropertyValue(`--status-${preview.appointment.status.toLowerCase()}`),
                  fontWeight: 600
                }}>{preview.appointment.status.replace('_', ' ')}</span>
              </div>
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