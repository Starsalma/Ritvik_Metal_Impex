/**
 * The full public URL map, derived from the same data the app renders.
 * Consumed by generate-sitemap.mjs and prerender-seo.mjs so the sitemap,
 * the prerendered heads and the React routes can never drift apart.
 */
import { products } from '../src/data/products.js';
import { articles } from '../src/data/articles.js';
import {
  site,
  absoluteUrl,
  organizationSchema,
  websiteSchema,
  breadcrumbSchema,
} from '../src/data/siteConfig.js';

const today = new Date().toISOString().slice(0, 10);

const homeSchema = [
  {
    '@type': 'WebPage',
    '@id': `${site.url}/#webpage`,
    url: site.url,
    name: `${site.name} — ${site.tagline}`,
    description: site.description,
    isPartOf: { '@id': `${site.url}/#website` },
    about: { '@id': `${site.url}/#organization` },
    inLanguage: 'en-IN',
  },
  {
    '@type': 'ItemList',
    '@id': `${site.url}/#product-range`,
    name: 'Product range',
    numberOfItems: products.length,
    itemListElement: products.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: absoluteUrl(`/products/${p.slug}`),
      name: `${p.material} ${p.name}`,
    })),
  },
];

export const routes = [
  {
    path: '/',
    priority: '1.0',
    changefreq: 'weekly',
    lastmod: today,
    title: `Stainless Steel & Non-Ferrous Metal Supplier in Mumbai | ${site.name}`,
    description:
      'Ritvik Metal Impex is a Mumbai-based supplier, stockist and exporter of stainless steel pipes, tubes, fittings, flanges, bars and sheets plus copper and brass products — with Mill Test Certificates, third-party inspection and ready stock.',
    keywords:
      'stainless steel supplier Mumbai, ss pipe supplier India, pipe fittings stockist Mumbai, flanges supplier India, copper tube supplier Mumbai, brass rod supplier, nickel alloy stockist India, metal exporter Mumbai, Ritvik Metal Impex',
    image: '/images/hero1.jpeg',
    type: 'website',
    schema: homeSchema,
  },
  {
    path: '/about',
    priority: '0.7',
    changefreq: 'monthly',
    lastmod: today,
    title: `About Us | Trusted Metal Stockist & Exporter in Mumbai — ${site.name}`,
    description:
      'Ritvik Metal Impex supplies mill-tested ferrous and non-ferrous metals from Mumbai to projects across India and export markets. Learn about our stock range, quality process and inspection support.',
    keywords:
      'about Ritvik Metal Impex, metal stockist Mumbai, steel supplier company Maharashtra, industrial metal exporter India',
    image: '/images/about.jpg',
    type: 'website',
    schema: [
      {
        '@type': 'AboutPage',
        '@id': `${site.url}/about#webpage`,
        url: `${site.url}/about`,
        name: `About ${site.name}`,
        description: site.description,
        isPartOf: { '@id': `${site.url}/#website` },
        about: { '@id': `${site.url}/#organization` },
      },
      breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'About Us', path: '/about' },
      ]),
    ],
  },
  {
    path: '/products',
    priority: '0.9',
    changefreq: 'weekly',
    lastmod: today,
    title: `Industrial Metal Products | Stainless Steel, Copper & Brass Catalogue — ${site.name}`,
    description:
      'Browse 22 product categories: stainless steel pipes & tubes, buttweld and forged fittings, flanges, bars, sheets, valves, fasteners, plus copper tubes, brass rods and enameled winding wire. Mumbai stockist and exporter with Mill Test Certificates.',
    keywords:
      'industrial metal products, stainless steel supplier Mumbai, ss pipe fittings stockist, flanges supplier India, copper tube supplier, brass rod supplier, nickel alloy stockist, metal exporter India',
    image: '/images/products/pipes-tubes.jpg',
    type: 'website',
    schema: [
      {
        '@type': 'CollectionPage',
        '@id': `${site.url}/products#collection`,
        name: 'Industrial Metal Products — Ferrous & Non-Ferrous Catalogue',
        url: `${site.url}/products`,
        isPartOf: { '@id': `${site.url}/#website` },
      },
      {
        '@type': 'ItemList',
        '@id': `${site.url}/products#catalogue`,
        numberOfItems: products.length,
        itemListElement: products.map((p, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: absoluteUrl(`/products/${p.slug}`),
          name: `${p.material} ${p.name}`,
        })),
      },
      breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Products', path: '/products' },
      ]),
    ],
  },
  {
    path: '/blog',
    priority: '0.8',
    changefreq: 'weekly',
    lastmod: today,
    title: `Knowledge Hub | Stainless Steel & Metal Buying Guides — ${site.name}`,
    description:
      'In-depth technical guides on stainless steel grade selection, pipe fittings, flanges, mill test certificates and copper alloy heat exchanger tubes, written for engineers and procurement teams.',
    keywords:
      'stainless steel guide, ss 304 vs 316, pipe fitting selection, flange selection guide, mill test certificate, heat exchanger tube selection, metal buying guide India',
    image: '/images/products/pipes-tubes.jpg',
    type: 'website',
    schema: [
      {
        '@type': 'CollectionPage',
        '@id': `${site.url}/blog#collection`,
        name: 'Knowledge Hub — Metal Selection & Specification Guides',
        url: `${site.url}/blog`,
        isPartOf: { '@id': `${site.url}/#website` },
      },
      {
        '@type': 'ItemList',
        '@id': `${site.url}/blog#articles`,
        itemListElement: articles.map((a, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: absoluteUrl(`/blog/${a.slug}`),
          name: a.title,
        })),
      },
      breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Knowledge Hub', path: '/blog' },
      ]),
    ],
  },

  // Product detail pages
  ...products.map((p) => {
    const url = `/products/${p.slug}`;
    const schema = [
      {
        '@type': 'Product',
        '@id': `${absoluteUrl(url)}#product`,
        name: `${p.material} ${p.name}`,
        alternateName: p.name,
        description: p.description,
        image: absoluteUrl(p.image),
        category: `${p.category} Metals / ${p.form}`,
        material: p.material,
        url: absoluteUrl(url),
        brand: { '@id': `${site.url}/#organization` },
        manufacturer: { '@id': `${site.url}/#organization` },
        additionalProperty: [
          { '@type': 'PropertyValue', name: 'Material', value: p.material },
          { '@type': 'PropertyValue', name: 'Product Form', value: p.form },
          { '@type': 'PropertyValue', name: 'Category', value: p.category },
        ],
        offers: {
          '@type': 'Offer',
          url: absoluteUrl(url),
          availability: 'https://schema.org/InStock',
          priceCurrency: 'INR',
          seller: { '@id': `${site.url}/#organization` },
        },
      },
      breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Products', path: '/products' },
        { name: p.name, path: url },
      ]),
    ];

    if (p.blog) {
      schema.push({
        '@type': 'Article',
        '@id': `${absoluteUrl(url)}#guide`,
        headline: p.blog.title,
        description: p.blog.intro,
        image: absoluteUrl(p.image),
        author: { '@id': `${site.url}/#organization` },
        publisher: { '@id': `${site.url}/#organization` },
        mainEntityOfPage: { '@type': 'WebPage', '@id': absoluteUrl(url) },
        inLanguage: 'en-IN',
      });
    }

    return {
      path: url,
      priority: '0.8',
      changefreq: 'monthly',
      lastmod: today,
      title: `${p.name} — ${p.material} Supplier & Stockist in Mumbai | ${site.name}`,
      description: `${p.name} in ${p.material}: ${p.description.slice(0, 130)}… Supplied ex-Mumbai with Mill Test Certificates and third-party inspection. Request a same-day quotation.`,
      keywords: [
        p.name,
        `${p.material} ${p.name}`,
        `${p.name} supplier in Mumbai`,
        `${p.name} stockist India`,
        `${p.name} manufacturer India`,
        `${p.material} ${p.form.toLowerCase()} supplier`,
        `${p.name} exporter`,
        site.name,
      ].join(', '),
      image: p.image,
      type: 'product',
      schema,
    };
  }),

  // Article pages
  ...articles.map((a) => {
    const url = `/blog/${a.slug}`;
    return {
      path: url,
      priority: '0.7',
      changefreq: 'monthly',
      lastmod: a.updatedAt,
      title: a.metaTitle,
      description: a.metaDescription,
      keywords: a.keywords,
      image: a.image,
      type: 'article',
      publishedTime: a.publishedAt,
      modifiedTime: a.updatedAt,
      schema: [
        {
          '@type': 'Article',
          '@id': `${absoluteUrl(url)}#article`,
          headline: a.title,
          description: a.metaDescription,
          image: absoluteUrl(a.image),
          articleSection: a.category,
          datePublished: a.publishedAt,
          dateModified: a.updatedAt,
          inLanguage: 'en-IN',
          author: { '@id': `${site.url}/#organization` },
          publisher: { '@id': `${site.url}/#organization` },
          mainEntityOfPage: { '@type': 'WebPage', '@id': absoluteUrl(url) },
        },
        breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Knowledge Hub', path: '/blog' },
          { name: a.title, path: url },
        ]),
        {
          '@type': 'FAQPage',
          '@id': `${absoluteUrl(url)}#faq`,
          mainEntity: a.faqs.map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          })),
        },
      ],
    };
  }),
];

export const baseGraph = () => [organizationSchema(), websiteSchema()];
export { site, absoluteUrl };
