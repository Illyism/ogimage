import { SectionHeading } from '@/components/home/section-heading'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { highlights } from './reviews'

export const TestimonialMarquee = () => {
  const quotes = highlights.slice(0, 3)

  return (
    <section className="defer-paint container flex flex-col gap-12 py-20">
      <SectionHeading
        eyebrow="Reviews"
        title={
          <>
            From people who <span className="accent-serif">shipped</span> cards
          </>
        }
      />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {quotes.map((item) => (
          <figure
            className="surface flex flex-col justify-between gap-8 rounded-3xl p-6 md:p-8"
            key={`${item.endorser.username}-${item.highlight}`}
          >
            <blockquote className="text-pretty font-serif text-3xl leading-[1.1]">
              <span aria-hidden="true" className="text-primary">
                “
              </span>
              {item.highlight}
              <span aria-hidden="true" className="text-primary">
                ”
              </span>
            </blockquote>
            <figcaption className="flex items-center gap-3">
              <Avatar>
                <AvatarImage alt="" src={item.endorser.avatar} />
                <AvatarFallback>
                  {item.endorser.name.slice(0, 1)}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <p className="truncate font-medium text-sm">
                  {item.endorser.name}
                </p>
                <p className="truncate text-muted-foreground text-sm">
                  {item.endorser.tagline}
                </p>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
