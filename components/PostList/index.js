import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Config } from "@utils/Config";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import PublishedDate from "@components/Post/PublishedDate";
import Tags from "@components/Post/Tags";
import Pagination from "@components/PostList/Pagination";
import ContentfulApi from "@utils/ContentfulApi";
import ContentListStyles from "@styles/ContentList.module.css";
import ReactMarkdownRenderers from "@utils/ReactMarkdownRenderers";

/**
 * Calculate if we should disable the previous
 * navigation button (i.e. if we're on page 1)
 */
function shouldDisablePrev(newCurrentPage) {
  return newCurrentPage === 1;
}

/**
 * Calculate if we should disable the next
 * navigation button (i.e. if we're on the last page)
 */
function shouldDisableNext(totalPages, newCurrentPage) {
  return newCurrentPage === totalPages;
}

export default function PostList(props) {
  const { posts, totalPosts } = props;

  /**
   * Get the page param from the URL
   * If it is not present, assign the currentPageParam to 1
   */
  const router = useRouter();
  const currentPageParam =
    router.query.page !== undefined ? parseInt(router.query.page, 10) : 1;

  /**
   * Initialise state variables
   *
   * postsToDisplay: default to the posts fetched from /blog (page 1)
   * currentPage: 1 by default
   * nextDisabled: false by default because we expect to be on page 1 with more than 1 page of posts
   * prevDisabled: true by default because we expect to be on page 1
   */
  const [postsToDisplay, setPostsToDisplay] = useState(posts);
  const [currentPage, setCurrentPage] = useState(1);
  const [nextDisabled, setNextDisabled] = useState(false);
  const [prevDisabled, setPrevDisabled] = useState(true);

  /**
   * Calculate the total number of pages based on the total number of posts
   * and the defined page size in the Configuration
   */
  const totalPages = Math.ceil(totalPosts / Config.pagination.pageSize);

  useEffect(() => {
    /**
     * Update the current page in state from the calculated
     * page parameter that might have been in the URL
     */
    setCurrentPage(currentPageParam);

    /**
     * Call out to the API to get blog posts by page parameter
     */
    async function updatePosts() {
      const newPosts = await ContentfulApi.getPaginatedPostSummaries(
        currentPageParam,
      );

      setPostsToDisplay(newPosts);
    }

    updatePosts();

    /**
     * Check if we need to disable the next/previous
     * navigation buttons depending on the current page
     * number
     */
    setNextDisabled(shouldDisableNext(totalPages, currentPageParam));
    setPrevDisabled(shouldDisablePrev(currentPageParam));
  }, [
    setCurrentPage,
    currentPageParam,
    setPostsToDisplay,
    setNextDisabled,
    setPrevDisabled,
  ]);

  return (
    <>
      <ol className={ContentListStyles.contentList}>
        {postsToDisplay.map((post) => (
          <li key={post.sys.id}>
            <article className={ContentListStyles.contentList__post}>
              <PublishedDate date={post.date} />
              <Link href={`${Config.pageMeta.blogIndex.slug}/${post.slug}`}>
                <a className={ContentListStyles.contentList__titleLink}>
                  <h2 className={ContentListStyles.contentList__title}>
                    {post.title}
                  </h2>
                </a>
              </Link>
              {post.tags !== null && <Tags tags={post.tags} />}
              <div className={ContentListStyles.contentList__excerpt}>
                <ReactMarkdown
                  children={post.excerpt}
                  renderers={ReactMarkdownRenderers(post.excerpt)}
                />
              </div>
            </article>
          </li>
        ))}
      </ol>
      {totalPosts > 0 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          nextDisabled={nextDisabled}
          prevDisabled={prevDisabled}
        />
      )}
    </>
  );
}
