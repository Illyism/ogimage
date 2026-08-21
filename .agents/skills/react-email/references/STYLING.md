# Styling Guide

Comprehensive styling reference for React Email templates.

## GenPPT Email Theme & Components (`lib/emails/barebones-template.tsx`)

In GenPPT, all production emails use the shared shell and design tokens in `@/lib/emails/barebones-template`:

```tsx
import {
  BarebonesEmail,
  BarebonesCard,
  BarebonesHeading,
  BarebonesButton,
  emailTheme,
  barebonesTextStyle,
} from '@/lib/emails/barebones-template'
```

### Theme Tokens (`emailTheme`)
- **Canvas Background (`#FAF6ED`)**: Soft, warm golden-cream background matching our Auth Login page (`AuthPageShell`).
- **Floating Card (`#FFFFFF`)**: Pure white card with `borderRadius: '24px'`, `border: '1px solid #EAE5D9'`, and soft warm shadow `0 4px 24px rgba(161, 98, 7, 0.08)`.
- **Primary Yellow Button (`#FACC15`)**: GenPPT signature vibrant golden-yellow with `#111827` bold dark text (`fontWeight: 700`) and shadow `0 2px 8px rgba(250,204,21,0.35)`.
- **Yellow Light Banner (`#FEF3C7`)**: Warm callout/upgrade banner with `#FDE68A` border and `#92400E` badge text.
- **Headings (`#111827`)**: Bold 800-weight headings with `-0.03em` letter-spacing.
- **Body Text (`#4B5563`)**: Readable 15px charcoal body text with `1.6` line-height.

---

## General Email Client Limitations

Email clients have significant CSS restrictions. Follow these rules:

### Unsupported Features

- **SVG/WEBP images** - Use PNG or JPEG for email body content (or hosted CDN images with PNG fallbacks)
- **Flexbox/Grid** - Use `Row`/`Column` components or tables
- **Media queries** - `sm:`, `md:`, `lg:`, `xl:` prefixes have limited support
- **Theme selectors** - `dark:`, `light:` prefixes don't work in email clients
- **rem units** - Use pixel-based sizes (`px`) for reliable client rendering

### Border Handling

Always specify border style and reset other sides when needed:

```tsx
// Correct - specify border style
<div style={{ border: '1px solid #E5E7EB' }} />

// Correct - single side border
<div style={{ borderBottom: '1px solid #E5E7EB' }} />
```

## Layout & Hierarchy

### Body & Canvas
- Main container: max-width around 580–600px
- Margin auto for centering across desktop/mobile email clients

### Typography
- Headings: `fontSize: '28px'`, `fontWeight: 800`, `color: '#111827'`, `letterSpacing: '-0.03em'`
- Paragraphs: `fontSize: '15px'`, `lineHeight: '1.6'`, `color: '#4B5563'`
- Captions/footers: `fontSize: '12-13px'`, `color: '#6B7280'`

### Images
- Always use absolute URLs (`appAssetUrl('/images/logo/genppt-square.svg')` or `${appUrl}/...`)
- Provide explicit `width` and `height` style or attributes
- Set descriptive `alt` text on content images; `alt=""` on decorative images

### Buttons
- Main action: `BarebonesButton` with `variant="primary"` (Signature yellow `#FACC15`)
- Secondary action: `BarebonesButton` with `variant="secondary"` (White outline button)
- Always include `boxSizing: 'border-box'`
