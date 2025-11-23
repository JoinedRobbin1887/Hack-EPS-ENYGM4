import React from 'react';

const teamMembers = [
  { name: "Daenerys T.", role: "Data Strategist", desc: "Focuses on ethical and sustainable urban metrics." },
  { name: "Tyrion L.", role: "Urban Consultant", desc: "Expert in nightlife, culture, and gastronomic hot spots." },
  { name: "Bran S.", role: "Accessibility Lead", desc: "Ensures data is processed for zero architectural barriers." },
];

export function Team() {
  return (
    <div className="min-h-screen pt-32 bg-cornflower-blue-100 p-10">
      <div className="max-w-6xl mx-auto">
        
        <h1 className='text-4xl font-extrabold text-blue-800 text-center mb-10'>
          Meet the Strategy Team
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition duration-300 text-center">
              <div className="w-24 h-24 bg-cornflower-blue-200 rounded-full mx-auto mb-4 flex items-center justify-center text-blue-800 text-3xl font-bold">
                {member.name[0]}
              </div>
              <h2 className="text-2xl font-bold text-blue-900 mb-1">{member.name}</h2>
              <p className="text-blue-600 font-semibold mb-3">{member.role}</p>
              <p className="text-gray-700 text-sm">{member.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}