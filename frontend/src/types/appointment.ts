export interface AppointmentRequest {
  clientName: string;
  clientPhone: string;
  vehicleBrand: string;
  vehicleModel: string;
  vehicleYear: number;
  serviceTypes: string[];
  appointmentDate: string;
}

export type AppointmentStatus =
  | 'CREATED'
  | 'PENDING_CONFIRMATION'
  | 'CONFIRMED'
  | 'COMPLETED'
  | 'CANCELLED';

export interface AppointmentResponse {
  id: number;
  clientName: string;
  clientPhone: string;
  vehicleBrand: string;
  vehicleModel: string;
  vehicleYear: number;
  serviceTypes: string[];
  appointmentDate: string;
  createdAt: string;
  status: AppointmentStatus;
}

export interface AvailableTimeSlot {
  date: string;
  timeSlots: string[];
}

export interface ServiceType {
  id: number;
  name: string;
}

export interface FormData {
  clientName: string;
  clientPhone: string;
  vehicleBrand: string;
  vehicleModel: string;
  vehicleYear: string;
  serviceTypes: string[];
  appointmentDate: string;
  appointmentTime: string;
  branchId?: string; // Optional for backward compatibility
}