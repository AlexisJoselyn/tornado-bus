import { useAvailableSeats } from '../../api';

interface SeatSelectionProps {
    travelId: number;
    originId: number;
    destinationId: number;
}

export const SeatSelection = ({ travelId, originId, destinationId }:SeatSelectionProps) => {
  const { seats, loading, error } = useAvailableSeats(travelId, originId, destinationId);

  if (loading) return <div>Cargando asientos disponibles...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!seats) return <div>No hay datos de asientos</div>;

  return (
    <div>
      <h2>Asientos disponibles</h2>
      {seats.data.map((level) => (
        <div key={`level-${level.nivel}`}>
          <h3>Nivel {level.nivel}</h3>
          <div className="seats-grid">
            {level.seats.map((seat) => (
              <div 
                key={`seat-${seat.id}`}
                className={`seat ${seat.status.toLowerCase()}`}
                title={`Fila ${seat.row}, Columna ${seat.column}`}
              >
                {seat.seat}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};