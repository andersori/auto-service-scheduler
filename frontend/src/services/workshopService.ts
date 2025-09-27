import { fetchWithTimeout } from './httpRequestService';

const API_BASE_URL = 'http://localhost:8080/api';

export interface Workshop {
  id: string;
  name: string;
  address: string;
  phone: string;
  description: string;
  hours: string;
  services: string[];
  rating: number;
  registrationLanguage: string;
}

export class WorkshopService {
  static async getAllWorkshops(language: string = 'pt-BR'): Promise<Workshop[]> {
    const response = await fetchWithTimeout(`${API_BASE_URL}/workshops`, {
      method: 'GET',
      headers: {
        'Accept-Language': language,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch workshops');
    }

    return response.json();
  }

  static async getWorkshopById(workshopId: string, language: string = 'pt-BR'): Promise<Workshop> {
    const response = await fetchWithTimeout(`${API_BASE_URL}/workshops/${encodeURIComponent(workshopId)}`, {
      method: 'GET',
      headers: {
        'Accept-Language': language,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch workshop');
    }

    return response.json();
  }

  // Fallback mock data for when the backend is not available
  static getDefaultWorkshops(language: string = 'pt-BR'): Workshop[] {
    return [
      {
        id: 'oficina-centro',
        name: 'AutoService Centro',
        address: 'Rua das Flores, 123 - Centro - São Paulo, SP',
        phone: '(11) 3456-7890',
        description: 'Oficina especializada em serviços automotivos completos com mais de 20 anos de experiência.',
        hours: 'Segunda à Sexta: 8h às 18h | Sábado: 8h às 12h',
        services: ['Troca de óleo', 'Revisão completa', 'Freios', 'Suspensão', 'Alinhamento'],
        rating: 4.8,
        registrationLanguage: 'pt-BR'
      },
      {
        id: 'oficina-zona-sul',
        name: 'AutoService Zona Sul',
        address: 'Av. Paulista, 456 - Zona Sul - São Paulo, SP',
        phone: '(11) 2345-6789',
        description: 'Moderna oficina com equipamentos de última geração e atendimento personalizado.',
        hours: 'Segunda à Sexta: 7h30 às 18h30 | Sábado: 8h às 13h',
        services: ['Alinhamento', 'Balanceamento', 'Ar condicionado', 'Elétrica', 'Diagnóstico'],
        rating: 4.6,
        registrationLanguage: 'pt-BR'
      },
      {
        id: 'oficina-zona-norte',
        name: 'AutoService Zona Norte',
        address: 'Rua dos Automóveis, 789 - Zona Norte - São Paulo, SP',
        phone: '(11) 1234-5678',
        description: 'Specialized in national and imported vehicles with competitive prices.',
        hours: 'Monday to Friday: 8am to 5pm | Saturday: 8am to 12pm',
        services: ['Tire replacement', 'Diagnostics', 'General mechanics', 'Body work', 'Painting'],
        rating: 4.3,
        registrationLanguage: 'en-US'
      }
    ];
  }
}