import { ArrowRightIcon, Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { FadeIn } from '../FadeIn'
import { FlagOnly } from '../ux/flag'
import { RankCard } from './RankCard'
import { getReview } from './reviews'

export const TestimonialVideoSection = () => {
  return (
    <div className="contain mb-8 mt-16 lg:mb-16 lg:mt-32">
      <div className="mx-auto text-center">
        <div className="mx-auto mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-primary/5 bg-primary/5">
          <FlagOnly className="text-xl" />
        </div>
        <h2 className="text-xl font-bold tracking-tight sm:mb-6 md:text-4xl">
          Customers rave about our exceptional services!
        </h2>
        <div className="mb-6 font-bold md:text-xl lg:mb-12">
          Let&apos;s hear directly from our clients.
        </div>
      </div>
      <BankGreenSection />
    </div>
  )
}

export const TestimonialVideoSecondSection = () => {
  return (
    <div className="contain my-8 lg:my-16">
      <OscarStoriesSection />
    </div>
  )
}

export const TestimonialVideoThirdSection = () => {
  return (
    <div className="contain my-8 lg:my-16">
      <BilateralSection />
    </div>
  )
}

const BankGreenSection = () => {
  const review = getReview('bank-green')

  return (
    <div className="mx-auto max-w-4xl">
      <div className="flex flex-col items-start justify-center gap-10 lg:flex-row lg:gap-20">
        <div className="relative w-full lg:w-1/2">
          <Image
            className="pointer-events-none absolute -top-48 h-full w-full select-none object-contain opacity-75 dark:opacity-100 sm:inset-0 sm:scale-[2]"
            src="/img/background-gradient.png"
            alt="background"
            width={1000}
            height={1000}
            loading="lazy"
          />

          {review && (
            <FadeIn className="sm:mt-16">
              <p className="py-2 text-center text-lg italic sm:-rotate-1 lg:pt-8">
                “The team at MagicSpace was <b>amazing</b>!”
              </p>
              <div className="relative mx-auto rounded-xl border border-foreground/5 bg-foreground/5 p-1.5 sm:-rotate-1">
                <video
                  className="w-full rounded-lg border-2 border-foreground/10 shadow-md"
                  src={review.video_mp4_url}
                  muted
                  controls
                  autoPlay
                  loop
                  itemProp="video"
                  itemScope
                  itemType="http://schema.org/VideoObject"
                >
                  <meta
                    itemProp="name"
                    content={`MagicSpace review by ${review.endorser.name}, ${review.endorser.tagline}`}
                  />
                  <meta
                    itemProp="thumbnailUrl"
                    content={review.video_poster ?? review.endorser.avatar}
                  />
                  <meta itemProp="uploadDate" content={review.date} />
                  <meta itemProp="contentUrl" content={review.video_mp4_url} />
                  <span itemProp="description">{review?.text}</span>
                </video>
              </div>
              <div className="flex items-center justify-between px-6 py-2 sm:-rotate-1">
                <div>
                  <div className="text-xl font-bold leading-none">
                    Zak Gottlieb
                  </div>
                  <div className="font-medium text-muted-foreground">
                    Director at Bank.Green
                  </div>
                </div>
                <div className="mb-1 flex">
                  <Star
                    fill="currentColor"
                    className="h-4 w-4 text-yellow-500"
                  />
                  <Star
                    fill="currentColor"
                    className="h-4 w-4 text-yellow-500"
                  />
                  <Star
                    fill="currentColor"
                    className="h-4 w-4 text-yellow-500"
                  />
                  <Star
                    fill="currentColor"
                    className="h-4 w-4 text-yellow-500"
                  />
                  <Star
                    fill="currentColor"
                    className="h-4 w-4 text-yellow-500"
                  />
                </div>
              </div>
              <RankCard
                keywords={[
                  ['is my bank green', 1],
                  ['sustainable banking', 1],
                  ['eco banking', 3],
                ]}
                className="relative z-10 sm:-rotate-1"
              />
            </FadeIn>
          )}
        </div>
        <div className="w-full lg:w-1/2">
          <div className="relative mt-[-2rem] space-y-5 md:mt-0 lg:mt-16 xl:mt-24">
            <span className="hidden text-xs font-bold uppercase leading-tight text-violet-500 dark:text-violet-400 sm:inline-block">
              Learn how Zak grew his non-profit
            </span>
            <h3 className="text-xl font-black md:text-2xl">
              From Launch to 1M Search Impressions in 6 Months
            </h3>
            <div></div>
            <p className="lg:text-lg">
              We helped{' '}
              <Link href="https://bank.green" className="font-bold underline">
                Bank.Green
              </Link>{' '}
              grow by creating a{' '}
              <Link
                href="https://il.ly/seo/strategy"
                className="font-bold underline"
              >
                SEO strategy
              </Link>{' '}
              to reduce climate change. Our goal was to get customers to use
              eco-friendly banks that don&apos;t invest in fossil fuels. This
              would put pressure on the “bad” banks to stop investing in them.{' '}
            </p>
            <p className="lg:text-lg">
              <b>We developed and launched the website.</b>
            </p>
            <p className="lg:text-lg">
              The campaign quickly gained <b>one million search views</b> in
              under six months. It is currently the top result for green banking
              and related keywords.
            </p>
            <span className="block h-px w-10/12 bg-primary/20"></span>
            <div className="block rounded-xl border border-foreground/5 bg-foreground/5 p-4 text-sm font-medium backdrop-blur-[2px]">
              <b className="block text-lg">We boost website traffic.</b>
              We did it for Bank.Green, we can do it for you.
              <Link
                href="/buy"
                className="mt-4 flex w-full cursor-pointer items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-lg border border-primary bg-primary px-4 py-2 text-sm font-bold text-primary-foreground shadow-md outline outline-1 outline-offset-[-2px] outline-primary-foreground/30 transition-all duration-150 ease-in-out hover:bg-primary/90 hover:shadow-lg"
              >
                Order Today <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const OscarStoriesSection = () => {
  const review = getReview('oscar-stories')

  return (
    <div className="mx-auto max-w-4xl">
      <div className="flex flex-col items-start justify-center gap-10 lg:flex-row-reverse lg:gap-20">
        <div className="relative w-full lg:w-1/2">
          <Image
            className="pointer-events-none absolute -top-48 h-full w-full select-none object-contain opacity-75 dark:opacity-100 sm:inset-0 sm:scale-[2]"
            src="/img/background-gradient.png"
            alt="background"
            width={1000}
            height={1000}
            loading="lazy"
          />

          {review && (
            <FadeIn className="sm:mt-16">
              <p className="py-2 text-center text-lg italic sm:rotate-1 lg:pt-8">
                &quot;Truly <b>international SEO</b> in <b>5</b>{' '}
                languages!&quot;
              </p>
              <div className="relative mx-auto rounded-xl border border-foreground/5 bg-foreground/5 p-1.5 sm:rotate-1">
                <video
                  className="w-full rounded-lg border-2 border-foreground/10 shadow-md"
                  src={review.video_mp4_url}
                  muted
                  controls
                  autoPlay
                  loop
                  itemProp="video"
                  itemScope
                  itemType="http://schema.org/VideoObject"
                >
                  <meta
                    itemProp="name"
                    content={`MagicSpace review by ${review.endorser.name}, ${review.endorser.tagline}`}
                  />
                  <meta
                    itemProp="thumbnailUrl"
                    content={review.video_poster ?? review.endorser.avatar}
                  />
                  <meta itemProp="uploadDate" content={review.date} />
                  <meta itemProp="contentUrl" content={review.video_mp4_url} />
                  <span itemProp="description">{review?.text}</span>
                </video>
              </div>
              <div className="flex items-center justify-between px-6 py-2 sm:rotate-1">
                <div>
                  <div className="text-xl font-bold leading-none">
                    Dima Rubanov
                  </div>
                  <div className="font-medium text-muted-foreground">
                    Co-founder at Oscar Stories
                  </div>
                </div>
                <div className="mb-1 flex">
                  <Star
                    fill="currentColor"
                    className="h-4 w-4 text-yellow-500"
                  />
                  <Star
                    fill="currentColor"
                    className="h-4 w-4 text-yellow-500"
                  />
                  <Star
                    fill="currentColor"
                    className="h-4 w-4 text-yellow-500"
                  />
                  <Star
                    fill="currentColor"
                    className="h-4 w-4 text-yellow-500"
                  />
                  <Star
                    fill="currentColor"
                    className="h-4 w-4 text-yellow-500"
                  />
                </div>
              </div>
              <RankCard
                keywords={[
                  ['bedtime story generator', 1, '🇺🇲'],
                  ['gute nacht geschichte', 1, '🇩🇪'],
                  ['buonanotte affettuose', 3, '🇮🇹'],
                ]}
                className="relative z-10 sm:rotate-1"
              />
            </FadeIn>
          )}
        </div>
        <div className="w-full lg:w-1/2">
          <div className="relative mt-[-2rem] space-y-5 md:mt-0 lg:mt-16 xl:mt-24">
            <span className="hidden text-xs font-bold uppercase leading-tight text-violet-500 dark:text-violet-400 sm:inline-block">
              AI-Generated Bedtime Stories for Kids
            </span>
            <h3 className="text-xl font-black md:text-2xl">
              Learn How Oscar Stories Grew Their App Downloads
            </h3>
            <div></div>
            <p className="lg:text-lg">
              We helped{' '}
              <Link
                href="https://oscarstories.com"
                className="font-bold underline"
              >
                Oscar Stories
              </Link>{' '}
              grow by creating a{' '}
              <Link
                href="https://il.ly/seo/strategy"
                className="font-bold underline"
              >
                SEO strategy
              </Link>{' '}
              to get more kids using their app for AI-generated bedtime stories.
              Our goal was to boost downloads and daily active users. This would
              allow Oscar Stories to create more high-quality content.
            </p>
            <p className="lg:text-lg">
              <b>We audited their website and app.</b>
            </p>
            <p className="lg:text-lg">
              The campaign quickly gained traction, with over a 200% boost in
              SEO traffic. Oscar Stories is now a top result for &quot;bedtime
              stories&quot; in some countries and languages.
            </p>
            <span className="block h-px w-10/12 bg-primary/20"></span>
            <div className="block rounded-xl border border-foreground/5 bg-foreground/5 p-4 text-sm font-medium backdrop-blur-[2px]">
              <b className="block text-lg">
                We boost app visibility and website traffic.
              </b>
              We did it for Oscar Stories, we can do it for you.
              <Link
                href="/buy"
                className="mt-4 flex w-full cursor-pointer items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-lg border border-primary bg-primary px-4 py-2 text-sm font-bold text-primary-foreground shadow-md outline outline-1 outline-offset-[-2px] outline-primary-foreground/30 transition-all duration-150 ease-in-out hover:bg-primary/90 hover:shadow-lg"
              >
                Order Now <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const BilateralSection = () => {
  const review = getReview('bilateral')

  return (
    <div className="mx-auto max-w-4xl">
      <div className="flex flex-col items-start justify-center gap-10 lg:flex-row lg:gap-20">
        <div className="relative w-full lg:w-1/2">
          <Image
            className="pointer-events-none absolute -top-48 h-full w-full select-none object-contain opacity-75 dark:opacity-100 sm:inset-0 sm:scale-[2]"
            src="/img/background-gradient.png"
            alt="background"
            width={1000}
            height={1000}
            loading="lazy"
          />

          {review && (
            <FadeIn className="sm:mt-16">
              <p className="py-2 text-center text-lg italic sm:-rotate-1 lg:pt-8">
                &quot;Real <b>professional help</b> for <b>SEO</b>&quot;
              </p>
              <div className="relative mx-auto rounded-xl border border-foreground/5 bg-foreground/5 p-1.5 sm:-rotate-1">
                <video
                  className="w-full rounded-lg border-2 border-foreground/10 shadow-md"
                  src={review.video_mp4_url}
                  muted
                  controls
                  autoPlay
                  loop
                  itemProp="video"
                  itemScope
                  itemType="http://schema.org/VideoObject"
                >
                  <meta
                    itemProp="name"
                    content={`MagicSpace review by ${review.endorser.name}, ${review.endorser.tagline}`}
                  />
                  <meta
                    itemProp="thumbnailUrl"
                    content={review.video_poster ?? review.endorser.avatar}
                  />
                  <meta itemProp="uploadDate" content={review.date} />
                  <meta itemProp="contentUrl" content={review.video_mp4_url} />
                  <span itemProp="description">{review?.text}</span>
                </video>
              </div>
              <div className="flex items-center justify-between px-6 py-2 sm:-rotate-1">
                <div>
                  <div className="text-xl font-bold leading-none">
                    Yanick S.
                  </div>
                  <div className="font-medium text-muted-foreground">
                    CEO @ bilateralstimulation.io
                  </div>
                </div>
                <div className="mb-1 flex">
                  <Star
                    fill="currentColor"
                    className="h-4 w-4 text-yellow-500"
                  />
                  <Star
                    fill="currentColor"
                    className="h-4 w-4 text-yellow-500"
                  />
                  <Star
                    fill="currentColor"
                    className="h-4 w-4 text-yellow-500"
                  />
                  <Star
                    fill="currentColor"
                    className="h-4 w-4 text-yellow-500"
                  />
                  <Star
                    fill="currentColor"
                    className="h-4 w-4 text-yellow-500"
                  />
                </div>
              </div>
              <RankCard
                keywords={[
                  ['bilateral stimulation', 1],
                  ['free emdr online tool', 1],
                  ['emdr tool', 2],
                ]}
                className="relative z-10 sm:-rotate-1"
              />
            </FadeIn>
          )}
        </div>
        <div className="w-full lg:w-1/2">
          <div className="relative mt-[-2rem] space-y-5 md:mt-0 lg:mt-16 xl:mt-24">
            <span className="hidden text-xs font-bold uppercase leading-tight text-violet-500 dark:text-violet-400 sm:inline-block">
              Our Custom SEO Strategies Work
            </span>
            <h3 className="text-xl font-black md:text-2xl">
              How Bilateral Therapy Took Off
            </h3>
            <div></div>
            <p className="lg:text-lg">
              We helped{' '}
              <Link
                href="https://bilateralstimulation.io/"
                className="font-bold underline"
              >
                BilateralStimulation.io
              </Link>{' '}
              tap into demand for alternative PTSD treatments. Our goal was to
              get more people learning about bilateral stimulation. This would
              allow Bilateral Therapy to help more patients with trauma
              recovery.
            </p>
            <p className="lg:text-lg">
              <b>
                We conducted an in-depth audit and analysis of their website.
              </b>
            </p>
            <p className="lg:text-lg">
              Based on our findings, we provided a tailored roadmap to target
              high-value keywords and optimize their site for search visibility.
            </p>
            <span className="block h-px w-10/12 bg-primary/20"></span>
            <div className="block rounded-xl border border-foreground/5 bg-foreground/5 p-4 text-sm font-medium backdrop-blur-[2px]">
              <b className="block text-lg">We develop custom SEO strategies.</b>
              We did it for Bilateral Therapy, let us do it for you too.
              <Link
                href="/contact"
                className="mt-4 flex w-full cursor-pointer items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-lg border border-primary bg-primary px-4 py-2 text-sm font-bold text-primary-foreground shadow-md outline outline-1 outline-offset-[-2px] outline-primary-foreground/30 transition-all duration-150 ease-in-out hover:bg-primary/90 hover:shadow-lg"
              >
                Schedule a free consultation{' '}
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
