import { Routes, Route } from 'react-router-dom'
import CollectionPage from './pages/CollectionPage'
import RecipeDetailPage from './pages/RecipeDetailPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<CollectionPage />} />
      <Route path="/recipe/:slug" element={<RecipeDetailPage />} />
    </Routes>
  )
}
