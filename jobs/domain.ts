import { client } from '@/jobs/trigger'
import directus, { Inspiration } from '@/lib/directus'
import { getMetaTags } from '@/lib/metatags'
import { createItem, updateItem, uploadFiles } from '@directus/sdk'
import { IO, eventTrigger } from '@trigger.dev/sdk'
import sharp from 'sharp'
import { z } from 'zod'

import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

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
    const { image, color } = await io.runTask(
      'upload-image',
      async () => {
        if (!domainInfo.image) {
          return {
            image: '',
            color: '',
          }
        }

        const response = await fetch(domainInfo.image)
        const originalBlob = await response.blob()

        // let's resize to max 1200 x 630
        const blob = await formatImage(originalBlob)

        const color = await getPalette(blob)

        const formData = new FormData()
        formData.append('title', `og-image-${inspiration.slug}`)
        formData.append('description', domainInfo.image)
        formData.append('folder', `04e9ab1b-85ea-4866-9877-c4568b6f80f2`)
        formData.append('file', blob)

        const result = await directus.request(uploadFiles(formData))
        return {
          image: result.id,
          color: color,
        }
      },
      { name: 'Upload image', icon: 'image', params: domainInfo.image },
    )
    if (!image) {
      throw new Error('No image found')
    }

    inspiration.image = image
    inspiration.color = [color]

    // improve name, description and category with AI
    const { name, description, categories } = await io.runTask(
      `improve-name-description-category`,
      async () => {
        const result = await anthropic.completions.create({
          model: 'claude-2.1',
          max_tokens_to_sample: 512,
          temperature: 0.5,
          prompt: `
${Anthropic.HUMAN_PROMPT}
Domain: ${inspiration.domain}
URL: ${inspiration.URL}
Name: ${inspiration.name}
Title: ${domainInfo.title}
Description: ${inspiration.description}

List of categories:
- saas
- ecommerce
- blog
- news
- portfolio
- agency
- landing
- marketplace
- social
- forum
- wiki
- education
- entertainment
- health
- finance
- travel
- food
- ... (add more categories)

Your task is to improve the name, description and get the category of this domain.

Name: Short version of the business name, Title case
Description: Description of the business (rephrased from the existing description), start with "NAME is a ..."
Category: A list of categories that best describe the domain / business as lowercase, slugified

Return the name, description and category in the following format:
<name>REPLACE THIS WITH THE NAME</name>
<description>REPLACE THIS WITH THE DESCRIPTION</description>
<category>REPLACE THIS WITH THE CATEGORY</category>
<category>REPLACE THIS WITH THE CATEGORY</category>
<category>REPLACE THIS WITH THE CATEGORY</category>

${Anthropic.AI_PROMPT}`.trim(),
        })

        // Here is a shortened title for that article in 60 characters or less:\n13 Best Free SEO Chrome Extensions to Boost Productivity in 2023
        const text = result.completion
        io.logger.info(text)

        const regexName = /<name>(.*)<\/name>/gm
        const regexDescription = /<description>(.*)<\/description>/gm
        const regexCategory = /<category>(.*)<\/category>/gm

        const name = regexName.exec(text)?.[1]
        const description = regexDescription.exec(text)?.[1]
        const categories = text
          .match(regexCategory)
          ?.map((c) => c.replace(/<category>|<\/category>/g, ''))

        return {
          name,
          description,
          categories,
        }
      },
      { name: 'Improve result', icon: 'seo', params: inspiration },
    )

    inspiration.name = name || inspiration.name
    inspiration.description = description || inspiration.description
    inspiration.category = categories || inspiration.category

    return await io.runTask(
      'submit-inspiration',
      async () => {
        try {
          return await directus.request(createItem('inspiration', inspiration))
        } catch (error) {
          io.logger.info('Updating inspiration')
          return await directus.request(
            updateItem('inspiration', inspiration.slug, inspiration),
          )
        }
      },
      { name: 'Submit inspiration', icon: 'inspiration', params: inspiration },
    )
  },
})

async function getPalette(blob: Blob) {
  const { dominant } = await sharp(await blob.arrayBuffer()).stats()
  const { r, g, b } = dominant
  // return hex
  return rgbToHex(r, g, b)
}

function rgbToHex(r: number, g: number, b: number) {
  return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`
}

function componentToHex(c: number) {
  const hex = c.toString(16)
  return hex.length === 1 ? '0' + hex : hex
}

async function formatImage(blob: Blob) {
  const buffer = await sharp(await blob.arrayBuffer())
    .resize(1200, 630, {
      fit: 'contain',
      withoutEnlargement: true,
    })
    .jpeg({
      quality: 90,
    })
    .toBuffer()

  return new Blob([buffer], { type: 'image/jpeg' })
}
