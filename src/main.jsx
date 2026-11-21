import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import App from './App.jsx'

/*
 * index.html ships a static copy of the homepage SEO tags so that crawlers and
 * social scrapers which don't execute JavaScript still get a description,
 * canonical and Open Graph card. React 19 hoists the per-route tags rendered by
 * <Seo /> into <head> without removing anything already there, which would
 * leave two conflicting canonicals/descriptions on every page. Drop the static
 * fallbacks before the app mounts so exactly one of each survives.
 */
document.querySelectorAll('head [data-seo-fallback]').forEach((el) => el.remove())

/*
 * GitHub Pages deep-link recovery: public/404.html stores the originally
 * requested path and bounces to "/". Restore it before React Router mounts so
 * the correct route (and its canonical URL) is rendered.
 */
const redirect = sessionStorage.getItem('rmi:redirect')
if (redirect) {
  sessionStorage.removeItem('rmi:redirect')
  if (redirect !== '/' && redirect !== window.location.pathname) {
    window.history.replaceState(null, '', redirect)
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
)
