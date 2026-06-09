import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import RecipeCard from '../components/RecipeCard'
import { useAppSelector } from '../app/hooks'
import { selectRecipes } from '../features/recipes/recipesSlice'

export default function CollectionPage() {
  const recipes = useAppSelector(selectRecipes)

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <Navbar active="Collections" />

      <main className="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-lg md:py-xl">
        {/* Page Header */}
        <div className="mb-lg md:mb-xl text-center md:text-left flex flex-col md:flex-row justify-between gap-md md:items-start">
          <div>
            <h1 className="font-display text-display text-on-surface mb-xs">Curated Collections</h1>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>

        {/* Load More */}
        <div className="mt-xl flex justify-center">
          <button className="px-[24px] py-[12px] border border-primary text-primary font-label-lg text-label-lg rounded-full hover:bg-primary hover:text-on-primary transition-colors duration-300">
            Load More Recipes
          </button>
        </div>
      </main>

      <Footer />
    </div>
  )
}
