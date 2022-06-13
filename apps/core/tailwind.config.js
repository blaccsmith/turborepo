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
            400: '#7B61FF',
            500: '#5b44fd',
          },
        },
      },
      animation: {
        fadeOut: 'fadeOut 0.5s ease-in',
        fadeIn: 'fadeIn 0.5s ease-out 0.5s',
        slide: 'keyFrameSlide 15s linear infinite forwards',
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
