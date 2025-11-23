import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ImageSlider } from './ImageSlider'; 

export function Results() {
  const location = useLocation();
  // Assegurem que resultats sigui un array, encara que el backend envii un objecte
  const [selectedNeighborhood, setSelectedNeighborhood] = useState(results?.[0] || null);

  const getScoreColor = (score) => {
      if (score >= 9.0) return 'text-green-600';
      if (score >= 8.0) return 'text-yellow-600';
      return 'text-red-600';
  };
  
  if (!results || results.length === 0) {
      return (
        <div className="min-h-screen pt-32 bg-cornflower-blue-100 p-20 text-center">
          <h2 className="text-4xl font-bold text-red-600 mb-4">NO results were found</h2>
          <p className="text-xl text-gray-700">The recommendation engine could not find an ideal neighborhood based on these preferences.</p>
        </div>
      );
  }
  
  const streetViewUrls = selectedNeighborhood?.street_view_urls?.urls || []; // si el backend envia l'objecte, accedim a la clau 'urls'

  
  return (
    <div className="min-h-screen pt-32 bg-cornflower-blue-100">
          
      <h2 className="text-4xl font-bold text-center text-blue-900 mb-10">
        Recommendation Results
      </h2>
          
      <div className="flex flex-col lg:flex-row max-w-7xl mx-auto px-4 gap-6">
              
        {/* Mirar imatge */}
        <div className="lg:w-3/5 w-full h-96 lg:h-auto rounded-xl shadow-xl overflow-hidden flex items-center justify-center">
          
          {streetViewUrls.length > 0 ? (
            // Si tenim URLs de Street View, utilitzem l'ImageSlider
            <ImageSlider 
                images={streetViewUrls}
                autoPlayInterval={3000} 
            />
          ) : (
            // Si no hi ha dades de Street View
            <div className="p-4 text-gray-500 text-center text-xl">
                Visual data not available for this location.
            </div>
          )}

        </div>

        {/* Llista de recomanacions i motor */}
        <div className="lg:w-2/5 w-full space-y-6">

          {/* Llista de recomanacions */}
          <div className="bg-white rounded-xl shadow-xl p-4">
            <h3 className="text-2xl font-semibold text-blue-900 mb-4 border-b pb-2">Top Recommended Neighborhoods</h3>
            {results.map((neighborhood) => (
              <div 
                key={neighborhood.id}
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

          {/* Motor*/}
          {selectedNeighborhood && (
            <div className="bg-white rounded-xl shadow-xl p-6 border-l-4 border-blue-500">
              <h3 className="text-2xl font-bold text-blue-900 mb-4">{selectedNeighborhood.name}</h3>
              <p className="text-3xl font-extrabold mb-4">
                Total Score: 
                <span className={getScoreColor(selectedNeighborhood.score)}>
                  {selectedNeighborhood.score}
                </span>
              </p>
              
              <h4 className="text-xl font-semibold mt-6 mb-3 text-blue-700">Key Justification Metrics</h4>
              <ul className="space-y-3">
                {selectedNeighborhood.metrics?.map((metric, index) => (
                  <li key={index} className="flex justify-between border-b pb-2 text-gray-700">
                    <span className="font-medium">{metric.key}:</span>
                    <span className={`font-bold text-lg ${metric.weight === 'Crucial' ? 'text-red-500' : ''}`}>{metric.value}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-4 text-sm italic text-gray-500">
                *This score is based on the priority and preferences you have set.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}