import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './views/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      colors: {
        brand: {
          black: '#050505',
          dark: '#0a0a0a',
          gray: '#1A1A1A',
          red: '#ef4444',
          accent: '#dc2626',
          glow: '#fee2e2',
        }
      },
      backgroundImage: {
        'grid-pattern': "linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)",
      },
      animation: {
        'pulse-fast': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scan': 'scan 3s linear infinite',
        'spin-slow': 'spin 4s linear infinite',
      },
      keyframes: {
        scan: {
          '0%': { top: '-10%' },
          '100%': { top: '110%' },
        }
      }
    },
  },
  plugins: [],
}

export default config
