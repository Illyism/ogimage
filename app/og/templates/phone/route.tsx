/* eslint-disable @next/next/no-img-element */
import type { NextRequest } from 'next/server'
import {
  MONO,
  publicImage,
  renderCard,
  SANS,
  textParam,
} from '../../components/render'
import { getScreenshotURL } from '../../components/screenshot'

const PHONE_WIDTH = 330
const PHONE_HEIGHT = 680

const sample = publicImage('_static/examples/site-mobile.jpg')

/**
 * @name Phone template
 * @description A live capture of your mobile site in a phone, beside a
 * headline. Good for apps and mobile-first products.
 * Query: ?title= &subtitle= &cta= &site=
 */
export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams
  const title = textParam(params, 'title', 'Your site, in your pocket', 48)
  const subtitle = textParam(
    params,
    'subtitle',
    'A live capture of the mobile page, in a card.',
    90,
  )
  const cta = textParam(params, 'cta', 'Open the app', 24)
  const site = textParam(params, 'site', 'ogimage.org', 40)
  const screenshot =
    getScreenshotURL({
      height: PHONE_HEIGHT * 2,
      url: 'https://ogimage.org/',
      width: 390,
    }) ?? (await sample)

  return renderCard(
    <div
      style={{
        backgroundColor: '#eef2ff',
        backgroundImage:
          'radial-gradient(circle at 100% 100%, #a5b4fc, transparent 55%)',
        color: '#1e1b4b',
        display: 'flex',
        fontFamily: SANS,
        height: '100%',
        justifyContent: 'space-between',
        paddingLeft: 80,
        paddingRight: 110,
        width: '100%',
      }}
    >
      <div
        style={{
          alignItems: 'flex-start',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          maxWidth: 600,
        }}
      >
        <div
          style={{
            display: 'flex',
            fontFamily: MONO,
            fontSize: 24,
            letterSpacing: '0.06em',
            marginBottom: 28,
            opacity: 0.7,
            textTransform: 'uppercase',
          }}
        >
          {site}
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 84,
            fontWeight: 700,
            letterSpacing: '-0.05em',
            lineHeight: 1.02,
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 32,
            lineHeight: 1.35,
            marginTop: 24,
            opacity: 0.75,
          }}
        >
          {subtitle}
        </div>
        <div
          style={{
            backgroundColor: '#4338ca',
            borderRadius: 999,
            color: '#ffffff',
            display: 'flex',
            fontSize: 30,
            fontWeight: 700,
            marginTop: 40,
            padding: '18px 40px',
          }}
        >
          {cta}
        </div>
      </div>
      <div
        style={{
          backgroundColor: '#0b090c',
          border: '14px solid #0b090c',
          borderRadius: 60,
          boxShadow: '0 50px 100px -20px #312e81',
          display: 'flex',
          height: PHONE_HEIGHT,
          marginTop: 56,
          overflow: 'hidden',
          transform: 'rotate(4deg)',
          width: PHONE_WIDTH,
        }}
      >
        <img
          alt=""
          height={PHONE_HEIGHT - 28}
          src={screenshot}
          style={{
            borderRadius: 46,
            objectFit: 'cover',
            objectPosition: 'top',
          }}
          width={PHONE_WIDTH - 28}
        />
      </div>
    </div>,
  )
}
