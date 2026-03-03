import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        nvidia: {
          green: '#76B900',
          'green-light': '#8AD100',
          'green-dark': '#5A8F00',
          neon: '#00FF88',
          pulse: '#00CC6A',
        },
        surface: {
          black: '#000000',
          void: '#0D0D0D',
          carbon: '#121212',
          graphite: '#1A1A1F',
          gunmetal: '#242424',
          steel: '#2D2D2D',
          slate: '#3D3D',
        },
        accent: {
          blue: '#00D4FF',
          purple: '#9D4EDD',
          amber: '#FFB800',
          red: '#FF4444',
          cyan: '#00E5CC',
        },
      },
      fontFamily: {
        display: ['Rajdhani', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'glow': '0 0 20px rgba(118, 185, 0, 0.3)',
        'glow-lg': '0 0 40px rgba(118, 185, 0, 0.4)',
        'glow-sm': '0 0 10px rgba(118, 185, 0, 0.2)',
        'ai-glow': '0 0 20px rgba(157, 78, 221, 0.3)',
        'ai-glow-lg': '0 0 40px rgba(157, 78, 221, 0.4)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'mesh-gradient': 'radial-gradient(at 40% 20%, rgba(118, 185, 0, 0.08) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(157, 78, 221, 0.08) 0px, transparent 50%), radial-gradient(at 0% 50%, rgba(0, 212, 255, 0.05) 0px, transparent 50%)',
      },
      animation: {
        'pulse-green': 'green-pulse 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'spin-slow': 'spin 3s linear infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        'green-pulse': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(118, 185, 0, 0.4)' },
          '50%': { boxShadow: '0 0 20px 5px rgba(118, 185, 0, 0.2)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
