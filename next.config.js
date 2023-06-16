/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['mljdb885ttsd.i.optimole.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        port: '',
        pathname: '**',
      },
    ],
  },
};

module.exports = nextConfig;
