/*
 * This Config object is used throughout the application to
 * personalise your code and preferences for how you would
 * like things to work.
 *
 * For example, use the Config object to configure your menu links
 * without editing HTML, or change the page size on /blog without
 * touching any of the functional code.
 *
 */

const SITE_URL = "https://nextjs-contentful-blog-starter.vercel.app";

export const Config = {
  site: {
    owner: "VK test",
    title: "Next.js + Contentful blog test",
    domain: "https://vk-test-contentful.netlify.app/",
    email: "vasek@klicka.eu",
    feedDescription: "RSS Feed for example.com",
  },
  contentful: {
    accessToken: "CFPAT-nh3h6uqrneRA-i3QnAunBSXu06EZ_SllOQkW-ZZaM8Y",
    space: "ugjhw3umzt7r",
    entry: "master",
  },
  pageMeta: {
    openGraph: {
      twitterUser: "contentful",
    },
    home: {
      url: SITE_URL,
      slug: "/",
    },
    blogIndex: {
      url: `${SITE_URL}/blog`,
      slug: "/blog",
    },
    formIndex: {
      url: `${SITE_URL}/form`,
      slug: "/form",
    },
    blogIndexPage: {
      slug: "/blog/page/[page]",
    },
    post: {
      slug: "/blog/[slug]",
    },
    buildRss: {
      url: `${SITE_URL}/buildrss`,
      slug: "/buildrss",
    },
    notFound: {
      url: SITE_URL,
      slug: "/404",
    },
  },
  pagination: {
    pageSize: 2,
    recentPostsSize: 3,
    numOfSlides: 2,
    numOfAnswers: 10,
  },
  menuLinks: [
    {
      displayName: "Home",
      path: "/",
    },
    {
      displayName: "Blog",
      path: "/blog",
    },
    {
      displayName: "Form",
      path: "/form",
    },
    {
      displayName: "Mongo",
      path: "/mongo",
    },
  ],
};
