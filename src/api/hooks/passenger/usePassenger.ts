import { useEffect, useState } from 'react';
import { PassengerType } from '../../types';
import { getPassengerTypes } from '../../services';

const usePassengerTypes = () => {
  const [passengerTypes, setPassengerTypes] = useState<PassengerType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPassengerTypes = async () => {
      setLoading(true);
      setError(null);

      try {
        const types = await getPassengerTypes();
        setPassengerTypes(types);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    fetchPassengerTypes();
  }, []);

  return { passengerTypes, loading, error };
};

export {usePassengerTypes};