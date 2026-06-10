import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { createAppStore } from './app/store'
import { loadAll } from './features/api'
import App from './App'
import './index.css'

const root = createRoot(document.getElementById('root')!)

loadAll()
  .then((data) => {
    const store = createAppStore(data)
    root.render(
      <StrictMode>
        <Provider store={store}>
          <BrowserRouter
            future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
          >
            <App />
          </BrowserRouter>
        </Provider>
      </StrictMode>,
    )
  })
  .catch((error) => {
    console.error('Failed to reach the recipe API:', error)
    root.render(
      <div className="min-h-screen flex items-center justify-center bg-surface px-margin-mobile">
        <div className="max-w-md text-center flex flex-col gap-sm">
          <h1 className="font-display text-headline-lg text-on-surface">
            Can&rsquo;t reach the recipe API
          </h1>
          <p className="font-body text-body-lg text-on-surface-variant">
            The REST backend isn&rsquo;t responding. Start it with{' '}
            <code className="font-mono text-primary">npm run api</code> and reload this page.
          </p>
        </div>
      </div>,
    )
  })
