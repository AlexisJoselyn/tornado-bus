import { create } from "zustand";

interface TripState {
  origin: string;
  destination: string;
  date: string;
  passengers: number;
  trips: string[]
  setTripData: (data: Partial<TripState>) => void;
}

export const useTripStore = create<TripState>((set) => ({
  origin: "",
  destination: "",
  date: "",
  passengers: 1,
  trips: [""],
  setTripData: (data) => set((state) => ({ ...state, ...data })),
}));
