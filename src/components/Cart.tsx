import { useCartStore } from "../store";
import React from "react";


export const Cart = () => {
  const { selectedSeats, totalPrice, addSeat, removeSeat, resetCart } = useCartStore();

  return (
    <div className="p-4 border rounded-md shadow-md">
      <h2 className="text-lg font-semibold">Carrito de Compras</h2>
      <p>Total a pagar: ${totalPrice}</p>

      <button
        className="bg-blue-500 text-white p-2 rounded-md mt-2"
        onClick={() => addSeat("A1", 20)}
      >
        Agregar Asiento A1 ($20)
      </button>

      <button
        className="bg-red-500 text-white p-2 rounded-md mt-2 ml-2"
        onClick={() => removeSeat("A1", 20)}
      >
        Quitar Asiento A1
      </button>

      <button
        className="bg-gray-500 text-white p-2 rounded-md mt-2 ml-2"
        onClick={resetCart}
      >
        Vaciar Carrito
      </button>

      <ul className="mt-4">
        {selectedSeats.length > 0 ? (
          selectedSeats.map((seat:any) => <li key={seat}>🪑 {seat}</li>)
        ) : (
          <p>No hay asientos seleccionados.</p>
        )}
      </ul>
    </div>
  );
};
