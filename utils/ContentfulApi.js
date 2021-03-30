import { Config } from "./Config";

/**
 * This class constructs GraphQL queries for blog posts, page content and other data
 * and calls out to the Contentful GraphQL API.
 *
 * Contentful GraphQL API docs:
 * https://www.contentful.com/developers/docs/references/graphql/
 *
 * Explore the GraphQL API in depth in the GraphiQL Playground:
 * https://graphql.contentful.com/content/v1/spaces/{SPACE_ID}/explore?access_token={ACCESS_TOKEN}
 *
 */

const defaultOptions = {
  preview: false,
};

export default class ContentfulApi {
  /**
   * Fetch the content for a single page by slug.
   *
   * The content type uses the powerful Rich Text field type for the
   * body of the post.
   *
   * This query fetches linked assets (i.e. images) and entries
   * (i.e. video embed and code block entries) that are embedded
   * in the Rich Text field. This is rendered to the page using
   * @components/RichTextPageContent.
   *
   * For more information on Rich Text fields in Contentful, view the
   * documentation here: https://www.contentful.com/developers/docs/concepts/rich-text/
   *
   * Linked assets and entries are parsed and rendered using the npm package
   * @contentful/rich-text-react-renderer
   *
   * https://www.npmjs.com/package/@contentful/rich-text-react-renderer
   *
   * param: slug (string)
   *
   */
  static async getPageContentBySlug(slug, options = defaultOptions) {
    const query = `
    {
      pageContentCollection(limit: 1, where: {slug: "${slug}"}, preview: ${options.preview}) {
        items {
          sys {
            id
          }
          heroBanner {
            headline
            subHeading
            internalLink
            externalLink
            ctaText
            image {
              url
              title
              description
              width
              height
            }
          }
          title
          description
          slug
          body {
            json
            links {
              entries {
                block {
                  sys {
                    id
                  }
                  __typename
                  ... on VideoEmbed {
                    title
                    embedUrl
                  }
                  ... on CodeBlock {
                    description
                    language
                    code
                  }
                }
              }
              assets {
                block {
                  sys {
                    id
                  }
                  url
                  title
                  width
                  height
                  description
                }
              }
            }
          }
        }
      }
    }`;

    const response = await this.callContentful(query, options);

    const pageContent = response.data.pageContentCollection.items
      ? response.data.pageContentCollection.items
      : [];

    return pageContent.pop();
  }

  /**
   * Fetch a batch of blog post slugs (by given page number).
   *
   * This method queries the GraphQL API for a single batch of blog post slugs.
   *
   * The query limit of 100 is the maximum number of slugs
   * we can fetch with this query due to GraphQL complexity costs.
   *
   * For more information about GraphQL query complexity, visit:
   * https://www.contentful.com/developers/videos/learn-graphql/#graphql-fragments-and-query-complexity
   *
   * param: page (number)
   *
   */
  static async getPaginatedSlugs(page) {
    const queryLimit = 100;
    const skipMultiplier = page === 1 ? 0 : page - 1;
    const skip = skipMultiplier > 0 ? queryLimit * skipMultiplier : 0;

    const query = `{
        blogPostCollection(limit: ${queryLimit}, skip: ${skip}, order: date_DESC) {
          total
          items {
            slug
            }
          }
        }`;

    const response = await this.callContentful(query);

    const { total } = response.data.blogPostCollection;
    const slugs = response.data.blogPostCollection.items
      ? response.data.blogPostCollection.items.map((item) => item.slug)
      : [];

    return { slugs, total };
  }

  /**
   * Fetch all blog post slugs.
   *
   * This method queries the GraphQL API for blog post slugs
   * in batches that accounts for the query complexity cost,
   * and returns them in one array.
   *
   * This method is used on pages/blog/[slug] inside getStaticPaths() to
   * generate all dynamic blog post routes.
   *
   * For more information about GraphQL query complexity, visit:
   * https://www.contentful.com/developers/videos/learn-graphql/#graphql-fragments-and-query-complexity
   *
   */
  static async getAllPostSlugs() {
    let page = 1;
    let shouldQueryMoreSlugs = true;
    const returnSlugs = [];

    while (shouldQueryMoreSlugs) {
      const response = await this.getPaginatedSlugs(page);

      if (response.slugs.length > 0) {
        returnSlugs.push(...response.slugs);
      }

      shouldQueryMoreSlugs = returnSlugs.length < response.total;
      page++;
    }

    return returnSlugs;
  }

  /**
   * Fetch a batch of blog posts (by given page number).
   *
   * This method queries the GraphQL API for a single batch of blog posts.
   *
   * The query limit of 10 is the maximum number of posts
   * we can fetch with this query due to GraphQL complexity costs.
   *
   * For more information about GraphQL query complexity, visit:
   * https://www.contentful.com/developers/videos/learn-graphql/#graphql-fragments-and-query-complexity
   *
   * param: page (number)
   *
   */
  static async getPaginatedBlogPosts(page) {
    const queryLimit = 10;
    const skipMultiplier = page === 1 ? 0 : page - 1;
    const skip = skipMultiplier > 0 ? queryLimit * skipMultiplier : 0;

    const query = `{
        blogPostCollection(limit: ${queryLimit}, skip: ${skip}, order: date_DESC) {
          total
          items {
            sys {
              id
            }
            date
            title
            slug
            excerpt
            tags
            externalUrl
            author {
              name
              description
              twitchUsername
              twitterUsername
              gitHubUsername
              websiteUrl
              image {
                url
                title
                width
                height
                description
              }
            }
            body {
              json
              links {
                entries {
                  block {
                    sys {
                      id
                    }
                    __typename
                    ... on VideoEmbed {
                      title
                      embedUrl
                    }
                    ... on CodeBlock {
                      description
                      language
                      code
                    }
                  }
                }
                assets {
                  block {
                    sys {
                      id
                    }
                    url
                    title
                    width
                    height
                    description
                  }
                }
              }
            }
          }
        }
      }`;

    const response = await this.callContentful(query);

    const { total } = response.data.blogPostCollection;
    const posts = response.data.blogPostCollection.items
      ? response.data.blogPostCollection.items
      : [];

    return { posts, total };
  }

  /**
   * Fetch all blog posts.
   *
   * This method queries the GraphQL API for blog posts
   * in batches that accounts for the query complexity cost,
   * and returns them in one array.
   *
   * This method is used to build the RSS feed on pages/buildrss.
   *
   * For more information about GraphQL query complexity, visit:
   * https://www.contentful.com/developers/videos/learn-graphql/#graphql-fragments-and-query-complexity
   *
   */
  static async getAllBlogPosts() {
    let page = 1;
    let shouldQueryMorePosts = true;
    const returnPosts = [];

    while (shouldQueryMorePosts) {
      const response = await this.getPaginatedBlogPosts(page);

      if (response.posts.length > 0) {
        returnPosts.push(...response.posts);
      }

      shouldQueryMorePosts = returnPosts.length < response.total;
      page++;
    }

    return returnPosts;
  }

  /**
   * Fetch a single blog post by slug.
   *
   * This method is used on pages/blog/[slug] to fetch the data for
   * individual blog posts at build time, which are prerendered as
   * static HTML.
   *
   * The content type uses the powerful Rich Text field type for the
   * body of the post.
   *
   * This query fetches linked assets (i.e. images) and entries
   * (i.e. video embed and code block entries) that are embedded
   * in the Rich Text field. This is rendered to the page using
   * @components/RichTextPageContent.
   *
   * For more information on Rich Text fields in Contentful, view the
   * documentation here: https://www.contentful.com/developers/docs/concepts/rich-text/
   *
   * Linked assets and entries are parsed and rendered using the npm package
   * @contentful/rich-text-react-renderer
   *
   * https://www.npmjs.com/package/@contentful/rich-text-react-renderer
   *
   * param: slug (string)
   *
   */
  static async getPostBySlug(slug, options = defaultOptions) {
    const query = `{
      blogPostCollection(limit: 1, where: {slug: "${slug}"}, preview: ${options.preview}) {
        total
        items {
          sys {
            id
          }
          date
          title
          slug
          excerpt
          tags
          externalUrl
          author {
            name
            description
            twitchUsername
            twitterUsername
            gitHubUsername
            websiteUrl
            image {
              url
              title
              width
              height
              description
            }
          }
          body {
            json
            links {
              entries {
                block {
                  sys {
                    id
                  }
                  __typename
                  ... on VideoEmbed {
                    title
                    embedUrl
                  }
                  ... on CodeBlock {
                    description
                    language
                    code
                  }
                }
              }
              assets {
                block {
                  sys {
                    id
                  }
                  url
                  title
                  width
                  height
                  description
                }
              }
            }
          }
        }
      }
    }`;

    const response = await this.callContentful(query, options);
    const post = response.data.blogPostCollection.items
      ? response.data.blogPostCollection.items
      : [];

    return post.pop();
  }

  /**
   * Fetch n post summaries that are displayed on pages/blog.js.
   *
   * This method accepts a parameter of a page number that calculates
   * how many blog posts to skip in the GraphQL query.
   *
   * Set your desired page size in @utils/Config:
   * Config.pagination.pageSize
   *
   * The page size is currently set to 2 so you can view how the pagination
   * works on a fresh clone of the repository.
   *
   * param: page (number)
   *
   */
  static async getPaginatedPostSummaries(page) {
    /**
     * Calculate the skip parameter for the query based on the incoming page number.
     * For example, if page === 2, and your page length === 3,
     * the skip parameter would be calculated as 3 (the length of a page)
     * therefore skipping the results of page 1.
     */

    const skipMultiplier = page === 1 ? 0 : page - 1;
    const skip =
      skipMultiplier > 0 ? Config.pagination.pageSize * skipMultiplier : 0;

    const query = `{
        blogPostCollection(limit: ${Config.pagination.pageSize}, skip: ${skip}, order: date_DESC) {
          total
          items {
            sys {
              id
            }
            date
            title
            slug
            excerpt
            tags
          }
        }
      }`;

    const response = await this.callContentful(query);

    const paginatedPostSummaries = response.data.blogPostCollection
      ? response.data.blogPostCollection
      : { total: 0, items: [] };

    return paginatedPostSummaries;
  }

  /**
   * Fetch n recent post summaries that are displayed on pages/index.js.
   *
   * This query is purposefully not paginated as it serves as a single
   * responsibility function to display a fixed size group of posts.
   *
   * Set your desired recent post list size in @utils/Config:
   * Config.pagination.recentPostsSize
   *
   */
  static async getRecentPostList() {
    const query = `{
      blogPostCollection(limit: ${Config.pagination.recentPostsSize}, order: date_DESC) {
        items {
          sys {
            id
          }
          date
          title
          slug
          excerpt
          tags
        }
      }
    }`;

    const response = await this.callContentful(query);

    const recentPosts = response.data.blogPostCollection.items
      ? response.data.blogPostCollection.items
      : [];

    return recentPosts;
  }

  /**
   * Fetch the total number of blog posts.
   */
  static async getTotalPostsNumber() {
    const query = `
      {
        blogPostCollection {
          total
        }
      }
    `;

    const response = await this.callContentful(query);
    const totalPosts = response.data.blogPostCollection.total
      ? response.data.blogPostCollection.total
      : 0;

    return totalPosts;
  }

  /**
   * Call the Contentful GraphQL API using fetch.
   *
   * param: query (string)
   */
  static async callContentful(query, options = defaultOptions) {
    const fetchUrl = `https://graphql.contentful.com/content/v1/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID}`;

    const accessToken = options.preview
      ? process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_ACCESS_TOKEN
      : process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;

    const fetchOptions = {
      method: "POST",
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    };

    try {
      const data = await fetch(fetchUrl, fetchOptions).then((response) =>
        response.json(),
      );
      return data;
    } catch (error) {
      throw new Error("Could not fetch data from Contentful!");
    }
  }
}
