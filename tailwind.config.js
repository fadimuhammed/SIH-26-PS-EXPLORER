/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        blue: {
          950: '#081B31',
          900: '#0F2A4A',
          850: '#12315390',
          800: '#153862',
          700: '#1D4573',
          600: '#2A5686',
          500: '#3D6A9A',
        },
        cyan: {
          400: '#E8EFF5',
          300: '#F5F8FB',
        },
        amber: {
          400: '#FF6B35',
        },
        grid: '#1D4573',
        ink: {
          100: '#E8EFF5',
          300: '#B9CADC',
          500: '#6E89A8',
        },
      },
      fontFamily: {
        sans: ['"IBM Plex Sans"', '"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', '"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        blueprint: `linear-gradient(#16223D 1px, transparent 1px), linear-gradient(90deg, #16223D 1px, transparent 1px)`,
      },
      backgroundSize: {
        grid: '32px 32px',
      },
    },
  },
  plugins: [],
}
