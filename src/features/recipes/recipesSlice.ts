import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import type { Recipe } from './types'
import { recipes } from './recipesData'

interface RecipesState {
  items: Recipe[]
  /** Map of recipeId -> set of checked ingredient ids (as an array for serializability). */
  checkedIngredients: Record<string, string[]>
}

const initialState: RecipesState = {
  items: recipes,
  checkedIngredients: {},
}

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    toggleFavorite(state, action: PayloadAction<string>) {
      const recipe = state.items.find((r) => r.id === action.payload)
      if (recipe) recipe.favorite = !recipe.favorite
    },
    toggleIngredient(
      state,
      action: PayloadAction<{ recipeId: string; ingredientId: string }>,
    ) {
      const { recipeId, ingredientId } = action.payload
      const checked = state.checkedIngredients[recipeId] ?? []
      state.checkedIngredients[recipeId] = checked.includes(ingredientId)
        ? checked.filter((id) => id !== ingredientId)
        : [...checked, ingredientId]
    },
    clearChecklist(state, action: PayloadAction<string>) {
      delete state.checkedIngredients[action.payload]
    },
  },
})

export const { toggleFavorite, toggleIngredient, clearChecklist } = recipesSlice.actions

export default recipesSlice.reducer

/* ---- Selectors ---- */

export const selectRecipes = (state: RootState) => state.recipes.items

export const selectRecipeBySlug = (slug: string) => (state: RootState) =>
  state.recipes.items.find((r) => r.slug === slug)

export const selectFavoriteCount = (state: RootState) =>
  state.recipes.items.filter((r) => r.favorite).length

export const selectCheckedIngredients = (recipeId: string) => (state: RootState) =>
  state.recipes.checkedIngredients[recipeId] ?? []
