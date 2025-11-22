// src/components/StartPage.js
import React from "react";
import { Link } from "react-router-dom";

import { Economia } from "./Economia";
import { EstiloVida } from "./EstiloVida";
import { Movilidad } from "./Movilidad";
import { Seguridad } from "./Seguridad";
import { Habitatge } from "./Habitatge";

export function StartPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-cornflower-blue-100 p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Configura tus preferencias</h1>

      <Economia />
      <EstiloVida />
      <Movilidad />
      <Seguridad />
      <Habitatge />

      {/* Botón Volver */}
      <Link to="/">
        <button className="bg-cornflower-blue-400 hover:bg-cornflower-blue-600 text-white text-2xl font-bold py-3 px-6 rounded-full shadow-lg mt-6 transition duration-300">
          Volver
        </button>
      </Link>
    </div>
  );
}
