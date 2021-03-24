import ContentfulApi from "@utils/ContentfulApi";
import { Config } from "@utils/Config";
import PageMeta from "@components/PageMeta";
import PostList from "@components/PostList";
import RichTextPageContent from "@components/RichTextPageContent";
import MainLayout from "@layouts/main";
import ContentWrapper from "@components/ContentWrapper";
import PageContentWrapper from "@components/PageContentWrapper";
import HeroBanner from "@components/HeroBanner";
import BlogIndexPageStyles from "@styles/BlogIndexPage.module.css";

export default function BlogIndexPage(props) {
  const {
    postSummaries,
    totalPosts,
    totalPages,
    currentPage,
    pageContent,
    preview,
  } = props;

  return (
    <MainLayout preview={preview}>
      <PageMeta
        title={`${pageContent.title} Page ${currentPage}`}
        description={pageContent.description}
        url={`${Config.pageMeta.blogIndex.url}/page/${currentPage}`}
      />

      {pageContent.heroBanner !== null && (
        <HeroBanner data={pageContent.heroBanner} />
      )}

      <ContentWrapper>
        <PageContentWrapper>
          <RichTextPageContent richTextBodyField={pageContent.body} />
          <h3 className={BlogIndexPageStyles.blogIndexPage__pageCounter}>
            Page {currentPage} of {totalPages}
          </h3>
        </PageContentWrapper>
        <PostList
          posts={postSummaries}
          totalPosts={totalPosts}
          totalPages={totalPages}
          currentPage={currentPage}
        />
      </ContentWrapper>
    </MainLayout>
  );
}

export async function getStaticPaths() {
  const totalPosts = await ContentfulApi.getTotalPostsNumber();

  const paths = [];

  for (let page = 1; page <= totalPosts; page++) {
    paths.push({ params: { page: page.toString() } });
  }

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params, preview = false }) {
  const totalPosts = await ContentfulApi.getTotalPostsNumber();
  const totalPages = Math.ceil(totalPosts / Config.pagination.pageSize);
  const postSummaries = await ContentfulApi.getPaginatedPostSummaries(
    params.page,
  );
  const pageContent = await ContentfulApi.getPageContentBySlug(
    Config.pageMeta.blogIndex.slug,
    {
      preview: preview,
    },
  );

  return {
    props: {
      preview,
      postSummaries,
      totalPosts,
      totalPages,
      pageContent,
      currentPage: params.page,
    },
  };
}
