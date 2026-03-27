# cosycreator.online

Aurora's digital art portfolio — Nuxt 3 frontend backed by Payload CMS, running on Docker with Traefik.

## Stack

- **Nuxt 3** — SSR frontend at `cosycreator.online`
- **Payload CMS v1** — headless CMS admin at `cms.cosycreator.online`
- **MongoDB 7** — Payload database
- **Traefik v2** — SSL termination and routing
- **Let's Encrypt** — automatic HTTPS

## Services

| Service | URL |
|---|---|
| Portfolio | `https://cosycreator.online` |
| CMS admin | `https://cms.cosycreator.online/admin` |

## Setup

### 1. Prerequisites

- Docker and Docker Compose installed
- Traefik running with the `web` network: `docker network create web`
- Domains `cosycreator.online` and `cms.cosycreator.online` pointing to your server

### 2. Configure environment

```bash
cp .env.example .env
```

Edit `.env`:

```env
SITE_DOMAIN=cosycreator.online
PAYLOAD_SECRET=<generate with: openssl rand -base64 32>
```

### 3. Start

```bash
docker compose up -d --build
```

### 4. Create first admin user

Visit `https://cms.cosycreator.online/admin/create-first-user` — this page only appears once on first startup.

## Local development

### Frontend (Nuxt)

```bash
cd frontend
npm install
npm run dev
```

Runs at `http://localhost:3000`. Set `PAYLOAD_BASE_URL=http://localhost:3001` in `frontend/.env.local`.

### Backend (Payload)

```bash
cd backend
npm install
npm run dev
```

Payload admin runs at `http://localhost:3001/admin`. Requires a local MongoDB instance (`mongodb://localhost:27017`).

## Media uploads

Artwork images are stored in `media/` (bind-mounted into the Payload container). This directory is gitignored — back up separately.
