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

  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.target.outerHTML);
    e.target.style.opacity = '0.5';
  };

  const handleDragEnd = (e) => {
    e.target.style.opacity = '1';
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverIndex(index);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    
    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDragOverIndex(null);
      return;
    }

    const newOrder = [...categoryOrder];
    const draggedCategory = newOrder[draggedIndex];
    newOrder.splice(draggedIndex, 1);
    newOrder.splice(dropIndex, 0, draggedCategory);
    
    setCategoryOrder(newOrder);
    setDraggedIndex(null);
    setDragOverIndex(null);
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
      <h1 className="text-4xl font-bold mb-10 text-center text-cornflower-blue-800 mt-2">SELECT YOUR PREFERENCES</h1>

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

          </div>
        ))}
      </div>

  
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
    </div>
  );
}