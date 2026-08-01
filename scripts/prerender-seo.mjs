/**
 * Post-build step: emit a static HTML file per route with the correct head.
 *
 * This is a single-page app, so without this every URL would serve the same
 * index.html — meaning any crawler or link unfurler that does not execute
 * JavaScript (Facebook, LinkedIn, WhatsApp, X, many SEO tools, and Googlebot
 * before its render pass) sees the homepage title and description on every
 * page. Here we copy dist/index.html to dist/<route>/index.html and replace
 * the block between the <!--seo:start--> / <!--seo:end--> markers with the
 * head for that URL, including its JSON-LD graph.
 *
 * Static files take precedence over the SPA fallback rewrite on both Netlify
 * and GitHub Pages, so the app itself still boots and routes normally.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { routes, baseGraph, site, absoluteUrl } from './routes.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const indexPath = path.join(dist, 'index.html');

if (!fs.existsSync(indexPath)) {
  console.error('[seo] dist/index.html not found — run vite build first.');
  process.exit(1);
}

const template = fs.readFileSync(indexPath, 'utf8');
const START = '<!--seo:start-->';
const END = '<!--seo:end-->';

if (!template.includes(START) || !template.includes(END)) {
  console.error(`[seo] ${START} / ${END} markers missing from index.html.`);
  process.exit(1);
}

const attr = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

// JSON-LD lives inside a script element, so only the sequence that could close
// that element early needs escaping.
const jsonLd = (obj) => JSON.stringify(obj).replace(/<\//g, '<\\/');

function headFor(route) {
  const canonical = absoluteUrl(route.path);
  const image = absoluteUrl(route.image || site.defaultImage);
  const graph = { '@context': 'https://schema.org', '@graph': [...baseGraph(), ...route.schema] };

  const tags = [
    // Preload the LCP image of this specific route only — preloading the hero
    // on every page would download bytes 30 pages never render.
    `<link data-static-seo rel="preload" as="image" href="${attr(route.image || site.defaultImage)}" fetchpriority="high" />`,
    `<title data-static-seo>${attr(route.title)}</title>`,
    `<meta data-static-seo name="description" content="${attr(route.description)}" />`,
    route.keywords && `<meta data-static-seo name="keywords" content="${attr(route.keywords)}" />`,
    `<link data-static-seo rel="canonical" href="${attr(canonical)}" />`,
    `<meta data-static-seo name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />`,
    `<meta data-static-seo name="author" content="${attr(site.name)}" />`,
    '',
    `<meta data-static-seo property="og:site_name" content="${attr(site.name)}" />`,
    `<meta data-static-seo property="og:locale" content="${site.locale}" />`,
    `<meta data-static-seo property="og:type" content="${route.type}" />`,
    `<meta data-static-seo property="og:title" content="${attr(route.title)}" />`,
    `<meta data-static-seo property="og:description" content="${attr(route.description)}" />`,
    `<meta data-static-seo property="og:url" content="${attr(canonical)}" />`,
    `<meta data-static-seo property="og:image" content="${attr(image)}" />`,
    route.publishedTime &&
      `<meta data-static-seo property="article:published_time" content="${route.publishedTime}" />`,
    route.modifiedTime &&
      `<meta data-static-seo property="article:modified_time" content="${route.modifiedTime}" />`,
    '',
    `<meta data-static-seo name="twitter:card" content="summary_large_image" />`,
    `<meta data-static-seo name="twitter:title" content="${attr(route.title)}" />`,
    `<meta data-static-seo name="twitter:description" content="${attr(route.description)}" />`,
    `<meta data-static-seo name="twitter:image" content="${attr(image)}" />`,
    '',
    `<meta data-static-seo name="geo.region" content="IN-MH" />`,
    `<meta data-static-seo name="geo.placename" content="${site.address.city}" />`,
    `<meta data-static-seo name="geo.position" content="${site.geo.lat};${site.geo.lng}" />`,
    `<meta data-static-seo name="ICBM" content="${site.geo.lat}, ${site.geo.lng}" />`,
    '',
    `<script data-static-seo type="application/ld+json">${jsonLd(graph)}</script>`,
  ]
    .filter(Boolean)
    .map((line) => (line ? `    ${line}` : ''))
    .join('\n');

  return `${START}\n${tags}\n    ${END}`;
}

const before = template.slice(0, template.indexOf(START));
const after = template.slice(template.indexOf(END) + END.length);

let written = 0;
for (const route of routes) {
  const html = before + headFor(route) + after;
  const outDir = route.path === '/' ? dist : path.join(dist, route.path);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'index.html'), html);
  written += 1;
}

// GitHub Pages has no rewrite rules; a copy of the homepage shell at 404.html
// makes deep links resolve to the SPA instead of a GitHub error page.
fs.copyFileSync(path.join(dist, 'index.html'), path.join(dist, '404.html'));

console.log(`[seo] prerendered head for ${written} routes into dist/`);
