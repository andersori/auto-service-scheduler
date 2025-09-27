import { VehicleCatalogResponse } from '../types/vehicle';
import { Language } from '../types/i18n';
import { fetchWithTimeout } from './httpRequestService';

const API_BASE_URL = 'http://localhost:8080/api';

export class VehicleCatalogService {

  static getDefaultVehicleCatalog(): VehicleCatalogResponse {
    return {
      vehicleCatalog: {
        Toyota: ["Corolla", "Hilux", "Yaris", "Etios", "SW4", "RAV4", "Camry"],
        Volkswagen: ["Gol", "Polo", "Virtus", "T-Cross", "Nivus", "Saveiro", "Jetta"],
        Ford: ["Ka", "Fiesta", "Focus", "EcoSport", "Ranger", "Fusion", "Edge"],
        Chevrolet: ["Onix", "Prisma", "S10", "Tracker", "Spin", "Cruze", "Cobalt"],
        Honda: ["Civic", "Fit", "HR-V", "City", "WR-V", "CR-V"],
        Hyundai: ["HB20", "Creta", "Tucson", "Santa Fe", "ix35"],
        Nissan: ["Kicks", "Versa", "March", "Sentra", "Frontier"]
      }
    };
  }

  static async getVehicleCatalog(
    workshop: string,
    language: Language = 'pt-BR'
  ): Promise<VehicleCatalogResponse> {
    const response = await fetchWithTimeout(`${API_BASE_URL}/vehicle-catalog?workshop=${encodeURIComponent(workshop)}`, {
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