/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'app-black': '#050510',
        'app-dark-purple': '#1a0b2e',
        'app-primary': '#764ba2',
        'app-accent': '#ff00cc',
        'app-gold': '#ffd700',
        'app-gold-light': '#ffffcc',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          'from': { boxShadow: '0 0 10px #764ba2, 0 0 20px #764ba2' },
          'to': { boxShadow: '0 0 20px #ff00cc, 0 0 30px #ff00cc' },
        }
      }
    },
  },
  plugins: [],
}
