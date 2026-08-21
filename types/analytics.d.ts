interface Posthog {
  alias: (alias: string, distinctId: string) => void
  capture: (eventName: string, properties?: Record<string, any>) => void
  get_property: (propertyName: string) => any
  identify: (distinctId: string, properties?: Record<string, any>) => void
  isFeatureEnabled: (featureName: string) => boolean
  onFeatureFlags: (
    callback: (featureFlags: Record<string, any>) => void,
  ) => void
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
  reset: () => void
}

interface Fbq {
  (command: 'set', name: string, value: any): void
  (
    command: 'setAutoConfig',
    enabled: boolean,
    options?: Record<string, any>,
  ): void
  (command: 'setCustomParameters', parameters: Record<string, any>): void
  (command: 'setUserId', userId: string): void
  (
    command: 'trackSingleCustom' | 'trackCustom' | 'track',
    eventName: string,
    customData?: Record<string, any>,
  ): void
  (
    command: 'trackSingleCustom' | 'init',
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

type Twq = (
  command: 'event',
  eventName: string,
  parameters?: Record<string, any>,
) => void

export declare global {
  interface Window {
    fbq: Fbq
    gtag: any
    posthog: Posthog
    twq: Twq
  }
}
