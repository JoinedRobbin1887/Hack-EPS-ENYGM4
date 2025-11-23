// src/components/NeighborhoodResults.js
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

export function Results() {
    // Hook per accedir a l'estat passat per 'navigate'
    const location = useLocation();
    
    // Obtenim els resultats del backend (results) i les preferències (preferences)
    // Utilitzem un valor per defecte buit ({}) si location.state és null
    const { results, preferences } = location.state || {}; 

    // ESTAT: Seleccionem el primer barri per mostrar els detalls per defecte
    const [selectedNeighborhood, setSelectedNeighborhood] = useState(results?.[0] || null);

    // Funció per determinar el color de la puntuació
    const getScoreColor = (score) => {
        if (score >= 9.0) return 'text-green-600';
        if (score >= 8.0) return 'text-yellow-600';
        return 'text-red-600';
    };
    
    // ESTAT SENSE RESULTATS (si el backend no retorna res o la navegació falla)
    if (!results || results.length === 0) {
        return (
            <div className="min-h-screen pt-32 bg-gray-50 p-20 text-center">
                <h2 className="text-4xl font-bold text-red-600 mb-4">NO results were found</h2>
                <p className="text-xl text-gray-700">The recommendation engine could not find an ideal neighborhood based on these preferences.</p>
            </div>
        );
    }
    
    // ESTAT AMB RESULTATS (La UI principal)
    return (
        <div className="min-h-screen pt-32 bg-gray-50">
            
            <h2 className="text-4xl font-bold text-center text-blue-900 mb-10">
                Resultats de la Recomanació 🏰
            </h2>
            
            {/* Contenidor Principal: Mapa (Esquerra) i Llista + Detall (Dreta) */}
            <div className="flex flex-col lg:flex-row max-w-7xl mx-auto px-4 gap-6">
                
                {/* 1. MAPA INTERACTIU */}
                <div className="lg:w-3/5 w-full h-96 lg:h-auto bg-gray-200 rounded-xl shadow-xl overflow-hidden flex items-center justify-center">
                    <div className="p-4 text-gray-500 text-center text-xl">
                        [Àrea del Mapa: Los Angeles - {results.length} Barris Trobat{results.length > 1 ? 's' : ''}]
                    </div>
                </div>

                {/* 2. LLISTA DE RECOMANACIONS + PANELL DE JUSTIFICACIÓ (Dreta) */}
                <div className="lg:w-2/5 w-full space-y-6">

                    {/* LLISTA DE BARRIS (Utilitza 'results' reals) */}
                    <div className="bg-white rounded-xl shadow-xl p-4">
                        <h3 className="text-2xl font-semibold text-blue-900 mb-4 border-b pb-2">Top Barris Recomanats</h3>
                        {results.map((neighborhood) => (
                            <div 
                                key={neighborhood.id}
                                // Aquesta classe gestiona l'estat de selecció amb selectedNeighborhood
                                className={`flex justify-between items-center p-3 mb-2 rounded-lg cursor-pointer transition duration-200 border ${selectedNeighborhood?.id === neighborhood.id ? 'bg-blue-100 border-blue-500 shadow-md' : 'hover:bg-gray-50'}`}
                                onClick={() => setSelectedNeighborhood(neighborhood)}
                            >
                                <span className="font-medium text-gray-800">{neighborhood.name}</span>
                                <span className={`text-2xl font-extrabold ${getScoreColor(neighborhood.score)}`}>
                                    {neighborhood.score}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* 3. PANELL DE DETALL / MOTOR DE JUSTIFICACIÓ (Utilitza 'selectedNeighborhood') */}
                    {selectedNeighborhood && (
                        <div className="bg-white rounded-xl shadow-xl p-6 border-l-4 border-blue-500">
                            <h3 className="text-2xl font-bold text-blue-900 mb-4">{selectedNeighborhood.name}</h3>
                            <p className="text-3xl font-extrabold mb-4">
                                Puntuació Total: 
                                <span className={getScoreColor(selectedNeighborhood.score)}>
                                    {selectedNeighborhood.score}
                                </span>
                            </p>
                            
                            {/* JUSTIFICACIÓ BASADA EN DADES (Assegura't que el teu backend envia un array anomenat 'metrics') */}
                            <h4 className="text-xl font-semibold mt-6 mb-3 text-blue-700">✅ Justificació Clau</h4>
                            <ul className="space-y-3">
                                {selectedNeighborhood.metrics?.map((metric, index) => (
                                    <li key={index} className="flex justify-between border-b pb-2 text-gray-700">
                                        <span className="font-medium">{metric.key}:</span>
                                        <span className={`font-bold text-lg ${metric.weight === 'Crucial' ? 'text-red-500' : ''}`}>{metric.value}</span>
                                    </li>
                                ))}
                            </ul>

                            <p className="mt-4 text-sm italic text-gray-500">
                                *Aquesta puntuació es basa en la prioritat i les preferències que has establert.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}