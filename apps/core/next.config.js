/** @type {import('next').NextConfig} */

const withTM = require('next-transpile-modules')(['ui', 'utils', 'types']);

module.exports = withTM({
  async rewrites() {
    return [
      {
        source: '/blog/:match*',
        destination: 'https://blog.blacc.xyz/:match*',
      },
    ];
  },
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'pbs.twimg.com'],
  },
});
