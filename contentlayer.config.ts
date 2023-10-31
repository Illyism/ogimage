import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'

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
      type: 'enum',
      options: ['buzzfit'],
      default: 'buzzfit',
      required: true,
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
  },
  // @ts-ignore
  computedFields: computedFields('blog'),
}))

export const TemplateMeta = defineDocumentType(() => ({
  name: 'TemplateMeta',
  filePathPattern: `**/templates/*/meta.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    description: {
      type: 'string',
      required: true,
    },
    createdAt: {
      type: 'string',
      required: true,
    },
    author: {
      type: 'string',
      required: true,
    },
    tags: {
      type: 'list',
      of: {
        type: 'string',
      },
      required: false,
    },
    examples: {
      type: 'list',
      of: {
        type: 'string',
      },
      required: false,
    },
  },
  // @ts-ignore
  computedFields: computedFields('template'),
}))

const computedFields = (type: 'template') => ({
  slug: {
    type: 'string',
    resolve: (doc) => {
      const _slug = doc._raw.flattenedPath
        .replace('content/', '')
        .replace('templates/', '')
        .replace(`${type}/`, '')
        .replace('/meta', '')
      return _slug
    },
  },
  structuredData: {
    type: 'object',
    resolve: (doc) => ({
      '@context': 'https://schema.org',
      '@type': type === 'template' ? 'WebPage' : 'Article',
      headline: doc.title,
      datePublished: doc.publishedAt,
      dateModified: doc.publishedAt,
      description: doc.summary,
      image: doc.image,
      url: `https://ogimage.org/${doc._raw.flattenedPath}`,
      author: {
        '@type': 'Person',
        name: doc.author,
      },
    }),
  },
})

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [BlogPost, TemplateMeta],
  mdx: {
    remarkPlugins: [],
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
