#!/usr/bin/env node
import { execSync } from 'node:child_process'

function sh(command, options = {}) {
  execSync(command, { stdio: 'inherit', ...options })
}

function staged() {
  try {
    return execSync('git diff --cached --name-only --diff-filter=ACMR', {
      encoding: 'utf8',
    })
      .split('\n')
      .filter(Boolean)
  } catch {
    return []
  }
}

const files = staged()
if (files.length === 0) {
  process.exit(0)
}

const touchesTypecheck = files.some(
  (file) =>
    /\.(ts|tsx)$/.test(file) ||
    ['package.json', 'tsconfig.json', 'bun.lock', 'bun.lockb'].includes(file),
)

const touchesPrisma = files.some(
  (file) => file.startsWith('prisma/') || file === 'prisma.config.ts',
)

if (touchesPrisma) {
  console.log('→ prisma generate')
  sh('bunx prisma generate')
}

if (!(touchesTypecheck || touchesPrisma)) {
  process.exit(0)
}

console.log('→ typecheck (TS7)')
sh(
  './node_modules/@typescript/native/bin/tsc --noEmit --incremental --checkers 8',
  { cwd: process.cwd() },
)

console.log('✓ pre-commit checks passed')
