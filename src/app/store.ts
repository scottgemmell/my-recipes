import { configureStore } from '@reduxjs/toolkit'
import recipesReducer from '../features/recipes/recipesSlice'

export const store = configureStore({
  reducer: {
    recipes: recipesReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
