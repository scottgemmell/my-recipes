/**
 * REST handlers shared by the recipes and ingredients routes — the same
 * shapes json-server provides in dev:
 *
 *   GET    /api/<collection>        list
 *   POST   /api/<collection>        create
 *   GET    /api/<collection>/:id    read one
 *   PUT    /api/<collection>/:id    replace
 *   PATCH  /api/<collection>/:id    merge
 *   DELETE /api/<collection>/:id    remove
 */
import { readCollection, writeCollection } from './_store.mjs'
import { authorizeWrite } from './_auth.mjs'

export function collectionHandler(name) {
  return async (req, res) => {
    try {
      if (req.method === 'GET') {
        res.status(200).json(await readCollection(name))
        return
      }
      if (req.method === 'POST') {
        // Reject unauthorized writes before touching storage.
        if (!(await authorizeWrite(req, res))) return
        const entity = req.body
        if (!entity || typeof entity.id !== 'string' || !entity.id) {
          res.status(400).json({ error: 'Entity with a string id required.' })
          return
        }
        const items = await readCollection(name)
        if (items.some((e) => e.id === entity.id)) {
          res.status(409).json({ error: `id ${entity.id} already exists.` })
          return
        }
        await writeCollection(name, [...items, entity])
        res.status(201).json(entity)
        return
      }
      res.setHeader('Allow', 'GET, POST')
      res.status(405).json({ error: 'Method not allowed.' })
    } catch (e) {
      res.status(500).json({ error: String(e?.message ?? e) })
    }
  }
}

export function itemHandler(name) {
  return async (req, res) => {
    try {
      const { id } = req.query

      if (!['GET', 'PUT', 'PATCH', 'DELETE'].includes(req.method)) {
        res.setHeader('Allow', 'GET, PUT, PATCH, DELETE')
        res.status(405).json({ error: 'Method not allowed.' })
        return
      }
      // Reject unauthorized writes before touching storage.
      if (req.method !== 'GET' && !(await authorizeWrite(req, res))) return

      const items = await readCollection(name)
      const index = items.findIndex((e) => e.id === id)

      if (req.method === 'GET') {
        if (index === -1) res.status(404).json({ error: 'Not found.' })
        else res.status(200).json(items[index])
        return
      }
      if (index === -1) {
        res.status(404).json({ error: 'Not found.' })
        return
      }

      if (req.method === 'DELETE') {
        await writeCollection(name, items.filter((e) => e.id !== id))
        res.status(200).json({})
        return
      }

      const entity =
        req.method === 'PATCH' ? { ...items[index], ...req.body, id } : { ...req.body, id }
      const next = items.slice()
      next[index] = entity
      await writeCollection(name, next)
      res.status(200).json(entity)
    } catch (e) {
      res.status(500).json({ error: String(e?.message ?? e) })
    }
  }
}
