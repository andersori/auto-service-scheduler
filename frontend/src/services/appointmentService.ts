import { AppointmentRequest, AppointmentResponse, AvailableTimeSlot } from '../types/appointment';
import { Language } from '../types/i18n';

const API_BASE_URL = 'http://localhost:8080/api';

export class AppointmentService {
  static async createAppointment(
    request: AppointmentRequest, 
    workshop: string,
    language: Language = 'pt-BR'
  ): Promise<AppointmentResponse> {
    const response = await fetch(`${API_BASE_URL}/appointments?workshop=${encodeURIComponent(workshop)}`, {
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

  static async getAvailableTimeSlots(
    date: string, 
    workshop: string,
    language: Language = 'pt-BR'
  ): Promise<AvailableTimeSlot> {
    const response = await fetch(`${API_BASE_URL}/appointments/available-slots?date=${date}&workshop=${encodeURIComponent(workshop)}`, {
      headers: {
        'Accept-Language': language,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch available time slots');
    }

    return response.json();
  }

  static async getAllAppointments(
    workshop: string,
    language: Language = 'pt-BR'
  ): Promise<AppointmentResponse[]> {
    const response = await fetch(`${API_BASE_URL}/appointments?workshop=${encodeURIComponent(workshop)}`, {
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