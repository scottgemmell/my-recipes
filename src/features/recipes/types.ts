export interface Ingredient {
  id: string
  name: string
  amount: string
  /** Links this line to a catalog ingredient (drives the derived gallery). */
  ingredientId?: string
}

export interface Step {
  title: string
  description: string
}

export interface GalleryItem {
  label: string
  image: string
}

export interface Recipe {
  id: string
  slug: string
  title: string
  /** Short category label shown above the card title, e.g. "Dinner". */
  category: string
  /** Pill tags shown on the detail page. */
  tags: string[]
  /** One-line teaser used on cards. */
  excerpt: string
  /** Longer intro used on the detail page. */
  description: string
  image: string
  imageAlt: string
  time: string
  servings: string
  difficulty: string
  /** Icon name (Material Symbols) for the servings stat — loaves vs plates etc. */
  servingsIcon: string
  /** Icon name for the difficulty stat. */
  difficultyIcon: string
  calories?: string
  ingredients: Ingredient[]
  steps: Step[]
  /**
   * Legacy stored gallery. Galleries are now derived from the ingredients'
   * catalog images (see galleryForRecipe); the load migration drops this.
   */
  gallery?: GalleryItem[]
  /** Marks the large hero card in the collection grid. */
  featured?: boolean
  favorite: boolean
  /** ISO date string for when the recipe was added (drives the "New" tag). */
  createdAt: string
}
