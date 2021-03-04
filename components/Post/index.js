import RichTextPageContentStyles from "@styles/RichTextPageContent.module.css";
import TypographyStyles from "@styles/Typography.module.css";
import Tags from "@components/Post/Tags";
import PublishedDate from "@components/Post/PublishedDate";
import Author from "@components/Post/Author";
import ExternalUrl from "@components/Post/ExternalUrl";
import RichTextPageContent from "@components/RichTextPageContent";

export default function Post(props) {
  const { post } = props;

  return (
    <article className={RichTextPageContentStyles.page}>
      {post.externalUrl && <ExternalUrl url={post.externalUrl} />}
      <PublishedDate date={post.date} />
      {post.tags !== null && <Tags tags={post.tags} />}
      <h1 className={TypographyStyles.heading__h1}>{post.title}</h1>
      <RichTextPageContent richTextBodyField={post.body} renderH2Links={true} />
      {post.author !== null && <Author author={post.author} />}
    </article>
  );
}
