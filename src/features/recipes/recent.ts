/** A recipe is tagged "New" if it was added within this many days. */
export const NEW_WINDOW_DAYS = 3

const DAY_MS = 24 * 60 * 60 * 1000

/** True when an ISO `createdAt` date falls within the last NEW_WINDOW_DAYS. */
export function isNewRecipe(createdAt?: string): boolean {
  if (!createdAt) return false
  const created = new Date(createdAt).getTime()
  if (Number.isNaN(created)) return false
  return Date.now() - created <= NEW_WINDOW_DAYS * DAY_MS
}
