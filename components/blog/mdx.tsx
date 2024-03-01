import { getRouteRel } from '@/lib/route-rel'
import { cn } from '@/lib/utils'
import { ListChecks } from 'lucide-react'
import { useMDXComponent } from 'next-contentlayer/hooks'
import Link from 'next/link'
import Script from 'next/script'
import AffiliateBox from './AffiliateBox'
import BonusBox from './BonusBox'
import ReviewBox from './ReviewBox'
import TextToVideoBox from './TextToVideoBox'
import BlogImage from './blog-image'
import CopyBox from './copy-box'
import MDXTweet from './tweet'
import MDXYoutube from './youtube'

const CustomLink = (props: any) => {
  const href = props.href

  if (href.startsWith('/')) {
    return (
      <Link {...props} href={href} prefetch={false}>
        {props.children}
      </Link>
    )
  }

  if (href.startsWith('#')) {
    return <a {...props} />
  }

  return <a target="_blank" {...props} rel={getRouteRel(href)} />
}

const components = {
  h2: (props: any) => <h2 className="text-2xl lg:mt-24" {...props} />,
  h3: (props: any) => <h3 className="lg:mt-12" {...props} />,
  a: (props: any) => (
    <CustomLink
      className="font-medium underline-offset-4 transition hover:text-yellow-400"
      {...props}
    />
  ),
  table: (props: any) => (
    <div className="rounded-md border border-border bg-card px-8 py-4 text-xs shadow-md lg:-mx-8 lg:rounded-lg lg:text-base xl:text-lg">
      <table className="my-0" {...props} />
    </div>
  ),
  thead: (props: any) => <thead className="" {...props} />,
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
  images: any
  className: string
}) {
  const Component = useMDXComponent(code)

  const MDXImage = (props: any) => {
    if (!images) return null
    const blurDataURL = images.find((image: any) => image.src === props.src)
      ?.blurDataURL

    return <BlogImage {...props} blurDataURL={blurDataURL} />
  }

  const Tweet = ({ id }: any) => {
    return <MDXTweet id={id} className="mx-auto max-w-lg" />
  }

  const YouTube = ({ id, title, className, uploadDate }: any) => {
    return (
      <MDXYoutube
        id={id}
        title={title}
        className={className}
        uploadDate={uploadDate}
      />
    )
  }

  return (
    <article
      data-mdx-container
      className={cn(
        'prose-headings:font-display prose max-w-none transition-all dark:prose-invert lg:prose-xl prose-headings:relative prose-headings:scroll-mt-20 prose-headings:font-bold lg:prose-h2:text-4xl',
        className,
      )}
    >
      <Component
        components={{
          ...components,
          Image: MDXImage,
          Tweet,
          YouTube,
          ReviewBox,
          AffiliateBox,
          BonusBox,
          TextToVideoBox,
          Script,
        }}
      />
    </article>
  )
}
