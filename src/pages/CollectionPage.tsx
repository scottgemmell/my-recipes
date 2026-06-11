import { useMemo, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import RecipeCard from '../components/RecipeCard'
import { useAppSelector } from '../app/hooks'
import { selectRecipes } from '../features/recipes/recipesSlice'
import { usePageTitle } from '../hooks/usePageTitle'

const COUNT_KEY = 'my-recipes:browse-count'

export default function CollectionPage() {
  usePageTitle()
  const recipes = useAppSelector(selectRecipes)
  // Render the featured recipe first — its card spans two columns at the top.
  const orderedRecipes = useMemo(() => {
    const idx = recipes.findIndex((r) => r.featured)
    if (idx <= 0) return recipes
    return [recipes[idx], ...recipes.slice(0, idx), ...recipes.slice(idx + 1)]
  }, [recipes])
  const INITIAL_COUNT = 5
  const BATCH_SIZE = 6

  // Remember how far the user had paged, so viewing a recipe and coming
  // back doesn't collapse the grid to the first batch.
  const [visibleCount, setVisibleCount] = useState(() => {
    const saved = Number(sessionStorage.getItem(COUNT_KEY))
    return saved >= INITIAL_COUNT ? saved : INITIAL_COUNT
  })
  const loadMore = () => {
    setVisibleCount((count) => {
      const next = count + BATCH_SIZE
      try {
        sessionStorage.setItem(COUNT_KEY, String(next))
      } catch {
        /* storage unavailable */
      }
      return next
    })
  }

  const visibleRecipes = orderedRecipes.slice(0, visibleCount)
  const hasMore = orderedRecipes.length > visibleCount

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
          <h1 className="font-display text-display-mobile md:text-display text-on-surface mb-md">
            A calmer kind of <em className="italic text-primary">cookbook.</em>
          </h1>
            <p className="font-body text-body-lg text-on-surface-variant max-w-2xl">
              Discover seasonal favorites and timeless classics, thoughtfully organized to inspire
              your next culinary meditation.
            </p>
          </div>

          {/* Recipe count (desktop only — it crowds the first screen on phones) */}
          <div className="hidden md:flex flex-col items-end shrink-0 self-start border-r-2 border-primary pr-[16px]">
            <span className="font-display text-[64px] leading-none font-medium text-on-surface">
              {recipes.length}
            </span>
            <span className="mt-base font-body text-body-sm text-on-surface-variant uppercase tracking-wider">
              recipes
            </span>
          </div>
        </div>

        {/* Recipe Grid (bento / masonry feel) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter card-reveal">
          {visibleRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>

        {/* Announce list growth to assistive tech. */}
        <p className="sr-only" aria-live="polite">
          Showing {visibleRecipes.length} of {orderedRecipes.length} recipes
        </p>

        {/* Load More */}
        {hasMore && (
          <div className="mt-xl flex justify-center">
            <button
              onClick={loadMore}
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
