// src/components/Economia.js
import React, { useState } from "react";
import { PreferenceSelector } from "./PreferenceSelector";

export function Economia() {
  const [ingresos, setIngresos] = useState([]);
  const [edad, setEdad] = useState([]);
  const [densitat, setDensitat] = useState([]);
  const [activitat, setActivitat] = useState([]);

return (
    <div className="w-full mb-8 p-6 bg-white rounded-xl shadow-xl border border-gray-100 relative">
      <h2 className="font-extrabold text-2xl mb-4 text-cornflower-blue-800 space-x-2">
        Demography & Economy
      </h2>
      
      {/* CANVI CLAU: Utilitzem GRID de 2 columnes per garantir una separació visual clara */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4"> 
        
        {/* Fila 1 */}
        <PreferenceSelector 
          label="INCOMES" 
          options={["LOW", "MEDIUM", "HIGH"]} 
          selected={ingresos} 
          onChange={setIngresos} 
        />
        <PreferenceSelector 
          label="AGE" 
          options={["YOUNG (18-30)", "ADULT (31-55)", "SENIOR (55+)"]} 
          selected={edad} 
          onChange={setEdad} 
        />
        
        {/* Fila 2 */}
        <PreferenceSelector 
          label="DENSITY" 
          options={["LOW DENSITY", "MEDIUM DENSITY", "HIGH DENSITY"]} 
          selected={densitat} 
          onChange={setDensitat} 
        />
        <PreferenceSelector 
          label="ECONOMIC ACTIVITY" 
          options={["SERVICE SECTOR", "TECHNOLOGY", "PUBLIC SECTOR"]} 
          selected={activitat} 
          onChange={setActivitat} 
        />
      </div>
    </div>
  );
}