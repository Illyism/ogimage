import { BlockList, isIP } from 'node:net'

// Cloudflare IP ranges: https://www.cloudflare.com/ips-v4 and https://www.cloudflare.com/ips-v6
const CLOUDFLARE_IPV4_CIDRS = [
  '173.245.48.0/20',
  '103.21.244.0/22',
  '103.22.200.0/22',
  '103.31.4.0/22',
  '141.101.64.0/18',
  '108.162.192.0/18',
  '190.93.240.0/20',
  '188.114.96.0/20',
  '197.234.240.0/22',
  '198.41.128.0/17',
  '162.158.0.0/15',
  '104.16.0.0/13',
  '104.24.0.0/14',
  '172.64.0.0/13',
  '131.0.72.0/22',
] as const

const CLOUDFLARE_IPV6_CIDRS = [
  '2400:cb00::/32',
  '2606:4700::/32',
  '2803:f800::/32',
  '2405:b500::/32',
  '2405:8100::/32',
  '2a06:98c0::/29',
  '2c0f:f248::/32',
] as const

const cloudflareV4 = new BlockList()
for (const cidr of CLOUDFLARE_IPV4_CIDRS) {
  const [network, prefix] = cidr.split('/')
  cloudflareV4.addSubnet(network!, Number(prefix), 'ipv4')
}

const cloudflareV6 = new BlockList()
for (const cidr of CLOUDFLARE_IPV6_CIDRS) {
  const [network, prefix] = cidr.split('/')
  cloudflareV6.addSubnet(network!, Number(prefix), 'ipv6')
}

function isCloudflarePeer(rawIp: string) {
  const ip = rawIp.replace(/^::ffff:(?=\d+\.\d+\.\d+\.\d+$)/i, '')
  const family = isIP(ip)
  if (family === 4) {
    return cloudflareV4.check(ip, 'ipv4')
  }
  if (family === 6) {
    return cloudflareV6.check(ip, 'ipv6')
  }
  return false
}

function toRateLimitKey(rawIp: string) {
  const ip = rawIp.replace(/^::ffff:(?=\d+\.\d+\.\d+\.\d+$)/i, '')
  if (isIP(ip) !== 6) {
    return ip
  }
  const hexAddr = ip
    .split('%')[0]!
    .replace(
      /:(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/,
      (_, a, b, c, d) =>
        `:${(Number(a) * 256 + Number(b)).toString(16)}:${(Number(c) * 256 + Number(d)).toString(16)}`,
    )
  const [head = '', tail = ''] = hexAddr.split('::')
  const headGroups = head ? head.split(':') : []
  const tailGroups = tail ? tail.split(':') : []
  const groups = hexAddr.includes('::')
    ? [
        ...headGroups,
        ...Array.from(
          { length: 8 - headGroups.length - tailGroups.length },
          () => '0',
        ),
        ...tailGroups,
      ]
    : headGroups
  const prefix = groups
    .slice(0, 4)
    .map((group) => Number.parseInt(group || '0', 16).toString(16))
    .join(':')
  return `${prefix}::/64`
}

export function getClientIp(headers: Pick<Headers, 'get'>): string {
  const forwarded = headers.get('x-forwarded-for')
  const peer =
    headers.get('x-real-ip')?.trim() ||
    forwarded?.split(',').at(-1)?.trim() ||
    ''
  if (!peer) {
    return 'unknown'
  }
  if (isCloudflarePeer(peer)) {
    const cfIp = headers.get('cf-connecting-ip')?.trim()
    if (cfIp) {
      return toRateLimitKey(cfIp)
    }
  }
  return toRateLimitKey(peer)
}
