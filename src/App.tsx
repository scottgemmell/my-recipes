import { Routes, Route, Navigate } from 'react-router-dom'
import { lazy, Suspense, type ReactElement } from 'react'
import { useAppSelector } from './app/hooks'
import { selectCanEdit } from './features/auth/authSlice'

// Route-level code splitting: only the page a visitor actually opens is
// downloaded. Owner-only editing pages (Add/Edit Recipe, Add Ingredient,
// Export/Import) are the heaviest and are kept out of the initial bundle.
const CollectionPage = lazy(() => import('./pages/CollectionPage'))
const RecipeDetailPage = lazy(() => import('./pages/RecipeDetailPage'))
const AddRecipePage = lazy(() => import('./pages/AddRecipePage'))
const AddIngredientPage = lazy(() => import('./pages/AddIngredientPage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const ExportImportPage = lazy(() => import('./pages/ExportImportPage'))
const FavouritesPage = lazy(() => import('./pages/FavouritesPage'))
const TagPage = lazy(() => import('./pages/TagPage'))

/** Editing routes are owner-only: visitors get bounced back to Browse. */
function RequireOwner({ children }: { children: ReactElement }) {
  const canEdit = useAppSelector(selectCanEdit)
  return canEdit ? children : <Navigate to="/" replace />
}

export default function App() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-surface" />}>
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
    </Suspense>
  )
}
