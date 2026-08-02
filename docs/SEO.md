# SEO Implementation — ritvikmetalimpex.com

Reference for how search optimisation is wired into this site and what needs
doing outside the codebase.

## How page metadata works

Every route renders `<Seo />` (`src/components/Seo.jsx`), which emits title,
description, keywords, canonical, robots, Open Graph, Twitter card and any
JSON-LD blocks for that page. Shared values (company name, address, phone,
areas served, schema builders) live in one place: `src/data/site.js`.

`index.html` carries a **static copy** of the homepage tags marked
`data-seo-fallback`. Those exist for crawlers and social scrapers that don't
run JavaScript. React 19 hoists the per-route tags into `<head>` without
removing what's already there, so `src/main.jsx` deletes the fallbacks at boot —
otherwise every page would serve two conflicting canonicals. If you add a tag to
`index.html` that `<Seo />` also emits, mark it `data-seo-fallback`.

## Structured data

| Page | Schema types |
|---|---|
| Home | Organization, LocalBusiness+Store, WebSite, ItemList, FAQPage |
| About | AboutPage, BreadcrumbList, Organization |
| Products | CollectionPage (with ItemList), BreadcrumbList |
| Product detail | Product (+ Offer), BreadcrumbList, TechArticle |
| Blog index | Blog (with BlogPosting list), BreadcrumbList |
| Article | TechArticle, BreadcrumbList, FAQPage |

Validate changes with the [Rich Results Test](https://search.google.com/test/rich-results)
and [Schema Markup Validator](https://validator.schema.org/).

## Sitemap & robots

`public/sitemap.xml` is **generated**, not hand-edited. `scripts/generate-sitemap.mjs`
reads `src/data/products.js` and `src/data/articles.js`, so adding a product or
article automatically adds its URL. It runs on `npm run build` via `prebuild`,
or on demand with `npm run sitemap`.

`public/robots.txt` allows everything and points at the sitemap.

## Routing on static hosts

- **Netlify** — `public/_redirects` and `netlify.toml` rewrite everything to `index.html`.
- **GitHub Pages** — no server rewrites, so `public/404.html` stores the requested
  path in `sessionStorage` and bounces to `/`; `src/main.jsx` restores it before
  React Router mounts. Without this, every deep link (`/products/4`,
  `/blog/…`) would 404 for crawlers.

## Content

`src/data/articles.js` holds the long-form technical guides rendered at
`/blog/:slug`. Each article carries its own SEO title, description, keywords,
key takeaways, sectioned body, FAQ set and `relatedProductIds` — the last one
drives two-way internal linking between guides and product pages.

To add an article: append an object to `articles`, give it a unique `slug`, and
rebuild. The sitemap, blog index, footer link row and product-page "Technical
Guides" sections all pick it up automatically.

Per-product guides live in the `blog` key of each entry in `src/data/products.js`
and render on the product detail page.

## Still to do off-site

These can't be done from the repository:

1. **Google Search Console** — verify `https://www.ritvikmetalimpex.com`, submit
   `/sitemap.xml`, and confirm the www vs non-www preference matches the CNAME.
2. **Bing Webmaster Tools** — same, and import from Search Console.
3. **Google Business Profile** — claim the Mumbai listing. Name, address and
   phone must match `src/data/site.js` exactly; inconsistent NAP is the most
   common local-SEO leak.
4. **Social profiles** — once LinkedIn/Facebook pages exist, add their URLs to
   `site.sameAs` in `src/data/site.js` so they feed the Organization schema. The
   footer social icons currently point at `#`.
5. **Analytics** — no tracking is installed. Add GA4 or Plausible if wanted.
6. **Images** — hero and product photos are unoptimised JPEG/PNG. Converting to
   WebP/AVIF and serving correctly sized variants is the single biggest
   remaining Core Web Vitals win. Three decorative backgrounds in
   `src/components/industry.jsx` still load from Unsplash; self-hosting them
   removes a third-party request.
7. **Business details** — `site.founded` and `site.openingHours` in
   `src/data/site.js` are intentionally empty and are omitted from the schema
   until filled in. Add the real founding year and trading hours; opening hours
   in particular help the local pack.
