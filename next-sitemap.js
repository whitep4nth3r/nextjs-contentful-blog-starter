module.exports = {
  siteUrl: "https://vk-test-contentful.netlify.app/",
  generateRobotsTxt: true, // (optional)
  robotsTxtOptions: {
    policies: [{ userAgent: "*", disallow: "/api" }],
    additionalSitemaps: [
      "https://nextjs-contentful-blog-starter.vercel.app/server-sitemap.xml",
    ],
  },
  exclude: ["/api/*", "/server-sitemap.xml"],
};
