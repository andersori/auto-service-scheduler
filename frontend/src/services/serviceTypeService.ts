import { ServiceType } from '../types/appointment';

const API_BASE_URL = 'http://localhost:8080/api';

export class ServiceTypeService {
  static async getActiveServiceTypes(): Promise<ServiceType[]> {
    const response = await fetch(`${API_BASE_URL}/service-types/active`);

    if (!response.ok) {
      throw new Error('Failed to fetch service types');
    }

    return response.json();
  }
}