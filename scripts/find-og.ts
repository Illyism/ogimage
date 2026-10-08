#!/usr/bin/env bun
/**
 * Find high-quality OG images on live sites and add them to the gallery.
 *
 *   bun scripts/find-og.ts                     # YC companies, newest first
 *   bun scripts/find-og.ts --source hn         # popular Show HN launches
 *   bun scripts/find-og.ts --file sites.txt    # your list, one URL per line
 *   bun scripts/find-og.ts --limit 80 --add 15 --min-score 8 --dry-run
 *
 * Each candidate must pass two gates:
 *   1. File checks: a real og:image, about 1.91:1, at least 1000 px wide.
 *   2. Design review: Claude looks at the card and gives a score from 1 to 10.
 *
 * Needs ANTHROPIC_API_KEY. Bun loads it from .env.
 */
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import Anthropic from '@anthropic-ai/sdk'
import { zodOutputFormat } from '@anthropic-ai/sdk/helpers/zod'
import { z } from 'zod'
import {
  fetchOgCard,
  GALLERY_DIR,
  normalizeUrl,
  type OgCard,
  saveOgCard,
  slugFor,
} from './add-og'

const MODEL = 'claude-opus-5-5'
const CONCURRENCY = 4
// Rejected sites go here, so the next run does not pay to review them again.
const CACHE_PATH = join(import.meta.dir, '../.find-og-cache.json')
const MIN_WIDTH = 1000
const MIN_BYTES = 20_000
// The gallery is in git. Large files make every clone slower.
const MAX_BYTES = 1_500_000
const MIN_RATIO = 1.7
const MAX_RATIO = 2.1
// Hosts where the URL is a profile or a store page, not the product's site.
const SKIP_HOSTS =
  /(^|\.)(github\.com|github\.io|youtube\.com|youtu\.be|twitter\.com|x\.com|medium\.com|apple\.com|google\.com|notion\.site|substack\.com|linkedin\.com|producthunt\.com|ycombinator\.com|chromewebstore\.google\.com|npmjs\.com|huggingface\.co|vercel\.app|netlify\.app|herokuapp\.com)$/

function numberFlag(name: string, fallback: number) {
  const index = process.argv.indexOf(`--${name}`)
  const value = index === -1 ? Number.NaN : Number(process.argv[index + 1])
  return Number.isFinite(value) ? value : fallback
}

function stringFlag(name: string) {
  const index = process.argv.indexOf(`--${name}`)
  return index === -1 ? undefined : process.argv[index + 1]
}

const LIMIT = numberFlag('limit', 60)
const ADD = numberFlag('add', 12)
const MIN_SCORE = numberFlag('min-score', 8)
const DRY_RUN = process.argv.includes('--dry-run')
const FILE = stringFlag('file')
const SOURCE = FILE ? 'file' : (stringFlag('source') ?? 'yc')

type Cache = Record<string, { date: string; reason: string }>

function loadCache(): Cache {
  return existsSync(CACHE_PATH)
    ? JSON.parse(readFileSync(CACHE_PATH, 'utf8'))
    : {}
}

/** Categories that the gallery already uses more than twice. */
function galleryCategories() {
  const counts = new Map<string, number>()
  for (const file of readdirSync(GALLERY_DIR)) {
    if (!file.endsWith('.json')) {
      continue
    }
    const row = JSON.parse(readFileSync(join(GALLERY_DIR, file), 'utf8'))
    for (const category of row.category as string[]) {
      counts.set(category, (counts.get(category) ?? 0) + 1)
    }
  }
  return [...counts]
    .filter(([, count]) => count > 2)
    .sort((a, b) => b[1] - a[1])
    .map(([category]) => category)
}

async function ycCandidates() {
  const res = await fetch('https://yc-oss.github.io/api/companies/all.json', {
    signal: AbortSignal.timeout(30_000),
  })
  if (!res.ok) {
    throw new Error(`YC list failed (${res.status})`)
  }
  const companies = (await res.json()) as {
    launched_at: number
    status: string
    website: string
  }[]
  return companies
    .filter((company) => company.status === 'Active' && company.website)
    .sort((a, b) => b.launched_at - a.launched_at)
    .map((company) => company.website)
}

async function hnCandidates() {
  const params = new URLSearchParams({
    hitsPerPage: '300',
    numericFilters: 'points>150',
    tags: 'show_hn',
  })
  const res = await fetch(
    `https://hn.algolia.com/api/v1/search_by_date?${params}`,
    { signal: AbortSignal.timeout(30_000) },
  )
  if (!res.ok) {
    throw new Error(`Hacker News search failed (${res.status})`)
  }
  const { hits } = (await res.json()) as { hits: { url?: string }[] }
  return hits.flatMap((hit) => (hit.url ? [new URL(hit.url).origin] : []))
}

function fileCandidates(path: string) {
  return readFileSync(path, 'utf8')
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('#'))
}

async function candidates() {
  if (FILE) {
    return fileCandidates(FILE)
  }
  if (SOURCE === 'hn') {
    return hnCandidates()
  }
  if (SOURCE === 'yc') {
    return ycCandidates()
  }
  throw new Error(`Unknown source "${SOURCE}". Use yc, hn, or --file.`)
}

function fileProblem(card: OgCard) {
  // Each gallery page uses the card as its own og:image. Some platforms do
  // not read WebP, and a GIF shows only its first frame.
  if (card.size?.format !== 'png' && card.size?.format !== 'jpeg') {
    return 'not a PNG or JPEG image'
  }
  const { height, width } = card.size
  if (width < MIN_WIDTH) {
    return `too small (${width}×${height})`
  }
  const ratio = width / height
  if (ratio < MIN_RATIO || ratio > MAX_RATIO) {
    return `wrong ratio (${width}×${height})`
  }
  if (card.bytes.length < MIN_BYTES) {
    return 'file too small, probably a blank card'
  }
  if (card.bytes.length > MAX_BYTES) {
    return `file too large (${Math.round(card.bytes.length / 1024)} KB)`
  }
  return null
}

const RUBRIC = `You curate ogimage.org, a gallery of the best Open Graph images from live websites. Designers use it for inspiration.

Score the attached og:image from 1 to 10.

9-10: A card that a designer made for this purpose. Strong composition, clear brand, text that you can read in a small link preview, good contrast, and an idea that you remember.
8: Well designed, with one element that makes it different from other cards.
7: Clean, but it follows a template that you see on many sites. A logo with a tagline on a dark gradient.
4-6: Acceptable but not inspiring. A plain logo on a flat color, a raw product screenshot, or a stock photo.
1-3: Broken or low effort. Cropped text, tiny text, a blurry image, a blank card, a favicon, or a cookie banner.

Do not give more points because the company is well known. Score the card, not the brand.`

function reviewSchema(categories: string[]) {
  return z.object({
    categories: z
      .array(z.enum(categories as [string, ...string[]]))
      .describe('One to three categories that fit the company.'),
    colors: z
      .array(z.string())
      .describe('One or two dominant colors of the card as #rrggbb.'),
    description: z
      .string()
      .describe(
        'One or two plain sentences that say what the company does. No marketing words.',
      ),
    name: z.string().describe('The short brand name, without a tagline.'),
    reason: z.string().describe('One sentence that explains the score.'),
    score: z.number().describe('Integer from 1 to 10.'),
  })
}

type Review = z.infer<ReturnType<typeof reviewSchema>>

async function review(
  client: Anthropic,
  card: OgCard,
  categories: string[],
): Promise<Review | null> {
  const response = await client.messages.parse({
    max_tokens: 4000,
    messages: [
      {
        content: [
          {
            source: {
              data: card.bytes.toString('base64'),
              media_type: `image/${card.size?.format}` as 'image/png',
              type: 'base64',
            },
            type: 'image',
          },
          {
            text: `Site: ${card.slug}\nPage title: ${card.name}\nMeta description: ${card.description || '(none)'}`,
            type: 'text',
          },
        ],
        role: 'user',
      },
    ],
    model: MODEL,
    output_config: {
      effort: 'low',
      format: zodOutputFormat(reviewSchema(categories)),
    },
    system: RUBRIC,
  })
  // A refusal has no parsed output. The candidate is then skipped.
  return response.parsed_output
}

interface Result {
  line: string
  reject?: string
  /** Set when the card passed both gates. */
  save?: () => Promise<unknown>
  slug: string
}

async function check(
  client: Anthropic,
  url: string,
  categories: string[],
): Promise<Result> {
  const slug = slugFor(normalizeUrl(url))
  let card: OgCard
  try {
    card = await fetchOgCard(url)
  } catch (error) {
    const reason = error instanceof Error ? error.message : 'fetch failed'
    return { line: `  –     ${slug}: ${reason}`, reject: reason, slug }
  }

  const problem = fileProblem(card)
  if (problem) {
    return { line: `  –     ${slug}: ${problem}`, reject: problem, slug }
  }

  const verdict = await review(client, card, categories)
  if (!verdict) {
    return { line: `  –     ${slug}: no review`, reject: 'no review', slug }
  }
  if (verdict.score < MIN_SCORE) {
    return {
      line: `  ✗ ${String(verdict.score).padStart(2)}  ${slug}: ${verdict.reason}`,
      reject: `score ${verdict.score}: ${verdict.reason}`,
      slug,
    }
  }

  return {
    line: `  ✓ ${String(verdict.score).padStart(2)}  ${slug} [${verdict.categories.join(', ')}]: ${verdict.reason}`,
    save: () =>
      saveOgCard(card, {
        category: verdict.categories.slice(0, 3),
        color: verdict.colors.filter((color) => /^#[0-9a-f]{6}$/i.test(color)),
        description: verdict.description,
        name: verdict.name,
      }),
    slug,
  }
}

// A wrong key or an empty quota fails for each site. The SDK already
// retried a rate limit. Stop the run and keep the queue for the next one.
function isFatal(error: unknown) {
  return (
    error instanceof Anthropic.AuthenticationError ||
    error instanceof Anthropic.PermissionDeniedError ||
    error instanceof Anthropic.RateLimitError
  )
}

async function main() {
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('Set ANTHROPIC_API_KEY. The design review needs it.')
    process.exit(1)
  }

  const client = new Anthropic()
  const cache = loadCache()
  const categories = galleryCategories()
  const seen = new Set<string>()
  const queue = (await candidates())
    .filter((url) => {
      let slug: string
      try {
        slug = slugFor(normalizeUrl(url))
      } catch {
        return false
      }
      if (
        seen.has(slug) ||
        slug in cache ||
        SKIP_HOSTS.test(slug) ||
        existsSync(join(GALLERY_DIR, `${slug}.json`))
      ) {
        return false
      }
      seen.add(slug)
      return true
    })
    .slice(0, LIMIT)

  console.log(
    `Source: ${SOURCE}. Checking ${queue.length} sites, keeping score ${MIN_SCORE}+, up to ${ADD}.${DRY_RUN ? ' Dry run.' : ''}`,
  )

  let added = 0
  let failed: unknown = null
  async function next(url: string) {
    try {
      const result = await check(client, url, categories)
      if (result.reject) {
        console.log(result.line)
        cache[result.slug] = {
          date: new Date().toISOString().slice(0, 10),
          reason: result.reject,
        }
      } else if (added < ADD) {
        // Workers run in parallel. Count before the write, so the run
        // never adds more cards than --add.
        added += 1
        console.log(result.line)
        if (!DRY_RUN) {
          await result.save?.()
        }
      }
    } catch (error) {
      if (isFatal(error)) {
        failed = error
      } else if (error instanceof Anthropic.APIError) {
        console.log(`  –     ${url}: API error ${error.status}`)
      } else {
        console.log(`  –     ${url}: ${error}`)
      }
    }
  }
  async function worker() {
    while (queue.length > 0 && added < ADD && !failed) {
      // biome-ignore lint/performance/noAwaitInLoops: each worker takes one site at a time
      await next(queue.shift()!)
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker))

  if (!DRY_RUN) {
    await writeFile(CACHE_PATH, `${JSON.stringify(cache, null, 2)}\n`)
  }
  if (failed) {
    console.error(`Stopped: ${failed}`)
    process.exit(1)
  }
  console.log(
    DRY_RUN
      ? `${added} cards passed. Nothing was written.`
      : `Added ${added} cards. Review them with git status, then open a PR.`,
  )
}

await main()
