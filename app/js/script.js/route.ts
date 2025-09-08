export const runtime = 'edge'

export async function GET() {
  const upstream = 'https://datafa.st/js/script.js'
  const res = await fetch(upstream, {
    // Cache for an hour at the edge; tweak as needed
    next: { revalidate: 3600 },
  })

  const body = await res.text()
  return new Response(body, {
    status: res.status,
    headers: {
      'content-type': 'application/javascript; charset=utf-8',
      // Allow CDN/browser caching; adjust to your needs
      'cache-control': 'public, max-age=3600',
    },
  })
}

