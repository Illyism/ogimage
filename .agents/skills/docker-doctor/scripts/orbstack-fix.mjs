#!/usr/bin/env bun
/**
 * Fix OrbStack "Permission denied while opening data image" after Migration Assistant.
 * Run: bun .agents/skills/docker-doctor/scripts/orbstack-fix.mjs
 */
import { spawnSync } from 'node:child_process'
import { existsSync, statSync } from 'node:fs'
import os from 'node:os'
import path from 'node:path'

const dataDir = path.join(
  os.homedir(),
  'Library/Group Containers/HUAQ24HBR6.dev.orbstack/data',
)
const dataImage = path.join(dataDir, 'data.img.raw')

if (!existsSync(dataDir)) {
  console.error('OrbStack data directory not found — is OrbStack installed?')
  process.exit(1)
}

let owner = 'unknown'
try {
  const st = statSync(dataImage)
  owner = st.uid === 0 ? 'root' : String(st.uid)
} catch {
  owner = 'missing'
}

console.log(`OrbStack data: ${dataDir}`)
console.log(
  `data.img.raw owner: ${owner === 'root' || owner === '0' ? 'root (broken)' : owner}`,
)

if (owner !== 'root' && owner !== '0') {
  const info = spawnSync('docker', ['info', '--format', '{{.ServerVersion}}'], {
    encoding: 'utf8',
  })
  if (info.status === 0) {
    console.log(`✅ Docker daemon reachable (Docker ${info.stdout.trim()})`)
    process.exit(0)
  }
  console.log('Permissions look OK but Docker daemon is not running.')
  console.log('\nStart OrbStack:')
  console.log('  orb start          # CLI')
  console.log('  open -a OrbStack   # or reopen the app from Applications')
  console.log('\nThen verify:')
  console.log('  docker context use orbstack')
  console.log('  docker info')
  process.exit(1)
}

console.log('\nFixing ownership (requires sudo password)...\n')
const fix = spawnSync('sudo', ['chown', '-R', `${process.env.USER}`, dataDir], {
  stdio: 'inherit',
})

if (fix.status !== 0) {
  console.error('\nManual fix:')
  console.error(`  sudo chown -R $USER "${dataDir}"`)
  process.exit(fix.status ?? 1)
}

console.log('\n✅ Ownership fixed. Quit and reopen OrbStack, then:')
console.log('  docker context use orbstack')
console.log('  bun run benchmark:docker')
