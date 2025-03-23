import { useState } from 'react';
import { PassengerType } from '../../api';

interface PassengerSelectorProps {
  passengerTypes: PassengerType[];
  onPassengerChange: (typeId: number, count: number) => void;
}

const PassengerSelector: React.FC<PassengerSelectorProps> = ({ passengerTypes, onPassengerChange }) => {
  const [passengerCounts, setPassengerCounts] = useState<{ [key: number]: number }>({});

  const handleIncrement = (typeId: number) => {
    const newCount = (passengerCounts[typeId] || 0) + 1;
    setPassengerCounts({ ...passengerCounts, [typeId]: newCount });
    onPassengerChange(typeId, newCount);
  };

  const handleDecrement = (typeId: number) => {
    const newCount = Math.max((passengerCounts[typeId] || 0) - 1, 0);
    setPassengerCounts({ ...passengerCounts, [typeId]: newCount });
    onPassengerChange(typeId, newCount);
  };

  return (
    <div className="space-y-4">
      {passengerTypes.map((type) => (
        <div key={type.id} className="flex justify-between items-center p-4 border rounded-lg">
          <div>
            <h3 className="font-semibold">{type.name}</h3>
            <p className="text-sm text-gray-500">
              De {type.ageMin} a {type.ageMax} años
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleDecrement(type.id)}
              className="bg-gray-200 text-gray-700 p-2 rounded-full"
            >
              -
            </button>
            <span>{passengerCounts[type.id] || 0}</span>
            <button
              onClick={() => handleIncrement(type.id)}
              className="bg-gray-200 text-gray-700 p-2 rounded-full"
            >
              +
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export{PassengerSelector};