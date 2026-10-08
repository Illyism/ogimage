import type { NextRequest } from 'next/server'
import { MONO, renderCard, SANS, textParam } from '../../components/render'

/**
 * @name Icon template
 * @description An icon tile beside a title. Copy an SVG from lucide.dev
 * into the tile and remove its class attribute.
 * Query: ?title= &subtitle=
 */
export function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams
  const title = textParam(params, 'title', 'Dribbble shots', 36)
  const subtitle = textParam(params, 'subtitle', 'New work every week', 60)

  return renderCard(
    <div
      style={{
        alignItems: 'center',
        backgroundImage: 'linear-gradient(135deg, #ec4899, #be185d)',
        color: '#ffffff',
        display: 'flex',
        fontFamily: SANS,
        height: '100%',
        padding: '0 88px',
        width: '100%',
      }}
    >
      <div
        style={{
          alignItems: 'center',
          backgroundColor: '#ffffff',
          borderRadius: 56,
          boxShadow: '0 40px 80px -20px #500724',
          color: '#be185d',
          display: 'flex',
          height: 280,
          justifyContent: 'center',
          marginRight: 64,
          transform: 'rotate(-4deg)',
          width: 280,
        }}
      >
        <svg
          aria-hidden="true"
          fill="none"
          height="168"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width="168"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94" />
          <path d="M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32" />
          <path d="M8.56 2.75c4.37 6 6 9.42 8 17.72" />
        </svg>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            display: 'flex',
            fontSize: 84,
            fontWeight: 700,
            letterSpacing: '-0.045em',
            lineHeight: 1.05,
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: 'flex',
            fontFamily: MONO,
            fontSize: 30,
            marginTop: 20,
            opacity: 0.85,
          }}
        >
          {subtitle}
        </div>
      </div>
    </div>,
  )
}
