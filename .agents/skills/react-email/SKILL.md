---
name: react-email
description: Use when building HTML email templates with React components in GenPPT, editing existing emails (export-ready, welcome, cancellation, account deletion, abandoned checkout), running email dev preview (bun email:dev), or converting templates to HTML with @react-email/render. Covers GenPPT email shell, brand theme, UTM tagging, and React Email component standards.
license: MIT
metadata:
  author: GenPPT
  version: "2.3.0"
  homepage: https://react.email
---

# React Email in GenPPT

Build and send HTML emails using React components for GenPPT. Our email design system is built on top of `@react-email/components` and mirrors our warm, high-energy Auth Login page (`#FAF6ED` warm sky canvas, white floating card, signature `#FACC15` yellow buttons, bold 800-weight typography).

## CLI Commands in GenPPT

| Command | Description |
|---------|-------------|
| `bun email:dev` | Start the local email preview server at `http://localhost:3001` (`lib/emails`) |
| `bun email:export` | Export email templates to static HTML files |
| `NODE_OPTIONS='--max-old-space-size=8192' bunx eslint lib/emails/...` | Lint email template files |

## GenPPT Email Architecture & Shell

All production email templates live in `lib/emails/` and must use our shared email shell and design tokens from `@/lib/emails/barebones-template`:

```tsx
import { buildUpgradeModalHref } from '@/lib/billing/upgrade-modal-url'
import { deckExportFormatLabel, type DeckExportFormat } from '@/lib/deck/export/deck-export-format'
import {
  barebonesTextStyle,
  BarebonesButton,
  BarebonesCard,
  BarebonesEmail,
  BarebonesHeading,
  emailTheme,
} from '@/lib/emails/barebones-template'
import { appUrl, emailLink } from '@/lib/emails/utm'
import { Img, Section, Text } from '@react-email/components'

interface MyEmailProps {
  title?: string
  downloadUrl?: string
}

export const MyEmail = ({
  title = 'My Presentation',
  downloadUrl = '#',
}: MyEmailProps) => {
  const preview = `Your presentation ${title} is ready`

  return (
    <BarebonesEmail preview={preview} rightLabel="Presentation" campaign="my_email">
      <BarebonesHeading size="lg">Your presentation is ready</BarebonesHeading>
      
      <Text style={barebonesTextStyle}>
        <strong style={{ color: emailTheme.fg }}>{title}</strong> is prepared and ready to view.
      </Text>

      <Section style={{ marginBottom: '28px', textAlign: 'center' }}>
        <BarebonesButton href={emailLink(downloadUrl, 'my_email', 'cta_download')} variant="primary" fullWidth>
          Open Presentation
        </BarebonesButton>
      </Section>
    </BarebonesEmail>
  )
}

// ALWAYS include PreviewProps for bun email:dev preview server
MyEmail.PreviewProps = {
  title: 'Quarterly Growth Strategy',
  downloadUrl: 'https://genppt.com/deck/123',
} satisfies MyEmailProps

// ALWAYS include export default for react-email CLI template discovery
export default MyEmail
```

## GenPPT Brand Theme Tokens (`emailTheme`)

The shared theme tokens in `@/lib/emails/barebones-template` align emails with GenPPT brand UI:

```typescript
export const emailTheme = {
  canvas: '#FAF6ED',           // Warm cream sky background (matches Auth layout)
  cardBg: '#FFFFFF',           // Pure floating white card
  cardBorder: '#EAE5D9',       // Soft warm border
  cardShadow: '0 4px 24px rgba(161, 98, 7, 0.08)',
  fg: '#111827',               // Heading text (dark charcoal/black)
  fgMuted: '#4B5563',          // Paragraph / body copy
  fgSubtle: '#6B7280',         // Captions / muted text
  yellowPrimary: '#FACC15',    // Signature GenPPT vibrant yellow
  yellowPrimaryText: '#111827',// Text color on primary yellow buttons
  yellowLightBg: '#FEF3C7',    // Callout / upgrade banner background
  yellowLightBorder: '#FDE68A',// Callout border
  stroke: '#E5E7EB',           // Card inner dividers & borders
}
```

## Essential Rules & Guidelines

### 1. Template Exports & Preview Discovery
- **Named + Default Export:** Every template MUST export both named (`export const MyEmail`) and default (`export default MyEmail`). Without `export default`, the `bun email:dev` CLI fails to list the template.
- **PreviewProps:** MUST define `MyEmail.PreviewProps = { ... } satisfies MyEmailProps` at the bottom of the file.
- **String Previews Only:** The `preview` prop passed to `<BarebonesEmail preview={...}>` MUST be a plain string (never a JSX fragment or element).

### 2. UTM Tracking & Assets
- **Internal Links:** Always wrap internal links with `emailLink(path, campaign, content)` from `@/lib/emails/utm`:
  ```tsx
  href={emailLink('/app/new', 'welcome_first_slide', 'cta_start_deck')}
  ```
- **Asset URLs:** Use `appAssetUrl(path)` or `${appUrl}/...` from `@/lib/emails/utm` for images so URLs are absolute:
  ```tsx
  <Img src={appAssetUrl('/images/logo/genppt-square.svg')} width="28" height="28" alt="GenPPT" />
  ```
- **Image Formats:** Use PNG, JPEG, or WEBP/JPG with reliable CDN fallback. Decorative images must have explicit `alt=""`.

### 3. Component Usage
- **Shell (`BarebonesEmail`):** Renders the card shell plus the global footer (affiliate link + unsubscribe/settings). Pass `campaign` for UTM tagging — do not add a second footer inside `{children}`.
- **Buttons (`BarebonesButton`):**
  - `variant="primary"`: Vibrant GenPPT Yellow (`#FACC15`) button with `#111827` bold text. Use for main CTA.
  - `variant="secondary"`: White outline button (`#FFFFFF` with `#E5E7EB` border). Use for secondary actions.
  - `variant="brand"`: Dark or accent variant.
  - `fullWidth`: Renders a full-width block button.
- **Cards (`BarebonesCard`):** Use for embedded callouts or sub-sections inside the email body (`#FAFAF8` light card, `16px` border-radius).
- **Headings (`BarebonesHeading`):** Renders font-weight 800 headings with `-0.03em` letter-spacing.

## Existing Email Template Inventory

| Template Path | Component Name | Campaign / Context |
|---------------|----------------|-------------------|
| `lib/emails/export-ready.tsx` | `ExportReadyEmail` | Deck export ready (PDF, PPTX, images) & deck ready notification |
| `lib/emails/abandoned-checkout.tsx` | `AbandonedCheckoutEmail` | Abandoned Stripe checkout recovery email |
| `lib/emails/lifecycle/welcome-first-slide.tsx` | `WelcomeFirstSlideEmail` | Onboarding email #1 (first slide creation CTA) |
| `lib/emails/lifecycle/welcome-working-on.tsx` | `WelcomeWorkingOnEmail` | Onboarding email #2 (feedback & use case question) |
| `lib/emails/lifecycle/cancellation-quick-question.tsx` | `CancellationQuickQuestionEmail` | Offboarding email #1 (quick exit feedback) |
| `lib/emails/lifecycle/cancellation-alternatives.tsx` | `CancellationAlternativesEmail` | Offboarding email #2 (competitor/tool recommendations) |
| `lib/emails/account-deleted.tsx` | `AccountDeletedEmail` | GDPR account deletion confirmation |
| `lib/emails/deletion-request-acknowledged.tsx` | `DeletionRequestAcknowledgedEmail` | Account deletion request receipt |

## Rendering & Sending

### Render HTML in Workflows or Senders
```tsx
import { render } from '@react-email/render'
import { ExportReadyEmail } from '@/lib/emails/export-ready'

const html = await render(
  <ExportReadyEmail
    title="Growth Strategy"
    format="pdf"
    downloadUrl="https://genppt.com/download/123"
    watermarked={true}
  />
)
```

### Send via Resend
Send emails using `@/lib/resend/send-email`:
```tsx
import { sendEmail } from '@/lib/resend/send-email'

await sendEmail({
  to: userEmail,
  subject: `Your PDF export: ${title}`,
  html,
  idempotencyKey: `deck-export-${exportId}`,
})
```

## Additional References

- Component Reference: [references/COMPONENTS.md](references/COMPONENTS.md)
- Styling Guide: [references/STYLING.md](references/STYLING.md)
- Sending Guide: [references/SENDING.md](references/SENDING.md)
- Common Patterns: [references/PATTERNS.md](references/PATTERNS.md)
