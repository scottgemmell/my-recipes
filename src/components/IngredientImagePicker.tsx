import Icon from './Icon'
import { INGREDIENT_IMAGES, resolveImageKey } from '../features/ingredients/imageRegistry'

/** Small ingredient image preview (or a placeholder when none is set). */
export function IngredientThumb({ imageKey, alt }: { imageKey?: string; alt: string }) {
  const src = resolveImageKey(imageKey)
  if (src) return <img src={src} alt={alt} className="w-full h-full object-cover" />
  return (
    <div className="w-full h-full flex items-center justify-center text-outline">
      <Icon name="image" className="text-[20px]" />
    </div>
  )
}

/** Grid of the bundled images to choose from, plus a "no image" option. */
export function ImagePickerPanel({
  title,
  onPick,
  onClear,
  onClose,
}: {
  title: string
  onPick: (key: string) => void
  onClear: () => void
  onClose: () => void
}) {
  return (
    <div className="border border-outline-variant rounded-lg p-sm bg-surface-container-low flex flex-col gap-sm">
      <div className="flex items-center justify-between">
        <span className="font-label-lg text-label-lg text-on-surface">{title}</span>
        <button
          type="button"
          onClick={onClose}
          className="text-secondary hover:text-on-surface"
          aria-label="Close image picker"
        >
          <Icon name="close" className="text-[18px]" />
        </button>
      </div>
      <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 max-h-64 overflow-y-auto pr-1">
        {INGREDIENT_IMAGES.map((img) => (
          <button
            key={img.key}
            type="button"
            onClick={() => onPick(img.key)}
            title={img.key}
            className="aspect-square rounded-md overflow-hidden border border-outline-variant hover:border-primary transition-colors"
          >
            <img src={img.src} alt={img.key} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={onClear}
        className="self-start font-label-sm text-label-sm text-secondary hover:text-error"
      >
        No image
      </button>
    </div>
  )
}
