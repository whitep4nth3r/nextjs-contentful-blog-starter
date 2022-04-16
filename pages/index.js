import { Config } from "@utils/Config";
import PageMeta from "@components/PageMeta";
import ContentfulApi from "@utils/ContentfulApi";
import RichTextPageContent from "@components/RichTextPageContent";
import MainLayout from "@layouts/main";
import RecentPostList from "@components/RecentPostList";
import HeroBanner from "@components/HeroBanner";
import ContentWrapper from "@components/ContentWrapper";
import PageContentWrapper from "@components/PageContentWrapper";
import {Slideshow, Slideshow2} from "@components/Slideshow";

export default function Home(props) {
  const { pageContent, recentPosts, preview, slideshow} = props;

  const pageTitle = pageContent ? pageContent.title : "Domů";

  const pageDescription = pageContent
    ? pageContent.description
    : "Blog na Next.js Contentful :)";

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
          <Slideshow2 slides={slideshow}/>
          <RecentPostList posts={recentPosts} />
        </ContentWrapper>
      </MainLayout>
    </>
  );
}

export async function getStaticProps({ preview = false }) {
try{
  const pageContent = await ContentfulApi.getPageContentBySlug(
    Config.pageMeta.home.slug,
    {
      preview: preview,
    },
  );

  const recentPosts = await ContentfulApi.getRecentPostList();

  const slideshow = await ContentfulApi.getSlideshowList();

  return {
    props: {
      preview,
      pageContent: pageContent || null,
      recentPosts,
      slideshow
    },
  };
}
catch (error) {
  console.error(error);
}
}
