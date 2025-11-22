// src/components/Habitatge.js
import React, { useState } from "react";
import { PreferenceSelector } from "./PreferenceSelector";

export function Habitatge() {
  const [precios, setPrecios] = useState([]);
  const [tipos, setTipos] = useState([]);

  return (
    // TARGETA: Aplicació d'estils de targeta consistent (shadow-xl, p-6, rounded-xl)
    <div className="w-full mb-8 p-6 bg-white rounded-xl shadow-xl border border-gray-100 relative">
      
      {/* TÍTOL: Estilitzat amb negreta, mida gran, color de marca i icona */}
      <h2 className="font-extrabold text-2xl mb-4 text-blue-800 flex items-center space-x-2">
        <span>Housing</span>
      </h2>
      
      {/* GRID RESPONSIVE: 2 Columnes (md:grid-cols-2) per als dos selectors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
        
        <PreferenceSelector 
          label="RENT PRICES" 
          options={["1600$", "2500$", "4100$"]} 
          selected={precios} 
          onChange={setPrecios} 
        />
        
        <PreferenceSelector 
          label="HOUSING TYPE" 
          options={["APARTMENT", "HOUSE"]} 
          selected={tipos} 
          onChange={setTipos} 
        />
        
      </div>
    </div>
  );
}