import { API_PATHS } from '../../../constants';
import { SeatResponse } from '../../types';

export const getAvailableSeats = async (
  travelId: number,
  cityInitId: number,
  cityEndId: number
): Promise<SeatResponse> => {
  try {
    const response = await fetch(API_PATHS.AVAILABLE_SEATS(travelId, cityInitId, cityEndId), {
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
      throw new Error('Error al obtener los asientos disponibles');
    }
    
    return await response.json();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching available seats:', error);
    throw error;
  }
};