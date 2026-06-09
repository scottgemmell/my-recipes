interface IconProps {
  name: string
  /** Render the filled variant of the symbol. */
  filled?: boolean
  className?: string
}

/** Thin wrapper around Google Material Symbols (loaded in index.html). */
export default function Icon({ name, filled = false, className = '' }: IconProps) {
  return (
    <span
      aria-hidden="true"
      className={`material-symbols-outlined${filled ? ' fill-icon' : ''} ${className}`}
    >
      {name}
    </span>
  )
}
