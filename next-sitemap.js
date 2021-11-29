module.exports = {
  siteUrl: "https://deloitte-contentful-starter.netlify.app/",
  generateRobotsTxt: true, // (optional)
  robotsTxtOptions: {
    policies: [{ userAgent: "*", disallow: "/api" }],
    additionalSitemaps: [
      "https://deloitte-contentful-starter.netlify.app/server-sitemap.xml",
    ],
  },
  exclude: ["/api/*", "/server-sitemap.xml"],
};
