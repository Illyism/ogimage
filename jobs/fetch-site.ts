import { client } from '@/jobs/trigger'
import { getMetaTags } from '@/lib/metatags'
import { IO, eventTrigger } from '@trigger.dev/sdk'
import { z } from 'zod'

client.defineJob({
  id: 'fetch-domain',
  name: 'Fetch Domain',
  version: '1.0.0',
  trigger: eventTrigger({
    name: 'generator.fetch-site',
    schema: z.object({
      content: z.string(),
    }),
  }),

  run: async (payload, io: IO) => {
    const { content } = payload

    const URL = content.includes('http') ? content : `https://${content}`

    // name is the title or application name or something like that
    const domainInfo = await io.runTask(
      'get-domain-info',
      () => {
        return getMetaTags(URL)
      },
      { name: 'Get Domain info', icon: 'domain', params: URL },
    )

    return domainInfo
  },
})
