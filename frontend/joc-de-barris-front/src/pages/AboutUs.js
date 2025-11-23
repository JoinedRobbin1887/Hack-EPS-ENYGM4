import React from 'react';

export function AboutUs() {
  return (
    <div className="min-h-screen pt-32 bg-cornflower-blue-100 p-10">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-2xl">
        
        <h1 className='text-4xl font-extrabold text-blue-800 mb-6 border-b pb-2'>
          Our Mission: Data Meets Strategy
        </h1>
        
        <p className="text-gray-700 mb-6 leading-relaxed">
          The Good Neighborhood project was built to solve a universal challenge: finding the ideal place to live based on personalized needs. We combine **data science**, **API integration**, and a **client-centric approach** to match unique user profiles with the perfect neighborhood in Los Angeles.
        </p>

        <h2 className="text-2xl font-semibold text-blue-700 mt-8 mb-4">
          The Game of Neighborhoods
        </h2>
        <p className="text-gray-700 leading-relaxed">
          Inspired by strategic thinking, we analyzed L.A. using metrics like crime rates, walkability, luxury indices, noise pollution, and access to nature. Our goal is to provide a solid, data-backed justification for every neighborhood recommendation.
        </p>

      </div>
    </div>
  );
}