import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Icon from '../components/Icon'
import { usePageTitle } from '../hooks/usePageTitle'

const values = [
  {
    icon: 'self_improvement',
    title: 'Mindful by design',
    body: 'Clean layouts, generous whitespace, and soft, intentional interactions keep the focus on the food.',
  },
  {
    icon: 'eco',
    title: 'Seasonal & simple',
    body: 'A small, curated mix of seasonal favorites and timeless classics, organized to inspire your next meal.',
  },
  {
    icon: 'favorite',
    title: 'Yours to keep',
    body: 'Add, edit, favorite, and tick off ingredients as you cook — your recipes, saved right in your browser.',
  },
]

export default function AboutPage() {
  usePageTitle('About')
  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <Navbar active="About" />

      <main className="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-lg md:py-xl">
        <header className="mb-lg md:mb-xl">
          <p className="font-label-lg text-label-lg text-primary uppercase tracking-wider mb-sm">
            About
          </p>
          <h1 className="font-display text-display text-on-surface mb-md">A calmer kind of cookbook.</h1>
          
        </header>

        <div className="space-y-md font-body text-body-md text-on-surface-variant">
        <p className="font-body text-body-lg text-on-surface-variant">
                    <span className="font-bold">MY Recipes</span> is a personal cookbook for the dishes
                    worth making again — a calm, uncluttered home for the meals you actually cook.
                  </p>
          <p>
            Every recipe is yours to shape: create your own, edit freely, tag and favorite the
            keepers, and check off ingredients as you go. There are no accounts and no paywalls —
            your collection lives right here on your device.
          </p>
        </div>

        <section className="grid grid-cols-1 sm:grid-cols-3 gap-gutter mt-xl">
          {values.map((value) => (
            <div
              key={value.title}
              className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-md"
            >
              <Icon name={value.icon} className="text-primary text-3xl mb-sm" />
              <h3 className="font-headline-sm text-headline-sm text-on-surface mb-xs">
                {value.title}
              </h3>
              <p className="font-body text-body-sm text-on-surface-variant">{value.body}</p>
            </div>
          ))}
        </section>

        <div className="mt-xl flex justify-center">
          <Link
            to="/"
            className="px-[24px] py-[12px] rounded-full bg-primary text-on-primary font-label-lg text-label-lg hover:brightness-110 transition-all duration-200"
          >
            Browse recipes
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  )
}
