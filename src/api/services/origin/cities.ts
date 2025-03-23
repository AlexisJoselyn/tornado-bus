import { CitiesResponse } from '../../types';

export const searchCities = async (value: string): Promise<CitiesResponse> => {
  const response = await fetch('https://discovery.local.onroadts.com/v1/web/select/origin', {
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
};