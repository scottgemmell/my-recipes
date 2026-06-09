export default function Footer() {
  return (
    <footer className="w-full py-xl border-t mt-auto bg-surface-container border-outline-variant/30">
      <div className="flex flex-col items-center gap-md max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center">
        <div className="font-display text-headline-sm text-primary mb-sm">
          <span className="font-body uppercase text-body-md">[ My ]</span>{' '}
          <span className="font-display">Recipes</span>
        </div>
        <p className="font-body text-body-sm text-on-surface-variant">
          &copy; 2026 MY Recipes. Crafted for very mindful cooking.
        </p>
      </div>
    </footer>
  )
}
