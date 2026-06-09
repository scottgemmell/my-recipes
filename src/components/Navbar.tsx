import { Link } from 'react-router-dom'
import Icon from './Icon'

const navLinks = ['Browse', 'Collections', 'Ingredients', 'About']

interface NavbarProps {
  /** Which top-level link should render as active. */
  active?: string
}

export default function Navbar({ active = 'Collections' }: NavbarProps) {
  return (
    <nav className="w-full top-0 sticky border-b z-50 bg-surface-container-lowest border-outline-variant/30">
      <div className="flex justify-between items-center h-20 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        {/* Brand & Search */}
        <div className="flex items-center gap-md">
          <Link
            to="/"
            className="font-display text-headline-md text-primary cursor-pointer active:opacity-70"
          >
            <span className="font-body uppercase text-body-md">[ My ]</span>{' '}
            <span className="font-display">Recipes</span>
          </Link>
          <div className="hidden md:flex relative items-center ml-lg">
            <Icon
              name="search"
              className="absolute left-sm text-on-surface-variant z-10 pointer-events-none"
            />
            <input
              className="pl-[40px] pr-sm py-[8px] bg-surface-container-low border rounded-full focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary w-64 text-body-sm transition-all duration-200 border-outline-variant/50"
              placeholder="Search recipes..."
              type="text"
            />
          </div>
        </div>

        {/* Navigation Links (Desktop) */}
        <div className="hidden md:flex gap-md h-full items-center">
          {navLinks.map((label) =>
            label === active ? (
              <span
                key={label}
                className="text-primary border-b-2 border-primary pb-1 font-body text-body-md cursor-pointer"
              >
                {label}
              </span>
            ) : (
              <a
                key={label}
                href="#"
                className="text-secondary hover:text-primary font-body text-body-md cursor-pointer active:opacity-70 hover:bg-surface-container-low transition-colors duration-200 px-sm py-xs rounded"
              >
                {label}
              </a>
            ),
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-md">
          <button className="hidden md:block bg-primary text-on-primary px-md py-[12px] rounded font-label-lg text-label-lg cursor-pointer active:opacity-70 hover:brightness-110 transition-all duration-200">
            Add Recipe
          </button>
          <button className="text-secondary hover:text-primary cursor-pointer active:opacity-70 hover:bg-surface-container-low transition-colors duration-200 p-xs rounded-full flex items-center justify-center">
            <Icon name="account_circle" />
          </button>
          <button className="md:hidden text-secondary p-xs">
            <Icon name="menu" />
          </button>
        </div>
      </div>
    </nav>
  )
}
