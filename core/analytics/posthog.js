'use client'

import isbot from 'isbot'

function makeDummies() {
  window.posthog = {
    capture: () => undefined,
    identify: () => undefined,
    init: () => undefined,
    reset: () => undefined,
  }
  window.fbq = () => undefined
  window.twq = () => undefined
  window.gtag = () => undefined
}

// save all clicks in storage
function getClick(slug) {
  if (window.location.search.includes(slug)) {
    const [, rawParam] = window.location.search.split(`${slug}=`)
    const [param] = rawParam.split('&')
    if (param) {
      window.localStorage.setItem(slug, param)
      return param
    }
  }
  return window.localStorage.getItem(slug) || null
}

function getGclid() {
  return getClick('gclid')
}

async function installGooglePixel() {
  if (!getGclid()) {
    return
  }
  window.dataLayer = window.dataLayer || []
  function gtag(...args) {
    window.dataLayer.push(args)
  }
  window.gtag = gtag

  const script = document.createElement('script')
  script.src = 'https://www.googletagmanager.com/gtag/js?id=AW-11336198967'
  script.async = true
  document.head.appendChild(script)

  gtag('js', new Date())
  gtag('config', 'AW-11336198967')

  console.log('👾')
}

let initialized = false
export function initPosthog() {
  if (initialized) {
    return
  }
  initialized = true
  if (isbot(navigator.userAgent)) {
    return makeDummies()
  }
  if (
    window.location.host.includes('127.0.0.1') ||
    window.location.host.includes('localhost') ||
    window.location.host.includes('local.')
  ) {
    return makeDummies()
  }

  ;((t, e) => {
    let o, n, p, r
    if (e.__SV) {
      return
    }
    window.posthog = e
    e._i = []
    e.init = (i, s, a) => {
      function g(t, e) {
        const o = e.split('.')
        const target = o.length === 2 ? t[o[0]] : t
        const key = o.length === 2 ? o[1] : e
        target[key] = (...args) => {
          target.push([key].concat(args))
        }
      }
      p = t.createElement('script')
      p.type = 'text/javascript'
      p.async = !0
      p.src = `${s.api_host}/static/array.js`
      ;[r] = t.getElementsByTagName('script')
      r.parentNode.insertBefore(p, r)
      let u = e
      let name = a
      if (a === undefined) {
        name = 'posthog'
      } else {
        e[a] = []
        u = e[a]
      }
      u.people = u.people || []
      u.toString = (t) => {
        let e = 'posthog'
        if (name !== 'posthog') {
          e += `.${name}`
        }
        if (!t) {
          e += ' (stub)'
        }
        return e
      }
      u.people.toString = () => `${u.toString(1)}.people (stub)`
      o =
        'capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures getActiveMatchingSurveys getSurveys'.split(
          ' ',
        )
      for (n = 0; n < o.length; n += 1) {
        g(u, o[n])
      }
      e._i.push([i, s, name])
    }
    e.__SV = 1
  })(document, window.posthog || [])

  window.posthog.init('phc_shUEtlslpYfP6b4sucDAjcr2qLmIWgk2nYZzzsuNVrd', {
    api_host: 'https://magichog.il.ly',
    loaded: () => {
      console.log('🦔')
      installGooglePixel()
    },
    ui_host: 'https://eu.posthog.com',
  })
}

export function pageview() {
  if (window.posthog) {
    window.posthog.capture('$pageview')
  }
}
