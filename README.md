# cosycreator.online

Aurora's digital art portfolio — Nuxt 3 frontend backed by Payload CMS, running on Docker with Traefik.

## Stack

- **Nuxt 3** — SSR frontend at `cosycreator.online`
- **Payload CMS v3** (Next.js host) - headless CMS admin at `cms.cosycreator.online`
- **MongoDB 7** — Payload database
- **Traefik v3** — SSL termination and routing
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

Payload admin runs at `http://localhost:3001/admin`. Requires a local MongoDB instance (`mongodb://localhost:27017`); copy `backend/.env.example` to `backend/.env` first.

After changing collections or fields, regenerate the committed artefacts:

```bash
npm run generate:types
npm run generate:importmap
```

Schema changes that touch existing data go in `backend/src/migrations/` (`npm run migrate:create <name>`). The container runs `payload migrate` on every start; it is a no-op when nothing is pending.

All `payload` and `@payloadcms/*` packages are pinned to the same version and must be bumped together (Dependabot groups them).

## Media uploads

Artwork images are stored in `media/` (bind-mounted into the Payload container). This directory is gitignored - back up separately.

Uploads are served at `https://cms.cosycreator.online/api/media/file/<file>`. The Payload 1 path `/media/<file>` still works through a rewrite.

## Rolling back to Payload 1

The v3 migration (October 2026) rewrites relationship values in MongoDB from strings to ObjectIDs, and Payload 3.90 re-hashes a password the first time its owner signs in. Payload 1 cannot read either, so a rollback needs the pre-migration dump, not just the old code.

1. Restore the dump taken before the v3 deploy:
   ```bash
   docker exec -i cosycreator.online_mongo mongorestore --drop --archive --gzip < ~/backups/cosycreator-pre-payload-v3.archive.gz
   ```
2. Revert the migration merge commit on `main`.
3. On the server, remove the build context so no v3 files linger (the deploy sync does not delete): `rm -rf ~/docker/cosycreator.online/backend`
4. Let the deploy run (or re-run it); it re-syncs `backend/` and rebuilds the Payload 1 image.

Anything uploaded or edited after the v3 deploy is lost by the restore; `media/` itself is untouched.
