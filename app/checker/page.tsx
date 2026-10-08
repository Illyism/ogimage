import Link from 'next/link'
import { PageLayout } from '@/components/nav/PageLayout'
import { generatePageMeta } from '@/core/seo'
import { CheckerForm } from './CheckerForm'

export const metadata = generatePageMeta({
  description:
    'Free OG image checker. Paste a URL to test its Open Graph tags, the og:image size, and the link preview on X, Facebook, LinkedIn, and Slack.',
  title: 'OG Image Checker: Test Open Graph Tags and Link Previews',
  url: '/checker',
})

const checks = [
  {
    text: 'The page has og:image, and the URL is absolute, on https, and loads.',
    title: 'Image tag',
  },
  {
    text: 'The real pixel size of the file. 1200×630 is the target. Below 600 px wide, platforms show a small thumbnail.',
    title: 'Image size',
  },
  {
    text: 'Platforms crop to 1.91:1. The checker warns you when the edges of your image will be cut off.',
    title: 'Aspect ratio',
  },
  {
    text: 'og:title, og:description, og:url, and og:type, with length limits for titles and descriptions.',
    title: 'Core tags',
  },
  {
    text: 'twitter:card must be summary_large_image, or X shows a small square thumbnail.',
    title: 'X card',
  },
  {
    text: 'og:image:alt gives screen readers a text for the image.',
    title: 'Alt text',
  },
]

const faqs = [
  {
    answer:
      'Enter the URL of the page that you want to share. The checker reads the HTML that the server sends, finds the Open Graph and Twitter card tags, downloads the start of the og:image file, and measures it. You then see each problem and a link preview for four platforms.',
    question: 'How do I check the OG image of a page?',
  },
  {
    answer:
      'Platforms keep a copy of your image for days. After you change the image, ask each platform to read the page again: use the Facebook Sharing Debugger and the LinkedIn Post Inspector, or add a query string such as ?v=2 to the image URL.',
    question: 'I changed my OG image. Why is the old one still shown?',
  },
  {
    answer:
      'The most frequent causes are a relative image path, an image that needs a login or blocks bots, a file that is too small, and tags that JavaScript adds after the page loads. Crawlers do not run JavaScript, so the tags must be in the first HTML response.',
    question: 'Why is my OG image not showing?',
  },
  {
    answer:
      'Use 1200×630 pixels, a ratio of 1.91:1, in PNG or JPEG, below 1 MB. That size works on X, Facebook, LinkedIn, Slack, Discord, WhatsApp, and iMessage.',
    question: 'What size must an OG image be?',
  },
  {
    answer:
      'Yes. The checker is free, has no sign-up, and does not store the URLs that you test. The source is on GitHub.',
    question: 'Is this Open Graph checker free?',
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      applicationCategory: 'DeveloperApplication',
      name: 'OG Image Checker',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      operatingSystem: 'Any',
      url: 'https://ogimage.org/checker',
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
            OG image checker
          </h1>
          <p className="max-w-2xl text-muted-foreground">
            Paste a URL. Test its Open Graph tags, the real size of the
            og:image, and the link preview on X, Facebook, LinkedIn, and Slack.
            Free, no sign-up.
          </p>
        </header>

        <CheckerForm />

        <section className="flex flex-col gap-6">
          <h2 className="font-semibold text-2xl tracking-tight">
            What the Open Graph checker tests
          </h2>
          <dl className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {checks.map((check) => (
              <div className="flex flex-col gap-1" key={check.title}>
                <dt className="font-medium">{check.title}</dt>
                <dd className="text-muted-foreground text-sm">{check.text}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="flex max-w-3xl flex-col gap-4">
          <h2 className="font-semibold text-2xl tracking-tight">
            How to fix a failed OG image test
          </h2>
          <ol className="flex list-decimal flex-col gap-2 pl-5 text-muted-foreground">
            <li>
              Make a 1200×630 image. Use the{' '}
              <Link className="underline underline-offset-4" href="/generator">
                OG image generator
              </Link>{' '}
              or copy one of the{' '}
              <Link className="underline underline-offset-4" href="/templates">
                free templates
              </Link>
              .
            </li>
            <li>
              Add the{' '}
              <Link
                className="underline underline-offset-4"
                href="/og-image-meta-tag"
              >
                og:image meta tag
              </Link>{' '}
              with an absolute https URL to the head of the page.
            </li>
            <li>
              Add og:image:width, og:image:height, and og:image:alt. See the{' '}
              <Link
                className="underline underline-offset-4"
                href="/og-image-size"
              >
                OG image size guide
              </Link>{' '}
              for each platform.
            </li>
            <li>Deploy, then run the test again.</li>
          </ol>
        </section>

        <section className="flex max-w-3xl flex-col gap-6">
          <h2 className="font-semibold text-2xl tracking-tight">
            OG image tester questions
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
