import { create } from 'zustand';

interface TripStore {
  origin: string;
  destination: string;
  passenger: string;
  totalPassengers: number;
  date: Date;
  returnDate?: Date;
  originId: number | null;
  destinationId: number | null;
  setTripData: (data: Partial<{
    origin: string;
    destination: string;
    passenger: string;
    totalPassengers: number;
    date: Date;
    returnDate?: Date;
    originId: number | null;
    destinationId: number | null;

  }>) => void;
}

export const useTripStore = create<TripStore>((set) => ({
  origin: '',
  destination: '',
  passenger: '',
  totalPassengers: 0,
  date: new Date(),
  returnDate: undefined,
  originId: null,
  destinationId: null,
  setTripData: (data) => set((state) => ({ ...state, ...data })),
}));