/**
 * bun .agents/skills/brand-assets/scripts/generate.ts pricing-sky [16:9] "PROMPT"
 */
import { Buffer } from 'node:buffer'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../../../..',
)
const SKILL = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const OUT = path.join(ROOT, 'apps/web/public/_static/brand')
const REFS = path.join(SKILL, '_references')
const PREFIX =
  'AI SEO Tracker: premium AI SEO SaaS branding, magic / stars / space. Deep black canvas, violet nebula glows, four-pointed sparkle stars, thin constellation lines. Match attached reference mood and color — do not copy page chrome, nav, photos, or readable headlines.'

async function loadEnv() {
  if (process.env.OPENROUTER_API_KEY || process.env.OPENROUTER_KEY) {
    return
  }
  const raw = await fs.readFile(path.join(ROOT, '.env'), 'utf8')
  for (const line of raw.split('\n')) {
    const t = line.trim()
    if (!t || t.startsWith('#')) {
      continue
    }
    const i = t.indexOf('=')
    if (i <= 0) {
      continue
    }
    const k = t.slice(0, i).trim()
    let v = t.slice(i + 1).trim()
    if (
      (v.startsWith('"') && v.endsWith('"')) ||
      (v.startsWith("'") && v.endsWith("'"))
    ) {
      v = v.slice(1, -1)
    }
    process.env[k] ??= v
  }
}

async function refUrls() {
  const names = (await fs.readdir(REFS)).filter((n) =>
    /\.(png|jpe?g|webp)$/i.test(n),
  )
  return Promise.all(
    names.map(async (name) => {
      const file = path.join(REFS, name)
      const ext = path.extname(name).toLowerCase()
      const type =
        ext === '.png'
          ? 'image/png'
          : ext === '.webp'
            ? 'image/webp'
            : 'image/jpeg'
      const bytes = await fs.readFile(file)
      return `data:${type};base64,${Buffer.from(bytes).toString('base64')}`
    }),
  )
}

async function generate(prompt: string, refs: string[], ratio: string) {
  const key = process.env.OPENROUTER_API_KEY || process.env.OPENROUTER_KEY
  if (!key) {
    throw new Error('OPENROUTER_API_KEY is required')
  }

  const started = Date.now()
  const res = await fetch('https://openrouter.ai/api/v1/images', {
    body: JSON.stringify({
      aspect_ratio: ratio,
      model: 'openai/gpt-image-2',
      n: 1,
      output_compression: 92,
      output_format: 'jpeg',
      prompt,
      quality: 'high',
      ...(refs.length
        ? {
            input_references: refs.map((url) => ({
              image_url: { url },
              type: 'image_url',
            })),
          }
        : {}),
    }),
    headers: {
      authorization: `Bearer ${key}`,
      'content-type': 'application/json',
      'HTTP-Referer':
        process.env.NEXT_PUBLIC_APP_URL ?? 'https://aiseotracker.com',
      'X-Title': 'AI SEO Tracker Brand Assets',
    },
    method: 'POST',
    signal: AbortSignal.timeout(180_000),
  })
  if (!res.ok) {
    throw new Error(
      `OpenRouter ${res.status}: ${await res.text().catch(() => '')}`,
    )
  }

  const json = (await res.json()) as {
    data?: Array<{ b64_json?: string }>
    usage?: { cost?: number }
  }
  const b64 = json.data?.[0]?.b64_json
  if (!b64) {
    throw new Error('OpenRouter response missing image')
  }
  const bytes = Buffer.from(b64, 'base64')
  if (bytes.byteLength < 8000) {
    throw new Error('Generated image came back empty')
  }
  return { bytes, cost: json.usage?.cost ?? null, ms: Date.now() - started }
}

try {
  const args = process.argv.slice(2)
  const slug = args[0] ?? ''
  const hasRatio = Boolean(args[1] && /^\d+:\d+$/.test(args[1]))
  const ratio = hasRatio && args[1] ? args[1] : '16:9'
  const prompt = args
    .slice(hasRatio ? 2 : 1)
    .join(' ')
    .trim()
  if (!(slug && prompt)) {
    throw new Error(
      'Usage: bun .agents/skills/brand-assets/scripts/generate.ts <slug> [16:9] "PROMPT"',
    )
  }

  await loadEnv()
  const refs = await refUrls()
  const out = path.join(OUT, `${slug}-hero.jpg`)
  process.stdout.write(`${slug} ${ratio}…\n`)
  const result = await generate(`${PREFIX} ${prompt}`, refs, ratio)
  await fs.mkdir(OUT, { recursive: true })
  await fs.writeFile(out, result.bytes)
  const cost = result.cost == null ? 'N/A' : `$${result.cost.toFixed(4)}`
  process.stdout.write(
    `✅ ${out}\n   /_static/brand/${slug}-hero.jpg — ${result.bytes.byteLength} bytes — ${result.ms}ms ${cost}\n`,
  )
} catch (err) {
  process.stderr.write(
    `❌ ${err instanceof Error ? err.message : String(err)}\n`,
  )
  process.exit(1)
}
