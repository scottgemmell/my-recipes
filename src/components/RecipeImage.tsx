import { useState } from 'react'
import { pastelFor } from './pastel'

interface RecipeImageProps {
  src?: string
  alt: string
  /** Text drawn on the fallback placeholder. Defaults to `alt`. */
  label?: string
  className?: string
}

const escapeXml = (value: string): string =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/**
 * A soft placeholder rendered when an image is missing or fails to load: a
 * pastel card with a subtle diagonal hatch and the dish name as an uppercase,
 * letter-spaced caption. Returned as a data URI so it never hits the network.
 */
function placeholderFor(label: string): string {
  const { bg, accent: fg } = pastelFor(label)
  const text = escapeXml(label.toUpperCase())
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
  <defs>
    <pattern id="hatch" patternUnits="userSpaceOnUse" width="11" height="11" patternTransform="rotate(45)">
      <line x1="0" y1="0" x2="0" y2="11" stroke="${fg}" stroke-width="1.4" stroke-opacity="0.13"/>
    </pattern>
  </defs>
  <rect width="800" height="600" fill="${bg}"/>
  <rect width="800" height="600" fill="url(#hatch)"/>
  <text x="400" y="300" text-anchor="middle" dominant-baseline="middle" font-family="ui-monospace, 'SFMono-Regular', Menlo, 'Courier New', monospace" font-size="30" letter-spacing="6" fill="${fg}" fill-opacity="0.9">${text}</text>
</svg>`
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}

/** An <img> that gracefully degrades to a branded placeholder on error. */
export default function RecipeImage({ src, alt, label, className }: RecipeImageProps) {
  const [failed, setFailed] = useState(false)
  const fallback = placeholderFor(label ?? alt)
  return (
    <img
      src={!src || failed ? fallback : src}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  )
}
