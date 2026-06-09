import { useRef, useState } from 'react'
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
import type { Recipe } from '../features/recipes/types'

interface FormValues {
  image?: string
  title?: string
  description?: string
  time?: string
  yield?: string
  ingredients?: string
  instructions?: string
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

function parseIngredients(text: string): Recipe['ingredients'] {
  return text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line, i) => ({ id: `i${i + 1}`, name: line, amount: '' }))
}

function parseSteps(text: string): Recipe['steps'] {
  return text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line, i) => ({
      title: `Step ${i + 1}`,
      description: line.replace(/^\s*\d+[.)]\s*/, ''),
    }))
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
  const isEditing = Boolean(slug)

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

  const initialValues: FormValues | undefined = editingRecipe
    ? {
        image: editingRecipe.image || undefined,
        title: editingRecipe.title,
        description: editingRecipe.description,
        time: editingRecipe.time === '—' ? '' : editingRecipe.time,
        yield: editingRecipe.servings === '—' ? '' : editingRecipe.servings,
        ingredients: editingRecipe.ingredients
          .map((i) => [i.amount, i.name].filter(Boolean).join(' '))
          .join('\n'),
        instructions: editingRecipe.steps.map((s) => s.description).join('\n'),
      }
    : undefined

  const onSubmit = (values: FormValues) => {
    const title = values.title!.trim()
    const description = values.description?.trim() ?? ''
    const editable = {
      title,
      description,
      excerpt: description,
      image: values.image ?? '',
      imageAlt: title,
      time: values.time?.trim() || '—',
      servings: values.yield?.trim() || '—',
      ingredients: parseIngredients(values.ingredients ?? ''),
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
      category: 'New',
      tags: ['New'],
      difficulty: 'Easy',
      servingsIcon: 'restaurant',
      difficultyIcon: 'signal_cellular_alt',
      gallery: [],
      favorite: false,
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
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-md pt-md border-t border-outline-variant/30">
                <InputField name="time" label="Total Time" placeholder="e.g., 45 mins" />
                <InputField name="yield" label="Yield" placeholder="e.g., 4 servings" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-md md:gap-lg pt-md border-t border-outline-variant/30">
                <TextAreaField
                  name="ingredients"
                  label="Ingredients"
                  hint="One per line"
                  rows={12}
                  validate={required}
                  placeholder={'1 cup all-purpose flour\n2 tsp sea salt\n1 tbsp olive oil...'}
                />
                <TextAreaField
                  name="instructions"
                  label="Instructions"
                  hint="Step-by-step"
                  rows={12}
                  validate={required}
                  placeholder={
                    '1. Preheat the oven to 400°F (200°C).\n2. In a large mixing bowl...\n3. Bake for 35 minutes until golden brown.'
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
