import { configureStore } from '@reduxjs/toolkit'
import recipesReducer from '../features/recipes/recipesSlice'

/** Bump the version suffix to invalidate previously persisted state. */
const STORAGE_KEY = 'culinary-zen:recipes:v1'

type RecipesState = ReturnType<typeof recipesReducer>

/** Load the persisted recipes slice from localStorage, if present and valid. */
function loadRecipesState(): RecipesState | undefined {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return undefined
    const parsed = JSON.parse(raw) as RecipesState
    if (!parsed || !Array.isArray(parsed.items)) return undefined
    return parsed
  } catch {
    return undefined
  }
}

const persisted = loadRecipesState()

export const store = configureStore({
  reducer: {
    recipes: recipesReducer,
  },
  preloadedState: persisted ? { recipes: persisted } : undefined,
})

// Persist the recipes slice to localStorage (throttled) so added recipes,
// edits, favorites and checklist state survive page reloads.
let saveScheduled = false
store.subscribe(() => {
  if (saveScheduled) return
  saveScheduled = true
  window.setTimeout(() => {
    saveScheduled = false
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(store.getState().recipes))
    } catch {
      // Ignore write failures (e.g. storage unavailable or quota exceeded).
    }
  }, 300)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
