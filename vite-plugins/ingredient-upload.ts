import type { Plugin } from 'vite'
import type { IncomingMessage } from 'node:http'
import { promises as fs } from 'node:fs'
import path from 'node:path'

const REL_DIR = 'src/assets/images/ingredients'

function slugify(value: string): string {
  return (
    value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'ingredient'
  )
}

async function uniqueSlug(dir: string, base: string): Promise<string> {
  let files: string[] = []
  try {
    files = await fs.readdir(dir)
  } catch {
    /* dir may not exist yet */
  }
  const taken = new Set(files.map((f) => f.replace(/\.[^.]+$/, '')))
  if (!taken.has(base)) return base
  let n = 2
  while (taken.has(`${base}-${n}`)) n++
  return `${base}-${n}`
}

function readBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    let data = ''
    let size = 0
    req.on('data', (chunk: Buffer) => {
      size += chunk.length
      if (size > 12 * 1024 * 1024) {
        reject(new Error('Upload too large'))
        req.destroy()
        return
      }
      data += chunk
    })
    req.on('end', () => resolve(data))
    req.on('error', reject)
  })
}

/**
 * Dev-only endpoint: POST /__ingredient-upload { name, dataUrl } writes the
 * image into src/assets/images/ingredients/<slug>.jpg and returns { key, url }.
 * A browser can't write to the repo, so this gives uploaded images real files.
 */
export function ingredientUpload(): Plugin {
  return {
    name: 'ingredient-upload',
    apply: 'serve',
    configureServer(server) {
      const dir = path.resolve(server.config.root, REL_DIR)
      server.middlewares.use('/__ingredient-upload', async (req, res, next) => {
        if (req.method !== 'POST') return next()
        try {
          const { name, dataUrl } = JSON.parse(await readBody(req)) as {
            name?: string
            dataUrl?: string
          }
          const match = /^data:image\/[a-z0-9.+-]+;base64,(.+)$/i.exec(dataUrl ?? '')
          if (!match) {
            res.statusCode = 400
            res.end(JSON.stringify({ error: 'Invalid image data' }))
            return
          }
          await fs.mkdir(dir, { recursive: true })
          const key = await uniqueSlug(dir, slugify(name ?? 'ingredient'))
          const file = path.join(dir, `${key}.jpg`)
          if (!file.startsWith(dir + path.sep)) {
            res.statusCode = 400
            res.end(JSON.stringify({ error: 'Invalid name' }))
            return
          }
          await fs.writeFile(file, new Uint8Array(Buffer.from(match[1], 'base64')))
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ key, url: `/${REL_DIR}/${key}.jpg` }))
        } catch (err) {
          res.statusCode = 500
          res.end(JSON.stringify({ error: String(err) }))
        }
      })
    },
  }
}
