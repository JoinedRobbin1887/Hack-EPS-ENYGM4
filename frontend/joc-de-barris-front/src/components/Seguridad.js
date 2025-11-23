// src/components/Seguridad.js
import React, { useEffect } from "react";

export function Seguridad({ seguridad, setSeguridad }) {
  
  useEffect(() => {
    if (seguridad && seguridad.length === 0) {
      setSeguridad(["HIGH"]); 
    }
  }, [seguridad, setSeguridad]); 

  return (
    <div className="w-full mb-8 p-6 bg-white rounded-xl shadow-xl border border-gray-100 relative">
      

      <h2 className="font-extrabold text-2xl mb-4 text-blue-800 flex items-center space-x-2">
        <span>Security (Automatic)</span>
      </h2>

      <div className="grid grid-cols-1 gap-6"> 
        <div className="text-center py-4">
          <p className="text-xl font-semibold text-green-700">
            High Security (Low Crime Rate) Applied by Default.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            This preference is automatically included for all clients.
          </p>
        </div>
      </div>
    </div>
  );
}