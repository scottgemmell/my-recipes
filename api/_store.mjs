/**
 * Production storage for the Vercel deployment: Upstash Redis (Vercel
 * marketplace KV). Each collection lives under one key as a JSON document —
 * plenty for a single-editor app. On first read of a missing key the
 * collection is seeded from the committed db.json, so a fresh deployment
 * comes up with the same data as local dev.
 */
import { Redis } from '@upstash/redis'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)

let redis = null
function client() {
  if (redis) return redis
  // Marketplace integrations inject either UPSTASH_* or legacy KV_* names.
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN
  if (!url || !token) {
    throw new Error('Upstash Redis is not configured (UPSTASH_REDIS_REST_URL/TOKEN)')
  }
  redis = new Redis({ url, token })
  return redis
}

// Dev-only image paths that leaked into stored data: /src/assets/... resolves
// on the Vite dev server but not in a production build. Images now live in
// public/ and are served at /images/recipes/.
const LEGACY_IMAGE_PREFIX = '/src/assets/images/recipes/'
const IMAGE_PREFIX = '/images/recipes/'

function migrateLegacyPaths(items) {
  let changed = false
  const next = items.map((item) => {
    if (typeof item?.image === 'string' && item.image.startsWith(LEGACY_IMAGE_PREFIX)) {
      changed = true
      return { ...item, image: item.image.replace(LEGACY_IMAGE_PREFIX, IMAGE_PREFIX) }
    }
    return item
  })
  return { changed, items: next }
}

export async function readCollection(name) {
  const data = await client().get(name)
  if (Array.isArray(data)) {
    // Self-heal previously seeded data that still points at dev-only paths.
    const { changed, items } = migrateLegacyPaths(data)
    if (changed) await client().set(name, items)
    return items
  }
  const seed = migrateLegacyPaths(require('../db.json')[name] ?? []).items
  await client().set(name, seed)
  return seed
}

export async function writeCollection(name, items) {
  await client().set(name, items)
}
