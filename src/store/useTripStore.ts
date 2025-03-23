import { create } from 'zustand';

export interface TripState {
  origin: string;
  destination: string;
  date: string | Date;
  passenger: string;
  trips: string[]
  setTripData: (data: Partial<TripState>) => void;
}

export const useTripStore = create<TripState>((set) => ({
  origin: '',
  destination: '',
  date: '',
  passenger: '',
  trips: [],
  setTripData: (data) => set((state) => ({ ...state, ...data })),
}));
