import { useRef } from 'react'
import Icon from './Icon'
import { INGREDIENT_IMAGES } from '../features/ingredients/imageRegistry'

/**
 * Small ingredient image preview. With no image it shows a placeholder in the
 * same style as the recipe hero placeholder (dashed border, add-photo icon).
 */
export function IngredientThumb({ src, alt }: { src?: string; alt: string }) {
  if (src) return <img src={src} alt={alt} className="w-full h-full object-cover" />
  return (
    <div className="w-full h-full p-[3px]">
      <div className="w-full h-full rounded border border-dashed border-outline-variant flex items-center justify-center text-secondary">
        <Icon name="add_photo_alternate" className="text-[18px]" />
      </div>
    </div>
  )
}

/** Grid of the bundled images to choose from, an upload option, and a "no image" option. */
export function ImagePickerPanel({
  title,
  onPick,
  onUploadFile,
  onClear,
  onClose,
}: {
  title: string
  onPick: (key: string) => void
  onUploadFile: (file: File) => void
  onClear: () => void
  onClose: () => void
}) {
  const fileRef = useRef<HTMLInputElement>(null)

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

      <div className="flex items-center justify-between gap-sm">
        <span className="font-label-sm text-label-sm text-secondary">Pick a bundled image</span>
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="inline-flex items-center gap-xs px-3 py-2 rounded-full border border-primary text-primary font-label-lg text-label-lg hover:bg-surface-container transition-colors"
        >
          <Icon name="upload" className="text-[18px]" /> Upload image
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) onUploadFile(file)
            e.target.value = ''
          }}
        />
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
