import HeaderStyles from "@styles/Header.module.css";
import Link from "next/link";
import SocialLinks from "@components/SocialLinks";
import { useRouter } from "next/router";
import { Config } from "@utils/Config";
import Logo from "./svg/Logo";

export default function Header() {
  const router = useRouter();

  return (
    <header className={HeaderStyles.header}>
      <div className={HeaderStyles.header__logoContainer}>
        <Link href="/">
          <a
            className={HeaderStyles.header__logoContainerLink}
            aria-label="Navigate to home page"
          >
            <Logo />
          </a>
        </Link>
      </div>
      <nav className={HeaderStyles.header__nav} role="navigation">
        <ul className={HeaderStyles.header__navList}>
          {Config.menuLinks.map((link) => {
            const onBlogPost =
              router.pathname === Config.pageMeta.post.slug &&
              link.path === Config.pageMeta.blogIndex.slug;

            const onBlogIndexPage =
              router.pathname === Config.pageMeta.blogIndexPage.slug &&
              link.path === Config.pageMeta.blogIndex.slug;

            const isActive =
              onBlogPost || onBlogIndexPage || router.pathname === link.path;
            const isActiveClass = isActive
              ? ` ${HeaderStyles.header__navListItem__active}`
              : "";

            return (
              <li
                key={link.displayName}
                className={HeaderStyles.header__navListItem + isActiveClass}
              >
                <Link href={link.path}>
                  <a className={HeaderStyles.header__navListItemLink}>
                    {link.displayName}
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <SocialLinks />
    </header>
  );
}
