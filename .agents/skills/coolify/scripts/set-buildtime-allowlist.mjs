#!/usr/bin/env bun
/**
 * Flip Coolify is_buildtime flags to a small allowlist (runtime-only for the rest).
 * Always re-sends `value` on PATCH (Coolify bug: omitting value wipes the secret).
 *
 * Usage:
 *   bun .agents/skills/coolify/scripts/set-buildtime-allowlist.mjs aiseotracker --dry-run
 *   bun .agents/skills/coolify/scripts/set-buildtime-allowlist.mjs aiseotracker --apply
 *
 * Never prints env values.
 */
import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'

const ROOT = path.resolve(import.meta.dir, '../../../..')
const RESOURCES_PATH = path.join(import.meta.dir, '..', 'resources.json')

function loadDotEnv() {
  const envPath = path.join(ROOT, '.env')
  if (!existsSync(envPath)) {
    return {}
  }
  const out = {}
  for (const line of readFileSync(envPath, 'utf8').split('\n')) {
    if (!line || line.startsWith('#') || !line.includes('=')) {
      continue
    }
    const i = line.indexOf('=')
    const key = line.slice(0, i).trim()
    let val = line.slice(i + 1).trim()
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1)
    }
    out[key] = val
  }
  return out
}

const dotenv = loadDotEnv()
const TOKEN =
  process.env.COOLIFY_TOKEN ??
  process.env.COOLIFY_READ ??
  dotenv.COOLIFY_TOKEN ??
  dotenv.COOLIFY_READ
const BASE_URL = (
  process.env.COOLIFY_URL ??
  dotenv.COOLIFY_URL ??
  'https://cooler.il.ly'
).replace(/\/$/, '')
const API = `${BASE_URL}/api/v1`

if (!TOKEN) {
  console.error('Missing COOLIFY_TOKEN or COOLIFY_READ')
  process.exit(1)
}

const resources = JSON.parse(readFileSync(RESOURCES_PATH, 'utf8'))

function resolveApp(id) {
  if (!id) {
    return null
  }
  if (/^[a-z0-9]{20,}$/i.test(id)) {
    return id
  }
  return resources.applications?.[id.toLowerCase()]?.uuid ?? null
}

/** Keys that must be present during `next build` (import-time throws + Next inlining). */
const BUILD_EXACT = new Set([
  'DATABASE_URL',
  'NEXT_SERVER_ACTIONS_ENCRYPTION_KEY',
  'BETTER_AUTH_SECRET',
  'BETTER_AUTH_URL',
  'TOKEN_ENCRYPTION_KEY',
  'RESEND_API_KEY',
  'SENTRY_AUTH_TOKEN',
])

function wantsBuildtime(key) {
  if (key.startsWith('NEXT_PUBLIC_')) {
    return true
  }
  if (key.startsWith('COOLIFY_')) {
    return true
  }
  return BUILD_EXACT.has(key)
}

async function api(method, apiPath, body) {
  const res = await fetch(`${API}${apiPath}`, {
    body: body ? JSON.stringify(body) : undefined,
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${TOKEN}`,
      ...(body ? { 'Content-Type': 'application/json' } : {}),
    },
    method,
  })
  const text = await res.text()
  let data
  try {
    data = text ? JSON.parse(text) : null
  } catch {
    data = text
  }
  if (!res.ok) {
    throw new Error(
      `${method} ${apiPath} → ${res.status}: ${typeof data === 'string' ? data : JSON.stringify(data)}`,
    )
  }
  return data
}

const args = process.argv.slice(2)
const apply = args.includes('--apply')
const dryRun = args.includes('--dry-run') || !apply
const alias = args.find((a) => !a.startsWith('--')) ?? 'aiseotracker'
const uuid = resolveApp(alias)
if (!uuid) {
  console.error(
    'Usage: set-buildtime-allowlist.mjs [alias|uuid] [--dry-run|--apply]',
  )
  process.exit(1)
}

const envs = await api('GET', `/applications/${uuid}/envs`)
if (!Array.isArray(envs)) {
  console.error('Unexpected envs response')
  process.exit(1)
}

const plan = []
const skippedNoValue = []
for (const e of envs) {
  const to = wantsBuildtime(e.key)
  const from = Boolean(e.is_buildtime)
  if (from === to) {
    continue
  }
  const value = e.value ?? e.real_value
  if (value == null || value === '') {
    skippedNoValue.push({ is_buildtime: `${from} → ${to}`, key: e.key })
    continue
  }
  plan.push({
    from,
    is_literal: Boolean(e.is_literal),
    is_multiline: Boolean(e.is_multiline),
    is_preview: Boolean(e.is_preview),
    is_runtime: e.is_runtime !== false,
    key: e.key,
    to,
    value,
  })
}

const keep = envs
  .filter((e) => wantsBuildtime(e.key))
  .map((e) => e.key)
  .sort()
const uiFlipRuntime = envs
  .filter((e) => e.is_buildtime && !wantsBuildtime(e.key))
  .map((e) => e.key)
  .sort()

console.log(
  JSON.stringify(
    {
      api_blocked_no_value: skippedNoValue.length,
      api_flips_ready: plan.map((p) => ({
        is_buildtime: `${p.from} → ${p.to}`,
        key: p.key,
      })),
      app: alias,
      keep_buildtime: keep,
      mode: dryRun ? 'dry-run' : 'apply',
      note: 'Coolify GET /envs omits values; PATCH without value wipes secrets (coolify#9977). Prefer UI.',
      total_envs: envs.length,
      ui_uncheck_buildtime: uiFlipRuntime,
    },
    null,
    2,
  ),
)

if (dryRun) {
  console.error(
    '\nUI: Environment → uncheck “Available at Buildtime” for ui_uncheck_buildtime keys.',
  )
  console.error(
    'API --apply only works if GET returns values (currently it does not).',
  )
  process.exit(0)
}

if (plan.length === 0 && skippedNoValue.length > 0) {
  console.error(
    `\nRefusing --apply: ${skippedNoValue.length} keys need flips but GET returned no values.`,
  )
  console.error('Use Coolify UI checkboxes instead.')
  process.exit(1)
}

let ok = 0
for (const p of plan) {
  await api('PATCH', `/applications/${uuid}/envs`, {
    is_buildtime: p.to,
    is_literal: p.is_literal,
    is_multiline: p.is_multiline,
    is_preview: p.is_preview,
    is_runtime: p.is_runtime,
    key: p.key,
    value: p.value,
  })
  ok += 1
  console.error(`updated ${p.key}: is_buildtime ${p.from} → ${p.to}`)
}
console.error(`\nDone: ${ok}/${plan.length} updated`)
