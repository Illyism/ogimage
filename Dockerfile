# Use Bun official image
FROM oven/bun:1 AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# No .git in the image, so husky's prepare script would log a failure
ENV HUSKY=0

# Copy package files
COPY package.json bun.lock* ./
# Install dependencies
RUN bun install --frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Set environment variables for build
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
# Lint/typecheck are owned by CI and the pre-commit hook (TS7). The image
# build must not re-run them — this also skips Next's embedded TS6 check.
ENV DOCKER_BUILD=true

# Generate Prisma Client
RUN bunx prisma generate

# Build Next.js app (build script may include db:generate — that is fine)
# No .next/cache mount: webpack's persistent cache poisoned a deploy after
# the Next 16.3 upgrade (phantom "not exported" errors from stale module
# graphs). Cold compiles are ~10s — not worth the risk.
RUN bun run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Install adduser (provides addgroup) and curl
RUN apt-get update && apt-get install -y --no-install-recommends \
    adduser \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Create a non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy necessary files from builder
# Copy the standalone server
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
# Copy static files
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
# Copy public files
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
# Copy Prisma schema and generated client (needed for migrations)
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/.prisma ./node_modules/.prisma

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Start the server
CMD ["bun", "server.js"]
