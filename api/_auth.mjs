/**
 * Owner check for the Vercel API functions — same policy as the local
 * json-server middleware (server/auth.cjs): reads are public, writes need a
 * Google ID token verified with Google, issued for our OAuth client, and
 * belonging to the allowlisted owner.
 *
 * Configured via Vercel project env vars VITE_GOOGLE_CLIENT_ID and
 * VITE_ALLOWED_EMAIL (shared with the frontend build).
 */
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID || process.env.VITE_GOOGLE_CLIENT_ID
const ALLOWED_EMAIL = process.env.ALLOWED_EMAIL || process.env.VITE_ALLOWED_EMAIL

// Cache verified tokens until expiry so bursts of saves don't re-hit Google.
const verified = new Map()

/**
 * Authorize a write request. Returns true to proceed; otherwise sends the
 * error response and returns false.
 */
export async function authorizeWrite(req, res) {
  if (!CLIENT_ID || !ALLOWED_EMAIL) {
    res.status(503).json({ error: 'Auth is not configured on the server.' })
    return false
  }
  const token = (req.headers.authorization || '').replace(/^Bearer\s+/i, '')
  if (!token) {
    res.status(401).json({ error: 'Sign-in required to modify recipes.' })
    return false
  }
  const cached = verified.get(token)
  if (cached && cached > Date.now()) return true
  try {
    const r = await fetch(
      `https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(token)}`,
    )
    if (r.ok) {
      const info = await r.json()
      if (
        info.aud === CLIENT_ID &&
        info.email_verified === 'true' &&
        (info.email || '').toLowerCase() === ALLOWED_EMAIL.toLowerCase()
      ) {
        verified.set(token, Number(info.exp) * 1000)
        return true
      }
    }
    res.status(403).json({ error: 'This account is not allowed to modify recipes.' })
  } catch {
    res.status(503).json({ error: 'Could not verify sign-in.' })
  }
  return false
}
