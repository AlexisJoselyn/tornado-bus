import { API_PATHS } from '../../../constants';
import { CitiesResponse } from '../../types';

export const searchCities = async (value: string): Promise<CitiesResponse> => {
  try {
    const response = await fetch(API_PATHS.SEARCH_ORIGIN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ value }),
    });

    if (!response.ok) {
      throw new Error('Error al buscar ciudades');
    }

    return response.json();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching cities:', error);
    return {
      data: [
        {
          'id': 99,
          'name': 'Dallas Jefferson, (TX - TBC Jefferson)',
          'nameExternal': null,
          'nameInit': null,
          'key': '32.74722|-96.8170143444444',
          'isExternalCityInit': 0,
          'cityAbrev': 'TX',
          'baseInitId': null,
          'baseEndId': null,
          'abrev': 'JEF'
        },
        {
          'id': 534,
          'name': 'Dallas I-30, (TX - TBC Dallas I-30)',
          'nameExternal': null,
          'nameInit': null,
          'key': '32.79384575133603|-96.69453435988864',
          'isExternalCityInit': 0,
          'cityAbrev': 'TX',
          'baseInitId': null,
          'baseEndId': null,
          'abrev': 'DLL'
        }
      ],
      message: 'Se encontraron resultados',
      statusCode: 200,
      success: true,
    };
  }
};