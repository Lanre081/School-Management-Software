/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#8B5E3C', // Brown
          light: '#A67C52',   // Lighter Brown (Accent)
          lighter: '#D9B382', // Lighter Brown
          dark: '#5D3A22',    // Darker Brown
        },
        secondary: {
          DEFAULT: '#FFF9F0', // Cream
          dark: '#F5E6D3',    // Darker Cream for borders/separators
        },
        cream: {
          DEFAULT: '#FFF9F0',
          50: '#FFFFFF',
          100: '#FFF9F0',
          200: '#F5E6D3',
          300: '#E6CCB2',
        },
        brown: {
          50: '#FDFBF7',
          100: '#F5E6D3',
          200: '#E6CCB2',
          300: '#D7B49E',
          400: '#C89F88',
          500: '#8B5E3C', // Base
          600: '#754C30',
          700: '#5D3A22',
          800: '#462B19',
          900: '#2E1C11',
        },
      },
    },
  },
  plugins: [],
}
