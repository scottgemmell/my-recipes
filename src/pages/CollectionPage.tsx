import { useEffect, useMemo, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import RecipeCard from '../components/RecipeCard'
import CardSkeleton, { FeaturedCardSkeleton } from '../components/CardSkeleton'
import { useAppSelector } from '../app/hooks'
import { selectRecipes } from '../features/recipes/recipesSlice'

export default function CollectionPage() {
  const recipes = useAppSelector(selectRecipes)
  // Render the featured recipe first — its card spans two columns at the top.
  const orderedRecipes = useMemo(() => {
    const idx = recipes.findIndex((r) => r.featured)
    if (idx <= 0) return recipes
    return [recipes[idx], ...recipes.slice(0, idx), ...recipes.slice(idx + 1)]
  }, [recipes])
  const INITIAL_COUNT = 5
  const BATCH_SIZE = 6

  const [loading, setLoading] = useState(true)
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT)
  const [loadingMore, setLoadingMore] = useState(false)

  // Simulate an initial load so the skeleton state is shown on first paint.
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 900)
    return () => clearTimeout(timer)
  }, [])

  const handleLoadMore = () => {
    setLoadingMore(true)
    setTimeout(() => {
      setVisibleCount((count) => count + BATCH_SIZE)
      setLoadingMore(false)
    }, 900)
  }

  const visibleRecipes = orderedRecipes.slice(0, visibleCount)
  const remaining = Math.max(orderedRecipes.length - visibleCount, 0)
  const nextBatch = Math.min(BATCH_SIZE, remaining)
  const hasMore = remaining > 0

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <Navbar active="Browse" />

      <main className="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-lg md:py-xl">
        {/* Page Header */}
        <div className="mb-lg md:mb-xl text-center md:text-left flex flex-col md:flex-row justify-between gap-md md:items-start">
          <div>
            <p className="font-label-lg text-label-lg text-primary uppercase tracking-wider mb-sm">
            Browse
          </p>
          <h1 className="font-display text-display text-on-surface mb-md">A calmer kind of cookbook.</h1>
            <p className="font-body text-body-lg text-on-surface-variant max-w-2xl">
              Discover seasonal favorites and timeless classics, thoughtfully organized to inspire
              your next culinary meditation.
            </p>
          </div>

          {/* Recipe count */}
          <div className="flex flex-col items-center md:items-end shrink-0 self-center md:self-start">
            <span className="font-display text-[80px] leading-none font-bold text-primary">
              {recipes.length}
            </span>
            <span className="font-body text-body-sm text-on-surface-variant uppercase tracking-wider">
              recipes
            </span>
          </div>
        </div>

        {/* Recipe Grid (bento / masonry feel) */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter ${
            loading ? '' : 'card-reveal'
          }`}
        >
          {loading ? (
            <>
              <FeaturedCardSkeleton />
              {Array.from({ length: INITIAL_COUNT - 1 }).map((_, i) => (
                <CardSkeleton key={`skeleton-${i}`} />
              ))}
            </>
          ) : (
            <>
              {visibleRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
              {loadingMore &&
                Array.from({ length: nextBatch }).map((_, i) => (
                  <CardSkeleton key={`skeleton-more-${i}`} />
                ))}
            </>
          )}
        </div>

        {/* Load More */}
        {!loading && hasMore && !loadingMore && (
          <div className="mt-xl flex justify-center">
            <button
              onClick={handleLoadMore}
              className="px-[24px] py-[12px] border border-primary text-primary font-body-md text-body-md rounded-full hover:bg-primary hover:text-on-primary transition-colors duration-300"
            >
              Load More Recipes
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
