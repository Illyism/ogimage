/* eslint-disable @next/next/no-img-element */
import { PageLayout } from '@/components/nav/PageLayout'
import { generatePageMeta } from '@/core/seo'

export const metadata = generatePageMeta({
  title: `OgImage.Org: Open Graph Image Generator`,
  description: `Generate open graph images for your website with OgImage.Org, the trusted open graph image generator.`,
  url: `/`,
})

export default async function Home() {
  return (
    <PageLayout>
      <div className="contain">
        <h2 className="py-4 text-xs font-bold tracking-wide">Hello</h2>
      </div>
    </PageLayout>
  )
}
