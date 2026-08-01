import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import App from './App.jsx'

// The build-time prerendered head (see scripts/prerender-seo.mjs) serves
// crawlers that do not run JavaScript. Once React boots, react-helmet-async
// takes over the head, so remove the static copies to avoid duplicate
// <title>, description, canonical and JSON-LD tags.
document.querySelectorAll('[data-static-seo]').forEach((el) => el.remove());

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
)
