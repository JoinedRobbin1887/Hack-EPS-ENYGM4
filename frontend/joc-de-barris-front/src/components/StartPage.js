import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Economia } from "./Economia";
import { EstiloVida } from "./EstiloVida";
import { Movilidad } from "./Movilidad";
import { Seguridad } from "./Seguridad";
import { Habitatge } from "./Habitatge";

export function StartPage() {
  const [categoryOrder, setCategoryOrder] = useState([
    'economia',
    'estiloVida',
    'movilidad',
    'seguridad',
    'habitatge'
  ]);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);

  const categoryComponents = {
    economia: <Economia />,
    estiloVida: <EstiloVida />,
    movilidad: <Movilidad />,
    seguridad: <Seguridad />,
    habitatge: <Habitatge />
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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-cornflower-blue-100 p-8">
      <h1 className="text-4xl font-bold mb-10 text-center text-cornflower-blue-800 mt-2">SELECT YOUR PREFERENCES</h1>

      {/* Amplada corregida a max-w-6xl per a targetes amples */}
      <div className="w-full max-w-10xl"> 
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
            {/* Contenidor RELATIU per posicionar el número de prioritat */}
            <div className="relative">
                {/* Visualització de la Prioritat (Índex + 1) */}
                <div className="absolute -top-4 -right-2 bg-cornflower-blue-800 text-white font-extrabold text-xl w-10 h-10 rounded-full flex items-center justify-center border-4 border-white shadow-lg z-10">
                    {index + 1}
                </div>
                
                {/* La component de la categoria (la targeta) */}
                {categoryComponents[categoryKey]}
            </div>

          </div>
        ))}
      </div>

      {/* Botons Go Back i Next */}
      <div className="flex space-x-4">
        <Link to="/">
          <button className="bg-cornflower-blue-800 hover:bg-cornflower-blue-600 text-white text-2xl font-bold py-3 px-6 rounded-full shadow-lg mt-6 transition duration-300">
            Go back
          </button>
        </Link>
        <Link to="/">
          <button className="bg-cornflower-blue-800 hover:bg-cornflower-blue-600 text-white text-2xl font-bold py-3 px-6 rounded-full shadow-lg mt-6 transition duration-300">
            Next
          </button>
        </Link>
      </div>
    </div>
  );
}