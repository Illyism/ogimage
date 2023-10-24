import { getAllPostsAndPagesForSitemap } from '@/lib/api/sitemap'

const domain = `swissobserver.com`

export default async function Sitemap() {
  const articles = await getAllPostsAndPagesForSitemap()
  return [
    {
      url: `https://${domain}/`,
      lastModified: new Date(),
    },
    ...articles.map((p) => ({
      url: `https://${domain}/${p.slug}/`,
      lastModified: new Date(p.date),
    })),
  ]
}
