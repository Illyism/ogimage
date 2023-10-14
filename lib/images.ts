export async function getBlurDataURL(url: string) {
  if (!url) {
    return 'data:image/webp;base64,AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA='
  }
  try {
    const _url = url.startsWith('/') ? `https://swissobserver.com${url}` : url
    const response = await fetch(
      `https://wsrv.nl/?url=${_url}&w=50&h=50&blur=5`,
    )
    const buffer = await response.arrayBuffer()
    const base64 = Buffer.from(buffer).toString('base64')

    return `data:image/png;base64,${base64}`
  } catch (error) {
    return 'data:image/webp;base64,AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA='
  }
}
