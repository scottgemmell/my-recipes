import { Routes, Route } from 'react-router-dom'
import CollectionPage from './pages/CollectionPage'
import RecipeDetailPage from './pages/RecipeDetailPage'
import AddRecipePage from './pages/AddRecipePage'
import AddIngredientPage from './pages/AddIngredientPage'
import AboutPage from './pages/AboutPage'
import FavouritesPage from './pages/FavouritesPage'
import TagPage from './pages/TagPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<CollectionPage />} />
      <Route path="/recipe/:slug" element={<RecipeDetailPage />} />
      <Route path="/recipe/:slug/edit" element={<AddRecipePage />} />
      <Route path="/add" element={<AddRecipePage />} />
      <Route path="/add-ingredient" element={<AddIngredientPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/favourites" element={<FavouritesPage />} />
      <Route path="/tag/:tag" element={<TagPage />} />
    </Routes>
  )
}
