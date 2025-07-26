export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
         animation: {
          'fade-loop': 'fade 1.5s ease-in-out infinite',
        },
        keyframes: {
          fade: {
            '0%, 100%': { opacity: '0.2' },
            '50%': { opacity: '1' },
          },
        },
        colors: {
          primary: "#2c67f2",
    card: "#273445",
    accent: "#00d395",
        },
        text: {
          primary: '#f1f5f9',     // slate-100
            secondary: '#94a3b8',   // slate-400
        },
        boxShadow: {
          dashboard: '0 10px 25px -3px rgba(12, 4, 4, 0.4)',
        card: '0 4px 6px -1px rgba(10, 18, 10, 0.25)',
        glow: '0 0 15px rgba(5, 14, 16, 0.96)',
        },
        fontFamily: {
          futuristic: ['Atkinson Hyperlegible Mono', 'sans-serif'],
        },


      borderRadius: {
        xl: "1rem",
      },

    },
    },
    plugins: [],
  };
   