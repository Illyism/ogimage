import { SmilePlusIcon, SparklesIcon, WrenchIcon } from 'lucide-react'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const items = [
  {
    description:
      'One template covers every new post. Title and author come from your metadata.',
    icon: SparklesIcon,
    title: 'Write once',
  },
  {
    description:
      'The routes are in the repo. Change type, color, and layout to match your brand.',
    icon: WrenchIcon,
    title: 'Your source',
  },
  {
    description:
      'Headline, screenshot, blog post, and more. Start from a card that already works.',
    icon: SmilePlusIcon,
    title: 'Proven layouts',
  },
]

export const ProblemSolution = () => (
  <section className="container flex flex-col gap-8 py-16">
    <div className="flex flex-col gap-2">
      <h2 className="text-balance font-semibold text-3xl tracking-tight">
        Why this kit?
      </h2>
      <p className="max-w-2xl text-muted-foreground">
        Stop exporting a PNG for every URL. Generate the card when the page
        renders.
      </p>
    </div>
    <div className="grid gap-4 md:grid-cols-3">
      {items.map((item) => (
        <Card key={item.title}>
          <CardHeader>
            <item.icon className="size-4 text-primary" />
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  </section>
)
