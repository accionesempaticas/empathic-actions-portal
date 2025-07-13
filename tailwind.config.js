
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/app/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/pages/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FFC401',
        secondary: '#02A9A9',
        graylight: '#E3E3E3',
      },
      fontFamily: {
        'body': ['Poppins', 'Arial', 'Helvetica', 'sans-serif'],
        'magnolia': ['Magnolia Script', 'cursive'],
      },
    },
  },
  plugins: [],
};