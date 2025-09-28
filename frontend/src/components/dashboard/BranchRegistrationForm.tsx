import React, { useState } from 'react';
import { getTranslations } from '../../i18n';
import { useLanguage } from '../../hooks/useLanguage';
import './BranchRegistrationForm.css';
import { Language } from '../../types/i18n';

interface TimeRange {
  start: string;
  end: string;
}

interface DaySchedule {
  enabled: boolean;
  timeRanges: TimeRange[];
}

interface OperatingHours {
  monday: DaySchedule;
  tuesday: DaySchedule;
  wednesday: DaySchedule;
  thursday: DaySchedule;
  friday: DaySchedule;
  saturday: DaySchedule;
  sunday: DaySchedule;
}

interface FormData {
  address: string;
  operatingHours: OperatingHours;
  services: string[];
}

const availableServices = [
  'Troca de óleo',
  'Revisão completa',
  'Alinhamento e balanceamento',
  'Troca de pneus',
  'Freios',
  'Suspensão',
  'Ar condicionado',
  'Outros'
];

const availableServicesEN = [
  'Oil change',
  'Full revision',
  'Alignment and balancing',
  'Tire replacement',
  'Brakes',
  'Suspension',
  'Air conditioning',
  'Others'
];

interface BranchRegistrationFormProps {
  workshopId?: string;
  language?: Language;
  onSubmitSuccess?: () => void;
}

const BranchRegistrationForm: React.FC<BranchRegistrationFormProps> = ({ workshopId, language, onSubmitSuccess }) => {
  const context = useLanguage();
  const lang = language || context.language;
  const t = getTranslations(lang);

  const initialOperatingHours: OperatingHours = {
    monday: { enabled: false, timeRanges: [] },
    tuesday: { enabled: false, timeRanges: [] },
    wednesday: { enabled: false, timeRanges: [] },
    thursday: { enabled: false, timeRanges: [] },
    friday: { enabled: false, timeRanges: [] },
    saturday: { enabled: false, timeRanges: [] },
    sunday: { enabled: false, timeRanges: [] }
  };

  const [formData, setFormData] = useState<FormData>({
    address: '',
    operatingHours: initialOperatingHours,
    services: []
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

  const handleServiceToggle = (service: string) => {
    setFormData(prev => {
      const services = prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service];

      return { ...prev, services };
    });

    // Clear services error when user selects a service
    if (errors.services) {
      setErrors(prev => ({ ...prev, services: '' }));
    }
  };

  const handleDayToggle = (day: keyof OperatingHours) => {
    setFormData(prev => ({
      ...prev,
      operatingHours: {
        ...prev.operatingHours,
        [day]: {
          enabled: !prev.operatingHours[day].enabled,
          timeRanges: !prev.operatingHours[day].enabled
            ? [{ start: '09:00', end: '18:00' }]
            : []
        }
      }
    }));

    // Clear operating hours error when user selects a day
    if (errors.operatingHours) {
      setErrors(prev => ({ ...prev, operatingHours: '' }));
    }
  };

  const handleTimeRangeChange = (day: keyof OperatingHours, index: number, field: 'start' | 'end', value: string) => {
    setFormData(prev => ({
      ...prev,
      operatingHours: {
        ...prev.operatingHours,
        [day]: {
          ...prev.operatingHours[day],
          timeRanges: prev.operatingHours[day].timeRanges.map((range, i) =>
            i === index ? { ...range, [field]: value } : range
          )
        }
      }
    }));
  };

  const addTimeRange = (day: keyof OperatingHours) => {
    setFormData(prev => ({
      ...prev,
      operatingHours: {
        ...prev.operatingHours,
        [day]: {
          ...prev.operatingHours[day],
          timeRanges: [...prev.operatingHours[day].timeRanges, { start: '09:00', end: '18:00' }]
        }
      }
    }));
  };

  const removeTimeRange = (day: keyof OperatingHours, index: number) => {
    setFormData(prev => ({
      ...prev,
      operatingHours: {
        ...prev.operatingHours,
        [day]: {
          ...prev.operatingHours[day],
          timeRanges: prev.operatingHours[day].timeRanges.filter((_, i) => i !== index)
        }
      }
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.address.trim()) {
      newErrors.address = t['error.requiredFields'];
    }

    // Validate operating hours
    const enabledDays = Object.values(formData.operatingHours).filter(day => day.enabled);
    if (enabledDays.length === 0) {
      newErrors.operatingHours = t['workshop.form.error.noDays'];
    } else {
      // Check if enabled days have valid time ranges
      for (const [, daySchedule] of Object.entries(formData.operatingHours)) {
        if (daySchedule.enabled) {
          if (daySchedule.timeRanges.length === 0) {
            newErrors.operatingHours = t['workshop.form.error.noTimeRanges'];
            break;
          }

          // Validate each time range
          for (const range of daySchedule.timeRanges) {
            if (!range.start || !range.end) {
              newErrors.operatingHours = t['workshop.form.error.invalidTimeRange'];
              break;
            }

            if (range.start >= range.end) {
              newErrors.operatingHours = t['workshop.form.error.invalidTimeOrder'];
              break;
            }
          }

          if (newErrors.operatingHours) break;
        }
      }
    }

    if (formData.services.length === 0) {
      newErrors.services = t['workshop.form.error.noServices'];
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
      // For now, just show success - later implement actual branch registration API
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert(t['branch.form.success']);
      // Reset form
      setFormData({
        address: '',
        operatingHours: initialOperatingHours,
        services: []
      });
      if (onSubmitSuccess) {
        onSubmitSuccess();
      }
    } catch (error: any) {
      console.error(t['console.error.branchRegistration'], error);
      alert(t['branch.form.error']);
    } finally {
      setIsLoading(false);
    }
  };

  const serviceList = language === 'pt-BR' ? availableServices : availableServicesEN;

  return (
    <div className="branch-registration-form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="address">{t['branch.form.address']}</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder={t['branch.form.placeholder.address']}
            required
            className={errors.address ? 'error' : ''}
          />
          {errors.address && <span className="error-message">{errors.address}</span>}
        </div>

        <div className="form-group">
          <label>{t['branch.form.operatingHours']}</label>
          <div className="operating-hours-container">
            {Object.entries(formData.operatingHours).map(([dayName, daySchedule]) => (
              <div key={dayName} className="day-schedule">
                <div className="day-header">
                  <label className="day-checkbox">
                    <input
                      type="checkbox"
                      checked={daySchedule.enabled}
                      onChange={() => handleDayToggle(dayName as keyof OperatingHours)}
                    />
                    <span className="checkmark"></span>
                    {t[`workshop.form.days.${dayName}` as keyof typeof t]}
                  </label>
                </div>

                {daySchedule.enabled && (
                  <div className="time-ranges">
                    {daySchedule.timeRanges.map((range: TimeRange, index: number) => (
                      <div key={index} className="time-range">
                        <input
                          type="time"
                          value={range.start}
                          onChange={(e) => handleTimeRangeChange(dayName as keyof OperatingHours, index, 'start', e.target.value)}
                          className="time-input"
                        />
                        <span className="time-separator">{t['workshop.form.timeTo']}</span>
                        <input
                          type="time"
                          value={range.end}
                          onChange={(e) => handleTimeRangeChange(dayName as keyof OperatingHours, index, 'end', e.target.value)}
                          className="time-input"
                        />
                        {daySchedule.timeRanges.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeTimeRange(dayName as keyof OperatingHours, index)}
                            className="remove-time-btn"
                            title={t['workshop.form.removeTimeRange']}
                          >
                            ×
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addTimeRange(dayName as keyof OperatingHours)}
                      className="add-time-btn"
                    >
                      {t['workshop.form.addTimeRange']}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
          {errors.operatingHours && <span className="error-message">{errors.operatingHours}</span>}
        </div>

        <div className="form-group">
          <label>{t['branch.form.services']}</label>
          <div className="services-grid">
            {serviceList.map(service => (
              <label key={service} className="service-checkbox">
                <input
                  type="checkbox"
                  checked={formData.services.includes(service)}
                  onChange={() => handleServiceToggle(service)}
                />
                <span className="checkmark"></span>
                {service}
              </label>
            ))}
          </div>
          {errors.services && <span className="error-message">{errors.services}</span>}
        </div>

        <button
          type="submit"
          className="submit-btn"
          disabled={isLoading}
        >
          {isLoading ? t['branch.form.processing'] : t['branch.form.submit']}
        </button>
      </form>
    </div>
  );
};

export default BranchRegistrationForm;