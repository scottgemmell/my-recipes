import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'

export interface AuthUser {
  email: string
  name: string
  picture?: string
}

export interface AuthSession {
  user: AuthUser
  /** The Google ID token (JWT) sent as a Bearer token on API writes. */
  credential: string
  /** Token expiry, ms since epoch. */
  expiresAt: number
}

interface AuthState {
  session: AuthSession | null
}

const SESSION_KEY = 'culinary-zen:session:v1'

/** Restore a previous session if its token hasn't expired. */
export function loadSession(): AuthSession | null {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY)
    if (!raw) return null
    const session = JSON.parse(raw) as AuthSession
    if (session.expiresAt > Date.now() + 60_000) return session
  } catch {
    /* ignore */
  }
  return null
}

function persistSession(session: AuthSession | null): void {
  try {
    if (session) sessionStorage.setItem(SESSION_KEY, JSON.stringify(session))
    else sessionStorage.removeItem(SESSION_KEY)
  } catch {
    /* storage unavailable */
  }
}

/** Decode a Google ID token (JWT) into a session, without verifying it — the
 * API middleware does real verification; this only drives the UI. */
export function sessionFromCredential(credential: string): AuthSession | null {
  try {
    const payload = JSON.parse(atob(credential.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')))
    return {
      user: { email: payload.email, name: payload.name ?? payload.email, picture: payload.picture },
      credential,
      expiresAt: payload.exp * 1000,
    }
  } catch {
    return null
  }
}

const authSlice = createSlice({
  name: 'auth',
  initialState: { session: null } as AuthState,
  reducers: {
    signedIn(state, action: PayloadAction<AuthSession>) {
      state.session = action.payload
      persistSession(action.payload)
    },
    signedOut(state) {
      state.session = null
      persistSession(null)
    },
  },
})

export const { signedIn, signedOut } = authSlice.actions
export default authSlice.reducer

/* ---- Selectors ---- */

export const selectUser = (state: RootState) => state.auth.session?.user ?? null

/**
 * Whether the signed-in account may edit. The server is the real gatekeeper;
 * this only decides what UI to show. When VITE_ALLOWED_EMAIL is set, accounts
 * other than the owner stay in view-only mode.
 */
export const selectCanEdit = (state: RootState) => {
  // No client id configured = auth disabled (local owner mode): full editing,
  // and the API middleware likewise doesn't enforce. Configure both to lock down.
  if (!import.meta.env.VITE_GOOGLE_CLIENT_ID) return true
  const session = state.auth.session
  if (!session || session.expiresAt <= Date.now()) return false
  const allowed = import.meta.env.VITE_ALLOWED_EMAIL as string | undefined
  return !allowed || session.user.email.toLowerCase() === allowed.toLowerCase()
}
