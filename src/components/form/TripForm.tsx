import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { usePassengerTypes, useSearchCities, useSearchDestinations } from '../../api';
import { PassengerSelector } from '../passenger';
import { useTripStore } from '../../store';

interface TripFormProps {
  onSubmit: () => void;
}

const today = new Date();
today.setHours(0, 0, 0, 0);

const schema = yup.object().shape({
  tripType: yup.string().notRequired(),
  origin: yup.string().required('El origen es obligatorio'),
  destination: yup.string().required('El destino es obligatorio'),
  passenger: yup.string().required('Este campo es obligatorio'),
  date: yup
    .date()
    .min(today, 'La fecha no puede ser pasada')
    .required('La fecha es obligatoria'),
  returnDate: yup.date()
    .when('tripType', {
      is: 'round-trip',
      then: schema => schema.min(today, 'La fecha no puede ser pasada').required('La fecha de retorno es obligatoria'),
    })
});

export const TripForm = ({ onSubmit }: TripFormProps) => {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      tripType: 'one-way',
    },
  });

  const tripType = watch('tripType');
  const date = watch('date');

  const origin = watch('origin');
  const [selectedOriginId, setSelectedOriginId] = useState<number | null>(null);
  const { cities, loading, error, search } = useSearchCities();
  const [showOriginDropdown, setShowOriginDropdown] = useState(false);

  const destination = watch('destination');
  const { destinations, loadingDestination, errorDestination, searchDestination } = useSearchDestinations();
  const [showDestinationDropdown, setShowDestinationDropdown] = useState(false);
  const [destinationDisabled, setDestinationDisabled] = useState(true);

  const { passengerTypes, loading: loadingPassengerTypes, error: errorPassengerTypes } = usePassengerTypes();
  const [passengerCounts, setPassengerCounts] = useState<{ [key: number]: number }>({});
  const [showPassengerDropdown, setShowPassengerDropdown] = useState(false);
  const [passengerDisabled, setPassengerDisabled] = useState(true);

  const formatPassengerCounts = (counts: { [key: number]: number }, types: typeof passengerTypes): string => {
    return types
      .map((type) => {
        const count = counts[type.id] || 0;
        return count > 0 ? `${count} ${type.name}` : null;
      })
      .filter(Boolean)
      .join(', ');
  };

  const passengerSummary = formatPassengerCounts(passengerCounts, passengerTypes);

  const [dateDisabled, setDateDisabled] = useState(true);


  const setTripData = useTripStore((state) => state.setTripData);

  useEffect(() => {
    if (origin && origin.length >= 3) {
      search(origin);
      setShowOriginDropdown(true);
    } else {
      setShowOriginDropdown(false);
    }
  }, [origin, search]);

  useEffect(() => {
    if (destination && destination.length >= 3 && selectedOriginId) {
      searchDestination(selectedOriginId, destination);
      setShowDestinationDropdown(true);
    } else {
      setShowDestinationDropdown(false);
    }
  }, [destination, searchDestination, selectedOriginId]);

  const handleCitySelection = (cityName: string, cityId: number) => {
    setShowOriginDropdown(false);
    setValue('origin', cityName);
    setSelectedOriginId(cityId);
    setTripData({
      origin: cityName,
      originId: cityId,
    });
    setDestinationDisabled(false);
  };

  const handleDestinationSelection = (destinationName: string, destinationId: number) => {
    setShowDestinationDropdown(false);
    setValue('destination', destinationName);
    setTripData({
      destination: destinationName,
      destinationId,
    });
    setPassengerDisabled(false);
  };

  const handlePassengerChange = (typeId: number, count: number) => {
    const newCounts = { ...passengerCounts, [typeId]: count };
    setPassengerCounts(newCounts);
    setValue('passenger', formatPassengerCounts(newCounts, passengerTypes));
    setTripData({
      totalPassengers: Object.values(newCounts).reduce((acc, count) => acc + count, 0),
    });
    setDateDisabled(false);
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = new Date(event.target.value);
    setTripData({ date: selectedDate });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 p-4 border border-gray-300 rounded-lg bg-white shadow-md z-10 mb-8"
    >
      <div className="flex gap-4">
        <label className="flex items-center gap-1 text-gray-700">
          <input type="radio" value="one-way" {...register('tripType')} className="accent-[color:var(--primary-orange)]" /> Solo ida
        </label>
        <label className="flex items-center gap-1 text-gray-700">
          <input type="radio" value="round-trip" {...register('tripType')} className="accent-[color:var(--primary-orange)]" /> Ida y vuelta
        </label>
      </div>
  
      <div className="relative">
        <label className="block font-semibold text-gray-800">Origen:</label>
        <input
          {...register('origin')}
          className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-[color:var(--primary-blue)]"
          placeholder="¿De dónde partes?"
        />
        {errors.origin && <p className="text-[color:var(--primary-orange)] text-sm">{errors.origin.message}</p>}
  
        {showOriginDropdown && (
          <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg mt-1">
            {cities.length > 0 ? (
              cities.map((city) => (
                <div
                  key={city.id}
                  className="p-2 text-[color:var(--primary-blue)] cursor-pointer hover:bg-gray-100 hover:border-l-4 hover:border-[color:var(--primary-orange)] transition"
                  onClick={() => handleCitySelection(city.name, city.id)}
                >
                  {city.name}
                </div>
              ))
            ) : (
              <div className="p-2 text-gray-500">No se encontraron coincidencias.</div>
            )}
          </div>
        )}
  
        {loading && <p className="text-sm text-gray-500">Buscando ciudades...</p>}
        {error && <p className="text-sm text-[color:var(--primary-orange)]">{error}</p>}
      </div>
  
      <div className="relative">
        <label className="block font-semibold text-gray-800">Destino:</label>
        <input
          {...register('destination')}
          className={`border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-[color:var(--primary-blue)] ${destinationDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          placeholder="¿A dónde vas?"
          disabled={destinationDisabled}
        />
        {errors.destination && <p className="text-[color:var(--primary-orange)] text-sm">{errors.destination.message}</p>}
  
        {showDestinationDropdown && (
          <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg mt-1">
            {destinations.length > 0 ? (
              destinations.map((destination) => (
                <div
                  key={destination.id}
                  className="p-2 text-[color:var(--primary-blue)] cursor-pointer hover:bg-gray-100 hover:border-l-4 hover:border-[color:var(--primary-orange)] transition"
                  onClick={() => handleDestinationSelection(destination.name, destination.id)}
                >
                  {destination.name}
                </div>
              ))
            ) : (
              <div className="p-2 text-gray-500">No se encontraron coincidencias.</div>
            )}
          </div>
        )}
  
        {loadingDestination && <p className="text-sm text-gray-500">Buscando destinos...</p>}
        {errorDestination && <p className="text-sm text-[color:var(--primary-orange)]">{errorDestination}</p>}
      </div>
  
      <div className="relative">
        <label className="block font-semibold text-gray-800">Pasajeros:</label>
        <input
          {...register('passenger')}
          className={`border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-[color:var(--primary-blue)] ${passengerDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          placeholder="¿Cuántos viajan?"
          value={passengerSummary}
          readOnly
          onClick={() => setShowPassengerDropdown(!showPassengerDropdown)}
          disabled={passengerDisabled}
        />
        {errors.passenger && <p className="text-[color:var(--primary-orange)] text-sm">{errors.passenger.message}</p>}
  
        {showPassengerDropdown && (
          <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg mt-1">
            {loadingPassengerTypes ? (
              <p className="text-sm text-gray-500">Cargando tipos de pasajero...</p>
            ) : errorPassengerTypes ? (
              <p className="text-sm text-[color:var(--primary-orange)]">{errorPassengerTypes}</p>
            ) : (
              <PassengerSelector
                passengerTypes={passengerTypes}
                onPassengerChange={handlePassengerChange}
              />
            )}
          </div>
        )}
      </div>
  
      <div>
        <label className="block font-semibold text-gray-800">Selecciona tu fecha de salida:</label>
        <input
          type="date"
          {...register('date')}
          className={`border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-[color:var(--primary-blue)] ${dateDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          min={today.toISOString().split('T')[0]}
          onChange={handleDateChange}
          disabled={dateDisabled}
        />
      </div>

      {tripType === 'round-trip' && (
        <div>
          <label className="block font-semibold text-gray-800">Selecciona tu fecha de regreso:</label>
          <input
            type="date"
            {...register('returnDate')}
            className={`border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-[color:var(--primary-blue)] ${dateDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            min={date ? new Date(date).toISOString().split('T')[0] : today.toISOString().split('T')[0]}
            disabled={dateDisabled}
          />
        </div>
      )}
  
      <button
        type="submit"
        className="bg-[color:var(--primary-blue)] text-white p-2 rounded-md hover:bg-opacity-80 transition font-semibold"
      >
        Buscar
      </button>
    </form>
  );  
};