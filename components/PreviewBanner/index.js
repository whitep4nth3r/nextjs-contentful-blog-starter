import PreviewBannerStyles from "@styles/PreviewBanner.module.css";

export default function PreviewBanner() {
  return (
    <div className={PreviewBannerStyles.preview}>
      <p className={PreviewBannerStyles.preview__text}>Preview Mode</p>
      <a href="/api/endpreview">Exit Preview</a>
    </div>
  );
}
