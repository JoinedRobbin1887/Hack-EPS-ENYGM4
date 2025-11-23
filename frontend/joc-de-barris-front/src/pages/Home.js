import React from 'react';
import { Link } from 'react-router-dom';
import { ImageSlider } from '../components/ImageSlider';

export function Home() {
    return (
        <div className="relative min-h-screen flex flex-col items-center justify-start bg-cornflower-blue-100 pt-24"> 
            
            <div className="relative z-10 px-4 flex flex-col items-center pt-20"> 
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
    );
}