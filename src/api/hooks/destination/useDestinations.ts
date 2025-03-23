import { useState, useCallback } from 'react';
import { searchDestinations } from '../../services';
import { Destination } from '../../types';

const useSearchDestinations = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loadingDestination, setLoading] = useState(false);
  const [errorDestination, setError] = useState<string | null>(null);

  const searchDestination = useCallback(async (cityInitId: number, value: string) => {
    if (value.length < 3) return;

    setLoading(true);
    setError(null);

    try {
      const response = await searchDestinations(cityInitId, value);
      setDestinations(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  }, []);

  return { destinations, loadingDestination, errorDestination, searchDestination };
};

export {useSearchDestinations};