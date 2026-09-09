import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const items = [
  {
    answer:
      'The preview card that shows when you share a link on X, LinkedIn, Slack, or iMessage. The usual size is 1200×630.',
    question: 'What is an Open Graph image?',
    value: 'what',
  },
  {
    answer:
      'Next.js + Satori templates, a gallery of real startup cards, and this site. Clone github.com/Illyism/ogimage and host it on Vercel, Docker, or any Node host.',
    question: 'What do I get?',
    value: 'get',
  },
  {
    answer:
      'Ready ImageResponse routes: headline, screenshot, blog post, emoji, icon, and more. Change the text, colors, and images in code.',
    question: 'What are the templates?',
    value: 'templates',
  },
  {
    answer:
      'Clone the public repo. Leave your email if you want the Notion walkthrough.',
    question: 'How do I get the code?',
    value: 'code',
  },
  {
    answer: 'Yes. MIT. Fork it, self-host it, ship it.',
    question: 'Is it free?',
    value: 'free',
  },
  {
    answer:
      'TypeScript, Next.js, and Satori. Templates are JSX plus Tailwind. No hosted API.',
    question: 'What stack does it use?',
    value: 'stack',
  },
  {
    answer:
      'You need a host. Vercel, Docker, or any Node host works. Screenshot and city templates need optional API keys.',
    question: 'Are there other costs?',
    value: 'cost',
  },
]

export const Faq = () => (
  <section className="container flex flex-col gap-8 py-16">
    <div className="flex flex-col gap-2">
      <h2 className="text-balance font-semibold text-3xl tracking-tight">
        Questions
      </h2>
      <p className="max-w-2xl text-muted-foreground">
        The kit is public. The gallery is a swipe file. You host the images.
      </p>
    </div>
    <Accordion className="max-w-2xl" collapsible type="single">
      {items.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionTrigger>{item.question}</AccordionTrigger>
          <AccordionContent>{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  </section>
)
