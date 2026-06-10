/**
 * Soft pastel palette shared by the image placeholders and the tag chips.
 *
 * `accent` is the mid-tone used for large placeholder artwork; `text` is a
 * darker companion that keeps 11px chip text at AA contrast on the pastel.
 */
export interface Pastel {
  bg: string
  accent: string
  text: string
}

export const pastels: Pastel[] = [
  { bg: '#dff1e1', accent: '#5b8c6a', text: '#2f5e40' }, // green
  { bg: '#d9ecdc', accent: '#6a9472', text: '#2f5e40' }, // sage
  { bg: '#f3ecc0', accent: '#9a8b3e', text: '#6b5e1c' }, // straw
  { bg: '#f7ded0', accent: '#b07a5e', text: '#8a4a28' }, // peach
  { bg: '#f2d6e6', accent: '#a96d92', text: '#8a3f6b' }, // rose
  { bg: '#f8ddc0', accent: '#bf8049', text: '#8c5420' }, // apricot
]

// Tags with a fixed colour: the leafy ones stay pastel green.
const FIXED: Record<string, number> = {
  vegetarian: 0,
  vegan: 0,
  salad: 1,
}

/** Deterministically pick a palette entry from the label text. */
export function pastelFor(label: string): Pastel {
  const fixed = FIXED[label.trim().toLowerCase()]
  if (fixed !== undefined) return pastels[fixed]
  let hash = 0
  for (let i = 0; i < label.length; i += 1) hash = (hash * 31 + label.charCodeAt(i)) >>> 0
  return pastels[hash % pastels.length]
}
