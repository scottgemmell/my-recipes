/**
 * json-server middleware: writes require a Google ID token from the owner.
 *
 * Reads require nothing (the app is publicly viewable). POST/PUT/PATCH/DELETE
 * must carry `Authorization: Bearer <google-id-token>`; the token is verified
 * with Google's tokeninfo endpoint, must be issued for our OAuth client
 * (GOOGLE_CLIENT_ID) and belong to the owner (ALLOWED_EMAIL).
 *
 * Both values come from .env.local (shared with the Vite frontend, which uses
 * the VITE_-prefixed client id). When they're absent, auth is NOT enforced —
 * local owner mode — and a warning is printed.
 */
const fs = require('node:fs')
const path = require('node:path')

function readEnvLocal() {
  const env = {}
  for (const file of ['.env', '.env.local']) {
    try {
      const text = fs.readFileSync(path.join(__dirname, '..', file), 'utf8')
      for (const line of text.split('\n')) {
        const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/)
        if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, '')
      }
    } catch {
      /* file absent — fine */
    }
  }
  return env
}

const env = readEnvLocal()
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID || env.VITE_GOOGLE_CLIENT_ID
const ALLOWED_EMAIL = process.env.ALLOWED_EMAIL || env.ALLOWED_EMAIL || env.VITE_ALLOWED_EMAIL
const enforced = Boolean(CLIENT_ID && ALLOWED_EMAIL)

if (!enforced) {
  console.warn(
    '[auth] VITE_GOOGLE_CLIENT_ID / ALLOWED_EMAIL not configured — writes are NOT protected (local owner mode)',
  )
} else {
  console.log(`[auth] write protection on: only ${ALLOWED_EMAIL} may modify data`)
}

// Cache verified tokens until their expiry so each save doesn't re-hit Google.
const verified = new Map() // token -> expiry (ms)

async function verifyToken(token) {
  const cached = verified.get(token)
  if (cached && cached > Date.now()) return true
  const res = await fetch(
    `https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(token)}`,
  )
  if (!res.ok) return false
  const info = await res.json()
  if (info.aud !== CLIENT_ID) return false
  if (info.email_verified !== 'true') return false
  if ((info.email || '').toLowerCase() !== ALLOWED_EMAIL.toLowerCase()) return false
  verified.set(token, Number(info.exp) * 1000)
  return true
}

module.exports = (req, res, next) => {
  if (!enforced || ['GET', 'HEAD', 'OPTIONS'].includes(req.method)) return next()

  const token = (req.headers.authorization || '').replace(/^Bearer\s+/i, '')
  if (!token) {
    res.status(401).jsonp({ error: 'Sign-in required to modify recipes.' })
    return
  }
  verifyToken(token)
    .then((ok) => {
      if (ok) next()
      else res.status(403).jsonp({ error: 'This account is not allowed to modify recipes.' })
    })
    .catch(() => res.status(503).jsonp({ error: 'Could not verify sign-in.' }))
}
