import { SmilePlus, Sparkles, Wrench } from 'lucide-react'
import { Card } from '@/components/ui/card'
export const ProblemSolution = () => (
  <div className="container py-16 sm:text-center">
    <h2 className="text-balance font-bold text-3xl tracking-tight md:text-4xl">
      Why OG Image Kit?
    </h2>
    <p className="mx-auto mt-4 max-w-2xl text-balance text-lg text-muted-foreground">
      It takes so much <b>time</b> to create open graph images manually. Our OG
      Image generator saves you up to <b>99%</b> of the <b>time and cost</b>.
    </p>
    <div className="mx-auto mt-4 grid max-w-4xl grid-cols-1 gap-4 text-left text-sm sm:mt-12 sm:grid-cols-3">
      <Card className="p-5">
        <h3 className="mb-2 flex items-center justify-between gap-2 font-semibold text-lg">
          Automated
          <Sparkles className="text-primary" size={16} />
        </h3>
        <p className="text-muted-foreground">
          Published a <b>new blog post</b>? We generate the open graph image for
          you.
        </p>
      </Card>
      <Card className="p-5">
        <h3 className="mb-2 flex items-center justify-between gap-2 font-semibold text-lg">
          Customizable
          <Wrench className="text-primary" size={16} />
        </h3>
        <p className="text-muted-foreground">
          You get the <b>source code</b> and can customize the templates to
          match your brand.
        </p>
      </Card>
      <Card className="p-5">
        <h3 className="mb-2 flex items-center justify-between gap-2 font-semibold text-lg">
          Beautiful templates
          <SmilePlus className="text-primary" size={16} />
        </h3>
        <p className="text-muted-foreground">
          Get more <b>engagement</b> with our pre-designed templates.
        </p>
      </Card>
    </div>
  </div>
)
