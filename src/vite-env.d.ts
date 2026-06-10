/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Google OAuth client id — unset disables auth (local owner mode). */
  readonly VITE_GOOGLE_CLIENT_ID?: string
  /** The one Google account allowed to edit. */
  readonly VITE_ALLOWED_EMAIL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
