import React from "react";

export function Recomendacion({ barrios }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-2xl font-bold mb-4 text-cornflower-blue-900">Barrios Recomendados</h2>
      <ul className="list-disc list-inside space-y-2">
        {barrios.map((barrio, index) => (
          <li key={index} className="text-cornflower-blue-700 text-lg">
            {barrio}
          </li>
        ))}
      </ul>
    </div>
  );
}
