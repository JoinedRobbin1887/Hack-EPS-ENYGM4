// src/components/Movilidad.js
import React from "react";
import { PreferenceSelector } from "./PreferenceSelector";

export function Movilidad({ accesPeu, setAccesPeu, transportPublic, setTransportPublic, carrilsBici, setCarrilsBici, autopistes, setAutopistes, accesibilitatFisica, setAccesibilitatFisica }) {

  const yesNoOptions = ["YES", "NO"];

  return (

    <div className="w-full mb-8 p-6 bg-white rounded-xl shadow-xl border border-gray-100 relative">
      

      <h2 className="font-extrabold text-2xl mb-4 text-cornflower-blue-800 flex items-center space-x-2">
        <span>Mobility & Transport</span>
      </h2>
      

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
        
        <PreferenceSelector 
          label="WALKABILITY SCORE" 
          options={yesNoOptions} 
          selected={accesPeu} 
          onChange={setAccesPeu} 
        />
        <PreferenceSelector 
          label="BIKE LANES" 
          options={yesNoOptions} 
          selected={carrilsBici} 
          onChange={setCarrilsBici} 
        />
        <PreferenceSelector 
          label="HIGHWAY ACCESS" 
          options={yesNoOptions} 
          selected={autopistes} 
          onChange={setAutopistes} 
        />

        <PreferenceSelector 
          label="PUBLIC TRANSPORT (DAY/NIGHT)" 
          options={yesNoOptions} 
          selected={transportPublic} 
          onChange={setTransportPublic}
        />
        
        <div className="md:col-span-2"> 
            <PreferenceSelector 
                label="PHYSICAL ACCESSIBILITY" 
                options={yesNoOptions} 
                selected={accesibilitatFisica} 
                onChange={setAccesibilitatFisica} 
            />
        </div>

      </div>
    </div>
  );
}