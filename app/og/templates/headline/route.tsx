import type { NextRequest } from 'next/server'
import { MONO, renderCard, SANS, textParam } from '../../components/render'

/**
 * @name Headline template
 * @description A bold two-line headline. The second line has a marker.
 * Query: ?title= &highlight= &subtitle= &cta= &site=
 */
export function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams
  const title = textParam(params, 'title', 'Better social previews', 40)
  const highlight = textParam(params, 'highlight', 'with OG Image', 40)
  const subtitle = textParam(
    params,
    'subtitle',
    'Free Next.js templates for Open Graph cards.',
    90,
  )
  const cta = textParam(params, 'cta', 'Get the kit', 24)
  const site = textParam(params, 'site', 'ogimage.org', 40)

  return renderCard(
    <div
      style={{
        backgroundColor: '#faf7f2',
        color: '#0c0a09',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: SANS,
        height: '100%',
        justifyContent: 'space-between',
        padding: '64px 76px',
        width: '100%',
      }}
    >
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          fontFamily: MONO,
          fontSize: 24,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
        }}
      >
        <div
          style={{
            backgroundColor: '#7c3aed',
            borderRadius: 999,
            display: 'flex',
            height: 18,
            marginRight: 14,
            width: 18,
          }}
        />
        {site}
      </div>
      <div
        style={{
          alignItems: 'flex-start',
          display: 'flex',
          flexDirection: 'column',
          fontSize: 104,
          fontWeight: 700,
          letterSpacing: '-0.05em',
          lineHeight: 1.02,
        }}
      >
        <div style={{ display: 'flex' }}>{title}</div>
        <div
          style={{
            backgroundColor: '#fde047',
            borderRadius: 20,
            display: 'flex',
            marginLeft: -16,
            marginTop: 8,
            padding: '2px 16px 10px',
            transform: 'rotate(-1.2deg)',
          }}
        >
          {highlight}
        </div>
      </div>
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ color: '#57534e', display: 'flex', fontSize: 32 }}>
          {subtitle}
        </div>
        <div
          style={{
            backgroundColor: '#0c0a09',
            borderRadius: 999,
            color: '#faf7f2',
            display: 'flex',
            fontSize: 30,
            fontWeight: 700,
            padding: '18px 36px',
          }}
        >
          {cta} →
        </div>
      </div>
    </div>,
    params,
  )
}
