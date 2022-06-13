module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}', '../../packages/ui/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        accent: '#7B61FF',
        secondary: '#313131',
        brand: {
          black: '#212121',
          purple: {
            50: '#efe9ff',
            100: '#d5c9fe',
            200: '#b8a5fe',
            300: '#987fff',
            400: '#7b61ff',
            500: '#5b44fd',
            600: '#4c3ff6',
            700: '#3237ed',
            800: '#0031e7',
            900: '#0026d8',
          },
        },
      },
      animation: {
        fadeOut: 'fadeOut 0.5s ease-in',
        fadeIn: 'fadeIn 0.5s ease-out 0.5s',
        slide: 'keyFrameSlide 20s linear infinite forwards',
        glow: 'keyFrameGlow 1s linear infinite alternate',
      },
      keyframes: {
        fadeOut: {
          '0%': {
            transform: 'scale(1)',
          },
          '100%': {
            transform: 'scale(0)',
          },
        },
        fadeIn: {
          '0%': {
            transform: 'scale(0)',
          },
          '100%': {
            transform: 'scale(1)',
          },
        },
        keyFrameSlide: {
          '0%': {
            transform: 'translateX(-110%)',
          },
          '100%': {
            transform: 'translateX(100%)',
          },
        },
        keyFrameGlow: {
          '0%': {
            transform: 'scale(1)',
          },
          '100%': {
            transform: 'scale(0.9)',
          },
        },
      },
    },
  },
  plugins: [],
};
