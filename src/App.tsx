import { Routes, Route } from 'react-router-dom'
import CollectionPage from './pages/CollectionPage'
import RecipeDetailPage from './pages/RecipeDetailPage'
import AddRecipePage from './pages/AddRecipePage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<CollectionPage />} />
      <Route path="/recipe/:slug" element={<RecipeDetailPage />} />
      <Route path="/recipe/:slug/edit" element={<AddRecipePage />} />
      <Route path="/add" element={<AddRecipePage />} />
    </Routes>
  )
}
