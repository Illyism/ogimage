import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { SectionHeading } from './section-heading'

const items = [
  {
    answer:
      'OG image is short for Open Graph image. It is the preview picture that shows when you share a link on X, LinkedIn, Slack, or iMessage. The usual size is 1200×630.',
    question: 'What is an OG image?',
    value: 'what',
  },
  {
    answer:
      'A browser generator, Next.js + Satori templates, a checker for your tags, and a gallery of real startup cards. Clone github.com/Illyism/ogimage and host it on Vercel, Docker, or any Node host.',
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
      'Clone the public repo on GitHub. There is no sign-up. If it helps you, give it a star.',
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
  <section className="defer-paint container grid grid-cols-1 gap-12 py-20 lg:grid-cols-[1fr_1.3fr]">
    <SectionHeading
      description="The kit is public. The gallery is a swipe file. You host the images."
      eyebrow="FAQ"
      title={
        <>
          Questions, <span className="accent-serif">answered</span>
        </>
      }
    />
    <Accordion collapsible type="single">
      {items.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionTrigger>{item.question}</AccordionTrigger>
          <AccordionContent className="text-base text-muted-foreground">
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  </section>
)
