import './App.css';
import { Header } from './components/Header';
import { ImageSlider } from './components/ImageSlider';

function App() {
  return (
    <div className="relative h-screen flex items-center justify-center bg-cornflower-blue-200"> {/* Fondo claro aquí */}
      
      <Header />
    
      <div className="relative z-10 px-4 flex flex-col items-center"> 
        
        <h1 className='text-4xl md:text-6xl font-extrabold text-cornflower-blue-900 uppercase tracking-wider mb-10'> {/* Aumento mb */}
          THE GOOD {' '}
          <span className='text-cornflower-blue-700'> {/* Oscurecemos el color del span para contraste */}
            NEIGHBORHOOD
          </span>
        </h1>
        
        {/* Botón: Centrado por el flex-col items-center del padre */}
        <div className="flex justify-center space-x-4 mb-20"> {/* Aumento mb para más espacio debajo */}
          <button className="bg-cornflower-blue-400 hover:bg-cornflower-blue-600 text-white text-4xl font-bold py-3 px-8 transition duration-300 cursor-pointer rounded-full shadow-lg">
            START
          </button>
        </div>
        
        {/* Slider: ahora tiene más espacio arriba y un borde propio */}
        <div className="w-full max-w-4xl mx-auto"> {/* max-w-4xl para controlar el ancho */}
            <ImageSlider autoPlayInterval={5000} />
        </div>
        
      </div>
      
    </div>
  );
}

export default App;
