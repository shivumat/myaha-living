module.exports = {
  siteUrl: 'https://www.myahaliving.com', // Replace with your actual domain
  generateRobotsTxt: true, // (optional)
  sitemapSize: 5000,
  changefreq: 'daily',
  priority: 0.7,
  exclude: ['/admin/*'], // exclude private routes
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: '/admin' },
    ],
  },
};
