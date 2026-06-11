import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { toggleFavorite } from '../features/recipes/recipesSlice'
import { selectCanEdit } from '../features/auth/authSlice'
import type { Recipe } from '../features/recipes/types'
import Icon from './Icon'
import RecipeImage from './RecipeImage'
import TagList from './TagList'
import { isNewRecipe } from '../features/recipes/recent'
import { iconForDifficulty, isHardDifficulty } from '../features/recipes/difficulty'

interface RecipeCardProps {
  recipe: Recipe
}

function FavoriteButton({ recipe }: RecipeCardProps) {
  const dispatch = useAppDispatch()
  const canEdit = useAppSelector(selectCanEdit)
  if (!canEdit) return null
  return (
    <button
      type="button"
      aria-pressed={recipe.favorite}
      aria-label={recipe.favorite ? 'Remove from favorites' : 'Add to favorites'}
      onClick={() => dispatch(toggleFavorite(recipe.id))}
      className={
        recipe.favorite
          ? 'shrink-0 text-error transition-transform duration-150 active:scale-90'
          : 'shrink-0 text-on-surface-variant hover:text-error transition-[color,transform] duration-150 active:scale-90'
      }
    >
      <Icon
        key={recipe.favorite ? 'favorite' : 'unfavorite'}
        name={recipe.favorite ? 'favorite' : 'favorite_border'}
        filled={recipe.favorite}
        className={recipe.favorite ? 'animate-pop' : ''}
      />
    </button>
  )
}

function MetaStat({
  icon,
  label,
  tone = 'text-primary',
}: {
  icon: string
  label: string
  tone?: string
}) {
  return (
    <div className={`flex items-center gap-xs ${tone}`}>
      <Icon name={icon} className="text-[16px]" />
      <span className="font-bold">{label}</span>
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
            <p className="font-body text-body-lg text-on-surface-variant line-clamp-3">
              {recipe.excerpt}
            </p>
          </div>
          <div className="mt-lg pt-sm border-t flex items-center justify-between border-outline-variant/30">
            <Link
              to={to}
              className="font-body-md text-body-md text-primary flex items-center gap-xs group/link"
            >
              View Recipe{' '}
              <Icon
                name="arrow_forward"
                className="text-[16px] transition-transform duration-200 group-hover/link:translate-x-1"
              />
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
            <h2 className="font-headline-md text-headline-md text-on-surface mb-sm group-hover:text-primary transition-colors">
              {recipe.title}
            </h2>
          </Link>
          <p className="font-body text-body-md text-on-surface-variant line-clamp-2">
            {recipe.excerpt}
          </p>
        </div>
        <div className="mt-md pt-sm border-t flex items-center justify-between text-body-md font-body-md border-outline-variant/30">
          <MetaStat icon="schedule" label={recipe.time} />
          <MetaStat icon="restaurant" label={recipe.servings} />
          <MetaStat
            icon={iconForDifficulty(recipe.difficulty)}
            label={recipe.difficulty}
            tone={isHardDifficulty(recipe.difficulty) ? 'text-error' : 'text-primary'}
          />
        </div>
      </div>
    </article>
  )
}
