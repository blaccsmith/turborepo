/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: 'https://www.core.blacc.xyz/:match*',
        permanent: true,
        basePath: false,
      },
      {
        source: '/blog/:match*',
        destination: 'https://www.blog.blacc.xyz/:match*',
        permanent: true,
        basePath: false,
      },
    ];
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
