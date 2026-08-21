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
        answer="You get lifetime access to the source code of OG Image Generator. You can host it on your own server, we have examples for Vercel, Firebase, Docker, and more. If there is something you need, we are here to help."
        question="What do I get exactly?"
      />
      <FAQCard
        answer="The templates are pre-designed open graph images that you can use as a starting point. You can customize the text, colors, and images to match your brand. We have a variety of templates to choose from."
        question="What are the templates?"
      />
      <FAQCard
        answer="The essential plan includes lifetime access to the source code, unlimited images, and our 3 top templates. Which are all you need to get started. You can always upgrade later and only pay the difference with a special coupon code."
        question="What is the essential plan?"
      />
      <FAQCard
        answer="OG Image Generator is built with TypeScript. It supports Next.js and Sveltekit. It generates images using Sartori, a server-side rendering library. You can use JavaScript, SVG, Tailwind or HTML to customize the templates."
        question="JavaScript or HTML?"
      />
      <FAQCard
        answer="After you've got access to the repo, the code is yours forever, so it can't be refunded. But we are here to help you with any questions or issues you might have. We are committed to making sure you are happy with your purchase."
        question="What is the refund policy?"
      />
      <FAQCard
        answer="Yes, you need a server to host the code. But it can be as cheap as $0/month. The documentation includes examples for free hosting providers like Vercel, Firebase, and GitHub Pages. You can also use Docker, AWS, or any other serverless provider."
        question="Are there any other costs?"
      />
      <FAQCard
        answer="We are here to help. You can reach out to us on Twitter or email. We also have a community of developers and designers who are using OG Image Generator and are happy to help you."
        question="What if I need help?"
      />
      <FAQCard
        answer="We understand that not everyone can afford it. We are committed to making OG Image Generator accessible to everyone. If you need help, reach out to us and we will do our best to help you."
        question="I can't afford it"
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
