import { useState } from 'react'

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
 * An on-brand SVG placeholder rendered when a remote image is missing or fails
 * to load. Returned as a data URI so it never makes a network request.
 */
function placeholderFor(label: string): string {
  const text = escapeXml(label)
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#ecefe9"/>
      <stop offset="100%" stop-color="#cae7cb"/>
    </linearGradient>
  </defs>
  <rect width="800" height="600" fill="url(#bg)"/>
  <g fill="none" stroke="#236939" stroke-opacity="0.30">
    <circle cx="400" cy="248" r="90" stroke-width="6"/>
    <circle cx="400" cy="248" r="66" stroke-width="4"/>
  </g>
  <text x="400" y="416" text-anchor="middle" font-family="'Playfair Display', Georgia, serif" font-size="40" font-weight="700" fill="#236939" fill-opacity="0.85">${text}</text>
  <text x="400" y="458" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="16" letter-spacing="4" fill="#4a654e" fill-opacity="0.65">CULINARY ZEN</text>
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
