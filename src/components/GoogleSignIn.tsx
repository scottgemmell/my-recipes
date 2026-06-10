import { useEffect, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import {
  selectUser,
  selectCanEdit,
  sessionFromCredential,
  signedIn,
  signedOut,
} from '../features/auth/authSlice'
import { setAuthToken } from '../features/api'

/* Minimal typings for the Google Identity Services script (gsi/client). */
interface GsiId {
  initialize(config: { client_id: string; callback: (r: { credential: string }) => void }): void
  renderButton(parent: HTMLElement, options: Record<string, unknown>): void
  disableAutoSelect(): void
}
declare global {
  interface Window {
    google?: { accounts: { id: GsiId } }
  }
}

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID as string | undefined

/**
 * Navbar auth control: a "Sign in with Google" button while signed out, and
 * the account picture + sign-out while signed in. Renders nothing when no
 * client id is configured (auth disabled — local owner mode).
 */
export default function GoogleSignIn() {
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectUser)
  const canEdit = useAppSelector(selectCanEdit)
  const buttonRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!CLIENT_ID || user || !buttonRef.current) return
    let cancelled = false
    const tryRender = () => {
      if (cancelled) return
      const gsi = window.google?.accounts.id
      if (!gsi || !buttonRef.current) {
        window.setTimeout(tryRender, 150)
        return
      }
      gsi.initialize({
        client_id: CLIENT_ID,
        callback: ({ credential }) => {
          const session = sessionFromCredential(credential)
          if (session) {
            setAuthToken(credential)
            dispatch(signedIn(session))
          }
        },
      })
      gsi.renderButton(buttonRef.current, { theme: 'outline', size: 'medium', shape: 'pill' })
    }
    tryRender()
    return () => {
      cancelled = true
    }
  }, [user, dispatch])

  if (!CLIENT_ID) return null

  // Distinct keys force React to swap the DOM node between the two states —
  // the GIS iframe inside the button div isn't React-managed, so reusing the
  // node would leave the Google button behind next to the account chip.
  if (!user) return <div key="gsi-button" ref={buttonRef} className="h-8" />

  return (
    <div key="account" className="flex items-center gap-xs" title={user.email}>
      {user.picture ? (
        <img
          src={user.picture}
          alt={user.name}
          referrerPolicy="no-referrer"
          className="w-8 h-8 rounded-full border border-outline-variant"
        />
      ) : (
        <span className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-label-lg text-label-lg">
          {user.name.charAt(0).toUpperCase()}
        </span>
      )}
      {!canEdit && (
        <span className="hidden md:inline font-label-sm text-label-sm text-secondary">
          view only
        </span>
      )}
      <button
        type="button"
        onClick={() => {
          window.google?.accounts.id.disableAutoSelect()
          setAuthToken(null)
          dispatch(signedOut())
        }}
        className="font-label-sm text-label-sm text-secondary hover:text-primary transition-colors"
      >
        Sign out
      </button>
    </div>
  )
}
