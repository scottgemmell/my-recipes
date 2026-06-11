import { Link, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Icon from '../components/Icon'
import FavoriteRow from '../components/FavoriteRow'
import { useAppSelector } from '../app/hooks'
import { selectRecipes } from '../features/recipes/recipesSlice'
import { usePageTitle } from '../hooks/usePageTitle'

export default function TagPage() {
  const { tag = '' } = useParams()
  const recipes = useAppSelector(selectRecipes)

  const tagged = recipes.filter((recipe) =>
    recipe.tags.some((t) => t.toLowerCase() === tag.toLowerCase()),
  )
  // Prefer the tag's canonical casing as stored on a recipe.
  const label =
    tagged[0]?.tags.find((t) => t.toLowerCase() === tag.toLowerCase()) ?? tag
  usePageTitle(label)

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <Navbar active="" />

      <main className="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-lg md:py-xl">
        {/* Page Header */}
        <div className="mb-lg md:mb-xl text-center md:text-left flex flex-col md:flex-row justify-between gap-md md:items-start">
          <div>
            <p className="font-label-lg text-label-lg text-primary uppercase tracking-wider mb-sm">
              Tag
            </p>
            <h1 className="font-display text-display-mobile md:text-display text-on-surface mb-md">
              Recipes tagged “{label}”
            </h1>
          </div>

          <div className="hidden md:flex flex-col items-end shrink-0 self-start border-r-2 border-primary pr-[16px]">
            <span className="font-display text-[64px] leading-none font-medium text-on-surface">
              {tagged.length}
            </span>
            <span className="mt-base font-body text-body-sm text-on-surface-variant uppercase tracking-wider">
              {tagged.length === 1 ? 'recipe' : 'recipes'}
            </span>
          </div>
        </div>

        {tagged.length === 0 ? (
          <div className="flex flex-col items-center text-center gap-md py-xl border-t border-outline-variant/30">
            <Icon name="sell" className="text-5xl text-outline" />
            <p className="font-body text-body-lg text-on-surface-variant max-w-md">
              No recipes are tagged “{label}” yet.
            </p>
            <Link
              to="/"
              className="px-[24px] py-[12px] rounded-full bg-primary text-on-primary font-label-lg text-label-lg hover:brightness-110 transition-all duration-200"
            >
              Browse recipes
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-gutter card-reveal">
            {tagged.map((recipe) => (
              <FavoriteRow key={recipe.id} recipe={recipe} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
