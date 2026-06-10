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
  'Active sourdough starter': 'sourdough-starter',
  'Arborio rice': 'arborio-rice',
  'Baking powder': 'baking-powder',
  'Black pepper': 'black-pepper',
  'Borlotti beans, drained': 'borlotti-beans',
  'Bread flour': 'bread-flour',
  'Buffalo Mozzarella, sliced': 'buffalo-mozzarella',
  'Butter, flour and milk': 'bechamel',
  'Butter, melted': 'butter',
  'Caster sugar': 'caster-sugar',
  'Cherry tomatoes, halved': 'heirloom-tomatoes',
  'Chicken breast, sliced': 'chicken-breast',
  'Coconut milk': 'coconut-milk',
  'Cucumber, chunked': 'cucumber',
  'Culinary matcha powder': 'matcha',
  'Cumin and ground coriander': 'cumin-coriander',
  'Cumin and paprika': 'cumin-paprika',
  'Dark chocolate': 'dark-chocolate',
  'Double cream (optional)': 'cream',
  'Dried chickpeas, soaked': 'chickpeas',
  'Dry white wine': 'white-wine',
  Egg: 'eggs',
  'Egg yolks': 'eggs',
  Eggs: 'eggs',
  'Extra Virgin Olive Oil': 'extra-virgin-olive-oil',
  'Extra virgin olive oil': 'extra-virgin-olive-oil',
  'Feta': 'feta',
  Fettuccine: 'fettuccine',
  'Fine sea salt': 'sea-salt',
  'Flat rice noodles': 'rice-noodles',
  'Flatbreads and tahini': 'flatbread-tahini',
  'Fresh Basil leaves': 'fresh-basil',
  'Fresh basil': 'fresh-basil',
  'Fresh coriander and parsley': 'coriander',
  'Fresh ginger, grated': 'ginger',
  'Fresh mozzarella, torn': 'buffalo-mozzarella',
  'Fresh parsley, chopped': 'parsley',
  'Fresh rosemary sprigs': 'rosemary',
  'Fresh thyme': 'thyme',
  Garlic: 'garlic',
  'Garlic clove, grated': 'garlic',
  'Garlic cloves': 'garlic',
  'Garlic cloves, minced': 'garlic',
  'Garlic, minced': 'garlic',
  'Garlic, sliced': 'garlic',
  'Gelatin sheets': 'gelatin',
  'Green curry paste': 'green-curry-paste',
  'Ground cinnamon': 'cinnamon',
  'Ground turmeric': 'turmeric',
  'Heirloom Tomatoes, sliced': 'heirloom-tomatoes',
  'Heavy cream': 'cream',
  'Japanese eggplant, halved': 'aubergine',
  'Lemon, juiced': 'lemon',
  'Lemons, halved': 'lemon',
  Lime: 'lime',
  'Maple syrup': 'maple-syrup',
  Milk: 'milk',
  'Mixed wild mushrooms': 'mushrooms',
  'Minced beef': 'minced-beef',
  Mirin: 'mirin',
  'Oat milk': 'oat-milk',
  'Olive oil and dried oregano': 'extra-virgin-olive-oil',
  'Onion, diced': 'onion',
  'Onion, sliced': 'onion',
  'Pancetta or bacon, diced': 'bacon',
  'Parmesan, finely grated': 'parmesan',
  'Parmesan, grated': 'parmesan',
  'Passata or crushed tomatoes': 'heirloom-tomatoes',
  'Pecorino or parmesan, grated': 'parmesan',
  Penne: 'penne',
  'Pizza dough': 'pizza-dough',
  'Prawns': 'prawns',
  'Red chilli flakes': 'chilli-flakes',
  'Red onion, quartered': 'red-onion',
  'Red onion, sliced': 'red-onion',
  'Red onion, thinly sliced': 'red-onion',
  'Ripe vine tomatoes': 'heirloom-tomatoes',
  'Roasted peanuts, crushed': 'peanuts',
  'Sea salt and black pepper': 'salt-and-pepper',
  'Scallions, sliced': 'scallions',
  'Shallot, finely diced': 'shallot',
  Spaghetti: 'spaghetti',
  'Tamarind, fish sauce and sugar': 'pad-thai-sauce',
  'Thai basil': 'thai-basil',
  'Toasted sesame oil': 'sesame-oil',
  'Toasted sesame seeds': 'sesame-seeds',
  'Tinned tomatoes': 'heirloom-tomatoes',
  'Tomatoes, in wedges': 'heirloom-tomatoes',
  'Vegetable stock': 'vegetable-stock',
  'Warm vegetable stock': 'vegetable-stock',
  Water: 'water',
  'White miso paste': 'miso-paste',
  'Whole chicken': 'whole-chicken',
  'Whole milk': 'milk',
  'Vanilla extract': 'vanilla',
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
