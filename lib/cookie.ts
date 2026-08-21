interface CookieOptions {
  domain?: string
  expires?: string
  path?: string
  secure?: boolean
}

interface Cookie {
  get: (key: string) => string | undefined
  set: (key: string, value: string, opts?: CookieOptions) => string
}

function initCookie(initialDoc: { cookie: string } | undefined): Cookie {
  const doc =
    typeof initialDoc === 'string'
      ? { cookie: initialDoc }
      : (initialDoc ?? { cookie: '' })

  const self: Cookie = {} as Cookie
  self.get = (key) => {
    const splat = doc.cookie.split(/;\s*/)
    for (const part of splat) {
      const ps = part.split('=')
      const k = unescape(ps[0])
      if (k === key) {
        return unescape(ps[1])
      }
    }
  }

  self.set = (key, value, opts) => {
    const options = opts ?? {}
    let s = `${escape(key)}=${escape(value)}`
    if (options.expires) {
      s += `; expires=${options.expires}`
    }
    if (options.path) {
      s += `; path=${escape(options.path)}`
    }
    if (options.domain) {
      s += `; domain=${escape(options.domain)}`
    }
    if (options.secure) {
      s += '; secure'
    }
    doc.cookie = s
    return s
  }
  return self
}

export const cookieCutter = initCookie(
  typeof document === 'undefined' ? undefined : document,
)
