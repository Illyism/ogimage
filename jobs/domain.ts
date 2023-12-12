import { client } from '@/jobs/trigger'
import directus, { Inspiration } from '@/lib/directus'
import { getMetaTags } from '@/lib/metatags'
import { createItem, uploadFiles } from '@directus/sdk'
import { IO, eventTrigger } from '@trigger.dev/sdk'
import { z } from 'zod'

client.defineJob({
  id: 'submit-domain-inspiration',
  name: 'Submit Domain Inspiration',
  version: '1.0.0',
  trigger: eventTrigger({
    name: 'inspiration.submit.domain',
    schema: z.object({
      content: z.string(),
    }),
  }),

  run: async (payload, io: IO) => {
    io.logger.info('Received payload', payload)
    const { content } = payload

    const inspiration: Inspiration = {
      slug: '',
      date_created: new Date(),
      date_updated: new Date(),
      domain: '',
      URL: '',
      name: '',
      category: [],
      description: '',
      image: '',
      color: [],
    }

    // we received a domain or URL
    // we need to check if it's a domain or URL
    if (content.includes('http')) {
      // it's a URL
      inspiration.URL = content
      inspiration.domain = new URL(content).hostname
    } else {
      // it's a domain
      inspiration.domain = content
      inspiration.URL = `https://${content}`
    }

    // slug is the domain
    inspiration.slug = inspiration.domain

    // name is the title or application name or something like that
    const domainInfo = await io.runTask(
      'get-domain-info',
      () => {
        return getMetaTags(inspiration.URL)
      },
      { name: 'Get Domain info', icon: 'domain', params: inspiration },
    )

    inspiration.name = domainInfo.name || domainInfo.title
    inspiration.description = domainInfo.description

    // upload image to directus
    const image = await io.runTask(
      'upload-image',
      async () => {
        if (!domainInfo.image) {
          return null
        }

        const response = await fetch(domainInfo.image)
        const blob = await response.blob()

        const formData = new FormData()
        formData.append('title', `og-image-${inspiration.slug}`)
        formData.append('description', domainInfo.image)
        formData.append('folder', `04e9ab1b-85ea-4866-9877-c4568b6f80f2`)
        formData.append('file', blob)

        const result = await directus.request(uploadFiles(formData))
        return result.id
      },
      { name: 'Upload image', icon: 'image', params: domainInfo.image },
    )
    if (!image) {
      throw new Error('No image found')
    }

    inspiration.image = image

    return await io.runTask(
      'submit-inspiration',
      async () => {
        return await directus.request(createItem('inspiration', inspiration))
      },
      { name: 'Submit inspiration', icon: 'inspiration', params: inspiration },
    )
  },
})
