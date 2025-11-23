// src/components/EstiloVida.js
import React from "react";
import { PreferenceSelector } from "./PreferenceSelector";

export function EstiloVida({ restaurants, setRestaurants, parcs, setParcs, diversidad, setDiversidad, gyms, setGyms, botigues, setBotigues }) {

  const yesNoOptions = ["YES", "NO"];

  return (
    <div className="w-full mb-8 p-6 bg-white rounded-xl shadow-xl border border-gray-100 relative">
      
      <h2 className="font-extrabold text-2xl mb-4 text-cornflower-blue-800 flex items-center space-x-2">
        <span>Lifestyle & Nearby Services</span>
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
        
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