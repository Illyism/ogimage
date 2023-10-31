import { allTemplateMeta } from 'contentlayer/generated'

const domain = `ogimage.org`

export default async function Sitemap() {
  return [
    {
      url: `https://${domain}/`,
      lastModified: new Date(),
    },
    {
      url: `https://${domain}/templates/`,
      lastModified: new Date(),
    },
    ...allTemplateMeta.map((t) => ({
      url: `https://${domain}/templates/${t.slug}`,
      lastModified: t.createdAt,
    })),
  ]
}
