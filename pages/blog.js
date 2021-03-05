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
  const { postSummaries, totalPosts, pageContent, url, preview } = props;

  const pageTitle = pageContent ? pageContent.title : "Home";
  const pageDescription = pageContent
    ? pageContent.description
    : "Articles | Next.js Contentful blog starter";

  return (
    <MainLayout preview={preview}>
      <PageMeta
        title={pageTitle}
        description={pageDescription}
        url={Config.pageMeta.blogIndex.url}
      />

      {pageContent && pageContent.heroBanner !== null && (
        <HeroBanner data={pageContent.heroBanner} />
      )}

      <ContentWrapper>
        {pageContent && pageContent.body && (
          <PageContentWrapper>
            <RichTextPageContent richTextBodyField={pageContent.body} />
          </PageContentWrapper>
        )}
        <PostList posts={postSummaries} totalPosts={totalPosts} />
      </ContentWrapper>
    </MainLayout>
  );
}

export async function getStaticProps({ preview = false }) {
  const postSummaries = await ContentfulApi.getPaginatedPostSummaries(1);
  const totalPosts = await ContentfulApi.getTotalPostsNumber();
  const pageContent = await ContentfulApi.getPageContentBySlug(
    Config.pageMeta.blogIndex.slug,
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
      pageContent: pageContent || null,
    },
  };
}
