import { Link } from 'react-router-dom'

interface TagListProps {
  tags: string[]
  /** Show the date-based "New" pill first (not a link). */
  isNew?: boolean
}

const pill = 'font-label-sm text-label-sm uppercase tracking-wider px-2 py-[2px] rounded'

/** Tag-cloud of small uppercase pills. Each tag links to its tag page. */
export default function TagList({ tags, isNew = false }: TagListProps) {
  return (
    <div className="flex flex-wrap gap-xs">
      {isNew && <span className={`${pill} bg-primary text-on-primary`}>New</span>}
      {tags.map((tag) => (
        <Link
          key={tag}
          to={`/tag/${encodeURIComponent(tag)}`}
          className={`${pill} bg-surface-container-high text-on-surface-variant hover:bg-secondary-container hover:text-on-secondary-container transition-colors`}
        >
          {tag}
        </Link>
      ))}
    </div>
  )
}
