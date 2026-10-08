import { StarIcon } from 'lucide-react'
import Image from 'next/image'
import { GitHubIcon, TwitterIcon } from '@/components/icons/SocialIcons'
import { Button } from '@/components/ui/button'
import { CREATOR, GITHUB_URL } from '@/lib/products'
import { cn } from '@/lib/utils'

/**
 * The funnel of the site: star the repo, then follow the person who made it.
 */
export const StarCta = ({ compact = false }: { compact?: boolean }) => (
  <section className={cn('container py-20', compact && 'py-12')}>
    <div className="surface relative isolate overflow-hidden rounded-3xl p-8 md:p-14">
      <div className="absolute -top-32 -right-24 -z-10 size-96 rounded-full bg-primary/25 blur-3xl" />
      <div className="mask-fade-b absolute inset-0 -z-10 bg-grid" />
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
        <div className="flex flex-col items-start gap-5">
          <p className="eyebrow">Open source · MIT</p>
          <h2 className="display text-3xl md:text-5xl">
            {compact ? (
              <>
                Make a card <span className="accent-serif">like these</span>
              </>
            ) : (
              <>
                Free forever. <span className="accent-serif">Star it</span> if
                it helps
              </>
            )}
          </h2>
          <p className="max-w-md text-pretty text-lg text-muted-foreground">
            The generator, the templates, the checker, and the gallery are all
            in one public repo. A star helps other people find it.
          </p>
          <div className="flex flex-wrap gap-2">
            <Button asChild size="lg">
              <a href={GITHUB_URL} rel="noreferrer" target="_blank">
                <StarIcon className="fill-current" />
                Star on GitHub
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={GITHUB_URL} rel="noreferrer" target="_blank">
                <GitHubIcon className="fill-current" />
                Clone the repo
              </a>
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-5 rounded-2xl bg-background/60 p-6">
          <div className="flex items-center gap-4">
            <Image
              alt={CREATOR.name}
              className="image-outline size-14 rounded-full"
              height={56}
              src="/me/ilias.png"
              width={56}
            />
            <div className="flex flex-col">
              <span className="eyebrow">Made by</span>
              <span className="font-semibold text-lg tracking-tight">
                {CREATOR.name}
              </span>
            </div>
          </div>
          <p className="text-pretty text-muted-foreground">
            I build small tools for people who ship websites. I post what I
            learn about SEO, design, and growth.
          </p>
          <div className="flex flex-wrap gap-2">
            <Button asChild variant="secondary">
              <a href={CREATOR.x} rel="noreferrer" target="_blank">
                <TwitterIcon className="fill-current" />
                Follow {CREATOR.handle}
              </a>
            </Button>
            {/* No rel. il.ly must get the referrer and a followed link. */}
            <Button asChild variant="ghost">
              <a href={CREATOR.site} rel="noopener" target="_blank">
                il.ly
                <span aria-hidden="true">→</span>
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  </section>
)
