#!/usr/bin/env bun
/**
 * Swiss Observer Docker preflight — static checks + optional builder simulation.
 *
 * Usage:
 *   bun .agents/skills/docker-doctor/scripts/doctor.mjs
 *   bun .agents/skills/docker-doctor/scripts/doctor.mjs --simulate-builder
 */
import { spawnSync } from 'node:child_process'
import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'

const ROOT = path.resolve(import.meta.dir, '../../../..')
const simulateBuilder = process.argv.includes('--simulate-builder')

const errors = []
const warnings = []

function fail(message) {
  errors.push(message)
}

function warn(message) {
  warnings.push(message)
}

function ok(message) {
  console.log(`✅ ${message}`)
}

function read(rel) {
  return readFileSync(path.join(ROOT, rel), 'utf8')
}

function run(cmd, args, env = {}) {
  return spawnSync(cmd, args, {
    cwd: ROOT,
    encoding: 'utf8',
    env: { ...process.env, ...env },
    stdio: 'inherit',
  })
}

// --- Dockerfile static analysis ---
if (existsSync(path.join(ROOT, 'Dockerfile'))) {
  const dockerfile = read('Dockerfile')
  const dockerfileLines = dockerfile.split('\n')
  const firstFromIndex = dockerfileLines.findIndex((line) =>
    /^FROM /i.test(line),
  )

  if (firstFromIndex === -1) {
    fail('Dockerfile has no FROM instruction')
  } else {
    ok(`First FROM at line ${firstFromIndex + 1}`)
  }

  const globalArgNames = new Set()
  for (let i = 0; i < firstFromIndex; i++) {
    const match = dockerfileLines[i].match(/^ARG\s+([A-Za-z0-9_]+)/)
    if (match) {
      globalArgNames.add(match[1])
    }
  }

  const fromWithArgs = [...dockerfile.matchAll(/^FROM\s+([^\s]+)/gm)]
  for (const [, imageRef] of fromWithArgs) {
    if (!imageRef.includes('${')) {
      continue
    }
    const vars = [...imageRef.matchAll(/\$\{([A-Za-z0-9_]+)\}/g)].map(
      (m) => m[1],
    )
    for (const name of vars) {
      if (globalArgNames.has(name)) {
        ok(`FROM ${imageRef} — ARG ${name} in global scope`)
      } else {
        fail(
          `FROM uses \${${name}} but ARG ${name} is not declared before the first FROM (causes empty image name on Coolify)`,
        )
      }
    }
  }

  // Builder stage checks
  const builderStage = dockerfileLines.some((line) =>
    /^FROM\b.+\bAS\s+builder\b/i.test(line),
  )
  if (builderStage) {
    ok('Dockerfile has builder stage')
  } else {
    warn('Dockerfile has no explicit `AS builder` stage')
  }

  // Prisma generate check.
  // This repo generates the client in `bun run build` (`prisma generate && next build`).
  const pkgForDocker = JSON.parse(read('package.json'))
  const buildRunsPrisma = Boolean(
    pkgForDocker.scripts?.build?.includes('prisma generate'),
  )
  if (
    dockerfile.includes('prisma generate') ||
    dockerfile.includes('db:generate') ||
    (dockerfile.includes('bun run build') && buildRunsPrisma)
  ) {
    ok('Dockerfile generates Prisma client in builder')
  } else {
    fail('Dockerfile builder does not run prisma generate / db:generate')
  }

  // Next build check
  if (
    dockerfile.includes('bun run build') ||
    dockerfile.includes('next build') ||
    dockerfile.includes('turbo run build')
  ) {
    ok('Dockerfile runs build step in builder')
  } else {
    fail('Dockerfile builder does not run build step')
  }

  // Standalone copy checks
  if (dockerfile.includes('.next/standalone')) {
    ok('Dockerfile runner copies .next/standalone')
  } else {
    fail('Dockerfile runner does not copy .next/standalone output')
  }

  if (dockerfile.includes('.next/static')) {
    ok('Dockerfile runner copies .next/static')
  } else {
    fail('Dockerfile runner does not copy .next/static')
  }

  // Runner configuration
  if (
    dockerfile.includes('HOSTNAME="0.0.0.0"') ||
    dockerfile.includes("HOSTNAME='0.0.0.0'") ||
    dockerfile.includes('HOSTNAME=0.0.0.0')
  ) {
    ok('Dockerfile runner sets HOSTNAME="0.0.0.0"')
  } else {
    warn(
      'Dockerfile runner should set HOSTNAME="0.0.0.0" for container networking',
    )
  }

  if (dockerfile.includes('PORT=3000')) {
    ok('Dockerfile runner sets PORT=3000')
  } else {
    warn('Dockerfile runner should set PORT=3000')
  }

  if (dockerfile.includes('USER nextjs')) {
    ok('Dockerfile runner uses non-root user (USER nextjs)')
  } else {
    warn('Dockerfile runner should run as non-root user (USER nextjs)')
  }

  if (dockerfile.includes('HUSKY=0')) {
    ok('Dockerfile skips Husky during image install')
  } else {
    warn('Dockerfile should set HUSKY=0 so prepare does not look for .git')
  }

  if (dockerfile.includes('--frozen-lockfile')) {
    ok('Dockerfile installs with --frozen-lockfile')
  } else {
    warn('Dockerfile should use bun install --frozen-lockfile')
  }
} else {
  fail('Dockerfile not found in repo root')
}

// --- package.json script existence ---
const pkg = JSON.parse(read('package.json'))
for (const script of ['db:generate', 'typecheck', 'build']) {
  if (pkg.scripts?.[script]) {
    ok(`package.json has "${script}"`)
  } else {
    fail(`package.json missing script: ${script}`)
  }
}

// --- next.config standalone check ---
const nextConfigPath = existsSync(path.join(ROOT, 'apps/web/next.config.ts'))
  ? 'apps/web/next.config.ts'
  : existsSync(path.join(ROOT, 'next.config.ts'))
    ? 'next.config.ts'
    : null

if (nextConfigPath) {
  const nextConfig = read(nextConfigPath)
  if (
    nextConfig.includes("output: 'standalone'") ||
    nextConfig.includes('output: "standalone"')
  ) {
    ok(`${nextConfigPath} has standalone output`)
  } else {
    fail(`${nextConfigPath} missing output: 'standalone'`)
  }
} else {
  fail('next.config.ts not found in apps/web/ or root')
}

// --- Prisma schema check ---
const prismaSchemaRel = existsSync(path.join(ROOT, 'prisma/schema.prisma'))
  ? 'prisma/schema.prisma'
  : existsSync(path.join(ROOT, 'packages/db/prisma/schema.prisma'))
    ? 'packages/db/prisma/schema.prisma'
    : null

if (prismaSchemaRel) {
  const schema = read(prismaSchemaRel)
  if (schema.includes('generator client')) {
    ok(`${prismaSchemaRel} has a Prisma client generator`)
  } else {
    fail(`${prismaSchemaRel} is missing a client generator`)
  }
} else {
  fail('prisma/schema.prisma not found')
}

// --- Pre-commit checks existence ---
if (existsSync(path.join(ROOT, 'scripts/pre-commit-checks.mjs'))) {
  ok('scripts/pre-commit-checks.mjs exists')
}

const htmlToMarkdown = existsSync(
  path.join(ROOT, 'lib/markdown/html-to-markdown.ts'),
)
  ? read('lib/markdown/html-to-markdown.ts')
  : ''
if (
  htmlToMarkdown.includes("from 'jsdom'") ||
  htmlToMarkdown.includes('from "jsdom"')
) {
  fail(
    'lib/markdown/html-to-markdown.ts imports jsdom — Next collect page data fails on css-tree patch.json in Docker',
  )
} else if (htmlToMarkdown) {
  ok('html-to-markdown does not import jsdom')
}

// --- optional builder simulation ---
if (simulateBuilder) {
  console.log('\n--- Simulating Docker builder steps ---\n')
  const dbUrl = process.env.DATABASE_URL
  if (!dbUrl) {
    fail('Set DATABASE_URL for --simulate-builder')
  }
  if (errors.length === 0) {
    const env = {
      DATABASE_URL: dbUrl,
      NODE_OPTIONS: '--max-old-space-size=4096',
    }
    let code = run('bun', ['run', 'db:generate'], env).status ?? 1
    if (code === 0) {
      ok('db:generate passed')
    } else {
      fail('db:generate failed in simulation')
    }

    code = run('bun', ['x', 'ultracite', 'check'], env).status ?? 1
    if (code === 0) {
      ok('ultracite check passed')
    } else {
      fail('ultracite check failed in simulation')
    }

    code = run('bun', ['run', 'typecheck'], env).status ?? 1
    if (code === 0) {
      ok('typecheck passed')
    } else {
      fail('typecheck failed in simulation')
    }

    console.log(
      '\n(Skipping full next build in simulation — run locally if needed)\n',
    )
  }
}

// --- summary ---
console.log('')
if (warnings.length) {
  console.log('Warnings:')
  for (const w of warnings) {
    console.log(`  ⚠️  ${w}`)
  }
  console.log('')
}

if (errors.length) {
  console.log('Failures:')
  for (const e of errors) {
    console.log(`  ❌ ${e}`)
  }
  console.log('\nSee .agents/skills/docker-doctor/reference.md')
  process.exit(1)
}

console.log('Docker doctor: all checks passed')
process.exit(0)
