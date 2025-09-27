import { VehicleCatalog } from '../types/vehicle';
import { Language } from '../types/i18n';

const API_BASE_URL = 'http://localhost:8080/api';

export class VehicleCatalogService {
  static async getVehicleCatalog(
    workshop: string,
    language: Language = 'pt-BR'
  ): Promise<VehicleCatalog> {
    const response = await fetch(`${API_BASE_URL}/vehicle-catalog?workshop=${encodeURIComponent(workshop)}`, {
      headers: {
        'Accept-Language': language,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch vehicle catalog');
    }

    return response.json();
  }
}