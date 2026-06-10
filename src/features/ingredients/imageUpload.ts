export type UploadResult =
  | { kind: 'asset'; key: string; url: string }
  | { kind: 'data'; dataUrl: string }

/**
 * Upload an ingredient image. In dev this POSTs to the upload endpoint, which
 * writes the file into assets/images/ingredients and returns its key — so the
 * ingredient stores a filename, not a data URL. If the endpoint isn't available
 * (e.g. a static production build) it falls back to a data URL.
 */
export async function uploadIngredientImage(file: File, name: string): Promise<UploadResult> {
  const dataUrl = await fileToDataUrl(file, 800)
  try {
    const res = await fetch('/__ingredient-upload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name || 'ingredient', dataUrl }),
    })
    if (res.ok) {
      const json = (await res.json()) as { key?: string; url?: string }
      if (json.key && json.url) return { kind: 'asset', key: json.key, url: json.url }
    }
  } catch {
    /* endpoint unavailable — fall back to a data URL */
  }
  return { kind: 'data', dataUrl }
}

/**
 * Read an image File and return a downscaled JPEG data URL.
 *
 * Uploaded images are persisted in localStorage, so we cap the largest side
 * (default 512px) and re-encode to keep the stored string small.
 */
export function fileToDataUrl(file: File, maxSize = 512): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('That file is not an image.'))
      return
    }
    const reader = new FileReader()
    reader.onerror = () => reject(reader.error ?? new Error('Could not read file.'))
    reader.onload = () => {
      const dataUrl = reader.result as string
      const img = new Image()
      img.onerror = () => reject(new Error('Could not load image.'))
      img.onload = () => {
        const scale = Math.min(1, maxSize / Math.max(img.width, img.height))
        const w = Math.max(1, Math.round(img.width * scale))
        const h = Math.max(1, Math.round(img.height * scale))
        const canvas = document.createElement('canvas')
        canvas.width = w
        canvas.height = h
        const ctx = canvas.getContext('2d')
        if (!ctx) {
          resolve(dataUrl) // fall back to the original
          return
        }
        ctx.drawImage(img, 0, 0, w, h)
        resolve(canvas.toDataURL('image/jpeg', 0.82))
      }
      img.src = dataUrl
    }
    reader.readAsDataURL(file)
  })
}
