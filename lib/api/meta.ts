import { fetchAPI } from '.'

interface MetaReturn {
  title: string
  seo: {
    title: string
    metaDesc: string
    canonical: string
    opengraphPublishedTime: string
    opengraphModifiedTime: string
    opengraphAuthor: string
  }
  featuredImage: {
    node: {
      altText: string
      sourceUrl: string
    }
  }
}

const commonQuery = `
  title
  seo {
    title
    metaDesc
    canonical
    opengraphPublishedTime
    opengraphModifiedTime
    opengraphAuthor
  }
  featuredImage {
    node {
      altText
      sourceUrl
    }
  }
`

/**
 * Get post data
 */
async function getPost(slug: string) {
  const res = await fetchAPI(
    `
      query PostBySlug($id: ID!) {
        post: post(id: $id, idType: SLUG) {
          ${commonQuery}
        }
      }
    `,
    {
      variables: {
        id: slug,
        idType: 'SLUG',
      },
    },
  )
  return res.post as MetaReturn | null
}

/**
 * Get page data
 */
async function getPage(slug: string) {
  const res = await fetchAPI(
    `
      query PageBySlug($id: ID!) {
        page: page(id: $id, idType: URI) {
          ${commonQuery}
        }
      }
    `,
    {
      variables: {
        id: slug,
      },
    },
  )
  return res.page as MetaReturn | null
}

/**
 * Get post or page metadata for SEO
 */
export async function getPostOrPageMetadata(slug: string) {
  const [postData, pageData] = await Promise.all([getPost(slug), getPage(slug)])
  const data = postData || pageData
  if (!data) {
    return null
  }

  return {
    title: data.seo.title || data.title,
    description: data.seo.metaDesc,
    image: data.featuredImage?.node?.sourceUrl,
    image_alt: data.featuredImage?.node?.altText,
    url: data.seo.canonical,
    publishedAt: data.seo.opengraphPublishedTime,
    updatedAt: data.seo.opengraphModifiedTime,
    author: data.seo.opengraphAuthor,
  }
}
