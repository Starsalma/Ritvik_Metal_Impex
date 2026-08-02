import { Helmet } from 'react-helmet-async';
import { site, absoluteUrl } from '../data/site';

/**
 * Reusable per-page SEO head.
 *
 * <Seo
 *   title="Flanges Supplier in Mumbai"
 *   description="..."
 *   keywords="..."
 *   path="/products/4"
 *   image="/images/products/flanges.jpg"
 *   type="product"
 *   schema={[productSchema, breadcrumbSchema]}
 * />
 */
export default function Seo({
  title,
  description = site.defaultDescription,
  keywords = site.defaultKeywords,
  path = '/',
  image = site.defaultImage,
  type = 'website',
  noindex = false,
  schema = [],
  publishedTime,
  modifiedTime,
  author,
  children,
}) {
  // Avoid "… | Ritvik Metal Impex | Ritvik Metal Impex" when a page passes a full title.
  const fullTitle = !title
    ? site.defaultTitle
    : title.includes(site.name)
      ? title
      : `${title} | ${site.name}`;

  const canonical = absoluteUrl(path);
  const ogImage = absoluteUrl(image);
  const schemaList = Array.isArray(schema) ? schema.filter(Boolean) : [schema].filter(Boolean);

  return (
    <Helmet prioritizeSeoTags>
      <html lang={site.language} />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonical} />
      <meta
        name="robots"
        content={noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'}
      />

      {/* Open Graph */}
      <meta property="og:site_name" content={site.name} />
      <meta property="og:locale" content={site.locale} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content={title || site.name} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Article metadata */}
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {author && <meta name="author" content={author} />}

      {schemaList.map((entry, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(entry)}
        </script>
      ))}

      {children}
    </Helmet>
  );
}
