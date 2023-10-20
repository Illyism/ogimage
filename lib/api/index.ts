const API_URL = process.env.WORDPRESS_API_URL

type Post = {
  node: {
    title: string
    excerpt: string
    slug: string
    date: string
    isSticky: boolean
    readingTime: string
    featuredImage?: {
      node: {
        altText: string
        sourceUrl: string
        srcSet: string
        caption: string
      }
    }
    author: {
      node: {
        name: string
        firstName: string
        lastName: string
        avatar: {
          url: string
        }
      }
    }
  }
}

export async function fetchAPI(
  query = '',
  { variables }: Record<string, any> = {},
) {
  const headers = { 'Content-Type': 'application/json' }

  if (process.env.WORDPRESS_AUTH_REFRESH_TOKEN) {
    headers[
      'Authorization'
    ] = `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`
  }

  // WPGraphQL Plugin must be enabled
  const res = await fetch(API_URL, {
    headers,
    method: 'POST',
    body: JSON.stringify({
      query,
      variables,
    }),
    next: {
      revalidate: 10,
    },
  })

  const json = await res.json()
  if (json.errors) {
    console.error(json.errors)
    throw new Error('Failed to fetch API')
  }
  return json.data
}

export async function getAllPostsForHome(preview = false) {
  const data = await fetchAPI(
    `
    query AllPosts {
      posts(first: 20, where: { orderby: { field: DATE, order: DESC } }) {
        edges {
          node {
            title
            excerpt
            slug
            date
            isSticky
            readingTime
            featuredImage {
              node {
                altText
              	sourceUrl
                srcSet
                caption
              }
            }
            author {
              node {
                name
                avatar {
                  url
                }
              }
            }
          }
        }
      }
    }
  `,
    {
      variables: {
        onlyEnabled: !preview,
        preview,
      },
    },
  )

  return data?.posts.edges as Post[]
}
