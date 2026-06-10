import type { Recipe } from './recipes/types'
import type { CatalogIngredient } from './ingredients/ingredientsData'

/**
 * REST client for the json-server backend (run it with `npm run api`).
 *
 * In dev, Vite proxies /api/* to http://127.0.0.1:3001 (see vite.config.ts),
 * so the app talks same-origin REST: GET/POST/PUT/DELETE /api/recipes and
 * /api/ingredients.
 */
const API_BASE = '/api'

// Google ID token of the signed-in owner; attached to write requests so the
// API middleware can verify who is asking. Set from the sign-in flow.
let authToken: string | null = null
export function setAuthToken(token: string | null): void {
  authToken = token
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' }
  if (authToken) headers.Authorization = `Bearer ${authToken}`
  const res = await fetch(`${API_BASE}${path}`, { headers, ...init })
  if (!res.ok) throw new Error(`${init?.method ?? 'GET'} ${path} -> ${res.status}`)
  return res.json() as Promise<T>
}

export interface AppData {
  recipes: Recipe[]
  ingredients: CatalogIngredient[]
}

/** Fetch both collections for the initial store state. Throws if the API is down. */
export async function loadAll(): Promise<AppData> {
  const [recipes, ingredients] = await Promise.all([
    request<Recipe[]>('/recipes'),
    request<CatalogIngredient[]>('/ingredients'),
  ])
  return { recipes, ingredients }
}

type Entity = { id: string }

/** Replace both collections on the backend (used by backup Import). */
export async function replaceAll(data: AppData): Promise<void> {
  const current = await loadAll()
  for (const r of current.recipes) await request(`/recipes/${r.id}`, { method: 'DELETE' })
  for (const i of current.ingredients)
    await request(`/ingredients/${i.id}`, { method: 'DELETE' })
  for (const r of data.recipes)
    await request('/recipes', { method: 'POST', body: JSON.stringify(r) })
  for (const i of data.ingredients)
    await request('/ingredients', { method: 'POST', body: JSON.stringify(i) })
}

/**
 * Diff two versions of a collection and mirror the changes to the API:
 * POST new entities, PUT changed ones, DELETE removed ones. Item objects are
 * immutable under Redux Toolkit, so reference equality detects changes.
 */
function syncCollection<T extends Entity>(resource: string, prev: T[], next: T[]): void {
  if (prev === next) return
  const prevById = new Map(prev.map((e) => [e.id, e]))
  const nextIds = new Set(next.map((e) => e.id))
  for (const entity of next) {
    const before = prevById.get(entity.id)
    if (!before) {
      void request(`/${resource}`, { method: 'POST', body: JSON.stringify(entity) }).catch(
        (e) => console.error(`API sync failed (create ${resource}):`, e),
      )
    } else if (before !== entity) {
      void request(`/${resource}/${entity.id}`, {
        method: 'PUT',
        body: JSON.stringify(entity),
      }).catch((e) => console.error(`API sync failed (update ${resource}):`, e))
    }
  }
  for (const entity of prev) {
    if (!nextIds.has(entity.id)) {
      void request(`/${resource}/${entity.id}`, { method: 'DELETE' }).catch((e) =>
        console.error(`API sync failed (delete ${resource}):`, e),
      )
    }
  }
}

interface SyncableState {
  recipes: { items: Recipe[] }
  ingredients: { items: CatalogIngredient[] }
}

interface SyncableStore {
  getState(): SyncableState
  subscribe(listener: () => void): () => void
}

/**
 * Mirror store changes to the REST backend. Debounced so a burst of dispatches
 * (e.g. typing in a rename field) collapses into one PUT per entity.
 */
export function attachRestSync(store: SyncableStore): void {
  let prev = store.getState()
  let timer: number | undefined
  store.subscribe(() => {
    if (timer !== undefined) window.clearTimeout(timer)
    timer = window.setTimeout(() => {
      timer = undefined
      const next = store.getState()
      syncCollection('recipes', prev.recipes.items, next.recipes.items)
      syncCollection('ingredients', prev.ingredients.items, next.ingredients.items)
      prev = next
    }, 300)
  })
}
