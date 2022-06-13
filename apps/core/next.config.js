/** @type {import('next').NextConfig} */

const withTM = require('next-transpile-modules')(['ui', 'utils', 'types']);

module.exports = withTM({
  async redirects() {
    return [
      {
        source: '/blog/:match*',
        destination: 'https://blog.blacc.xyz/:match*',
        permanent: true,
      },
    ];
  },
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'pbs.twimg.com'],
  },
});
