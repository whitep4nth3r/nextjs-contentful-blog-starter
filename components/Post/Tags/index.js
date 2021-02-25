import TagsStyles from "@styles/Tags.module.css";

export default function Tags(props) {
  const { tags } = props;

  return (
    <ul className={TagsStyles.tags}>
      {tags.map((tag) => (
        <li className={TagsStyles.tags__tag} key={tag}>
          {tag}
        </li>
      ))}
    </ul>
  );
}
