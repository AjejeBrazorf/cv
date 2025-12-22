/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. Turbopack Configuration (Next.js 16)
  turbopack: {
    useLightningcss: false,
    rules: {
      // SVGR transformation
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
      // Rive files: Using the built-in asset loader
      '*.riv': {
        loaders: [], 
        // In Next.js 16, Turbopack expects this glob mapping 
        // to tell it how to resolve the final module type.
        as: '*.js', 
      },
    },
  },

  // 2. Webpack Configuration (For Production Build)
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    config.module.rules.push({
      test: /\.riv$/,
      type: 'asset/resource',
    });
    return config;
  },

  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'github.com' },
      { protocol: 'https', hostname: 'ajeje-host.netlify.app' },
      { protocol: 'http', hostname: 'localhost', port: '3000' },
    ],
  },
};

export default nextConfig;