import Link from 'next/link'
import { Suspense } from 'react'
import { PageHeader } from '@/components/nav/PageHeader'
import { PageLayout } from '@/components/nav/PageLayout'
import { Skeleton } from '@/components/ui/skeleton'
import { generatePageMeta } from '@/core/seo'
import { GeneratorForm } from './GeneratorForm'

export const metadata = generatePageMeta({
  description:
    'Free OG image generator. Type a title, pick a layout and colors, and download a 1200×630 Open Graph image as PNG. No sign-up, no watermark.',
  title: 'OG Image Generator: Free 1200×630 Open Graph Images',
  url: '/generator',
})

const link =
  'text-foreground underline decoration-primary/60 underline-offset-4 transition-colors hover:decoration-primary'

const steps = [
  {
    text: 'Use the title of the page. Keep it below 60 characters so that it stays large and readable in a small preview.',
    title: 'Write the title',
  },
  {
    text: 'Pick a layout, then set the background and accent to your brand colors. The text color changes automatically to stay readable.',
    title: 'Pick layout and colors',
  },
  {
    text: 'Download the PNG, upload it to your site, and paste the meta tags into the head of the page.',
    title: 'Download and add the tags',
  },
]

const faqs = [
  {
    answer:
      'Yes. The generator is free, needs no account, and adds no watermark. The code that renders the image is open source under the MIT license.',
    question: 'Is the OG image generator free?',
  },
  {
    answer:
      'Each image is 1200×630 pixels, a ratio of 1.91:1. X, Facebook, LinkedIn, Slack, Discord, WhatsApp, and iMessage all accept that size.',
    question: 'What size are the generated images?',
  },
  {
    answer:
      'Do not make them by hand. Clone the open-source kit and let a Next.js route render one image per page from the title. The templates use the same renderer as this generator.',
    question: 'How do I generate OG images for every blog post?',
  },
  {
    answer:
      'Upload the PNG to your site. Add a meta tag with property og:image and the full https URL of the file to the head of the page. Then test the page with the OG image checker.',
    question: 'How do I add the OG image to my website?',
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      applicationCategory: 'DesignApplication',
      name: 'OG Image Generator',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      operatingSystem: 'Any',
      url: 'https://ogimage.org/generator',
    },
    {
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        name: faq.question,
      })),
    },
  ],
}

export default function Page() {
  return (
    <PageLayout>
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
        type="application/ld+json"
      />
      <PageHeader
        description="Type a title, pick a layout and colors, and download a 1200×630 Open Graph image. Free, no sign-up, no watermark."
        eyebrow="Generator"
        title={
          <>
            <span className="accent-serif">OG image</span> generator
          </>
        }
      />
      <div className="container flex flex-col gap-24 pb-12">
        <Suspense fallback={<Skeleton className="h-[36rem] rounded-3xl" />}>
          <GeneratorForm />
        </Suspense>

        <section className="flex flex-col gap-10">
          <h2 className="display text-2xl md:text-4xl">
            How to make an <span className="accent-serif">OG image</span>
          </h2>
          <ol className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {steps.map((step, index) => (
              <li
                className="surface flex flex-col gap-3 rounded-3xl p-6"
                key={step.title}
              >
                <span className="eyebrow tabular-nums">Step {index + 1}</span>
                <h3 className="font-semibold text-lg tracking-tight">
                  {step.title}
                </h3>
                <p className="text-pretty text-muted-foreground">{step.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.3fr]">
          <h2 className="display text-2xl md:text-4xl">
            Generate OG images <span className="accent-serif">in code</span>
          </h2>
          <div className="flex flex-col gap-4 text-lg text-muted-foreground">
            <p className="text-pretty">
              One image is quick to make by hand. A blog with 200 posts needs
              automation. The{' '}
              <Link className={link} href="/templates">
                OG image templates
              </Link>{' '}
              are Next.js routes that render a card for each URL with Satori and
              Tailwind. Read the{' '}
              <Link className={link} href="/nextjs-og-image">
                Next.js OG image guide
              </Link>
              , or clone the kit from{' '}
              <a
                className={link}
                href="https://github.com/Illyism/ogimage"
                rel="noreferrer"
                target="_blank"
              >
                GitHub
              </a>
              .
            </p>
            <p className="text-pretty">
              Need ideas first? Browse the{' '}
              <Link className={link} href="/inspiration">
                gallery of real OG image examples
              </Link>
              . When your image is live, test it with the{' '}
              <Link className={link} href="/checker">
                OG image checker
              </Link>
              .
            </p>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.3fr]">
          <h2 className="display text-2xl md:text-4xl">
            Generator <span className="accent-serif">questions</span>
          </h2>
          <dl className="flex flex-col">
            {faqs.map((faq) => (
              <div
                className="flex flex-col gap-2 border-b py-6 first:border-t"
                key={faq.question}
              >
                <dt className="font-medium text-lg tracking-tight">
                  {faq.question}
                </dt>
                <dd className="text-pretty text-muted-foreground">
                  {faq.answer}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
    </PageLayout>
  )
}
