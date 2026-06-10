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

// Seed catalog: one entry per bundled ingredient image. The id equals the image
// key (the source filename slug), and also equals slugify(name) — so legacy
// recipe ingredient names map straight onto these ids.
const SEED: Array<[string, string]> = [

  ['buffalo-mozzarella', 'Buffalo Mozzarella'],
  ['butter', 'Butter'],
  ['caster-sugar', 'Caster Sugar'],
  ['extra-virgin-olive-oil', 'Extra Virgin Olive Oil'],
  ['fresh-basil', 'Fresh Basil'],
  ['garlic', 'Garlic'],
  ['lemon', 'Lemon'],
  ['parmesan', 'Parmesan'],
  ['red-onion', 'Red Onion'],
]

// Ingredients used by recipes that don't (yet) have a bundled image.
const IMAGELESS: Array<[string, string]> = [
  ['black-pepper', 'Black Pepper'],
  ['sea-salt', 'Sea Salt'],
]

export const catalogIngredients: CatalogIngredient[] = [
  ...SEED.map(([key, name]) => ({ id: key, name, imageKey: key })),
  ...IMAGELESS.map(([id, name]) => ({ id, name })),
]

// Maps the recipe ingredient names used in the seed to a canonical catalog id.
// Prep-variants collapse to one id (all "Garlic …" → garlic); tomatoes reuse the
// single tomato image; ids without a bundled image are created image-less by the
// load migration (see store.ts).
const CANONICAL: Record<string, string> = {
  'Black pepper': 'black-pepper',
  'Extra Virgin Olive Oil': 'extra-virgin-olive-oil',
  Garlic: 'garlic',
}

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
