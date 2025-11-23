// src/components/Economia.js
import React from "react";
import { PreferenceSelector } from "./PreferenceSelector";

export function Economia({ ingresos, setIngresos, edad, setEdad, densitat, setDensitat, activitat, setActivitat }) {

return (
    <div className="w-full mb-8 p-6 bg-white rounded-xl shadow-xl border border-gray-100 relative">
      <h2 className="font-extrabold text-2xl mb-4 text-cornflower-blue-800 space-x-2">
        Demography & Economy
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4"> 
        
        <PreferenceSelector 
          label="INCOMES" 
          options={["LOW", "MEDIUM", "HIGH"]} 
          selected={data.ingresos} 
          onChange={(value) => setData({ ...data, ingresos: value })} // CAMBIO
        />
        <PreferenceSelector 
          label="AGE" 
          options={["YOUNG (18-30)", "ADULT (31-55)", "SENIOR (55+)"]} 
          selected={data.edad} 
          onChange={(value) => setData({ ...data, edad: value })} // CAMBIO
        />
        
        {/* Fila 2 */}
        <PreferenceSelector 
          label="DENSITY" 
          options={["LOW DENSITY", "MEDIUM DENSITY", "HIGH DENSITY"]} 
          selected={data.densitat} 
          onChange={(value) => setData({ ...data, densitat: value })} // CAMBIO
        />
        <PreferenceSelector 
          label="ECONOMIC ACTIVITY" 
          options={["SERVICE SECTOR", "TECHNOLOGY", "PUBLIC SECTOR"]} 
          selected={data.activitat} 
          onChange={(value) => setData({ ...data, activitat: value })} // CAMBIO
        />
      </div>
    </div>
  );
}
