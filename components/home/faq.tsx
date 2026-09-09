import { MessageCircleQuestion } from 'lucide-react'
import { Card } from '@/components/ui/card'
export const Faq = () => (
  <div className="container pt-16 pb-24 sm:text-center">
    <h2 className="text-balance font-bold text-3xl tracking-tight md:text-4xl">
      Frequently asked questions
    </h2>
    <div className="mx-auto mt-12 max-w-3xl space-y-6">
      <FAQCard
        answer="OG Image Generator is an open-source tool that automatically generates open graph images for your website, blog, or social media posts. It is customizable, open source, and requires no design skills."
        question="What is OG Image Generator?"
      />
      <FAQCard
        answer="The Next.js + Satori templates, the gallery, and this site. Clone github.com/Illyism/ogimage. Host it on Vercel, Docker, or any Node host."
        question="What do I get exactly?"
      />
      <FAQCard
        answer="The templates are pre-designed open graph images that you can use as a starting point. You can customize the text, colors, and images to match your brand. We have a variety of templates to choose from."
        question="What are the templates?"
      />
      <FAQCard
        answer="Clone github.com/Illyism/ogimage. Leave your email if you want the Notion guide."
        question="How do I get the code?"
      />
      <FAQCard
        answer="Yes. The kit and gallery are MIT. Clone the public repo. Leave your email if you want the guide."
        question="Is it free?"
      />
      <FAQCard
        answer="OG Image Generator is built with TypeScript. It supports Next.js and Sveltekit. It generates images using Satori, a server-side rendering library. You can use JavaScript, SVG, Tailwind or HTML to customize the templates."
        question="JavaScript or HTML?"
      />
      <FAQCard
        answer="Yes, you need a server to host the code. But it can be as cheap as $0/month. The documentation includes examples for free hosting providers like Vercel, Firebase, and GitHub Pages. You can also use Docker, AWS, or any other serverless provider."
        question="Are there any other costs?"
      />
      <FAQCard
        answer="We are here to help. You can reach out to us on Twitter or email. We also have a community of developers and designers who are using OG Image Generator and are happy to help you."
        question="What if I need help?"
      />
    </div>
  </div>
)

const FAQCard = ({
  question,
  answer,
}: {
  question: string
  answer: string
}) => (
  <Card className="p-5 text-left">
    <h3 className="mb-2 flex items-center justify-between gap-2 font-semibold text-lg">
      {question}
      <MessageCircleQuestion className="text-primary" size={16} />
    </h3>
    <p className="text-muted-foreground">{answer}</p>
  </Card>
)
