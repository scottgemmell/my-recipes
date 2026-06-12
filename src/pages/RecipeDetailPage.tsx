import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Icon from '../components/Icon'
import RecipeImage from '../components/RecipeImage'
import TagList from '../components/TagList'
import ConfirmDialog from '../components/ConfirmDialog'
import { isNewRecipe } from '../features/recipes/recent'
import { iconForDifficulty, isHardDifficulty } from '../features/recipes/difficulty'
import { selectCatalog } from '../features/ingredients/ingredientsSlice'
import { galleryForRecipe } from '../features/ingredients/gallery'
import { selectCanEdit } from '../features/auth/authSlice'
import { usePageTitle } from '../hooks/usePageTitle'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import {
  deleteRecipe,
  selectCheckedIngredients,
  selectRecipeBySlug,
  toggleIngredient,
} from '../features/recipes/recipesSlice'

function MetaItem({
  icon,
  label,
  value,
  tone,
}: {
  icon: string
  label: string
  value: string
  tone?: string
}) {
  return (
    <div className="flex items-center gap-sm">
      <Icon name={icon} className={tone ?? 'text-primary'} />
      <div className="flex flex-col">
        <span className="font-label-lg text-[12px] text-secondary uppercase tracking-wider">
          {label}
        </span>
        <span className={`font-body text-body-md font-bold ${tone ?? 'text-on-surface'}`}>
          {value}
        </span>
      </div>
    </div>
  )
}

export default function RecipeDetailPage() {
  const { slug = '' } = useParams()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const recipe = useAppSelector(selectRecipeBySlug(slug))
  const checked = useAppSelector(selectCheckedIngredients(recipe?.id ?? ''))
  const catalog = useAppSelector(selectCatalog)
  // Index the catalog by id once so the ingredient list does O(1) name lookups
  // instead of scanning the whole catalog for each line on every render.
  const catalogById = useMemo(
    () => new Map(catalog.map((c) => [c.id, c])),
    [catalog],
  )
  const canEdit = useAppSelector(selectCanEdit)
  usePageTitle(recipe?.title ?? 'Recipe not found')

  const [confirmOpen, setConfirmOpen] = useState(false)

  // Start each recipe at the top (data is already local, so there's no
  // loading state — a fake delay here just slowed every navigation down).
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!recipe) {
    return (
      <div className="min-h-screen flex flex-col bg-surface">
        <Navbar active="Browse" />
        <main className="flex-grow flex flex-col items-center justify-center gap-md text-center px-margin-mobile">
          <h1 className="font-display text-headline-lg text-on-surface">Recipe not found</h1>
          <Link to="/" className="font-label-lg text-label-lg text-primary hover:underline">
            ← Back to Collections
          </Link>
        </main>
        <Footer />
      </div>
    )
  }

  const handleDelete = () => {
    setConfirmOpen(false)
    dispatch(deleteRecipe(recipe.id))
    navigate('/')
  }

  // Gallery is derived from the recipe's catalog-linked ingredients (falling
  // back to any stored gallery for not-yet-migrated recipes).
  const gallery = galleryForRecipe(recipe, catalog)

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <Navbar active="Browse" />

      <main className="pb-xl flex-grow">
        {/* Hero Section */}
        <section className="w-full relative h-[614px] min-h-[400px] bg-surface-container-high">
          <RecipeImage
            alt={recipe.title}
            label={recipe.title}
            className="w-full h-full object-cover"
            src={recipe.image}
          />
        </section>

        {/* Content Container (overlaps hero ~100px on desktop) */}
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop -mt-12 md:-mt-[150px] relative z-10">
          <Link
            to="/"
            className="inline-flex items-center gap-xs mb-md font-label-lg text-label-lg text-on-primary bg-primary/90 backdrop-blur px-sm py-xs rounded-full hover:bg-primary transition-colors"
          >
            <Icon name="arrow_back" className="text-[16px]" /> Collections
          </Link>

          {/* Recipe Header Card */}
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-md md:p-lg hover-lift mb-lg">
            <div className="flex flex-col gap-sm md:gap-md">
              {/* Tags */}
              <TagList tags={recipe.tags} isNew={isNewRecipe(recipe.createdAt)} />
              {/* Title */}
              <h1 className="font-display text-headline-lg-mobile md:text-display text-on-surface">
                {recipe.title}
              </h1>
              <p className="font-body text-body-lg text-on-surface-variant max-w-3xl">
                {recipe.description}
              </p>
              {canEdit && (
              <div className="flex flex-wrap items-center gap-sm">
                <Link
                  to={`/recipe/${recipe.slug}/edit`}
                  className="inline-flex items-center gap-xs px-5 py-[10px] rounded-full border border-primary text-primary font-label-lg text-label-lg hover:bg-primary hover:text-on-primary hover:shadow-[0_2px_8px_rgba(74,101,79,0.25)] transition-all duration-300"
                >
                  <Icon name="edit" className="text-[18px]" /> Edit Recipe
                </Link>
                <button
                  type="button"
                  onClick={() => setConfirmOpen(true)}
                  className="inline-flex items-center gap-xs px-5 py-[10px] rounded-full border border-error/50 text-error font-label-lg text-label-lg hover:bg-error hover:border-error hover:text-on-error hover:shadow-[0_2px_8px_rgba(186,26,26,0.25)] transition-all duration-300"
                >
                  <Icon name="delete" className="text-[18px]" /> Delete Recipe
                </button>
              </div>
              )}
              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-y-md gap-x-lg pt-md mt-sm border-t border-outline-variant/30">
                <MetaItem icon="schedule" label="Total Time" value={recipe.time} />
                <MetaItem icon="restaurant" label="Yield" value={recipe.servings} />
                <MetaItem
                  icon={iconForDifficulty(recipe.difficulty)}
                  label="Difficulty"
                  value={recipe.difficulty}
                  tone={isHardDifficulty(recipe.difficulty) ? 'text-error' : undefined}
                />
              </div>
            </div>
          </div>

          {/* Recipe Split Layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-lg md:gap-gutter items-start">
            {/* Ingredients Column */}
            <div className="md:col-span-4 bg-surface-container-lowest rounded-xl border border-outline-variant p-md">
              <h2 className="font-headline-sm text-headline-sm text-on-surface mb-md pb-xs border-b border-outline-variant/30">
                Ingredients
              </h2>
              <ul className="flex flex-col gap-sm">
                {recipe.ingredients.map((ingredient) => {
                  const isChecked = checked.includes(ingredient.id)
                  const inputId = `${recipe.id}-${ingredient.id}`
                  return (
                    <li
                      key={ingredient.id}
                      className="flex items-center gap-sm py-xs border-b border-outline-variant/10 last:border-0 group"
                    >
                      <input
                        id={inputId}
                        type="checkbox"
                        className="ingredient-checkbox"
                        checked={isChecked}
                        onChange={() =>
                          dispatch(
                            toggleIngredient({
                              recipeId: recipe.id,
                              ingredientId: ingredient.id,
                            }),
                          )
                        }
                      />
                      <label
                        htmlFor={inputId}
                        className="flex-1 flex justify-between items-baseline gap-sm cursor-pointer"
                      >
                        <span
                          className={`font-body text-body-md text-on-surface group-hover:text-primary transition-colors ${
                            isChecked ? 'line-through opacity-50' : ''
                          }`}
                        >
                          {(ingredient.ingredientId &&
                            catalogById.get(ingredient.ingredientId)?.name) ||
                            ''}
                        </span>
                        <span
                          className={`font-body text-body-md text-secondary font-bold whitespace-nowrap ${
                            isChecked ? 'opacity-50' : ''
                          }`}
                        >
                          {ingredient.amount}
                        </span>
                      </label>
                    </li>
                  )
                })}
              </ul>
            </div>

            {/* Method Column */}
            <div className="md:col-span-8 space-y-lg">
              <h2 className="font-headline-md text-headline-md text-on-surface pb-sm border-b border-outline-variant/30">
                Instructions
              </h2>
              <div className="flex flex-col gap-lg">
                {recipe.steps.map((step, index) => (
                  <div key={step.title} className="flex gap-md items-start group">
                    <div className="font-display text-display text-primary opacity-30 group-hover:opacity-100 transition-opacity flex-shrink-0 pt-1 w-16">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-headline-sm text-headline-sm text-on-surface mb-xs">
                        {step.title}
                      </h3>
                      <p className="font-body text-body-lg text-on-surface-variant leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Ingredient Gallery */}
          {gallery.length > 0 && (
            <section className="mt-xl pt-lg border-t border-outline-variant/30">
              <h2 className="font-headline-md text-headline-md text-on-surface mb-md">
                Ingredient Gallery
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-md">
                {gallery.map((item) => (
                  <div key={item.label} className="flex flex-col gap-sm">
                    <div className="aspect-square rounded-xl overflow-hidden border border-outline-variant bg-surface-container">
                      <RecipeImage
                        alt={item.label}
                        label={item.label}
                        className="w-full h-full object-cover"
                        src={item.image}
                      />
                    </div>
                    <span className="font-label-lg text-label-lg text-on-surface-variant text-center">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />

      <ConfirmDialog
        open={confirmOpen}
        title="Delete recipe?"
        message={`"${recipe.title}" will be permanently removed. This can't be undone.`}
        confirmLabel="Delete"
        destructive
        onConfirm={handleDelete}
        onCancel={() => setConfirmOpen(false)}
      />
    </div>
  )
}
