/*
 * Open Graph meta tags are used in the <head> of an HTML page to expose
 * information about your web page to social media platforms and other applications
 * that unfurl URL meta data.
 *
 * This is an Open Graph meta tag that provides a url to an image that is used to represent the web page.
 * <meta property="og:image" content="https://example.com/image.png" />
 *
 * You can find all Open Graph meta tags in @components/PageMeta.
 *
 * The example code uses a serverless service that generates dynamic Open Graph
 * images that you can embed in your <meta> tags.
 *
 * View the code here: https://github.com/vercel/og-image
 *
 * Explore the application in the UI here: https://og-image.vercel.app/
 */

export default class OpenGraph {
  static generateImageUrl(title) {
    return `https://og-image.vercel.app/${encodeURI(
      title,
    )}.png?theme=light&md=0fontSize=100px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`;
  }
}
