import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTripStore } from '../../store';

interface TripSearchData {
    origin: string;
    destination: string;
    date: string | Date;
    passengers: number;
  }

const today = new Date();
today.setHours(0, 0, 0, 0);

const schema = yup.object().shape({
  origin: yup.string().required('El origen es obligatorio'),
  destination: yup.string().required('El destino es obligatorio'),
  date: yup.date().min(today , 'La fecha no puede ser pasada').required('La fecha es obligatoria'),
  passengers: yup.number().min(1, 'Debe haber al menos un pasajero').required('Este campo es obligatorio'),
});

export const TripSearchForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const setTripSearch = useTripStore((state)=>state.setTripData);

  const onSubmit = (data: TripSearchData) => {
    setTripSearch(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 p-4 border rounded-lg">
      <div>
        <label>Origen:</label>
        <input {...register('origin')} className="border p-2 w-full" />
        {errors.origin && <p className="text-red-500 text-sm">{errors.origin.message}</p>}
      </div>
  
      <div>
        <label>Destino:</label>
        <input {...register('destination')} className="border p-2 w-full" />
        {errors.destination && <p className="text-red-500 text-sm">{errors.destination.message}</p>}
      </div>
  
      <div>
        <label>Fecha:</label>
        <input type="date" {...register('date')} className="border p-2 w-full" />
        {errors.date && <p className="text-red-500 text-sm">{errors.date.message}</p>}
      </div>
  
      <div>
        <label>Pasajeros:</label>
        <input type="number" {...register('passengers')} className="border p-2 w-full" />
        {errors.passengers && <p className="text-red-500 text-sm">{errors.passengers.message}</p>}
      </div>
  
      <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-700">Buscar</button>
    </form>
  );
};