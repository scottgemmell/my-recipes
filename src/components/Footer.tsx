const footerLinks = ['Privacy Policy', 'Terms of Service', 'Support', 'Contact']

export default function Footer() {
  return (
    <footer className="w-full py-xl border-t mt-auto bg-surface-container border-outline-variant/30">
      <div className="flex flex-col items-center gap-md max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center">
        <div className="font-display text-headline-sm text-primary mb-sm">
          <span className="font-body uppercase text-body-md">[ My ]</span>{' '}
          <span className="font-display">Recipes</span>
        </div>
        <div className="flex flex-wrap justify-center gap-md mb-sm">
          {footerLinks.map((label, i) => (
            <span key={label} className="flex items-center gap-md">
              <a
                href="#"
                className="text-body-sm text-on-surface-variant hover:text-primary transition-colors"
              >
                {label}
              </a>
              {i < footerLinks.length - 1 && (
                <span className="text-outline-variant/30">|</span>
              )}
            </span>
          ))}
        </div>
        <p className="font-body text-body-sm text-on-surface-variant">
          © 2026 [ My ] Recipes. Crafted for mindful cooking.
        </p>
      </div>
    </footer>
  )
}
