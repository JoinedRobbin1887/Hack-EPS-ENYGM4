import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // CAMBIO: añadimos useNavigate para poder navegar programáticamente

import { Economia } from "./Economia";
import { EstiloVida } from "./EstiloVida";
import { Movilidad } from "./Movilidad";
import { Seguridad } from "./Seguridad";
import { Habitatge } from "./Habitatge";

export function StartPage() {
  const navigate = useNavigate(); // CAMBIO: inicializamos el hook de navegación

  // CAMBIO: añadimos estados centrales para cada categoría
  const [economia, setEconomia] = useState({
    ingresos: [],
    edad: [],
    densitat: [],
    activitat: []
  });

  const [estiloVida, setEstiloVida] = useState({
    restaurants: [],
    parcs: [],
    diversidad: [],
    gyms: [],
    botigues: []
  });

  const [movilidad, setMovilidad] = useState({
    accesPeu: [],
    transportPublic: [],
    carrilsBici: [],
    autopistes: [],
    accesibilitat: []
  });

  const [seguridad, setSeguridad] = useState({
    seguridad: []
  });

  const [habitatge, setHabitatge] = useState({
    precios: [],
    tipos: []
  });

  // CAMBIO: función que se ejecuta al pulsar Submit
  const handleSubmit = async () => {
    // Construimos el objeto JSON con todas las preferencias
    const preferences = { economia, estiloVida, movilidad, seguridad, habitatge };

    try {
      const response = await fetch("http://localhost:5000/api/preferences", { // CAMBIO: URL de tu backend
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(preferences)
      });

      if (!response.ok) throw new Error("Error al enviar datos");

      const result = await response.json();
      console.log("Respuesta del backend:", result);

      // CAMBIO: navegamos a la página de resultados pasando datos con location.state
      navigate("/results", { state: { results: result, preferences } });
    } catch (error) {
      console.error("Error al enviar datos:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-cornflower-blue-100 p-8">
      <h1 className="text-4xl font-bold mb-10 text-center">SELECT YOUR PREFERENCES</h1>

      {/* CAMBIO: pasamos el estado y la función de actualización como props */}
      <Economia data={economia} setData={setEconomia} />
      <EstiloVida data={estiloVida} setData={setEstiloVida} />
      <Movilidad data={movilidad} setData={setMovilidad} />
      <Seguridad data={seguridad} setData={setSeguridad} />
      <Habitatge data={habitatge} setData={setHabitatge} />

      {/* CAMBIO: botón Submit que envía datos y navega */}
      <button
        onClick={handleSubmit}
        className="bg-cornflower-blue-800 hover:bg-cornflower-blue-600 text-white text-2xl font-bold py-3 px-6 rounded-full shadow-lg mt-6 transition duration-300"
      >
        Submit
      </button>

      {/* Botón opcional de volver (Link normal) */}
      <Link to="/">
        <button className="bg-gray-400 hover:bg-gray-500 text-white text-2xl font-bold py-3 px-6 rounded-full shadow-lg mt-4 transition duration-300">
          Go Back
        </button>
      </Link>
    </div>
  );
}
