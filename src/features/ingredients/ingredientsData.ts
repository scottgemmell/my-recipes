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

// Ingredients used by recipes that don't (yet) have a bundled image.
const IMAGELESS: Array<[string, string]> = [
  ['arborio-rice', 'Arborio Rice'],
  ['baking-powder', 'Baking Powder'],
  ['bechamel', 'Béchamel'],
  ['black-pepper', 'Black Pepper'],
  ['borlotti-beans', 'Borlotti Beans'],
  ['cannellini-beans', 'Cannellini Beans'],
  ['chilli-flakes', 'Chilli Flakes'],
  ['cinnamon', 'Cinnamon'],
  ['cumin-coriander', 'Cumin & Coriander'],
  ['cumin-paprika', 'Cumin & Paprika'],
  ['flatbread-tahini', 'Flatbreads & Tahini'],
  ['gelatin', 'Gelatin'],
  ['ginger', 'Ginger'],
  ['green-curry-paste', 'Green Curry Paste'],
  ['lasagne-sheets', 'Lasagne Sheets'],
  ['maple-syrup', 'Maple Syrup'],
  ['milk', 'Milk'],
  ['miso-paste', 'Miso Paste'],
  ['mirin', 'Mirin'],
  ['mushrooms', 'Wild Mushrooms'],
  ['oat-milk', 'Oat Milk'],
  ['pad-thai-sauce', 'Tamarind, Fish Sauce & Sugar'],
  ['parsley', 'Parsley'],
  ['penne', 'Penne'],
  ['pizza-dough', 'Pizza Dough'],
  ['salt-and-pepper', 'Salt & Pepper'],
  ['scallions', 'Scallions'],
  ['sea-salt', 'Sea Salt'],
  ['sesame-oil', 'Sesame Oil'],
  ['shallot', 'Shallot'],
  ['sourdough-starter', 'Sourdough Starter'],
  ['thai-basil', 'Thai Basil'],
  ['thyme', 'Thyme'],
  ['turmeric', 'Turmeric'],
  ['vanilla', 'Vanilla'],
  ['vegetable-stock', 'Vegetable Stock'],
  ['water', 'Water'],
  ['white-wine', 'White Wine'],
  ['whole-chicken', 'Whole Chicken'],
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
  'Cannellini beans, drained': 'cannellini-beans',
  'Borlotti beans, drained': 'borlotti-beans',
  'Cherry tomatoes, halved': 'heirloom-tomatoes',
  'Red onion, thinly sliced': 'red-onion',
  'Fresh parsley, chopped': 'parsley',
  'Extra virgin olive oil': 'extra-virgin-olive-oil',
  'Lemon, juiced': 'lemon',
  'Garlic clove, grated': 'garlic',
  'Sea salt and black pepper': 'salt-and-pepper',
  'Whole chicken': 'whole-chicken',
  'Lemons, halved': 'lemon',
  'Fresh rosemary sprigs': 'rosemary',
  'Garlic cloves': 'garlic',
  'Japanese eggplant, halved': 'aubergine',
  'White miso paste': 'miso-paste',
  Mirin: 'mirin',
  'Toasted sesame oil': 'sesame-oil',
  'Scallions, sliced': 'scallions',
  'Toasted sesame seeds': 'sesame-seeds',
  'Heirloom Tomatoes, sliced': 'heirloom-tomatoes',
  'Buffalo Mozzarella, sliced': 'buffalo-mozzarella',
  'Fresh Basil leaves': 'fresh-basil',
  'Extra Virgin Olive Oil': 'extra-virgin-olive-oil',
  'Bread flour': 'bread-flour',
  'Active sourdough starter': 'sourdough-starter',
  Water: 'water',
  'Fine sea salt': 'sea-salt',
  'Heavy cream': 'cream',
  'Whole milk': 'milk',
  'Culinary matcha powder': 'matcha',
  'Caster sugar': 'caster-sugar',
  'Gelatin sheets': 'gelatin',
  'Arborio rice': 'arborio-rice',
  'Mixed wild mushrooms': 'mushrooms',
  'Shallot, finely diced': 'shallot',
  'Garlic cloves, minced': 'garlic',
  'Dry white wine': 'white-wine',
  'Warm vegetable stock': 'vegetable-stock',
  'Parmesan, grated': 'parmesan',
  Butter: 'butter',
  'Fresh thyme': 'thyme',
  'Ripe vine tomatoes': 'heirloom-tomatoes',
  'Red onion, quartered': 'red-onion',
  'Vegetable stock': 'vegetable-stock',
  'Fresh basil': 'fresh-basil',
  'Oat milk': 'oat-milk',
  'Ground turmeric': 'turmeric',
  'Fresh ginger, grated': 'ginger',
  'Ground cinnamon': 'cinnamon',
  'Black pepper': 'black-pepper',
  'Maple syrup': 'maple-syrup',
  'Vanilla extract': 'vanilla',
  Spaghetti: 'spaghetti',
  'Pancetta or bacon, diced': 'bacon',
  'Egg yolks': 'eggs',
  'Pecorino or parmesan, grated': 'parmesan',
  'Pizza dough': 'pizza-dough',
  'Passata or crushed tomatoes': 'heirloom-tomatoes',
  'Fresh mozzarella, torn': 'buffalo-mozzarella',
  'Lasagne sheets': 'lasagne-sheets',
  'Minced beef': 'minced-beef',
  'Tinned tomatoes': 'heirloom-tomatoes',
  'Onion, diced': 'onion',
  'Butter, flour and milk': 'bechamel',
  Penne: 'penne',
  'Garlic, sliced': 'garlic',
  'Red chilli flakes': 'chilli-flakes',
  'Garlic, minced': 'garlic',
  Fettuccine: 'fettuccine',
  'Parmesan, finely grated': 'parmesan',
  'Double cream (optional)': 'cream',
  'Flat rice noodles': 'rice-noodles',
  Prawns: 'prawns',
  Egg: 'eggs',
  'Roasted peanuts, crushed': 'peanuts',
  'Tamarind, fish sauce and sugar': 'pad-thai-sauce',
  'Tomatoes, in wedges': 'heirloom-tomatoes',
  'Cucumber, chunked': 'cucumber',
  'Red onion, sliced': 'red-onion',
  Feta: 'feta',
  'Olive oil and dried oregano': 'extra-virgin-olive-oil',
  'Plain flour': 'plain-flour',
  'Baking powder': 'baking-powder',
  Milk: 'milk',
  'Butter, melted': 'butter',
  'Dried chickpeas, soaked': 'chickpeas',
  Garlic: 'garlic',
  'Fresh coriander and parsley': 'coriander',
  'Cumin and ground coriander': 'cumin-coriander',
  'Flatbreads and tahini': 'flatbread-tahini',
  'Dark chocolate': 'dark-chocolate',
  Eggs: 'eggs',
  'Onion, sliced': 'onion',
  'Cumin and paprika': 'cumin-paprika',
  'Chicken breast, sliced': 'chicken-breast',
  'Coconut milk': 'coconut-milk',
  'Green curry paste': 'green-curry-paste',
  Lime: 'lime',
  'Thai basil': 'thai-basil',
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
