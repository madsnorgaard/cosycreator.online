FROM node:20-alpine AS builder
WORKDIR /app

ARG PAYLOAD_PUBLIC_SERVER_URL=https://cms.cosycreator.online
ENV PAYLOAD_PUBLIC_SERVER_URL=$PAYLOAD_PUBLIC_SERVER_URL

COPY package.json ./
RUN npm install --legacy-peer-deps

COPY . .
RUN npm run build

# ── Runner ──────────────────────────────────────────────────────────────────
FROM node:20-alpine AS runner
WORKDIR /app

COPY package.json ./
RUN npm install --omit=dev --legacy-peer-deps

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/build ./build

RUN mkdir -p /app/media

EXPOSE 3001
CMD ["node", "dist/server.js"]
