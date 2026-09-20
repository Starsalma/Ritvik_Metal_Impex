# SEO Audit — Ritvik Metal Impex

Audited 20 September 2026 against the live codebase at commit `959a690`.
Method: static inspection plus a headless crawl of all 50 sitemap URLs.

---

## Executive summary

**The on-page SEO layer is in good shape. The delivery layer is not.**

A crawl of all 50 routes found zero duplicate titles, zero duplicate
descriptions, zero over-length titles or descriptions, one `h1` per page,
a correct canonical on every page and JSON-LD on every page.

But all of that is injected by JavaScript at runtime. The site deploys **two
HTML files for fifty URLs**. Any client that does not execute JavaScript — every
social scraper, and most AI crawlers — receives the homepage's title, the
homepage's canonical and the homepage's `og:image` no matter which URL it asked
for.

The second structural gap is commercial, not technical: the catalogue is
organised by **form** (Pipes, Fittings, Bars) when industrial buyers search by
**grade** ("duplex 2205 pipe supplier", "inconel 625 fasteners"). There is not
one grade-level landing page on the site.

Third: **there is no analytics and no Search Console verification**, so nothing
below can be measured today.

---

## Current architecture

| Aspect | Finding |
|---|---|
| Framework | React 19 + Vite 8, Tailwind 4, react-router-dom 7 |
| Rendering | Client-side SPA. No SSR, no SSG, no prerendering |
| Hosting | GitHub Pages via `gh-pages` branch (`npm run deploy`) |
| Products | 23, in `src/data/products.js` (a JS module, not a database) |
| Routes | `/`, `/about`, `/products`, `/products/:id`, `/blog`, `/blog/:slug`, `*` |
| Product URLs | Numeric — `/products/4`, `/products/23` |
| Metadata | `<Seo />` + react-helmet-async, sourced from `src/data/site.js` |
| Sitemap | Generated, 50 URLs, image namespace, real `lastmod` dates |
| robots.txt | Present; AI crawlers explicitly allowed; facet URLs disallowed |
| Schema | Organization, LocalBusiness, WebSite, Product, ItemList, BreadcrumbList, FAQPage, TechArticle, BlogPosting |
| Enquiries | Supabase Postgres + RLS, with email/WhatsApp notification triggers |
| Analytics | **None** |
| Search Console | **Not verified** |

## Current inventory (23 products)

Stainless Steel (15), Copper (4), Brass (2), Alloy Steel (2), Nickel Alloys (1).
Forms: Pipes, Tubes, Fittings, Flanges, Sheets, Bars, Sections, Fasteners,
Valves, Profiles, Wire.

**Grade coverage vs the target keyword set in the brief:**

| Grade | Mentioned in catalogue | Dedicated page |
|---|---|---|
| SS 304 / 316 / 310 / 202 | Yes, inside descriptions | No |
| Duplex 2205 / S31803 | Yes, inside descriptions | No |
| Super Duplex 2507 / S32760 | Partially | No |
| Inconel / Monel / Hastelloy C276 | Yes, inside product 22 | No |
| Titanium Grade 2 | Mentioned once, as a pipe material | No |
| 904L | Mentioned twice | No |
| Alloy 20 | Mentioned in passing | No |
| **Hastelloy C22, Alloy 286, Nitronic 50, SMO 254** | **Absent entirely** | No |

The last row matters: these four appear nowhere in the codebase. Per the brief's
instruction not to assume availability, **no page should be created for them
until the business confirms it stocks them.**

---

## Findings

### P0-1 — Fifty URLs share one set of static meta tags
**Affected:** every URL.
**Evidence:** `dist/` contains only `index.html` and `404.html`. A non-JS fetch
of any route returns:
- title: *"Ritvik Metal Impex | Stainless Steel, Carbon Steel & Copper Supplier…"*
- canonical: `https://www.ritvikmetalimpex.com/`
- og:image: `/images/hero.jpeg` (726×1085)

**Why it matters — three separate harms:**
1. **The canonical is actively wrong.** Every page declares itself a duplicate
   of the homepage to any crawler that does not run JS. This is worse than
   having no canonical: it is an instruction to drop the page from the index.
2. **Link previews are broken everywhere.** WhatsApp, LinkedIn, Facebook and
   Slack scrapers do not execute JavaScript. Every shared product link shows
   the homepage title and an undersized image. In Indian industrial B2B, where
   WhatsApp is the primary sharing channel, this is a direct lead cost.
3. **AI crawlers mostly do not render JS.** The `llms.txt` and AI-crawler
   allowances added earlier cannot work while content is JS-only.

Google does render JavaScript, so organic Google results are less affected —
but rendering is queued and budgeted, and it is not how Bing or the AI engines
behave.

**Fix:** prerender each route to a static HTML file at build time.
**Auto-fixable:** yes. **Status: FIXED — see implementation note below.**

---

### P0-2 — No analytics and no Search Console verification
**Affected:** whole site.
**Evidence:** no `gtag`, no GTM, no `google-site-verification` anywhere in
`index.html` or `src/`.
**Why it matters:** Phase 16 of the brief (Search Console strategy) cannot be
executed at all — there is no data. Conversion rate, enquiry attribution and
"which page produced the lead" are all unanswerable.
**Fix:** GA4 with enquiry events, plus GSC and Bing verification.
**Auto-fixable:** partly — the code can be added, but **verification requires
account access only the owner has.** **Status: BLOCKED ON OWNER.**

---

### P1-3 — No grade-level landing pages
**Affected:** the entire commercial keyword set.
**Evidence:** 23 form-level pages; zero grade-level pages. "Duplex 2205"
appears inside product 1's description but has no page that can rank for
"duplex 2205 pipe supplier".
**Why it matters:** this is how industrial buyers search. A maintenance
engineer searches "inconel 625 buttweld elbow supplier", not "buttweld
fittings". Form-level pages compete for generic head terms against IndiaMART;
grade-level pages compete for specific terms against far weaker pages, and
convert better because intent is explicit.
**Fix:** a grade × form page template driven by existing data.
**Auto-fixable:** yes, for grades the business actually stocks.
**Status: PENDING — highest-value remaining work.**

---

### P1-4 — Product URLs carry no keyword signal
**Affected:** all 23 product pages. **Evidence:** `/products/4`.
**Why it matters:** the URL is a modest ranking signal and a significant
click-through and shareability signal. `/products/4` tells a buyer nothing.
**Fix:** slug-based URLs (`/products/stainless-steel-flanges`) with 301s from
the numeric form. On GitHub Pages, true 301s are unavailable — redirects must
be client-side, which passes most but not all signal.
**Auto-fixable:** yes, with care. **Status: PENDING — sequence after P0-1.**

---

### P2-5 — `CNAME` absent from the deploy branch
**Evidence:** no `CNAME` in `public/` or in `origin/gh-pages`.
**Why it matters:** `gh-pages -d dist` replaces the branch contents. If the
custom domain is configured only in repository settings, a deploy can drop it
and the site falls back to `github.io` — which breaks every indexed URL.
**Fix:** commit `public/CNAME` containing the apex domain.
**Auto-fixable:** yes, but **needs the owner to confirm the exact canonical
host** (`ritvikmetalimpex.com` vs `www.`). `site.js` uses `www.`; the brief
gives the apex. These must agree. **Status: BLOCKED ON OWNER — see below.**

---

### P2-6 — Fifteen product images below 1200px
**Evidence:** `npm run images` reports 15 in use under 1200px.
**Why it matters:** below Google's large-preview threshold; also stock imagery
on a stockist site costs trust with technical buyers.
**Fix:** real photographs. Six products now have them.
**Status: PARTIAL — blocked on the owner supplying more photos.**

---

### P2-7 — Indicative prices built but switched off
**Evidence:** all 23 entries in `src/data/pricing.js` are `verified: false`.
**Why it matters:** "price" is one of the highest-intent commercial modifiers
in the brief's list. The feature, schema and disclaimers exist; only verified
numbers are missing.
**Status: BLOCKED ON OWNER.**

---

### P3-8 — `keywords` meta tag still emitted
No search engine has used it for over a decade. Harmless, but it signals dated
SEO practice to anyone auditing the site. Low priority.

---

## What is already correct

Worth recording so it is not "fixed" again:

- No duplicate titles or descriptions across 50 URLs
- All titles ≤60 chars, all descriptions ≤158, enforced in code by `clamp()`
- Correct per-route canonicals (client-side)
- Exactly one `h1` per page
- Valid JSON-LD on every route; no fake reviews, ratings or prices
- Faceted navigation handled: single facet indexable, combinations `noindex`
  plus `Disallow`
- Sitemap with real `lastmod` dates and an image namespace
- `robots.txt` explicitly allowing GPTBot, ClaudeBot, PerplexityBot,
  Google-Extended and others
- Internal linking hub on every product page, derived from data not hardcoded
- Enquiries persisted server-side with RLS, plus notification triggers
- Route-level code splitting; homepage bundle ~157 kB gzipped

---

## Implementation log

| Date | Finding | Change | Verified |
|---|---|---|---|
| 2026-09-20 | P0-1 | Build-time prerendering of all sitemap routes | Yes — 7 checks |
| 2026-09-20 | P2-5 | `public/CNAME` added (`www.ritvikmetalimpex.com`) | Yes — matches live gh-pages CNAME |
| 2026-09-20 | P1-3 | Grade pages for 304, 316, Duplex 2205, Inconel, Monel | Yes — 9 checks |

---

## Blocked on the business

These cannot be resolved from the codebase:

1. ~~Canonical host~~ — **resolved: `www.ritvikmetalimpex.com`**, confirmed against
   the CNAME already live on `gh-pages`.
2. **Search Console + Bing verification**, and Google Business Profile.
3. **Photographs** for the 15 products still on stock images.
4. **Price ranges** — review and set `verified: true`.
5. ~~Grade availability~~ — **resolved: 304, 316, Duplex 2205, Inconel, Monel.**
   Pages built for those five only. Titanium Grade 2, Hastelloy, 904L, Alloy 20,
   Nitronic 50 and SMO 254 remain unbuilt pending confirmation.
6. **Deploy.** The live site runs from `gh-pages`, last updated 8 July 2026 and
   now 45+ commits behind `main`. Nothing in this audit is live until someone
   runs `npm run deploy`.
