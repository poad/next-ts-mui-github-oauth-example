/** @type {import('next').NextConfig} */
const config =  {
  output: 'export',
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: true,
  cleanDistDir: true,
  images: {
    unoptimized: true,
  },
  experimental: {
    appDir: true,
  },
};

module.exports = config;
