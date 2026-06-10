import { configureStore } from '@reduxjs/toolkit'
import recipesReducer from '../features/recipes/recipesSlice'
import ingredientsReducer from '../features/ingredients/ingredientsSlice'
import { recipes as seedRecipes } from '../features/recipes/recipesData'
import {
  catalogIngredients,
  canonicalIngredientId,
  nameFromId,
  type CatalogIngredient,
} from '../features/ingredients/ingredientsData'

/** Bump the version suffix to invalidate previously persisted state. */
export const STORAGE_KEY = 'culinary-zen:recipes:v3'

type RecipesState = ReturnType<typeof recipesReducer>
type IngredientsState = ReturnType<typeof ingredientsReducer>

interface PersistedState {
  recipes: RecipesState
  ingredients: IngredientsState
}

/**
 * Upgrade state to the relationship model: link each recipe ingredient to a
 * catalog id, drop stored galleries (images live on catalog ingredients), and
 * backfill any referenced catalog ingredient that doesn't exist yet. Idempotent,
 * so it can run on every load — over the seed and over persisted user data alike.
 */
function migrate(state: PersistedState): PersistedState {
  const catalog = state.ingredients.items
  const byId = new Map(catalog.map((i) => [i.id, i]))
  for (const recipe of state.recipes.items) {
    for (const ing of recipe.ingredients) {
      if (!ing.ingredientId) ing.ingredientId = canonicalIngredientId(ing.name)
      const id = ing.ingredientId
      if (id && !byId.has(id)) {
        const entry: CatalogIngredient = { id, name: nameFromId(id) }
        catalog.push(entry)
        byId.set(id, entry)
      }
    }
    delete recipe.gallery
  }
  return state
}

/** Load the persisted slices from localStorage, only if both shapes are valid. */
function loadPersisted(): PersistedState | undefined {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return undefined
    const parsed = JSON.parse(raw) as Partial<PersistedState>
    if (
      parsed?.recipes &&
      Array.isArray(parsed.recipes.items) &&
      parsed?.ingredients &&
      Array.isArray(parsed.ingredients.items)
    ) {
      return { recipes: parsed.recipes, ingredients: parsed.ingredients }
    }
  } catch {
    /* ignore malformed state */
  }
  return undefined
}

// Use persisted state when present, else the seed; then migrate to the
// relationship model. (Seed is cloned so the imported arrays aren't mutated.)
const base: PersistedState =
  loadPersisted() ?? {
    recipes: { items: JSON.parse(JSON.stringify(seedRecipes)), checkedIngredients: {} },
    ingredients: { items: JSON.parse(JSON.stringify(catalogIngredients)) },
  }
const preloaded = migrate(base)

export const store = configureStore({
  reducer: {
    recipes: recipesReducer,
    ingredients: ingredientsReducer,
  },
  preloadedState: preloaded,
})

// Persist the slices to localStorage (throttled) so added recipes, edits,
// favorites, checklist state and the ingredient catalog survive page reloads.
let saveScheduled = false
store.subscribe(() => {
  if (saveScheduled) return
  saveScheduled = true
  window.setTimeout(() => {
    saveScheduled = false
    try {
      const { recipes, ingredients } = store.getState()
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ recipes, ingredients }))
    } catch {
      // Ignore write failures (e.g. storage unavailable or quota exceeded).
    }
  }, 300)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
