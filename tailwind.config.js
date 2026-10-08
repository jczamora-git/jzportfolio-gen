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
          100: '#E6DCFF',
          200: '#CEBEFF',
          300: '#B096FF',
          400: '#8E67FF',
          500: '#6947FF', // Signature Editorial Purple
          600: '#5736EB', // Interactive Hover
          700: '#4627CB',
          800: '#371EA6',
          900: '#2A1783',
          950: '#170C4E',
        },
        surface: {
          light: '#F8F8F7',
          card: '#FFFFFF',
          secondary: '#F1F0EE',
          dark: '#0E1017',
          darkCard: '#161822',
          darkElevated: '#1E202E',
        },
        textPrimary: {
          light: '#14151B',
          dark: '#F1F2F6',
        },
        textSecondary: {
          light: '#696976',
          dark: '#9496A6',
        },
        borderSubtle: {
          light: '#E5E4EA',
          dark: '#242738',
        },
        accent: {
          purple: '#6947FF',
          blue: '#3b82f6',
          emerald: '#10b981',
          orange: '#f97316',
          neutral: '#696976',
        }
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(20, 21, 27, 0.04), 0 1px 2px -1px rgba(20, 21, 27, 0.04)',
        'card-soft': '0 4px 20px -2px rgba(20, 21, 27, 0.03)',
        'card-hover': '0 10px 25px -3px rgba(20, 21, 27, 0.06)',
        'elevated': '0 20px 30px -8px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.04)',
      }
    },
  },
  plugins: [],
}
