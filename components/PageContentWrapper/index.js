import PageContentWrapperStyles from "@styles/PageContentWrapper.module.css";

export default function PageContentWrapper({ children }) {
  return <div className={PageContentWrapperStyles.container}>{children}</div>;
}
