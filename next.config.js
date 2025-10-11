/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/:path*',
        destination: 'https://myahaliving.co.in/:path*',
        permanent: true, // 308 Permanent redirect
      },
    ];
  },
  images: {
    domains: [
      'localhost',
      'cdn.shopify.com',
      'https://www.myahaliving.com/',
      'https://myaha-living.vercel.app/',
      'i.postimg.cc',
    ], // Add your production domain if deploying
  },
};

module.exports = nextConfig;
