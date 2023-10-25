import { fetchAPI } from '.'

interface MetaReturn {
  title: string
  excerpt?: string
  seo: {
    title: string
    metaDesc: string
    canonical: string
    opengraphPublishedTime: string
    opengraphModifiedTime: string
    opengraphAuthor: string
    opengraphImage: {
      sourceUrl: string
      altText: string
      mediaDetails: {
        width: number
        height: number
      }
    }
  }
  featuredImage: {
    node: {
      altText: string
      sourceUrl: string
    }
  }
  author: {
    node: {
      name: string
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
    opengraphImage {
      sourceUrl
      altText
      mediaDetails {
        width
        height
      }
    }
  }
  featuredImage {
    node {
      altText
      sourceUrl
    }
  }
  author {
    node {
      name
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
          excerpt
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
    description: stripHTML(data.seo.metaDesc || data.excerpt || ''),
    image: data.seo.opengraphImage?.sourceUrl,
    image_alt: data.seo.opengraphImage?.altText,
    image_width: data.seo.opengraphImage?.mediaDetails?.width,
    image_height: data.seo.opengraphImage?.mediaDetails?.height,
    url: data.seo.canonical,
    publishedAt: data.seo.opengraphPublishedTime,
    updatedAt: data.seo.opengraphModifiedTime,
    author: data.seo.opengraphAuthor || data.author?.node?.name,
  }
}

function stripHTML(html: string) {
  return html.replace(/<[^>]*>?/gm, '')
}
