/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { PageLayout } from '@/components/nav/PageLayout'
import { TestimonialMarquee } from '@/components/reviews/testimonial-marquee'
import { TestimonialMasonry } from '@/components/reviews/testimonial-masonry'
import { TestimonialReviews } from '@/components/reviews/testimonial-reviews'
import { StarGlow } from '@/components/ui/StarGlow'
import { Button } from '@/components/ui/button'
import { generatePageMeta } from '@/core/seo'
import { cn } from '@/lib/utils'
import {
  Check,
  MessageCircleQuestion,
  SmilePlus,
  Sparkles,
  Wrench,
  XIcon,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'
import { Customers } from './customers/Customers'
import { NextCustomers } from './launch'
import { TemplatePreview } from './og/components/TemplatePreview'
import { GiftPopup } from './popup'

export const metadata = generatePageMeta({
  url: `/`,
})

export default function Page() {
  return (
    <PageLayout>
      <Hero />
      <SocialProof />
      <WhatIS />
      <ProblemSolution />
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
    <div className="pad pb-8 pt-24 text-center">
      <h2 className="text-3xl font-bold leading-[1.5] tracking-[-0.015em]">
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
      <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Image
          className="rotate-[-2deg] rounded-lg border-2 border-border shadow-2xl"
          src="/_static/boring-better.jpg"
          width={1270}
          height={760}
          alt="Before and after of a boring and a better twitter card image"
        />
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
    <div className="pad py-16 text-center">
      <h2 className="text-3xl font-bold leading-[1.5] tracking-[-0.015em]">
        Why OG Image Generator?
      </h2>
      <p className="mx-auto mt-4 max-w-[750px] text-balance text-lg text-muted-foreground">
        It takes so much <b>time</b> to create open graph images manually. We
        save you up to <b>99%</b> of the <b>time and cost</b>.
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
    <div className="pad py-16 text-center">
      <h1 className="mx-auto mb-4 max-w-4xl text-balance text-center text-3xl font-bold leading-[1.5] tracking-[-0.015em] md:max-w-[46rem] md:text-5xl">
        Open Graph & Twitter Image Templates for Next.js
      </h1>
      <p className="mx-auto max-w-[750px] text-balance text-lg font-medium text-muted-foreground sm:text-xl">
        TSX templates for Next.js{' '}
        <a
          href="https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image#generate-images-using-code-js-ts-tsx"
          className="font-bold text-primary underline dark:text-yellow-400"
          rel="nofollow"
          target="_blank"
        >
          opengraph-image & twitter-image
        </a>
        . Get all the code to generate infinite open graph images for your
        website, blog, or social media posts for a one-time payment.
      </p>
      <div className="mt-6 flex flex-col items-center justify-center gap-2 sm:flex-row">
        <Button asChild className="w-full px-4 sm:w-auto">
          <a href="/buy" target="_blank" className="flex">
            <span className="hidden sm:inline">PURCHASE TODAY</span>
            <span className="sm:hidden">Buy now</span>
            &emsp;<s className="text-xs font-bold">$67</s>{' '}
            <b className="-my-1 ml-2 text-lg font-black">$37</b>
          </a>
        </Button>

        <Button
          asChild
          variant="secondary"
          className="hidden px-4 sm:inline-block"
        >
          <Link href="/templates" className="flex items-center">
            View templates
            <span className="ml-2 rounded-full bg-green-500/10 px-1.5 py-0.5 text-[10px] font-bold uppercase text-green-500 dark:text-green-400">
              2 new
            </span>
          </Link>
        </Button>
      </div>
      <div className="mt-2 flex items-center justify-center text-center text-xs">
        <span className="relative mr-1 flex items-center rounded-full bg-green-500/10 px-1 py-0.5 font-black text-green-500">
          $30 off
        </span>{' '}
        <Suspense fallback="for the next 17 customers">
          <NextCustomers />
        </Suspense>{' '}
        • Lifetime access
      </div>
    </div>
  )
}

const SocialProof = () => {
  return (
    <>
      <div className="mb-8 flex flex-col items-center justify-center gap-8 text-center lg:flex-row">
        <div className="max-w-sm text-sm">
          <StarGlow className="mb-2" />
          <p className="text-bold  text-balance text-lg opacity-90">
            &quot;The live screenshot is very useful and saves us a lot of
            time.&quot;
          </p>
        </div>
        <div className="flex flex-col items-center justify-center gap-4">
          <a
            href="https://www.producthunt.com/posts/og-image-generator?utm_source=badge-top-post-badge&utm_medium=badge&utm_souce=badge-og&#0045;image&#0045;generator"
            target="_blank"
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
          <TestimonialReviews />
        </div>
        <div className="max-w-sm text-sm">
          <StarGlow className="mb-2" />
          <p className="text-bold text-balance text-lg opacity-90">
            &quot;It&apos;s kind of like{' '}
            <b>Tailwind UI or Shadcn UI components</b> but for Vercel/OG images.
            😎 Pretty cool.&quot;
          </p>
        </div>
      </div>
      <TestimonialMarquee big />
    </>
  )
}

const Pricing = () => {
  return (
    <div className="pad pb-24 pt-16 text-center">
      <h2 className="text-balance text-3xl font-bold leading-[1.5] tracking-[-0.015em]">
        A lifetime deal you can&apos;t miss
      </h2>
      <p className="mx-auto mt-4 max-w-[750px] text-balance text-lg text-muted-foreground">
        No monthly fees. No hidden costs. Just a one-time payment for lifetime
        access to the source code.
      </p>
      <div className="mx-auto mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <PricingCard
          title="Essential"
          price="$37"
          discount="$67"
          features={[
            'Source code',
            'Unlimited images',
            'One-time purchase',
            'All current templates',
          ]}
          disabled={[
            'No future templates',
            'No discount on partner products',
            'Get featured on our website',
            'Priority support',
          ]}
        />
        <PricingCard
          popular
          title="Pro"
          price="$67"
          discount="$97"
          features={[
            'Source code',
            'Unlimited images',
            'Lifetime access',
            'All templates',
            'All future templates',
            '10% discount on partner products',
          ]}
          disabled={['Get featured on our website', 'Priority support']}
        />
        <PricingCard
          className="sm:col-span-2 lg:col-span-1"
          title="Agency"
          price="$197"
          discount="$227"
          features={[
            'Source code',
            'Unlimited images',
            'Lifetime access',
            'All templates',
            'All future templates',
            '10% discount on partner products',
            'Get featured on our website',
            'Priority support',
          ]}
        />
      </div>
      <div className="mt-2 flex items-center justify-center text-center text-xs">
        <span className="relative mr-1 flex items-center rounded-full bg-green-500/10 px-1 py-0.5 font-black text-green-500">
          $30 off
        </span>{' '}
        <Suspense fallback="for the next 17 customers">
          <NextCustomers />
        </Suspense>{' '}
        • Lifetime access
      </div>
    </div>
  )
}

const PricingCard = ({
  title,
  price,
  discount,
  features,
  className,
  popular,
  disabled,
}: any) => {
  return (
    <div
      className={cn(
        'btn relative flex flex-col rounded-lg border-2 border-border bg-card px-6 py-4 text-left shadow',
        popular && 'border-primary',
        className,
      )}
    >
      {popular && (
        <div className="absolute inset-x-0 -top-4 mx-auto w-fit rounded-full bg-primary px-3 py-1 font-bold text-white">
          Popular
        </div>
      )}
      <h3 className="mb-2 text-2xl font-bold">{title}</h3>
      <div className="flex items-center gap-2">
        <s className="text-lg font-bold text-muted-foreground">{discount}</s>
        <span className="text-4xl font-black">{price}</span>
      </div>
      <ul className="mt-4 flex-1 text-center">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center gap-2 font-semibold">
            <Check size={16} className="text-green-500" />
            <span>{feature}</span>
          </li>
        ))}
        {disabled &&
          disabled.map((feature, i) => (
            <li
              key={i}
              className="flex items-center gap-2 font-medium text-muted-foreground"
            >
              <XIcon size={16} />
              <span>{feature}</span>
            </li>
          ))}
      </ul>

      <div className="text-center">
        <Button asChild className="mt-6 w-full px-4">
          <a href="/buy" target="_blank">
            Buy {title}
          </a>
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
    <div className="pad pb-24 pt-16 text-center">
      <h2 className="text-3xl font-bold leading-[1.5] tracking-[-0.015em]">
        Frequently asked questions
      </h2>
      <div className="contain mt-12 max-w-3xl space-y-6">
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
          answer="OG Image Generator is built with TypeScript and Next.js. It generates images using Sartori, a server-side rendering library. You can use JavaScript, SVG, Tailwind or HTML to customize the templates."
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
      >
        <img
          src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=441467&theme=light"
          alt="OG&#0032;Image&#0032;Generator - Create&#0032;Beautiful&#0032;OG&#0032;Images&#0032;in&#0032;Minutes | Product Hunt"
          width="250"
          height="54"
        />
      </a>

      <h2 className="text-3xl font-bold leading-[1.5] tracking-[-0.015em]">
        Get started today
      </h2>
      <p className="mx-auto mt-4 max-w-[750px] text-balance text-lg text-muted-foreground">
        Automate open graph images for your website, blog, or social media
        posts. Customizable. Open source. Lifetime access.
      </p>
      <div className="mt-6 flex flex-col items-center justify-center gap-2 sm:flex-row">
        <Button asChild className="w-full px-4 sm:w-auto">
          <a href="/buy" target="_blank" className="flex">
            <span className="hidden sm:inline">PURCHASE TODAY</span>
            <span className="sm:hidden">Buy now</span>
            &emsp;<s className="text-xs font-bold">$67</s>{' '}
            <b className="-my-1 ml-2 text-lg font-black">$37</b>
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
      <div className="mt-2 flex items-center justify-center text-center text-xs">
        <span className="relative mr-1 flex items-center rounded-full bg-green-500/10 px-1 py-0.5 font-black text-green-500">
          $30 off
        </span>{' '}
        <Suspense fallback="for the next 17 customers">
          <NextCustomers />
        </Suspense>{' '}
        • Lifetime access
      </div>
    </div>
  )
}
