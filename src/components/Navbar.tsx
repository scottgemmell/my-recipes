import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Icon from './Icon'
import GoogleSignIn from './GoogleSignIn'
import { useAppSelector } from '../app/hooks'
import { selectCanEdit } from '../features/auth/authSlice'

const navLinks = [
  { label: 'Browse', to: '/' },
  { label: 'Favourites', to: '/favourites' },
  { label: 'About', to: '/about' },
]

interface NavbarProps {
  /** Which top-level link should render as active. */
  active?: string
}

export default function Navbar({ active = 'Browse' }: NavbarProps) {
  const canEdit = useAppSelector(selectCanEdit)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  // Close the mobile menu on navigation and on Escape.
  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])
  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  return (
    <nav className="w-full top-0 sticky border-b z-50 bg-surface-container-lowest border-outline-variant/30">
      <div className="flex justify-between items-center h-20 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        {/* Brand */}
        <Link
          to="/"
          className="font-display text-headline-md text-primary cursor-pointer active:opacity-70"
        >
          <span className="font-body uppercase text-body-md">My</span>{' '}
          <span className="font-display">Recipes</span>
        </Link>

        {/* Navigation Links (Desktop) */}
        <div className="hidden md:flex gap-md h-full items-center">
          {navLinks.map(({ label, to }) =>
            label === active ? (
              <Link
                key={label}
                to={to}
                className="text-primary border-b-2 border-primary pb-1 font-body text-body-md cursor-pointer"
              >
                {label}
              </Link>
            ) : (
              <Link
                key={label}
                to={to}
                className="text-secondary hover:text-primary font-body text-body-md cursor-pointer active:opacity-70 hover:bg-surface-container-low transition-colors duration-200 px-sm py-xs rounded"
              >
                {label}
              </Link>
            ),
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-sm">
          {canEdit && (
            <>
              <Link
                to="/add-ingredient"
                className="hidden md:block border border-primary text-primary px-md py-[12px] rounded font-label-lg text-label-lg cursor-pointer active:opacity-70 hover:bg-surface-container-low transition-all duration-200"
              >
                Add Ingredient
              </Link>
              <Link
                to="/add"
                className="hidden md:block bg-primary text-on-primary px-md py-[12px] rounded font-label-lg text-label-lg cursor-pointer active:opacity-70 hover:brightness-110 transition-all duration-200"
              >
                Add Recipe
              </Link>
            </>
          )}
          <GoogleSignIn />
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="md:hidden text-secondary p-xs"
          >
            <Icon name={menuOpen ? 'close' : 'menu'} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden border-t border-outline-variant/30 bg-surface-container-lowest px-margin-mobile py-sm flex flex-col gap-xs"
        >
          {navLinks.map(({ label, to }) => (
            <Link
              key={label}
              to={to}
              className={`py-sm px-sm rounded font-body text-body-md ${
                label === active
                  ? 'text-primary font-semibold bg-surface-container-low'
                  : 'text-secondary hover:text-primary hover:bg-surface-container-low'
              }`}
            >
              {label}
            </Link>
          ))}
          {canEdit && (
            <div className="flex flex-col gap-sm pt-sm mt-xs border-t border-outline-variant/30">
              <Link
                to="/add"
                className="bg-primary text-on-primary text-center px-md py-[12px] rounded font-label-lg text-label-lg active:opacity-70"
              >
                Add Recipe
              </Link>
              <Link
                to="/add-ingredient"
                className="border border-primary text-primary text-center px-md py-[12px] rounded font-label-lg text-label-lg active:opacity-70"
              >
                Add Ingredient
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  )
}
