import { ServiceType } from '../types/appointment';
import { fetchWithTimeout } from './httpRequestService';

const API_BASE_URL = 'http://localhost:8080/api';

export class ServiceTypeService {
  static getDefaultServiceTypes() : ServiceType[] {
    return [
      { id: 1, name: "Troca de Óleo" },
      { id: 2, name: "Alinhamento" },
      { id: 3, name: "Balanceamento" },
      { id: 4, name: "Revisão" },
      { id: 5, name: "Freios" },
      { id: 6, name: "Suspensão" },
      { id: 7, name: "Ar Condicionado" }
    ];
  }

  static async getActiveServiceTypes(workshop: string): Promise<ServiceType[]> {
    const response = await fetchWithTimeout(`${API_BASE_URL}/service-types/active?workshop=${encodeURIComponent(workshop)}`);

    if (!response.ok) {
      throw new Error('Failed to fetch service types');
    }

    return response.json();
  }
}