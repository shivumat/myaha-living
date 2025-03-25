/** @type {import('next').NextConfig} */
const nextConfig = {
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
