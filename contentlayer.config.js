import {
  defineDocumentType,
  defineNestedType,
  makeSource,
} from 'contentlayer/source-files'
import GithubSlugger from 'github-slugger'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import { capitalize } from './lib/utils'

export const Review = defineNestedType(() => ({
  name: 'Review',
  fields: {
    name: { type: 'string', required: true },
    href: { type: 'string', required: true },
    summary: { type: 'string', required: true },
    rating: { type: 'number', required: true },
    domain: { type: 'string', required: false },
  },
}))

export const BlogPost = defineDocumentType(() => ({
  name: 'BlogPost',
  filePathPattern: `**/blog/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    h1: {
      type: 'string',
      required: false,
    },
    publishedAt: {
      type: 'string',
      required: true,
    },
    updatedAt: {
      type: 'string',
      required: false,
    },
    summary: {
      type: 'string',
      required: true,
    },
    image: {
      type: 'string',
      required: false,
    },
    image_alt: {
      type: 'string',
      required: false,
    },
    author: {
      type: 'string',
      required: true,
    },
    category: {
      type: 'string',
      required: false,
    },
    related: {
      type: 'list',
      of: {
        type: 'string',
      },
    },
    hideOffers: {
      type: 'boolean',
      default: false,
    },
    review: {
      type: 'nested',
      of: Review,
    },
    canonical: {
      type: 'string',
      required: false,
    },
  },
  // @ts-ignore
  computedFields: computedFields('blog'),
}))

const computedFields = (type) => ({
  slug: {
    type: 'string',
    resolve: (doc) => doc._raw.flattenedPath.replace(`${type}/`, ''),
  },
  tableOfContents: {
    type: 'array',
    resolve: (doc) => {
      // get all markdown heading 2 nodes (##)
      const headings = doc.body.raw.match(/^##\s.+/gm)
      const slugger = new GithubSlugger()
      return (
        headings?.map((heading) => {
          const title = heading.replace(/^##\s/, '')
          return {
            title,
            slug: slugger.slug(title),
          }
        }) || []
      )
    },
  },
  images: {
    type: 'array',
    resolve: (doc) => {
      return (
        doc.body.raw.match(/(?<=<Image[^>]*\bsrc=")[^"]+(?="[^>]*\/>)/g) || []
      )
    },
  },
  tweetIds: {
    type: 'array',
    resolve: (doc) => {
      const tweetMatches = doc.body.raw.match(/<Tweet\sid="[0-9]+"\s\/>/g)
      return tweetMatches?.map((tweet) => tweet.match(/[0-9]+/g)[0]) || []
    },
  },
  githubRepos: {
    type: 'array',
    resolve: (doc) => {
      // match all <GithubRepo url=""/> and extract the url
      return doc.body.raw.match(
        /(?<=<GithubRepo[^>]*\burl=")[^"]+(?="[^>]*\/>)/g,
      )
    },
  },
  structuredData: {
    type: 'object',
    resolve: (doc) => ({
      '@context': 'https://schema.org',
      '@type': `${capitalize(type)}Posting`,
      headline: doc.title,
      datePublished: doc.publishedAt,
      dateModified: doc.publishedAt,
      description: doc.summary,
      image: doc.image,
      url: `https://ogimage.org/blog/${doc._raw.flattenedPath}`,
      author: {
        '@type': 'Person',
        name: doc.author,
      },
    }),
  },
})

// Export the source configuration
export default makeSource({
  contentDirPath: 'content',
  documentTypes: [BlogPost],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: 'one-dark-pro',
          onVisitLine(node) {
            // Prevent lines from collapsing in `display: grid` mode, and allow empty
            // lines to be copy/pasted
            if (node.children.length === 0) {
              node.children = [{ type: 'text', value: ' ' }]
            }
          },
          onVisitHighlightedLine(node) {
            node.properties.className.push('line--highlighted')
          },
          onVisitHighlightedWord(node) {
            node.properties.className = ['word--highlighted']
          },
        },
      ],
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ['anchor'],
            'data-mdx-heading': '',
          },
        },
      ],
    ],
  },
})
