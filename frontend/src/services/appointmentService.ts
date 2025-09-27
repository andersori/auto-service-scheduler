
import { AppointmentRequest, AppointmentResponse, AvailableTimeSlot } from '../types/appointment';
import { Language } from '../types/i18n';
import { fetchWithTimeout } from './httpRequestService';

const API_BASE_URL = 'http://localhost:8080/api';

export class AppointmentService {
  static getDefaultAvailableTimeSlots(date: string): AvailableTimeSlot {
    // Horários padrão de 08:00 às 17:00 de hora em hora
    return {
      date,
      timeSlots: [
        '08:00', '09:00', '10:00', '11:00', '12:00',
        '13:00', '14:00', '15:00', '16:00', '17:00'
      ]
    };
  }

  static async createAppointment(
    request: AppointmentRequest,
    workshop: string,
    language: Language = 'pt-BR'
  ): Promise<AppointmentResponse> {
    const response = await fetchWithTimeout(
      `${API_BASE_URL}/appointments?workshop=${encodeURIComponent(workshop)}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': language,
        },
        body: JSON.stringify(request),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to create appointment');
    }

    return response.json();
  }

  static async getAvailableTimeSlots(
    date: string,
    workshop: string,
    language: Language = 'pt-BR'
  ): Promise<AvailableTimeSlot> {
    const response = await fetchWithTimeout(
      `${API_BASE_URL}/appointments/available-slots?date=${date}&workshop=${encodeURIComponent(workshop)}`,
      {
        headers: {
          'Accept-Language': language,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch available time slots');
    }

    return response.json();
  }

  static async getAllAppointments(
    workshop: string,
    language: Language = 'pt-BR'
  ): Promise<AppointmentResponse[]> {
    const response = await fetchWithTimeout(
      `${API_BASE_URL}/appointments?workshop=${encodeURIComponent(workshop)}`,
      {
        headers: {
          'Accept-Language': language,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch appointments');
    }

    return response.json();
  }
}