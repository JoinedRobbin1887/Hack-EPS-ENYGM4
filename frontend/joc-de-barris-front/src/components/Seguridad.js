// src/components/Seguridad.js
import React, { useState } from "react";
import { PreferenceSelector } from "./PreferenceSelector";

export function Seguridad() {
  const [seguridad, setSeguridad] = useState([]);
  return (
    <div className="w-full mb-6 p-4 bg-white rounded-lg shadow">
      <h2 className="font-bold text-xl mb-2">Seguridad</h2>
      <PreferenceSelector label="SEGURIDAD" options={["SI", "NO"]} selected={seguridad} onChange={setSeguridad} />
    </div>
  );
}
