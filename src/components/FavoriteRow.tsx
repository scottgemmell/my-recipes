import { memo } from 'react'
import { Link } from 'react-router-dom'
import RecipeImage from './RecipeImage'
import Icon from './Icon'
import TagList from './TagList'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { toggleFavorite } from '../features/recipes/recipesSlice'
import { selectCanEdit } from '../features/auth/authSlice'
import { isNewRecipe } from '../features/recipes/recent'
import { iconForDifficulty, isHardDifficulty } from '../features/recipes/difficulty'
import type { Recipe } from '../features/recipes/types'

/** Wide, landscape list item used on the Favourites page (image left, info right). */
const FavoriteRow = memo(function FavoriteRow({ recipe }: { recipe: Recipe }) {
  const dispatch = useAppDispatch()
  const canEdit = useAppSelector(selectCanEdit)
  const to = `/recipe/${recipe.slug}`
  const hard = isHardDifficulty(recipe.difficulty)

  return (
    <article className="group flex flex-row bg-surface-container-lowest border rounded-lg overflow-hidden hover-lift border-outline-variant/30">
      <Link
        to={to}
        className="w-2/5 sm:w-56 md:w-72 shrink-0 relative overflow-hidden self-stretch"
      >
        <RecipeImage
          alt={recipe.title}
          label={recipe.title}
          src={recipe.image}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </Link>

      <div className="flex flex-col justify-center grow gap-sm p-md md:px-lg min-w-0">
        <div className="flex items-start justify-between gap-sm">
          <TagList tags={recipe.tags} isNew={isNewRecipe(recipe.createdAt)} />
          {canEdit && (
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
          )}
        </div>

        <Link to={to}>
          <h2 className="font-headline-lg text-headline-lg text-on-surface group-hover:text-primary transition-colors">
            {recipe.title}
          </h2>
        </Link>

        <p className="font-body text-body-lg text-on-surface-variant line-clamp-2 max-w-2xl">
          {recipe.excerpt}
        </p>

        <div className="flex flex-wrap items-center gap-x-md gap-y-xs pt-xs text-body-md font-body-md">
          <span className="flex items-center gap-xs text-primary">
            <Icon name="schedule" className="text-[16px]" />
            <span className="font-bold">{recipe.time}</span>
          </span>
          <span className="flex items-center gap-xs text-primary">
            <Icon name="restaurant" className="text-[16px]" />
            <span className="font-bold">{recipe.servings}</span>
          </span>
          <span className={`flex items-center gap-xs ${hard ? 'text-error' : 'text-primary'}`}>
            <Icon name={iconForDifficulty(recipe.difficulty)} className="text-[16px]" />
            <span className="font-bold">{recipe.difficulty}</span>
          </span>
        </div>
      </div>
    </article>
  )
})

export default FavoriteRow
