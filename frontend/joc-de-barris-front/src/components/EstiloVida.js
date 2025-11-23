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
          selected={data.restaurants} 
          onChange={(value) => setData({ ...data, restaurants: value })}
        />

        <PreferenceSelector 
          label="PARKS & GREEN SPACE" 
          options={yesNoOptions} 
          selected={data.parcs} 
          onChange={(value) => setData({ ...data, parcs: value })}
        />
        <PreferenceSelector 
          label="CULTURAL DIVERSITY" 
          options={yesNoOptions} 
          selected={data.diversidad} 
          onChange={(value) => setData({ ...data, diversidad: value })}
        />
        <PreferenceSelector 
          label="GYMS / FITNESS CENTERS" 
          options={yesNoOptions} 
          selected={data.gyms} 
          onChange={(value) => setData({ ...data, gyms: value })} 
        />
        <PreferenceSelector 
          label="LOCAL SHOPS & BUSINESSES" 
          options={yesNoOptions} 
          selected={data.botigues} 
          onChange={(value) => setData({ ...data, botigues: value })}
        />
      </div>
    </div>
  );
}