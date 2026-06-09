export interface Ingredient {
  id: string
  name: string
  amount: string
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
  gallery: GalleryItem[]
  /** Marks the large hero card in the collection grid. */
  featured?: boolean
  favorite: boolean
}
