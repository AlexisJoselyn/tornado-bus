import { create } from "zustand";

interface CartState {
  selectedSeats: string[];
  totalPrice: number;
  addSeat: (seat: string, price: number) => void;
  removeSeat: (seat: string, price: number) => void;
  resetCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  selectedSeats: [],
  totalPrice: 0,
  addSeat: (seat, price) =>
    set((state) => ({
      selectedSeats: [...state.selectedSeats, seat],
      totalPrice: state.totalPrice + price,
    })),
  removeSeat: (seat, price) =>
    set((state) => ({
      selectedSeats: state.selectedSeats.filter((s) => s !== seat),
      totalPrice: state.totalPrice - price,
    })),
  resetCart: () => set({ selectedSeats: [], totalPrice: 0 }),
}));
