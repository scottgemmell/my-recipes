import type { Recipe } from './types'
import capreseImage from '../../assets/images/recipes/classic-caprese-salad.png'
import chickenImage from '../../assets/images/recipes/lemon-herb-roasted-chicken.png'
import eggplantImage from '../../assets/images/recipes/miso-glazed-eggplant.png'
import sourdoughImage from '../../assets/images/recipes/artisan-sourdough.png'
import matchaImage from '../../assets/images/recipes/matcha-panna-cotta.png'
// Additional dish hero photos
import carbonaraImg from '../../assets/images/recipes/spaghetti-carbonara.jpg'
import margheritaImg from '../../assets/images/recipes/margherita-pizza.jpg'
import lasagneImg from '../../assets/images/recipes/classic-lasagne.jpg'
import arrabbiataImg from '../../assets/images/recipes/penne-arrabbiata.jpg'
import bologneseImg from '../../assets/images/recipes/spaghetti-bolognese.jpg'
import alfredoImg from '../../assets/images/recipes/fettuccine-alfredo.jpg'
import padThaiImg from '../../assets/images/recipes/pad-thai.jpg'
import greekSaladImg from '../../assets/images/recipes/greek-salad.jpg'
import pancakesImg from '../../assets/images/recipes/fluffy-pancakes.jpg'
import falafelImg from '../../assets/images/recipes/falafel-wrap.jpg'
import browniesImg from '../../assets/images/recipes/chocolate-brownies.jpg'
import shakshukaImg from '../../assets/images/recipes/shakshuka.jpg'
import greenCurryImg from '../../assets/images/recipes/thai-green-curry.jpg'

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
  eggplant: eggplantImage,
  caprese: capreseImage,
  sourdough: sourdoughImage,
  matcha: matchaImage,
}

const daysAgo = (n: number): string =>
  new Date(Date.now() - n * 24 * 60 * 60 * 1000).toISOString()

// How many days ago each seed recipe was "added" (drives the date-based New
// tag). Only the bean salad is recent; the rest are well over 4 days old.
const ageDaysBySlug: Record<string, number> = {
  'easy-italian-bean-salad': 0,
  'lemon-herb-roasted-chicken': 12,
  'miso-glazed-eggplant': 9,
  'classic-caprese-salad': 18,
  'artisan-sourdough': 7,
  'matcha-panna-cotta': 15,
  'wild-mushroom-risotto': 6,
  'roasted-tomato-basil-soup': 10,
  'golden-turmeric-latte': 5,
}

const seed: Omit<Recipe, 'createdAt'>[] = [
  {
    id: '9',
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
      { id: 'i1', name: 'Cannellini beans, drained', amount: '1 can', ingredientId: 'cannellini-beans' },
      { id: 'i2', name: 'Borlotti beans, drained', amount: '1 can', ingredientId: 'borlotti-beans' },
      { id: 'i3', name: 'Cherry tomatoes, halved', amount: '250 g', ingredientId: 'heirloom-tomatoes' },
      { id: 'i4', name: 'Red onion, thinly sliced', amount: '1/2', ingredientId: 'red-onion' },
      { id: 'i5', name: 'Fresh parsley, chopped', amount: '1 handful', ingredientId: 'parsley' },
      { id: 'i6', name: 'Extra virgin olive oil', amount: '3 tbsp', ingredientId: 'extra-virgin-olive-oil' },
      { id: 'i7', name: 'Lemon, juiced', amount: '1', ingredientId: 'lemon' },
      { id: 'i8', name: 'Garlic clove, grated', amount: '1', ingredientId: 'garlic' },
      { id: 'i9', name: 'Sea salt and black pepper', amount: 'to taste', ingredientId: 'salt-and-pepper' },
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
    favorite: false,
    ingredients: [
      { id: 'i1', name: 'Whole chicken', amount: '1 (1.5kg)', ingredientId: 'whole-chicken' },
      { id: 'i2', name: 'Lemons, halved', amount: '2', ingredientId: 'lemon' },
      { id: 'i3', name: 'Fresh rosemary sprigs', amount: '4', ingredientId: 'rosemary' },
      { id: 'i4', name: 'Garlic cloves', amount: '6', ingredientId: 'garlic' },
      { id: 'i5', name: 'Extra virgin olive oil', amount: '3 tbsp', ingredientId: 'extra-virgin-olive-oil' },
      { id: 'i6', name: 'Sea salt and black pepper', amount: 'to taste', ingredientId: 'salt-and-pepper' },
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
      { id: 'i1', name: 'Japanese eggplant, halved', amount: '2', ingredientId: 'aubergine' },
      { id: 'i2', name: 'White miso paste', amount: '3 tbsp', ingredientId: 'miso-paste' },
      { id: 'i3', name: 'Mirin', amount: '2 tbsp', ingredientId: 'mirin' },
      { id: 'i4', name: 'Toasted sesame oil', amount: '1 tbsp', ingredientId: 'sesame-oil' },
      { id: 'i5', name: 'Scallions, sliced', amount: '2', ingredientId: 'scallions' },
      { id: 'i6', name: 'Toasted sesame seeds', amount: '1 tsp', ingredientId: 'sesame-seeds' },
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
    featured: true,
    favorite: true,
    ingredients: [
      { id: 'i1', name: 'Heirloom Tomatoes, sliced', amount: '2 large', ingredientId: 'heirloom-tomatoes' },
      { id: 'i2', name: 'Buffalo Mozzarella, sliced', amount: '8 oz', ingredientId: 'buffalo-mozzarella' },
      { id: 'i3', name: 'Fresh Basil leaves', amount: '1 bunch', ingredientId: 'fresh-basil' },
      { id: 'i4', name: 'Extra Virgin Olive Oil', amount: '2 tbsp', ingredientId: 'extra-virgin-olive-oil' },
      { id: 'i5', name: 'Sea salt and black pepper', amount: 'to taste', ingredientId: 'salt-and-pepper' },
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
      { id: 'i1', name: 'Bread flour', amount: '500 g', ingredientId: 'bread-flour' },
      { id: 'i2', name: 'Active sourdough starter', amount: '100 g', ingredientId: 'sourdough-starter' },
      { id: 'i3', name: 'Water', amount: '350 g', ingredientId: 'water' },
      { id: 'i4', name: 'Fine sea salt', amount: '10 g', ingredientId: 'sea-salt' },
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
      { id: 'i1', name: 'Heavy cream', amount: '400 ml', ingredientId: 'cream' },
      { id: 'i2', name: 'Whole milk', amount: '100 ml', ingredientId: 'milk' },
      { id: 'i3', name: 'Culinary matcha powder', amount: '2 tsp', ingredientId: 'matcha' },
      { id: 'i4', name: 'Caster sugar', amount: '50 g', ingredientId: 'caster-sugar' },
      { id: 'i5', name: 'Gelatin sheets', amount: '3', ingredientId: 'gelatin' },
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
    image: '',
    imageAlt: 'Branded Culinary Zen illustration of Wild Mushroom Risotto.',
    time: '40m',
    servings: '4 Servings',
    difficulty: 'Medium',
    servingsIcon: 'restaurant',
    difficultyIcon: 'signal_cellular_alt_2_bar',
    calories: '430 kcal',
    favorite: false,
    ingredients: [
      { id: 'i1', name: 'Arborio rice', amount: '300 g', ingredientId: 'arborio-rice' },
      { id: 'i2', name: 'Mixed wild mushrooms', amount: '400 g', ingredientId: 'mushrooms' },
      { id: 'i3', name: 'Shallot, finely diced', amount: '1', ingredientId: 'shallot' },
      { id: 'i4', name: 'Garlic cloves, minced', amount: '2', ingredientId: 'garlic' },
      { id: 'i5', name: 'Dry white wine', amount: '125 ml', ingredientId: 'white-wine' },
      { id: 'i6', name: 'Warm vegetable stock', amount: '1 L', ingredientId: 'vegetable-stock' },
      { id: 'i7', name: 'Parmesan, grated', amount: '60 g', ingredientId: 'parmesan' },
      { id: 'i8', name: 'Butter', amount: '30 g', ingredientId: 'butter' },
      { id: 'i9', name: 'Fresh thyme', amount: '2 sprigs', ingredientId: 'thyme' },
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
      { id: 'i1', name: 'Ripe vine tomatoes', amount: '1 kg', ingredientId: 'heirloom-tomatoes' },
      { id: 'i2', name: 'Red onion, quartered', amount: '1', ingredientId: 'red-onion' },
      { id: 'i3', name: 'Garlic cloves', amount: '4', ingredientId: 'garlic' },
      { id: 'i4', name: 'Extra virgin olive oil', amount: '3 tbsp', ingredientId: 'extra-virgin-olive-oil' },
      { id: 'i5', name: 'Vegetable stock', amount: '500 ml', ingredientId: 'vegetable-stock' },
      { id: 'i6', name: 'Fresh basil', amount: '1 large handful', ingredientId: 'fresh-basil' },
      { id: 'i7', name: 'Sea salt and black pepper', amount: 'to taste', ingredientId: 'salt-and-pepper' },
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
    image: '',
    imageAlt: 'Branded Culinary Zen illustration of a Golden Turmeric Latte.',
    time: '10m',
    servings: '1 Serving',
    difficulty: 'Easy',
    servingsIcon: 'local_cafe',
    difficultyIcon: 'signal_cellular_alt',
    calories: '90 kcal',
    favorite: false,
    ingredients: [
      { id: 'i1', name: 'Oat milk', amount: '300 ml', ingredientId: 'oat-milk' },
      { id: 'i2', name: 'Ground turmeric', amount: '1 tsp', ingredientId: 'turmeric' },
      { id: 'i3', name: 'Fresh ginger, grated', amount: '1 tsp', ingredientId: 'ginger' },
      { id: 'i4', name: 'Ground cinnamon', amount: '1/4 tsp', ingredientId: 'cinnamon' },
      { id: 'i5', name: 'Black pepper', amount: '1 pinch', ingredientId: 'black-pepper' },
      { id: 'i6', name: 'Maple syrup', amount: '1 tsp', ingredientId: 'maple-syrup' },
      { id: 'i7', name: 'Vanilla extract', amount: '1/4 tsp', ingredientId: 'vanilla' },
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
  },
  {
    id: '10',
    slug: 'spaghetti-carbonara',
    title: 'Spaghetti alla Carbonara',
    category: 'Pasta',
    tags: ['Italian', 'Pasta', 'Quick'],
    excerpt:
      'Silky Roman pasta with crisp pancetta, egg, and pecorino — no cream, just technique.',
    description:
      'The classic Roman pasta: hot spaghetti tossed with crisped pancetta and a glossy emulsion of egg yolk and pecorino. The trick is to work off the heat so the eggs turn silky, never scrambled.',
    image: carbonaraImg,
    imageAlt: 'Spaghetti alla Carbonara',
    time: '20 mins',
    servings: '2 Servings',
    difficulty: 'Medium',
    servingsIcon: 'restaurant',
    difficultyIcon: 'signal_cellular_alt',
    calories: '620 kcal',
    favorite: false,
    ingredients: [
      { id: 'i1', name: 'Spaghetti', amount: '200 g', ingredientId: 'spaghetti' },
      { id: 'i2', name: 'Pancetta or bacon, diced', amount: '120 g', ingredientId: 'bacon' },
      { id: 'i3', name: 'Egg yolks', amount: '3', ingredientId: 'eggs' },
      { id: 'i4', name: 'Pecorino or parmesan, grated', amount: '50 g', ingredientId: 'parmesan' },
      { id: 'i5', name: 'Black pepper', amount: 'to taste', ingredientId: 'black-pepper' },
    ],
    steps: [
      {
        title: 'Boil the Pasta',
        description:
          'Cook the spaghetti in well-salted water until al dente, reserving a cup of the starchy water.',
      },
      {
        title: 'Crisp the Pancetta',
        description: 'Fry the pancetta in a dry pan over medium heat until golden and rendered.',
      },
      {
        title: 'Make the Sauce',
        description: 'Whisk the egg yolks with the grated cheese and plenty of black pepper.',
      },
      {
        title: 'Toss Off the Heat',
        description:
          'Drain the pasta into the pancetta, then stir through the egg mix off the heat, loosening with pasta water to a silky sauce.',
      },
    ],
  },
  {
    id: '11',
    slug: 'margherita-pizza',
    title: 'Margherita Pizza',
    category: 'Pizza',
    tags: ['Italian', 'Vegetarian', 'Baking'],
    excerpt: 'Blistered, chewy base with crushed tomato, fresh mozzarella, and basil.',
    description:
      'The pizza that started it all — a thin, blistered base topped simply with crushed tomato, milky mozzarella, and fresh basil, baked as hot as your oven will go.',
    image: margheritaImg,
    imageAlt: 'Margherita Pizza',
    time: '30 mins',
    servings: '1 Pizza',
    difficulty: 'Medium',
    servingsIcon: 'restaurant',
    difficultyIcon: 'signal_cellular_alt',
    calories: '780 kcal',
    favorite: false,
    ingredients: [
      { id: 'i1', name: 'Pizza dough', amount: '1 ball', ingredientId: 'pizza-dough' },
      { id: 'i2', name: 'Passata or crushed tomatoes', amount: '100 ml', ingredientId: 'heirloom-tomatoes' },
      { id: 'i3', name: 'Fresh mozzarella, torn', amount: '125 g', ingredientId: 'buffalo-mozzarella' },
      { id: 'i4', name: 'Fresh basil', amount: 'a few leaves', ingredientId: 'fresh-basil' },
      { id: 'i5', name: 'Extra virgin olive oil', amount: 'to drizzle', ingredientId: 'extra-virgin-olive-oil' },
    ],
    steps: [
      {
        title: 'Heat the Oven',
        description: 'Heat your oven (and a pizza stone or tray) as hot as it will go.',
      },
      {
        title: 'Stretch and Top',
        description: 'Stretch the dough thin, spread with the tomato, and dot with torn mozzarella.',
      },
      { title: 'Bake', description: 'Bake until the crust is blistered and the cheese is bubbling.' },
      {
        title: 'Finish',
        description: 'Scatter with fresh basil and a drizzle of olive oil before serving.',
      },
    ],
  },
  {
    id: '12',
    slug: 'classic-lasagne',
    title: 'Classic Lasagne',
    category: 'Pasta',
    tags: ['Italian', 'Comfort', 'Baking'],
    excerpt: 'Layers of rich beef ragù, creamy béchamel, and pasta baked until golden.',
    description:
      'A weekend project worth the wait: slow-cooked beef ragù layered with pasta sheets and silky béchamel, baked until the top is golden and the edges crisp.',
    image: lasagneImg,
    imageAlt: 'Classic Lasagne',
    time: '2 hrs',
    servings: '6 Servings',
    difficulty: 'Hard',
    servingsIcon: 'restaurant',
    difficultyIcon: 'signal_cellular_alt',
    calories: '560 kcal',
    favorite: false,
    ingredients: [
      { id: 'i1', name: 'Lasagne sheets', amount: '12', ingredientId: 'lasagne-sheets' },
      { id: 'i2', name: 'Minced beef', amount: '500 g', ingredientId: 'minced-beef' },
      { id: 'i3', name: 'Tinned tomatoes', amount: '800 g', ingredientId: 'heirloom-tomatoes' },
      { id: 'i4', name: 'Onion, diced', amount: '1', ingredientId: 'onion' },
      { id: 'i5', name: 'Butter, flour and milk', amount: 'for the béchamel', ingredientId: 'bechamel' },
      { id: 'i6', name: 'Parmesan, grated', amount: '60 g', ingredientId: 'parmesan' },
    ],
    steps: [
      {
        title: 'Build the Ragù',
        description:
          'Brown the beef with the onion, add the tomatoes, and simmer gently for an hour.',
      },
      {
        title: 'Make the Béchamel',
        description: 'Cook butter and flour into a roux, then whisk in the milk until smooth.',
      },
      {
        title: 'Layer',
        description:
          'Alternate ragù, pasta sheets, and béchamel, finishing with béchamel and parmesan.',
      },
      {
        title: 'Bake',
        description:
          'Bake at 190°C for 40 minutes until golden and bubbling, then rest before slicing.',
      },
    ],
  },
  {
    id: '13',
    slug: 'penne-arrabbiata',
    title: "Penne all'Arrabbiata",
    category: 'Pasta',
    tags: ['Italian', 'Vegan', 'Spicy'],
    excerpt:
      'A fiery, garlicky tomato sauce clinging to penne — ready in the time it takes to boil pasta.',
    description:
      '"Arrabbiata" means angry — and this sauce has a kick. Garlic and chilli are sizzled in olive oil, then simmered with tomatoes into a punchy, glossy sauce.',
    image: arrabbiataImg,
    imageAlt: "Penne all'Arrabbiata",
    time: '25 mins',
    servings: '4 Servings',
    difficulty: 'Easy',
    servingsIcon: 'restaurant',
    difficultyIcon: 'signal_cellular_alt',
    calories: '420 kcal',
    favorite: false,
    ingredients: [
      { id: 'i1', name: 'Penne', amount: '320 g', ingredientId: 'penne' },
      { id: 'i2', name: 'Tinned tomatoes', amount: '400 g', ingredientId: 'heirloom-tomatoes' },
      { id: 'i3', name: 'Garlic, sliced', amount: '3 cloves', ingredientId: 'garlic' },
      { id: 'i4', name: 'Red chilli flakes', amount: '1 tsp', ingredientId: 'chilli-flakes' },
      { id: 'i5', name: 'Extra virgin olive oil', amount: '3 tbsp', ingredientId: 'extra-virgin-olive-oil' },
    ],
    steps: [
      {
        title: 'Sizzle',
        description: 'Gently fry the garlic and chilli flakes in olive oil until fragrant.',
      },
      {
        title: 'Simmer',
        description: 'Add the tomatoes and simmer for 15 minutes until thickened and glossy.',
      },
      {
        title: 'Toss',
        description: 'Toss the cooked penne through the sauce, loosening with a little pasta water.',
      },
    ],
  },
  {
    id: '14',
    slug: 'spaghetti-bolognese',
    title: 'Spaghetti Bolognese',
    category: 'Pasta',
    tags: ['Italian', 'Comfort', 'Family'],
    excerpt: 'A deep, slow-simmered beef ragù spooned over spaghetti — proper comfort food.',
    description:
      'Everyone needs a good bolognese. Beef is browned and simmered low and slow with tomatoes and aromatics until rich and savoury, then served over spaghetti.',
    image: bologneseImg,
    imageAlt: 'Spaghetti Bolognese',
    time: '1 hr 15 mins',
    servings: '4 Servings',
    difficulty: 'Easy',
    servingsIcon: 'restaurant',
    difficultyIcon: 'signal_cellular_alt',
    calories: '590 kcal',
    favorite: false,
    ingredients: [
      { id: 'i1', name: 'Spaghetti', amount: '400 g', ingredientId: 'spaghetti' },
      { id: 'i2', name: 'Minced beef', amount: '500 g', ingredientId: 'minced-beef' },
      { id: 'i3', name: 'Tinned tomatoes', amount: '800 g', ingredientId: 'heirloom-tomatoes' },
      { id: 'i4', name: 'Onion, diced', amount: '1', ingredientId: 'onion' },
      { id: 'i5', name: 'Garlic, minced', amount: '2 cloves', ingredientId: 'garlic' },
    ],
    steps: [
      {
        title: 'Brown',
        description: 'Brown the mince in batches, then soften the onion and garlic.',
      },
      {
        title: 'Simmer',
        description: 'Return the beef, add the tomatoes, and simmer gently for an hour.',
      },
      { title: 'Serve', description: 'Season well and spoon over freshly cooked spaghetti.' },
    ],
  },
  {
    id: '15',
    slug: 'fettuccine-alfredo',
    title: 'Fettuccine Alfredo',
    category: 'Pasta',
    tags: ['Italian', 'Pasta', 'Vegetarian'],
    excerpt: 'Ribbons of pasta in a glossy butter-and-parmesan sauce — rich and indulgent.',
    description:
      'Just butter, parmesan, and pasta water emulsified into a luxuriously glossy sauce that coats every ribbon of fettuccine. Simple, rich, and best eaten immediately.',
    image: alfredoImg,
    imageAlt: 'Fettuccine Alfredo',
    time: '20 mins',
    servings: '2 Servings',
    difficulty: 'Easy',
    servingsIcon: 'restaurant',
    difficultyIcon: 'signal_cellular_alt',
    calories: '710 kcal',
    favorite: false,
    ingredients: [
      { id: 'i1', name: 'Fettuccine', amount: '250 g', ingredientId: 'fettuccine' },
      { id: 'i2', name: 'Butter', amount: '60 g', ingredientId: 'butter' },
      { id: 'i3', name: 'Parmesan, finely grated', amount: '80 g', ingredientId: 'parmesan' },
      { id: 'i4', name: 'Double cream (optional)', amount: '2 tbsp', ingredientId: 'cream' },
      { id: 'i5', name: 'Black pepper', amount: 'to taste', ingredientId: 'black-pepper' },
    ],
    steps: [
      {
        title: 'Cook the Pasta',
        description: 'Boil the fettuccine until al dente, saving plenty of pasta water.',
      },
      {
        title: 'Emulsify',
        description:
          'Melt the butter with a splash of pasta water, then add the pasta and parmesan, tossing into a glossy sauce.',
      },
      {
        title: 'Serve',
        description: 'Loosen with more pasta water as needed and finish with black pepper.',
      },
    ],
  },
  {
    id: '16',
    slug: 'pad-thai',
    title: 'Pad Thai',
    category: 'Noodles',
    tags: ['Thai', 'Noodles', 'Quick'],
    excerpt: 'Stir-fried rice noodles with prawns, egg, peanuts, and a sweet-sour tamarind sauce.',
    description:
      "Thailand's most famous noodle dish: springy rice noodles tossed in a tangy tamarind sauce with prawns, egg, beansprouts, and a shower of crushed peanuts.",
    image: padThaiImg,
    imageAlt: 'Pad Thai',
    time: '30 mins',
    servings: '2 Servings',
    difficulty: 'Medium',
    servingsIcon: 'restaurant',
    difficultyIcon: 'signal_cellular_alt',
    calories: '540 kcal',
    favorite: false,
    ingredients: [
      { id: 'i1', name: 'Flat rice noodles', amount: '200 g', ingredientId: 'rice-noodles' },
      { id: 'i2', name: 'Prawns', amount: '150 g', ingredientId: 'prawns' },
      { id: 'i3', name: 'Egg', amount: '1', ingredientId: 'eggs' },
      { id: 'i4', name: 'Roasted peanuts, crushed', amount: '40 g', ingredientId: 'peanuts' },
      { id: 'i5', name: 'Tamarind, fish sauce and sugar', amount: 'for the sauce', ingredientId: 'pad-thai-sauce' },
    ],
    steps: [
      {
        title: 'Soak',
        description: 'Soak the rice noodles in warm water until pliable, then drain.',
      },
      {
        title: 'Stir-fry',
        description: 'Stir-fry the prawns, push aside and scramble the egg, then add noodles and sauce.',
      },
      {
        title: 'Finish',
        description: 'Toss through beansprouts and serve topped with crushed peanuts and lime.',
      },
    ],
  },
  {
    id: '17',
    slug: 'greek-salad',
    title: 'Greek Salad',
    category: 'Salad',
    tags: ['Salad', 'Greek', 'Vegetarian'],
    excerpt: 'Crisp cucumber, ripe tomato, red onion, and a generous slab of feta with oregano.',
    description:
      'A horiatiki done right: chunky cucumber and tomato, sharp red onion, briny olives, and a thick slice of feta, dressed simply with olive oil and dried oregano.',
    image: greekSaladImg,
    imageAlt: 'Greek Salad',
    time: '15 mins',
    servings: '4 Servings',
    difficulty: 'Easy',
    servingsIcon: 'restaurant',
    difficultyIcon: 'signal_cellular_alt',
    calories: '260 kcal',
    favorite: false,
    ingredients: [
      { id: 'i1', name: 'Tomatoes, in wedges', amount: '4', ingredientId: 'heirloom-tomatoes' },
      { id: 'i2', name: 'Cucumber, chunked', amount: '1', ingredientId: 'cucumber' },
      { id: 'i3', name: 'Red onion, sliced', amount: '1/2', ingredientId: 'red-onion' },
      { id: 'i4', name: 'Feta', amount: '200 g', ingredientId: 'feta' },
      { id: 'i5', name: 'Olive oil and dried oregano', amount: 'to dress', ingredientId: 'extra-virgin-olive-oil' },
    ],
    steps: [
      {
        title: 'Chop',
        description: 'Cut the tomatoes and cucumber into rough chunks and thinly slice the onion.',
      },
      {
        title: 'Assemble',
        description: 'Pile into a bowl with olives and top with a slab of feta.',
      },
      {
        title: 'Dress',
        description: 'Drizzle with olive oil and sprinkle generously with dried oregano.',
      },
    ],
  },
  {
    id: '18',
    slug: 'fluffy-pancakes',
    title: 'Fluffy Pancakes',
    category: 'Breakfast',
    tags: ['Breakfast', 'Sweet', 'Quick'],
    excerpt: 'Tall, golden, cloud-soft pancakes — perfect with butter and maple syrup.',
    description:
      'Thick American-style pancakes that rise tall and stay fluffy. A quick batter, a hot pan, and a stack worth waking up for.',
    image: pancakesImg,
    imageAlt: 'Fluffy Pancakes',
    time: '20 mins',
    servings: '4 Servings',
    difficulty: 'Easy',
    servingsIcon: 'restaurant',
    difficultyIcon: 'signal_cellular_alt',
    calories: '320 kcal',
    favorite: false,
    ingredients: [
      { id: 'i1', name: 'Plain flour', amount: '200 g', ingredientId: 'plain-flour' },
      { id: 'i2', name: 'Baking powder', amount: '2 tsp', ingredientId: 'baking-powder' },
      { id: 'i3', name: 'Egg', amount: '1', ingredientId: 'eggs' },
      { id: 'i4', name: 'Milk', amount: '250 ml', ingredientId: 'milk' },
      { id: 'i5', name: 'Butter, melted', amount: '30 g', ingredientId: 'butter' },
    ],
    steps: [
      {
        title: 'Mix',
        description:
          'Whisk the dry ingredients, then stir in the egg, milk, and melted butter to a thick batter.',
      },
      {
        title: 'Cook',
        description: 'Ladle into a hot, lightly buttered pan and cook until bubbles form, then flip.',
      },
      { title: 'Stack', description: 'Stack up and serve with butter and maple syrup.' },
    ],
  },
  {
    id: '19',
    slug: 'falafel-wrap',
    title: 'Falafel Wrap',
    category: 'Lunch',
    tags: ['Vegan', 'Middle Eastern', 'Lunch'],
    excerpt: 'Crisp, herby chickpea falafel wrapped with salad and a swirl of tahini.',
    description:
      'Crunchy on the outside, fluffy within — spiced chickpea falafel tucked into warm flatbread with crisp salad and a drizzle of lemony tahini.',
    image: falafelImg,
    imageAlt: 'Falafel Wrap',
    time: '40 mins',
    servings: '4 Servings',
    difficulty: 'Medium',
    servingsIcon: 'restaurant',
    difficultyIcon: 'signal_cellular_alt',
    calories: '480 kcal',
    favorite: false,
    ingredients: [
      { id: 'i1', name: 'Dried chickpeas, soaked', amount: '250 g', ingredientId: 'chickpeas' },
      { id: 'i2', name: 'Garlic', amount: '2 cloves', ingredientId: 'garlic' },
      { id: 'i3', name: 'Fresh coriander and parsley', amount: '1 large handful', ingredientId: 'coriander' },
      { id: 'i4', name: 'Cumin and ground coriander', amount: '1 tsp each', ingredientId: 'cumin-coriander' },
      { id: 'i5', name: 'Flatbreads and tahini', amount: 'to serve', ingredientId: 'flatbread-tahini' },
    ],
    steps: [
      {
        title: 'Blitz',
        description: 'Blend the soaked chickpeas with garlic, herbs, and spices to a coarse paste.',
      },
      {
        title: 'Fry',
        description: 'Shape into balls and shallow-fry until deep golden and crisp.',
      },
      {
        title: 'Wrap',
        description: 'Stuff into warm flatbreads with salad and a generous drizzle of tahini.',
      },
    ],
  },
  {
    id: '20',
    slug: 'chocolate-brownies',
    title: 'Chocolate Brownies',
    category: 'Dessert',
    tags: ['Dessert', 'Baking', 'Chocolate'],
    excerpt: 'Fudgy, glossy-topped brownies with a deep, dark chocolate hit.',
    description:
      "The brownie of dreams: a shiny, crackly top giving way to a dense, fudgy middle. Melt good dark chocolate into the batter and don't overbake.",
    image: browniesImg,
    imageAlt: 'Chocolate Brownies',
    time: '45 mins',
    servings: '16 Squares',
    difficulty: 'Easy',
    servingsIcon: 'restaurant',
    difficultyIcon: 'signal_cellular_alt',
    calories: '230 kcal / square',
    favorite: false,
    ingredients: [
      { id: 'i1', name: 'Dark chocolate', amount: '200 g', ingredientId: 'dark-chocolate' },
      { id: 'i2', name: 'Butter', amount: '175 g', ingredientId: 'butter' },
      { id: 'i3', name: 'Caster sugar', amount: '250 g', ingredientId: 'caster-sugar' },
      { id: 'i4', name: 'Eggs', amount: '3', ingredientId: 'eggs' },
      { id: 'i5', name: 'Plain flour', amount: '100 g', ingredientId: 'plain-flour' },
    ],
    steps: [
      {
        title: 'Melt',
        description: 'Gently melt the chocolate and butter together, then cool slightly.',
      },
      {
        title: 'Whisk',
        description:
          'Whisk the eggs and sugar until pale and thick, then fold in the chocolate and flour.',
      },
      {
        title: 'Bake',
        description:
          'Bake at 180°C for about 25 minutes until set with a slight wobble; cool before cutting.',
      },
    ],
  },
  {
    id: '21',
    slug: 'shakshuka',
    title: 'Shakshuka',
    category: 'Breakfast',
    tags: ['Vegetarian', 'Brunch', 'One-pan'],
    excerpt: 'Eggs poached in a spiced tomato and pepper sauce — a one-pan brunch favourite.',
    description:
      'Eggs gently poached in a simmering sauce of tomatoes, peppers, onion, and warm spices. Scoop it straight from the pan with plenty of bread.',
    image: shakshukaImg,
    imageAlt: 'Shakshuka',
    time: '30 mins',
    servings: '2 Servings',
    difficulty: 'Easy',
    servingsIcon: 'restaurant',
    difficultyIcon: 'signal_cellular_alt',
    calories: '300 kcal',
    favorite: false,
    ingredients: [
      { id: 'i1', name: 'Tinned tomatoes', amount: '400 g', ingredientId: 'heirloom-tomatoes' },
      { id: 'i2', name: 'Onion, sliced', amount: '1', ingredientId: 'onion' },
      { id: 'i3', name: 'Garlic', amount: '2 cloves', ingredientId: 'garlic' },
      { id: 'i4', name: 'Eggs', amount: '4', ingredientId: 'eggs' },
      { id: 'i5', name: 'Cumin and paprika', amount: '1 tsp each', ingredientId: 'cumin-paprika' },
    ],
    steps: [
      {
        title: 'Soften',
        description: 'Soften the onion and garlic, then stir in the spices until fragrant.',
      },
      { title: 'Simmer', description: 'Add the tomatoes and simmer into a thick, jammy sauce.' },
      {
        title: 'Poach',
        description: 'Make wells, crack in the eggs, cover, and cook until just set.',
      },
    ],
  },
  {
    id: '22',
    slug: 'thai-green-curry',
    title: 'Thai Green Curry',
    category: 'Curry',
    tags: ['Thai', 'Curry', 'Spicy'],
    excerpt: 'Fragrant coconut curry with chicken, basil, and lime — fresh and fiery.',
    description:
      'Aromatic green curry paste loosened with coconut milk and simmered with chicken and vegetables, finished with lime and Thai basil for a fresh, fiery bowl.',
    image: greenCurryImg,
    imageAlt: 'Thai Green Curry',
    time: '35 mins',
    servings: '4 Servings',
    difficulty: 'Medium',
    servingsIcon: 'restaurant',
    difficultyIcon: 'signal_cellular_alt',
    calories: '450 kcal',
    favorite: false,
    ingredients: [
      { id: 'i1', name: 'Chicken breast, sliced', amount: '400 g', ingredientId: 'chicken-breast' },
      { id: 'i2', name: 'Coconut milk', amount: '400 ml', ingredientId: 'coconut-milk' },
      { id: 'i3', name: 'Green curry paste', amount: '3 tbsp', ingredientId: 'green-curry-paste' },
      { id: 'i4', name: 'Lime', amount: '1', ingredientId: 'lime' },
      { id: 'i5', name: 'Thai basil', amount: 'a handful', ingredientId: 'thai-basil' },
    ],
    steps: [
      {
        title: 'Fry the Paste',
        description: 'Fry the curry paste in a little coconut milk until fragrant and split.',
      },
      {
        title: 'Simmer',
        description: 'Add the chicken and remaining coconut milk and simmer until cooked through.',
      },
      {
        title: 'Finish',
        description: 'Stir through lime juice and Thai basil, and serve with rice.',
      },
    ],
  },
]

export const recipes: Recipe[] = seed.map((recipe) => ({
  ...recipe,
  createdAt: daysAgo(ageDaysBySlug[recipe.slug] ?? 10),
}))
