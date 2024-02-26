/* eslint-disable @next/next/no-img-element */
import { PageLayout } from '@/components/nav/PageLayout'
import { StarGlow } from '@/components/ui/StarGlow'
import { Button } from '@/components/ui/button'
import { generatePageMeta } from '@/core/seo'
import { cn } from '@/lib/utils'
import { Check, DollarSign, XIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export const metadata = generatePageMeta({
  url: `/`,
})

export default async function Page() {
  return (
    <PageLayout>
      <Hero />
      <SocialProof />
      <Pricing />
    </PageLayout>
  )
}

const Hero = () => {
  return (
    <div className="pad pb-24 pt-16 text-center">
      <h1 className="mx-auto mb-4 max-w-4xl text-balance text-center text-3xl font-bold leading-[1.5] tracking-[-0.015em] md:max-w-[46rem] md:text-5xl">
        <span className="group relative rounded border-2 border-primary px-2 font-black transition-colors hover:bg-primary/10">
          <div className="group-hover:scale-200 absolute -left-1.5 -top-1.5 h-3 w-3 rounded-lg border-2 border-primary bg-background transition group-hover:bg-primary"></div>
          <div className="group-hover:scale-200 absolute -right-1.5 -top-1.5 h-3 w-3 rounded-lg border-2 border-primary bg-background transition group-hover:bg-primary"></div>
          <div className="group-hover:scale-200 absolute -bottom-1.5 -left-1.5 h-3 w-3 rounded-lg border-2 border-primary bg-background transition group-hover:bg-primary"></div>
          <div className="group-hover:scale-200 absolute -bottom-1.5 -right-1.5 h-3 w-3 rounded-lg border-2 border-primary bg-background transition group-hover:bg-primary"></div>
          OG
        </span>{' '}
        Image Generator
      </h1>
      <p className="mx-auto max-w-[750px] text-balance text-lg text-muted-foreground sm:text-xl">
        Automate <b className="font-bold">open graph images</b> for your
        website, blog, or social media posts. Customizable. Open source.
        Lifetime access.
      </p>
      <div className="mt-6 flex items-center justify-center gap-2">
        <Button asChild className="px-4">
          <a href="/buy" target="_blank" className="flex">
            <span className="hidden sm:inline">PURCHASE TODAY</span>
            <span className="sm:hidden">Buy now</span>
            &emsp;<s className="text-xs font-bold">$127</s>{' '}
            <b className="-my-1 ml-2 text-lg font-black">$97</b>
          </a>
        </Button>

        <Button asChild variant="secondary" className="px-4">
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
          <DollarSign
            size={12}
            className="absolute inset-y-0 -left-4 m-auto animate-ping text-green-500"
          />
          $30 off
        </span>{' '}
        for the next 17 customers • Lifetime access
      </div>
    </div>
  )
}

const SocialProof = () => {
  return (
    <div className="flex items-center justify-center text-center">
      <div className="max-w-sm p-3 text-sm">
        <StarGlow className="mb-2" />
        <p className="text-bold mb-3 text-balance text-lg opacity-90">
          &quot;OG Image Generator is a game changer for our agency. It saves us
          time and money, and our clients love the results.&quot;
        </p>
        <div className="flex items-center justify-center gap-2 text-left">
          <Image
            src="/me/ilias-ism-circle.png"
            alt="Ilias Ism"
            width={48}
            height={48}
            className="rounded-full border border-white/10"
          />
          <div>
            <div className="text-base font-bold leading-none tracking-wide">
              Ilias Ism
            </div>
            <a
              className="text-xs font-semibold leading-tight opacity-80 transition-colors hover:underline hover:opacity-100"
              href="https://magicspace.agency"
              target="_blank"
            >
              MagicSpace SEO
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

const Pricing = () => {
  return (
    <div className="pad pb-24 pt-16 text-center">
      <h2 className="text-3xl font-bold leading-[1.5] tracking-[-0.015em]">
        A lifetime deal you can&apos;t miss
      </h2>
      <p className="mx-auto mt-4 max-w-[750px] text-balance text-lg text-muted-foreground">
        No monthly fees. No hidden costs. Just a one-time payment for lifetime
        access to the source code.
      </p>
      <div className="mx-auto mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <PricingCard
          title="Essential"
          price="$29"
          discount="$59"
          features={[
            'Source code',
            'Unlimited images',
            'Lifetime access',
            'Our 3 top templates',
          ]}
          disabled={[
            'Free updates',
            '10% discount on partner products',
            'Get featured on our website',
            'Priority support',
          ]}
        />
        <PricingCard
          popular
          title="Pro"
          price="$97"
          discount="$127"
          features={[
            'Source code',
            'Unlimited images',
            'Lifetime access',
            'All templates',
            'Free updates',
            '10% discount on partner products',
          ]}
          disabled={['Get featured on our website', 'Priority support']}
        />
        <PricingCard
          className="sm:col-span-2 lg:col-span-1"
          title="Agency"
          price="$297"
          discount="$327"
          features={[
            'Source code',
            'Unlimited images',
            'Lifetime access',
            'All templates',
            'Free updates',
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
        for the next 17 customers • Lifetime access
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
