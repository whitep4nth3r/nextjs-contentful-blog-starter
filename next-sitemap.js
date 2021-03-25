module.exports = {
  siteUrl: "https://nextjs-contentful-blog-starter.vercel.app/",
  generateRobotsTxt: true, // (optional)
  robotsTxtOptions: {
    policies: [{ userAgent: "*", disallow: "/api" }],
  },
  exclude: ["/api/*", "/server-sitemap.xml"],
  robotsTxtOptions: {
    additionalSitemaps: [
      "https://nextjs-contentful-blog-starter.vercel.app/server-sitemap.xml",
    ],
  },
};
