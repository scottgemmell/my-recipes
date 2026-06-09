import { useMemo, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Icon from '../components/Icon'
import { IngredientThumb, ImagePickerPanel } from '../components/IngredientImagePicker'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import {
  addIngredient,
  renameIngredient,
  selectCatalog,
  setIngredientImage,
} from '../features/ingredients/ingredientsSlice'
import { makeIngredientId } from '../features/ingredients/ingredientsData'

const baseInput =
  'w-full border rounded-md px-4 py-3 font-body text-body-md text-on-surface bg-surface-container-lowest placeholder:text-outline transition-colors focus:outline-none focus:ring-1 border-outline-variant focus:ring-primary focus:border-primary'

type PickerTarget = { mode: 'new' } | { mode: 'edit'; id: string } | null

export default function AddIngredientPage() {
  const dispatch = useAppDispatch()
  const catalog = useAppSelector(selectCatalog)

  const [newName, setNewName] = useState('')
  const [newImageKey, setNewImageKey] = useState<string | undefined>(undefined)
  const [picker, setPicker] = useState<PickerTarget>(null)

  // Stable order (by id) so renaming a row never makes it jump position.
  const ordered = useMemo(() => [...catalog].sort((a, b) => a.id.localeCompare(b.id)), [catalog])

  const addNew = () => {
    const name = newName.trim()
    if (!name) return
    const id = makeIngredientId(name, catalog)
    dispatch(addIngredient({ id, name, imageKey: newImageKey }))
    setNewName('')
    setNewImageKey(undefined)
  }

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <Navbar active="" />

      <main className="flex-1 w-full max-w-4xl mx-auto px-margin-mobile md:px-margin-desktop py-lg flex flex-col gap-lg">
        <div className="text-center max-w-2xl mx-auto mb-md">
          <h1 className="font-display text-headline-lg-mobile md:text-headline-lg text-on-surface mb-xs">
            Add an Ingredient
          </h1>
          <p className="font-body text-body-lg text-secondary">
            Build the catalog your recipes pick from — give each ingredient a name and an image.
          </p>
        </div>

        <div className="flex flex-col gap-lg bg-surface-container-lowest rounded-xl p-md md:p-lg border border-outline-variant/40 shadow-[0_4px_24px_rgba(141,170,145,0.04)]">
          {/* New ingredient */}
          <section className="flex flex-col gap-base">
            <label className="font-label-lg text-label-lg text-on-surface">New ingredient</label>
            <div className="flex items-center gap-sm">
              <button
                type="button"
                onClick={() => setPicker({ mode: 'new' })}
                className="w-12 h-12 shrink-0 rounded-md overflow-hidden border border-outline-variant bg-surface-container"
                title="Choose image"
              >
                <IngredientThumb imageKey={newImageKey} alt="" />
              </button>
              <input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    addNew()
                  }
                }}
                placeholder="Ingredient name (e.g., Black Pepper)"
                className={`${baseInput} flex-1`}
              />
              <button
                type="button"
                onClick={addNew}
                className="shrink-0 px-5 py-3 rounded-full bg-primary text-on-primary font-label-lg text-label-lg hover:brightness-110 transition-all duration-200 flex items-center gap-2"
              >
                <Icon name="add" className="text-[18px]" /> Add
              </button>
            </div>
          </section>

          {/* Existing ingredients */}
          <section className="flex flex-col gap-base pt-md border-t border-outline-variant/30">
            <div className="flex items-center justify-between">
              <label className="font-label-lg text-label-lg text-on-surface">Ingredients</label>
              <span className="font-label-sm text-label-sm text-tertiary">
                {ordered.length} total · click an image to change it
              </span>
            </div>
            <div className="flex flex-col gap-sm">
              {ordered.map((ing) => (
                <div key={ing.id} className="flex items-center gap-sm">
                  <button
                    type="button"
                    onClick={() => setPicker({ mode: 'edit', id: ing.id })}
                    className="w-12 h-12 shrink-0 rounded-md overflow-hidden border border-outline-variant bg-surface-container"
                    title="Change image"
                  >
                    <IngredientThumb imageKey={ing.imageKey} alt={ing.name} />
                  </button>
                  <input
                    value={ing.name}
                    onChange={(e) =>
                      dispatch(renameIngredient({ id: ing.id, name: e.target.value }))
                    }
                    className={`${baseInput} flex-1`}
                    aria-label={`Name for ${ing.name}`}
                  />
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />

      {/* Image picker modal */}
      {picker && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-md"
          onClick={() => setPicker(null)}
        >
          <div className="absolute inset-0 bg-on-surface/40 backdrop-blur-sm" />
          <div className="relative w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
            <ImagePickerPanel
              title={
                picker.mode === 'new'
                  ? 'Choose an image'
                  : `Image for ${catalog.find((c) => c.id === picker.id)?.name ?? 'ingredient'}`
              }
              onPick={(key) => {
                if (picker.mode === 'new') setNewImageKey(key)
                else dispatch(setIngredientImage({ id: picker.id, imageKey: key }))
                setPicker(null)
              }}
              onClear={() => {
                if (picker.mode === 'new') setNewImageKey(undefined)
                else dispatch(setIngredientImage({ id: picker.id, imageKey: undefined }))
                setPicker(null)
              }}
              onClose={() => setPicker(null)}
            />
          </div>
        </div>
      )}
    </div>
  )
}
