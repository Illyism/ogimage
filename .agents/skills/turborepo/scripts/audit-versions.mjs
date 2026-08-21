#!/usr/bin/env bun
/**
 * Scan workspace package.json files for version drift on shared dependencies.
 * Usage: bun run .agents/skills/turborepo/scripts/audit-versions.mjs
 */
import { readdirSync, readFileSync, statSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../../../..',
)
const WORKSPACE_GLOBS = ['apps', 'packages']

const TRACK = [
  'next',
  'react',
  'react-dom',
  'typescript',
  'ai',
  '@ai-sdk/react',
  '@ai-sdk/provider',
  '@sentry/nextjs',
  '@sentry/cli',
  '@trigger.dev/sdk',
  '@trigger.dev/build',
  '@trigger.dev/react-hooks',
  'turbo',
  'kysely',
  '@prisma/client',
  'prisma',
  'zod',
]

function listPackageJsonFiles() {
  const files = [path.join(ROOT, 'package.json')]
  for (const dir of WORKSPACE_GLOBS) {
    const base = path.join(ROOT, dir)
    if (!statSync(base, { throwIfNoEntry: false })?.isDirectory()) {
      continue
    }
    for (const name of readdirSync(base)) {
      const pkgDir = path.join(base, name)
      const pkgJson = path.join(pkgDir, 'package.json')
      if (statSync(pkgJson, { throwIfNoEntry: false })?.isFile()) {
        files.push(pkgJson)
      }
    }
  }
  return files
}

function readOverrides() {
  const root = JSON.parse(readFileSync(path.join(ROOT, 'package.json'), 'utf8'))
  return root.overrides ?? {}
}

function collectVersions(files) {
  const byDep = new Map()

  for (const file of files) {
    const rel = path.relative(ROOT, file)
    const pkg = JSON.parse(readFileSync(file, 'utf8'))
    const sections = [
      pkg.dependencies,
      pkg.devDependencies,
      pkg.peerDependencies,
    ]
    for (const section of sections) {
      if (!section) {
        continue
      }
      for (const [name, version] of Object.entries(section)) {
        if (!TRACK.includes(name)) {
          continue
        }
        if (!byDep.has(name)) {
          byDep.set(name, new Map())
        }
        const versions = byDep.get(name)
        if (!versions.has(version)) {
          versions.set(version, [])
        }
        versions.get(version).push(rel)
      }
    }
  }

  return byDep
}

const overrides = readOverrides()
const byDep = collectVersions(listPackageJsonFiles())
let issues = 0

console.log('# Turborepo dependency audit\n')

for (const dep of TRACK) {
  const versions = byDep.get(dep)
  if (!versions) {
    continue
  }

  const entries = [...versions.entries()].sort((a, b) =>
    a[0].localeCompare(b[0]),
  )
  if (entries.length <= 1) {
    continue
  }

  issues++
  console.log(`## ${dep}`)
  if (overrides[dep]) {
    console.log(`Root override: ${overrides[dep]}`)
  }
  for (const [version, files] of entries) {
    console.log(`- ${version}`)
    for (const file of files) {
      console.log(`  - ${file}`)
    }
  }
  console.log('')
}

const scriptNames = new Map()
for (const file of listPackageJsonFiles()) {
  const rel = path.dirname(path.relative(ROOT, file)) || '.'
  const pkg = JSON.parse(readFileSync(file, 'utf8'))
  for (const key of [
    'lint',
    'fix',
    'check-types',
    'typecheck',
    'test',
    'build',
  ]) {
    if (!pkg.scripts?.[key]) {
      continue
    }
    if (!scriptNames.has(key)) {
      scriptNames.set(key, [])
    }
    scriptNames.get(key).push(rel)
  }
}

console.log('## Script coverage\n')
for (const [script, packages] of [...scriptNames.entries()].sort()) {
  console.log(`- ${script}: ${packages.join(', ')}`)
}

const _inconsistent = [...scriptNames.entries()].filter(([name]) =>
  ['check-types', 'typecheck'].includes(name),
)
if (scriptNames.has('check-types') && scriptNames.has('typecheck')) {
  const typecheckPackages =
    scriptNames.get('typecheck')?.filter((pkg) => pkg !== '.') ?? []
  if (typecheckPackages.length > 0) {
    issues++
    console.log(
      `\n⚠ Packages using \`typecheck\` instead of \`check-types\`: ${typecheckPackages.join(', ')}`,
    )
  }
}

if (issues === 0) {
  console.log('\n✅ No tracked dependency version splits found.')
} else {
  console.log(`\n⚠ ${issues} dependency/script issue group(s) found.`)
  process.exitCode = 1
}
