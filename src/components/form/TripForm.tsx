import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTripStore } from '../../store';
import { useEffect, useState } from 'react';
import { useSearchCities, useSearchDestinations } from '../../api';

interface TripSearchData {
  origin: string;
  destination: string;
  passenger: number;
  date: string | Date;
  returnDate?: string | Date;
}

const today = new Date();
today.setHours(0, 0, 0, 0);

const schema = yup.object().shape({
  tripType: yup.string().notRequired(),
  origin: yup.string().required('El origen es obligatorio'),
  destination: yup.string().required('El destino es obligatorio'),
  passenger: yup.number().min(1, 'Debe haber al menos un pasajero').required('Este campo es obligatorio'),
  date: yup
    .date()
    .min(today, 'La fecha no puede ser pasada')
    .required('La fecha es obligatoria'),
  returnDate: yup.date()
    .when('tripType', {
      is:'round-trip',
      then: schema => schema.min(today, 'la fecha no puede ser pasada').required('La fecha de retorno es obligatoria')
    })
});

export const TripForm = () => {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const setTripSearch = useTripStore((state) => state.setTripData);

  // const tripType = watch('tripType');

  const origin = watch('origin');
  const [selectedOriginId, setSelectedOriginId] = useState<number | null>(null);
  const { cities, loading, error, search } = useSearchCities();
  const [showOriginDropdown, setShowOriginDropdown] = useState(false);

  const destination = watch('destination');
  const { destinations, loadingDestination, errorDestination, searchDestination } = useSearchDestinations();
  const [showDestinationDropdown, setShowDestinationDropdown] = useState(false);

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

  const onSubmit = (data: TripSearchData) => {
    setTripSearch(data);
  };

  const handleCitySelection = (cityName: string, cityId: number) => {
    setShowOriginDropdown(false);
    setValue('origin', cityName);
    setSelectedOriginId(cityId);
  };

  const handleDestinationSelection = (destinationName: string) => {
    setShowDestinationDropdown(false);
    setValue('destination', destinationName);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 p-4 border rounded-lg bg-white shadow-md"
    >
      <div className="flex gap-4">
        <label className="flex items-center gap-1">
          <input type="radio" value="one-way" {...register('tripType')} /> One way only
        </label>
        <label className="flex items-center gap-1">
          <input type="radio" value="round-trip" {...register('tripType')} /> Round trip
        </label>
      </div>
        
      <div className="relative">
        <label className="block font-semibold">Origen:</label>
        <input
          {...register('origin')}
          className="border p-2 w-full rounded-md"
          placeholder="Busca una ciudad"
        />
        {errors.origin && <p className="text-red-500 text-sm">{errors.origin.message}</p>}

        {/* Lista desplegable de ciudades */}
        {showOriginDropdown && (
          <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg mt-1">
            {cities.length > 0 ? (
              cities.map((city) => (
                <div
                  key={city.id}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
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
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>

      <div className="relative">
        <label className="block font-semibold">Destino:</label>
        <input
          {...register('destination')}
          className="border p-2 w-full rounded-md"
          placeholder="Busca una ciudad de destino"
        />
        {errors.destination && <p className="text-red-500 text-sm">{errors.destination.message}</p>}

        {/* Lista desplegable de ciudades */}
        {showDestinationDropdown && (
          <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg mt-1">
            {destinations.length > 0 ? (
              destinations.map((destination) => (
                <div
                  key={destination.id}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleDestinationSelection(destination.name)}
                >
                  {destination.name}
                </div>
              ))
            ) : (
              <div className="p-2 text-gray-500">No se encontraron coincidencias.</div>
            )}
          </div>
        )}

        {loadingDestination && <p className="text-sm text-gray-500">Buscando ciudades...</p>}
        {errorDestination && <p className="text-sm text-red-500">{error}</p>}
      </div>
      
      {/*
      <div>
        <label className="block font-semibold">Fecha:</label>
        <input type="date" {...register('date')} className="border p-2 w-full rounded-md" />
        {errors.date && <p className="text-red-500 text-sm">{errors.date.message}</p>}
      </div>

      <div>
        <label className="block font-semibold">Pasajeros:</label>
        <input type="number" {...register('passengers')} className="border p-2 w-full rounded-md" />
        {errors.passengers && <p className="text-red-500 text-sm">{errors.passengers.message}</p>}
      </div> */}

      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700 transition"
      >
        Buscar
      </button>
    </form>
  );
};
