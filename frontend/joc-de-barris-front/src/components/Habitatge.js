// src/components/Habitatge.js
import React, { useState } from "react";
import { PreferenceSelector } from "./PreferenceSelector";

export function Habitatge() {
  const [precios, setPrecios] = useState([]);
  const [tipos, setTipos] = useState([]);

  return (
    <div className="w-full mb-6 p-4 bg-white rounded-lg shadow">
      <h2 className="font-bold text-xl mb-2">Vivienda</h2>
      <PreferenceSelector label="PRECIOS DE LLOGUER" options={["ALTOS", "BAJOS", "MEDIOS"]} selected={precios} onChange={setPrecios} />
      <PreferenceSelector label="TIPOS DE HABITATGE" options={["PISO", "CASA"]} selected={tipos} onChange={setTipos} />
    </div>
  );
}
