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
import {InteractiveForm} from "@components/InteractiveForm";
import { getCustomRoute } from "next/dist/server/server-route-utils";

export default function formIndex(props) {
  const {
    pageContent,
    preview,
    answers,
    test,
    hide
  } = props;

  //console.log(answers);

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

      {!hide && pageContent.heroBanner !== null && (
        <HeroBanner data={pageContent.heroBanner} />
      )}

      <ContentWrapper>
        {!hide && pageContent.body && (
          <PageContentWrapper>
            <RichTextPageContent richTextBodyField={pageContent.body} />
          </PageContentWrapper>
        )}

          <InteractiveForm data={test}/>

          <BasicForm/>

          <div className="columns-3 my-10">

        {answers.map(({email, name, message: {json: {content}}},i) => {
          //console.log(content);
           return(
            <p key={i} className="mb-2 p-2 hover:bg-gray-50 cursor-pointer rounded-lg border break-normal">
           {++i}. {email} / {name} / {content[0].content[0].value}
           </p>
           );
        })}

            </div>

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

  const getUsers = async () =>{
  return await fetch('https://reqres.in/api/users?page=2')
  .then(res => res.json())
  .then(data => data.data);
  }

  const test = await getUsers()

  return {
    props: {
      preview,
      pageContent: pageContent || null,
      answers,
      test,
      hide: true
    },
  };
}
  catch (error) {
  console.error(error);
  }
}
