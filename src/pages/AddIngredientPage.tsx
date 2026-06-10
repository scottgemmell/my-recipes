import { useMemo, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Icon from '../components/Icon'
import ConfirmDialog from '../components/ConfirmDialog'
import { IngredientThumb, ImagePickerPanel } from '../components/IngredientImagePicker'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import {
  addIngredient,
  deleteIngredient,
  renameIngredient,
  selectCatalog,
  setIngredientImage,
} from '../features/ingredients/ingredientsSlice'
import { makeIngredientId } from '../features/ingredients/ingredientsData'
import { selectRecipes } from '../features/recipes/recipesSlice'
import { imageSrc, registerUploadedImage } from '../features/ingredients/imageRegistry'
import { uploadIngredientImage } from '../features/ingredients/imageUpload'
import { useModalFocus } from '../hooks/useModalFocus'
import { usePageTitle } from '../hooks/usePageTitle'

const baseInput =
  'w-full border rounded-md px-4 py-3 font-body text-body-md text-on-surface bg-surface-container-lowest placeholder:text-outline transition-colors focus:outline-none focus:ring-1 border-outline-variant focus:ring-primary focus:border-primary'

type PickerTarget = { mode: 'new' } | { mode: 'edit'; id: string } | null

export default function AddIngredientPage() {
  usePageTitle('Add an Ingredient')
  const dispatch = useAppDispatch()
  const catalog = useAppSelector(selectCatalog)

  const [newName, setNewName] = useState('')
  const [newImageKey, setNewImageKey] = useState<string | undefined>(undefined)
  const [newImageUrl, setNewImageUrl] = useState<string | undefined>(undefined)
  const [picker, setPicker] = useState<PickerTarget>(null)
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null)
  // Pending renames (id -> draft name). Edits live here until "Save changes"
  // commits them to the catalog; Escape discards a row's draft.
  const [drafts, setDrafts] = useState<Record<string, string>>({})
  // Focus is trapped in the picker modal while open; Escape closes it.
  const pickerDialogRef = useModalFocus<HTMLDivElement>(picker !== null, () => setPicker(null))

  // Stable order (by id) so renaming a row never makes it jump position.
  const ordered = useMemo(() => [...catalog].sort((a, b) => a.id.localeCompare(b.id)), [catalog])
  const deleteTarget = catalog.find((c) => c.id === confirmDeleteId)
  const recipes = useAppSelector(selectRecipes)
  // Recipes that will lose an ingredient line if the pending delete is confirmed.
  const affectedRecipes = confirmDeleteId
    ? recipes.filter((r) => r.ingredients.some((i) => i.ingredientId === confirmDeleteId))
    : []

  const addNew = () => {
    const name = newName.trim()
    if (!name) return
    const id = makeIngredientId(name, catalog)
    dispatch(addIngredient({ id, name, imageKey: newImageKey, imageUrl: newImageUrl }))
    setNewName('')
    setNewImageKey(undefined)
    setNewImageUrl(undefined)
  }

  const discardDraft = (id: string) =>
    setDrafts((prev) => {
      const next = { ...prev }
      delete next[id]
      return next
    })

  const saveDrafts = () => {
    for (const [id, name] of Object.entries(drafts)) {
      const trimmed = name.trim()
      if (trimmed) dispatch(renameIngredient({ id, name: trimmed }))
    }
    setDrafts({})
  }

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <Navbar active="" />

      <main className="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-lg md:py-xl">
        {/* Page Header */}
        <div className="mb-lg md:mb-xl text-center md:text-left flex flex-col md:flex-row justify-between gap-md md:items-start">
          <div>
            <p className="font-label-lg text-label-lg text-primary uppercase tracking-wider mb-sm">
              Ingredients
            </p>
            <h1 className="font-display text-display-mobile md:text-display text-on-surface mb-md">Add an Ingredient</h1>
            <p className="font-body text-body-lg text-on-surface-variant max-w-2xl">
              Build the catalog your recipes pick from — give each ingredient a name and an image.
            </p>
          </div>

          <div className="hidden md:flex flex-col items-end shrink-0 self-start">
            <span className="font-display text-[80px] leading-none font-bold text-primary">
              {ordered.length}
            </span>
            <span className="font-body text-body-sm text-on-surface-variant uppercase tracking-wider">
              {ordered.length === 1 ? 'ingredient' : 'ingredients'}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-lg bg-surface-container-lowest rounded-xl p-md md:p-lg border border-outline-variant/40 shadow-[0_4px_24px_rgba(141,170,145,0.04)]">
          {/* New ingredient */}
          <section className="flex flex-col gap-base">
            <label className="font-label-lg text-label-lg text-on-surface">New ingredient</label>
            <div className="flex flex-wrap items-center gap-sm">
              <button
                type="button"
                onClick={() => setPicker({ mode: 'new' })}
                className="w-12 h-12 shrink-0 rounded-md overflow-hidden border border-outline-variant bg-surface-container"
                title="Choose or upload an image"
              >
                <IngredientThumb
                  src={imageSrc({ imageKey: newImageKey, imageUrl: newImageUrl })}
                  alt=""
                />
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
                className="w-full md:w-auto shrink-0 px-6 py-3 rounded-full bg-primary font-label-lg text-label-lg text-on-primary hover:brightness-110 transition-all duration-200 flex items-center justify-center gap-2 shadow-[0_2px_8px_rgba(74,101,79,0.2)]"
              >
                <Icon name="done" filled className="text-[20px]" />
                Add ingredient
              </button>
            </div>
          </section>

          {/* Existing ingredients */}
          <section className="flex flex-col gap-base pt-md border-t border-outline-variant/30">
            <div className="flex items-center justify-between">
              <label className="font-label-lg text-label-lg text-on-surface">Ingredients</label>
              <span className="font-label-sm text-label-sm text-secondary">
                click an image to change or upload it
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-gutter gap-y-sm">
              {ordered.map((ing) => (
                <div key={ing.id} className="flex items-center gap-sm">
                  <button
                    type="button"
                    onClick={() => setPicker({ mode: 'edit', id: ing.id })}
                    className="w-12 h-12 shrink-0 rounded-md overflow-hidden border border-outline-variant bg-surface-container"
                    title="Change image"
                  >
                    <IngredientThumb src={imageSrc(ing)} alt={ing.name} />
                  </button>
                  {drafts[ing.id] !== undefined ? (
                    <input
                      value={drafts[ing.id]}
                      autoFocus
                      onChange={(e) =>
                        setDrafts((prev) => ({ ...prev, [ing.id]: e.target.value }))
                      }
                      onKeyDown={(e) => {
                        if (e.key === 'Escape') discardDraft(ing.id)
                      }}
                      className={`${baseInput} flex-1`}
                      aria-label={`Name for ${ing.name}`}
                    />
                  ) : (
                    <span className="group flex-1 min-w-0 flex items-center gap-xs py-3">
                      <span className="font-body text-body-md text-on-surface truncate">
                        {ing.name}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setDrafts((prev) => ({ ...prev, [ing.id]: ing.name }))
                        }
                        className="shrink-0 text-secondary hover:text-primary opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity duration-200"
                        aria-label={`Edit ${ing.name}`}
                        title="Edit name"
                      >
                        <Icon name="edit" className="text-[18px]" />
                      </button>
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => setConfirmDeleteId(ing.id)}
                    className="shrink-0 text-secondary hover:text-error p-xs"
                    aria-label={`Delete ${ing.name}`}
                    title="Delete ingredient"
                  >
                    <Icon name="delete" className="text-[20px]" />
                  </button>
                </div>
              ))}
            </div>
            {Object.keys(drafts).length > 0 && (
              <div className="flex justify-end pt-sm">
                <button
                  type="button"
                  onClick={saveDrafts}
                  className="w-full md:w-auto px-6 py-3 rounded-full bg-primary font-label-lg text-label-lg text-on-primary hover:brightness-110 transition-all duration-200 flex items-center justify-center gap-2 shadow-[0_2px_8px_rgba(74,101,79,0.2)]"
                >
                  <Icon name="done" filled className="text-[20px]" />
                  Save {Object.keys(drafts).length === 1 ? 'change' : 'changes'}
                </button>
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />

      {/* Image picker modal */}
      {picker && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-md"
          onClick={() => setPicker(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Choose an ingredient image"
        >
          <div className="absolute inset-0 bg-on-surface/40 backdrop-blur-sm" />
          <div
            ref={pickerDialogRef}
            className="relative w-full max-w-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <ImagePickerPanel
              title={
                picker.mode === 'new'
                  ? 'Choose or upload an image'
                  : `Image for ${catalog.find((c) => c.id === picker.id)?.name ?? 'ingredient'}`
              }
              onPick={(key) => {
                if (picker.mode === 'new') {
                  setNewImageKey(key)
                  setNewImageUrl(undefined)
                } else {
                  dispatch(setIngredientImage({ id: picker.id, imageKey: key }))
                }
                setPicker(null)
              }}
              onUploadFile={async (file) => {
                const name =
                  picker.mode === 'new'
                    ? newName
                    : (catalog.find((c) => c.id === picker.id)?.name ?? 'ingredient')
                setPicker(null)
                const result = await uploadIngredientImage(file, name)
                if (result.kind === 'asset') {
                  registerUploadedImage(result.key, result.url)
                  if (picker.mode === 'new') {
                    setNewImageKey(result.key)
                    setNewImageUrl(undefined)
                  } else {
                    dispatch(setIngredientImage({ id: picker.id, imageKey: result.key }))
                  }
                } else if (picker.mode === 'new') {
                  setNewImageUrl(result.dataUrl)
                  setNewImageKey(undefined)
                } else {
                  dispatch(setIngredientImage({ id: picker.id, imageUrl: result.dataUrl }))
                }
              }}
              onClear={() => {
                if (picker.mode === 'new') {
                  setNewImageKey(undefined)
                  setNewImageUrl(undefined)
                } else {
                  dispatch(setIngredientImage({ id: picker.id }))
                }
                setPicker(null)
              }}
              onClose={() => setPicker(null)}
            />
          </div>
        </div>
      )}

      <ConfirmDialog
        open={confirmDeleteId !== null}
        title="Delete ingredient?"
        message={
          affectedRecipes.length > 0 ? (
            <>
              <p>
                "{deleteTarget?.name ?? 'This ingredient'}" will be removed from the catalog and
                from {affectedRecipes.length === 1 ? 'this recipe' : 'these recipes'}:
              </p>
              <ul className="list-disc pl-md mt-xs flex flex-col gap-1">
                {affectedRecipes.map((r) => (
                  <li key={r.id} className="font-bold text-on-surface">
                    {r.title}
                  </li>
                ))}
              </ul>
            </>
          ) : (
            `"${deleteTarget?.name ?? 'This ingredient'}" will be removed from the catalog. No recipes use it.`
          )
        }
        confirmLabel="Delete"
        destructive
        onConfirm={() => {
          if (confirmDeleteId) dispatch(deleteIngredient(confirmDeleteId))
          setConfirmDeleteId(null)
        }}
        onCancel={() => setConfirmDeleteId(null)}
      />
    </div>
  )
}
