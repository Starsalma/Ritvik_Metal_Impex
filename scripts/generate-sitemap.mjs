/**
 * Generates public/sitemap.xml from the live product and article data so the
 * sitemap can never drift out of sync with the catalogue.
 *
 * Runs automatically on `npm run build` via the `prebuild` script.
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { products } from '../src/data/products.js';
import { articles } from '../src/data/articles.js';
import { SITE_URL, CATALOGUE_MODIFIED } from '../src/data/site.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, '../public/sitemap.xml');

/*
 * lastmod uses real content dates, never `new Date()`. Stamping today's date
 * on every URL at build time claims the entire site changed on every deploy,
 * and crawlers that spot that pattern start ignoring lastmod altogether.
 *
 * The newest article date is the honest "something changed" marker for the
 * index pages that list them.
 */
const latestArticleDate = articles
  .map((a) => a.dateModified || a.datePublished)
  .sort()
  .at(-1);

/** @type {{path: string, changefreq: string, priority: string, lastmod: string}[]} */
const urls = [
  { path: '/', changefreq: 'weekly', priority: '1.0', lastmod: latestArticleDate },
  { path: '/products', changefreq: 'weekly', priority: '0.9', lastmod: CATALOGUE_MODIFIED },
  { path: '/blog', changefreq: 'weekly', priority: '0.8', lastmod: latestArticleDate },
  { path: '/about', changefreq: 'monthly', priority: '0.7', lastmod: CATALOGUE_MODIFIED },

  /*
   * Single-facet catalogue views. ProductsPage gives each of these its own
   * title, description and self canonical, so they are real landing pages
   * ("copper products", "flanges") rather than duplicate filters. Multi-facet
   * combinations are noindex and deliberately excluded here.
   */
  ...[...new Set(products.map((p) => p.material))].map((material) => ({
    path: `/products?material=${encodeURIComponent(material)}`,
    changefreq: 'monthly',
    priority: '0.7',
    lastmod: CATALOGUE_MODIFIED,
  })),

  ...[...new Set(products.map((p) => p.form))].map((form) => ({
    path: `/products?form=${encodeURIComponent(form)}`,
    changefreq: 'monthly',
    priority: '0.6',
    lastmod: CATALOGUE_MODIFIED,
  })),

  ...products.map((product) => ({
    path: `/products/${product.id}`,
    changefreq: 'monthly',
    priority: '0.8',
    lastmod: CATALOGUE_MODIFIED,
  })),

  ...articles.map((article) => ({
    path: `/blog/${article.slug}`,
    changefreq: 'monthly',
    priority: '0.7',
    lastmod: article.dateModified || article.datePublished,
  })),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    ({ path, changefreq, priority, lastmod }) => `  <url>
    <loc>${SITE_URL}${path === '/' ? '/' : path.replace(/&/g, '&amp;')}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`;

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, xml, 'utf8');

console.log(`sitemap.xml written with ${urls.length} URLs → ${OUT}`);
