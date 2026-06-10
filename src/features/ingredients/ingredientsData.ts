export interface CatalogIngredient {
  id: string
  name: string
  /** Key into the bundled image registry (see imageRegistry.ts). Optional. */
  imageKey?: string
  /** A user-uploaded image as a (downscaled) data URL. Takes precedence over imageKey. */
  imageUrl?: string
}

/** Lower-cased, hyphenated slug — also how catalog ids are derived from names. */
export const slugify = (value: string): string =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

/** A catalog id for `name` that does not collide with anything in `existing`. */
export function makeIngredientId(name: string, existing: CatalogIngredient[]): string {
  const base = slugify(name) || 'ingredient'
  if (!existing.some((c) => c.id === base)) return base
  let n = 2
  while (existing.some((c) => c.id === `${base}-${n}`)) n++
  return `${base}-${n}`
}

/**
 * Initial seed catalog — intentionally empty.
 *
 * The real catalog lives in localStorage (persisted by store.ts) and in
 * Export/Import backups. Bundled ingredient images remain available to pick
 * from via the image registry (import.meta.glob in imageRegistry.ts).
 */
export const catalogIngredients: CatalogIngredient[] = []

// Known name → canonical catalog id mappings for migrating legacy data
// (recipe ingredient lines that predate ingredientId). Empty now that the
// seed data is gone; canonicalIngredientId falls back to a name slug.
const CANONICAL: Record<string, string> = {}

/** A catalog id for a recipe ingredient name (known mapping, else a slug). */
export function canonicalIngredientId(name: string): string {
  return CANONICAL[name] ?? slugify(name.split(',')[0]) ?? slugify(name) ?? 'ingredient'
}

/** Title-case a catalog id into a display name (for auto-created entries). */
export function nameFromId(id: string): string {
  return id
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}
