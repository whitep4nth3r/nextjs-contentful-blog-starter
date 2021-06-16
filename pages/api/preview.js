/*
 * https://nextjs.org/docs/advanced-features/preview-mode
 */

import ContentfulApi from "@utils/ContentfulApi";

export default async function preview(req, res) {
  /*
   * Check for the secret and query parameters.
   * This secret should only be known to this API route and the CMS.
   *
   * Set your content preview URLS in Contentful > Settings > Content Preview
   *
   * The preview URL for the blogPost content type is
   * http://localhost:3000/api/preview?secret={SECRET}&slug={entry.fields.slug}&contentType=blogPost
   *
   * The preview URL for the pageContent content type is
   * http://localhost:3000/api/preview?secret={SECRET}&slug={entry.fields.slug}&contentType=pageContent
   *
   */
  if (
    req.query.secret !== process.env.CONTENTFUL_PREVIEW_SECRET ||
    !req.query.slug ||
    !req.query.contentType
  ) {
    return res.status(401).json({ message: "Invalid options" });
  }

  // Fetch the page or blog content by slug using the Contentful Preview API.
  let preview = null;
  let redirectPrefix = "";

  switch (req.query.contentType) {
    case "blogPost":
      redirectPrefix = "/blog/";
      preview = await ContentfulApi.getPostBySlug(req.query.slug, {
        preview: true,
      });
      break;
    case "pageContent":
      preview = await ContentfulApi.getPageContentBySlug(req.query.slug, {
        preview: true,
      });
      break;
    default:
      preview = null;
  }

  // Prevent Next.js preview mode from being enabled if the content doesn't exist.
  if (!preview) {
    return res.status(401).json({ message: "Invalid slug" });
  }

  /**
   * res.setPreviewData({}) sets some cookies on the browser
   * which turns on the preview mode. Any requests to Next.js
   * containing these cookies will be considered as the preview
   * mode, and the behavior for statically generated pages
   * will change.
   *
   * To end Next.js preview mode, navigate to /api/endpreview.
   */

  res.setPreviewData({});

  /*
   * Redirect to the path from the fetched post.
   * We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities.
   */

  const url = `${redirectPrefix}${preview.slug}`;

  res.write(
    `<!DOCTYPE html><html><head><meta http-equiv="Refresh" content="0; url=${url}" />
    <script>window.location.href = '${url}'</script>
    </head>`,
  );
  res.end();
}
