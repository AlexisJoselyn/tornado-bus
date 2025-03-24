import { useState, useCallback } from 'react';
import { listDepartureTravels } from '../../services';
import { DepartureTravelFilters, DepartureTravelsResponse } from '../../types';

const useDepartureTravels = () => {
  const [travels, setTravels] = useState<DepartureTravelsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = useCallback(
    async (filters: DepartureTravelFilters, limit: number = 25, page: number = 1) => {
      setLoading(true);
      setError(null);

      try {
        const response = await listDepartureTravels(filters, limit, page);
        setTravels(response);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    },
    []
  );
  return { travels, loading, error, search };
};

export { useDepartureTravels };