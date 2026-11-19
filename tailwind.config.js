/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: { 50: '#FFF9F2', 100: '#F8EEDF', 200: '#F0E1C8' },
        ink: { 900: '#250B10', 800: '#38151B' },
        // Utility name kept from the original theme; this is now the deep red.
        emerald: { 950: '#2E0A12', 900: '#4A0E19', 800: '#7A1727', 700: '#8F2033' },
        gold: { 300: '#F3DFC1', 400: '#E7C58D', 500: '#CDA667', 600: '#A97D3A' },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['"DM Sans"', 'sans-serif'],
      },
      animation: {
        'fade-up': 'fadeUp 0.9s cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-in': 'fadeIn 1.2s ease both',
        'float-slow': 'floatSlow 9s ease-in-out infinite',
        shimmer: 'shimmer 6s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(28px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-14px) rotate(3deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
      letterSpacing: {
        widest2: '0.35em',
      },
    },
  },
  plugins: [],
};
