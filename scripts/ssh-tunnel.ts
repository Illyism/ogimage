#!/usr/bin/env bun
/**
 * Open an SSH tunnel to the Coolify Postgres container.
 *
 * Coolify internal hostnames resolve only on the Docker network. Inspect the
 * container IP on the SSH host, then forward that address to localhost.
 *
 * Usage: bun run ssh:tunnel [localPort]
 */
import { spawn } from 'bun'
import 'dotenv/config'

const SSH_HOST = process.env.SSH_TUNNEL_HOST ?? 'illyism@94.130.66.215'
const SSH_PORT = process.env.SSH_TUNNEL_PORT ?? '10001'

const PROD_DB_URL = process.env.PROD_DATABASE_URL
if (!PROD_DB_URL) {
  console.error('Set PROD_DATABASE_URL in .env')
  console.error(
    'Example: PROD_DATABASE_URL="postgres://user:pass@coolify-db-uuid:5432/postgres"',
  )
  process.exit(1)
}

const url = new URL(PROD_DB_URL)
const container = url.hostname
const remotePort = url.port || '5432'
const localPort = process.argv[2] || '5432'

console.log(`Looking up container ${container}`)
// Pass the Go template as one SSH argument. Bun `$` interpolates `{{` and
// docker then reports "unclosed action".
const inspect = spawn({
  cmd: [
    'ssh',
    '-p',
    SSH_PORT,
    '-o',
    'BatchMode=yes',
    '-o',
    'ConnectTimeout=10',
    SSH_HOST,
    `docker inspect ${container} --format '{{range .NetworkSettings.Networks}}{{.IPAddress}} {{end}}'`,
  ],
  stderr: 'pipe',
  stdout: 'pipe',
})

const inspectCode = await inspect.exited
const inspectOut = (await new Response(inspect.stdout).text()).trim()
const containerIP = inspectOut
  .split(/\s+/)
  .find((part) => /^\d+\.\d+\.\d+\.\d+$/.test(part))

if (inspectCode !== 0 || !containerIP) {
  console.error(`Container "${container}" not found on ${SSH_HOST}`)
  console.error(
    `Run: ssh -p ${SSH_PORT} ${SSH_HOST} docker ps --format '{{.Names}}'`,
  )
  process.exit(1)
}

console.log(`Found ${containerIP}`)
console.log(`Tunnel: localhost:${localPort} → ${containerIP}:${remotePort}`)
console.log(
  `Use DATABASE_URL against localhost:${localPort} (same user, password, and database as PROD_DATABASE_URL).`,
)

const tunnel = spawn({
  cmd: [
    'ssh',
    '-N',
    '-L',
    `${localPort}:${containerIP}:${remotePort}`,
    '-p',
    SSH_PORT,
    '-o',
    'BatchMode=yes',
    '-o',
    'ExitOnForwardFailure=yes',
    '-o',
    'ServerAliveInterval=30',
    '-o',
    'ServerAliveCountMax=3',
    SSH_HOST,
  ],
  stderr: 'inherit',
  stdout: 'inherit',
})

const stop = () => {
  tunnel.kill()
  process.exit(0)
}

process.on('SIGINT', stop)
process.on('SIGTERM', stop)

const exitCode = await tunnel.exited
process.exit(exitCode ?? 1)
