/** @type {import('next').NextConfig} */

const withTM = require('next-transpile-modules')(['ui', 'utils', 'types']);

module.exports = withTM({
  reactStrictMode: true,
  images: {
    domains: ['avatars.githubusercontent.com', 'cdn.discordapp.com'],
  },
  async rewrites() {
    return [
      {
        source: '/script.js',
        destination: 'https://data.blacc.xyz/umami.js',
      },
      {
        source: '/api/collect',
        destination: 'https://data.blacc.xyz/api/collect',
      },
    ];
  },
});
