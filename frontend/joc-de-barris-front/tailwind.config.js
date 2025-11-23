/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cornflower-blue': {
          '50': '#f0f6fe',
          '100': '#deeafb',
          '200': '#c5dcf8',
          '300': '#9dc7f3',
          '400': '#62a0ea',
          '500': '#4c87e5',
          '600': '#376bd9',
          '700': '#2e57c7',
          '800': '#2c48a1',
          '900': '#284080',
          '950': '#1d284e',
        },
      },  
    },
  },
  plugins: [],
}