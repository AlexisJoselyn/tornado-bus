import { DepartureTravel } from '../../api';
import arrow from '../../assets/arrow.png';
import { MapPin } from 'lucide-react';

interface TravelCardProps {
    travel: DepartureTravel;
}

export const TravelCard = ({ travel }: TravelCardProps) => {
  return (
    <div className="border rounded-lg p-4 mb-4 shadow-sm bg-white">
      <div className="flex justify-between items-center mb-4">
        <div className="flex-1 text-left">
          <h3 className="sm:text-base text-sm font-semibold text-gray-800 w-full">{travel.cityInit}</h3>
          <p className="text-xs text-gray-600 w-full">{travel.HourInitFormat}</p>
          <p className="text-[10px] text-gray-400 flex items-center gap-1 w-full">
            <MapPin className="text-[color:var(--primary-orange)] w-4 h-4 flex-shrink-0" />
            <span className="truncate">{travel.addressInit}</span>
          </p>
        </div>
        <div className="flex-1 flex flex-col items-center">
          <p className="text-sm text-gray-500">{travel.travelTime}</p>
          <img 
            src={arrow} 
            alt="Flecha" 
            className="h-4 w-4 mx-2 rotate-arrow opacity-80"
          />
        </div>
        <div className="flex-1 text-right">
          <h3 className="sm:text-base text-sm font-semibold text-gray-800 w-full">{travel.cityEnd}</h3>
          <p className="text-xs text-gray-600 w-full">{travel.HourEndFormat}</p>
          <p className="text-[10px] text-gray-400 flex items-center gap-1 justify-end w-full">
            <MapPin className="text-[color:var(--primary-orange)] w-4 h-4 flex-shrink-0" />
            <span className="truncate">{travel.addressEnd}</span>
          </p>
        </div>
      </div>
      
      <div>
        <hr className="my-4 border-gray-200" />
      </div>
      
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-700">Rutas:</p>
          <p className="text-xs text-gray-500">{travel.routesNames}</p>
        </div>
        <div>
          <p className="text-2xl font-semibold text-[color:var(--primary-blue)]">${travel.amount}</p>
        </div>
        <div>
          <button className="bg-[color:var(--primary-orange)] text-white px-4 py-2 rounded-md hover:opacity-90 transition">
            SELECCIONAR
          </button>
        </div>
      </div>
    </div>
  );  
};
