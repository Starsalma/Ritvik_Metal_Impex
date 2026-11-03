/**
 * Generates a lightweight {title, slug} / {name, slug, uns} summary of
 * articles and grades for Footer.jsx to import.
 *
 * Footer is NOT lazy-loaded — it renders on every page, including the first
 * one any visitor hits — but it only ever displays a title and a link for
 * each article and grade, never their body content. Importing the real
 * src/data/articles.js and src/data/grades.js modules for that pulls their
 * entire content into the always-loaded shared bundle: articles.js alone is
 * 123 KB of source (10 long-form technical guides), because ES modules are
 * not tree-shaken at the property level — referencing `article.title` still
 * bundles every FAQ, table and paragraph in the same array literal.
 *
 * Run as part of `npm run build` (prebuild), alongside the image manifest and
 * sitemap generators this follows the same pattern as.
 */
import { writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, '../src/data/footerLinks.js');

const { articles } = await import('../src/data/articles.js');
const { grades } = await import('../src/data/grades.js');

const articleLinks = articles.map((a) => ({ title: a.title, slug: a.slug }));
const gradeLinks = grades.map((g) => ({ name: g.name, slug: g.slug, uns: g.uns }));

const body = `/**
 * GENERATED FILE — do not edit by hand.
 * Run \`npm run build\` (or \`node scripts/generate-footer-links.mjs\`) to
 * regenerate from src/data/articles.js and src/data/grades.js.
 *
 * Lightweight title/slug summaries for Footer.jsx, which renders every page
 * and should not pull the full article and grade content — chemistry tables,
 * FAQs, every paragraph — into the always-loaded shared bundle just to show
 * a title and a link. See the comment in generate-footer-links.mjs.
 */
export const articleLinks = ${JSON.stringify(articleLinks, null, 2)};

export const gradeLinks = ${JSON.stringify(gradeLinks, null, 2)};
`;

writeFileSync(OUT, body, 'utf8');
console.log(`footerLinks.js written: ${articleLinks.length} articles, ${gradeLinks.length} grades`);
