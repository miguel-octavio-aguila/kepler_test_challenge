/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        gray: {
          50: '#f8fafc',  // Zinc-50
          100: '#f1f5f9', // Zinc-100
          200: '#e2e8f0', // Zinc-200
          300: '#cbd5e1', // Zinc-300
          400: '#94a3b8', // Zinc-400
          500: '#64748b', // Zinc-500
          600: '#475569', // Zinc-600
          700: '#334155', // Zinc-700
          800: '#1e293b', // Zinc-800
          900: '#0f172a', // Zinc-900 (Deep/Dark)
        },
        primary: {
          DEFAULT: '#4f46e5', // Indigo-600
          hover: '#4338ca',    // Indigo-700
          light: '#e0e7ff',    // Indigo-100 (Backgrounds)
        }
      }
    },
  },
  plugins: [],
}