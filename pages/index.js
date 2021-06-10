import { Config } from "@utils/Config";
import PageMeta from "@components/PageMeta";
import ContentfulApi from "@utils/ContentfulApi";
import RichTextPageContent from "@components/RichTextPageContent";
import MainLayout from "@layouts/main";
import RecentPostList from "@components/RecentPostList";
import HeroBanner from "@components/HeroBanner";
import ContentWrapper from "@components/ContentWrapper";
import PageContentWrapper from "@components/PageContentWrapper";

export default function Home(props) {
  const { pageContent, recentPosts, preview } = props;

  const pageTitle = pageContent ? pageContent.title : "Home";

  const pageDescription = pageContent
    ? pageContent.description
    : "Welcome to the Next.js Contentful blog starter";

  return (
    <>
      <MainLayout preview={preview}>
        <PageMeta
          title={pageTitle}
          description={pageDescription}
          url={Config.pageMeta.home.url}
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
          <RecentPostList posts={recentPosts} />
        </ContentWrapper>
      </MainLayout>
    </>
  );
}

export async function getStaticProps({ preview = false, locale}) {
  console.log(locale, Config.pageMeta.home.slug);
  const pageContent = await ContentfulApi.getPageContentBySlug( 
    Config.pageMeta.home.slug,
    {
      preview: preview,
    }, 
    locale
  );

  const recentPosts = await ContentfulApi.getRecentPostList(locale);

  return {
    props: {
      preview,
      pageContent: pageContent || null,
      recentPosts,
    },
  };
}
