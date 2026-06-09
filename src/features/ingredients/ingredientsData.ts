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
  ['aubergine', 'Aubergine'],
  ['bacon', 'Bacon'],
  ['bread-flour', 'Bread Flour'],
  ['buffalo-mozzarella', 'Buffalo Mozzarella'],
  ['butter', 'Butter'],
  ['caster-sugar', 'Caster Sugar'],
  ['chicken-breast', 'Chicken Breast'],
  ['chickpeas', 'Chickpeas'],
  ['coconut-milk', 'Coconut Milk'],
  ['coriander', 'Coriander'],
  ['cream', 'Cream'],
  ['cucumber', 'Cucumber'],
  ['dark-chocolate', 'Dark Chocolate'],
  ['eggs', 'Eggs'],
  ['extra-virgin-olive-oil', 'Extra Virgin Olive Oil'],
  ['feta', 'Feta'],
  ['fettuccine', 'Fettuccine'],
  ['fresh-basil', 'Fresh Basil'],
  ['garlic', 'Garlic'],
  ['heirloom-tomatoes', 'Heirloom Tomatoes'],
  ['lemon', 'Lemon'],
  ['lime', 'Lime'],
  ['minced-beef', 'Minced Beef'],
  ['onion', 'Onion'],
  ['parmesan', 'Parmesan'],
  ['peanuts', 'Peanuts'],
  ['plain-flour', 'Plain Flour'],
  ['prawns', 'Prawns'],
  ['red-onion', 'Red Onion'],
  ['rice-noodles', 'Rice Noodles'],
  ['rosemary', 'Rosemary'],
  ['sesame-seeds', 'Sesame Seeds'],
  ['spaghetti', 'Spaghetti'],
]

export const catalogIngredients: CatalogIngredient[] = SEED.map(([key, name]) => ({
  id: key,
  name,
  imageKey: key,
}))
