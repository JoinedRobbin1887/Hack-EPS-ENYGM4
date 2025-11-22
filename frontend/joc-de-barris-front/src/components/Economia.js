// src/components/Economia.js
import React, { useState } from "react";
import { PreferenceSelector } from "./PreferenceSelector";

export function Economia() {
  const [ingresos, setIngresos] = useState([]);
  const [edad, setEdad] = useState([]);
  const [densitat, setDensitat] = useState([]);
  const [activitat, setActivitat] = useState([]);

  return (
    <div className="w-full mb-6 p-4 bg-white rounded-lg shadow">
      <h2 className="font-bold text-xl mb-2">Demografía y Economía</h2>
      <PreferenceSelector label="INGRESOS" options={["Rango 1", "Rango 2", "Rango 3"]} selected={ingresos} onChange={setIngresos} />
      <PreferenceSelector label="EDAD" options={["Rango 1", "Rango 2", "Rango 3"]} selected={edad} onChange={setEdad} />
      <PreferenceSelector label="DENSITAT" options={["Rango 1", "Rango 2", "Rango 3"]} selected={densitat} onChange={setDensitat} />
      <PreferenceSelector label="ACTIVITAT ECONOMICA" options={["Rango 1", "Rango 2", "Rango 3"]} selected={activitat} onChange={setActivitat} />
    </div>
  );
}
