/** Marks an OG image URL as an in-page preview so the route can render small. */
export function ogPreviewSrc(src: string) {
  if (src.includes('thumb=')) {
    return src
  }
  return src.includes('?') ? `${src}&thumb=1` : `${src}?thumb=1`
}
