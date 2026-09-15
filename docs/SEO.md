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

## SERP length limits

Google renders roughly 60 characters of a title and 155–160 of a description.
`clamp()` in `src/data/site.js` enforces `TITLE_MAX` and `DESCRIPTION_MAX`, and
`<Seo />` appends the `| Ritvik Metal Impex` suffix **only when the result still
fits** — otherwise the brand is the first thing cut off, taking keywords with it.

Clamping is a backstop, not the plan. Write `seoTitle` under 60 and
`description` under 158 at the source; if a page shows a trailing `…` in its
title, the source string is too long and should be rewritten.

## Structured data

| Page | Schema types |
|---|---|
| Home | Organization, LocalBusiness+Store, WebSite, ItemList, FAQPage |
| About | AboutPage, BreadcrumbList, Organization |
| Products | CollectionPage (with ItemList), BreadcrumbList |
| Product detail | Product (no Offer — see below), BreadcrumbList, TechArticle |
| Blog index | Blog (with BlogPosting list), BreadcrumbList |
| Article | TechArticle, BreadcrumbList, FAQPage |

Validate changes with the [Rich Results Test](https://search.google.com/test/rich-results)
and [Schema Markup Validator](https://validator.schema.org/).

**Product pages deliberately carry no `offers` node.** Pricing is quote-based —
it depends on size, grade, schedule and quantity — and a schema.org `Offer`
requires a price or a priced `priceSpecification`. An Offer with no price is
invalid and fails the Rich Results Test, so the pages publish a valid `Product`
without offers instead. If real list prices ever exist, add the node back.

## Sitemap & robots

`public/sitemap.xml` is **generated**, not hand-edited. `scripts/generate-sitemap.mjs`
reads `src/data/products.js` and `src/data/articles.js`, so adding a product or
article automatically adds its URL. It runs on `npm run build` via `prebuild`,
or on demand with `npm run sitemap`.

`public/robots.txt` allows everything and points at the sitemap.

`lastmod` uses real content dates and never `new Date()`. Articles supply their
own `dateModified`; the catalogue and static pages use `CATALOGUE_MODIFIED` from
`src/data/site.js`. Stamping today's date on every URL at build time claims the
whole site changed on every deploy, and crawlers that notice start discounting
`lastmod` entirely — so bump `CATALOGUE_MODIFIED` by hand when the catalogue
actually changes.

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
   footer now shows WhatsApp/phone/email instead of the old dead `#` icons; swap
   those for real profile links when they exist.
5. **Analytics** — no tracking is installed. Add GA4 or Plausible if wanted.
6. **Images** — hero and product photos are unoptimised JPEG/PNG. Converting to
   WebP/AVIF and serving correctly sized variants is the single biggest
   remaining Core Web Vitals win. Three decorative backgrounds in
   `src/components/industry.jsx` still load from Unsplash; self-hosting them
   removes a third-party request.

   **Swapping in the watermarked product photos:** drop the replacements into
   `public/images/products/` using the existing filenames (`pipes-tubes.jpg`,
   `flanges.jpg`, and so on — `src/data/products.js` maps each product to one).
   Nothing else has to change. Keep the same names and the whole site, including
   Open Graph images and the product schema, picks them up.
7. **Business details** — `site.founded` and `site.openingHours` in
   `src/data/site.js` are intentionally empty and are omitted from the schema
   until filled in. Add the real founding year and trading hours; opening hours
   in particular help the local pack.

## Product technical specifications

`src/data/specifications.js` holds the chemical composition, mechanical
properties, physical properties, size range and equivalent-grade tables keyed by
material family and product form. `getSpecTables(product)` returns whatever
applies to a product and skips what does not, so adding a material or form
degrades gracefully instead of throwing.

These tables are the highest-value long-tail surface on the site — queries like
"ASTM A312 TP304L chemical composition", "316L yield strength" and "1.4404
equivalent grade" are exactly what technical buyers search. `SpecTables.jsx`
keeps every panel in the DOM (hidden tabs use `hidden`, not conditional
rendering) so all of the data is indexed even though one tab is visible.

Values are the published minima/maxima from the governing standards. They are
not a substitute for a heat-specific mill test certificate, and the component
says so.

## Faceted navigation

`/products` reads `?material=` and `?form=` from the URL. A single facet is
treated as a real landing page: its own title, description and self canonical,
and it is listed in the sitemap. Combining facets produces thin near-duplicates,
so those canonicalise back to `/products` and are served `noindex, nofollow`.

When adding a facet, keep that rule — indexing every permutation of two filters
is how a 22-product catalogue turns into hundreds of thin pages.

## Internal linking

`src/data/internalLinks.js` builds the link clusters. Product pages link to
material siblings, form siblings and the guides that cover them; guides link
back to the products they reference and to sibling guides; the footer carries
every guide; the homepage showcase links eight product pages directly.

Everything is a real `<Link>` with an `href`. Several cards used to be `<div>`s
with `onClick`, which look identical to a user and are invisible to a crawler —
if you add a card, make it a `Link`.

## Calls to action

`CTABand` renders at the foot of every route. Contact CTAs go through
`scrollToContact()` in `src/utils/navigation.js`, which navigates home first
when `#contact-us` is not on the current page.

## Where contact form submissions go

`src/components/ContactForm.jsx` POSTs to `https://api.web3forms.com/submit`
with a hard-coded `access_key`. Web3Forms emails each submission to whichever
address that key is registered to — **nothing is stored in this repository, and
there is no database**. If the key is ever rotated or the registered inbox
changes, submissions stop arriving silently, because the form still shows its
success state as long as the API returns `success: true`.

Two things worth fixing when convenient:

1. The access key sits in client-side source, so it is public. Anyone can read
   it and post to the same endpoint. Web3Forms mitigates this with domain
   restrictions — set the allowed domain to `ritvikmetalimpex.com` in the
   Web3Forms dashboard, and enable their spam protection.
2. There is no record of enquiries beyond email. If enquiry history matters,
   point the form at a store you control, or enable a Web3Forms integration
   that also writes to a sheet or CRM.
