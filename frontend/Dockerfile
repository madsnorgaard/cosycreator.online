# Multi-stage Nuxt 3 build

# ── Stage 1: build ─────────────────────────────────────────
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci --frozen-lockfile

COPY . .
RUN npm run build

# ── Stage 2: production runner ─────────────────────────────
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/.output ./

EXPOSE 3000

CMD ["node", "server/index.mjs"]
