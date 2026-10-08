import type { NextRequest } from 'next/server'
import { MONO, renderCard, textParam } from '../../components/render'

/**
 * @name Emoji template
 * @description One large emoji on a dark card. The least effort that works.
 * Query: ?emoji= &label=
 */
export function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams
  const emoji = textParam(params, 'emoji', '🔥', 8)
  const label = params.get('label')?.trim().slice(0, 40) ?? ''

  return renderCard(
    <div
      style={{
        alignItems: 'center',
        backgroundColor: '#0a0a0a',
        backgroundImage:
          'radial-gradient(circle at 50% 50%, #f9731655, transparent 45%)',
        border: '20px solid #1c1917',
        color: '#fafaf9',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      <div style={{ display: 'flex', fontSize: 300 }}>{emoji}</div>
      {label ? (
        <div
          style={{
            display: 'flex',
            fontFamily: MONO,
            fontSize: 30,
            letterSpacing: '0.08em',
            marginTop: 12,
            opacity: 0.7,
            textTransform: 'uppercase',
          }}
        >
          {label}
        </div>
      ) : null}
    </div>,
  )
}
