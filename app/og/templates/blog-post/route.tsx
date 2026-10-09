import type { NextRequest } from 'next/server'
import {
  MONO,
  renderCard,
  SANS,
  SERIF,
  textParam,
} from '../../components/render'

function titleSize(title: string) {
  if (title.length > 70) {
    return 56
  }
  return title.length > 44 ? 66 : 78
}

/**
 * @name Blog post template
 * @description Title, excerpt, and author for an article.
 * Query: ?title= &excerpt= &author= &tag= &site=
 */
export function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams
  const title = textParam(
    params,
    'title',
    'How to design Open Graph images that get the click',
    100,
  )
  const excerpt = textParam(
    params,
    'excerpt',
    'A short guide to size, type, and templates for social previews.',
    140,
  )
  const author = textParam(params, 'author', 'Ilias Ism', 40)
  const tag = textParam(params, 'tag', 'Guide', 24)
  const site = textParam(params, 'site', 'ogimage.org', 40)

  return renderCard(
    <div
      style={{
        backgroundColor: '#0b090c',
        backgroundImage:
          'radial-gradient(circle at 100% 0%, #a855f755, transparent 50%)',
        color: '#fafafa',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: SANS,
        height: '100%',
        justifyContent: 'space-between',
        padding: '68px 76px',
        width: '100%',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            color: '#e879f9',
            display: 'flex',
            fontFamily: MONO,
            fontSize: 24,
            letterSpacing: '0.08em',
            marginBottom: 28,
            textTransform: 'uppercase',
          }}
        >
          {tag}
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: titleSize(title),
            fontWeight: 700,
            letterSpacing: '-0.045em',
            lineHeight: 1.05,
          }}
        >
          {title}
        </div>
        <div
          style={{
            color: '#a1a1aa',
            display: 'flex',
            fontSize: 32,
            lineHeight: 1.35,
            marginTop: 28,
            maxWidth: 920,
          }}
        >
          {excerpt}
        </div>
      </div>
      <div
        style={{
          alignItems: 'center',
          borderTop: '1px solid #ffffff22',
          display: 'flex',
          justifyContent: 'space-between',
          paddingTop: 32,
        }}
      >
        <div style={{ alignItems: 'center', display: 'flex' }}>
          <div
            style={{
              alignItems: 'center',
              backgroundColor: '#e879f9',
              borderRadius: 999,
              color: '#0b090c',
              display: 'flex',
              fontFamily: SERIF,
              fontSize: 38,
              fontStyle: 'italic',
              height: 60,
              justifyContent: 'center',
              marginRight: 20,
              width: 60,
            }}
          >
            {author.slice(0, 1).toUpperCase()}
          </div>
          <div style={{ display: 'flex', fontSize: 32, fontWeight: 700 }}>
            {author}
          </div>
        </div>
        <div
          style={{
            color: '#a1a1aa',
            display: 'flex',
            fontFamily: MONO,
            fontSize: 26,
          }}
        >
          {site}
        </div>
      </div>
    </div>,
    params,
  )
}
