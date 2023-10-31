import { getRouteRel } from '@/lib/route-rel'
import { cn } from '@/lib/utils'
import { ListChecks } from 'lucide-react'
import { useMDXComponent } from 'next-contentlayer/hooks'
import Link from 'next/link'
import 'react-medium-image-zoom/dist/styles.css'
import CopyBox from './copy-box'
import MDXTweet from './tweet'
import MDXYoutube from './youtube'
import ZoomImage from './zoom-image'

const CustomLink = (props: any) => {
  const href = props.href

  if (href.startsWith('/')) {
    return (
      <Link {...props} href={href}>
        {props.children}
      </Link>
    )
  }

  if (href.startsWith('#')) {
    return <a {...props} />
  }

  return <a target="_blank" rel={getRouteRel(props.href)} {...props} />
}

const components = {
  h2: (props: any) => <h2 className="text-2xl" {...props} />,
  a: (props: any) => (
    <CustomLink
      className="font-medium text-gray-500 underline-offset-4 hover:text-black"
      {...props}
    />
  ),
  code: (props: any) => (
    <code
      className="rounded-md border border-gray-200 bg-gray-50 px-2 py-1 font-medium text-gray-600 before:hidden after:hidden"
      {...props}
    />
  ),
  thead: (props: any) => <thead className="text-lg" {...props} />,
  Note: (props: any) => (
    <div
      className={cn(
        'mt-4 rounded-md border-l-4 border-gray-500 bg-gray-100 px-4 py-1 text-[0.95rem] leading-[1.4rem]',
        {
          'border-yellow-500 bg-yellow-100': props.variant === 'warning',
          'border-blue-500 bg-blue-100': props.variant === 'info',
          'border-green-500 bg-green-100': props.variant === 'success',
        },
      )}
      {...props}
    />
  ),
  Prerequisites: (props: any) => (
    <div className="mt-4 rounded-md border border-gray-200 bg-white px-6 py-1 text-[0.95rem] leading-[1.4rem] shadow-md">
      <div className="-mb-6 flex items-center space-x-2 text-gray-600">
        <ListChecks size={20} />
        <p className="text-sm font-medium uppercase">Prerequisites</p>
      </div>
      {props.children}
    </div>
  ),
  CopyBox,
}

export function MDX({
  code,
  images,
  className,
}: {
  code: string
  images?: any
  className?: string
}) {
  const Component = useMDXComponent(code)

  const MDXImage = (props: any) => {
    if (!images) return null
    const blurDataURL = images.find((image: any) => image.src === props.src)
      ?.blurDataURL

    return <ZoomImage {...props} blurDataURL={blurDataURL} />
  }

  const Tweet = ({ id }: any) => {
    return <MDXTweet id={id} className="mx-auto max-w-lg" />
  }

  const YouTube = ({ id }: any) => {
    return <MDXYoutube id={id} className="mx-auto max-w-lg" />
  }

  return (
    <article
      data-mdx-container
      className={cn(
        'prose prose-gray max-w-none transition-all prose-headings:relative prose-headings:scroll-mt-20 prose-headings:font-display prose-headings:font-bold',
        className,
      )}
    >
      <Component
        components={{
          ...components,
          Image: MDXImage,
          Tweet,
          YouTube,
        }}
      />
    </article>
  )
}
