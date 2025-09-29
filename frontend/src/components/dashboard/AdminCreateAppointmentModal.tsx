import React, { useState } from 'react';
import Select from 'react-select';
import { AppointmentService } from '../../services/appointmentService';
import { getTranslations } from '../../i18n';
import { Language } from '../../types/i18n';
import { ServiceType } from '../../types/appointment';
import './AdminCreateAppointmentModal.css';

interface AdminCreateAppointmentModalProps {
  open: boolean;
  onClose: () => void;
  workshop: string;
  language: Language;
  onAppointmentCreated?: () => void;
  serviceTypes: ServiceType[];
}

export const AdminCreateAppointmentModal: React.FC<AdminCreateAppointmentModalProps> = ({
  open,
  onClose,
  workshop,
  language,
  onAppointmentCreated,
  serviceTypes,
}) => {
  const t = getTranslations(language);

  const [form, setForm] = useState({
    clientName: '',
    clientPhone: '',
    vehicleBrand: '',
    vehicleModel: '',
    vehicleYear: '',
    serviceTypes: [] as string[],
    appointmentDate: '',
    appointmentTime: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!open) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleServiceTypesChange = (selected: any) => {
    setForm({ ...form, serviceTypes: selected ? selected.map((s: any) => s.value) : [] });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await AppointmentService.createAppointment(
        {
          clientName: form.clientName,
          clientPhone: form.clientPhone,
          vehicleBrand: form.vehicleBrand,
          vehicleModel: form.vehicleModel,
          vehicleYear: parseInt(form.vehicleYear),
          serviceTypes: form.serviceTypes,
          appointmentDate: `${form.appointmentDate}T${form.appointmentTime}:00`,
        },
        workshop,
        language
      );
      if (onAppointmentCreated) onAppointmentCreated();
      onClose();
    } catch (err) {
      setError(t['message.error']);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-create-appointment-modal-overlay" onClick={onClose}>
      <div className="admin-create-appointment-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{t['form.title']}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>{t['form.clientName']}</label>
            <input name="clientName" value={form.clientName} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>{t['form.clientPhone']}</label>
            <input name="clientPhone" value={form.clientPhone} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>{t['form.vehicleBrand']}</label>
            <input name="vehicleBrand" value={form.vehicleBrand} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>{t['form.vehicleModel']}</label>
            <input name="vehicleModel" value={form.vehicleModel} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>{t['form.vehicleYear']}</label>
            <input name="vehicleYear" value={form.vehicleYear} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>{t['form.serviceType']}</label>
            <Select
              isMulti
              options={serviceTypes.map(st => ({ value: st.name, label: st.name }))}
              value={form.serviceTypes.map(st => ({ value: st, label: st }))}
              onChange={handleServiceTypesChange}
              classNamePrefix="react-select"
            />
          </div>
          <div className="form-group">
            <label>{t['form.appointmentDate']}</label>
            <input type="date" name="appointmentDate" value={form.appointmentDate} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>{t['form.appointmentTime']}</label>
            <input type="time" name="appointmentTime" value={form.appointmentTime} onChange={handleChange} required />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? t['form.processing'] : t['form.submit']}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminCreateAppointmentModal;