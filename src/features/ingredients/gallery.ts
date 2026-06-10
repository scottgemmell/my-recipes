import type { GalleryItem, Recipe } from '../recipes/types'
import type { CatalogIngredient } from './ingredientsData'
import { imageSrc } from './imageRegistry'

/**
 * The detail-page "Ingredient Gallery" for a recipe.
 *
 * Derived from the recipe's catalog-linked ingredients (those with an
 * `ingredientId` whose catalog entry has an image), de-duplicated and in order.
 * If the recipe has no linked, imaged ingredients we fall back to its stored
 * `gallery` so not-yet-migrated recipes keep their current images.
 */
export function galleryForRecipe(
  recipe: Recipe,
  catalog: CatalogIngredient[],
): GalleryItem[] {
  const byId = new Map(catalog.map((c) => [c.id, c]))
  const items: GalleryItem[] = []
  const seen = new Set<string>()
  for (const ing of recipe.ingredients) {
    if (!ing.ingredientId || seen.has(ing.ingredientId)) continue
    const cat = byId.get(ing.ingredientId)
    const src = imageSrc(cat)
    if (cat && src) {
      seen.add(cat.id)
      items.push({ label: cat.name, image: src })
    }
  }
  return items.length > 0 ? items : (recipe.gallery ?? [])
}
