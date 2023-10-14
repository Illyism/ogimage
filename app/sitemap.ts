import BLOG_CATEGORIES from '@/components/blog/categories.json'
import { allBlogPosts } from 'contentlayer/generated'

const domain = `il.ly`

const keywords = [
  'twitter',
  'youtube',
  'facebook',
  'pinterest',
  'netflix',
  'ai',
  'grammar',
  'dict',
  'adblock',
  'VPN',
  'google',
  'tab',
  'bookmark',
  'wallpaper',
  'SEO',
  'marketing',
  'RSS',
  'keyword',
  'gmail',
  'email',
  'API',
  'autofill',
  'audio',
  'JSON',
  'password',
  'download',
  'free',
  'ipad',
  'chromecast',
  'translate',
  'spanish',
  'fun',
  'crypto',
  'casino',
  'note',
  'message',
  'shopify',
  'commerce',
  'auto',
  'coupon',
]

export default async function Sitemap() {
  return [
    {
      url: `https://${domain}`,
      lastModified: new Date(),
    },
    {
      url: `https://${domain}/now`,
    },
    {
      url: `https://${domain}/me`,
    },
    {
      url: `https://${domain}/ai`,
    },
    {
      url: `https://${domain}/projects`,
    },
    {
      url: `https://${domain}/reviews/rankiq`,
    },
    {
      url: `https://${domain}/reviews/tagparrot`,
    },
    {
      url: `https://${domain}/reviews/tagparrot`,
    },
    {
      url: `https://${domain}/extensions`,
    },
    ...keywords.map((keyword) => ({
      url: `https://${domain}/extensions/${keyword}`,
    })),

    ...makeBlogs(),
  ]
}

function makeBlogs() {
  const urls = []

  urls.push({
    url: `https://${domain}/blog`,
    lastModified: new Date(),
  })

  BLOG_CATEGORIES.map((cat) => {
    urls.push({
      url: `https://${domain}/${cat.slug}`,
    })
  })

  allBlogPosts.map((post) => {
    urls.push({
      url: `https://${domain}/${post.category}/${post.slug}`,
      lastModified: post.updatedAt
        ? new Date(post.updatedAt)
        : new Date(post.publishedAt),
    })
  })

  return urls
}
