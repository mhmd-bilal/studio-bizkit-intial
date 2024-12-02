/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'http',
          hostname: 'localhost',
          port: '3000',
          pathname: '/images/**',
        },
        {
          protocol: 'https',
          hostname: 'https://lively-treacle-4903c1.netlify.app',
          pathname: '/images/**',
        },
        {
            protocol: 'https',
            hostname: 'https://studiobizkit.com',
            pathname: '/images/**',
          },
      ],
    },
  };
  
  module.exports = nextConfig;
  