import type { Recipe } from './types'
import capreseImage from '../../assets/images/recipes/classic-caprese-salad.png'
import chickenImage from '../../assets/images/recipes/lemon-herb-roasted-chicken.png'
import sourdoughImage from '../../assets/images/recipes/artisan-sourdough.png'

/**
 * Seed recipes for the Stitch "Culinary Zen" design.
 *
 * Dish hero photos are bundled under assets/images/recipes/. Ingredient images
 * are resolved from the ingredient catalog via each ingredient's `ingredientId`
 * — the detail-page gallery is derived (see galleryForRecipe), not stored here.
 */
const img = {
  // Dish hero photos (bundled locally).
  chicken: chickenImage,
  caprese: capreseImage,
  sourdough: sourdoughImage,
}

const daysAgo = (n: number): string =>
  new Date(Date.now() - n * 24 * 60 * 60 * 1000).toISOString()

// How many days ago each seed recipe was "added" (drives the date-based New
// tag). Only the bean salad is recent; the rest are well over 4 days old.
const ageDaysBySlug: Record<string, number> = {
  'easy-italian-bean-salad': 0,
  'lemon-herb-roasted-chicken': 12,
  'classic-caprese-salad': 18,
  'artisan-sourdough': 7,
  'roasted-tomato-basil-soup': 10,
}

const seed: Omit<Recipe, 'createdAt'>[] = [
  {
    id: '1',
    slug: 'classic-caprese-salad',
    title: 'Classic Caprese Salad',
    category: 'Appetizer',
    tags: ['Vegetarian', 'Appetizer', 'Salad'],
    excerpt:
      'A crisp, revitalizing assembly of fresh tomatoes, creamy mozzarella, and fragrant basil.',
    description:
      'A timeless Italian classic that celebrates the simplicity of fresh ingredients. Creamy buffalo mozzarella, sun-ripened tomatoes, and fragrant basil are brought together with a drizzle of premium extra virgin olive oil and a pinch of sea salt.',
    image: img.caprese,
    imageAlt:
      'A vibrant caprese salad of sliced heirloom tomatoes and buffalo mozzarella layered with fresh basil leaves.',
    time: '10 mins',
    servings: '2 Servings',
    difficulty: 'Easy',
    servingsIcon: 'restaurant',
    difficultyIcon: 'signal_cellular_alt',
    calories: '190 kcal',
    featured: true,
    favorite: true,
    ingredients: [
      { id: 'i1', amount: '2 large', ingredientId: 'heirloom-tomatoes' },
      { id: 'i2', amount: '8 oz', ingredientId: 'buffalo-mozzarella' },
      { id: 'i3', amount: '1 bunch', ingredientId: 'fresh-basil' },
      { id: 'i4', amount: '2 tbsp', ingredientId: 'extra-virgin-olive-oil' },
      { id: 'i5', amount: 'to taste', ingredientId: 'salt-and-pepper' },
    ],
    steps: [
      {
        title: 'Prepare the Ingredients',
        description:
          'Wash and dry the tomatoes and basil. Slice the tomatoes and buffalo mozzarella into thick, even rounds.',
      },
      {
        title: 'Layer the Salad',
        description:
          'On a large serving platter, alternate slices of tomato and mozzarella, tucking a fresh basil leaf between each layer.',
      },
      {
        title: 'Season and Dress',
        description: 'Drizzle the extra virgin olive oil generously over the arranged salad.',
      },
      {
        title: 'Final Touch',
        description:
          'Sprinkle with a pinch of sea salt and a few grinds of black pepper. Serve immediately at room temperature for the best flavor.',
      },
    ],
  },
  {
    id: '2',
    slug: 'easy-italian-bean-salad',
    title: 'Easy Italian Bean Salad',
    category: 'Salad',
    tags: ['Salad', 'Italian', 'Vegan'],
    excerpt:
      'Creamy cannellini and borlotti beans tossed with cherry tomatoes, red onion, and a bright lemon-herb dressing.',
    description:
      'A no-cook Italian salad that comes together in minutes. Two kinds of beans are folded through juicy cherry tomatoes, thinly sliced red onion, and plenty of parsley, then dressed simply with good olive oil, lemon, and garlic.',
    image: '',
    imageAlt: 'Easy Italian Bean Salad',
    time: '15 mins',
    servings: '4 Servings',
    difficulty: 'Easy',
    servingsIcon: 'restaurant',
    difficultyIcon: 'signal_cellular_alt',
    calories: '240 kcal',
    favorite: false,
    ingredients: [
      { id: 'i4', amount: '1/2', ingredientId: 'red-onion' },
      { id: 'i6', amount: '3 tbsp', ingredientId: 'extra-virgin-olive-oil' },
      { id: 'i7', amount: '1', ingredientId: 'lemon' },
      { id: 'i8', amount: '1', ingredientId: 'garlic' },
    ],
    steps: [
      {
        title: 'Combine',
        description:
          'Tip both cans of drained beans into a large bowl with the cherry tomatoes, red onion, and parsley.',
      },
      {
        title: 'Dress',
        description:
          'Whisk the olive oil, lemon juice, and grated garlic together, then pour over the salad.',
      },
      {
        title: 'Toss and Rest',
        description:
          'Toss gently to coat, season to taste, and rest for 10 minutes so the flavours meld before serving.',
      },
    ],
  },
  {
    id: '3',
    slug: 'lemon-herb-roasted-chicken',
    title: 'Lemon Herb Roasted Chicken',
    category: 'Dinner',
    tags: ['Dinner', 'Roast', 'Family'],
    excerpt:
      'A comforting classic elevated with bright citrus and fragrant rosemary. Perfect for a mindful Sunday dinner that fills the home with warmth.',
    description:
      'A comforting classic elevated with bright citrus and fragrant rosemary. Roasted low and slow until the skin turns golden and crisp, this is the kind of meal that fills the whole home with warmth.',
    image: img.chicken,
    imageAlt:
      'A beautifully plated whole roasted chicken with a golden-brown herb crust, garnished with lemon wedges and rosemary on a rustic ceramic platter.',
    time: '1h 30m',
    servings: '4 Servings',
    difficulty: 'Medium',
    servingsIcon: 'restaurant',
    difficultyIcon: 'signal_cellular_alt_2_bar',
    calories: '520 kcal',
    favorite: false,
    ingredients: [
      { id: 'i1', amount: '1 (1.5kg)', ingredientId: 'whole-chicken' },
      { id: 'i2', amount: '2', ingredientId: 'lemon' },
      { id: 'i3', amount: '4', ingredientId: 'rosemary' },
      { id: 'i4', amount: '6', ingredientId: 'garlic' },
      { id: 'i5', amount: '3 tbsp', ingredientId: 'extra-virgin-olive-oil' },
      { id: 'i6', amount: 'to taste', ingredientId: 'salt-and-pepper' },
    ],
    steps: [
      {
        title: 'Prepare the Bird',
        description:
          'Pat the chicken completely dry and bring it to room temperature. Rub all over with olive oil, then season generously inside and out.',
      },
      {
        title: 'Aromatics',
        description:
          'Tuck the halved lemons, garlic, and rosemary into the cavity. Truss the legs to help the bird cook evenly.',
      },
      {
        title: 'Roast',
        description:
          'Roast at 200°C for 75–90 minutes, basting once, until the juices run clear and the skin is deeply golden.',
      },
      {
        title: 'Rest and Serve',
        description:
          'Let the chicken rest for 15 minutes before carving so the juices settle. Serve with the pan drippings.',
      },
    ],
  },
  
  {
    id: '4',
    slug: 'artisan-sourdough',
    title: 'Artisan Sourdough',
    category: 'Baking',
    tags: ['Baking', 'Bread', 'Slow'],
    excerpt:
      'The meditative process of wild yeast fermentation, resulting in a perfectly crackling crust.',
    description:
      'The meditative process of wild yeast fermentation, resulting in an open, tender crumb and a perfectly crackling, blistered crust. Patience is the key ingredient.',
    image: img.sourdough,
    imageAlt:
      'A round loaf of rustic sourdough with a deeply caramelized, blistered crust and intricate scoring, on a wooden board.',
    time: '24h',
    servings: '1 Loaf',
    difficulty: 'Medium',
    servingsIcon: 'bakery_dining',
    difficultyIcon: 'signal_cellular_alt_2_bar',
    calories: '180 kcal / slice',
    favorite: false,
    ingredients: [
    ],
    steps: [
      {
        title: 'Autolyse',
        description:
          'Mix the flour and water and rest for one hour to let the flour hydrate fully.',
      },
      {
        title: 'Bulk Ferment',
        description:
          'Add the starter and salt. Perform a series of stretch-and-folds over 4–5 hours until the dough is airy.',
      },
      {
        title: 'Shape and Proof',
        description:
          'Shape into a tight boule, then cold-proof in the fridge overnight for flavor.',
      },
      {
        title: 'Score and Bake',
        description:
          'Score the chilled dough and bake in a preheated Dutch oven at 230°C until deeply golden.',
      },
    ],
  },
  {
    id: '5',
    slug: 'roasted-tomato-basil-soup',
    title: 'Roasted Tomato & Basil Soup',
    category: 'Lunch',
    tags: ['Soup', 'Vegetarian', 'Cozy'],
    excerpt:
      'Vine tomatoes slow-roasted until jammy, then blitzed with fresh basil into a velvety, soul-warming bowl.',
    description:
      'Roasting concentrates the tomatoes into something deep and sweet before they are blended smooth with garlic and a handful of fresh basil. Simple, nourishing, and endlessly comforting on a quiet afternoon.',
    image: '',
    imageAlt: 'Branded Culinary Zen illustration of Roasted Tomato and Basil Soup.',
    time: '50m',
    servings: '4 Servings',
    difficulty: 'Easy',
    servingsIcon: 'restaurant',
    difficultyIcon: 'signal_cellular_alt',
    calories: '180 kcal',
    favorite: false,
    ingredients: [
      { id: 'i2', amount: '1', ingredientId: 'red-onion' },
      { id: 'i3', amount: '4', ingredientId: 'garlic' },
      { id: 'i6', amount: '1 large handful', ingredientId: 'fresh-basil' },
    ],
    steps: [
      {
        title: 'Roast',
        description:
          'Toss the tomatoes, onion, and garlic with olive oil and roast at 200°C for 35 minutes until caramelised at the edges.',
      },
      {
        title: 'Blend',
        description:
          'Tip the roasted vegetables into a pot with the stock and most of the basil, then blend until completely smooth.',
      },
      {
        title: 'Warm Through',
        description:
          'Gently reheat, loosening with a little extra stock or water to your preferred consistency.',
      },
      {
        title: 'Serve',
        description:
          'Season to taste and finish with the remaining torn basil and a swirl of olive oil.',
      },
    ],
  },
]

export const recipes: Recipe[] = seed.map((recipe) => ({
  ...recipe,
  createdAt: daysAgo(ageDaysBySlug[recipe.slug] ?? 10),
}))
