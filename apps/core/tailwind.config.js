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
        slide: 'slideLeft 6s linear infinite;',
      },
      keyframes: {
        slideLeft: {
          '0%': {
            transform: 'translate3d(0, 0, 0)',
          },
          '100%': {
            transform: 'translate3d(-130px, 0, 0)',
          },
        },
      },
    },
  },
  plugins: [],
};
