import { lookup } from 'node:dns/promises'
import { BlockList, isIP } from 'node:net'

const USER_AGENT =
  'Mozilla/5.0 (compatible; ogimage.org checker; +https://ogimage.org/checker)'
const MAX_REDIRECTS = 5
const TIMEOUT_MS = 8000

export class FetchError extends Error {}

const BLOCKED_V4 = new BlockList()
BLOCKED_V4.addSubnet('0.0.0.0', 8, 'ipv4')
BLOCKED_V4.addSubnet('10.0.0.0', 8, 'ipv4')
BLOCKED_V4.addSubnet('100.64.0.0', 10, 'ipv4')
BLOCKED_V4.addSubnet('127.0.0.0', 8, 'ipv4')
BLOCKED_V4.addSubnet('169.254.0.0', 16, 'ipv4')
BLOCKED_V4.addSubnet('172.16.0.0', 12, 'ipv4')
BLOCKED_V4.addSubnet('192.0.0.0', 24, 'ipv4')
BLOCKED_V4.addSubnet('192.0.2.0', 24, 'ipv4')
BLOCKED_V4.addSubnet('192.88.99.0', 24, 'ipv4')
BLOCKED_V4.addSubnet('192.168.0.0', 16, 'ipv4')
BLOCKED_V4.addSubnet('198.18.0.0', 15, 'ipv4')
BLOCKED_V4.addSubnet('198.51.100.0', 24, 'ipv4')
BLOCKED_V4.addSubnet('203.0.113.0', 24, 'ipv4')
BLOCKED_V4.addSubnet('224.0.0.0', 4, 'ipv4')
BLOCKED_V4.addSubnet('240.0.0.0', 4, 'ipv4')

const BLOCKED_V6 = new BlockList()
BLOCKED_V6.addSubnet('::', 96, 'ipv6')
BLOCKED_V6.addSubnet('::ffff:0:0', 96, 'ipv6')
BLOCKED_V6.addSubnet('::ffff:0:0:0', 96, 'ipv6')
BLOCKED_V6.addSubnet('64:ff9b::', 96, 'ipv6')
BLOCKED_V6.addSubnet('64:ff9b:1::', 48, 'ipv6')
BLOCKED_V6.addSubnet('100::', 64, 'ipv6')
BLOCKED_V6.addSubnet('2001::', 23, 'ipv6')
BLOCKED_V6.addSubnet('2001:db8::', 32, 'ipv6')
BLOCKED_V6.addSubnet('2002::', 16, 'ipv6')
BLOCKED_V6.addSubnet('3fff::', 20, 'ipv6')
BLOCKED_V6.addSubnet('fc00::', 7, 'ipv6')
BLOCKED_V6.addSubnet('fe80::', 10, 'ipv6')
BLOCKED_V6.addSubnet('fec0::', 10, 'ipv6')
BLOCKED_V6.addSubnet('ff00::', 8, 'ipv6')

export function isPrivateAddress(ip: string) {
  const family = isIP(ip)
  if (family === 4) {
    return BLOCKED_V4.check(ip, 'ipv4')
  }
  if (family === 6) {
    return BLOCKED_V6.check(ip, 'ipv6')
  }
  return true
}

// This server fetches any URL that a visitor enters. Without this check a
// visitor could read services on the private network of the host (SSRF).
export async function assertPublic(url: URL) {
  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    throw new FetchError('Enter an http or https URL.')
  }
  if (url.username || url.password) {
    throw new FetchError('Credentials in URLs are not supported.')
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
  return (addresses.find((entry) => isIP(entry.address) === 4) ?? addresses[0]!)
    .address
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
    const address = await assertPublic(url)
    const target = new URL(url)
    // Pin HTTP requests to the validated IP to prevent DNS rebinding TOCTOU.
    if (url.protocol === 'http:') {
      target.hostname = isIP(address) === 6 ? `[${address}]` : address
    }
    let res: Response
    try {
      res = await fetch(target, {
        headers: {
          Accept: options.accept,
          Host: url.host,
          'User-Agent': USER_AGENT,
        },
        redirect: 'manual',
        signal,
      })
      if (url.protocol === 'https:') {
        await assertPublic(url)
      }
    } catch (cause) {
      if (cause instanceof FetchError) {
        throw cause
      }
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
