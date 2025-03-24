import { useNavigate } from 'react-router-dom';
import { useSeatStore, useTripStore } from '../../store';
import { useAvailableSeats } from '../../api';
import { ArrowLeft, User } from 'lucide-react';

export const SeatSelection = () => {
  const navigate = useNavigate();
  const { travelId, originId, destinationId, selectedSeats, addSelectedSeat, removeSelectedSeat } = useSeatStore();
  const { seats, loading, error } = useAvailableSeats(travelId, originId, destinationId);
  const {totalPassengers} = useTripStore();
  

  const handleGoBack = () => navigate(-1);

  const handleSeatClick = (seatId: number) => {
    if (selectedSeats.includes(seatId)) {
      removeSelectedSeat(seatId);
    } else {
      if (selectedSeats.length < totalPassengers) {
        addSelectedSeat(seatId);
      } else {
        alert('Solo puedes seleccionar ' + totalPassengers + ' asientos');
      }
    }
  };

  if (loading) return <div className="text-center py-8 text-gray-600">Cargando asientos...</div>;
  if (error) return <div className="text-center py-8 text-[color:var(--primary-orange)]">Error: {error}</div>;
  if (!seats) return <div className="text-center py-8 text-gray-600">No hay asientos disponibles</div>;

  return (
    <div className="max-w-md md:max-w-xl lg:max-w-4xl mx-auto p-4 md:p-6">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <button
          onClick={handleGoBack}
          className="flex items-center gap-2 text-gray-600 hover:text-[color:var(--primary-orange)] transition text-sm md:text-base"
        >
          <ArrowLeft size={18} className="md:w-5 md:h-5" />
          <span>Regresar</span>
        </button>
        <h1 className="text-xl md:text-2xl font-bold text-gray-800 text-center px-2">Selecciona tus asientos</h1>
        <div className="w-10 md:w-24"></div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6 mb-4 md:mb-6">
        <div className="flex flex-wrap justify-center gap-3 md:gap-6 mb-4 md:mb-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 md:w-4 md:h-4 rounded-sm bg-[color:var(--primary-blue)]"></div>
            <span className="text-xs md:text-sm text-gray-700">Disponible</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 md:w-4 md:h-4 rounded-sm bg-gray-300"></div>
            <span className="text-xs md:text-sm text-gray-700">Ocupado</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 md:w-4 md:h-4 rounded-sm bg-[color:var(--primary-orange)]"></div>
            <span className="text-xs md:text-sm text-gray-700">Seleccionado</span>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2 md:gap-4 mx-auto max-w-xs md:max-w-none">
          {seats.data[0]?.seats.map((seat) => (
            <button
              key={`seat-${seat.id}`}
              onClick={() => handleSeatClick(seat.id)}
              disabled={seat.status !== 'Disponible'}
              className={`
                w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 flex flex-col items-center justify-center rounded
                md:rounded-md transition-all border
                ${
            selectedSeats.includes(seat.id)
              ? 'border-[color:var(--primary-orange)] bg-orange-50'
              : seat.status === 'Disponible'
                ? 'border-[color:var(--primary-blue)] bg-white hover:bg-blue-50'
                : 'border-gray-200 bg-gray-100 cursor-not-allowed'
            }
              `}
            >
              <User 
                size={14} 
                className={`md:w-4 md:h-4 lg:w-5 lg:h-5 ${
                  selectedSeats.includes(seat.id)
                    ? 'text-[color:var(--primary-orange)]'
                    : seat.status === 'Disponible'
                      ? 'text-[color:var(--primary-blue)]'
                      : 'text-gray-400'
                }`} 
              />
              <span className="text-[10px] md:text-xs mt-0.5 md:mt-1 font-medium text-gray-600">{seat.seat}</span>
            </button>
          ))}
        </div>
      </div>

      {selectedSeats.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 md:p-4 mb-4 md:mb-6">
          <h3 className="font-medium text-gray-700 text-sm md:text-base mb-1 md:mb-2">Asientos seleccionados:</h3>
          <div className="flex flex-wrap gap-1 md:gap-2">
            {selectedSeats.map((seatId) => {
              const seat = seats.data[0].seats.find(s => s.id === seatId);
              return (
                <span 
                  key={`selected-${seatId}`} 
                  className="bg-orange-50 text-[color:var(--primary-orange)] px-2 py-0.5 md:px-3 md:py-1 rounded-full text-xs md:text-sm border border-[color:var(--primary-orange)]"
                >
                  {seat?.seat}
                </span>
              );
            })}
          </div>
        </div>
      )}

      <div className="flex justify-end">
        <button
          disabled={selectedSeats.length === 0}
          className={`
            bg-[color:var(--primary-orange)] text-white px-4 py-2 md:px-6 md:py-3 rounded-md
            hover:bg-orange-700 transition disabled:opacity-50 disabled:cursor-not-allowed
            font-medium shadow-md text-sm md:text-base
          `}
          onClick={() => alert('Estamos trabajando en esta funcionalidad')}
        >
          Continuar ({selectedSeats.length})
        </button>
      </div>
    </div>
  );
};