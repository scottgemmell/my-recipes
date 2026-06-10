import { configureStore } from '@reduxjs/toolkit'
import recipesReducer from '../features/recipes/recipesSlice'
import ingredientsReducer from '../features/ingredients/ingredientsSlice'
import authReducer, { loadSession } from '../features/auth/authSlice'
import { attachRestSync, setAuthToken, type AppData } from '../features/api'

// Ingredient-checklist ticks are UI state, not recipe data — they stay in
// localStorage rather than the REST backend.
const CHECKED_KEY = 'culinary-zen:checked:v1'

function loadChecked(): Record<string, string[]> {
  try {
    const raw = localStorage.getItem(CHECKED_KEY)
    if (raw) return JSON.parse(raw) as Record<string, string[]>
  } catch {
    /* ignore malformed state */
  }
  return {}
}

/**
 * Build the store from data fetched off the REST backend (see main.tsx).
 * Subsequent changes are mirrored back via attachRestSync.
 */
export function createAppStore(data: AppData) {
  // Restore a still-valid sign-in from this browser session, and arm the API
  // client with its token so writes carry authorization immediately.
  const session = loadSession()
  setAuthToken(session?.credential ?? null)

  const store = configureStore({
    reducer: {
      recipes: recipesReducer,
      ingredients: ingredientsReducer,
      auth: authReducer,
    },
    preloadedState: {
      recipes: { items: data.recipes, checkedIngredients: loadChecked() },
      ingredients: { items: data.ingredients },
      auth: { session },
    },
  })

  attachRestSync(store)

  let checkedSavePending = false
  store.subscribe(() => {
    if (checkedSavePending) return
    checkedSavePending = true
    window.setTimeout(() => {
      checkedSavePending = false
      try {
        localStorage.setItem(
          CHECKED_KEY,
          JSON.stringify(store.getState().recipes.checkedIngredients),
        )
      } catch {
        /* storage unavailable */
      }
    }, 300)
  })

  return store
}

export type AppStore = ReturnType<typeof createAppStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
