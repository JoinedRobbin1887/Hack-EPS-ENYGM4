// src/components/Recomendacion.js
import React from "react";

export function Recomendacion({ barrios }) {
  // barrios es un array de strings con los nombres de los barrios recomendados

  if (!barrios || barrios.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <p className="text-gray-500">No hay barrios recomendados aún.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-gray-600 rounded-lg shadow-md w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Barrios recomendados</h2>
      <ul className="space-y-2 w-full">
        {barrios.map((barrio, index) => (
          <li
            key={index}
            className="p-3 bg-white rounded-lg shadow hover:bg-indigo-50 transition cursor-pointer text-center"
          >
            {barrio}
          </li>
        ))}
      </ul>
    </div>
  );
}
