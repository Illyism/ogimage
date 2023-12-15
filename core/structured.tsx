import Script from 'next/script'
import React from 'react'
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
  id: string
  title: string
  datePublished: string
  dateModified: string
  authorName: string
  authorId: string
  imageUrl: string
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
    '@type': 'Article',
    '@id': id,
    headline: title,
    datePublished: isoDatePublished,
    dateModified: isoDateModified,
    author: [
      {
        '@type': 'Person',
        name: authorName,
        '@id': authorId,
        url: authorId,
      },
      {
        '@type': 'Organization',
        name: 'OGimage.org',
        url: 'https://ogimage.org',
      },
    ],
    image: {
      '@type': 'ImageObject',
      url: imageUrl,
      width: '1200',
      height: '630',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://ogimage.org/${id}`,
    },
    publisher: personData,
    thumbnailUrl: imageUrl,
    inLanguage: 'en-US',
  }

  // Return the structured data inside a script tag
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData, null, 2),
      }}
    />
  )
}

// Define the structured data using schema-dts types
const personData: WithContext<Person> = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Ilias Ism',
  url: 'https://il.ly',
  image: 'https://il.ly/me/ilias-ism.png',
  sameAs: [
    'https://twitter.com/illyism',
    'https://github.com/illyism',
    'https://linkedin.com/in/illyism',
  ],
  jobTitle: 'CEO',
  worksFor: {
    '@type': 'Organization',
    name: 'OGimage.org',
    url: 'https://ogimage.org',
  },
}

const organizationData: WithContext<Organization> = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'OGimage.org',
  url: 'https://ogimage.org',
  logo: 'https://ogimage.org/img/1024/ogimage-black_1024.png',
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
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph, null, 2) }}
    />
  )
}
