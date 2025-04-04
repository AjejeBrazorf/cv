/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        })
        config.module.rules.push({
          test: /\.riv$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: 'static',
              },
            },
          ],
        })
        return config
    },
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'github.com',
            port: '',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'ajeje-host.netlify.app',
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
