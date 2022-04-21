
import { Config } from "@utils/Config";
import PageMeta from "@components/PageMeta";
import MainLayout from "@layouts/main";
import MeetupList from '@components/Mongo/meetups/MeetupList';
import { MongoClient } from 'mongodb';


export default function MongoIndex(props) {
  const {pageContent} = props;
  /**
   * This provides some fallback values to PageMeta so that a pageContent
   * entry is not required for /blog
   */
  const pageTitle = pageContent ? pageContent.title : "Form";
  const pageDescription = pageContent
    ? pageContent.description
    : "Form | Next.js Contentful blog";

  return (
    <MainLayout>
      <PageMeta
        title={pageTitle}
        description={pageDescription}
        url={Config.pageMeta.formIndex.url}
      />

        <MeetupList meetups={props.meetups} />;

    </MainLayout>
  );
}

export async function getStaticProps() {

  const client = await MongoClient.connect(
    'mongodb+srv://testUser:GUFjcrauEyfypfnn@clustertest.q80fq.mongodb.net/testDB?retryWrites=true&w=majority'
  );
  const db = client.db();

  const meetupsCollection = db.collection('FirstDB');

  const items = await meetupsCollection.find().toArray()

  client.close()

  return {
    props: {
      meetups: items.map((item) =>({
        title: item.title,
        address: item.address,
        image: item.image,
        id: item._id.toString()
      })),
      pageContent: null
    },
    revalidate: 1
  }; 
}
