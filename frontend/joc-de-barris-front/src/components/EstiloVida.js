// src/components/EstiloVida.js
import React, { useState } from "react";
import { PreferenceSelector } from "./PreferenceSelector";

export function EstiloVida() {
  const [restaurants, setRestaurants] = useState([]);
  const [parcs, setParcs] = useState([]);
  const [diversidad, setDiversidad] = useState([]);
  const [gyms, setGyms] = useState([]);
  const [botigues, setBotigues] = useState([]);

  return (
    <div className="w-full mb-6 p-4 bg-white rounded-lg shadow">
      <h2 className="font-bold text-xl mb-2">Estilo de vida cerca</h2>
      <PreferenceSelector label="RESTAURANTS" options={["SI", "NO"]} selected={restaurants} onChange={setRestaurants} />
      <PreferenceSelector label="PARCS" options={["SI", "NO"]} selected={parcs} onChange={setParcs} />
      <PreferenceSelector label="DIVERSIDAD CULTURAL" options={["SI", "NO"]} selected={diversidad} onChange={setDiversidad} />
      <PreferenceSelector label="GYMS" options={["SI", "NO"]} selected={gyms} onChange={setGyms} />
      <PreferenceSelector label="BOTIGUES" options={["SI", "NO"]} selected={botigues} onChange={setBotigues} />
    </div>
  );
}
