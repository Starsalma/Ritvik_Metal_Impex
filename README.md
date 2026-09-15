# Ritvik Metal Impex — ritvikmetalimpex.com

Marketing site for Ritvik Metal Impex, a Mumbai-based supplier, stockist and
exporter of ferrous and non-ferrous industrial metals. Built with React 19,
React Router 7, Vite and Tailwind CSS v4.

```bash
npm install
npm run dev      # local dev server
npm run build    # generate SEO files → vite build → prerender per-route heads
npm run preview  # serve the production build
npm run lint
```

## Content

| File | What it holds |
| --- | --- |
| `src/data/products.js` | The 22 product categories, each with `slug`, description and a technical note rendered on its detail page |
| `src/data/articles.js` | Long-form Knowledge Hub guides (`/blog/<slug>`) with sections, tables, callouts, FAQs and related-product links |
| `src/data/siteConfig.js` | Business details, address, service areas and the shared Organization / LocalBusiness / WebSite JSON-LD builders |

Adding a product or an article to those files automatically adds it to the
listing pages, the sitemap, the prerendered routes and the internal link graph —
nothing else needs editing.

## How SEO is wired up

This is a single-page app, so the head is handled in two layers.

1. **At runtime** — `src/components/Seo.jsx` uses `react-helmet-async` to set the
   title, description, canonical, robots, Open Graph, Twitter and geo tags plus
   a consolidated JSON-LD `@graph` for whichever route is active.
2. **At build time** — `scripts/prerender-seo.mjs` writes a static
   `dist/<route>/index.html` for all 31 URLs, replacing the block between the
   `<!--seo:start-->` / `<!--seo:end-->` markers in `index.html` with that
   route's head. Crawlers and link unfurlers that do not execute JavaScript
   therefore still get the correct metadata per URL. `src/main.jsx` removes the
   static tags once React boots so nothing is duplicated.

`scripts/routes.mjs` is the shared URL map both layers read from, so the routes,
the sitemap and the prerendered heads cannot drift apart.

`scripts/generate-sitemap.mjs` (run via `prebuild`) writes `public/sitemap.xml`,
`public/robots.txt` and `public/_redirects` — including permanent redirects from
the legacy `/products/<id>` URLs to the current keyword slugs. Those three files
are generated; edit the script, not the output.

Structured data emitted: Organization + LocalBusiness, WebSite, WebPage,
CollectionPage, ItemList, Product (with Offer), Article, BreadcrumbList and
FAQPage.

## Deployment

- **Netlify** — redirects live in the generated `public/_redirects`. Keep
  `netlify.toml` free of a catch-all redirect: `netlify.toml` rules are
  evaluated before `_redirects`, and a catch-all there would shadow both the
  legacy 301s and the prerendered per-route HTML.
- **GitHub Pages** — `npm run deploy` publishes `dist/`. The build also writes
  `dist/404.html` so deep links resolve into the SPA.

## Post-deploy checklist

1. Submit `https://www.ritvikmetalimpex.com/sitemap.xml` in Google Search
   Console and Bing Webmaster Tools.
2. Verify the domain and create/claim the Google Business Profile — the
   LocalBusiness schema, NAP details and map embed all point at the Kumbharwada
   address, and consistency across those three is what drives local ranking.
3. Test a product URL and an article URL in the Rich Results Test.
