import { API_PATHS } from '../../../constants';
import { PassengerType} from '../../types';

export const getPassengerTypes = async (): Promise<PassengerType[]> => {
  try {
    const response = await fetch(API_PATHS.PASSENGER_TYPES, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Accept-Language': 'es',
        'Origin': 'https://web.local.onroadts.com',
        'Referer': 'https://web.local.onroadts.com/',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36',
      },
    });
    
    if (!response.ok) {
      throw new Error('Error al obtener los tipos de pasajero');
    }
    
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching passenger types:', error);
    
    return [
      { id: 218, name: 'Senior(s)', default: false, ageMin: 60, ageMax: 99 },
      { id: 219, name: 'Adulto(s)', default: false, ageMin: 11, ageMax: 98 },
      { id: 220, name: 'Niño(s)', default: false, ageMin: 4, ageMax: 10 },
    ];
  }
 
};