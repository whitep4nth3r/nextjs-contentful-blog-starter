import Image from "next/image";
import Link from "next/link";
import HeroBannerStyles from "@styles/HeroBanner.module.css";
import ButtonStyles from "@styles/Button.module.css";

export default function HeroBanner(props) {
  const {
    headline,
    subHeading,
    ctaText,
    internalLink,
    externalLink,
    image,
  } = props.data;

  return (
    <section className={HeroBannerStyles.heroBanner}>
      <Image
        className={HeroBannerStyles.heroBanner__bgImg}
        layout="fill"
        priority={true}
        src={image.url}
        alt={image.description}
      />
      <span className={HeroBannerStyles.heroBanner__overlay}></span>
      <div className={HeroBannerStyles.heroBanner__inner}>
        <div className={HeroBannerStyles.heroBanner__textContainer}>
          {headline && (
            <h1 className={HeroBannerStyles.heroBanner__headline}>
              {headline}
            </h1>
          )}
          {subHeading && (
            <h2 className={HeroBannerStyles.heroBanner__subheading}>
              {subHeading}
            </h2>
          )}
        </div>
        {internalLink && ctaText && (
          <div className={HeroBannerStyles.heroBanner__ctaContainer}>
            <Link href={internalLink}>
              <a className={ButtonStyles.button}>{ctaText}</a>
            </Link>
          </div>
        )}
        {externalLink && ctaText && (
          <div className={HeroBannerStyles.heroBanner__ctaContainer}>
            <a
              href={externalLink}
              className={ButtonStyles.button}
              rel="nofollow noreferrer"
              target="_blank"
            >
              {ctaText}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
