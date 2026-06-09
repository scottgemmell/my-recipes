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
    addRecipe(state, action: PayloadAction<Recipe>) {
      // Insert just after the featured card so it's visible without "Load More".
      state.items.splice(1, 0, action.payload)
    },
    updateRecipe(state, action: PayloadAction<Recipe>) {
      const index = state.items.findIndex((r) => r.id === action.payload.id)
      if (index !== -1) state.items[index] = action.payload
    },
    deleteRecipe(state, action: PayloadAction<string>) {
      state.items = state.items.filter((r) => r.id !== action.payload)
      delete state.checkedIngredients[action.payload]
    },
  },
})

export const {
  toggleFavorite,
  toggleIngredient,
  clearChecklist,
  addRecipe,
  updateRecipe,
  deleteRecipe,
} = recipesSlice.actions

export default recipesSlice.reducer

/* ---- Selectors ---- */

export const selectRecipes = (state: RootState) => state.recipes.items

export const selectRecipeBySlug = (slug: string) => (state: RootState) =>
  state.recipes.items.find((r) => r.slug === slug)

export const selectFavoriteCount = (state: RootState) =>
  state.recipes.items.filter((r) => r.favorite).length

export const selectCheckedIngredients = (recipeId: string) => (state: RootState) =>
  state.recipes.checkedIngredients[recipeId] ?? []
