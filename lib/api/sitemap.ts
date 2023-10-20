import { fetchAPI } from '.'

export async function getAllPostsForSiteMap() {
  const data = (await fetchAPI(`
      {
        posts(first: 10000) {
          edges {
            node {
              slug
              date
            }
          }
        }
      }
    `)) as {
    posts: {
      edges: {
        node: {
          slug: string
          date: string
        }
      }[]
    }
  }

  return data?.posts.edges.map((p) => p.node)
}

export async function getAllPagesForSitemap() {
  const data = (await fetchAPI(`
      {
        pages(first: 10000) {
          edges {
            node {
              slug
              date
            }
          }
        }
      }
    `)) as {
    pages: {
      edges: {
        node: {
          slug: string
          date: string
        }
      }[]
    }
  }

  return data?.pages.edges.map((p) => p.node)
}

export async function getAllPostsAndPagesForSitemap() {
  const [posts, pages] = await Promise.all([
    getAllPostsForSiteMap(),
    getAllPagesForSitemap(),
  ])
  return [...pages, ...posts]
}
