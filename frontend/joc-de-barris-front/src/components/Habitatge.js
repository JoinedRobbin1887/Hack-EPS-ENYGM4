import React from "react";
import { PreferenceSelector } from "./PreferenceSelector";

export function Habitatge({ precios, setPrecios, tipos, setTipos }) {

  return (
    <div className="w-full mb-8 p-6 bg-white rounded-xl shadow-xl border border-gray-100 relative">
      
      <h2 className="font-extrabold text-2xl mb-4 text-cornflower-blue-800 flex items-center space-x-2">
        <span>Housing</span>
      </h2>
      
  
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