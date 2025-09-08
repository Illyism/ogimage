/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { PageLayout } from '@/components/nav/PageLayout'
import { TestimonialMarquee } from '@/components/reviews/testimonial-marquee'
import { TestimonialMasonry } from '@/components/reviews/testimonial-masonry'
import { TestimonialReviews } from '@/components/reviews/testimonial-reviews'
import { StarGlow } from '@/components/ui/StarGlow'
import { Button } from '@/components/ui/button'
import { generatePageMeta } from '@/core/seo'
import {
  Check,
  CodeIcon,
  MessageCircleQuestion,
  PaletteIcon,
  SmilePlus,
  Sparkles,
  Wrench,
  WrenchIcon,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Customers } from './customers/Customers'
import { TemplatePreview } from './og/components/TemplatePreview'
import { GiftPopup } from './popup'
import { CURRENT_PRICE, NEXT_PRICE, PREVIOUS_PRICE, PRICE_LADDER } from '@/lib/pricing'

export const metadata = generatePageMeta({
  title:
    'OG Image Generator - Boost Social Media CTR with Beautiful Open Graph Images',
  description:
    'Create stunning open graph images for your website and social media. Customizable, open source code templates for Next.js, Nuxt, Sveltekit, and more. Lifetime access.',
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
      <div className="contain">
        <h2 className="mb-4 flex-1 text-3xl font-bold tracking-tighter  md:text-4xl">
          Real-world examples
        </h2>
        <p>
          Here are some examples of how websites can improve their open graph
          images. Generated <b>100% LIVE</b> with our templates.
        </p>
      </div>
      <Customers />
      <Pricing />
      <FAQ />
      <FinalCallToAction />
      <GiftPopup />
      <TestimonialMasonry limit={9999} />
    </PageLayout>
  )
}

const WhatIS = () => {
  // showcase in a beautiful way:
  return (
    <div className="pad pb-8 pt-24 sm:text-center">
      <h2 className="text-balance text-3xl font-bold leading-[1.5] tracking-[-0.015em]">
        What is an Open Graph Image?
      </h2>
      <p className="mx-auto mt-4 max-w-[750px] text-balance text-lg text-muted-foreground">
        When you share a link on social media like{' '}
        <Link href="/marketing/twitter-marketing" className="font-bold">
          Twitter
        </Link>
        , <b>LinkedIn</b>, <b>Facebook</b>, or messaging platforms like{' '}
        <b>WhatsApp</b>, <b>Slack</b> or <b>Telegram</b>, an accompanying{' '}
        <b>thumbnail preview image</b> usually appears.
      </p>
      <p className="mx-auto mt-4 max-w-[750px] text-balance text-lg text-muted-foreground">
        The image that populates this preview is what&apos;s known as the open
        graph or <b>OG image</b>. It provides a visual representation of the
        content being shared.
      </p>
      <p className="mx-auto mt-4 max-w-[750px] text-balance text-lg text-muted-foreground">
        It&apos; important to have a <b>good open graph image</b> because it
        <b> increases engagement</b> and <b>click-through rates</b>.
      </p>
      <div className="mx-auto mt-8 max-w-5xl">
        <Image
          className="rotate-[2deg] rounded-lg border-2 border-border shadow-2xl"
          src="/_static/linkedin-boring.jpg"
          width={1270}
          height={760}
          alt="Before and after of a boring and a better linkedin card image"
        />
      </div>
    </div>
  )
}

const ProblemSolution = () => {
  return (
    <div className="pad py-16 sm:text-center">
      <h2 className="text-balance text-3xl font-bold leading-[1.5] tracking-[-0.015em]">
        Why OG Image Kit?
      </h2>
      <p className="mx-auto mt-4 max-w-[750px] text-balance text-lg text-muted-foreground">
        It takes so much <b>time</b> to create open graph images manually. Our
        OG Image generator saves you up to <b>99%</b> of the{' '}
        <b>time and cost</b>.
      </p>
      <div className="mt-4 flex flex-col items-center justify-center gap-4 text-left text-sm sm:mt-12 sm:flex-row sm:text-center">
        <div className="rounded-lg border border-border bg-card/20 p-4 text-left shadow">
          <h3 className="mb-2 flex items-center justify-between text-xl font-bold">
            Automated
            <Sparkles size={16} className="text-primary dark:text-yellow-400" />
          </h3>
          <p className="text-muted-foreground">
            Published a <b>new blog post</b>? We generate the open graph image
            for you.
          </p>
        </div>
        <div className="rounded-lg border border-border bg-card/20 p-4 text-left shadow">
          <h3 className="mb-2 flex items-center justify-between text-xl font-bold">
            Customizable
            <Wrench size={16} className="text-primary dark:text-yellow-400" />
          </h3>
          <p className="text-muted-foreground">
            You get the <b>source code</b> and can customize the templates to
            match your brand.
          </p>
        </div>
        <div className="rounded-lg border border-border bg-card/20 p-4 text-left shadow">
          <h3 className="mb-2 flex items-center justify-between text-xl font-bold">
            Beautiful templates
            <SmilePlus
              size={16}
              className="text-primary dark:text-yellow-400"
            />
          </h3>
          <p className="text-muted-foreground">
            Get more <b>engagement</b> with our pre-designed templates.
          </p>
        </div>
      </div>
    </div>
  )
}

const Hero = () => {
  return (
    <div className="pad flex flex-col items-center justify-center gap-12 pb-8 pt-4 sm:pt-16 xl:flex-row">
      <div>
        <a
          className="mx-auto mb-4 inline-block min-w-[250px]"
          href="https://www.producthunt.com/posts/og-image-generator?utm_source=badge-top-post-badge&utm_medium=badge&utm_souce=badge-og&#0045;image&#0045;generator"
          target="_blank"
          rel="noreferrer"
        >
          <img
            className="hidden dark:block"
            src="https://api.producthunt.com/widgets/embed-image/v1/top-post-badge.svg?post_id=441467&theme=dark&period=daily"
            alt="OG Image Generator - Create Beautiful OG Images in Minutes | Product Hunt"
            width="250"
            height="54"
          />
          <img
            className="dark:hidden"
            src="https://api.producthunt.com/widgets/embed-image/v1/top-post-badge.svg?post_id=441467&theme=light&period=daily"
            alt="OG Image Generator - Create Beautiful OG Images in Minutes | Product Hunt"
            width="250"
            height="54"
          />
        </a>
        <h1 className="mb-4 text-balance text-3xl font-bold leading-[1.5] tracking-[-0.015em] md:text-5xl">
          OG Image Generator
        </h1>
        <p className="text-balance text-lg font-medium sm:text-xl">
          Create beautiful open graph images to boost your social media
          click-through rate. Get the code templates and automate your OG image
          generation today.
        </p>
        <ul className="mt-4 text-left text-lg">
          <li>
            <WrenchIcon
              size={14}
              className="mr-2 inline-block align-baseline text-green-400"
            />
            <b>100% automated</b> with <b>Sartori</b>
          </li>
          <li>
            <PaletteIcon
              size={14}
              className="mr-2 inline-block align-baseline text-pink-400"
            />
            <b>Customizable</b> with <b>Tailwind CSS</b>
          </li>
          <li>
            <CodeIcon
              size={14}
              className="mr-2 inline-block align-baseline text-purple-400"
            />
            Works with <b>Next.js</b>, <b>Nuxt</b>, <b>Sveltekit</b> & more.
          </li>
        </ul>
        <div className="mt-6 flex flex-col items-center gap-2 sm:flex-row lg:mt-12">
          <Button
            asChild
            className="w-full px-6 text-lg sm:w-auto"
            size="rounded"
          >
            <a href="/buy" className="flex">
              <span className="hidden sm:inline">PURCHASE TODAY</span>
              <span className="sm:hidden">Buy now</span>
              &emsp;
              <s className="text-xs font-bold">${PREVIOUS_PRICE}</s>{' '}
              <b className="-my-1 ml-2 text-lg font-black">${CURRENT_PRICE}</b>
            </a>
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
        className="rotate-[2deg] rounded-lg border-2 border-border shadow-2xl lg:max-w-2xl"
        src="/_static/boring-better.jpg"
        width={1270}
        height={760}
        alt="Before and after of a boring and a better twitter card image"
      />
    </div>
  )
}

const Pricing = () => {
  const currentPrice = CURRENT_PRICE
  const previousPrice = PREVIOUS_PRICE

  return (
    <div className="pad pb-24 pt-16 text-center">
      <h2 className="text-balance text-3xl font-bold leading-[1.5] tracking-[-0.015em]">
        Get Lifetime Access - Price Increasing Soon
      </h2>
      <p className="mx-auto mt-4 max-w-[750px] text-balance text-lg text-muted-foreground">
        One-time payment for lifetime access to the source code and unlimited OG
        image generation.{' '}
      </p>
      <p className="mt-2 inline-block rounded-full bg-yellow-500/10 px-3 py-1 font-bold text-yellow-600 dark:text-yellow-400">
        Price increases every <b>10 sales</b>
      </p>
      <div className="mx-auto mt-4 flex max-w-[600px] items-center justify-center gap-2 text-sm text-muted-foreground">
        {PRICE_LADDER.map((p, i) => {
          const isCurrent = p === CURRENT_PRICE
          const isNext = p === NEXT_PRICE
          const isBefore = p < CURRENT_PRICE
          return (
            <div key={p} className="flex items-center gap-1">
              {isCurrent ? (
                <div className="rounded-full bg-green-500/10 px-2 py-0.5 font-bold text-green-500 dark:text-green-400">
                  ${p}
                </div>
              ) : isNext ? (
                <div className="rounded-full bg-red-500/10 px-2 py-0.5 font-bold text-red-500 dark:text-red-400">
                  ${p}
                </div>
              ) : isBefore ? (
                <s>${p}</s>
              ) : (
                <span>${p}</span>
              )}
              {i < PRICE_LADDER.length - 1 && (
                <span className="text-xs">→</span>
              )}
            </div>
          )
        })}
      </div>
      <div className="mx-auto mt-6 max-w-[500px]">
        <div className="mb-2 flex justify-between text-sm font-medium">
          <span className="text-green-500">${CURRENT_PRICE}</span>
          <span className="text-red-500">${NEXT_PRICE}</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-muted">
          <div className="h-2 w-2/3 bg-green-500 transition-all" />
        </div>
      </div>
      <div className="mt-12">
        <PricingCard
          title="OG Image Generator"
          price={`$${currentPrice}`}
          previousPrice={`$${previousPrice}`}
          features={[
            'Source code for OG Image Generator',
            'Unlimited custom images',
            'Lifetime access to all templates & updates',
            'Use on unlimited websites & projects',
            'Customizable with Tailwind CSS',
            'Works with Next.js, Nuxt, Sveltekit & more',
            '100% automated with Sartori',
          ]}
        />
      </div>
    </div>
  )
}

const PricingCard = ({ title, price, previousPrice, features }: any) => {
  return (
    <div className="btn relative inline-flex flex-col rounded-lg border-2 border-border bg-card px-6 py-4 text-left shadow">
      <h3 className="mb-2 text-2xl font-bold">{title}</h3>
      <div className="flex items-center gap-2">
        <s className="text-lg font-bold text-muted-foreground">
          {previousPrice}
        </s>
        <span className="text-4xl font-black">{price}</span>
      </div>
      <ul className="mt-4 flex-1 text-center">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center gap-2 font-semibold">
            <Check size={16} className="text-green-500" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <div className="text-center">
        <Button
          asChild
          className="mt-8 w-full px-8 py-3 text-lg"
          size="rounded"
        >
          <a href="/buy">🔥 Buy Now Before Price Increases 🔥</a>
        </Button>
        <div className="mt-2 text-xs text-muted-foreground">
          Pay once, create unlimited images
        </div>
      </div>
    </div>
  )
}

const FAQ = () => {
  return (
    <div className="pad pb-24 pt-16 sm:text-center">
      <h2 className="text-3xl font-bold leading-[1.5] tracking-[-0.015em]">
        Frequently asked questions
      </h2>
      <div className="mx-auto mt-12 max-w-3xl space-y-6">
        <FAQCard
          question="What is OG Image Generator?"
          answer="OG Image Generator is an open-source tool that automatically generates open graph images for your website, blog, or social media posts. It is customizable, open source, and requires no design skills."
        />
        <FAQCard
          question="What do I get exactly?"
          answer="You get lifetime access to the source code of OG Image Generator. You can host it on your own server, we have examples for Vercel, Firebase, Docker, and more. If there is something you need, we are here to help."
        />
        <FAQCard
          question="What are the templates?"
          answer="The templates are pre-designed open graph images that you can use as a starting point. You can customize the text, colors, and images to match your brand. We have a variety of templates to choose from."
        />
        <FAQCard
          question="What is the essential plan?"
          answer="The essential plan includes lifetime access to the source code, unlimited images, and our 3 top templates. Which are all you need to get started. You can always upgrade later and only pay the difference with a special coupon code."
        />
        <FAQCard
          question="JavaScript or HTML?"
          answer="OG Image Generator is built with TypeScript. It supports Next.js and Sveltekit. It generates images using Sartori, a server-side rendering library. You can use JavaScript, SVG, Tailwind or HTML to customize the templates."
        />
        <FAQCard
          question="What is the refund policy?"
          answer="After you've got access to the repo, the code is yours forever, so it can't be refunded. But we are here to help you with any questions or issues you might have. We are committed to making sure you are happy with your purchase."
        />
        <FAQCard
          question="Are there any other costs?"
          answer="Yes, you need a server to host the code. But it can be as cheap as $0/month. The documentation includes examples for free hosting providers like Vercel, Firebase, and GitHub Pages. You can also use Docker, AWS, or any other serverless provider."
        />
        <FAQCard
          question="What if I need help?"
          answer="We are here to help. You can reach out to us on Twitter or email. We also have a community of developers and designers who are using OG Image Generator and are happy to help you."
        />
        <FAQCard
          question="I can't afford it"
          answer="We understand that not everyone can afford it. We are committed to making OG Image Generator accessible to everyone. If you need help, reach out to us and we will do our best to help you."
        />
        <FAQCard
          question="Will the price increase?"
          answer={`Yes! We've already increased the price 4 times based on demand. The current $${CURRENT_PRICE} price will increase to $${NEXT_PRICE} after the next 10 sales. This gradual increase helps reward early adopters while maintaining sustainable development.`}
        />
      </div>
    </div>
  )
}

const FAQCard = ({ question, answer }: any) => {
  return (
    <div className="rounded-lg border border-border bg-card/20 p-4 text-left shadow">
      <h3 className="mb-2 flex items-center justify-between text-xl font-bold">
        {question}
        <MessageCircleQuestion
          size={16}
          className="text-primary dark:text-yellow-400"
        />
      </h3>
      <p className="text-lg text-muted-foreground">{answer}</p>
    </div>
  )
}

const FinalCallToAction = () => {
  return (
    <div className="pad pb-24 pt-16 text-center">
      <a
        href="https://www.producthunt.com/posts/og-image-generator?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-og&#0045;image&#0045;generator"
        target="_blank"
        className="mx-auto mb-4 inline-flex items-center justify-center"
        rel="noreferrer"
      >
        <img
          src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=441467&theme=light"
          alt="OG&#0032;Image&#0032;Generator - Create&#0032;Beautiful&#0032;OG&#0032;Images&#0032;in&#0032;Minutes | Product Hunt"
          width="250"
          height="54"
        />
      </a>

      <h2 className="text-3xl font-bold leading-[1.5] tracking-[-0.015em]">
        Don't miss out on Lifetime Access
      </h2>
      <p className="mx-auto mt-4 max-w-[750px] text-balance text-lg text-muted-foreground">
        Automate your open graph images, save time, and boost your social media
        CTR. Get lifetime access to OG Image Generator code templates now before
        the price increases again.
      </p>
      <div className="mt-6 flex flex-col items-center justify-center gap-2 sm:flex-row">
        <Button asChild className="w-full sm:w-auto">
          <a href="/buy" className="flex">
            <span className="hidden sm:inline">PURCHASE TODAY</span>
            <span className="sm:hidden">Buy now</span>
            &emsp;
            <s className="text-xs font-bold">${PREVIOUS_PRICE}</s>{' '}
            <b className="-my-1 ml-2 text-lg font-black">${CURRENT_PRICE}</b>
          </a>
        </Button>

        <Button asChild variant="secondary" className="w-full px-4 sm:w-auto">
          <Link href="/templates" className="flex items-center">
            View templates
            <span className="ml-2 rounded-full bg-green-500/10 px-1.5 py-0.5 text-[10px] font-bold uppercase text-green-500 dark:text-green-400">
              2 new
            </span>
          </Link>
        </Button>
      </div>
    </div>
  )
}
