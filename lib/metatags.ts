import { parse } from 'node-html-parser'
import { isValidUrl } from '@/lib/utils'

export const getHtml = async (url: string) => {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000) // timeout if it takes longer than 5 seconds
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'dub-bot/1.0',
      },
      next: {
        revalidate: 60, // revalidate once per minute
      },
      signal: controller.signal,
    })
    clearTimeout(timeoutId)
    return await response.text()
  } catch (error) {
    if (error.name === 'AbortError') {
      // Handle fetch request abort (e.g., due to timeout)
      console.error('Fetch request aborted due to timeout.')
    } else {
      // Handle other fetch errors
      console.error('Fetch request failed:', error)
    }
    return null
  }
}

const getHeadChildNodes = (html) => {
  const ast = parse(html) // parse the html into AST format with node-html-parser
  const metaTags = ast.querySelectorAll('meta').map(({ attributes }) => {
    const property = attributes.property || attributes.name || attributes.href
    return {
      content: attributes.content,
      property,
    }
  })
  const title = ast.querySelector('title')?.innerText
  const linkTags = ast.querySelectorAll('link').map(({ attributes }) => {
    const { rel, href } = attributes
    return {
      href,
      rel,
    }
  })

  return { linkTags, metaTags, title }
}

const getRelativeUrl = (url: string, imageUrl: string | undefined) => {
  if (!imageUrl) {
    return null
  }
  if (isValidUrl(imageUrl)) {
    return imageUrl
  }
  const { protocol, host } = new URL(url)
  const baseURL = `${protocol}//${host}`
  return new URL(imageUrl, baseURL).toString()
}

export const getMetaTags = async (url: string) => {
  const html = await getHtml(url)
  if (!html) {
    return {
      description: 'No description',
      image: null,
      title: url,
    }
  }
  const { metaTags, title: titleTag, linkTags } = getHeadChildNodes(html)

  const object: Record<string, string | undefined> = {}

  for (const { property, content } of Object.values(metaTags)) {
    if (property) {
      object[property] = content
    }
  }

  for (const { rel, href } of Object.values(linkTags)) {
    if (rel) {
      object[rel] = href
    }
  }

  const title = object['og:title'] || object['twitter:title'] || titleTag

  const description =
    object.description ||
    object['og:description'] ||
    object['twitter:description']

  const image = object['og:image'] || object['twitter:image']

  const name =
    object['og:site_name'] ||
    object['twitter:site'] ||
    object['twitter:creator']

  return {
    description: description || 'No description',
    image: getRelativeUrl(url, image),
    name,
    title: title || url,
  }
}
