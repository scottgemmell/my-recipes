import type { Recipe } from './types'

/**
 * Initial seed data — intentionally empty.
 *
 * The app's real data lives in localStorage (persisted by store.ts) and in
 * Export/Import backups; it is never written back to this file. A fresh
 * origin (new browser or port) therefore starts blank — restore a backup via
 * the footer's Export / Import page.
 *
 * Bundled imagery stays under assets/images/ (recipes/ and ingredients/):
 * saved data references those files by URL and image key.
 */
export const recipes: Recipe[] = []
