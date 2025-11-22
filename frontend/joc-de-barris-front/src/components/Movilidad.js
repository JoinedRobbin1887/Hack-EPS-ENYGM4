// src/components/Movilidad.js
import React, { useState } from "react";
import { PreferenceSelector } from "./PreferenceSelector";

export function Movilidad() {
  const [accesPeu, setAccesPeu] = useState([]);
  const [transportPublic, setTransportPublic] = useState([]);
  const [carrilsBici, setCarrilsBici] = useState([]);
  const [autopistes, setAutopistes] = useState([]);
  // IMPORTANT: Canviem el nom per ser més explícits (Accessibilitat Física)
  const [accesibilitatFisica, setAccesibilitatFisica] = useState([]); 

  const yesNoOptions = ["YES", "NO"];

  return (
    // TARGETA: Aplicació d'estils de targeta consistent (shadow-xl, p-6, rounded-xl)
    <div className="w-full mb-8 p-6 bg-white rounded-xl shadow-xl border border-gray-100 relative">
      
      {/* TÍTOL: Estilitzat amb negreta, mida gran, color de marca i icona */}
      <h2 className="font-extrabold text-2xl mb-4 text-blue-800 flex items-center space-x-2">
        <span>Mobility & Transport</span>
      </h2>
      
      {/* GRID RESPONSIVE: 2 Columnes (md:grid-cols-2) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
        
        {/* Accessibilitat a peu i carrils */}
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

        {/* TRANSPORT PÚBLIC: Opcions múltiples (type="multiple") */}
        <PreferenceSelector 
          label="PUBLIC TRANSPORT (DAY/NIGHT)" 
          options={yesNoOptions} 
          selected={transportPublic} 
          onChange={setTransportPublic}
        />
        
        {/* ACCESSIBILITAT FÍSICA: Ocupa les dues columnes i la fem més explícita */}
        <div className="md:col-span-2"> 
            <PreferenceSelector 
                label="PHYSICAL ACCESSIBILITY" 
                options={yesNoOptions} 
                // Utilitzem el nou state
                selected={accesibilitatFisica} 
                onChange={setAccesibilitatFisica} 
            />
        </div>

      </div>
    </div>
  );
}