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
  fields: {
    domain: { required: false, type: 'string' },
    href: { required: true, type: 'string' },
    name: { required: true, type: 'string' },
    rating: { required: true, type: 'number' },
    summary: { required: true, type: 'string' },
  },
  name: 'Review',
}))

export const BlogPost = defineDocumentType(() => ({
  // @ts-expect-error
  computedFields: computedFields('blog'),
  contentType: 'mdx',
  fields: {
    author: {
      required: true,
      type: 'string',
    },
    canonical: {
      required: false,
      type: 'string',
    },
    category: {
      required: false,
      type: 'string',
    },
    h1: {
      required: false,
      type: 'string',
    },
    hideOffers: {
      default: false,
      type: 'boolean',
    },
    image: {
      required: false,
      type: 'string',
    },
    image_alt: {
      required: false,
      type: 'string',
    },
    publishedAt: {
      required: true,
      type: 'string',
    },
    related: {
      of: {
        type: 'string',
      },
      type: 'list',
    },
    review: {
      of: Review,
      type: 'nested',
    },
    summary: {
      required: true,
      type: 'string',
    },
    title: {
      required: true,
      type: 'string',
    },
    updatedAt: {
      required: false,
      type: 'string',
    },
  },
  filePathPattern: '**/blog/*.mdx',
  name: 'BlogPost',
}))

const computedFields = (type) => ({
  githubRepos: {
    resolve: (doc) => {
      // match all <GithubRepo url=""/> and extract the url
      return doc.body.raw.match(
        /(?<=<GithubRepo[^>]*\burl=")[^"]+(?="[^>]*\/>)/g,
      )
    },
    type: 'array',
  },
  images: {
    resolve: (doc) =>
      doc.body.raw.match(/(?<=<Image[^>]*\bsrc=")[^"]+(?="[^>]*\/>)/g) || [],
    type: 'array',
  },
  slug: {
    resolve: (doc) => doc._raw.flattenedPath.replace(`${type}/`, ''),
    type: 'string',
  },
  structuredData: {
    resolve: (doc) => ({
      '@context': 'https://schema.org',
      '@type': `${capitalize(type)}Posting`,
      author: {
        '@type': 'Person',
        name: doc.author,
      },
      dateModified: doc.publishedAt,
      datePublished: doc.publishedAt,
      description: doc.summary,
      headline: doc.title,
      image: doc.image,
      url: `https://ogimage.org/blog/${doc._raw.flattenedPath}`,
    }),
    type: 'object',
  },
  tableOfContents: {
    resolve: (doc) => {
      // get all markdown heading 2 nodes (##)
      const headings = doc.body.raw.match(/^##\s.+/gm)
      const slugger = new GithubSlugger()
      return (
        headings?.map((heading) => {
          const title = heading.replace(/^##\s/, '')
          return {
            slug: slugger.slug(title),
            title,
          }
        }) || []
      )
    },
    type: 'array',
  },
  tweetIds: {
    resolve: (doc) => {
      const tweetMatches = doc.body.raw.match(/<Tweet\sid="[0-9]+"\s\/>/g)
      return tweetMatches?.map((tweet) => tweet.match(/[0-9]+/g)[0]) || []
    },
    type: 'array',
  },
})

// Export the source configuration
export default makeSource({
  contentDirPath: 'content',
  documentTypes: [BlogPost],
  mdx: {
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          onVisitHighlightedLine(node) {
            node.properties.className.push('line--highlighted')
          },
          onVisitHighlightedWord(node) {
            node.properties.className = ['word--highlighted']
          },
          onVisitLine(node) {
            // Prevent lines from collapsing in `display: grid` mode, and allow empty
            // lines to be copy/pasted
            if (node.children.length === 0) {
              node.children = [{ type: 'text', value: ' ' }]
            }
          },
          theme: 'one-dark-pro',
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
    remarkPlugins: [remarkGfm],
  },
})
