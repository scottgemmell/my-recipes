import { Link } from 'react-router-dom'
import Icon from './Icon'

const navLinks = ['Browse', 'About']

interface NavbarProps {
  /** Which top-level link should render as active. */
  active?: string
}

export default function Navbar({ active = 'Browse' }: NavbarProps) {
  return (
    <nav className="w-full top-0 sticky border-b z-50 bg-surface-container-lowest border-outline-variant/30">
      <div className="flex justify-between items-center h-20 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        {/* Brand */}
        <Link
          to="/"
          className="font-display text-headline-md text-primary cursor-pointer active:opacity-70"
        >
          <span className="font-body uppercase text-body-md">[ My ]</span>{' '}
          <span className="font-display">Recipes</span>
        </Link>

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
          <Link
            to="/add"
            className="hidden md:block bg-primary text-on-primary px-md py-[12px] rounded font-label-lg text-label-lg cursor-pointer active:opacity-70 hover:brightness-110 transition-all duration-200"
          >
            Add Recipe
          </Link>
          <button className="md:hidden text-secondary p-xs">
            <Icon name="menu" />
          </button>
        </div>
      </div>
    </nav>
  )
}
