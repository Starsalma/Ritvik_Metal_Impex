/**
 * Build-time prerendering.
 *
 * The site is a client-rendered SPA on GitHub Pages, so before this step the
 * whole site shipped as one index.html. Every URL therefore served the
 * homepage's title, the homepage's canonical and the homepage's og:image to any
 * client that does not execute JavaScript — which is every social scraper
 * (WhatsApp, LinkedIn, Facebook, Slack) and most AI crawlers.
 *
 * The homepage canonical was the serious part: it told those crawlers that all
 * fifty URLs were duplicates of the homepage.
 *
 * This renders each sitemap route in a real browser and writes the resulting
 * HTML to dist/<route>/index.html. GitHub Pages serves those directly, so a
 * crawler gets correct per-page metadata and real body copy with no JS. The
 * hydrated SPA still takes over for anyone with JavaScript, so navigation and
 * behaviour are unchanged.
 *
 * Run as part of `npm run build` (postbuild). Requires a Chromium that
 * Playwright can find; skips with a warning rather than failing the build if
 * one is unavailable, so a deploy is never blocked by a missing browser.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '../..');
const DIST = join(ROOT, 'dist');
const SITE = 'https://www.ritvikmetalimpex.com';

const routes = [...readFileSync(join(ROOT, 'public/sitemap.xml'), 'utf8')
  .matchAll(/<loc>([^<]+)<\/loc>/g)]
  .map((m) => m[1].replace(SITE, ''))
  /* Facet permutations are noindex and Disallow-ed; prerendering them would
   * write files we have just told crawlers not to fetch. */
  .filter((r) => !r.includes('?'));

let chromium;
try {
  ({ chromium } = await import('playwright'));
} catch {
  try {
    ({ chromium } = await import('/opt/node22/lib/node_modules/playwright/index.mjs'));
  } catch {
    console.log('  prerender skipped: playwright unavailable (SPA fallback still works)');
    process.exit(0);
  }
}

/*
 * Must be `preview`, serving dist, NOT `createServer`, which is the dev server.
 * Rendering against the dev server captures its script tags — /@vite/client and
 * /src/main.jsx — which do not exist in the built output. The saved HTML then
 * loads no JavaScript at all: React never mounts, and every page ships as a
 * dead static snapshot with working links but no working buttons, tabs or
 * forms. preview serves the real hashed bundle, so the captured tags are the
 * ones that ship.
 */
const { preview } = await import(join(ROOT, 'node_modules/vite/dist/node/index.js'));
const server = await preview({
  root: ROOT,
  preview: { port: 5733, strictPort: true },
  logLevel: 'error',
});

const browser = await chromium.launch({ args: ['--no-proxy-server'] });
const page = await browser.newPage();

const report = [];
for (const route of routes) {
  await page.goto(`http://localhost:5733${route}`, { waitUntil: 'networkidle' });

  /*
   * Two steps, and both matter.
   *
   * 1. Drop index.html's own fallback tags, which carry homepage values. Left
   *    in, the saved file would hold the homepage title and canonical beside
   *    the real ones.
   *
   * 2. Mark the tags Helmet rendered with data-seo-fallback before saving.
   *    They are correct for a crawler that runs no JavaScript, but when the
   *    SPA boots, Helmet renders its own set and React 19 hoists them into
   *    head — leaving two titles and two canonicals in the live DOM. Google
   *    renders JS, so it would see the ambiguous pair. main.jsx already
   *    removes [data-seo-fallback] before mount, so borrowing that attribute
   *    makes the static tags serve non-JS clients and then get cleared for
   *    everyone else. No new mechanism, and it cannot drift from the one the
   *    app already relies on.
   */
  await page.evaluate(() => {
    document.querySelectorAll('[data-seo-fallback]').forEach((el) => el.remove());
    /*
     * script[type="application/ld+json"] is included here for the same reason
     * as the others: without it, the schema Helmet renders during this capture
     * gets baked into the saved file unmarked, and a fresh JS boot on that file
     * mounts Helmet's OWN copy alongside it rather than replacing it — the
     * static index.html schema bug repeated one layer down, on every
     * prerendered route instead of just the SPA shell.
     */
    document.head
      .querySelectorAll('title, link[rel="canonical"], meta[name="description"], meta[name="robots"], meta[name^="twitter:"], meta[property^="og:"], meta[name="keywords"], meta[name="author"], script[type="application/ld+json"]')
      .forEach((el) => el.setAttribute('data-seo-fallback', ''));
  });

  const html = await page.content();
  const title = await page.title();
  const canonical = await page.getAttribute('link[rel=canonical]', 'href');

  /*
   * Hard stop if a dev-server artefact is captured. Getting this wrong ships a
   * site whose pages look right and load no JavaScript, which is the kind of
   * failure that is invisible until a customer cannot submit an enquiry.
   */
  if (html.includes('/@vite/client') || html.includes('/src/main.jsx')) {
    throw new Error(
      `Captured dev-server scripts on ${route}. Prerender must run against the ` +
      'built output (vite preview), never the dev server.',
    );
  }
  if (!/<script[^>]+src="\/assets\/[^"]+\.js"/.test(html)) {
    throw new Error(`No production bundle referenced on ${route}; React would never mount.`);
  }

  report.push({ route, title, canonical, html, bytes: html.length });
}

await browser.close();
await server.httpServer.close();

/* Written only after every route is captured, so no route is ever rendered
 * from a file this script just produced. */
for (const r of report) {
  const dir = r.route === '/' ? DIST : join(DIST, r.route);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), r.html, 'utf8');

  /*
   * Also write the flat form, so /products/23 is served directly instead of
   * being 301'd to /products/23/.
   *
   * GitHub Pages serves a directory's index.html only at the trailing-slash
   * URL and redirects the bare path to it. Our canonicals and sitemap both use
   * the bare path, so every canonical pointed at a URL that redirected — which
   * Google resolves, but reports as "Page with redirect" and costs a hop on
   * every crawl.
   *
   * Both files carry the same canonical, naming the bare path, so the two URLs
   * consolidate to one. That is precisely what a canonical is for, and it beats
   * a redirect chain on all 42 pages.
   */
  if (r.route !== '/') {
    writeFileSync(join(DIST, `${r.route}.html`), r.html, 'utf8');
  }
  delete r.html;
}

const bad = report.filter((r) => r.canonical !== `${SITE}${r.route === '/' ? '/' : r.route}`);
writeFileSync(
  join(ROOT, 'seo/reports/prerender.json'),
  JSON.stringify({ generated: new Date().toISOString(), count: report.length, routes: report }, null, 2),
);

console.log(`  prerendered ${report.length} routes to dist/`);
if (bad.length) {
  console.log(`  WARNING: ${bad.length} route(s) have a canonical that does not match their URL:`);
  bad.slice(0, 5).forEach((r) => console.log(`    - ${r.route} -> ${r.canonical}`));
}
