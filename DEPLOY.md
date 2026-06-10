# Deploying to Vercel

The app deploys as a Vite static build plus serverless REST functions under
`api/` (same shapes as the local json-server). Production data lives in
Upstash Redis (Vercel marketplace KV) as two JSON documents, seeded from the
committed `db.json` on first request.

## One-time setup

1. **Vercel project** — vercel.com → Add New → Project → import the
   `scottgemmell/my-recipes` GitHub repo. Framework preset: Vite (defaults are
   fine — `npm run build`, output `dist`).

2. **Storage** — in the project: Storage → Create Database → **Upstash for
   Redis** (free plan) → connect to the project. This injects the
   `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` (or `KV_*`) env vars
   the API functions look for.

3. **Auth env vars** — Project → Settings → Environment Variables, add (same
   values as your local `.env.local`):
   - `VITE_GOOGLE_CLIENT_ID` — the Google OAuth client id
   - `VITE_ALLOWED_EMAIL` — the one account allowed to edit

4. **Custom domain** — Project → Settings → Domains → add
   `my-recipes.scottgemmell.com`, then create the CNAME record Vercel shows
   (typically `my-recipes` → `cname.vercel-dns.com`) wherever
   `scottgemmell.com`'s DNS is hosted.

5. **Google OAuth origins** — the OAuth client's Authorized JavaScript
   origins must include `https://my-recipes.scottgemmell.com` (done) and
   `http://localhost:5174` for local dev.

## How it fits together

| | Local dev | Production |
|---|---|---|
| Frontend | `npm run dev` (Vite, :5174) | static build on Vercel CDN |
| API | `npm run api` (json-server, :3001, proxied at `/api`) | `api/*` serverless functions |
| Data | `db.json` (committed) | Upstash Redis, seeded from `db.json` |
| Write auth | `server/auth.cjs` middleware | `api/_auth.mjs` (same policy) |

Pushing to the production branch redeploys automatically. Note that
production data and `db.json` drift apart once you edit in production —
export a backup from the live site if you want to refresh the committed seed.
