// Stable registry of the bundled ingredient images.
//
// Keys are the source filename (without extension), e.g. "fresh-basil". We use
// import.meta.glob so every image under assets/images/ingredients is included
// automatically, and so a stored key resolves to the *current* build's hashed
// asset URL (storing the key — not the URL — keeps persisted choices valid
// across rebuilds).
const modules = import.meta.glob('../../assets/images/ingredients/*.{png,jpg,jpeg}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

export interface BundledImage {
  key: string
  src: string
}

export const INGREDIENT_IMAGES: BundledImage[] = Object.entries(modules)
  .map(([path, src]) => ({
    key: path.split('/').pop()!.replace(/\.[^.]+$/, ''),
    src,
  }))
  .sort((a, b) => a.key.localeCompare(b.key))

const byKey: Record<string, string> = Object.fromEntries(
  INGREDIENT_IMAGES.map((i) => [i.key, i.src]),
)

/** Resolve a stored image key to the current build's asset URL. */
export function resolveImageKey(key?: string): string | undefined {
  return key ? byKey[key] : undefined
}

/** Resolve an ingredient's displayable image: an uploaded data URL wins, else its bundled key. */
export function imageSrc(ing?: { imageKey?: string; imageUrl?: string }): string | undefined {
  return ing?.imageUrl || resolveImageKey(ing?.imageKey)
}
