const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: '/robots.txt',
        destination: '/api/robots',
      },
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap',
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/css/emotion.js-intro',
        destination: '/css/emotionjs-intro',
        permanent: true,
      },
    ];
  },
  experimental: {
    // https://github.com/vercel/next.js/issues/52876#issuecomment-1647623310
    serverComponentsExternalPackages: ["uglify-js"],
  },
});
