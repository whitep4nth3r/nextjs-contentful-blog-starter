/*
 * Clears the Next.js preview mode cookies.
 * This function accepts no arguments.
 */

export default function handler(req, res) {
  res.clearPreviewData();
  res.redirect("/");
}
