import Link from 'next/link'
import { PageLayout } from '@/components/nav/PageLayout'
import { generatePageMeta } from '@/core/seo'
import { GeneratorForm } from './GeneratorForm'

export const metadata = generatePageMeta({
  description:
    'Free OG image generator. Type a title, pick a layout and colors, and download a 1200×630 Open Graph image as PNG. No sign-up, no watermark.',
  title: 'OG Image Generator: Free 1200×630 Open Graph Images',
  url: '/generator',
})

const steps = [
  {
    text: 'Use the title of the page. Keep it below 60 characters so that it stays large and readable in a small preview.',
    title: '1. Write the title',
  },
  {
    text: 'Pick a layout, then set the background and accent to your brand colors. The text color changes automatically to stay readable.',
    title: '2. Pick layout and colors',
  },
  {
    text: 'Download the PNG, upload it to your site, and paste the meta tags into the head of the page.',
    title: '3. Download and add the tags',
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
      <div className="container flex flex-col gap-16 py-12">
        <header className="flex flex-col gap-3">
          <h1 className="max-w-3xl text-balance font-semibold text-3xl tracking-tight md:text-4xl">
            OG image generator
          </h1>
          <p className="max-w-2xl text-muted-foreground">
            Type a title, pick a layout and colors, and download a 1200×630 Open
            Graph image. Free, no sign-up, no watermark.
          </p>
        </header>

        <GeneratorForm />

        <section className="flex flex-col gap-6">
          <h2 className="font-semibold text-2xl tracking-tight">
            How to make an OG image
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {steps.map((step) => (
              <div className="flex flex-col gap-1" key={step.title}>
                <h3 className="font-medium">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="flex max-w-3xl flex-col gap-4">
          <h2 className="font-semibold text-2xl tracking-tight">
            Generate OG images in code
          </h2>
          <p className="text-muted-foreground">
            One image is quick to make by hand. A blog with 200 posts needs
            automation. The{' '}
            <Link className="underline underline-offset-4" href="/templates">
              OG image templates
            </Link>{' '}
            are Next.js routes that render a card for each URL with Satori and
            Tailwind. Read the{' '}
            <Link
              className="underline underline-offset-4"
              href="/nextjs-og-image"
            >
              Next.js OG image guide
            </Link>
            , or clone the kit from{' '}
            <a
              className="underline underline-offset-4"
              href="https://github.com/Illyism/ogimage"
              rel="noreferrer"
              target="_blank"
            >
              GitHub
            </a>
            .
          </p>
          <p className="text-muted-foreground">
            Need ideas first? Browse the{' '}
            <Link className="underline underline-offset-4" href="/inspiration">
              gallery of real OG image examples
            </Link>
            . When your image is live, test it with the{' '}
            <Link className="underline underline-offset-4" href="/checker">
              OG image checker
            </Link>
            .
          </p>
        </section>

        <section className="flex max-w-3xl flex-col gap-6">
          <h2 className="font-semibold text-2xl tracking-tight">
            OG image generator questions
          </h2>
          {faqs.map((faq) => (
            <div className="flex flex-col gap-2" key={faq.question}>
              <h3 className="font-medium">{faq.question}</h3>
              <p className="text-muted-foreground">{faq.answer}</p>
            </div>
          ))}
        </section>
      </div>
    </PageLayout>
  )
}
