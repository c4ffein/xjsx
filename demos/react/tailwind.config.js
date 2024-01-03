import { tailwindExtract } from './libs/xjsx';

/** @type {import('tailwindcss').Config} */
export default {
  content: {
    files: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    extract: tailwindExtract,
  },
  theme: {
    extend: {
      colors: {
        react: '#61dafb',
        github: '#0d1117',
      },
    },
  },
  plugins: [],
};
