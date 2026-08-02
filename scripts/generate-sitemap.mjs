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
import { SITE_URL } from '../src/data/site.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, '../public/sitemap.xml');

const today = new Date().toISOString().slice(0, 10);

/** @type {{path: string, changefreq: string, priority: string, lastmod?: string}[]} */
const urls = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/products', changefreq: 'weekly', priority: '0.9' },
  { path: '/blog', changefreq: 'weekly', priority: '0.8' },
  { path: '/about', changefreq: 'monthly', priority: '0.7' },

  ...products.map((product) => ({
    path: `/products/${product.id}`,
    changefreq: 'monthly',
    priority: '0.8',
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
    <lastmod>${lastmod || today}</lastmod>
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
