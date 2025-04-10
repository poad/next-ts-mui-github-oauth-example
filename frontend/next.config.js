/** @type {import('next').NextConfig} */
const config = {
  output: 'export',
  reactStrictMode: true,
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
  // Module not found: Can't resolve 'msw/browser' が解決するまで
  turbo: {
    resolveAlias: {
      'msw/browser': 'node_modules/msw/lib/browser',
      'msw/node': 'node_modules/msw/lib/node',
    },
  },
};

export default config;
