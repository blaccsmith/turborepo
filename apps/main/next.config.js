/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/:match*',
        destination: 'https://core.blacc.xyz/:match*',
      },
      {
        source: '/blog/:match*',
        destination: 'https://blog.blacc.xyz/:match*',
      },
    ];
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
