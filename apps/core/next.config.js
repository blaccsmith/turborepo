/** @type {import('next').NextConfig} */

const withTM = require('next-transpile-modules')(['ui', 'utils', 'types']);

module.exports = withTM({
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'pbs.twimg.com', 'avatars.githubusercontent.com'],
  },
  async rewrites() {
    return [
      {
        source: '/script.js',
        destination: 'https://core.up.railway.app/umami.js',
      },
      {
        source: '/api/collect',
        destination: 'https://core.up.railway.app/api/collect',
      },
    ];
  },
});
