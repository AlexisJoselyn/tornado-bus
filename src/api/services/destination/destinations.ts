import { API_PATHS } from '../../../constants';
import { DestinationsResponse } from '../../types';

export const searchDestinations = async (
  cityInitId: number,
  value: string
): Promise<DestinationsResponse> => {
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
};