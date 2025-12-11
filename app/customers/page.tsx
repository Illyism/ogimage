import { PageLayout } from '@/components/nav/PageLayout'
import { generatePageMeta } from '@/core/seo'
import Image from 'next/image'
import { Customers } from './Customers'

export const revalidate = 14400 // 4 hours

export const metadata = generatePageMeta({
  title: 'Customers & Examples - Open Graph Image as a Service',
  description:
    'Open Graph Image as a Service is a powerful and flexible open graph image generator that allows you to create dynamic, high-quality images for your website.',
  url: '/customers',
})

export default function Templates() {
  return (
    <PageLayout>
      <header className="contain relative border-b border-border py-8">
        <h1 className="mb-4 flex-1 text-3xl font-bold tracking-tighter  md:text-4xl">
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

const Contact = () => {
  return (
    <div className="contain">
      <h2 className="mb-4 flex-1 text-3xl font-bold tracking-tighter  md:text-4xl">
        Tell us your story
      </h2>
      <p className="text-md mb-4 text-muted-foreground">
        <b>Want to be featured here?</b> DM us on{' '}
        <a
          href="https://x.com/illyism"
          target="_blank"
          className="font-bold text-primary hover:underline dark:text-yellow-400"
        >
          Twitter
        </a>
      </p>
      <FounderCard
        name="Ilias Ism"
        img="/_static/ilias.png"
        twitter="illyism"
        description="Ilias is a SEO expert and loves to build products, transforming ideas into products. He is the creator of ogimage.org"
      />
    </div>
  )
}

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
}) => {
  return (
    <div className="not-prose rounded-2xl bg-white/5 p-4 leading-none">
      <div className="mb-2 flex items-center">
        <Image
          src={img}
          alt={name}
          width={48}
          height={48}
          className="mr-2 rounded-full border-2 border-white/20 hover:rotate-6"
        />
        <div>
          <h3 className="font-bold leading-none">{name}</h3>
          <a
            className=" text-sm font-bold leading-none underline"
            href={`https://twitter.com/${twitter}`}
            target="_blank"
          >
            @{twitter}
          </a>
        </div>
      </div>

      <p className="text-sm">{description}</p>
    </div>
  )
}
