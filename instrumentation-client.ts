const key = process.env.NEXT_PUBLIC_POSTHOG_KEY
const host = process.env.NEXT_PUBLIC_POSTHOG_HOST

function startRecording(
  posthog: { startSessionRecording: () => void },
  signal: AbortSignal,
) {
  const start = () => {
    if (!signal.aborted) {
      posthog.startSessionRecording()
    }
  }
  const onIdle = () => {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(start, { timeout: 8000 })
    } else {
      setTimeout(start, 4000)
    }
  }

  window.addEventListener('pointerdown', onIdle, { once: true, signal })
  window.addEventListener('scroll', onIdle, {
    once: true,
    passive: true,
    signal,
  })
  setTimeout(onIdle, 10_000)
}

function initPosthog() {
  if (!(key && host)) {
    return
  }

  import('posthog-js')
    .then(({ default: posthog }) => {
      posthog.init(key, {
        api_host: host,
        defaults: '2025-11-30',
        // The recorder is ~97 KiB. Load it after first input so LCP/TBT stay clear.
        disable_session_recording: true,
        loaded: (client) => {
          window.posthog = {
            capture: client.capture.bind(client),
            identify: client.identify.bind(client),
          }
          startRecording(client, new AbortController().signal)
        },
      })
    })
    .catch(() => undefined)
}

if (key && host) {
  const boot = () => {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(initPosthog, { timeout: 3500 })
    } else {
      setTimeout(initPosthog, 2000)
    }
  }

  if (document.readyState === 'complete') {
    boot()
  } else {
    window.addEventListener('load', boot, { once: true })
  }
}
