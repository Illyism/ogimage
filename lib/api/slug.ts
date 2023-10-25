import { fetchAPI } from '.'

const pageQuery = `
  title
  slug
  date
  content
  seo {
    title
    metaDesc
    canonical
    opengraphPublishedTime
    opengraphModifiedTime
    opengraphAuthor
    fullHead
  }
  featuredImage {
    node {
      sourceUrl
      altText
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
`

const metaQuery = `
  title
  slug
  date
  featuredImage {
    node {
      sourceUrl
      altText
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
`

export async function getPostAndMorePosts(slug: string) {
  const { post, page, posts } = await fetchAPI(
    `
        query PostBySlug($id: ID!) {
          post: post(id: $id, idType: SLUG) {
            ${pageQuery}
            excerpt
          }
          page: page(id: $id, idType: URI) {
            ${pageQuery}
          }
          posts(first: 3, where: { orderby: { field: DATE, order: DESC } }) {
            edges {
              node {
                ${metaQuery}
              }
            }
          }
        }
      `,
    { variables: { id: slug } },
  )

  // Filter out the main post and limit to 2 more posts
  const morePosts = posts.edges
    .filter(({ node }) => node.slug !== slug)
    .slice(0, 2)
    .map(({ node }) => node)

  // Combine the post/page data with the more posts data
  const result = {
    post: post || page,
    posts: morePosts,
  }

  return result
}
