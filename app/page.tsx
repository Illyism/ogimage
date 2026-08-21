/* eslint-disable @next/next/no-img-element */

import {
  Check,
  CodeIcon,
  MessageCircleQuestion,
  PaletteIcon,
  SmilePlus,
  Sparkles,
  Wrench,
  WrenchIcon,
  XIcon,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { PageLayout } from '@/components/nav/PageLayout'
import { TestimonialMarquee } from '@/components/reviews/testimonial-marquee'
import { TestimonialMasonry } from '@/components/reviews/testimonial-masonry'
import { TestimonialReviews } from '@/components/reviews/testimonial-reviews'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { StarGlow } from '@/components/ui/StarGlow'
import { generatePageMeta } from '@/core/seo'
import { ESSENTIAL_PRICE, PRO_PRICE } from '@/lib/pricing'
import { cn } from '@/lib/utils'
import { Customers } from './customers/Customers'
import { TemplatePreview } from './og/components/TemplatePreview'

export const metadata = generatePageMeta({
  title: 'OG Image Generator - Create Beautiful OG Images in Minutes',
  url: '/',
})

export default function Page() {
  return (
    <PageLayout>
      <Hero />
      <WhatIS />
      <ProblemSolution />
      <div className="sm:py-8">
        <TestimonialMarquee big />
      </div>
      <TemplatePreview />
      <div className="container">
        <h2 className="mb-4 text-balance font-bold text-3xl tracking-tight md:text-4xl">
          Real-world examples
        </h2>
        <p className="max-w-2xl text-balance text-lg text-muted-foreground">
          Here are some examples of how websites can improve their open graph
          images. Generated <b>100% LIVE</b> with our templates.
        </p>
      </div>
      <Customers />
      <Pricing />
      <FAQ />
      <FinalCallToAction />
      <TestimonialMasonry limit={9999} />
    </PageLayout>
  )
}

const WhatIS = () => {
  // showcase in a beautiful way:
  return (
    <div className="container pt-24 pb-8 sm:text-center">
      <h2 className="text-balance font-bold text-3xl tracking-tight md:text-4xl">
        What is an Open Graph Image?
      </h2>
      <p className="mx-auto mt-4 max-w-2xl text-balance text-lg text-muted-foreground">
        When you share a link on social media like{' '}
        <Link className="font-bold" href="/marketing/twitter-marketing">
          Twitter
        </Link>
        , <b>LinkedIn</b>, <b>Facebook</b>, or messaging platforms like{' '}
        <b>WhatsApp</b>, <b>Slack</b> or <b>Telegram</b>, an accompanying{' '}
        <b>thumbnail preview image</b> usually appears.
      </p>
      <p className="mx-auto mt-4 max-w-2xl text-balance text-lg text-muted-foreground">
        The image that populates this preview is what&apos;s known as the open
        graph or <b>OG image</b>. It provides a visual representation of the
        content being shared.
      </p>
      <p className="mx-auto mt-4 max-w-2xl text-balance text-lg text-muted-foreground">
        It&apos; important to have a <b>good open graph image</b> because it
        <b> increases engagement</b> and <b>click-through rates</b>.
      </p>
      <div className="mx-auto mt-8 max-w-5xl">
        <Image
          alt="Before and after of a boring and a better linkedin card image"
          className="rotate-2 rounded-xl shadow-raised-lg outline-1 outline-black/10 -outline-offset-1 dark:outline-white/10"
          height={760}
          src="/_static/linkedin-boring.jpg"
          width={1270}
        />
      </div>
    </div>
  )
}

const ProblemSolution = () => (
  <div className="container py-16 sm:text-center">
    <h2 className="text-balance font-bold text-3xl tracking-tight md:text-4xl">
      Why OG Image Kit?
    </h2>
    <p className="mx-auto mt-4 max-w-2xl text-balance text-lg text-muted-foreground">
      It takes so much <b>time</b> to create open graph images manually. Our OG
      Image generator saves you up to <b>99%</b> of the <b>time and cost</b>.
    </p>
    <div className="mx-auto mt-4 grid max-w-4xl grid-cols-1 gap-4 text-left text-sm sm:mt-12 sm:grid-cols-3">
      <Card className="p-5">
        <h3 className="mb-2 flex items-center justify-between gap-2 font-semibold text-lg">
          Automated
          <Sparkles className="text-primary" size={16} />
        </h3>
        <p className="text-muted-foreground">
          Published a <b>new blog post</b>? We generate the open graph image for
          you.
        </p>
      </Card>
      <Card className="p-5">
        <h3 className="mb-2 flex items-center justify-between gap-2 font-semibold text-lg">
          Customizable
          <Wrench className="text-primary" size={16} />
        </h3>
        <p className="text-muted-foreground">
          You get the <b>source code</b> and can customize the templates to
          match your brand.
        </p>
      </Card>
      <Card className="p-5">
        <h3 className="mb-2 flex items-center justify-between gap-2 font-semibold text-lg">
          Beautiful templates
          <SmilePlus className="text-primary" size={16} />
        </h3>
        <p className="text-muted-foreground">
          Get more <b>engagement</b> with our pre-designed templates.
        </p>
      </Card>
    </div>
  </div>
)

const Hero = () => (
  <div className="container flex flex-col items-center justify-center gap-12 pt-4 pb-8 sm:pt-16 xl:flex-row">
    <div>
      <a
        className="mx-auto mb-4 inline-block min-w-[250px]"
        href="https://www.producthunt.com/posts/og-image-generator?utm_source=badge-top-post-badge&utm_medium=badge&utm_souce=badge-og&#0045;image&#0045;generator"
        rel="noreferrer"
        target="_blank"
      >
        <img
          alt="OG Generator - Create Beautiful OG Previews in Minutes | Product Hunt"
          className="hidden dark:block"
          height="54"
          src="https://api.producthunt.com/widgets/embed-image/v1/top-post-badge.svg?post_id=441467&theme=dark&period=daily"
          width="250"
        />
        <img
          alt="OG Generator - Create Beautiful OG Previews in Minutes | Product Hunt"
          className="dark:hidden"
          height="54"
          src="https://api.producthunt.com/widgets/embed-image/v1/top-post-badge.svg?post_id=441467&theme=light&period=daily"
          width="250"
        />
      </a>
      <h1 className="mb-4 text-balance font-bold text-3xl tracking-tight md:text-5xl">
        OG Image Generator
      </h1>
      <p className="text-balance font-medium text-lg sm:text-xl">
        All the code you need to create infinite open graph images for your
        website, blog, or social media posts.
      </p>
      <ul className="mt-4 space-y-1 text-left text-lg">
        <li>
          <WrenchIcon
            className="mr-2 inline-block align-baseline text-primary"
            size={14}
          />
          <b>100% automated</b> with <b>Sartori</b>
        </li>
        <li>
          <PaletteIcon
            className="mr-2 inline-block align-baseline text-primary"
            size={14}
          />
          <b>Customizable</b> with <b>Tailwind CSS</b>
        </li>
        <li>
          <CodeIcon
            className="mr-2 inline-block align-baseline text-primary"
            size={14}
          />
          Works with <b>Next.js</b>, <b>Nuxt</b>, <b>Sveltekit</b> & more.
        </li>
      </ul>
      <div className="mt-6 flex flex-col items-center gap-2 sm:flex-row lg:mt-12">
        <Button asChild className="w-full sm:w-auto" size="lg">
          <Link className="flex" href="/buy?plan=essential">
            Buy now
            <b className="font-black tabular-nums">${ESSENTIAL_PRICE}</b>
          </Link>
        </Button>
      </div>
      <div className="mt-8 flex flex-col gap-4 sm:flex-row lg:mt-12">
        <TestimonialReviews />
        <div className="text-left">
          <StarGlow className="justify-center sm:justify-start" />
          <p className="hidden text-muted-foreground sm:block">
            Loved by developers and designers
          </p>
        </div>
      </div>
    </div>
    <Image
      alt="Before and after of a boring and a better twitter card image"
      className="rotate-2 rounded-xl shadow-raised-lg outline-1 outline-black/10 -outline-offset-1 lg:max-w-2xl dark:outline-white/10"
      height={760}
      src="/_static/boring-better.jpg"
      width={1270}
    />
  </div>
)

const Pricing = () => (
  <div className="container pt-16 pb-24 text-center">
    <h2 className="text-balance font-bold text-3xl tracking-tight md:text-4xl">
      Choose your plan
    </h2>
    <p className="mx-auto mt-4 max-w-2xl text-balance text-lg text-muted-foreground">
      No monthly fees. One-time payment for lifetime access to the source code.
    </p>
    <div className="mx-auto mt-12 grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2">
      <PricingCard
        disabled={['1 year updates', 'Only GitHub support']}
        features={['Source code', 'Unlimited custom images', 'All templates']}
        price={`$${ESSENTIAL_PRICE}`}
        title="Essential"
      />
      <PricingCard
        features={[
          'Source code',
          'Unlimited custom images',
          'All templates',
          'Email support',
          'Lifetime updates',
        ]}
        popular
        price={`$${PRO_PRICE}`}
        title="Pro"
      />
    </div>
  </div>
)

const PricingCard = ({
  title,
  price,
  features,
  className,
  popular,
  disabled,
}: {
  title: string
  price: string
  features: string[]
  className?: string
  popular?: boolean
  disabled?: string[]
}) => (
  <Card
    className={cn(
      'relative flex flex-col px-6 py-6 text-left',
      popular && 'border-primary shadow-raised-lg',
      className,
    )}
  >
    {popular ? (
      <div className="absolute inset-x-0 -top-3 mx-auto w-fit rounded-full bg-primary px-3 py-1 font-semibold text-primary-foreground text-xs uppercase tracking-wide">
        Popular
      </div>
    ) : null}
    <h3 className="mb-2 font-semibold text-lg">{title}</h3>
    <div className="flex items-center gap-2">
      <span className="font-black text-4xl tabular-nums tracking-tight">
        {price}
      </span>
    </div>
    <ul className="mt-4 flex-1 space-y-2 text-center">
      {features.map((feature, i) => (
        <li className="flex items-center gap-2 font-medium" key={i}>
          <Check className="text-green-500" size={16} />
          <span>{feature}</span>
        </li>
      ))}
      {disabled?.map((feature, i) => (
        <li className="flex items-center gap-2 text-muted-foreground" key={i}>
          <XIcon size={16} />
          <span>{feature}</span>
        </li>
      ))}
    </ul>

    <div className="text-center">
      <Button asChild className="mt-6 w-full" size="rounded">
        <a href={`/buy?plan=${title.toLowerCase()}`}>Buy {title}</a>
      </Button>
      <div className="mt-2 text-muted-foreground text-xs">
        Pay once, create unlimited images
      </div>
    </div>
  </Card>
)

const FAQ = () => (
  <div className="container pt-16 pb-24 sm:text-center">
    <h2 className="text-balance font-bold text-3xl tracking-tight md:text-4xl">
      Frequently asked questions
    </h2>
    <div className="mx-auto mt-12 max-w-3xl space-y-6">
      <FAQCard
        answer="OG Image Generator is an open-source tool that automatically generates open graph images for your website, blog, or social media posts. It is customizable, open source, and requires no design skills."
        question="What is OG Image Generator?"
      />
      <FAQCard
        answer="You get lifetime access to the source code of OG Image Generator. You can host it on your own server, we have examples for Vercel, Firebase, Docker, and more. If there is something you need, we are here to help."
        question="What do I get exactly?"
      />
      <FAQCard
        answer="The templates are pre-designed open graph images that you can use as a starting point. You can customize the text, colors, and images to match your brand. We have a variety of templates to choose from."
        question="What are the templates?"
      />
      <FAQCard
        answer="The essential plan includes lifetime access to the source code, unlimited images, and our 3 top templates. Which are all you need to get started. You can always upgrade later and only pay the difference with a special coupon code."
        question="What is the essential plan?"
      />
      <FAQCard
        answer="OG Image Generator is built with TypeScript. It supports Next.js and Sveltekit. It generates images using Sartori, a server-side rendering library. You can use JavaScript, SVG, Tailwind or HTML to customize the templates."
        question="JavaScript or HTML?"
      />
      <FAQCard
        answer="After you've got access to the repo, the code is yours forever, so it can't be refunded. But we are here to help you with any questions or issues you might have. We are committed to making sure you are happy with your purchase."
        question="What is the refund policy?"
      />
      <FAQCard
        answer="Yes, you need a server to host the code. But it can be as cheap as $0/month. The documentation includes examples for free hosting providers like Vercel, Firebase, and GitHub Pages. You can also use Docker, AWS, or any other serverless provider."
        question="Are there any other costs?"
      />
      <FAQCard
        answer="We are here to help. You can reach out to us on Twitter or email. We also have a community of developers and designers who are using OG Image Generator and are happy to help you."
        question="What if I need help?"
      />
      <FAQCard
        answer="We understand that not everyone can afford it. We are committed to making OG Image Generator accessible to everyone. If you need help, reach out to us and we will do our best to help you."
        question="I can't afford it"
      />
    </div>
  </div>
)

const FAQCard = ({
  question,
  answer,
}: {
  question: string
  answer: string
}) => (
  <Card className="p-5 text-left">
    <h3 className="mb-2 flex items-center justify-between gap-2 font-semibold text-lg">
      {question}
      <MessageCircleQuestion className="text-primary" size={16} />
    </h3>
    <p className="text-muted-foreground">{answer}</p>
  </Card>
)

const FinalCallToAction = () => (
  <div className="container pt-16 pb-24 text-center">
    <a
      className="mx-auto mb-4 inline-flex items-center justify-center"
      href="https://www.producthunt.com/posts/og-image-generator?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-og&#0045;image&#0045;generator"
      rel="noreferrer"
      target="_blank"
    >
      <img
        alt="OG&#0032;Image&#0032;Generator - Create&#0032;Beautiful&#0032;OG&#0032;Images&#0032;in&#0032;Minutes | Product Hunt"
        height="54"
        src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=441467&theme=light"
        width="250"
      />
    </a>

    <h2 className="text-balance font-bold text-3xl tracking-tight md:text-4xl">
      Get started today
    </h2>
    <p className="mx-auto mt-4 max-w-2xl text-balance text-lg text-muted-foreground">
      Automate open graph images for your website, blog, or social media posts.
      Customizable. Open source. Lifetime access.
    </p>
    <div className="mt-6 flex flex-col items-center justify-center gap-2 sm:flex-row">
      <Button asChild className="w-full sm:w-auto" size="lg">
        <Link className="flex" href="/buy?plan=essential">
          Buy now
          <b className="font-black tabular-nums">${ESSENTIAL_PRICE}</b>
        </Link>
      </Button>

      <Button
        asChild
        className="w-full sm:w-auto"
        size="lg"
        variant="secondary"
      >
        <Link className="flex items-center" href="/templates">
          View templates
          <span className="rounded-full bg-green-500/10 px-1.5 py-0.5 font-semibold text-[10px] text-green-500 uppercase tracking-wide dark:text-green-400">
            2 new
          </span>
        </Link>
      </Button>
    </div>
  </div>
)
