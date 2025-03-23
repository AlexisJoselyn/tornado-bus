import { useState, useCallback } from 'react';
import { searchCities } from '../../services';
import { City } from '../../types';

const useSearchCities = () => {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = useCallback(async (value: string) => {
    if (value.length < 3) return;

    setLoading(true);
    setError(null);

    try {
      const response = await searchCities(value);
      setCities(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  },[]);

  return { cities, loading, error, search };
};

export { useSearchCities };