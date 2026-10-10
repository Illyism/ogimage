import type { NextRequest } from 'next/server'
import {
  colorParam,
  MONO,
  readableOn,
  renderCard,
  SANS,
  textParam,
} from '../components/render'

const LAYOUTS = ['center', 'left', 'badge'] as const
type Layout = (typeof LAYOUTS)[number]

function titleSize(title: string) {
  if (title.length > 70) {
    return 60
  }
  return title.length > 40 ? 74 : 92
}

/**
 * @name Generator
 * @description Card for /generator and for the link previews of this site.
 * Text, layout, and colors come from the query string.
 */
export function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams
  const layoutParam = params.get('layout') as Layout
  const layout = LAYOUTS.includes(layoutParam) ? layoutParam : 'center'
  const title = textParam(params, 'title', 'Your title goes here', 110)
  const subtitle = params.get('subtitle')?.trim().slice(0, 160) ?? ''
  const site = params.get('site')?.trim().slice(0, 40) ?? ''
  const background = colorParam(params, 'bg', '#0a0a0a')
  const accent = colorParam(params, 'accent', '#facc15')
  const foreground = readableOn(background)
  const onAccent = readableOn(accent)
  const centered = layout !== 'left'

  return renderCard(
    <div
      style={{
        alignItems: centered ? 'center' : 'flex-start',
        backgroundColor: background,
        // A soft light in the accent color gives the flat color some depth.
        backgroundImage: `radial-gradient(circle at ${centered ? '50% 0%' : '100% 0%'}, ${accent}33, transparent 55%)`,
        borderBottom: `20px solid ${accent}`,
        color: foreground,
        display: 'flex',
        flexDirection: 'column',
        fontFamily: SANS,
        height: '100%',
        justifyContent: layout === 'left' ? 'space-between' : 'center',
        padding: '76px 84px',
        textAlign: centered ? 'center' : 'left',
        width: '100%',
      }}
    >
      <div
        style={{
          alignItems: centered ? 'center' : 'flex-start',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {layout === 'badge' && site ? (
          <div
            style={{
              backgroundColor: accent,
              borderRadius: 999,
              color: onAccent,
              display: 'flex',
              fontFamily: MONO,
              fontSize: 26,
              letterSpacing: '0.04em',
              marginBottom: 40,
              padding: '10px 28px',
            }}
          >
            {site}
          </div>
        ) : null}
        <div
          style={{
            display: 'flex',
            fontSize: titleSize(title),
            fontWeight: 700,
            letterSpacing: '-0.045em',
            lineHeight: 1.04,
          }}
        >
          {title}
        </div>
        {subtitle ? (
          <div
            style={{
              display: 'flex',
              fontSize: 34,
              letterSpacing: '-0.01em',
              lineHeight: 1.3,
              marginTop: 28,
              maxWidth: 900,
              opacity: 0.7,
            }}
          >
            {subtitle}
          </div>
        ) : null}
      </div>
      {layout !== 'badge' && site ? (
        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            fontFamily: MONO,
            fontSize: 28,
            letterSpacing: '0.02em',
            marginTop: centered ? 52 : 0,
          }}
        >
          <div
            style={{
              backgroundColor: accent,
              borderRadius: 999,
              display: 'flex',
              height: 22,
              marginRight: 16,
              width: 22,
            }}
          />
          {site}
        </div>
      ) : null}
    </div>,
    params,
  )
}
