import React from "react";
import { Cart } from "./components";

const App = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Sistema de Compras de Boletos</h1>
      <Cart />
    </div>
  );
};

export default App;
