import { DepartureTravel } from '../../api';
import arrow from '../../assets/arrow.png';

interface TravelCardProps {
    travel: DepartureTravel;
}

export const TravelCard = ({ travel }: TravelCardProps) => {
  return (
    <div className="border rounded-lg p-4 mb-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex-1 text-left">
          <h3 className="text-base font-semibold">{travel.cityInit}</h3>
          <p className="text-xs">{travel.HourInitFormat}</p>
          <p className="text-[10px] text-gray-500">{travel.addressInit}</p>
        </div>
        <div className="flex-1 flex flex-col items-center">
          <p className="text-sm text-gray-500">{travel.travelTime}</p>
          <img 
            src={arrow} 
            alt="Flecha" 
            className="h-4 w-4 mx-2 rotate-arrow" 
          />
        </div>
        <div className="flex-1 text-right">
          <h3 className="text-base font-semibold">{travel.cityEnd}</h3>
          <p className="text-xs">{travel.HourEndFormat}</p>
          <p className="text-[10px] text-gray-500">{travel.addressEnd}</p>
        </div>
      </div>
      <div>
        <hr className="my-4" />
      </div>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm">Rutas:</p>
          <p className="text-xs">{travel.routesNames}</p>
        </div>
        <div>
          <p className="text-2xl font-semibold">${travel.amount}</p>
        </div>
        <div>
          <button className="bg-gray-200 px-4 py-2 rounded-md">SELECCIONAR</button>
        </div>
      </div>
    </div>
  );
};
