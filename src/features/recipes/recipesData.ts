import type { Recipe } from './types'
import risottoImg from '../../assets/recipes/wild-mushroom-risotto.svg'
import tomatoSoupImg from '../../assets/recipes/roasted-tomato-basil-soup.svg'
import turmericLatteImg from '../../assets/recipes/golden-turmeric-latte.svg'

/**
 * Seed recipes for the Stitch "Culinary Zen" design.
 *
 * Copy is from the original Stitch design files. The placeholder images those
 * files used were temporary (expiring) Google-hosted URLs, so the image URLs
 * here point at TheMealDB (https://www.themealdb.com) — a free, key-less food
 * database whose media URLs are stable: meal thumbnails for the dish photos and
 * dedicated ingredient images for the galleries.
 */
const meals = 'https://www.themealdb.com/images/media/meals'
const ingredients = 'https://www.themealdb.com/images/ingredients'

const img = {
  // Dish photos (stable TheMealDB meal thumbnails).
  chicken: `${meals}/cj56fs1762340001.jpg`,
  eggplant: `${meals}/1oz4nb1765687990.jpg`,
  caprese: `${meals}/k29viq1585565980.jpg`,
  sourdough: `${meals}/lmc6r51764365554.jpg`,
  matcha: `${meals}/1549542877.jpg`,
  // Ingredient photos (stable TheMealDB ingredient images).
  rosemary: `${ingredients}/Rosemary.png`,
  lemon: `${ingredients}/Lemon.png`,
  aubergine: `${ingredients}/Aubergine.png`,
  sesame: `${ingredients}/Sesame%20Seed.png`,
  tomato: `${ingredients}/Tomatoes.png`,
  mozzarella: `${ingredients}/Mozzarella.png`,
  basil: `${ingredients}/Basil.png`,
  oliveOil: `${ingredients}/Olive%20Oil.png`,
  breadFlour: `${ingredients}/Bread%20Flour.png`,
  cream: `${ingredients}/Cream.png`,
}

export const recipes: Recipe[] = [
  {
    id: '1',
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
    featured: true,
    favorite: false,
    ingredients: [
      { id: 'i1', name: 'Whole chicken', amount: '1 (1.5kg)' },
      { id: 'i2', name: 'Lemons, halved', amount: '2' },
      { id: 'i3', name: 'Fresh rosemary sprigs', amount: '4' },
      { id: 'i4', name: 'Garlic cloves', amount: '6' },
      { id: 'i5', name: 'Extra virgin olive oil', amount: '3 tbsp' },
      { id: 'i6', name: 'Sea salt and black pepper', amount: 'to taste' },
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
    gallery: [
      { label: 'Fresh Rosemary', image: img.rosemary },
      { label: 'Lemons', image: img.lemon },
    ],
  },
  {
    id: '2',
    slug: 'miso-glazed-eggplant',
    title: 'Miso Glazed Eggplant',
    category: 'Vegan',
    tags: ['Vegan', 'Japanese', 'Side'],
    excerpt:
      'Rich, umami-packed eggplant roasted until tender with a sweet and savory miso glaze.',
    description:
      'Rich, umami-packed eggplant roasted until meltingly tender, then lacquered with a sweet and savory miso glaze and finished with toasted sesame.',
    image: img.eggplant,
    imageAlt:
      'Two halves of scored, roasted eggplant coated in a glossy dark miso glaze, topped with toasted sesame seeds and sliced scallions.',
    time: '35m',
    servings: '2 Servings',
    difficulty: 'Easy',
    servingsIcon: 'restaurant',
    difficultyIcon: 'signal_cellular_alt',
    calories: '210 kcal',
    favorite: false,
    ingredients: [
      { id: 'i1', name: 'Japanese eggplant, halved', amount: '2' },
      { id: 'i2', name: 'White miso paste', amount: '3 tbsp' },
      { id: 'i3', name: 'Mirin', amount: '2 tbsp' },
      { id: 'i4', name: 'Toasted sesame oil', amount: '1 tbsp' },
      { id: 'i5', name: 'Scallions, sliced', amount: '2' },
      { id: 'i6', name: 'Toasted sesame seeds', amount: '1 tsp' },
    ],
    steps: [
      {
        title: 'Score and Roast',
        description:
          'Score the cut side of each eggplant in a diamond pattern, brush with sesame oil, and roast at 220°C for 20 minutes until soft.',
      },
      {
        title: 'Make the Glaze',
        description:
          'Whisk the miso and mirin into a smooth, spreadable glaze.',
      },
      {
        title: 'Glaze and Broil',
        description:
          'Spread the glaze over the roasted eggplant and broil for 3–4 minutes until caramelized and bubbling.',
      },
      {
        title: 'Garnish',
        description:
          'Scatter with sliced scallions and toasted sesame seeds. Serve warm.',
      },
    ],
    gallery: [
      { label: 'Aubergine', image: img.aubergine },
      { label: 'Sesame Seeds', image: img.sesame },
    ],
  },
  {
    id: '3',
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
    favorite: true,
    ingredients: [
      { id: 'i1', name: 'Heirloom Tomatoes, sliced', amount: '2 large' },
      { id: 'i2', name: 'Buffalo Mozzarella, sliced', amount: '8 oz' },
      { id: 'i3', name: 'Fresh Basil leaves', amount: '1 bunch' },
      { id: 'i4', name: 'Extra Virgin Olive Oil', amount: '2 tbsp' },
      { id: 'i5', name: 'Sea salt and black pepper', amount: 'to taste' },
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
    gallery: [
      { label: 'Heirloom Tomatoes', image: img.tomato },
      { label: 'Buffalo Mozzarella', image: img.mozzarella },
      { label: 'Fresh Basil', image: img.basil },
      { label: 'Extra Virgin Olive Oil', image: img.oliveOil },
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
      { id: 'i1', name: 'Bread flour', amount: '500 g' },
      { id: 'i2', name: 'Active sourdough starter', amount: '100 g' },
      { id: 'i3', name: 'Water', amount: '350 g' },
      { id: 'i4', name: 'Fine sea salt', amount: '10 g' },
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
    gallery: [{ label: 'Bread Flour', image: img.breadFlour }],
  },
  {
    id: '5',
    slug: 'matcha-panna-cotta',
    title: 'Matcha Panna Cotta',
    category: 'Dessert',
    tags: ['Dessert', 'Make-ahead', 'Gluten-free'],
    excerpt:
      'Silky, earthy, and lightly sweetened. A calming end to any meal requiring minimal active prep.',
    description:
      'Silky, earthy, and lightly sweetened. This make-ahead dessert sets to a delicate wobble and offers a calming, refined end to any meal with minimal active prep.',
    image: img.matcha,
    imageAlt:
      'A delicate, vibrant green matcha panna cotta in a minimalist glass cup, topped with edible white flowers and a drizzle of dark syrup.',
    time: '4h',
    servings: '4 Servings',
    difficulty: 'Easy',
    servingsIcon: 'restaurant',
    difficultyIcon: 'signal_cellular_alt',
    calories: '240 kcal',
    favorite: false,
    ingredients: [
      { id: 'i1', name: 'Heavy cream', amount: '400 ml' },
      { id: 'i2', name: 'Whole milk', amount: '100 ml' },
      { id: 'i3', name: 'Culinary matcha powder', amount: '2 tsp' },
      { id: 'i4', name: 'Caster sugar', amount: '50 g' },
      { id: 'i5', name: 'Gelatin sheets', amount: '3' },
    ],
    steps: [
      {
        title: 'Bloom the Gelatin',
        description: 'Soak the gelatin sheets in cold water until soft and pliable.',
      },
      {
        title: 'Warm the Cream',
        description:
          'Gently heat the cream, milk, and sugar, whisking in the sifted matcha until smooth. Do not boil.',
      },
      {
        title: 'Combine',
        description:
          'Squeeze out the gelatin and stir it into the warm matcha cream until dissolved.',
      },
      {
        title: 'Set',
        description:
          'Pour into glasses and chill for at least 4 hours until just set with a gentle wobble.',
      },
    ],
    gallery: [{ label: 'Heavy Cream', image: img.cream }],
  },
  {
    id: '6',
    slug: 'wild-mushroom-risotto',
    title: 'Wild Mushroom Risotto',
    category: 'Dinner',
    tags: ['Vegetarian', 'Italian', 'Comfort'],
    excerpt:
      'Creamy arborio rice slow-stirred with earthy wild mushrooms, white wine, and a generous shower of parmesan.',
    description:
      'A meditative dish that rewards patience. Arborio rice is coaxed to a silky finish one ladle at a time, then folded through with pan-seared wild mushrooms, fresh thyme, and aged parmesan for a deeply savoury bowl of comfort.',
    image: risottoImg,
    imageAlt: 'Branded Culinary Zen illustration of Wild Mushroom Risotto.',
    time: '40m',
    servings: '4 Servings',
    difficulty: 'Medium',
    servingsIcon: 'restaurant',
    difficultyIcon: 'signal_cellular_alt_2_bar',
    calories: '430 kcal',
    favorite: false,
    ingredients: [
      { id: 'i1', name: 'Arborio rice', amount: '300 g' },
      { id: 'i2', name: 'Mixed wild mushrooms', amount: '400 g' },
      { id: 'i3', name: 'Shallot, finely diced', amount: '1' },
      { id: 'i4', name: 'Garlic cloves, minced', amount: '2' },
      { id: 'i5', name: 'Dry white wine', amount: '125 ml' },
      { id: 'i6', name: 'Warm vegetable stock', amount: '1 L' },
      { id: 'i7', name: 'Parmesan, grated', amount: '60 g' },
      { id: 'i8', name: 'Butter', amount: '30 g' },
      { id: 'i9', name: 'Fresh thyme', amount: '2 sprigs' },
    ],
    steps: [
      {
        title: 'Sear the Mushrooms',
        description:
          'Sauté the wild mushrooms in a little butter over high heat until golden, then set aside.',
      },
      {
        title: 'Build the Base',
        description:
          'Soften the shallot and garlic, stir in the rice to toast for a minute, then deglaze with the white wine.',
      },
      {
        title: 'Stir and Ladle',
        description:
          'Add the warm stock one ladle at a time, stirring often, until each addition is absorbed and the rice is creamy and al dente.',
      },
      {
        title: 'Finish',
        description:
          'Fold the mushrooms, parmesan, butter, and thyme through the risotto. Rest for two minutes, then serve.',
      },
    ],
    gallery: [],
  },
  {
    id: '7',
    slug: 'roasted-tomato-basil-soup',
    title: 'Roasted Tomato & Basil Soup',
    category: 'Lunch',
    tags: ['Soup', 'Vegetarian', 'Cozy'],
    excerpt:
      'Vine tomatoes slow-roasted until jammy, then blitzed with fresh basil into a velvety, soul-warming bowl.',
    description:
      'Roasting concentrates the tomatoes into something deep and sweet before they are blended smooth with garlic and a handful of fresh basil. Simple, nourishing, and endlessly comforting on a quiet afternoon.',
    image: tomatoSoupImg,
    imageAlt: 'Branded Culinary Zen illustration of Roasted Tomato and Basil Soup.',
    time: '50m',
    servings: '4 Servings',
    difficulty: 'Easy',
    servingsIcon: 'restaurant',
    difficultyIcon: 'signal_cellular_alt',
    calories: '180 kcal',
    favorite: false,
    ingredients: [
      { id: 'i1', name: 'Ripe vine tomatoes', amount: '1 kg' },
      { id: 'i2', name: 'Red onion, quartered', amount: '1' },
      { id: 'i3', name: 'Garlic cloves', amount: '4' },
      { id: 'i4', name: 'Extra virgin olive oil', amount: '3 tbsp' },
      { id: 'i5', name: 'Vegetable stock', amount: '500 ml' },
      { id: 'i6', name: 'Fresh basil', amount: '1 large handful' },
      { id: 'i7', name: 'Sea salt and black pepper', amount: 'to taste' },
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
    gallery: [],
  },
  {
    id: '8',
    slug: 'golden-turmeric-latte',
    title: 'Golden Turmeric Latte',
    category: 'Drink',
    tags: ['Vegan', 'Drink', 'Cozy'],
    excerpt:
      'A soothing, caffeine-free blend of turmeric, ginger, and warm spices frothed into creamy plant milk.',
    description:
      'Often called golden milk, this gently spiced latte is a calming ritual in a cup. Turmeric and fresh ginger are warmed with oat milk and a whisper of black pepper to help everything bloom, then sweetened with a touch of maple.',
    image: turmericLatteImg,
    imageAlt: 'Branded Culinary Zen illustration of a Golden Turmeric Latte.',
    time: '10m',
    servings: '1 Serving',
    difficulty: 'Easy',
    servingsIcon: 'local_cafe',
    difficultyIcon: 'signal_cellular_alt',
    calories: '90 kcal',
    favorite: false,
    ingredients: [
      { id: 'i1', name: 'Oat milk', amount: '300 ml' },
      { id: 'i2', name: 'Ground turmeric', amount: '1 tsp' },
      { id: 'i3', name: 'Fresh ginger, grated', amount: '1 tsp' },
      { id: 'i4', name: 'Ground cinnamon', amount: '1/4 tsp' },
      { id: 'i5', name: 'Black pepper', amount: '1 pinch' },
      { id: 'i6', name: 'Maple syrup', amount: '1 tsp' },
      { id: 'i7', name: 'Vanilla extract', amount: '1/4 tsp' },
    ],
    steps: [
      {
        title: 'Warm',
        description:
          'Add all the ingredients to a small saucepan and warm gently over a low heat, whisking to combine.',
      },
      {
        title: 'Infuse',
        description:
          'Let it steep just below a simmer for 3–4 minutes so the spices bloom — do not let it boil.',
      },
      {
        title: 'Froth and Serve',
        description:
          'Whisk briskly until light and frothy, then pour into your favourite mug.',
      },
    ],
    gallery: [],
  },
]
