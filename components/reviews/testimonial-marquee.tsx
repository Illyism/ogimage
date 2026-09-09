import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card'
import { highlights } from './reviews'

export const TestimonialMarquee = () => {
  const quotes = highlights.slice(0, 3)

  return (
    <section className="container flex flex-col gap-8 py-16">
      <h2 className="text-balance font-semibold text-3xl tracking-tight">
        From people who shipped cards
      </h2>
      <div className="grid gap-4 md:grid-cols-3">
        {quotes.map((item) => (
          <Card key={`${item.endorser.username}-${item.highlight}`}>
            <CardHeader>
              <div className="flex items-center gap-3">
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
                  <CardDescription className="truncate">
                    {item.endorser.tagline}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{item.highlight}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
