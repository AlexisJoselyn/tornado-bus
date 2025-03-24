import { create } from 'zustand';

interface SeatStore {
  travelId: number | null;
  originId: number | null;
  destinationId: number | null;
  selectedSeats: number[];
  setTravelData: (travelId: number, originId: number, destinationId: number) => void;
  addSelectedSeat: (seatId: number) => void;
  removeSelectedSeat: (seatId: number) => void;
  clearSelectedSeats: () => void;
}

const useSeatStore = create<SeatStore>((set) => ({
  travelId: null,
  originId: null,
  destinationId: null,
  selectedSeats: [],
  setTravelData: (travelId, originId, destinationId) => 
    set({ travelId, originId, destinationId, selectedSeats: [] }),
  addSelectedSeat: (seatId) => 
    set((state) => ({ selectedSeats: [...state.selectedSeats, seatId] })),
  removeSelectedSeat: (seatId) => 
    set((state) => ({ selectedSeats: state.selectedSeats.filter(id => id !== seatId) })),
  clearSelectedSeats: () => set({ selectedSeats: [] }),
}));

export {useSeatStore};