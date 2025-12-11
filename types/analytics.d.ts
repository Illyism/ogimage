interface Posthog {
  capture: (eventName: string, properties?: Record<string, any>) => void
  identify: (distinctId: string, properties?: Record<string, any>) => void
  alias: (alias: string, distinctId: string) => void
  reset: () => void
  get_property: (propertyName: string) => any
  people: {
    set: (properties: Record<string, any>) => void
    set_once: (properties: Record<string, any>) => void
    increment: (properties: Record<string, any>) => void
    append: (properties: Record<string, any>) => void
    union: (properties: Record<string, any>) => void
    unset: (property: string) => void
    track_charge: (amount: number, properties?: Record<string, any>) => void
    clear_charges: () => void
    delete_user: () => void
  }
  isFeatureEnabled: (featureName: string) => boolean
  onFeatureFlags: (
    callback: (featureFlags: Record<string, any>) => void,
  ) => void
}

interface Fbq {
  (command: 'track', eventName: string, parameters?: Record<string, any>): void
  (
    command: 'trackCustom',
    eventName: string,
    parameters?: Record<string, any>,
  ): void
  (
    command: 'init',
    pixelId: string,
    advancedMatching?: Record<string, any>,
    options?: Record<string, any>,
  ): void
  (command: 'set', name: string, value: any): void
  (
    command: 'setAutoConfig',
    enabled: boolean,
    options?: Record<string, any>,
  ): void
  (command: 'setCustomParameters', parameters: Record<string, any>): void
  (command: 'setUserId', userId: string): void
  (
    command: 'trackSingleCustom',
    eventName: string,
    customData?: Record<string, any>,
  ): void
  (
    command: 'trackSingleCustom',
    eventName: string,
    customData?: Record<string, any>,
    options?: Record<string, any>,
  ): void
  (
    command: 'trackSingleCustom',
    eventName: string,
    customData?: Record<string, any>,
    options?: Record<string, any>,
    callback?: () => void,
  ): void
  (
    command: 'trackSingleCustom',
    eventName: string,
    customData?: Record<string, any>,
    callback?: () => void,
  ): void
}

interface Twq {
  (command: 'event', eventName: string, parameters?: Record<string, any>): void
}

export declare global {
  interface Window {
    posthog: Posthog
    fbq: Fbq
    twq: Twq
    gtag: any
    createLemonSqueezy: () => void
    lemonSqueezyAffiliateConfig: {
      store: string
    }
  }
}
