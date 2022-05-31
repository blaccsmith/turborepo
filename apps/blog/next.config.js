/** @type {import('next').NextConfig} */

const withTM = require('next-transpile-modules')(['ui', 'utils', 'types']);

module.exports = withTM({
  reactStrictMode: true,
  images: {
    domains: ['avatars.githubusercontent.com'],
  },
});
