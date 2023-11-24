/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily : {
        'Agbalumo' : ['Agbalumo'],
        'Poppins' : ['Poppins'],
        'Archivo' : ['Archivo']
      },
    },
  },
  plugins: [],
}

