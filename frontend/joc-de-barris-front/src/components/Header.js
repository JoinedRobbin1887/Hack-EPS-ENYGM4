
import * as React from 'react';

const navItems = [
  { name: 'Home', href: '/'},
  { name: 'About Us', href: '/'},
  { name: 'Team', href: '/'},
  { name: 'Contact', href: '/'},
];

export function Header () {
  return ( 

    <header className=" top-0 left-0 right-0 z-50 py-6 px-10 fixed">
        
        <div className="flex items-center justify-between"> 
            
            <div className="flex items-center"> 
                <img 
                    src="next.svg"
                    alt="Logo nuestro"
                    className="h-10 ml-0.5 cursor-pointer"
                /> 
            </div>

            <div className="flex items-center space-x-8 text-2xl "> 
                <p className="hover:underline text-cornflower-blue-950 font-bold transition duration-300 cursor-pointer">HOME</p>
                <p className="hover:underline text-cornflower-blue-950 font-bold transition duration-300 cursor-pointer">ABOUT US</p>
                <p className="hover:underline text-cornflower-blue-950 font-bold transition duration-300 cursor-pointer">TEAM</p>
                <p className="hover:underline text-cornflower-blue-950 font-bold transition duration-300 cursor-pointer">CONTACT</p>
            </div>
            
        </div>
    </header>
  )
}