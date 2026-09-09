import Script from 'next/script'
import type React from 'react'
import type {
  Article,
  Graph,
  Organization,
  Person,
  WebSite,
  WithContext,
} from 'schema-dts'

// Define a TypeScript type for the component's props
interface ArticleProps {
  authorId: string
  authorName: string
  dateModified: string
  datePublished: string
  id: string
  imageUrl: string
  title: string
}

// Define the component
export const ArticleStructuredData: React.FC<ArticleProps> = ({
  id,
  title,
  datePublished,
  dateModified,
  authorName,
  authorId,
  imageUrl,
}) => {
  // Ensure datePublished and dateModified are in ISO 8601 format with timezone
  const isoDatePublished = new Date(datePublished).toISOString()
  const isoDateModified = new Date(dateModified).toISOString()

  // Define the structured data
  const structuredData: WithContext<Article> = {
    '@context': 'https://schema.org',
    '@id': id,
    '@type': 'Article',
    author: [
      {
        '@id': authorId,
        '@type': 'Person',
        name: authorName,
        url: authorId,
      },
      {
        '@type': 'Organization',
        name: 'OGimage.org',
        url: 'https://ogimage.org',
      },
    ],
    dateModified: isoDateModified,
    datePublished: isoDatePublished,
    headline: title,
    image: {
      '@type': 'ImageObject',
      height: '630',
      url: imageUrl,
      width: '1200',
    },
    inLanguage: 'en-US',
    mainEntityOfPage: {
      '@id': `https://ogimage.org/${id}`,
      '@type': 'WebPage',
    },
    publisher: personData,
    thumbnailUrl: imageUrl,
  }

  // Return the structured data inside a script tag
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData, null, 2),
      }}
      type="application/ld+json"
    />
  )
}

// Define the structured data using schema-dts types
const personData: WithContext<Person> = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  image: 'https://ogimage.org/me/ilias.png',
  jobTitle: 'CEO',
  name: 'Ilias Ism',
  sameAs: [
    'https://twitter.com/illyism',
    'https://github.com/illyism',
    'https://linkedin.com/in/illyism',
  ],
  url: 'https://il.ly',
  worksFor: {
    '@type': 'Organization',
    name: 'OGimage.org',
    url: 'https://ogimage.org',
  },
}

const organizationData: WithContext<Organization> = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  logo: 'https://ogimage.org/img/1024w/ogimage-black_1024.png',
  name: 'OGimage.org',
  url: 'https://ogimage.org',
}

const websiteData: WithContext<WebSite> = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'OGimage.org',
  url: 'https://ogimage.org',
}

// Define the StructuredData component
export const StructuredData: React.FC = () => {
  const graph: Graph = {
    '@context': 'https://schema.org',
    '@graph': [personData, organizationData, websiteData],
  }
  return (
    <Script
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph, null, 2) }}
      id="structured-data"
      type="application/ld+json"
    />
  )
}
