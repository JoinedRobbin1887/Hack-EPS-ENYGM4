import React, { useState, useEffect } from 'react';

const slides = [
  { url: '/image1.jpg', alt: 'visita 1' },
  { url: '/image2.jpg', alt: 'visita 2'},
  { url: '/image3.jpg', alt: 'visita 3'},
  { url: '/image4.jpg', alt: 'visita 4'},

];

export function ImageSlider({ autoPlayInterval = 4000 }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (autoPlayInterval > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex === slides.length - 1 ? 0 : prevIndex + 1
        );
      }, autoPlayInterval);

      return () => clearInterval(interval);
    }
  }, [autoPlayInterval]);

  const goToNext = () => {
    const isLastSLide = currentIndex === slides.length - 1;
    const newIndex = isLastSLide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const currentSlideUrl = slides[currentIndex].url;

  return (
    // Contenedor principal: define el tamaño del carrusel
    <div className="relative w-[800px] h-[400px] mx-auto mt-16 group">
      
      {/* Imagen Actual */}
      <div 
        className="w-full h-full rounded-2xl bg-center bg-cover duration-500"
        style={{ backgroundImage: `url(${currentSlideUrl})` }}
        aria-label={slides[currentIndex].alt}
      ></div>

      {/* Flecha Izquierda */}
      <div 
        onClick={goToPrevious}
        className="hidden group-hover:block absolute top-1/2 -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/40 text-white cursor-pointer"
      >
        &#10094; {/* Carácter de flecha izquierda */}
      </div>

      {/* Flecha Derecha */}
      <div 
        onClick={goToNext}
        className="hidden group-hover:block absolute top-1/2 -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/40 text-white cursor-pointer"
      >
        &#10095; {/* Carácter de flecha derecha */}
      </div>
      
      {/* Puntos indicadores (opcional) */}
      <div className="flex top-4 justify-center py-2">
        {slides.map((slide, slideIndex) => (
          <div 
            key={slideIndex} 
            onClick={() => setCurrentIndex(slideIndex)}
            className={`cursor-pointer mx-1 h-2 w-2 rounded-full ${slideIndex === currentIndex ? 'bg-cornflower-blue-400' : 'bg-gray-500'}`}
          ></div>
        ))}
      </div>
    </div>
  );
}
