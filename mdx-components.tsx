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
  const abs = src.startsWith('/') ? `https://il.ly${src}` : src
  return (
    <span itemProp="image" itemScope itemType="https://schema.org/ImageObject">
      <Image
        alt={props.alt}
        className="rounded-lg"
        sizes="100vw"
        style={{ width: '100%', height: 'auto' }}
        itemProp="thumbnailUrl"
        placeholder="blur"
        blurDataURL={props.src.blurDataURL}
        {...props}
      />
      <span className="hidden" aria-hidden>
        <link itemProp="contentUrl" href={abs} />
        <span itemProp="creator" itemType="https://schema.org/Person" itemScope>
          <meta itemProp="name" content="The Swiss Observer" />
        </span>
        <span itemProp="copyrightNotice">&copy; The Swiss Observer</span>
        <span itemProp="creditText">The Swiss Observer</span>
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
      const isInternalLink = props.href && props.href.startsWith('/')
      const isAnchorLink = props.href && props.href.startsWith('#')
      const isExternalLink = props.href && props.href.startsWith('http')
      const isMailtoLink = props.href && props.href.startsWith('mailto')

      if (isInternalLink) {
        return <Link href={props.href} {...props} />
      }

      if (isAnchorLink) {
        return <a {...props} />
      }

      if (isExternalLink) {
        return <a {...props} target="_blank" rel={getRouteRel(props.href)} />
      }

      if (isMailtoLink) {
        return <a {...props} />
      }

      return <a {...props} />
    },
  }
}
