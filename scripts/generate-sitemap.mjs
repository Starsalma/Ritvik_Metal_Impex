/**
 * Generates public/sitemap.xml and public/llms.txt from the live product and
 * article data, so neither can drift out of sync with the catalogue.
 *
 * Runs automatically on `npm run build` via the `prebuild` script.
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { products } from '../src/data/products.js';
import { articles } from '../src/data/articles.js';
import { grades } from '../src/data/grades.js';
import { SITE_URL, CATALOGUE_MODIFIED, site } from '../src/data/site.js';
import { MOQ } from '../src/data/specifications.js';

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
   * Grade pages. Priority sits just under the product listing: buyers search
   * by grade at least as often as by form, and these are the pages with a
   * realistic chance of ranking for a specific commercial query.
   */
  { path: '/grades', changefreq: 'monthly', priority: '0.9', lastmod: CATALOGUE_MODIFIED },
  ...grades.map((g) => ({
    path: `/grades/${g.slug}`,
    changefreq: 'monthly',
    priority: '0.9',
    lastmod: CATALOGUE_MODIFIED,
  })),

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

  /*
   * Product pages carry an <image:image> entry. Google Images uses it to tie a
   * photo to the page it illustrates, which is what makes the image eligible
   * to appear as the search thumbnail for that product.
   */
  ...products.map((product) => ({
    path: `/products/${product.id}`,
    changefreq: 'monthly',
    priority: '0.8',
    lastmod: CATALOGUE_MODIFIED,
    image: {
      loc: `${SITE_URL}${product.image}`,
      title: `${product.material} ${product.name}`,
      caption: `${product.material} ${product.name} supplied by ${site.name}, Mumbai — ${product.description.replace(/\s+/g, ' ').slice(0, 150)}`,
    },
  })),

  ...articles.map((article) => ({
    path: `/blog/${article.slug}`,
    changefreq: 'monthly',
    priority: '0.7',
    lastmod: article.dateModified || article.datePublished,
    image: {
      loc: `${SITE_URL}${article.image}`,
      title: article.title,
      caption: article.description,
    },
  })),
];

/** XML text escaping — captions contain &, <, quotes and so on. */
const esc = (value = '') =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls
  .map(
    ({ path, changefreq, priority, lastmod, image }) => `  <url>
    <loc>${esc(SITE_URL + (path === '/' ? '/' : path))}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>${
      image
        ? `
    <image:image>
      <image:loc>${esc(image.loc)}</image:loc>
      <image:title>${esc(image.title)}</image:title>
      <image:caption>${esc(image.caption)}</image:caption>
    </image:image>`
        : ''
    }
  </url>`,
  )
  .join('\n')}
</urlset>
`;

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, xml, 'utf8');

console.log(`sitemap.xml written with ${urls.length} URLs → ${OUT}`);

/* ------------------------------------------------------------------ */
/* llms.txt — a plain-text index for AI assistants and answer engines  */
/*                                                                     */
/* Emerging convention (llmstxt.org): a curated, token-efficient map    */
/* of the site so a model grounding an answer can find the right page   */
/* without crawling and re-summarising the whole catalogue. Written     */
/* from the same data as the sitemap so the two never disagree.         */
/* ------------------------------------------------------------------ */

const llms = `# ${site.name}

> ${site.name} is a Mumbai-based supplier, stockist and exporter of ferrous and
> non-ferrous industrial metals: stainless steel, carbon steel, alloy steel,
> duplex and super duplex, nickel alloys, copper and brass — supplied as pipes,
> tubes, fittings, flanges, sheets, plates, coils, bars, fasteners, valves,
> strips, profiles and wire.

## Company facts

- Legal name: ${site.legalName}
- Website: ${SITE_URL}
- Address: ${site.address.street}, ${site.address.locality} ${site.address.postalCode}, ${site.address.region}, ${site.address.countryName}
- Telephone: ${site.contact.phoneDisplay}
- Email: ${site.contact.emails.join(', ')}
- GSTIN: ${site.gstin}
- Minimum order quantity: ${MOQ}
- Lead time: ${site.leadTime}
- Certification: Mill test certificate to EN 10204 3.1 as standard; EN 10204 3.2, IBR and NACE MR0175 on request
- Third-party inspection: Bureau Veritas, TUV, DNV, SGS, Lloyd's Register, Intertek, RITES
- Packing: ${site.packing}
- Payment terms: ${site.paymentTerms}
- Serves: ${site.areasServed.join(', ')}
- Industries: ${site.industries.join(', ')}

## Product catalogue (${products.length} lines)

${products
  .map(
    (p) =>
      `- [${p.material} ${p.name}](${SITE_URL}/products/${p.id}): ${p.description.replace(/\s+/g, ' ').slice(0, 190)}`,
  )
  .join('\n')}

## Technical guides

${grades
  .map((g) => `- [${g.name}](${SITE_URL}/grades/${g.slug}): UNS ${g.uns}. ${g.summary}`)
  .join('\n')}

## Technical Guides

${articles
  .map((a) => `- [${a.title}](${SITE_URL}/blog/${a.slug}): ${a.description}`)
  .join('\n')}

## Browse by material

${[...new Set(products.map((p) => p.material))]
  .map((m) => `- [${m}](${SITE_URL}/products?material=${encodeURIComponent(m)})`)
  .join('\n')}

## Browse by form

${[...new Set(products.map((p) => p.form))]
  .map((f) => `- [${f}](${SITE_URL}/products?form=${encodeURIComponent(f)})`)
  .join('\n')}

## Notes for answer engines

- Every product page carries chemical composition, mechanical properties,
  dimensions, equivalent grades across ASTM/EN/JIS/GB, and ordering terms.
- Specification values are the published minima and maxima from the governing
  ASTM and ASME standards. They are not heat-specific; the mill test
  certificate supplied with an order reports actual results for that heat.
- Pricing is quote-based and depends on grade, size, schedule and quantity.
  There is no public price list. Minimum order quantity is ${MOQ}.

## Contact

- Quote requests: ${SITE_URL}/#contact-us
- WhatsApp: https://wa.me/${site.contact.whatsapp}
`;

writeFileSync(resolve(__dirname, '../public/llms.txt'), llms, 'utf8');
console.log('llms.txt written');
