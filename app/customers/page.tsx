import Image from 'next/image'
import { PageLayout } from '@/components/nav/PageLayout'
import { generatePageMeta } from '@/core/seo'
import { Customers } from './Customers'

export const metadata = generatePageMeta({
  description:
    'Open Graph Image as a Service is a powerful and flexible open graph image generator that allows you to create dynamic, high-quality images for your website.',
  title: 'Customers & Examples - Open Graph Image as a Service',
  url: '/customers',
})

export default function Templates() {
  return (
    <PageLayout>
      <header className="container relative border-border border-b py-8">
        <h1 className="mb-4 flex-1 text-balance font-bold text-3xl tracking-tight md:text-4xl">
          Customers & Examples
        </h1>
        <p className="text-md text-muted-foreground">
          <b>Want to see what others are building with ogimage.org?</b> Here are
          some examples of how people are using our service to generate dynamic,
          high-quality thumbnail images for their websites.
        </p>
      </header>
      <Customers>
        <Contact />
      </Customers>
    </PageLayout>
  )
}

const Contact = () => (
  <div className="container">
    <h2 className="mb-4 flex-1 text-balance font-bold text-3xl tracking-tight md:text-4xl">
      Tell us your story
    </h2>
    <p className="mb-4 text-md text-muted-foreground">
      <b>Want to be featured here?</b> DM us on{' '}
      <a
        className="font-bold text-primary hover:underline dark:text-yellow-400"
        href="https://x.com/illyism"
        rel="noopener"
        target="_blank"
      >
        Twitter
      </a>
    </p>
    <FounderCard
      description="Ilias is a SEO expert and loves to build products, transforming ideas into products. He is the creator of ogimage.org"
      img="/_static/ilias.png"
      name="Ilias Ism"
      twitter="illyism"
    />
  </div>
)

const FounderCard = ({
  name,
  img,
  twitter,
  description,
}: {
  name: string
  img: string
  twitter: string
  description: string
}) => (
  <div className="not-prose rounded-2xl bg-white/5 p-4 leading-none">
    <div className="mb-2 flex items-center">
      <Image
        alt={name}
        className="mr-2 rounded-full border-2 border-white/20 hover:rotate-6"
        height={48}
        src={img}
        width={48}
      />
      <div>
        <h3 className="font-bold leading-none">{name}</h3>
        <a
          className="font-bold text-sm leading-none underline"
          href={`https://twitter.com/${twitter}`}
          rel="noopener"
          target="_blank"
        >
          @{twitter}
        </a>
      </div>
    </div>

    <p className="text-sm">{description}</p>
  </div>
)
