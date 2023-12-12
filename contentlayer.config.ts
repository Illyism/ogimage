import { defineDocumentType, makeSource } from 'contentlayer/source-files'

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
  documentTypes: [TemplateMeta],
  mdx: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})
