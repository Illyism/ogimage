/* eslint-disable @next/next/no-img-element */
import { PageLayout } from '@/components/nav/PageLayout'
import { StarGlow } from '@/components/ui/StarGlow'
import { Button } from '@/components/ui/button'
import { generatePageMeta } from '@/core/seo'
import { cn } from '@/lib/utils'
import { allTemplateMeta } from 'contentlayer/generated'
import { Check, DollarSign, Sparkles, XIcon } from 'lucide-react'
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
      <ProblemSolution />
      <TemplatePreview />
      <Pricing />
      <FAQ />
      <FinalCallToAction />
    </PageLayout>
  )
}

const ProblemSolution = () => {
  return (
    <div className="pad py-24 text-center">
      <h2 className="text-3xl font-bold leading-[1.5] tracking-[-0.015em]">
        The problem we solve
      </h2>
      <p className="mx-auto mt-4 max-w-[750px] text-balance text-lg text-muted-foreground">
        Open Graph images are a pain to create. They require a designer, or
        expensive software. They are not customizable, and they are not
        automated. OG Image Generator solves all these problems.
      </p>
      <div className="mt-12 flex items-center justify-center gap-4">
        <div className="max-w-sm p-3 text-sm">
          <h3 className="mb-2 text-xl font-bold">Automated</h3>
          <p className="text-muted-foreground">
            Generate images automatically from your website or blog. No need to
            design them manually.
          </p>
        </div>
        <div className="max-w-sm p-3 text-sm">
          <h3 className="mb-2 text-xl font-bold">Customizable</h3>
          <p className="text-muted-foreground">
            Change the text, colors, and images of your open graph images. Make
            them unique to your brand.
          </p>
        </div>
        <div className="max-w-sm p-3 text-sm">
          <h3 className="mb-2 text-xl font-bold">Open Source</h3>
          <p className="text-muted-foreground">
            Get the source code and host it on your own server. No monthly fees.
            No hidden costs.
          </p>
        </div>
      </div>
    </div>
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
            <div className="flex items-center gap-1">
              <a
                className="text-xs font-semibold leading-tight text-foreground/80 transition-colors"
                href="https://magicspace.agency"
                target="_blank"
              >
                MagicSpace SEO{' '}
              </a>
              <span className="flex items-center justify-center rounded-2xl bg-purple-500 px-1 py-1 text-[10px] font-black uppercase leading-none tracking-tighter text-white">
                <Sparkles size={10} />
                Agency
              </span>
            </div>
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

const TemplatePreview = () => {
  const sortedTemplates = allTemplateMeta.sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt),
  )

  return (
    <div className="pad pb-24 pt-16 text-center">
      <h2 className="text-3xl font-bold leading-[1.5] tracking-[-0.015em]">
        Beautiful templates
      </h2>
      <p className="mx-auto mt-4 max-w-[750px] text-balance text-lg text-muted-foreground">
        Choose from a variety of templates to create open graph images that
        match your brand.
      </p>
      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sortedTemplates.map((post, idx) => (
          <TemplateCard
            key={idx}
            title={post.title}
            description={post.description}
            image={`/templates/${post.slug}/example`}
          />
        ))}
      </div>
      <div className="mt-6">
        <Button asChild variant="secondary">
          <Link href="/templates" className="flex items-center">
            View all templates
          </Link>
        </Button>
      </div>
    </div>
  )
}

const TemplateCard = ({ title, description, image }: any) => {
  return (
    <div className="relative rounded-lg border-2 border-border bg-card p-4 text-left shadow">
      <img
        src={image}
        alt={title}
        className="aspect-[1200/630] rounded-lg"
        width={1200}
        height={630}
      />
      <h3 className="mb-2 mt-4 text-xl font-bold">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}

const FAQ = () => {
  return (
    <div className="pad pb-24 pt-16 text-center">
      <h2 className="text-3xl font-bold leading-[1.5] tracking-[-0.015em]">
        Frequently asked questions
      </h2>
      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
          question="How is this better than Canva?"
          answer="Canva is a great tool for creating open graph images. However, it is not automated, customizable, or open source. OG Image Generator is designed to be used by developers and designers who want to automate the process and save up to 90% of the time and cost."
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
      </div>
    </div>
  )
}

const FAQCard = ({ question, answer }: any) => {
  return (
    <div className="relative rounded-lg border-2 border-border bg-card p-4 text-left shadow">
      <h3 className="mb-2 text-xl font-bold">{question}</h3>
      <p className="text-muted-foreground">{answer}</p>
    </div>
  )
}

const FinalCallToAction = () => {
  return (
    <div className="pad pb-24 pt-16 text-center">
      <h2 className="text-3xl font-bold leading-[1.5] tracking-[-0.015em]">
        Get started today
      </h2>
      <p className="mx-auto mt-4 max-w-[750px] text-balance text-lg text-muted-foreground">
        Automate open graph images for your website, blog, or social media
        posts. Customizable. Open source. Lifetime access.
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
          $30 off
        </span>{' '}
        for the next 17 customers • Lifetime access
      </div>
    </div>
  )
}
