import { useEffect } from 'react'

const APP_NAME = 'MY Recipes'

/**
 * Set the document title for the current page — "<page> — MY Recipes", or
 * just the app name when no page title is given. Helps history, bookmarks,
 * tab switching and SEO in an SPA where the title otherwise never changes.
 */
export function usePageTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} — ${APP_NAME}` : APP_NAME
  }, [title])
}
