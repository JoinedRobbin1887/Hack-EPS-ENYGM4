import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './App.css';
import { Header } from './components/Header';
import { ImageSlider } from './components/ImageSlider';
import { StartPage } from './components/StartPage';
import { Results } from "./components/Results";

function App() {
  return (
    <Router>
      <Routes>
        {/* Página inicial */}
        <Route
          path="/"
          element={
            <div className="relative h-screen flex items-center justify-center bg-cornflower-blue-200">
              <Header />
              <div className="relative z-10 px-4 flex flex-col items-center"> 
                <h1 className='text-4xl md:text-6xl font-extrabold text-cornflower-blue-900 uppercase tracking-wider mb-10'>
                  THE GOOD {' '}
                  <span className='text-cornflower-blue-700'>
                    NEIGHBORHOOD
                  </span>
                </h1>

                {/* Botón START */}
                <div className="flex justify-center space-x-4 mb-20">
                  <Link to="/start">
                    <button className="bg-cornflower-blue-400 hover:bg-cornflower-blue-600 text-white text-4xl font-bold py-3 px-8 transition duration-300 cursor-pointer rounded-full shadow-lg">
                      START
                    </button>
                  </Link>
                </div>

                {/* Slider */}
                <div className="w-full max-w-4xl mx-auto">
                  <ImageSlider autoPlayInterval={5000} />
                </div>
              </div>
            </div>
          }
        />

        {/* Página StartPage */}
        <Route path="/start" element={<StartPage />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </Router>
  );
}

export default App;
