/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#3B82F6', // Lighter shade of primary color
          DEFAULT: '#005BD4', // Primary color
          dark: '#1D4ED8', // Darker shade of primary color
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontSize: {
        sm: '0.8rem',
        base: '1rem',
        lg: '1.25rem',
        xl: '1.5rem',
        '2xl': '2rem',
        '3xl': '4rem',
      },
      borderRadius: {
        DEFAULT: '16px',
      },
      grayscale: {
        80: '80%',
      },
    },
  },
  plugins: [],
};
