import { API_PATHS } from '../../../constants';
import { DepartureTravelFilters, DepartureTravelsResponse } from '../../types';

export const listDepartureTravels = async (
  filters: DepartureTravelFilters,
  limit: number = 25,
  page: number = 1
): Promise<DepartureTravelsResponse> => {
  const response = await fetch(
    `${API_PATHS.DEPARTURE_TRAVELS}?isMultiRoute=true&isReturn=false`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        limit,
        page,
        filters,
      }),
    }
  );
  if (!response.ok) {
    throw new Error('Error al listar los viajes de salida');
  }
  
  const responseData = await response.json();

  return responseData;
};