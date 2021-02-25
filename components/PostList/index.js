import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Config } from "@utils/Config";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import PublishedDate from "@components/Post/PublishedDate";
import Tags from "@components/Post/Tags";
import Pagination from "@components/PostList/Pagination";
import ContentfulApi from "@utils/ContentfulApi";
import TypographyStyles from "@styles/Typography.module.css";
import ContentListStyles from "@styles/ContentList.module.css";
import ReactMarkdownRenderers from "@utils/ReactMarkdownRenderers";

function shouldDisablePrev(newCurrentPage) {
  return newCurrentPage === 1;
}

function shouldDisableNext(totalPages, newCurrentPage) {
  return newCurrentPage === totalPages;
}

export default function PostList(props) {
  const { posts, totalPosts } = props;

  const router = useRouter();

  const currentPageParam =
    router.query.page !== undefined ? parseInt(router.query.page, 10) : 1;

  const [postsToDisplay, setPostsToDisplay] = useState(posts);
  const [currentPage, setCurrentPage] = useState(1);
  const [nextDisabled, setNextDisabled] = useState(false);
  const [prevDisabled, setPrevDisabled] = useState(true);

  const totalPages = Math.ceil(totalPosts / Config.pagination.pageSize);

  useEffect(() => {
    setCurrentPage(currentPageParam);

    async function updatePosts() {
      const newPosts = await ContentfulApi.getPaginatedPostSummaries(
        currentPageParam,
      );

      setPostsToDisplay(newPosts);
    }

    updatePosts();
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
          setCurrentPage={setCurrentPage}
          nextDisabled={nextDisabled}
          prevDisabled={prevDisabled}
        />
      )}
    </>
  );
}
