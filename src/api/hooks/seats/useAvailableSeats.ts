import { useEffect, useState } from 'react';
import { SeatResponse } from '../../types';
import { getAvailableSeats } from '../../services';

const useAvailableSeats = (
  travelId: number | null,
  cityInitId: number | null,
  cityEndId: number | null
) => {
  const [seats, setSeats] = useState<SeatResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSeats = async () => {
      if (!travelId || !cityInitId || !cityEndId) return;

      setLoading(true);
      setError(null);

      try {
        const seatsData = await getAvailableSeats(travelId, cityInitId, cityEndId);
        setSeats(seatsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido al obtener asientos');
      } finally {
        setLoading(false);
      }
    };

    fetchSeats();
  }, [travelId, cityInitId, cityEndId]);

  return { seats, loading, error };
};

export {useAvailableSeats};