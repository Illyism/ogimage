import type { MDXComponents } from 'mdx/types'
import Image from 'next/image'
import Link from 'next/link'
import { getRouteRel } from './lib/route-rel'

// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including components from
// other libraries.

const ResponsiveImage = (props: any) => {
  const src = props.src?.src ?? props.src ?? ''
  const abs = src.startsWith('/') ? `https://ogimage.org${src}` : src
  return (
    <span itemProp="image" itemScope itemType="https://schema.org/ImageObject">
      <Image
        alt={props.alt}
        blurDataURL={props.src.blurDataURL}
        className="rounded-lg"
        itemProp="thumbnailUrl"
        placeholder="blur"
        sizes="100vw"
        style={{ height: 'auto', width: '100%' }}
        {...props}
      />
      <span aria-hidden className="hidden">
        <link href={abs} itemProp="contentUrl" />
        <span itemProp="creator" itemScope itemType="https://schema.org/Person">
          <meta content="OGimage.org" itemProp="name" />
        </span>
        <span itemProp="copyrightNotice">&copy; OGimage.org</span>
        <span itemProp="creditText">OGimage.org</span>
      </span>
    </span>
  )
}
// This file is required to use MDX in `app` directory.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    // h1: ({ children }) => <h1 style={{ fontSize: "100px" }}>{children}</h1>,
    ...components,
    Image: ResponsiveImage,
    Link: (props) => {
      const isInternalLink = props.href?.startsWith('/')
      const isAnchorLink = props.href?.startsWith('#')
      const isExternalLink = props.href?.startsWith('http')
      const isMailtoLink = props.href?.startsWith('mailto')

      if (isInternalLink) {
        return <Link href={props.href} {...props} />
      }

      if (isAnchorLink) {
        return <a {...props} />
      }

      if (isExternalLink) {
        return <a {...props} rel={getRouteRel(props.href)} target="_blank" />
      }

      if (isMailtoLink) {
        return <a {...props} />
      }

      return <a {...props} />
    },
  }
}
