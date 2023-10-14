'use client'

import isbot from 'isbot'

function makeDummies() {
  window.posthog = {
    capture: () => void 0,
    identify: () => void 0,
    init: () => void 0,
    reset: () => void 0,
  }
  window.fbq = () => void 0
  window.twq = () => void 0
  window.gtag = () => void 0
}

// save all clicks in storage
function getClick(slug) {
  if (window.location.search.includes(slug)) {
    const param = window.location.search.split(slug + '=')[1].split('&')[0]
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
  function gtag() {
    dataLayer.push(arguments)
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
  if (initialized) return
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

  !(function (t, e) {
    var o, n, p, r
    e.__SV ||
      ((window.posthog = e),
      (e._i = []),
      (e.init = function (i, s, a) {
        function g(t, e) {
          var o = e.split('.')
          2 == o.length && ((t = t[o[0]]), (e = o[1])),
            (t[e] = function () {
              t.push([e].concat(Array.prototype.slice.call(arguments, 0)))
            })
        }
        ;((p = t.createElement('script')).type = 'text/javascript'),
          (p.async = !0),
          (p.src = s.api_host + '/static/array.js'),
          (r = t.getElementsByTagName('script')[0]).parentNode.insertBefore(
            p,
            r,
          )
        var u = e
        for (
          void 0 !== a ? (u = e[a] = []) : (a = 'posthog'),
            u.people = u.people || [],
            u.toString = function (t) {
              var e = 'posthog'
              return 'posthog' !== a && (e += '.' + a), t || (e += ' (stub)'), e
            },
            u.people.toString = function () {
              return u.toString(1) + '.people (stub)'
            },
            o =
              'capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures getActiveMatchingSurveys getSurveys'.split(
                ' ',
              ),
            n = 0;
          n < o.length;
          n++
        )
          g(u, o[n])
        e._i.push([i, s, a])
      }),
      (e.__SV = 1))
  })(document, window.posthog || [])

  window.posthog.init('phc_gNjlHknGKZYPutxMnnRKuADhIkE2Qx72U5a3uCVj4wv', {
    api_host: 'https://magichog.il.ly',
    ui_host: 'https://eu.posthog.com',
    loaded: () => {
      console.log('🦔')
      installGooglePixel()
    },
  })
}

export function pageview() {
  if (window.posthog) {
    window.posthog.capture('$pageview')
  }
}
