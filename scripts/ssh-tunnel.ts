#!/usr/bin/env bun
/**
 * SSH Tunnel to Production Database
 *
 * Set PROD_DATABASE_URL in your .env with the Coolify connection string
 * Usage: bun run ssh:tunnel
 */

// @ts-expect-error - Bun runtime types
import { $, spawn } from 'bun'

const SSH = 'illyism@94.130.66.215'
const SSH_PORT = '10001'

const PROD_DB_URL = process.env.PROD_DATABASE_URL
if (!PROD_DB_URL) {
  console.error('❌ Set PROD_DATABASE_URL in your .env')
  console.error('   Example: PROD_DATABASE_URL="postgres://user:pass@container-name:5432/db"')
  process.exit(1)
}

async function main() {
  if (!PROD_DB_URL) {
    console.error('❌ Set PROD_DATABASE_URL in your .env')
    console.error('   Example: PROD_DATABASE_URL="postgres://user:pass@container-name:5432/db"')
    process.exit(1)
  }
  const url = new URL(PROD_DB_URL)
  const container = url.hostname
  const localPort = process.argv[2] || '5432'

  // Get container IP (Docker container names aren't resolvable via SSH)
  console.log(`🔍 Looking up container: ${container}`)
  const result =
    await $`ssh -p ${SSH_PORT} ${SSH} "docker inspect ${container} --format '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}'"`.quiet()

  if (result.exitCode !== 0 || !result.stdout.toString().trim()) {
    console.error(`❌ Container "${container}" not found on remote server`)
    console.error(
      '   Run: ssh -p 10001 illyism@94.130.66.215 "docker ps" to see available containers'
    )
    process.exit(1)
  }

  const containerIP = result.stdout.toString().trim()
  console.log(`✅ Found: ${containerIP}`)

  // Build local connection string
  const localUrl = `postgresql://${url.username}:${url.password}@localhost:${localPort}${url.pathname}`

  console.log(`\n🚇 Tunnel: localhost:${localPort} → ${containerIP}:5432`)
  console.log(`\n💡 DATABASE_URL="${localUrl}"\n`)

  const tunnel = spawn({
    cmd: ['ssh', '-N', '-L', `${localPort}:${containerIP}:5432`, '-p', SSH_PORT, SSH],
    stdout: 'inherit',
    stderr: 'inherit',
  })

  process.on('SIGINT', () => {
    tunnel.kill()
    process.exit(0)
  })
  await tunnel.exited
}

main()
