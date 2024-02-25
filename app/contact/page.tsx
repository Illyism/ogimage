import { PageLayout } from '@/components/nav/PageLayout'
import { generatePageMeta } from '@/core/seo'
import { Mail } from 'lucide-react'
import Link from 'next/link'
import TallyContact from './Contact'

export const metadata = generatePageMeta({
  title: 'Contact OgImage.org',
  description:
    'Contact OgImage.org, the trusted open graph image generator. We are OgImage.org, the trusted open graph image generator.',
  url: '/contact',
})

export default function Page() {
  return (
    <PageLayout>
      <div className="contain relative pb-24 pt-16">
        <div className="relative z-10 mx-auto mb-8 max-w-xl text-center">
          <h1 className="mb-4 text-xl font-bold tracking-tight md:text-6xl">
            Contact Us
          </h1>
          <p className="mb-4 text-base text-zinc-700 dark:text-zinc-300">
            Let&apos;s talk about your OG image needs.
          </p>

          <div className="dark block flex-1 rounded-xl border border-foreground/5 bg-card/80 bg-white p-4 text-sm font-medium backdrop-blur-2xl">
            <TallyContact />
          </div>

          <div className="my-8 flex items-center">
            <hr className="flex-grow border-t border-border" />
            <span className="px-2 text-foreground/20">or</span>
            <hr className="flex-grow border-t border-border" />
          </div>

          <div className="grid grid-cols-1 items-center justify-center gap-2 sm:grid-cols-2">
            <div className="block flex-1 rounded-xl border border-foreground/5 bg-foreground/5 p-4 text-sm font-medium backdrop-blur-[2px]">
              <b className="block text-lg">Email us</b>
              Send us an email at{' '}
              <Link
                href="mailto:contact@ogimage.org"
                className="mt-4 flex w-full cursor-pointer items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-lg border border-primary bg-primary px-4 py-2 text-sm font-bold text-primary-foreground shadow-md outline outline-1 outline-offset-[-2px] outline-primary-foreground/30 transition-all duration-150 ease-in-out hover:bg-primary/90 hover:shadow-lg"
              >
                <Mail className="h-4 w-4" />
                contact@ogimage.org
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
