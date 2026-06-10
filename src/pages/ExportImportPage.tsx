import { useRef, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Icon from '../components/Icon'
import { useAppSelector } from '../app/hooks'
import { STORAGE_KEY } from '../app/store'

interface PendingImport {
  json: string
  recipeCount: number
  ingredientCount: number
  fileName: string
}

export default function ExportImportPage() {
  const recipes = useAppSelector((s) => s.recipes)
  const ingredients = useAppSelector((s) => s.ingredients)
  const fileRef = useRef<HTMLInputElement>(null)
  const [pending, setPending] = useState<PendingImport | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleExport = () => {
    const data = JSON.stringify({ recipes, ingredients }, null, 2)
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `culinary-zen-backup-${new Date().toISOString().slice(0, 10)}.json`
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  const handleFile = (file?: File) => {
    setError(null)
    setPending(null)
    if (!file) return
    const reader = new FileReader()
    reader.onerror = () => setError('Could not read that file.')
    reader.onload = () => {
      try {
        const json = reader.result as string
        const parsed = JSON.parse(json)
        if (
          !parsed?.recipes ||
          !Array.isArray(parsed.recipes.items) ||
          !parsed?.ingredients ||
          !Array.isArray(parsed.ingredients.items)
        ) {
          setError('That doesn’t look like a Culinary Zen backup file.')
          return
        }
        setPending({
          json,
          recipeCount: parsed.recipes.items.length,
          ingredientCount: parsed.ingredients.items.length,
          fileName: file.name,
        })
      } catch {
        setError('Could not read that file — is it valid JSON?')
      }
    }
    reader.readAsText(file)
  }

  const confirmImport = () => {
    if (!pending) return
    try {
      localStorage.setItem(STORAGE_KEY, pending.json)
      // Full navigation so the store re-hydrates from the imported state.
      window.location.href = '/'
    } catch {
      setError('Could not save the imported data (storage may be full).')
    }
  }

  const primaryBtn =
    'inline-flex items-center gap-2 px-5 py-3 rounded-full bg-primary text-on-primary font-label-lg text-label-lg hover:brightness-110 transition-all duration-200'

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <Navbar active="" />

      <main className="flex-1 w-full max-w-3xl mx-auto px-margin-mobile md:px-margin-desktop py-lg flex flex-col gap-lg">
        <div className="text-center max-w-2xl mx-auto mb-md">
          <h1 className="font-display text-headline-lg-mobile md:text-headline-lg text-on-surface mb-xs">
            Export &amp; Import
          </h1>
          <p className="font-body text-body-lg text-secondary">
            Your recipes and ingredient catalog live only in this browser. Back them up to a file,
            or restore them from one.
          </p>
        </div>

        <div className="flex flex-col gap-lg bg-surface-container-lowest rounded-xl p-md md:p-lg border border-outline-variant/40 shadow-[0_4px_24px_rgba(141,170,145,0.04)]">
          {/* Export */}
          <section className="flex flex-col gap-sm">
            <h2 className="font-headline-sm text-headline-sm text-on-surface">Export a backup</h2>
            <p className="font-body text-body-md text-on-surface-variant">
              Download everything saved here — {recipes.items.length} recipe
              {recipes.items.length === 1 ? '' : 's'} and {ingredients.items.length} ingredient
              {ingredients.items.length === 1 ? '' : 's'} — as a single JSON file.
            </p>
            <button type="button" onClick={handleExport} className={`self-start ${primaryBtn}`}>
              <Icon name="download" className="text-[18px]" /> Download backup
            </button>
          </section>

          {/* Import */}
          <section className="flex flex-col gap-sm pt-md border-t border-outline-variant/30">
            <h2 className="font-headline-sm text-headline-sm text-on-surface">Import a backup</h2>
            <p className="font-body text-body-md text-on-surface-variant">
              Restore from a previously exported file. This <strong>replaces</strong> all recipes and
              ingredients currently in this browser.
            </p>
            <div>
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-primary text-primary font-label-lg text-label-lg hover:bg-surface-container-low transition-colors"
              >
                <Icon name="upload" className="text-[18px]" /> Choose backup file…
              </button>
              <input
                ref={fileRef}
                type="file"
                accept="application/json,.json"
                className="hidden"
                onChange={(e) => handleFile(e.target.files?.[0])}
              />
            </div>

            {error && (
              <p className="font-body text-body-sm text-error" role="alert">
                {error}
              </p>
            )}

            {pending && (
              <div className="mt-sm border border-outline-variant rounded-lg p-sm bg-surface-container-low flex flex-col gap-sm">
                <p className="font-body text-body-md text-on-surface">
                  <span className="font-bold">{pending.fileName}</span> — {pending.recipeCount}{' '}
                  recipes, {pending.ingredientCount} ingredients. Restoring will replace everything
                  currently saved in this browser.
                </p>
                <div className="flex flex-wrap gap-sm">
                  <button
                    type="button"
                    onClick={confirmImport}
                    className={primaryBtn}
                  >
                    <Icon name="restore" className="text-[18px]" /> Restore &amp; reload
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setPending(null)
                      if (fileRef.current) fileRef.current.value = ''
                    }}
                    className="px-5 py-3 rounded-full border border-tertiary text-on-surface font-label-lg text-label-lg hover:bg-surface-container-low transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
