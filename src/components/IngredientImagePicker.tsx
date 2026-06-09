import { useRef } from 'react'
import Icon from './Icon'
import { INGREDIENT_IMAGES } from '../features/ingredients/imageRegistry'
import { fileToDataUrl } from '../features/ingredients/imageUpload'

/** Small ingredient image preview (or a placeholder when none is set). */
export function IngredientThumb({ src, alt }: { src?: string; alt: string }) {
  if (src) return <img src={src} alt={alt} className="w-full h-full object-cover" />
  return (
    <div className="w-full h-full flex items-center justify-center text-outline">
      <Icon name="image" className="text-[20px]" />
    </div>
  )
}

/** Grid of the bundled images to choose from, an upload option, and a "no image" option. */
export function ImagePickerPanel({
  title,
  onPick,
  onUpload,
  onClear,
  onClose,
}: {
  title: string
  onPick: (key: string) => void
  onUpload: (dataUrl: string) => void
  onClear: () => void
  onClose: () => void
}) {
  const fileRef = useRef<HTMLInputElement>(null)

  const handleFile = async (file?: File) => {
    if (!file) return
    try {
      onUpload(await fileToDataUrl(file))
    } catch {
      // ignore unreadable / non-image files
    }
  }

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
        <span className="font-label-sm text-label-sm text-tertiary">Pick a bundled image</span>
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
          onChange={(e) => handleFile(e.target.files?.[0])}
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
