import ContentfulApi from "@utils/ContentfulApi";
import { Config } from "@utils/Config";
import PageMeta from "@components/PageMeta";
import PostList from "@components/PostList";
import RichTextPageContent from "@components/RichTextPageContent";
import MainLayout from "@layouts/main";
import ContentWrapper from "@components/ContentWrapper";
import PageContentWrapper from "@components/PageContentWrapper";
import HeroBanner from "@components/HeroBanner";

export default function BlogIndex(props) {
  const {
    postSummaries,
    totalPosts,
    currentPage,
    totalPages,
    pageContent,
    preview,
  } = props;

  return (
    <MainLayout preview={preview}>
      <PageMeta
        title={pageContent.title}
        description={pageContent.description}
        url={Config.pageMeta.blogIndex.url}
      />

      {pageContent.heroBanner !== null && (
        <HeroBanner data={pageContent.heroBanner} />
      )}

      <ContentWrapper>
        <PageContentWrapper>
          <RichTextPageContent richTextBodyField={pageContent.body} />
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

export async function getStaticProps({ preview = false }) {
  const postSummaries = await ContentfulApi.getPaginatedPostSummaries(1);
  const totalPosts = await ContentfulApi.getTotalPostsNumber();
  const pageContent = await ContentfulApi.getPageContentBySlug(
    Config.pageMeta.blogIndex.slug,
    {
      preview: preview,
    },
  );

  const totalPages = Math.ceil(totalPosts / Config.pagination.pageSize);

  return {
    props: {
      preview,
      postSummaries,
      totalPosts,
      totalPages,
      currentPage: "1",
      pageContent,
    },
  };
}
