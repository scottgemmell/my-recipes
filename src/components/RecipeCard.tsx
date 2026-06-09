import { Link } from 'react-router-dom'
import { useAppDispatch } from '../app/hooks'
import { toggleFavorite } from '../features/recipes/recipesSlice'
import type { Recipe } from '../features/recipes/types'
import Icon from './Icon'
import RecipeImage from './RecipeImage'
import { isNewRecipe } from '../features/recipes/recent'

interface RecipeCardProps {
  recipe: Recipe
}

function FavoriteButton({ recipe }: RecipeCardProps) {
  const dispatch = useAppDispatch()
  return (
    <button
      type="button"
      aria-pressed={recipe.favorite}
      aria-label={recipe.favorite ? 'Remove from favorites' : 'Add to favorites'}
      onClick={() => dispatch(toggleFavorite(recipe.id))}
      className={
        recipe.favorite
          ? 'shrink-0 text-error transition-colors'
          : 'shrink-0 hover:text-error transition-colors text-on-surface-variant'
      }
    >
      <Icon name={recipe.favorite ? 'favorite' : 'favorite_border'} filled={recipe.favorite} />
    </button>
  )
}

function MetaStat({ icon, label }: { icon: string; label: string }) {
  return (
    <div className="flex items-center gap-xs text-primary">
      <Icon name={icon} className="text-[16px]" />
      <span className="font-bold">{label}</span>
    </div>
  )
}

/** Tag-cloud of small uppercase pills shown on each card. New comes first. */
function TagList({ tags, isNew }: { tags: string[]; isNew: boolean }) {
  return (
    <div className="flex flex-wrap gap-xs">
      {isNew && (
        <span className="bg-primary text-on-primary font-label-sm text-label-sm uppercase tracking-wider px-2 py-[2px] rounded">
          New
        </span>
      )}
      {tags.map((tag) => (
        <span
          key={tag}
          className="bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider px-2 py-[2px] rounded"
        >
          {tag}
        </span>
      ))}
    </div>
  )
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  const to = `/recipe/${recipe.slug}`

  if (recipe.featured) {
    return (
      <article className="col-span-1 sm:col-span-2 lg:col-span-2 group bg-surface-container-lowest border rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_8px_24px_rgba(141,170,145,0.08)] hover:-translate-y-1 flex flex-col sm:flex-row h-full border-outline-variant/30">
        <Link to={to} className="w-full sm:w-1/2 h-64 sm:h-auto relative overflow-hidden shrink-0">
          <RecipeImage
            alt={recipe.title}
            label={recipe.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            src={recipe.image}
          />
        </Link>
        <div className="p-md flex flex-col justify-between grow">
          <div>
            <div className="flex items-start justify-between gap-sm mb-sm">
              <TagList tags={recipe.tags} isNew={isNewRecipe(recipe.createdAt)} />
              <FavoriteButton recipe={recipe} />
            </div>
            <Link to={to}>
              <h2 className="font-headline-lg text-headline-lg text-on-surface mb-sm group-hover:text-primary transition-colors">
                {recipe.title}
              </h2>
            </Link>
            <p className="font-body text-body-md text-on-surface-variant line-clamp-3">
              {recipe.excerpt}
            </p>
          </div>
          <div className="mt-lg pt-sm border-t flex items-center justify-between border-outline-variant/30">
            <Link
              to={to}
              className="font-body-md text-body-md text-primary flex items-center gap-xs hover:underline decoration-primary underline-offset-4"
            >
              View Recipe <Icon name="arrow_forward" className="text-[16px]" />
            </Link>
          </div>
        </div>
      </article>
    )
  }

  return (
    <article className="group bg-surface-container-lowest border rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_8px_24px_rgba(141,170,145,0.08)] hover:-translate-y-1 flex flex-col border-outline-variant/30">
      <Link to={to} className="w-full h-48 relative overflow-hidden shrink-0">
        <RecipeImage
          alt={recipe.title}
          label={recipe.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          src={recipe.image}
        />
      </Link>
      <div className="p-md flex flex-col justify-between grow">
        <div>
          <div className="flex items-start justify-between gap-sm mb-sm">
            <TagList tags={recipe.tags} isNew={isNewRecipe(recipe.createdAt)} />
            <FavoriteButton recipe={recipe} />
          </div>
          <Link to={to}>
            <h2 className="font-headline-sm text-headline-sm text-on-surface mb-sm group-hover:text-primary transition-colors">
              {recipe.title}
            </h2>
          </Link>
          <p className="font-body text-body-sm text-on-surface-variant line-clamp-2">
            {recipe.excerpt}
          </p>
        </div>
        <div className="mt-md pt-sm border-t flex items-center justify-between text-body-sm font-body-sm border-outline-variant/30">
          <MetaStat icon="schedule" label={recipe.time} />
          <MetaStat icon={recipe.servingsIcon} label={recipe.servings} />
          <MetaStat icon={recipe.difficultyIcon} label={recipe.difficulty} />
        </div>
      </div>
    </article>
  )
}
