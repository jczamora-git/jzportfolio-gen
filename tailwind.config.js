/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#F2EEFF',
          100: '#E5DCFF',
          200: '#CEBEFF',
          300: '#B096FF',
          400: '#8E67FF',
          500: '#6D4AFF', // Primary Brand Purple
          600: '#5938E8', // Primary Hover
          700: '#482BC9',
          800: '#3A22A5',
          900: '#2F1D85',
          950: '#1B0F54',
        },
        surface: {
          light: '#FAFAFC',
          card: '#FFFFFF',
          dark: '#0B0D17',
          darkCard: '#141827',
          darkElevated: '#1A2033',
        },
        textPrimary: {
          light: '#181824',
          dark: '#F3F4F8',
        },
        textSecondary: {
          light: '#737385',
          dark: '#9496A8',
        },
        borderSubtle: {
          light: '#E8E8EF',
          dark: '#232738',
        },
        accent: {
          purple: '#6D4AFF',
          blue: '#3b82f6',
          emerald: '#10b981',
          orange: '#f97316',
          neutral: '#737385',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px -1px rgba(0, 0, 0, 0.04)',
        'card-soft': '0 4px 20px -2px rgba(24, 24, 36, 0.04)',
        'card-hover': '0 10px 25px -3px rgba(24, 24, 36, 0.08)',
        'elevated': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
      }
    },
  },
  plugins: [],
}
