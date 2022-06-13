/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/:match*',
        destination: 'https://core.blacc.xyz/:match*',
        permanent: true,
      },
      {
        source: '/blog/:match*',
        destination: 'https://blog.blacc.xyz/:match*',
        permanent: true,
      },
    ];
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
