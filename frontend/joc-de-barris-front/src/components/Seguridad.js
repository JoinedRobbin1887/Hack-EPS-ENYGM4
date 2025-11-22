// src/components/Seguridad.js
import React, { useState } from "react";
import { PreferenceSelector } from "./PreferenceSelector";

export function Seguridad() {
  const [seguridad, setSeguridad] = useState([]);
  
  return (
    // TARGETA: Aplicació d'estils de targeta consistent (shadow-xl, p-6, rounded-xl)
    <div className="w-full mb-8 p-6 bg-white rounded-xl shadow-xl border border-gray-100 relative">
      
      {/* TÍTOL: Estilitzat amb negreta, mida gran, color de marca i icona (Escut) */}
      <h2 className="font-extrabold text-2xl mb-4 text-blue-800 flex items-center space-x-2">
        <span>Security</span>
      </h2>
      
      {/* CONTENIDOR ÚNIC: No necessita Grid, però l'embolcalla igualment per consistència */}
      <div className="grid grid-cols-1 gap-6"> 
        
        {/* Pregunta única, estilitzada com les altres */}
        <PreferenceSelector 
          // Fem l'etiqueta més específica, ja que és una preferència molt alta
          label="HIGH SECURITY (LOW CRIME RATE)" 
          options={["YES", "NO"]} 
          selected={seguridad} 
          onChange={setSeguridad} 
        />
        
      </div>
    </div>
  );
}