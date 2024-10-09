FROM node:20-alpine as base

ENV PNPM_HOME="/var/lib/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

RUN pnpm add -g turbo

# BUILDER ---------------------------------------------------------------------

FROM base AS builder

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY apps/landing ./apps/landing

RUN turbo prune landing --docker
RUN pnpm install --frozen-lockfile

WORKDIR /app/apps/landing

RUN pnpm turbo run build

# RUNNER ----------------------------------------------------------------------

FROM base AS runner

WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

USER nextjs

COPY --from=builder /app/apps/landing/.next/standalone /app

CMD node ./apps/landing/server.js