import type { NextRequest } from 'next/server'
import { renderCard, SANS, textParam } from '../../components/render'

/**
 * @name Button template
 * @description An emoji, a headline, and one large call to action.
 * Query: ?emoji= &title= &cta=
 */
export function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams
  const emoji = textParam(params, 'emoji', '🤯', 8)
  const title = textParam(params, 'title', 'OG Image Generator', 44)
  const cta = textParam(params, 'cta', 'Create beautiful OG images', 36)

  return renderCard(
    <div
      style={{
        alignItems: 'center',
        backgroundColor: '#1d4ed8',
        backgroundImage:
          'radial-gradient(circle at 50% 0%, #60a5fa, transparent 60%)',
        color: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: SANS,
        height: '100%',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      <div style={{ display: 'flex', fontSize: 150, marginBottom: 4 }}>
        {emoji}
      </div>
      <div
        style={{
          display: 'flex',
          fontSize: 76,
          fontWeight: 700,
          letterSpacing: '-0.04em',
          marginBottom: 44,
        }}
      >
        {title}
      </div>
      <div
        style={{
          backgroundColor: '#fde047',
          borderRadius: 999,
          boxShadow: '0 12px 0 #a16207, 0 40px 60px -10px #0b1b55',
          color: '#0c0a09',
          display: 'flex',
          fontSize: 48,
          fontWeight: 700,
          letterSpacing: '-0.02em',
          padding: '22px 56px',
        }}
      >
        {cta}
      </div>
    </div>,
  )
}
