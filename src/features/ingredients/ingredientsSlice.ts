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
    /** Set (or clear) an ingredient's image — a bundled key and/or an uploaded url. */
    setIngredientImage(
      state,
      action: PayloadAction<{ id: string; imageKey?: string; imageUrl?: string }>,
    ) {
      const ing = state.items.find((i) => i.id === action.payload.id)
      if (ing) {
        ing.imageKey = action.payload.imageKey
        ing.imageUrl = action.payload.imageUrl
      }
    },
    /** Rename an ingredient (its id — and therefore recipe links — stays). */
    renameIngredient(state, action: PayloadAction<{ id: string; name: string }>) {
      const ing = state.items.find((i) => i.id === action.payload.id)
      if (ing) ing.name = action.payload.name
    },
    /** Remove an ingredient from the catalog. */
    deleteIngredient(state, action: PayloadAction<string>) {
      state.items = state.items.filter((i) => i.id !== action.payload)
    },
  },
})

export const { addIngredient, setIngredientImage, renameIngredient, deleteIngredient } =
  ingredientsSlice.actions

export default ingredientsSlice.reducer

/* ---- Selectors ---- */

export const selectCatalog = (state: RootState) => state.ingredients.items
