import { Link } from 'react-router-dom'
import { pastelFor } from './pastel'

interface TagListProps {
  tags: string[]
  /** Show the date-based "New" pill first (not a link). */
  isNew?: boolean
}

const pill = 'font-label-sm text-label-sm uppercase tracking-wider px-2 py-[2px] rounded'

/**
 * Tag-cloud of small uppercase pills, tinted with the same pastel palette as
 * the image placeholders (each tag keeps a stable colour; the leafy tags are
 * pinned to the greens). Each tag links to its tag page.
 */
export default function TagList({ tags, isNew = false }: TagListProps) {
  return (
    <div className="flex flex-wrap gap-xs">
      {isNew && <span className={`${pill} bg-primary text-on-primary`}>New</span>}
      {tags.map((tag) => {
        const { bg, text } = pastelFor(tag)
        return (
          <Link
            key={tag}
            to={`/tag/${encodeURIComponent(tag)}`}
            style={{ backgroundColor: bg, color: text }}
            className={`${pill} hover:brightness-95 transition-[filter] duration-200`}
          >
            {tag}
          </Link>
        )
      })}
    </div>
  )
}
