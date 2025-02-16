/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        })
        return config
    },
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: '*.supabase.co',
            port: '',
            pathname: '/**',
          },
          {
            protocol: 'http',
            hostname: 'localhost',
            port: '3000',
            pathname: '/**',
          },
        ]
    }
};

export default nextConfig;
