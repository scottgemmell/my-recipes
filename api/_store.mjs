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

export async function readCollection(name) {
  const data = await client().get(name)
  if (Array.isArray(data)) return data
  const seed = require('../db.json')[name] ?? []
  await client().set(name, seed)
  return seed
}

export async function writeCollection(name, items) {
  await client().set(name, items)
}
