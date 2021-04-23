import { Config } from "@utils/Config";
import LanguageButtonsStyles from "@styles/LanguageButtons.module.css";
import EnUS from "./svgs/en-US.js";
import Fr from "./svgs/fr.js";
import Link from 'next/link'
 
export default function LanguageLinks(props) {
  const { locales, pathname } = props;

  return (
    <div className={LanguageButtonsStyles.languageButton} >
      <ul className={LanguageButtonsStyles.languageButton__list}>
        {locales.map((locale) => (
          <li className={LanguageButtonsStyles.languageButton__listItem} >
            <Link href={pathname} locale={locale}>
                <a className={LanguageButtonsStyles.languageButton__listItemLink}>
                  {
                    {
                      'fr': <Fr />,
                      'en-US': <EnUS />
                    }[locale]
                  }
                </a>
            </Link>
            </li>
         ))} 
      </ul>
    </div>
  );
}
