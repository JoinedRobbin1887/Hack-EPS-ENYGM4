import React from "react";
import { Link } from "react-router-dom";

export function RecomendationPage() {
  const barriosRecomendados = ["Chamberí", "Salamanca", "Malasaña"];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-cornflower-blue-100 p-8">
      <h1 className="text-4xl font-extrabold text-cornflower-blue-900 mb-8">
        Barrios Recomendados
      </h1>

      <ul className="bg-white shadow-md rounded-lg p-4 w-full max-w-md space-y-2">
        {barriosRecomendados.map((barrio, index) => (
          <li key={index} className="text-cornflower-blue-700 text-lg">
            {barrio}
          </li>
        ))}
      </ul>

      <Link to="/" className="mt-8">
        <button className="bg-cornflower-blue-400 hover:bg-cornflower-blue-600 text-white text-xl font-bold py-2 px-4 rounded-full shadow-lg">
          Volver
        </button>
      </Link>
    </div>
  );
}
