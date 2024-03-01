/* eslint-disable @next/next/no-img-element */
import { generatePageMeta } from '@/core/seo'
import { TemplateList } from '../og/components/TemplatePreview'

export const runtime = 'edge'
export const revalidate = 60 * 60 * 4 // 4 hours

export const metadata = generatePageMeta({
  title: 'Best Open Graph Image Templates for Every Website',
  description:
    'Generate beautiful Open Graph Images for your website, blog, or social media.',
  url: '/templates',
})

export default function Templates() {
  return (
    <div>
      <div className="mx-auto md:max-w-3xl lg:px-0 xl:max-w-[68rem]">
        <header className="relative border-b border-border py-8">
          <h1 className="mb-4 flex-1 text-3xl font-bold tracking-tighter  md:text-4xl">
            Open Graph Image Templates For Every Website
          </h1>
          <p className="text-md text-muted-foreground">
            If you&apos;re looking to build a website and share it, these
            thoroughly tested and highly rated open graph image templates offer
            the power and flexibility needed to create an attractive, reliable
            online destination.
          </p>
        </header>

        <TemplateList className="grid grid-cols-1 gap-4 py-8 sm:grid-cols-2" />
      </div>
    </div>
  )
}
