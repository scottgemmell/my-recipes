import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="w-full py-xl border-t mt-auto bg-surface-container border-outline-variant/30">
      <div className="flex flex-col items-center max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center">
        <div className="font-display text-headline-sm text-primary">
          <span className="font-body uppercase text-body-md">My</span>{' '}
          <span className="font-display">Recipes</span>
        </div>
        <p className="mt-xs font-body text-body-sm text-on-surface-variant">
          &copy; 2026 MY Recipes. Crafted for very mindful cooking.
        </p>
        <Link
          to="/export-import"
          className="mt-lg font-body text-label-sm text-on-surface-variant/70 hover:text-primary transition-colors"
        >
          Export / Import
        </Link>
      </div>
    </footer>
  )
}
