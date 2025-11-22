// src/components/EstiloVida.js
import React, { useState } from "react";
import { PreferenceSelector } from "./PreferenceSelector";

export function EstiloVida() {
  const [restaurants, setRestaurants] = useState([]);
  const [parcs, setParcs] = useState([]);
  const [diversidad, setDiversidad] = useState([]);
  const [gyms, setGyms] = useState([]);
  const [botigues, setBotigues] = useState([]);

  const yesNoOptions = ["YES", "NO"];

  return (
    // TARGETA: Aplicació d'estils de targeta consistent (shadow-xl, p-6, rounded-xl)
    <div className="w-full mb-8 p-6 bg-white rounded-xl shadow-xl border border-gray-100 relative">
      
      {/* TÍTOL: Estilitzat amb negreta, mida gran, color de marca i icona */}
      <h2 className="font-extrabold text-2xl mb-4 text-blue-800 flex items-center space-x-2">
        <span>Lifestyle & Nearby Services</span>
      </h2>
      
      {/* GRID RESPONSIVE: 2 Columnes (md:grid-cols-2) per optimitzar l'espai de SI/NO */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
        
        {/* Tots els PreferenceSelectors s'injecten al grid */}
        <PreferenceSelector 
          label="RESTAURANTS" 
          options={yesNoOptions} 
          selected={restaurants} 
          onChange={setRestaurants} 
        />
        <PreferenceSelector 
          label="PARKS & GREEN SPACE" 
          options={yesNoOptions} 
          selected={parcs} 
          onChange={setParcs} 
        />
        <PreferenceSelector 
          label="CULTURAL DIVERSITY" 
          options={yesNoOptions} 
          selected={diversidad} 
          onChange={setDiversidad} 
        />
        <PreferenceSelector 
          label="GYMS / FITNESS CENTERS" 
          options={yesNoOptions} 
          selected={gyms} 
          onChange={setGyms} 
        />
        <PreferenceSelector 
          label="LOCAL SHOPS & BUSINESSES" 
          options={yesNoOptions} 
          selected={botigues} 
          onChange={setBotigues} 
        />
      </div>
    </div>
  );
}