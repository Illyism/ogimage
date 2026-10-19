import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { type NextRequest, NextResponse } from 'next/server'

const GALLERY_DIR = join(process.cwd(), 'content/gallery')
const gallery = readdirSync(GALLERY_DIR)
  .filter((file) => file.endsWith('.json'))
  .map(
    (file) =>
      JSON.parse(readFileSync(join(GALLERY_DIR, file), 'utf8')) as {
        category: string[]
        slug: string
      },
  )
const posts = new Set(gallery.map((item) => item.slug.replace(/^www\./, '')))
const categories = new Set(gallery.flatMap((item) => item.category))

// With Cache Components, Next renders each unknown param of a dynamic route
// and keeps about 1-3 MB for each one that it never frees. Bots that probed
// random paths grew the server to 2 GB, and the kernel killed it on
// Oct 13, 2026. `dynamicParams = false` is not allowed with Cache Components,
// so unknown slugs must get a 404 before Next matches the route.
export function proxy(request: NextRequest) {
  const [, , kind, slug = ''] = request.nextUrl.pathname.split('/')
  const known = kind === 'post' ? posts : categories
  if (known.has(slug)) {
    return NextResponse.next()
  }
  return NextResponse.rewrite(new URL('/_unknown', request.url))
}

export const config = {
  matcher: ['/inspiration/post/:slug', '/inspiration/category/:slug'],
}
