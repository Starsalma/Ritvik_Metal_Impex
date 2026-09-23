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
 * HTML to BOTH dist/<route>.html and dist/<route>/index.html. GitHub Pages
 * serves those directly, so a crawler gets correct per-page metadata and real
 * body copy with no JS. The hydrated SPA still takes over for anyone with
 * JavaScript, so navigation and behaviour are unchanged.
 *
 * Two files per route, because the canonical URLs carry no trailing slash.
 * A static host resolves `/products/4` to `products/4.html` but resolves
 * `/products/4/` to `products/4/index.html`, and a dev/preview server with an
 * SPA fallback will happily answer the extensionless form with the homepage
 * shell instead. Writing both means the canonical URL, the trailing-slash
 * variant and `vite preview` all serve the same correct document with no
 * redirect hop. Both copies carry the same canonical tag, so search engines
 * consolidate them.
 *
 * Run as part of `npm run build` (postbuild). Requires Playwright (a
 * devDependency) plus its Chromium: `npx playwright install chromium`.
 * A missing browser FAILS the build rather than skipping, because a silent
 * skip ships every page with the homepage's title and canonical — the exact
 * defect this script exists to prevent. Set SKIP_PRERENDER=1 to opt out
 * deliberately.
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

if (process.env.SKIP_PRERENDER === '1') {
  console.log('  prerender skipped: SKIP_PRERENDER=1');
  console.log('  WARNING: every route will ship with the homepage title and canonical.');
  process.exit(0);
}

let chromium;
try {
  ({ chromium } = await import('playwright'));
} catch (err) {
  console.error('\n  Prerender failed: could not load Playwright.\n');
  console.error('  Install it with:  npm install\n');
  console.error(`  (${err.message})\n`);
  process.exit(1);
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

let browser;
try {
  browser = await chromium.launch({ args: ['--no-proxy-server'] });
} catch (err) {
  await server.httpServer.close();
  console.error('\n  Prerender failed: Playwright could not launch Chromium.\n');
  console.error('  Install the browser with:  npx playwright install chromium\n');
  console.error(`  (${err.message})\n`);
  process.exit(1);
}
const page = await browser.newPage();

/*
 * Record the JS chunks each route pulls in, so the saved HTML can preload
 * them. Without this the browser has to download and parse the entry bundle
 * before it discovers the shared data chunks it also needs, turning one round
 * trip into two. A modulepreload in the head starts them in parallel instead.
 */
let currentChunks = new Set();
page.on('response', (res) => {
  const { pathname } = new URL(res.url());
  if (pathname.startsWith('/assets/') && pathname.endsWith('.js')) currentChunks.add(pathname);
});

const report = [];
for (const route of routes) {
  currentChunks = new Set();
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
  await page.evaluate((chunks) => {
    document.querySelectorAll('[data-seo-fallback]').forEach((el) => el.remove());
    document.head
      .querySelectorAll('title, link[rel="canonical"], meta[name="description"], meta[name="robots"], meta[name^="twitter:"], meta[property^="og:"], meta[name="keywords"], meta[name="author"]')
      .forEach((el) => el.setAttribute('data-seo-fallback', ''));

    /* Preload this route's lazy chunks so React never paints the Suspense
     * fallback over already-rendered content. Skip anything the document
     * already references, so the entry bundle is not fetched twice. */
    const referenced = new Set(
      [...document.querySelectorAll('script[src], link[href]')].map((el) =>
        new URL(el.getAttribute('src') || el.getAttribute('href'), location.origin).pathname,
      ),
    );
    for (const href of chunks) {
      if (referenced.has(href)) continue;
      const link = document.createElement('link');
      link.rel = 'modulepreload';
      link.href = href;
      document.head.appendChild(link);
    }
  }, [...currentChunks].sort());

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
  if (r.route === '/') {
    writeFileSync(join(DIST, 'index.html'), r.html, 'utf8');
  } else {
    /* <route>/index.html serves the trailing-slash form... */
    mkdirSync(join(DIST, r.route), { recursive: true });
    writeFileSync(join(DIST, r.route, 'index.html'), r.html, 'utf8');
    /* ...and <route>.html serves the canonical, extensionless form. */
    mkdirSync(dirname(join(DIST, `${r.route}.html`)), { recursive: true });
    writeFileSync(join(DIST, `${r.route}.html`), r.html, 'utf8');
  }
  delete r.html;
}

/*
 * Verify what the server actually SENDS, not what the browser ended up
 * showing. The previous check read the canonical after Playwright had run the
 * page's JavaScript, so React had already corrected the head — which meant a
 * route could pass here while the raw bytes on the wire were the homepage
 * shell. That is exactly what happened to the extensionless URLs: every
 * canonical looked right, and `curl /products/4` returned the homepage.
 *
 * Plain fetch runs no JavaScript, so this sees precisely what a social
 * scraper or an AI crawler sees.
 */
const verifyServer = await preview({
  root: ROOT,
  preview: { port: 5734, strictPort: true },
  logLevel: 'error',
});

/* The served bytes carry HTML entities ("&amp;"); page.title() gave us the
 * decoded text. Decode before comparing so "Pipes &amp; Tubes" matches. */
const decode = (s = '') =>
  s
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&amp;/g, '&');

const titleOf = (html) =>
  decode((html.match(/<title[^>]*>([\s\S]*?)<\/title>/) || [])[1] || '').trim();
const canonicalOf = (html) =>
  (html.match(/<link[^>]*rel="canonical"[^>]*href="([^"]+)"/) || [])[1];

const failures = [];
for (const r of report) {
  const expected = `${SITE}${r.route === '/' ? '/' : r.route}`;
  /* Both forms must serve the page: the canonical URL and the slash variant. */
  for (const url of r.route === '/' ? ['/'] : [r.route, `${r.route}/`]) {
    const html = await (await fetch(`http://localhost:5734${url}`)).text();
    const canonical = canonicalOf(html);
    if (canonical !== expected) {
      failures.push(`${url} served canonical ${canonical || '(none)'} — expected ${expected}`);
    } else if (titleOf(html) !== r.title) {
      failures.push(`${url} served title ${JSON.stringify(titleOf(html))} — expected ${JSON.stringify(r.title)}`);
    }
  }
}

await verifyServer.httpServer.close();

mkdirSync(join(ROOT, 'seo/reports'), { recursive: true });
writeFileSync(
  join(ROOT, 'seo/reports/prerender.json'),
  JSON.stringify({ generated: new Date().toISOString(), count: report.length, routes: report }, null, 2),
);

console.log(`  prerendered ${report.length} routes to dist/ (${report.length * 2 - 1} files)`);

if (failures.length) {
  console.error(`\n  Prerender verification FAILED for ${failures.length} URL(s):`);
  failures.slice(0, 10).forEach((f) => console.error(`    - ${f}`));
  if (failures.length > 10) console.error(`    ... and ${failures.length - 10} more`);
  console.error('\n  These URLs would serve the wrong page to crawlers. Not shipping.\n');
  process.exit(1);
}

console.log(`  verified ${report.length * 2 - 1} served URLs: correct title and canonical, no JS required`);
