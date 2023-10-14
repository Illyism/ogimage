import { getAllPostsForHome } from '@/lib/api'

const domain = `swissobserver.com`

export default async function Sitemap() {
  const posts = await getAllPostsForHome()
  return [
    {
      url: `https://${domain}`,
      lastModified: new Date(),
    },
    ...posts.map((post) => ({
      url: `https://${domain}/${post.node.slug}`,
      lastModified: new Date(post.node.date),
    })),
  ]
}
