export declare global {
  interface Window {
    posthog: {
      capture: (eventName: string, properties?: Record<string, unknown>) => void
      identify: (
        distinctId: string,
        properties?: Record<string, unknown>
      ) => void
    }
  }
}
