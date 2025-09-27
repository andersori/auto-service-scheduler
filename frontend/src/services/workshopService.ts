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
        description: language === 'pt-BR' 
          ? 'Oficina especializada em serviços automotivos completos com mais de 20 anos de experiência.' 
          : 'Workshop specialized in complete automotive services with over 20 years of experience.',
        hours: language === 'pt-BR' 
          ? 'Segunda à Sexta: 8h às 18h | Sábado: 8h às 12h'
          : 'Monday to Friday: 8am to 6pm | Saturday: 8am to 12pm',
        services: language === 'pt-BR'
          ? ['Troca de óleo', 'Revisão completa', 'Freios', 'Suspensão', 'Alinhamento']
          : ['Oil change', 'Full service', 'Brakes', 'Suspension', 'Alignment'],
        rating: 4.8
      },
      {
        id: 'oficina-zona-sul',
        name: 'AutoService Zona Sul',
        address: 'Av. Paulista, 456 - Zona Sul - São Paulo, SP',
        phone: '(11) 2345-6789',
        description: language === 'pt-BR'
          ? 'Moderna oficina com equipamentos de última geração e atendimento personalizado.'
          : 'Modern workshop with state-of-the-art equipment and personalized service.',
        hours: language === 'pt-BR'
          ? 'Segunda à Sexta: 7h30 às 18h30 | Sábado: 8h às 13h'
          : 'Monday to Friday: 7:30am to 6:30pm | Saturday: 8am to 1pm',
        services: language === 'pt-BR'
          ? ['Alinhamento', 'Balanceamento', 'Ar condicionado', 'Elétrica', 'Diagnóstico']
          : ['Alignment', 'Balancing', 'Air conditioning', 'Electrical', 'Diagnostics'],
        rating: 4.6
      },
      {
        id: 'oficina-zona-norte',
        name: 'AutoService Zona Norte',
        address: 'Rua dos Automóveis, 789 - Zona Norte - São Paulo, SP',
        phone: '(11) 1234-5678',
        description: language === 'pt-BR'
          ? 'Especializada em veículos nacionais e importados com preços competitivos.'
          : 'Specialized in national and imported vehicles with competitive prices.',
        hours: language === 'pt-BR'
          ? 'Segunda à Sexta: 8h às 17h | Sábado: 8h às 12h'
          : 'Monday to Friday: 8am to 5pm | Saturday: 8am to 12pm',
        services: language === 'pt-BR'
          ? ['Troca de pneus', 'Diagnóstico', 'Mecânica geral', 'Funilaria', 'Pintura']
          : ['Tire replacement', 'Diagnostics', 'General mechanics', 'Body work', 'Painting'],
        rating: 4.3
      }
    ];
  }
}