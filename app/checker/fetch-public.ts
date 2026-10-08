import { lookup } from 'node:dns/promises'
import { isIP } from 'node:net'

const USER_AGENT =
  'Mozilla/5.0 (compatible; ogimage.org checker; +https://ogimage.org/checker)'
const MAX_REDIRECTS = 5
const TIMEOUT_MS = 8000

export class FetchError extends Error {}

function isPrivateV4(ip: string) {
  const [a = 0, b = 0, c = 0] = ip.split('.').map(Number)
  return (
    a === 0 ||
    a === 10 ||
    a === 127 ||
    a >= 224 ||
    (a === 100 && b >= 64 && b <= 127) ||
    (a === 169 && b === 254) ||
    (a === 172 && b >= 16 && b <= 31) ||
    (a === 192 && b === 0 && c === 0) ||
    (a === 192 && b === 168) ||
    (a === 198 && (b === 18 || b === 19))
  )
}

function isPrivateAddress(ip: string) {
  if (isIP(ip) === 4) {
    return isPrivateV4(ip)
  }
  const lower = ip.toLowerCase()
  const mapped = lower.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/)
  if (mapped) {
    return isPrivateV4(mapped[1]!)
  }
  return (
    lower === '::' ||
    lower === '::1' ||
    lower.startsWith('::ffff:') ||
    lower.startsWith('64:ff9b:') ||
    /^f[cd]/.test(lower) ||
    /^fe[89ab]/.test(lower)
  )
}

// This server fetches any URL that a visitor enters. Without this check a
// visitor could read services on the private network of the host (SSRF).
async function assertPublic(url: URL) {
  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    throw new FetchError('Enter an http or https URL.')
  }
  if (url.port && url.port !== '80' && url.port !== '443') {
    throw new FetchError('Only standard web ports are supported.')
  }
  const host = url.hostname.replace(/^\[|\]$/g, '')
  const addresses = isIP(host)
    ? [{ address: host }]
    : await lookup(host, { all: true }).catch(() => {
        throw new FetchError(`Could not find ${host}.`)
      })
  if (
    addresses.length === 0 ||
    addresses.some((entry) => isPrivateAddress(entry.address))
  ) {
    throw new FetchError('That address is not on the public internet.')
  }
}

/**
 * Fetches a public URL and returns at most `maxBytes` of the body.
 * Redirects are followed by hand so that each hop gets the same check.
 */
export async function fetchPublic(
  rawUrl: string,
  options: { accept: string; maxBytes: number },
) {
  let url = new URL(rawUrl)
  const signal = AbortSignal.timeout(TIMEOUT_MS)

  for (let hop = 0; hop <= MAX_REDIRECTS; hop += 1) {
    // biome-ignore lint/performance/noAwaitInLoops: each hop depends on the redirect before it
    await assertPublic(url)
    let res: Response
    try {
      res = await fetch(url, {
        headers: { Accept: options.accept, 'User-Agent': USER_AGENT },
        redirect: 'manual',
        signal,
      })
    } catch (cause) {
      throw new FetchError(`Could not reach ${url.hostname}.`, { cause })
    }

    const location = res.headers.get('location')
    if (res.status >= 300 && res.status < 400 && location) {
      await res.body?.cancel()
      url = new URL(location, url)
      continue
    }

    const bytes = await readCapped(res, options.maxBytes)
    return { bytes, res, url: url.toString() }
  }

  throw new FetchError('Too many redirects.')
}

async function readCapped(res: Response, maxBytes: number) {
  const reader = res.body?.getReader()
  if (!reader) {
    return new Uint8Array()
  }
  const chunks: Uint8Array[] = []
  let total = 0
  try {
    while (total < maxBytes) {
      // biome-ignore lint/performance/noAwaitInLoops: a stream is read in order
      const { done, value } = await reader.read()
      if (done) {
        break
      }
      chunks.push(value)
      total += value.length
    }
  } catch (cause) {
    throw new FetchError('The site stopped responding.', { cause })
  } finally {
    await reader.cancel().catch(() => undefined)
  }
  const bytes = new Uint8Array(Math.min(total, maxBytes))
  let offset = 0
  for (const chunk of chunks) {
    const slice = chunk.subarray(0, bytes.length - offset)
    bytes.set(slice, offset)
    offset += slice.length
  }
  return bytes
}
