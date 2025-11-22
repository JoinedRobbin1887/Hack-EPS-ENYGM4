
import * as React from 'react';

const navItems = [
  { name: 'Home', href: '/'},
  { name: 'About Us', href: '/'},
  { name: 'Team', href: '/'},
  { name: 'Contact', href: '/'},
];
export function Header () {
  return ( 
    <header className="top-0 left-0 right-0 z-50 py-6 px-10 fixed bg-white/70 backdrop-blur-sm">
        
        {/* ELIMINEM max-w-7xl mx-auto PER ASSEGURAR LA SEPARACIÓ */}
        <div className="flex items-center justify-between"> 
            
            {/* ELEMENT FILL 1 (ESQUERRA): El Logo */}
            <a href="/" className="flex items-center space-x-2"> 
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-600 text-white shadow-lg flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                </div>
                <span className="text-xl font-bold tracking-wider text-blue-800 hidden sm:inline">
                    THE GOOD NEIGHBORHOOD
                </span>
            </a>

            {/* ELEMENT FILL 2 (DRETA): La Navegació */}
            <div className="flex items-center space-x-8 text-lg"> 
                {navItems.map((item) => (
                    <a 
                        key={item.name}
                        href={item.href}
                        className="hover:text-blue-600 text-cornflower-blue-950 font-bold transition duration-300 cursor-pointer uppercase"
                    >
                        {item.name}
                    </a>
                ))}
            </div>
            
        </div>
    </header>
  )
}