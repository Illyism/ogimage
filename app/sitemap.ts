const domain = `swissobserver.com`

export default async function Sitemap() {
  return [
    {
      url: `https://${domain}`,
      lastModified: new Date(),
    },
  ]
}
