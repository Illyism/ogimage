import { Check, XIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ESSENTIAL_PRICE, PRO_PRICE } from '@/lib/pricing'
import { cn } from '@/lib/utils'
export const Pricing = () => (
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
