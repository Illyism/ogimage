import Anthropic from '@anthropic-ai/sdk'
import sharp from 'sharp'
import type { Inspiration } from '@/lib/directus'
import { uploadFile } from '@/lib/file-storage'
import { getMetaTags } from '@/lib/metatags'
import { prisma } from '@/lib/prisma'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

async function getPalette(blob: Blob) {
  const { dominant } = await sharp(await blob.arrayBuffer()).stats()
  const { r, g, b } = dominant
  return rgbToHex(r, g, b)
}

function rgbToHex(r: number, g: number, b: number) {
  return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`
}

function componentToHex(c: number) {
  const hex = c.toString(16)
  return hex.length === 1 ? `0${hex}` : hex
}

async function formatImage(blob: Blob) {
  const buffer = await sharp(await blob.arrayBuffer())
    .resize(1200, 630, {
      fit: 'inside',
      withoutEnlargement: true,
    })
    .jpeg({
      quality: 90,
    })
    .toBuffer()

  return new Blob([new Uint8Array(buffer)], { type: 'image/jpeg' })
}

export async function POST(request: Request) {
  try {
    const { content } = await request.json()

    if (!content) {
      return Response.json({ error: 'Content is required' }, { status: 400 })
    }

    const inspiration: Inspiration = {
      category: [],
      color: [],
      date_created: new Date(),
      date_updated: new Date(),
      description: '',
      domain: '',
      image: '',
      name: '',
      slug: '',
      URL: '',
    }

    // we received a domain or URL
    if (content.includes('http')) {
      inspiration.URL = content
      inspiration.domain = new URL(content).hostname.replace('www.', '')
    } else {
      inspiration.domain = content.replace('www.', '')
      inspiration.URL = `https://${content}`
    }

    inspiration.slug = inspiration.domain

    // Get domain info
    const domainInfo = await getMetaTags(inspiration.URL)
    inspiration.name = domainInfo.name || domainInfo.title
    inspiration.description = domainInfo.description

    // Upload image
    if (!domainInfo.image) {
      return Response.json({ error: 'No image found' }, { status: 400 })
    }

    const response = await fetch(domainInfo.image)
    const originalBlob = await response.blob()
    const blob = await formatImage(originalBlob)
    const color = await getPalette(blob)

    const filename = `og-image-${inspiration.slug}-${Date.now()}.jpg`
    const filePath = await uploadFile(blob, filename)

    inspiration.image = filePath
    inspiration.color = [color]

    // Improve name, description and category with AI
    const result = await anthropic.completions.create({
      max_tokens_to_sample: 512,
      model: 'claude-2.1',
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
      temperature: 0.5,
    })

    const text = result.completion
    const regexName = /<name>(.*)<\/name>/gm
    const regexDescription = /<description>(.*)<\/description>/gm
    const regexCategory = /<category>(.*)<\/category>/gm

    const name = regexName.exec(text)?.[1]
    const description = regexDescription.exec(text)?.[1]
    const categories = text
      .match(regexCategory)
      ?.map((c) => c.replace(/<category>|<\/category>/g, ''))

    inspiration.name = name || inspiration.name
    inspiration.description = description || inspiration.description
    inspiration.category = categories || inspiration.category

    // Save to database
    try {
      const result = await prisma.inspiration.create({
        data: inspiration,
      })
      return Response.json({ data: result, success: true })
    } catch {
      // Update if exists
      const result = await prisma.inspiration.update({
        data: inspiration,
        where: { slug: inspiration.slug },
      })
      return Response.json({ data: result, success: true })
    }
  } catch (error: any) {
    console.error('Error submitting inspiration:', error)
    return Response.json(
      { error: error.message || 'Failed to submit inspiration' },
      { status: 500 },
    )
  }
}
