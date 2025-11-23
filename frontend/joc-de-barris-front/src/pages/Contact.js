import React from 'react';

export function Contact() {
  return (
    <div className="min-h-screen pt-32 bg-cornflower-blue-100 p-10">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-2xl">
        
        <h1 className='text-4xl font-extrabold text-blue-800 mb-6 border-b pb-2'>
          Get in Touch
        </h1>
        
        <p className="text-gray-700 mb-6">
          Have questions about the data, the API connections, or the scoring model? Send us a message!
        </p>

        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input type="text" id="name" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" id="email" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
            <textarea id="message" rows="4" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"></textarea>
          </div>
          <button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300"
          >
            Send Message
          </button>
        </form>

      </div>
    </div>
  );
}