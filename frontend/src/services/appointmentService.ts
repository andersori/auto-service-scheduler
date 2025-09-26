import { AppointmentRequest, AppointmentResponse, AvailableTimeSlot } from '../types/appointment';

const API_BASE_URL = 'http://localhost:8080/api';

export class AppointmentService {
  static async createAppointment(request: AppointmentRequest): Promise<AppointmentResponse> {
    const response = await fetch(`${API_BASE_URL}/appointments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error('Failed to create appointment');
    }

    return response.json();
  }

  static async getAvailableTimeSlots(date: string): Promise<AvailableTimeSlot> {
    const response = await fetch(`${API_BASE_URL}/appointments/available-slots?date=${date}`);

    if (!response.ok) {
      throw new Error('Failed to fetch available time slots');
    }

    return response.json();
  }

  static async getAllAppointments(): Promise<AppointmentResponse[]> {
    const response = await fetch(`${API_BASE_URL}/appointments`);

    if (!response.ok) {
      throw new Error('Failed to fetch appointments');
    }

    return response.json();
  }
}