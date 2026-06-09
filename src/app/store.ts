import { configureStore } from '@reduxjs/toolkit'
import recipesReducer from '../features/recipes/recipesSlice'
import ingredientsReducer from '../features/ingredients/ingredientsSlice'

/** Bump the version suffix to invalidate previously persisted state. */
const STORAGE_KEY = 'culinary-zen:recipes:v3'

type RecipesState = ReturnType<typeof recipesReducer>
type IngredientsState = ReturnType<typeof ingredientsReducer>

interface PersistedState {
  recipes: RecipesState
  ingredients: IngredientsState
}

/** Load the persisted slices from localStorage, only if both shapes are valid. */
function loadState(): PersistedState | undefined {
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
    return undefined
  } catch {
    return undefined
  }
}

const persisted = loadState()

export const store = configureStore({
  reducer: {
    recipes: recipesReducer,
    ingredients: ingredientsReducer,
  },
  preloadedState: persisted,
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
