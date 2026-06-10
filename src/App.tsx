import { Routes, Route, Navigate } from 'react-router-dom'
import type { ReactElement } from 'react'
import CollectionPage from './pages/CollectionPage'
import RecipeDetailPage from './pages/RecipeDetailPage'
import AddRecipePage from './pages/AddRecipePage'
import AddIngredientPage from './pages/AddIngredientPage'
import AboutPage from './pages/AboutPage'
import ExportImportPage from './pages/ExportImportPage'
import FavouritesPage from './pages/FavouritesPage'
import TagPage from './pages/TagPage'
import { useAppSelector } from './app/hooks'
import { selectCanEdit } from './features/auth/authSlice'

/** Editing routes are owner-only: visitors get bounced back to Browse. */
function RequireOwner({ children }: { children: ReactElement }) {
  const canEdit = useAppSelector(selectCanEdit)
  return canEdit ? children : <Navigate to="/" replace />
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<CollectionPage />} />
      <Route path="/recipe/:slug" element={<RecipeDetailPage />} />
      <Route
        path="/recipe/:slug/edit"
        element={
          <RequireOwner>
            <AddRecipePage />
          </RequireOwner>
        }
      />
      <Route
        path="/add"
        element={
          <RequireOwner>
            <AddRecipePage />
          </RequireOwner>
        }
      />
      <Route
        path="/add-ingredient"
        element={
          <RequireOwner>
            <AddIngredientPage />
          </RequireOwner>
        }
      />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/export-import" element={<ExportImportPage />} />
      <Route path="/favourites" element={<FavouritesPage />} />
      <Route path="/tag/:tag" element={<TagPage />} />
    </Routes>
  )
}
