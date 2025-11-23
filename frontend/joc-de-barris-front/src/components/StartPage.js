import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Importem les components
import { Economia } from "./Economia";
import { EstiloVida } from "./EstiloVida";
import { Movilidad } from "./Movilidad";
import { Seguridad } from "./Seguridad";
import { Habitatge } from "./Habitatge";

export function StartPage() {
  const navigate = useNavigate();

  const [preferences, setPreferences] = useState({
    // Economia
    ingresos: [], edad: [], densitat: [], activitat: [],
    // EstiloVida
    restaurants: [], parcs: [], diversidad: [], gyms: [], botigues: [],
    // Movilidad
    accesPeu: [], transportPublic: [], carrilsBici: [], autopistes: [], accesibilitatFisica: [],
    // Seguridad: L'inicialitzem amb un valor per defecte per saltar-se la validació (ALTA)
    seguridad: ["ALTA"], 
    // Habitatge
    precios: [], tipos: [],
  });

  // Funció genèrica per actualitzar qualsevol preferència
  const updatePreference = (key, value) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
  };

  const [categoryOrder, setCategoryOrder] = useState([
    'economia',
    'estiloVida',
    'movilidad',
    'seguridad',
    'habitatge'
  ]);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);

  //Funció de validació
  const isFormValid = () => {
    // Comprova que tots els arrays de selecció tinguin almenys un element
    // Com que 'seguridad' s'inicialitza amb 'ALTA', passarà la validació automàticament
    return Object.values(preferences).every(selection => selection.length > 0);
  };

  //Passar props
  const categoryComponents = {
    economia: <Economia 
      ingresos={preferences.ingresos} setIngresos={(v) => updatePreference('ingresos', v)}
      edad={preferences.edad} setEdad={(v) => updatePreference('edad', v)}
      densitat={preferences.densitat} setDensitat={(v) => updatePreference('densitat', v)}
      activitat={preferences.activitat} setActivitat={(v) => updatePreference('activitat', v)}
    />,
    estiloVida: <EstiloVida 
      restaurants={preferences.restaurants} setRestaurants={(v) => updatePreference('restaurants', v)}
      parcs={preferences.parcs} setParcs={(v) => updatePreference('parcs', v)}
      diversidad={preferences.diversidad} setDiversidad={(v) => updatePreference('diversidad', v)}
      gyms={preferences.gyms} setGyms={(v) => updatePreference('gyms', v)}
      botigues={preferences.botigues} setBotigues={(v) => updatePreference('botigues', v)}
    />,
    movilidad: <Movilidad 
      accesPeu={preferences.accesPeu} setAccesPeu={(v) => updatePreference('accesPeu', v)}
      transportPublic={preferences.transportPublic} setTransportPublic={(v) => updatePreference('transportPublic', v)}
      carrilsBici={preferences.carrilsBici} setCarrilsBici={(v) => updatePreference('carrilsBici', v)}
      autopistes={preferences.autopistes} setAutopistes={(v) => updatePreference('autopistes', v)}
      accesibilitatFisica={preferences.accesibilitatFisica} setAccesibilitatFisica={(v) => updatePreference('accesibilitatFisica', v)}
    />,
    seguridad: <Seguridad 
      seguridad={preferences.seguridad} setSeguridad={(v) => updatePreference('seguridad', v)}
    />,
    habitatge: <Habitatge 
      precios={preferences.precios} setPrecios={(v) => updatePreference('precios', v)}
      tipos={preferences.tipos} setTipos={(v) => updatePreference('tipos', v)}
    />
  };

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


  const handleSubmit = async () => {
    if (!isFormValid()) {
      alert("Answer all the questions");
      return;
    }
    
    // NOTA: S'ha de canviar el format de les claus (a anglès) abans de l'enviament.
    const submissionData = {
        preferences: preferences,
        priorities: categoryOrder, 
    };

    // Aquest és el punt clau: la crida a l'API
    const API_URL = ''; 
  };


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-cornflower-blue-100 p-8">
      <h1 className="text-4xl font-bold mb-10 text-center">SELECT YOUR PREFERENCES</h1>

<<<<<<< HEAD
      {/* CAMBIO: pasamos el estado y la función de actualización como props */}
      <Economia data={economia} setData={setEconomia} />
      <EstiloVida data={estiloVida} setData={setEstiloVida} />
      <Movilidad data={movilidad} setData={setMovilidad} />
      <Seguridad data={seguridad} setData={setSeguridad} />
      <Habitatge data={habitatge} setData={setHabitatge} />
=======
      <div className="w-full max-w-6xl"> 
        {categoryOrder.map((categoryKey, index) => (
          <div
            key={categoryKey}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragEnd={handleDragEnd}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, index)}
            className={`mb-6 transition-all duration-200 ${
              draggedIndex === index
                ? 'opacity-50 cursor-grabbing'
                : 'cursor-grab'
            } ${
              dragOverIndex === index && draggedIndex !== index
                ? 'border-2 border-cornflower-blue-400 rounded-lg'
                : ''
            }`}
            style={{ cursor: draggedIndex === index ? 'grabbing' : 'grab' }}
          >
            <div className="relative">
                <div className="absolute -top-4 -right-2 bg-cornflower-blue-800 text-white font-extrabold text-xl w-10 h-10 rounded-full flex items-center justify-center border-4 border-white shadow-lg z-10">
                    {index + 1}
                </div>
                
                {categoryComponents[categoryKey]}
            </div>
>>>>>>> yasmin

      {/* CAMBIO: botón Submit que envía datos y navega */}
      <button
        onClick={handleSubmit}
        className="bg-cornflower-blue-800 hover:bg-cornflower-blue-600 text-white text-2xl font-bold py-3 px-6 rounded-full shadow-lg mt-6 transition duration-300"
      >
        Submit
      </button>

<<<<<<< HEAD
      {/* Botón opcional de volver (Link normal) */}
      <Link to="/">
        <button className="bg-gray-400 hover:bg-gray-500 text-white text-2xl font-bold py-3 px-6 rounded-full shadow-lg mt-4 transition duration-300">
          Go Back
        </button>
      </Link>
=======
  
      <div className="flex space-x-4">
        <Link to="/">
          <button className="bg-cornflower-blue-800 hover:bg-cornflower-blue-600 text-white text-2xl font-bold py-3 px-6 rounded-full shadow-lg mt-6 transition duration-300">
            Go back
          </button>
        </Link>
        {/* Botó Submit (condicionalment desactivat si el formulari no és vàlid) */}
        <button 
          onClick={handleSubmit}
          className={`text-white text-2xl font-bold py-3 px-6 rounded-full shadow-lg mt-6 transition duration-300 ${
            isFormValid() ? 'bg-cornflower-blue-600 hover:bg-cornflower-blue-700' : 'bg-gray-400 cursor-not-allowed'
          }`}
          disabled={!isFormValid()}
        >
          Submit
        </button>
      </div>
>>>>>>> yasmin
    </div>
  );
}
