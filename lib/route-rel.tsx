const APPROVED = [
  'il.ly',
  'ogimage.org',
  'gradient.page',
  'magicbuddy.chat',
  'magicspace.agency',
  'clippulse.com',
  'musicplayer.io',
  'workbookpdf.com',
  'howclothesshouldfit.com',
  'ogimage.org',
  'bank.green',
  'classic-mercedes-parts.com',
  'apnews.com',
  'typefully.com',
  'buildinpublic.community',
  'storychief.io',
  'screenshotone.com',
  'nsfw-ai-chat.com',
  'bestparents.com',
  'typeframes.com',
  'swissobserver.com',
  'castpush.com',
  'xnapper.com',
  'links.report',
  'seoagency.tools',
  'seoroast.org',
]

/*
Guidelines for rel
https://developers.google.com/search/docs/crawling-indexing/qualify-outbound-links
| Rel Attribute Value | Description | Example Usage |
|---------------------|-------------|---------------|
| `rel="sponsored"`   | Mark links that are advertisements or paid placements (commonly called paid links) with the sponsored value. It is preferred over the previously recommended nofollow attribute for these types of links. | `<a rel="sponsored" href="https://cheese.example.com/Appenzeller_cheese">Appenzeller</a>` |
| `rel="ugc"`         | Recommended for marking user-generated content (UGC) links, such as comments and forum posts. It can be removed for trustworthy contributors who have consistently made high-quality contributions over time. | `<a rel="ugc" href="https://cheese.example.com/Appenzeller_cheese">Appenzeller</a>` |
| `rel="nofollow"`    | Use when other values don't apply, and you'd rather Google not associate your site with, or crawl the linked page from, your site. For links within your own site, use the robots.txt disallow rule. | `<a rel="nofollow" href="https://cheese.example.com/Appenzeller_cheese">Appenzeller</a>` |
| Multiple values     | You can specify multiple rel values as a space- or comma-separated list. Links marked with these rel attributes will generally not be followed. | `<a rel="ugc nofollow" href="https://cheese.example.com/Appenzeller_cheese">Appenzeller</a>` or `<a rel="ugc,nofollow" href="https://cheese.example.com/blue_cheese">Blue</a>` |
*/

export const getRouteRel = (href: string) => {
  if (href.startsWith('/') || href.startsWith('#')) {
    return ''
  }

  if (APPROVED.some((domain) => href.includes(domain))) {
    return '' // all good
  }

  return 'nofollow'
}
