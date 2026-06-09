import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import { catalogIngredients, type CatalogIngredient } from './ingredientsData'

interface IngredientsState {
  items: CatalogIngredient[]
}

const initialState: IngredientsState = {
  items: catalogIngredients,
}

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    /** Add a catalog ingredient (caller supplies a unique id, see makeIngredientId). */
    addIngredient(state, action: PayloadAction<CatalogIngredient>) {
      if (!state.items.some((i) => i.id === action.payload.id)) {
        state.items.push(action.payload)
      }
    },
    /** Change (or clear) the image of an existing catalog ingredient. */
    setIngredientImage(
      state,
      action: PayloadAction<{ id: string; imageKey?: string }>,
    ) {
      const ing = state.items.find((i) => i.id === action.payload.id)
      if (ing) ing.imageKey = action.payload.imageKey
    },
    /** Rename an ingredient (its id — and therefore recipe links — stays). */
    renameIngredient(state, action: PayloadAction<{ id: string; name: string }>) {
      const ing = state.items.find((i) => i.id === action.payload.id)
      if (ing) ing.name = action.payload.name
    },
  },
})

export const { addIngredient, setIngredientImage, renameIngredient } =
  ingredientsSlice.actions

export default ingredientsSlice.reducer

/* ---- Selectors ---- */

export const selectCatalog = (state: RootState) => state.ingredients.items
