import { useEffect, useState } from 'react';
import { DepartureTravel, useDepartureTravels } from '../../api';
import { useTripStore } from '../../store';
import { TripForm } from '../form';
import { formatDateToYYYYMMDD } from '../../lib';
import { TravelCard } from '../travelCard';
import { Banner } from '../banner';

export const Travel = () => {
  const [departureTravels, setDepartureTravels] = useState<DepartureTravel[]>([]);
  const [loadingTravels, setLoadingTravels] = useState(false);
  const [errorTravels, setErrorTravels] = useState<string | null>(null);

  const { travels, search } = useDepartureTravels();

  const { date, totalPassengers, originId, destinationId } = useTripStore();

  const handleFormSubmit = async () => {
    try {
      setLoadingTravels(true);
      setErrorTravels(null);

      if (originId === null || destinationId === null || !date || totalPassengers === 0) {
        throw new Error('Debes completar todos los campos');
      }

      const filters = {
        date: formatDateToYYYYMMDD(date),
        city: [originId, destinationId] as [number, number],
        passengerNumber: totalPassengers,
        passengerDisabilityNumber: 0,
        orderTravel: 1060,
        orderMaxMinTravel: 1,
        isPoint: false,
        currencyID: 567,
        externalInitId: 0,
        externalEndId: 0,
        routeID: null,
        _rowId: null,
      };

      await search(filters);
    } catch (err) {
      setErrorTravels(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoadingTravels(false);
    }
  };

  useEffect(() => {
    if (travels && travels.data) {
      setDepartureTravels(travels.data);
    }
  }, [travels]);


  return (
    <div className='flex flex-col'>
      <Banner />
      <TripForm onSubmit={handleFormSubmit} />
      {loadingTravels && <p>Cargando...</p>}
      {errorTravels && <p>Error: {errorTravels}</p>}
      {departureTravels.map((travel, index) => (
        <TravelCard key={index} travel={travel} />
      ))}
    </div>
  );
};