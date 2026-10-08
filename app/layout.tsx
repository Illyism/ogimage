import { generatePageMeta } from '@/core/seo'
import { StructuredData } from '@/core/structured'
import '@/app/globals.css'
import type { Viewport } from 'next'
import { Geist, Geist_Mono, Instrument_Serif } from 'next/font/google'
import Script from 'next/script'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' })
const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})
const instrumentSerif = Instrument_Serif({
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-instrument-serif',
  weight: '400',
})

export const metadata = generatePageMeta()

// Forks and previews run on other hosts. The host check stops them from
// writing page views into the ogimage.org Plausible site.
// The queue stub lets pages call window.plausible() before the script loads.
// Do not give the <Script> the id "plausible": an element id becomes a
// property of window and hides the function.
const PLAUSIBLE_LOADER = `
window.plausible = window.plausible || function () { (window.plausible.q = window.plausible.q || []).push(arguments) };
if (/^(www\\.)?ogimage\\.org$/.test(location.hostname)) {
  var s = document.createElement('script');
  s.defer = true;
  s.setAttribute('data-domain', 'ogimage.org');
  s.setAttribute('data-api', 'https://p.il.ly/api/event');
  s.src = 'https://p.il.ly/js/script.outbound-links.js';
  document.head.appendChild(s);
}
`

export const viewport: Viewport = {
  themeColor: [
    { color: '#ffffff', media: '(prefers-color-scheme: light)' },
    { color: '#18181b', media: '(prefers-color-scheme: dark)' },
  ],
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      className={`${geist.variable} ${geistMono.variable} ${instrumentSerif.variable}`}
      lang="en"
      suppressHydrationWarning
    >
      <body className="dark h-full font-sans antialiased">
        <StructuredData />
        {children}
        <Script id="analytics-loader" strategy="afterInteractive">
          {PLAUSIBLE_LOADER}
        </Script>
      </body>
    </html>
  )
}
