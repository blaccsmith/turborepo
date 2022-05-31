/** @type {import('next').NextConfig} */

const withTM = require('next-transpile-modules')(['ui']);

module.exports = withTM({
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'pbs.twimg.com'],
  },
});
