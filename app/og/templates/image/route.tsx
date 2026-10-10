/* eslint-disable @next/next/no-img-element */
import type { NextRequest } from 'next/server'
import {
  MONO,
  publicImage,
  renderCard,
  SANS,
  SERIF,
  textParam,
} from '../../components/render'

// The picture is a file in public/. A picture URL from the query string
// would let any visitor make this server fetch any address.
const avatar = publicImage('me/ilias.png')

/**
 * @name Image template
 * @description A profile card: picture, name, role, and handle.
 * Query: ?name= &role= &handle=
 */
export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams
  const name = textParam(params, 'name', 'Ilias Ism', 32)
  const role = textParam(
    params,
    'role',
    'I build small tools for people who ship websites.',
    80,
  )
  const handle = textParam(params, 'handle', '@illyism · il.ly', 40)

  return renderCard(
    <div
      style={{
        alignItems: 'center',
        backgroundColor: '#0c0a09',
        backgroundImage:
          'radial-gradient(circle at 0% 100%, #f59e0b44, transparent 50%)',
        color: '#fafaf9',
        display: 'flex',
        fontFamily: SANS,
        height: '100%',
        padding: '0 88px',
        width: '100%',
      }}
    >
      <img
        alt=""
        height={240}
        src={await avatar}
        style={{
          border: '8px solid #fbbf24',
          borderRadius: 999,
          marginRight: 64,
        }}
        width={240}
      />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            display: 'flex',
            fontFamily: SERIF,
            fontSize: 108,
            fontStyle: 'italic',
            letterSpacing: '-0.02em',
            lineHeight: 1,
          }}
        >
          {name}
        </div>
        <div
          style={{
            color: '#d6d3d1',
            display: 'flex',
            fontSize: 34,
            lineHeight: 1.3,
            marginTop: 24,
            maxWidth: 640,
          }}
        >
          {role}
        </div>
        <div
          style={{
            color: '#fbbf24',
            display: 'flex',
            fontFamily: MONO,
            fontSize: 28,
            marginTop: 28,
          }}
        >
          {handle}
        </div>
      </div>
    </div>,
    params,
  )
}
