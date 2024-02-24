import { PageLayout } from '@/components/nav/PageLayout'
import { generatePageMeta } from '@/core/seo'
import { Generator } from './generator'

export const metadata = generatePageMeta({
  title: `Free Open Graph Image and Tags Generator`,
  description: `Generate Open Graph images (og:image) and meta tags for Social Media, Blogs, Websites and more. For free.`,
  url: '/free',
})

export default async function Page() {
  return (
    <PageLayout>
      <Generator />
    </PageLayout>
  )
}
