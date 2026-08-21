#!/usr/bin/env node
// Cursor afterFileEdit / afterTabFileEdit hook.
// Receives { file_path } JSON on stdin (absolute path), runs a scoped
// ultracite fix. Notification hook: always exits 0 — never blocks the agent.

import { execFile } from 'node:child_process'

const SKIP_PREFIXES = [
  '.contentlayer/',
  '.next/',
  '.swc/',
  '.well-known/',
  'next-env.d.ts',
  'node_modules/',
]

const LINTABLE = /\.(ts|tsx|js|jsx|mjs|cjs|json|jsonc|css|mdx?)$/

let input = ''
process.stdin.setEncoding('utf8')
process.stdin.on('data', (chunk) => {
  input += chunk
})
process.stdin.on('end', () => {
  let filePath
  try {
    filePath = JSON.parse(input)?.file_path
  } catch {
    process.exit(0)
  }
  if (!filePath) {
    process.exit(0)
  }

  const projectDir = process.env.CURSOR_PROJECT_DIR ?? process.cwd()
  const relative = filePath.startsWith(projectDir)
    ? filePath.slice(projectDir.length + 1)
    : filePath

  if (SKIP_PREFIXES.some((prefix) => relative.startsWith(prefix))) {
    process.exit(0)
  }
  if (!LINTABLE.test(relative)) {
    process.exit(0)
  }

  execFile(
    'bun',
    ['x', 'ultracite', 'fix', relative, '--skip=correctness/noUnusedImports'],
    { cwd: projectDir, timeout: 25_000 },
    () => {
      process.exit(0)
    },
  )
})
