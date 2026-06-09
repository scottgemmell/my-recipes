import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Form, Field } from 'react-final-form'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Icon from '../components/Icon'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import {
  addRecipe,
  selectRecipeBySlug,
  selectRecipes,
  updateRecipe,
} from '../features/recipes/recipesSlice'
import {
  addIngredient,
  selectCatalog,
  setIngredientImage,
} from '../features/ingredients/ingredientsSlice'
import { makeIngredientId } from '../features/ingredients/ingredientsData'
import { INGREDIENT_IMAGES, resolveImageKey } from '../features/ingredients/imageRegistry'
import type { Recipe } from '../features/recipes/types'

interface IngredientRow {
  ingredientId: string
  amount: string
}

interface FormValues {
  image?: string
  title?: string
  description?: string
  tags?: string
  time?: string
  yield?: string
  difficulty?: string
  ingredients?: IngredientRow[]
  instructions?: string
}

const DIFFICULTIES = ['Easy', 'Medium', 'Hard']

/** Split a comma-separated tags string into a clean, de-duplicated list. */
function parseTags(text: string): string[] {
  const seen = new Set<string>()
  const result: string[] = []
  for (const raw of text.split(',')) {
    const tag = raw.trim()
    const key = tag.toLowerCase()
    if (tag && !seen.has(key)) {
      seen.add(key)
      result.push(tag)
    }
  }
  return result
}

const baseInput =
  'w-full border rounded-md px-4 py-3 font-body text-body-md text-on-surface bg-surface-container-lowest placeholder:text-outline transition-colors focus:outline-none focus:ring-1'
const okBorder = 'border-outline-variant focus:ring-primary focus:border-primary'
const errBorder = 'border-error focus:ring-error focus:border-error'

const required = (value?: string) =>
  value && value.trim() ? undefined : 'This field is required'

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

// Map a (possibly legacy free-text) ingredient name to a deterministic catalog
// id: the slug of the text before the first comma. Seed catalog ids follow the
// same rule, so e.g. "Heirloom Tomatoes, sliced" -> "heirloom-tomatoes".
const ingredientIdForName = (name: string) => slugify(name.split(',')[0]) || slugify(name)

const validateIngredients = (rows?: IngredientRow[]) =>
  rows && rows.some((r) => r.ingredientId) ? undefined : 'Add at least one ingredient'

// Each step line is "title | description" (title optional). With no "|" the
// line is the description and gets an auto "Step N" title. This mirrors the
// ingredient format so step titles round-trip through editing.
function parseSteps(text: string): Recipe['steps'] {
  return text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line, i) => {
      const sep = line.indexOf('|')
      if (sep === -1) {
        return { title: `Step ${i + 1}`, description: line.replace(/^\s*\d+[.)]\s*/, '') }
      }
      return { title: line.slice(0, sep).trim(), description: line.slice(sep + 1).trim() }
    })
}

/** Serialise stored steps back into the "title | description" textarea format. */
function stepsToText(steps: Recipe['steps']): string {
  return steps
    .map((s) => (/^Step \d+$/.test(s.title) ? s.description : `${s.title} | ${s.description}`))
    .join('\n')
}

/** Label + input + inline error, wired to a React Final Form field. */
function InputField({
  name,
  label,
  placeholder,
  hint,
  validate,
}: {
  name: string
  label: string
  placeholder: string
  hint?: string
  validate?: (v?: string) => string | undefined
}) {
  return (
    <Field name={name} validate={validate}>
      {({ input, meta }) => {
        const showError = (meta.touched || meta.submitFailed) && meta.error
        return (
          <div className="flex flex-col gap-base">
            <div className="flex items-center justify-between">
              <label className="font-label-lg text-label-lg text-on-surface">{label}</label>
              {hint && <span className="font-label-sm text-label-sm text-tertiary">{hint}</span>}
            </div>
            <input
              {...input}
              placeholder={placeholder}
              className={`${baseInput} ${showError ? errBorder : okBorder}`}
            />
            {showError && (
              <p className="font-label-sm text-label-sm text-error">{meta.error}</p>
            )}
          </div>
        )
      }}
    </Field>
  )
}

/** Label + textarea + inline error, wired to a React Final Form field. */
function TextAreaField({
  name,
  label,
  placeholder,
  hint,
  rows = 3,
  validate,
}: {
  name: string
  label: string
  placeholder: string
  hint?: string
  rows?: number
  validate?: (v?: string) => string | undefined
}) {
  return (
    <Field name={name} validate={validate}>
      {({ input, meta }) => {
        const showError = (meta.touched || meta.submitFailed) && meta.error
        return (
          <div className="flex flex-col gap-base">
            <div className="flex items-center justify-between">
              <label className="font-label-lg text-label-lg text-on-surface">{label}</label>
              {hint && <span className="font-label-sm text-label-sm text-tertiary">{hint}</span>}
            </div>
            <textarea
              {...input}
              rows={rows}
              placeholder={placeholder}
              className={`${baseInput} resize-y ${showError ? errBorder : okBorder}`}
            />
            {showError && (
              <p className="font-label-sm text-label-sm text-error">{meta.error}</p>
            )}
          </div>
        )
      }}
    </Field>
  )
}

/** Label + native select, wired to a React Final Form field. */
function SelectField({
  name,
  label,
  options,
}: {
  name: string
  label: string
  options: string[]
}) {
  return (
    <Field name={name}>
      {({ input }) => (
        <div className="flex flex-col gap-base">
          <label className="font-label-lg text-label-lg text-on-surface">{label}</label>
          <select {...input} className={`${baseInput} ${okBorder} cursor-pointer`}>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      )}
    </Field>
  )
}

/** Small ingredient image preview (or a placeholder when none is set). */
function IngredientThumb({ imageKey, alt }: { imageKey?: string; alt: string }) {
  const src = resolveImageKey(imageKey)
  if (src) return <img src={src} alt={alt} className="w-full h-full object-cover" />
  return (
    <div className="w-full h-full flex items-center justify-center text-outline">
      <Icon name="image" className="text-[20px]" />
    </div>
  )
}

/** Grid of bundled images to choose from, plus a "no image" option. */
function ImagePickerPanel({
  title,
  onPick,
  onClear,
  onClose,
}: {
  title: string
  onPick: (key: string) => void
  onClear: () => void
  onClose: () => void
}) {
  return (
    <div className="border border-outline-variant rounded-lg p-sm bg-surface-container-low flex flex-col gap-sm">
      <div className="flex items-center justify-between">
        <span className="font-label-lg text-label-lg text-on-surface">{title}</span>
        <button
          type="button"
          onClick={onClose}
          className="text-secondary hover:text-on-surface"
          aria-label="Close image picker"
        >
          <Icon name="close" className="text-[18px]" />
        </button>
      </div>
      <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 max-h-64 overflow-y-auto pr-1">
        {INGREDIENT_IMAGES.map((img) => (
          <button
            key={img.key}
            type="button"
            onClick={() => onPick(img.key)}
            title={img.key}
            className="aspect-square rounded-md overflow-hidden border border-outline-variant hover:border-primary transition-colors"
          >
            <img src={img.src} alt={img.key} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={onClear}
        className="self-start font-label-sm text-label-sm text-secondary hover:text-error"
      >
        No image
      </button>
    </div>
  )
}

/**
 * Ingredients editor: each row picks a catalog ingredient + amount. New
 * ingredients can be added to the catalog (with a bundled image), and an
 * existing ingredient's image can be changed (which updates it everywhere).
 */
function IngredientsField() {
  const catalog = useAppSelector(selectCatalog)
  const dispatch = useAppDispatch()
  const [adding, setAdding] = useState(false)
  const [newName, setNewName] = useState('')
  const [newImageKey, setNewImageKey] = useState<string | undefined>(undefined)
  const [picker, setPicker] = useState<{ mode: 'new' } | { mode: 'edit'; id: string } | null>(
    null,
  )

  const byId = new Map(catalog.map((c) => [c.id, c]))
  const sorted = [...catalog].sort((a, b) => a.name.localeCompare(b.name))

  return (
    <Field<IngredientRow[]> name="ingredients" validate={validateIngredients}>
      {({ input, meta }) => {
        const rows: IngredientRow[] = input.value || []
        const setRows = (next: IngredientRow[]) => input.onChange(next)
        const showError = (meta.touched || meta.submitFailed) && meta.error

        const addCatalogIngredient = () => {
          const name = newName.trim()
          if (!name) return
          const id = makeIngredientId(name, catalog)
          dispatch(addIngredient({ id, name, imageKey: newImageKey }))
          const emptyIdx = rows.findIndex((r) => !r.ingredientId)
          if (emptyIdx !== -1) {
            const next = rows.slice()
            next[emptyIdx] = { ...next[emptyIdx], ingredientId: id }
            setRows(next)
          } else {
            setRows([...rows, { ingredientId: id, amount: '' }])
          }
          setNewName('')
          setNewImageKey(undefined)
          setAdding(false)
        }

        return (
          <section className="flex flex-col gap-base">
            <div className="flex items-center justify-between">
              <label className="font-label-lg text-label-lg text-on-surface">Ingredients</label>
              <span className="font-label-sm text-label-sm text-tertiary">
                Pick from the catalog
              </span>
            </div>

            <div className="flex flex-col gap-sm">
              {rows.map((row, i) => {
                const cat = byId.get(row.ingredientId)
                return (
                  <div key={i} className="flex items-center gap-sm">
                    <button
                      type="button"
                      disabled={!row.ingredientId}
                      onClick={() =>
                        row.ingredientId && setPicker({ mode: 'edit', id: row.ingredientId })
                      }
                      className="w-11 h-11 shrink-0 rounded-md overflow-hidden border border-outline-variant bg-surface-container disabled:opacity-50"
                      title={row.ingredientId ? 'Change image' : 'Pick an ingredient first'}
                    >
                      <IngredientThumb imageKey={cat?.imageKey} alt={cat?.name ?? ''} />
                    </button>
                    <div className="flex-1 min-w-0">
                      <select
                        value={row.ingredientId}
                        onChange={(e) => {
                          const next = rows.slice()
                          next[i] = { ...next[i], ingredientId: e.target.value }
                          setRows(next)
                        }}
                        className={`${baseInput} ${okBorder} cursor-pointer`}
                      >
                        <option value="">Select an ingredient…</option>
                        {sorted.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="w-24 md:w-32 shrink-0">
                      <input
                        value={row.amount}
                        onChange={(e) => {
                          const next = rows.slice()
                          next[i] = { ...next[i], amount: e.target.value }
                          setRows(next)
                        }}
                        placeholder="Amount"
                        className={`${baseInput} ${okBorder}`}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => setRows(rows.filter((_, j) => j !== i))}
                      className="shrink-0 text-secondary hover:text-error p-xs"
                      aria-label="Remove ingredient"
                    >
                      <Icon name="close" className="text-[20px]" />
                    </button>
                  </div>
                )
              })}
            </div>

            {showError && <p className="font-label-sm text-label-sm text-error">{meta.error}</p>}

            <div className="flex flex-wrap gap-md">
              <button
                type="button"
                onClick={() => setRows([...rows, { ingredientId: '', amount: '' }])}
                className="inline-flex items-center gap-xs font-label-lg text-label-lg text-primary hover:underline"
              >
                <Icon name="add" className="text-[18px]" /> Add ingredient
              </button>
              <button
                type="button"
                onClick={() => setAdding((v) => !v)}
                className="inline-flex items-center gap-xs font-label-lg text-label-lg text-secondary hover:text-on-surface"
              >
                <Icon name="add_circle" className="text-[18px]" /> New ingredient
              </button>
            </div>

            {adding && (
              <div className="border border-outline-variant rounded-lg p-sm bg-surface-container-low flex flex-col gap-sm">
                <span className="font-label-lg text-label-lg text-on-surface">New ingredient</span>
                <div className="flex items-center gap-sm">
                  <button
                    type="button"
                    onClick={() => setPicker({ mode: 'new' })}
                    className="w-11 h-11 shrink-0 rounded-md overflow-hidden border border-outline-variant bg-surface-container"
                    title="Choose image"
                  >
                    <IngredientThumb imageKey={newImageKey} alt="" />
                  </button>
                  <input
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="Ingredient name (e.g., Black Pepper)"
                    className={`${baseInput} ${okBorder} flex-1`}
                  />
                  <button
                    type="button"
                    onClick={addCatalogIngredient}
                    className="shrink-0 px-4 py-2 rounded-full bg-primary text-on-primary font-label-lg text-label-lg hover:brightness-110"
                  >
                    Add
                  </button>
                </div>
              </div>
            )}

            {picker && (
              <ImagePickerPanel
                title={
                  picker.mode === 'new'
                    ? 'Choose an image'
                    : `Image for ${byId.get(picker.id)?.name ?? 'ingredient'}`
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
            )}
          </section>
        )
      }}
    </Field>
  )
}

/** Drag-and-drop / click-to-browse hero image picker storing a data URL. */
function HeroImageField() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragOver, setDragOver] = useState(false)

  return (
    <Field name="image">
      {({ input }) => {
        const readFile = (file?: File) => {
          if (!file || !file.type.startsWith('image/')) return
          const reader = new FileReader()
          reader.onload = () => input.onChange(reader.result as string)
          reader.readAsDataURL(file)
        }
        return (
          <section className="flex flex-col gap-base">
            <label className="font-label-lg text-label-lg text-on-surface">Hero Image</label>
            <div
              role="button"
              tabIndex={0}
              onClick={() => inputRef.current?.click()}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') inputRef.current?.click()
              }}
              onDragOver={(e) => {
                e.preventDefault()
                setDragOver(true)
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => {
                e.preventDefault()
                setDragOver(false)
                readFile(e.dataTransfer.files?.[0])
              }}
              className={`w-full h-48 md:h-72 border-2 border-dashed rounded-lg flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 relative overflow-hidden hover:border-primary/50 hover:bg-surface-container-low ${
                dragOver ? 'border-primary bg-surface-container-low' : 'border-outline-variant'
              }`}
            >
              {input.value ? (
                <>
                  <img
                    src={input.value as string}
                    alt="Recipe preview"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      input.onChange('')
                    }}
                    className="absolute top-sm right-sm bg-surface-container-lowest/90 backdrop-blur text-on-surface rounded-full p-xs flex items-center shadow"
                    aria-label="Remove image"
                  >
                    <Icon name="close" className="text-[18px]" />
                  </button>
                </>
              ) : (
                <>
                  <Icon
                    name="add_photo_alternate"
                    className="text-4xl mb-xs text-secondary"
                  />
                  <p className="font-body text-body-md text-secondary">
                    Drag and drop, or click to browse
                  </p>
                  <p className="font-label-sm text-label-sm mt-2 text-secondary">
                    High-resolution JPEG or PNG
                  </p>
                </>
              )}
              <input
                ref={inputRef}
                type="file"
                accept="image/png,image/jpeg"
                className="hidden"
                onChange={(e) => readFile(e.target.files?.[0])}
              />
            </div>
          </section>
        )
      }}
    </Field>
  )
}

export default function AddRecipePage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { slug } = useParams()
  const recipes = useAppSelector(selectRecipes)
  const editingRecipe = useAppSelector(selectRecipeBySlug(slug ?? ''))
  const catalog = useAppSelector(selectCatalog)
  const isEditing = Boolean(slug)

  // Ensure any legacy (free-text) ingredients on the recipe being edited exist
  // in the catalog so they can be selected in the picker.
  useEffect(() => {
    if (!editingRecipe) return
    const have = new Set(catalog.map((c) => c.id))
    editingRecipe.ingredients.forEach((ing) => {
      const id = ing.ingredientId || ingredientIdForName(ing.name)
      if (id && !have.has(id)) {
        dispatch(addIngredient({ id, name: ing.name.split(',')[0].trim() || ing.name }))
        have.add(id)
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug])

  // Memoised so dispatching to the ingredient catalog (add / change image) does
  // not change the initialValues identity and reset the whole form.
  const initialValues = useMemo<FormValues>(
    () =>
      editingRecipe
        ? {
            image: editingRecipe.image || undefined,
            title: editingRecipe.title,
            description: editingRecipe.description,
            tags: editingRecipe.tags.join(', '),
            time: editingRecipe.time === '—' ? '' : editingRecipe.time,
            yield: editingRecipe.servings === '—' ? '' : editingRecipe.servings,
            difficulty: editingRecipe.difficulty,
            ingredients: editingRecipe.ingredients.map((ing) => ({
              ingredientId: ing.ingredientId || ingredientIdForName(ing.name),
              amount: ing.amount,
            })),
            instructions: stepsToText(editingRecipe.steps),
          }
        : { difficulty: 'Easy', ingredients: [{ ingredientId: '', amount: '' }] },
    [editingRecipe],
  )

  if (isEditing && !editingRecipe) {
    return (
      <div className="min-h-screen flex flex-col bg-surface">
        <Navbar active="" />
        <main className="flex-1 flex flex-col items-center justify-center gap-md text-center px-margin-mobile">
          <h1 className="font-display text-headline-lg text-on-surface">Recipe not found</h1>
          <Link to="/" className="font-label-lg text-label-lg text-primary hover:underline">
            ← Back to Collections
          </Link>
        </main>
        <Footer />
      </div>
    )
  }

  const onSubmit = (values: FormValues) => {
    const title = values.title!.trim()
    const description = values.description?.trim() ?? ''
    const editable = {
      title,
      description,
      excerpt: description,
      tags: parseTags(values.tags ?? ''),
      image: values.image ?? '',
      imageAlt: title,
      time: values.time?.trim() || '—',
      servings: values.yield?.trim() || '—',
      difficulty: values.difficulty || 'Easy',
      ingredients: (values.ingredients ?? [])
        .filter((r) => r.ingredientId)
        .map((r, i) => {
          const cat = catalog.find((c) => c.id === r.ingredientId)
          return {
            id: `i${i + 1}`,
            ingredientId: r.ingredientId,
            name: cat?.name ?? r.ingredientId,
            amount: r.amount.trim(),
          }
        }),
      steps: parseSteps(values.instructions ?? ''),
    }

    if (editingRecipe) {
      // Preserve id, slug, tags, favorite, etc. — only the editable fields change.
      dispatch(updateRecipe({ ...editingRecipe, ...editable }))
      navigate(`/recipe/${editingRecipe.slug}`)
      return
    }

    const base = slugify(title) || 'recipe'
    const existing = new Set(recipes.map((r) => r.slug))
    let newSlug = base
    let n = 2
    while (existing.has(newSlug)) newSlug = `${base}-${n++}`

    const newRecipe: Recipe = {
      id: `r-${Date.now()}`,
      slug: newSlug,
      category: 'Recipe',
      servingsIcon: 'restaurant',
      difficultyIcon: 'signal_cellular_alt',
      gallery: [],
      favorite: false,
      createdAt: new Date().toISOString(),
      ...editable,
    }

    dispatch(addRecipe(newRecipe))
    navigate(`/recipe/${newSlug}`)
  }

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <Navbar active="" />

      <main className="flex-1 w-full max-w-4xl mx-auto px-margin-mobile md:px-margin-desktop py-lg flex flex-col gap-lg">
        <div className="text-center max-w-2xl mx-auto mb-md">
          <h1 className="font-display text-headline-lg-mobile md:text-headline-lg text-on-surface mb-xs">
            {isEditing ? 'Edit Recipe' : 'Craft a New Recipe'}
          </h1>
          <p className="font-body text-body-lg text-secondary">
            {isEditing
              ? 'Refine the details and save your changes.'
              : 'Share your culinary creations with clarity and elegance.'}
          </p>
        </div>

        <Form<FormValues> onSubmit={onSubmit} initialValues={initialValues}>
          {({ handleSubmit }) => (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-lg bg-surface-container-lowest rounded-xl p-md md:p-lg border border-outline-variant/40 shadow-[0_4px_24px_rgba(141,170,145,0.04)]"
            >
              <HeroImageField />

              <div className="flex flex-col gap-md">
                <InputField
                  name="title"
                  label="Recipe Title"
                  placeholder="e.g., Rustic Sourdough Boule"
                  validate={required}
                />
                <TextAreaField
                  name="description"
                  label="Description"
                  placeholder="Briefly describe the flavor profile, origin, or why you love this dish..."
                  rows={3}
                  validate={required}
                />
                <InputField
                  name="tags"
                  label="Tags"
                  hint="Comma-separated"
                  placeholder="e.g., Salad, Italian, Vegan"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-md pt-md border-t border-outline-variant/30">
                <InputField name="time" label="Total Time" placeholder="e.g., 45 mins" />
                <InputField name="yield" label="Yield" placeholder="e.g., 4 servings" />
                <SelectField name="difficulty" label="Difficulty" options={DIFFICULTIES} />
              </div>

              <div className="pt-md border-t border-outline-variant/30">
                <IngredientsField />
              </div>

              <div className="pt-md border-t border-outline-variant/30">
                <TextAreaField
                  name="instructions"
                  label="Instructions"
                  hint="One per line · title | step"
                  rows={10}
                  validate={required}
                  placeholder={
                    'Prep | Heat the oven to 400°F (200°C).\nMix | Combine the dry ingredients in a bowl.\nBake | Bake for 35 minutes until golden brown.'
                  }
                />
              </div>

              <div className="pt-lg flex flex-col md:flex-row items-center justify-end gap-md border-t border-outline-variant/30 mt-md">
                <button
                  type="button"
                  onClick={() => navigate(isEditing ? `/recipe/${editingRecipe!.slug}` : '/')}
                  className="w-full md:w-auto px-6 py-3 rounded-full border border-tertiary font-label-lg text-label-lg text-on-surface hover:bg-surface-container-low transition-colors duration-200"
                >
                  {isEditing ? 'Cancel' : 'Save as Draft'}
                </button>
                <button
                  type="submit"
                  className="w-full md:w-auto px-6 py-3 rounded-full bg-primary font-label-lg text-label-lg text-on-primary hover:brightness-110 transition-all duration-200 flex items-center justify-center gap-2 shadow-[0_2px_8px_rgba(74,101,79,0.2)]"
                >
                  <Icon name="done" filled className="text-[20px]" />
                  {isEditing ? 'Save Changes' : 'Publish Recipe'}
                </button>
              </div>
            </form>
          )}
        </Form>
      </main>

      <Footer />
    </div>
  )
}
