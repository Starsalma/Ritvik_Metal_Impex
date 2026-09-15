// Single source of truth for business + SEO data.
// Used by the <Seo> component, JSON-LD builders and the build-time
// sitemap / static-head generators (scripts/*.mjs).

export const site = {
  name: 'Ritvik Metal Impex',
  legalName: 'Ritvik Metal Impex',
  url: 'https://www.ritvikmetalimpex.com',
  logo: '/images/logo.png',
  defaultImage: '/images/hero.jpeg',
  locale: 'en_IN',
  founded: '2015',
  gstin: '27EPNPK9821R1ZR',
  tagline: 'Stainless Steel, Carbon Steel & Non-Ferrous Metal Supplier in Mumbai',
  description:
    'Ritvik Metal Impex is a Mumbai-based supplier, stockist and exporter of stainless steel pipes & tubes, buttweld and forged fittings, flanges, bars, sheets, valves, fasteners and non-ferrous copper & brass products, supplied with Mill Test Certificates and third-party inspection.',
  phone: '+917073895597',
  phoneDisplay: '+91 70738 95597',
  whatsapp: '917073895597',
  emails: ['suresh.prajapat@ritvikmetalimpex.com', 'salesritvikmetal@gmail.com'],
  address: {
    street: 'Building No. 16, 2nd Floor, Patel Mansion, 4th Kumbharwada',
    locality: 'Bhuleshwar',
    city: 'Mumbai',
    region: 'Maharashtra',
    postalCode: '400004',
    country: 'IN',
  },
  geo: { lat: 18.9544, lng: 72.8253 },
  openingHours: 'Mo-Sa 10:00-19:00',
  // Cities / regions used in copy and LocalBusiness areaServed.
  areasServed: [
    'Mumbai', 'Pune', 'Ahmedabad', 'Delhi', 'Chennai', 'Hyderabad',
    'Bengaluru', 'Surat', 'Vadodara', 'Kolkata', 'Jamnagar', 'Rajkot',
  ],
  exportMarkets: [
    'United Arab Emirates', 'Saudi Arabia', 'Oman', 'Qatar', 'Kuwait',
    'United Kingdom', 'United States', 'Singapore', 'Malaysia', 'Germany',
  ],
  social: [],
};

export const absoluteUrl = (path = '/') => {
  if (!path) return site.url;
  if (path.startsWith('http')) return path;
  return `${site.url}${path.startsWith('/') ? '' : '/'}${path}`;
};

export const fullAddress =
  `${site.address.street}, ${site.address.city} - ${site.address.postalCode}, ${site.address.region}, India`;

/** Organization + LocalBusiness graph reused on every page. */
export const organizationSchema = () => ({
  '@type': ['Organization', 'LocalBusiness'],
  '@id': `${site.url}/#organization`,
  name: site.name,
  legalName: site.legalName,
  url: site.url,
  logo: {
    '@type': 'ImageObject',
    url: absoluteUrl(site.logo),
    caption: `${site.name} logo`,
  },
  image: absoluteUrl(site.defaultImage),
  description: site.description,
  telephone: site.phone,
  email: site.emails[0],
  priceRange: '₹₹',
  vatID: site.gstin,
  address: {
    '@type': 'PostalAddress',
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.region,
    postalCode: site.address.postalCode,
    addressCountry: site.address.country,
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: site.geo.lat,
    longitude: site.geo.lng,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '10:00',
      closes: '19:00',
    },
  ],
  areaServed: [
    ...site.areasServed.map((n) => ({ '@type': 'City', name: n })),
    ...site.exportMarkets.map((n) => ({ '@type': 'Country', name: n })),
  ],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: site.phone,
      contactType: 'sales',
      email: site.emails[1],
      areaServed: ['IN', 'AE', 'SA', 'OM', 'QA', 'GB', 'US', 'SG', 'MY'],
      availableLanguage: ['en', 'hi', 'mr', 'gu'],
    },
  ],
});

export const websiteSchema = () => ({
  '@type': 'WebSite',
  '@id': `${site.url}/#website`,
  url: site.url,
  name: site.name,
  description: site.description,
  publisher: { '@id': `${site.url}/#organization` },
  inLanguage: 'en-IN',
});

export const breadcrumbSchema = (crumbs) => ({
  '@type': 'BreadcrumbList',
  itemListElement: crumbs.map((c, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: c.name,
    item: absoluteUrl(c.path),
  })),
});
