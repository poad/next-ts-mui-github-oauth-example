/** @type {import('next').NextConfig} */
const config =  {
  output: 'export',
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: true,
  cleanDistDir: true,
  compiler: {
    emotion: true,
  },
  modularizeImports: {
    '@mui/icons-material': {
      transform: '@mui/icons-material/{{member}}',
    },
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    appDir: true,
  },
};

export default config;
