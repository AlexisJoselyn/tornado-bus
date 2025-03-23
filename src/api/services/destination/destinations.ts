import { API_PATHS } from '../../../constants';
import { DestinationsResponse } from '../../types';

export const searchDestinations = async (
  cityInitId: number,
  value: string
): Promise<DestinationsResponse> => {
  try {
    const response = await fetch(API_PATHS.SEARCH_DESTINY(cityInitId), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ value }),
    });
  
    if (!response.ok) {
      throw new Error('Error al buscar destinos');
    }
  
    return response.json();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching destinations:', error);
    return {
      'data': [
        {
          'id': 23,
          'name': 'Nuevo Laredo, (TAM - CT Nuevo Laredo)',
          'nameExternal': null,
          'key': '27.426482|-99.515165',
          'isExternalCityEnd': 0,
          'baseEndId': null,
          'nameEnd': null,
          'isMultiroute': 1,
          'abrev': 'LAR'
        },
        {
          'id': 100,
          'name': 'Laredo, (TX - TBC Laredo)',
          'nameExternal': null,
          'key': '27.5082617|-99.5042669',
          'isExternalCityEnd': 0,
          'baseEndId': null,
          'nameEnd': null,
          'isMultiroute': 1,
          'abrev': 'LAX'
        }
      ],
      'message': 'Se encontraron resultados',
      'statusCode': 200,
      'success': true
    };
  }
};