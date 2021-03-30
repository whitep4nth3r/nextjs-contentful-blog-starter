import SocialLinksStyles from "@styles/SocialLinks.module.css";
import Twitter from "./svgs/twitter";
import Feed from "./svgs/feed";
import { Config } from "@utils/Config";

const socialLinksList = [
  {
    name: "Twitter",
    url: `https://twitter.com/${Config.pageMeta.openGraph.twitterUser}`,
    ariaLabel: "Follow me on Twitter",
    svg: <Twitter />,
  },
  {
    name: "RSS Feed",
    url: "feed.xml",
    ariaLabel: `View the RSS feed of ${Config.site.domain}`,
    svg: <Feed />,
  },
];

export default function SocialLinks(props) {
  const { fillColor } = props;

  return (
    <div className={SocialLinksStyles.socialLinks}>
      <ul className={SocialLinksStyles.socialLinks__list}>
        {socialLinksList.map((link) => (
          <li
            className={SocialLinksStyles.socialLinks__listItem}
            key={link.name}
          >
            <a
              className={SocialLinksStyles.socialLinks__listItemLink}
              style={{ color: fillColor }}
              href={link.url}
              aria-label={link.ariaLabel}
              target="_blank"
              rel="nofollow noreferrer"
            >
              {link.svg}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
