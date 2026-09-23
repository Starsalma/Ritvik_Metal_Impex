/**
 * Single source of truth for site-wide SEO / NAP (Name, Address, Phone) data.
 * Used by <Seo />, JSON-LD builders and the sitemap generator.
 */

export const SITE_URL = 'https://www.ritvikmetalimpex.com';

/**
 * Stable dates for the product catalogue and its per-product guides.
 *
 * These are deliberately hard-coded rather than `new Date()`. Stamping "today"
 * on every page at build time tells crawlers the whole site changed on every
 * deploy, which devalues the lastmod signal. Bump CATALOGUE_MODIFIED by hand
 * when the catalogue content actually changes.
 */
export const CATALOGUE_PUBLISHED = '2026-01-10';
export const CATALOGUE_MODIFIED = '2026-08-15';

export const site = {
  url: SITE_URL,
  name: 'Ritvik Metal Impex',
  legalName: 'Ritvik Metal Impex',
  shortName: 'RMI',
  tagline: 'Your Reliable Source for Quality Metals',
  defaultTitle: 'Stainless Steel & Metal Supplier Mumbai | Ritvik Metal Impex',
  defaultDescription:
    'Ritvik Metal Impex is a Mumbai-based supplier, stockist and exporter of stainless steel pipes, buttweld & forged fittings, flanges, sheets, plates, bars, fasteners, valves and copper & brass products. Mill test certificates, IBR and third-party inspection supported.',
  defaultKeywords: [
    'stainless steel supplier Mumbai',
    'stainless steel pipe supplier India',
    'buttweld fittings supplier',
    'flanges supplier Mumbai',
    'copper tube supplier India',
    'brass rods supplier',
    'duplex steel stockist',
    'nickel alloy supplier India',
    'metal stockist Mumbai',
    'Ritvik Metal Impex',
  ].join(', '),
  logo: `${SITE_URL}/images/logo.png`,
  /*
   * Must be at least 1200px on the long edge — that is Google's threshold for a
   * large image preview and Discover eligibility, and the minimum a WhatsApp or
   * LinkedIn share needs to render as a full card rather than a thumbnail.
   * hero.jpeg was used here and is only 726x1085, so every page without its own
   * product image was serving an image too small to qualify.
   */
  defaultImagePath: '/images/about.jpg',
  defaultImage: `${SITE_URL}/images/about.jpg`,
  locale: 'en_IN',
  language: 'en-IN',
  themeColor: '#0A1828',
  twitterHandle: '',

  gstin: '27EPNPK9821R1ZR',

  /** Commercial terms shown on product pages, the contact form and in schema. */
  moq: '5 kg',
  leadTime: 'Ready stock dispatched in 1–3 working days; mill orders 2–6 weeks',
  paymentTerms: 'Advance, against proforma invoice, or LC at sight for export',
  packing: 'Wooden crates, plastic caps on pipe ends, seaworthy export packing',

  /**
   * Fill these in with the real values and they will flow into the
   * LocalBusiness / Organization schema. Left empty deliberately — publishing a
   * guessed founding date or guessed opening hours as structured data is worse
   * than publishing none.
   *   founded: '2015',
   *   openingHours: [{ days: ['Monday', …], opens: '09:30', closes: '19:00' }],
   */
  founded: '',
  openingHours: [],

  contact: {
    phone: '+917073895597',
    phoneDisplay: '+91 7073895597',
    whatsapp: '917073895597',
    emails: ['suresh.prajapat@ritvikmetalimpex.com', 'salesritvikmetal@gmail.com'],
  },

  address: {
    street: 'Building No 16, 2nd Floor, Patel Mansion, 4th Kumbharwada',
    locality: 'Mumbai',
    region: 'Maharashtra',
    postalCode: '400004',
    country: 'IN',
    countryName: 'India',
    latitude: 18.9544,
    longitude: 72.8253,
  },

  /** Cities / regions we actively serve — used in local SEO copy and schema. */
  areasServed: [
    'Mumbai',
    'Pune',
    'Ahmedabad',
    'Delhi NCR',
    'Chennai',
    'Hyderabad',
    'Bengaluru',
    'Kolkata',
    'Surat',
    'Vadodara',
    'Jamnagar',
    'Rajkot',
    'Visakhapatnam',
    'United Arab Emirates',
    'Saudi Arabia',
    'Qatar',
    'Oman',
    'United Kingdom',
    'United States',
    'Singapore',
    'Malaysia',
  ],

  industries: [
    'Oil & Gas',
    'Petrochemical & Refineries',
    'Power Generation',
    'Chemical & Fertiliser Plants',
    'Pharmaceutical & Food Processing',
    'Shipbuilding & Marine',
    'Water Treatment & Desalination',
    'Construction & Infrastructure',
    'Automotive & Engineering',
  ],

  sameAs: [],
};

/**
 * Search engines truncate titles around 60 characters and descriptions around
 * 155–160. Anything past that is invisible in the SERP, so trim on a word
 * boundary rather than shipping a sentence that gets cut mid-word.
 */
export const TITLE_MAX = 60;
export const DESCRIPTION_MAX = 158;

export const clamp = (text = '', max = DESCRIPTION_MAX) => {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(' ');
  return `${(lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).replace(/[\s,;:.\-—–]+$/, '')}…`;
};

/** Google needs roughly this on the long edge for a large image preview. */
export const MIN_SOCIAL_IMAGE_EDGE = 1200;

/**
 * Picks the image to advertise as the page's social/search thumbnail.
 *
 * Product photos are preferred because they are specific, but an undersized one
 * is rejected for a large preview and renders as a small square card. When a
 * photo is below the threshold we fall back to a brand image that clears it.
 *
 * This is a stopgap. The real fix is replacing the source files — the build
 * prints a warning listing every product image still under the limit.
 */
export const socialImage = (path, size) => {
  // Always returns a PUBLIC PATH, never an absolute URL — callers look the
  // dimensions up in the image manifest, which is keyed by path.
  if (!path) return site.defaultImagePath;
  const local = path.startsWith(SITE_URL) ? path.slice(SITE_URL.length) : path;
  const dims = typeof size === 'function' ? size(local) : size;
  if (!dims) return local;
  return Math.max(dims[0], dims[1]) >= MIN_SOCIAL_IMAGE_EDGE ? local : site.defaultImagePath;
};

/** Absolute URL helper — accepts "/products/1" or a full URL. */
export const absoluteUrl = (path = '/') =>
  path.startsWith('http') ? path : `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;

/* ------------------------------------------------------------------ */
/* JSON-LD builders                                                    */
/* ------------------------------------------------------------------ */

export const organizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: site.name,
  legalName: site.legalName,
  url: SITE_URL,
  logo: {
    '@type': 'ImageObject',
    url: site.logo,
  },
  image: site.defaultImage,
  description: site.defaultDescription,
  ...(site.founded ? { foundingDate: site.founded } : {}),
  email: site.contact.emails[0],
  telephone: site.contact.phone,
  address: {
    '@type': 'PostalAddress',
    streetAddress: site.address.street,
    addressLocality: site.address.locality,
    addressRegion: site.address.region,
    postalCode: site.address.postalCode,
    addressCountry: site.address.country,
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: site.contact.phone,
      contactType: 'sales',
      email: site.contact.emails[0],
      areaServed: ['IN', 'AE', 'SA', 'QA', 'OM', 'GB', 'US', 'SG', 'MY'],
      availableLanguage: ['English', 'Hindi', 'Gujarati', 'Marathi'],
    },
  ],
  areaServed: site.areasServed.map((name) => ({ '@type': 'Place', name })),
  ...(site.sameAs.length ? { sameAs: site.sameAs } : {}),
});

export const localBusinessSchema = () => ({
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'Store'],
  '@id': `${SITE_URL}/#localbusiness`,
  name: site.name,
  image: site.defaultImage,
  logo: site.logo,
  url: SITE_URL,
  telephone: site.contact.phone,
  email: site.contact.emails[0],
  priceRange: '₹₹',
  currenciesAccepted: 'INR, USD',
  address: {
    '@type': 'PostalAddress',
    streetAddress: site.address.street,
    addressLocality: site.address.locality,
    addressRegion: site.address.region,
    postalCode: site.address.postalCode,
    addressCountry: site.address.country,
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: site.address.latitude,
    longitude: site.address.longitude,
  },
  ...(site.openingHours.length
    ? {
        openingHoursSpecification: site.openingHours.map((slot) => ({
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: slot.days,
          opens: slot.opens,
          closes: slot.closes,
        })),
      }
    : {}),
  parentOrganization: { '@id': `${SITE_URL}/#organization` },
});

export const websiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: site.name,
  description: site.defaultDescription,
  inLanguage: site.language,
  publisher: { '@id': `${SITE_URL}/#organization` },
});

/**
 * Breadcrumb JSON-LD.
 * @param {{name: string, path: string}[]} crumbs
 */
export const breadcrumbSchema = (crumbs = []) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: crumbs.map((crumb, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: crumb.name,
    item: absoluteUrl(crumb.path),
  })),
});

/** FAQPage JSON-LD from [{ question, answer }] */
export const faqSchema = (faqs = []) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
  })),
});
