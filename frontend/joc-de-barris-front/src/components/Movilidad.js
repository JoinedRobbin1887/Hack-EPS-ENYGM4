// src/components/Movilidad.js
import React, { useState } from "react";
import { PreferenceSelector } from "./PreferenceSelector";

export function Movilidad() {
  const [accesPeu, setAccesPeu] = useState([]);
  const [transportPublic, setTransportPublic] = useState([]);
  const [carrilsBici, setCarrilsBici] = useState([]);
  const [autopistes, setAutopistes] = useState([]);
  const [accesibilitat, setAccesibilitat] = useState([]);

  return (
    <div className="w-full mb-6 p-4 bg-white rounded-lg shadow">
      <h2 className="font-bold text-xl mb-2">Movilidad y Transporte</h2>
      <PreferenceSelector label="ACCESIBILITAT A PEU" options={["SI", "NO"]} selected={accesPeu} onChange={setAccesPeu} />
      <PreferenceSelector label="TRANSPORT PUBLIC" options={["SI-DIURNO", "SI-NOCTURNO", "NO"]} selected={transportPublic} onChange={setTransportPublic} />
      <PreferenceSelector label="CARRILS BICI" options={["SI", "NO"]} selected={carrilsBici} onChange={setCarrilsBici} />
      <PreferenceSelector label="AUTOPISTES" options={["SI", "NO"]} selected={autopistes} onChange={setAutopistes} />
      <PreferenceSelector label="ACCESIBILITAT" options={["SI", "NO"]} selected={accesibilitat} onChange={setAccesibilitat} />
    </div>
  );
}
