interface CookieOptions {
  expires?: string
  path?: string
  domain?: string
  secure?: boolean
}

interface Cookie {
  get: (key: string) => string | undefined
  set: (key: string, value: string, opts?: CookieOptions) => string
}

function initCookie(doc: { cookie: string } | undefined): Cookie {
  if (!doc)
    doc = {
      cookie: '',
    }
  if (typeof doc === 'string') doc = { cookie: doc }
  if (doc.cookie === undefined) doc.cookie = ''

  const self: Cookie = {} as Cookie
  self.get = function (key) {
    if (!doc) return undefined
    const splat = doc.cookie.split(/;\s*/)
    for (let i = 0; i < splat.length; i++) {
      const ps = splat[i].split('=')
      const k = unescape(ps[0])
      if (k === key) return unescape(ps[1])
    }
    return undefined
  }

  self.set = function (key, value, opts) {
    if (!doc) return ''
    if (!opts) opts = {}
    let s = escape(key) + '=' + escape(value)
    if (opts.expires) s += '; expires=' + opts.expires
    if (opts.path) s += '; path=' + escape(opts.path)
    if (opts.domain) s += '; domain=' + escape(opts.domain)
    if (opts.secure) s += '; secure'
    doc.cookie = s
    return s
  }
  return self
}

export const cookieCutter = initCookie(
  typeof document !== 'undefined' ? document : undefined,
)
