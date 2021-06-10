import SocialLinks from "@components/SocialLinks";
import LanguageButtons from "@components/LanguageButtons"
import FooterStyles from "@styles/Footer.module.css";
import ButtonStyles from "@styles/Button.module.css";
import { useRouter } from "next/router";
import { Config } from "@utils/Config";

export default function Footer() {
  const router = useRouter();
  const date = new Date();

  return (
    <footer className={FooterStyles.footer}>
      <SocialLinks fillColor="#b7ded0" />
      <LanguageButtons locales={router.locales} pathname={router.asPath} />
      <p className={FooterStyles.footer__copyright}>
        © {Config.site.owner} {date.getFullYear()} All Rights Reserved.
      </p>
    </footer>
  );
}
