import { AppointmentRequest, AppointmentResponse, AvailableTimeSlot } from '../types/appointment';
import { Language } from '../types/i18n';

const API_BASE_URL = 'http://localhost:8080/api';

export class AppointmentService {
  static async createAppointment(request: AppointmentRequest, language: Language = 'pt-BR'): Promise<AppointmentResponse> {
    const response = await fetch(`${API_BASE_URL}/appointments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept-Language': language,
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error('Failed to create appointment');
    }

    return response.json();
  }

  static async getAvailableTimeSlots(date: string, language: Language = 'pt-BR'): Promise<AvailableTimeSlot> {
    const response = await fetch(`${API_BASE_URL}/appointments/available-slots?date=${date}`, {
      headers: {
        'Accept-Language': language,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch available time slots');
    }

    return response.json();
  }

  static async getAllAppointments(language: Language = 'pt-BR'): Promise<AppointmentResponse[]> {
    const response = await fetch(`${API_BASE_URL}/appointments`, {
      headers: {
        'Accept-Language': language,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch appointments');
    }

    return response.json();
  }
}