import ContentfulApi from "@utils/ContentfulApi";
import { Config } from "@utils/Config";
import PageMeta from "@components/PageMeta";
import PostList from "@components/PostList";
import RichTextPageContent from "@components/RichTextPageContent";
import MainLayout from "@layouts/main";
import ContentWrapper from "@components/ContentWrapper";
import PageContentWrapper from "@components/PageContentWrapper";
import HeroBanner from "@components/HeroBanner";
import {BasicForm} from "@components/Form";

export default function formIndex(props) {
  const {
    pageContent,
    preview,
    answers
  } = props;

  console.log(answers);

  /**
   * This provides some fallback values to PageMeta so that a pageContent
   * entry is not required for /blog
   */
  const pageTitle = pageContent ? pageContent.title : "Form";
  const pageDescription = pageContent
    ? pageContent.description
    : "Form | Next.js Contentful blog";

  return (
    <MainLayout preview={preview}>
      <PageMeta
        title={pageTitle}
        description={pageDescription}
        url={Config.pageMeta.formIndex.url}
      />

      {pageContent.heroBanner !== null && (
        <HeroBanner data={pageContent.heroBanner} />
      )}

      <ContentWrapper>
        {pageContent.body && (
          <PageContentWrapper>
            <RichTextPageContent richTextBodyField={pageContent.body} />
          </PageContentWrapper>
        )}
        
        {answers.map(({email, name, message: {json: {content}}}) => {
          console.log(content);
           return(
           `${email} / ${name} / ${content[0].content[0].value}`
           );
        })}

      </ContentWrapper>

    </MainLayout>
  );
}

export async function getStaticProps({ preview = false }) {
  try{
  const pageContent = await ContentfulApi.getPageContentBySlug(
    Config.pageMeta.formIndex.slug,
    {
      preview: preview,
    },
  );

  const answers = await ContentfulApi.getFormList();

  return {
    props: {
      preview,
      pageContent: pageContent || null,
      answers,
    },
  };
}
  catch (error) {
  console.error(error);
  }
}
