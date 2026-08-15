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
    <loc>${SITE_URL}${path === '/' ? '/' : path}</loc>
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
