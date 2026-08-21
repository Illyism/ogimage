#!/usr/bin/env bun
/**
 * Swiss Observer Coolify API CLI — direct REST, no MCP.
 *
 * Env (repo root .env):
 *   COOLIFY_TOKEN / COOLIFY_READ — Bearer token (required)
 *   COOLIFY_URL                  — instance base URL (default: https://cooler.il.ly)
 *
 * Quick check (build finished? logs?):
 *   bun .agents/skills/coolify/scripts/coolify.mjs status swissobserver
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

const resources = JSON.parse(readFileSync(RESOURCES_PATH, 'utf8'))

function usage(exitCode = 1) {
  console.error(`Coolify API CLI (Swiss Observer)

Commands:
  status [alias]               Build finished? Latest deploy + build/runtime log tails (start here, default: swissobserver)
  build-log [alias] [--tail N] Latest deploy build log (errors highlighted)
  overview                     Servers, apps, databases, services summary
  apps                         List applications
  app <alias|uuid>             Application details
  logs <alias|uuid> [--lines N]  Container runtime logs (needs read:sensitive)
  deploys <alias|uuid> [--limit N]  Deployment history
  deployment <uuid> [alias]    Single deployment build log (alias helps fetch full logs)
  env-keys <alias|uuid>        Env var key names only (never values)
  deploy <alias|uuid> [--force]  Trigger redeploy (needs deploy permission)
  raw <method> <path>          Low-level API call (debug)

Flags:
  --json                       Machine-readable output (status, build-log, deployment)
  --no-runtime                 status: skip container log tail
  --build-tail N               status/build-log: build log lines (default 30)
  --runtime-lines N            status: runtime log lines (default 25)

Aliases: swissobserver, web, postgres, swiss
`)
  process.exit(exitCode)
}

function resolveUuid(kind, idOrAlias) {
  if (!idOrAlias) {
    return null
  }
  if (/^[a-z0-9]{20,}$/i.test(idOrAlias)) {
    return idOrAlias
  }
  const map = resources[`${kind}s`] ?? resources[kind] ?? {}
  const hit = map[idOrAlias.toLowerCase()]
  return hit?.uuid ?? null
}

function resolveApp(id) {
  return resolveUuid('application', id) ?? resolveUuid('applications', id)
}

function parseFlags(argv) {
  const flags = {}
  const positional = []
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i]
    if (arg === '--json') {
      flags.json = true
    } else if (arg === '--no-runtime') {
      flags.noRuntime = true
    } else if (arg.startsWith('--lines=')) {
      flags.lines = Number(arg.slice(8))
    } else if (arg === '--lines') {
      flags.lines = Number(argv[++i])
    } else if (arg.startsWith('--tail=')) {
      flags.tail = Number(arg.slice(7))
    } else if (arg === '--tail') {
      flags.tail = Number(argv[++i])
    } else if (arg.startsWith('--build-tail=')) {
      flags.buildTail = Number(arg.slice(13))
    } else if (arg === '--build-tail') {
      flags.buildTail = Number(argv[++i])
    } else if (arg.startsWith('--runtime-lines=')) {
      flags.runtimeLines = Number(arg.slice(16))
    } else if (arg === '--runtime-lines') {
      flags.runtimeLines = Number(argv[++i])
    } else if (arg.startsWith('--limit=')) {
      flags.limit = Number(arg.slice(8))
    } else if (arg === '--limit') {
      flags.limit = Number(argv[++i])
    } else if (arg === '--force') {
      flags.force = true
    } else if (arg.startsWith('--')) {
      flags[arg.slice(2)] = true
    } else {
      positional.push(arg)
    }
  }
  return { flags, positional }
}

async function api(method, apiPath, body) {
  if (!TOKEN) {
    console.error('Missing COOLIFY_READ in .env or environment')
    process.exit(1)
  }
  const url = apiPath.startsWith('http')
    ? apiPath
    : `${API}${apiPath.startsWith('/') ? '' : '/'}${apiPath}`
  const res = await fetch(url, {
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
    console.error(`HTTP ${res.status} ${method} ${apiPath}`)
    console.error(
      typeof data === 'string' ? data : JSON.stringify(data, null, 2),
    )
    process.exit(1)
  }
  return data
}

function printJson(data) {
  console.log(JSON.stringify(data, null, 2))
}

function summarizeApp(a) {
  return {
    branch: a.git_branch,
    fqdn: a.fqdn,
    git: a.git_repository,
    name: a.name,
    server: a.destination?.server?.name ?? a.server?.name,
    status: a.status,
    uuid: a.uuid,
  }
}

function parseDeployLogs(logsField) {
  if (!logsField) {
    return []
  }
  if (Array.isArray(logsField)) {
    return logsField
  }
  try {
    return JSON.parse(logsField)
  } catch {
    return [{ output: String(logsField) }]
  }
}

function deployLogLines(logsField) {
  return parseDeployLogs(logsField)
    .map((e) => e.output ?? e.message ?? '')
    .filter(Boolean)
}

function tailLines(lines, maxLines) {
  return lines.slice(-maxLines).join('\n')
}

function extractBuildFailure(lines) {
  const signatures = lines.filter((line) =>
    /ERROR: failed to build|Deployment failed|Command execution failed|exit code 1|exit status 1|^error:/i.test(
      line,
    ),
  )
  const prismaBlock = []
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('Prisma only supports Node.js')) {
      prismaBlock.push(...lines.slice(i, i + 5))
      break
    }
  }
  const dockerfileContext = []
  for (let i = lines.length - 1; i >= 0; i--) {
    if (/^Dockerfile:\d+/.test(lines[i]) || />>> RUN/.test(lines[i])) {
      dockerfileContext.unshift(...lines.slice(Math.max(0, i - 2), i + 4))
      break
    }
  }
  return {
    dockerfileContext: dockerfileContext.slice(-8),
    signatures: [...new Set([...prismaBlock, ...signatures.slice(-8)])],
  }
}

async function getLatestDeployment(appUuid) {
  const data = await api('GET', `/deployments/applications/${appUuid}`)
  return (data.deployments ?? [])[0] ?? null
}

async function fetchDeploymentWithLogs(deploymentUuid, appUuid) {
  const detail = await api('GET', `/deployments/${deploymentUuid}`)
  if (deployLogLines(detail.logs).length > 0) {
    return detail
  }

  if (appUuid) {
    const data = await api('GET', `/deployments/applications/${appUuid}`)
    const fromList = (data.deployments ?? []).find(
      (d) => d.deployment_uuid === deploymentUuid,
    )
    if (fromList?.logs) {
      return { ...detail, logs: fromList.logs }
    }
  }

  return detail
}

async function getActiveDeployments(appUuid) {
  const active = await api('GET', '/deployments')
  if (!Array.isArray(active)) {
    return []
  }
  return active.filter((d) => {
    const app = d.application?.uuid ?? d.application_uuid
    return !appUuid || app === appUuid
  })
}

async function buildLogReport(appUuid, tail = 30) {
  const latest = await getLatestDeployment(appUuid)
  if (!latest) {
    return { error: 'No deployments found' }
  }

  const full = await fetchDeploymentWithLogs(latest.deployment_uuid, appUuid)
  const lines = deployLogLines(full.logs)
  const failure = extractBuildFailure(lines)

  return {
    build_in_progress: ['queued', 'in_progress', 'running'].includes(
      latest.status,
    ),
    commit: latest.commit,
    created_at: latest.created_at,
    deployment_uuid: latest.deployment_uuid,
    failure,
    is_webhook: latest.is_webhook,
    log_line_count: lines.length,
    log_tail: tailLines(lines, tail),
    status: latest.status,
  }
}

async function statusReport(appAlias, appUuid, flags) {
  const buildTail = flags.buildTail ?? flags.tail ?? 30
  const runtimeLines = flags.runtimeLines ?? flags.lines ?? 25

  const [app, active, build] = await Promise.all([
    api('GET', `/applications/${appUuid}`),
    getActiveDeployments(appUuid),
    buildLogReport(appUuid, buildTail),
  ])

  const buildRunning = active.length > 0 || build.build_in_progress
  const latestStatus = build.status ?? 'unknown'
  const deployFinished = !buildRunning && latestStatus !== 'in_progress'

  let runtimeTail = null
  if (!flags.noRuntime) {
    const logData = await api(
      'GET',
      `/applications/${appUuid}/logs?lines=${runtimeLines}`,
    )
    runtimeTail =
      typeof logData.logs === 'string'
        ? logData.logs
        : JSON.stringify(logData.logs, null, 2)
  }

  return {
    active_deployments: active.map((d) => ({
      deployment_uuid: d.deployment_uuid ?? d.uuid,
      status: d.status,
    })),
    alias: appAlias,
    app: summarizeApp(app),
    build_failure: build.failure,
    build_log_tail: build.log_tail,
    build_running: buildRunning,
    hints: deployHints(latestStatus, buildRunning, build.failure),
    latest_deploy: {
      commit: build.commit,
      created_at: build.created_at,
      deployment_uuid: build.deployment_uuid,
      finished: deployFinished,
      status: build.status,
    },
    runtime_log_tail: runtimeTail,
  }
}

function deployHints(status, buildRunning, failure) {
  const hints = []
  if (buildRunning) {
    hints.push('Build still running — re-run status in a minute.')
  } else if (status === 'success') {
    hints.push(
      'Latest deploy succeeded; runtime logs are from the new container.',
    )
  } else if (status === 'failed') {
    hints.push('Latest deploy failed; prod still serves the previous image.')
    if (
      failure.signatures.some((s) => s.includes('Prisma only supports Node.js'))
    ) {
      hints.push(
        'Prisma Node version mismatch in deps stage — see /docker-doctor (node_base overlay).',
      )
    }
    if (
      failure.signatures.some(
        (s) => s.includes('node:-slim') || s.includes('UndefinedArgInFrom'),
      )
    ) {
      hints.push('ARG/FROM scoping issue — see /docker-doctor.')
    }
    if (
      failure.signatures.some(
        (s) => s.includes('kysely-types') || s.includes('ultracite'),
      )
    ) {
      hints.push(
        'Generate/format issue — see prisma-post-generate.mjs in /docker-doctor.',
      )
    }
  }
  return hints
}

function printStatusHuman(report) {
  const { app, latest_deploy: latest, build_running: running } = report
  console.log(`=== ${report.alias} (${app.name}) ===`)
  console.log(`App status: ${app.status} · ${app.fqdn}`)
  console.log(`Build in progress: ${running ? 'yes' : 'no'}`)
  if (report.active_deployments.length > 0) {
    console.log(
      `Active: ${report.active_deployments.map((d) => `${d.deployment_uuid} (${d.status})`).join(', ')}`,
    )
  }
  console.log(
    `Latest deploy: ${latest.deployment_uuid} · ${latest.status} · ${latest.commit?.slice(0, 8) ?? '?'} · ${latest.created_at}`,
  )
  if (report.hints.length > 0) {
    console.log('\nHints:')
    for (const h of report.hints) {
      console.log(`  • ${h}`)
    }
  }
  if (report.build_failure.signatures.length > 0) {
    console.log('\nBuild errors (extracted):')
    for (const line of report.build_failure.signatures) {
      console.log(`  ${line.trim()}`)
    }
  }
  if (report.build_log_tail) {
    console.log(
      `\n--- Build log tail (${report.build_log_tail.split('\n').length} lines shown) ---`,
    )
    console.log(report.build_log_tail)
  }
  if (report.runtime_log_tail) {
    console.log('\n--- Runtime log tail ---')
    console.log(report.runtime_log_tail)
  }
}

const DEFAULT_APP = 'swissobserver'

const [command, ...rest] = process.argv.slice(2)
if (!command) {
  usage()
}

const { flags, positional } = parseFlags(rest)

try {
  switch (command) {
    case 'status': {
      const alias = positional[0] ?? DEFAULT_APP
      const uuid = resolveApp(alias)
      if (!uuid) {
        console.error(`Unknown app alias: ${alias}`)
        process.exit(1)
      }
      const report = await statusReport(alias, uuid, flags)
      if (flags.json) {
        printJson(report)
      } else {
        printStatusHuman(report)
      }
      break
    }
    case 'build-log': {
      const alias = positional[0] ?? DEFAULT_APP
      const uuid = resolveApp(alias)
      if (!uuid) {
        console.error(`Unknown app alias: ${alias}`)
        process.exit(1)
      }
      const tail = flags.tail ?? flags.buildTail ?? 40
      const report = await buildLogReport(uuid, tail)
      if (flags.json) {
        printJson(report)
      } else {
        console.log(
          `Deploy: ${report.deployment_uuid} · ${report.status} · ${report.commit?.slice(0, 8)}`,
        )
        if (report.failure.signatures.length > 0) {
          console.log('\nErrors:')
          for (const line of report.failure.signatures) {
            console.log(`  ${line.trim()}`)
          }
        }
        console.log(`\n--- tail (${tail} lines) ---\n${report.log_tail}`)
      }
      break
    }
    case 'overview': {
      const [servers, apps, dbs, services] = await Promise.all([
        api('GET', '/servers'),
        api('GET', '/applications'),
        api('GET', '/databases'),
        api('GET', '/services'),
      ])
      printJson({
        aliases: Object.keys(resources.applications),
        applications: apps.map(summarizeApp),
        coolifyUrl: BASE_URL,
        databases: dbs.map((d) => ({
          name: d.name,
          status: d.status,
          uuid: d.uuid,
        })),
        servers: servers.map((s) => ({
          ip: s.ip,
          name: s.name,
          reachable: s.settings?.is_reachable ?? s.is_reachable,
          uuid: s.uuid,
        })),
        services: services.map((s) => ({
          name: s.name,
          status: s.status,
          uuid: s.uuid,
        })),
        team: resources.team,
      })
      break
    }
    case 'apps': {
      const apps = await api('GET', '/applications')
      printJson(apps.map(summarizeApp))
      break
    }
    case 'app': {
      const alias = positional[0] ?? DEFAULT_APP
      const uuid = resolveApp(alias)
      if (!uuid) {
        console.error(`Unknown app alias: ${alias}`)
        process.exit(1)
      }
      const app = await api('GET', `/applications/${uuid}`)
      printJson(summarizeApp(app))
      break
    }
    case 'logs': {
      const alias = positional[0] ?? DEFAULT_APP
      const uuid = resolveApp(alias)
      if (!uuid) {
        console.error(`Unknown app alias: ${alias}`)
        process.exit(1)
      }
      const lines = flags.lines ?? 100
      const data = await api('GET', `/applications/${uuid}/logs?lines=${lines}`)
      const logs =
        typeof data.logs === 'string'
          ? data.logs
          : JSON.stringify(data.logs, null, 2)
      console.log(logs)
      break
    }
    case 'deploys': {
      const alias = positional[0] ?? DEFAULT_APP
      const uuid = resolveApp(alias)
      if (!uuid) {
        console.error(`Unknown app alias: ${alias}`)
        process.exit(1)
      }
      const data = await api('GET', `/deployments/applications/${uuid}`)
      const limit = flags.limit ?? 10
      const deployments = (data.deployments ?? data)
        .slice(0, limit)
        .map((d) => ({
          commit: d.commit,
          created_at: d.created_at,
          deployment_uuid: d.deployment_uuid,
          force_rebuild: d.force_rebuild,
          is_webhook: d.is_webhook,
          status: d.status,
        }))
      printJson({ count: data.count ?? deployments.length, deployments })
      break
    }
    case 'deployment': {
      const deploymentUuid = positional[0]
      const appAlias = positional[1]
      if (!deploymentUuid) {
        console.error('Usage: deployment <deployment-uuid> [app-alias]')
        process.exit(1)
      }
      const appUuid = appAlias ? resolveApp(appAlias) : resolveApp(DEFAULT_APP)
      const d = await fetchDeploymentWithLogs(deploymentUuid, appUuid)
      const lines = deployLogLines(d.logs)
      const tail = flags.tail ?? flags.buildTail ?? 40
      const payload = {
        application: d.application?.name ?? d.application_uuid,
        commit: d.commit,
        created_at: d.created_at,
        deployment_uuid: d.deployment_uuid ?? deploymentUuid,
        failure: extractBuildFailure(lines),
        log_tail: tailLines(lines, tail),
        status: d.status,
      }
      if (flags.json) {
        printJson(payload)
      } else {
        console.log(
          `${payload.deployment_uuid} · ${payload.status} · ${payload.commit?.slice(0, 8)}`,
        )
        if (payload.failure.signatures.length > 0) {
          console.log('\nErrors:')
          for (const line of payload.failure.signatures) {
            console.log(`  ${line.trim()}`)
          }
        }
        console.log(`\n--- tail ---\n${payload.log_tail}`)
      }
      break
    }
    case 'env-keys': {
      const alias = positional[0] ?? DEFAULT_APP
      const uuid = resolveApp(alias)
      if (!uuid) {
        console.error(`Unknown app alias: ${alias}`)
        process.exit(1)
      }
      const envs = await api('GET', `/applications/${uuid}/envs`)
      const keys = (Array.isArray(envs) ? envs : []).map((e) => ({
        is_buildtime: e.is_buildtime,
        is_preview: e.is_preview,
        is_runtime: e.is_runtime,
        key: e.key,
      }))
      printJson(keys)
      break
    }
    case 'deploy': {
      const alias = positional[0] ?? DEFAULT_APP
      const uuid = resolveApp(alias)
      if (!uuid) {
        console.error(`Unknown app alias: ${alias}`)
        process.exit(1)
      }
      const data = await api('POST', '/deploy', {
        force: Boolean(flags.force),
        uuid,
      })
      printJson(data)
      break
    }
    case 'raw': {
      const [method, apiPath, ...jsonParts] = positional
      if (!(method && apiPath)) {
        console.error('Usage: raw <GET|POST|...> <path> [json-body]')
        process.exit(1)
      }
      const body = jsonParts.length
        ? JSON.parse(jsonParts.join(' '))
        : undefined
      printJson(await api(method.toUpperCase(), apiPath, body))
      break
    }
    default:
      console.error(`Unknown command: ${command}`)
      usage()
  }
} catch (err) {
  console.error(err instanceof Error ? err.message : err)
  process.exit(1)
}
