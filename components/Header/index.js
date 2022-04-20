import HeaderStyles from "@styles/Header.module.css";
import Link from "next/link";
import SocialLinks from "@components/SocialLinks";
import { useRouter } from "next/router";
import { Config } from "@utils/Config";
import Logo from "./svg/Logo";

export default function Header() {
  const router = useRouter();

  return (

<nav class="flex items-center justify-between flex-wrap bg-teal-500 p-6 ">
<div class="flex md:container md:mx-auto">
<div class="flex items-center flex-shrink-0 text-white mr-6">
    <svg class="fill-current h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z"/></svg>
    <span class="font-semibold text-xl tracking-tight">Tailwind CSS</span>
  </div>
  
  <div class="block lg:hidden">
    <button class="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
      <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
    </button>
  </div>

  <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto md:hidden sm:hidden">
    <div class="text-sm lg:flex-grow">

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
              ? ` border-blue-500 rounded py-2 px-4 bg-blue-500`
              : "";

            return (
                <Link href={link.path} key={link.displayName}>
                <a className={"block mt-4 lg:inline-block lg:mt-0 text-base font-medium text-white-500 hover:text-white-900 mr-4" + isActiveClass}>
                    {link.displayName}
                  </a>
                </Link>
            );
          })}

    </div>
    <div>
      <a href="#" class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">#</a>
    </div>
  </div>
  </div>
</nav>





/*
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
    </header>
  */
  );
}
