/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#006270", // Azul Petróleo
        secondary: "#099394", // Verde Água Escuro
        accent: "#00ECC7", // Verde Água Claro
        white: "#FFFFFF", // Branco
      },
    },
  },
  plugins: [],
};
