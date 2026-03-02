/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        space: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        neon: '0 0 25px rgba(59, 130, 246, 0.4)',
        'neon-sm': '0 0 14px rgba(96, 165, 250, 0.3)',
      },
    },
  },
  daisyui: {
    themes: ['lofi'],
    logs: false,
  },
  plugins: [require('daisyui')],
}
