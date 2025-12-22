/** @type {import('next').NextConfig} */
const nextConfig = {
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