import { Helmet } from 'react-helmet-async';
<<<<<<< HEAD
import {
  site,
  absoluteUrl,
  organizationSchema,
  websiteSchema,
} from '../data/siteConfig';

/**
 * Central SEO head for every route.
 *
 * Emits title, description, canonical, robots, Open Graph, Twitter cards,
 * geo meta and a single consolidated JSON-LD @graph (Organization +
 * LocalBusiness + WebSite + whatever the page passes in `schema`).
 */
export default function Seo({
  title,
  description,
  path = '/',
  image,
  keywords,
  type = 'website',
  noindex = false,
  schema = [],
  publishedTime,
  modifiedTime,
}) {
  const canonical = absoluteUrl(path);
  const ogImage = absoluteUrl(image || site.defaultImage);
  const graph = [organizationSchema(), websiteSchema(), ...schema];

  return (
    <Helmet prioritizeSeoTags>
      <html lang="en-IN" />
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonical} />
      <meta
        name="robots"
        content={
          noindex
            ? 'noindex, nofollow'
            : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
        }
=======
import { site, absoluteUrl, clamp, socialImage, TITLE_MAX, DESCRIPTION_MAX } from '../data/site';
import { imageSize } from '../data/imageSizes';

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
  imageAltText = '',
  schema = [],
  publishedTime,
  modifiedTime,
  author,
  children,
}) {
  /*
   * Append the brand suffix only when the result still fits inside the ~60
   * characters a SERP will actually render. Previously every page appended it
   * unconditionally, pushing titles to 90–106 characters — the brand was the
   * first thing Google cut off, and on long titles it cost real keywords too.
   */
  const withBrand = title && !title.includes(site.name) ? `${title} | ${site.name}` : title;
  const fullTitle = !title
    ? clamp(site.defaultTitle, TITLE_MAX)
    : clamp(withBrand.length <= TITLE_MAX ? withBrand : title, TITLE_MAX);

  const metaDescription = clamp(description, DESCRIPTION_MAX);

  const canonical = absoluteUrl(path);

  /*
   * Swap in a large brand image when the page's own image is below Google's
   * ~1200px bar, so the card still qualifies for a large preview.
   */
  const localImage = image.startsWith(site.url) ? image.slice(site.url.length) : image;
  const shareImage = socialImage(localImage, imageSize);
  const ogImage = absoluteUrl(shareImage);

  /*
   * Declaring the real pixel dimensions lets a scraper reserve the card layout
   * before the image downloads, and is one of the signals Google uses to decide
   * whether an image qualifies for a large preview rather than a thumbnail.
   */
  const dims = imageSize(shareImage);
  const imageAlt = imageAltText || `${title || site.name} — ${site.name}`;
  const schemaList = Array.isArray(schema) ? schema.filter(Boolean) : [schema].filter(Boolean);

  return (
    <Helmet prioritizeSeoTags>
      <html lang={site.language} />
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonical} />
      <meta
        name="robots"
        content={noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'}
>>>>>>> 44a93c1066d3219f4c6feeec5dced53432d90914
      />

      {/* Open Graph */}
      <meta property="og:site_name" content={site.name} />
      <meta property="og:locale" content={site.locale} />
      <meta property="og:type" content={type} />
<<<<<<< HEAD
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content={title} />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Local / business signals */}
      <meta name="author" content={site.name} />
      <meta name="geo.region" content="IN-MH" />
      <meta name="geo.placename" content="Mumbai" />
      <meta name="geo.position" content={`${site.geo.lat};${site.geo.lng}`} />
      <meta name="ICBM" content={`${site.geo.lat}, ${site.geo.lng}`} />

      <script type="application/ld+json">
        {JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })}
      </script>
=======
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:secure_url" content={ogImage} />
      <meta property="og:image:alt" content={imageAlt} />
      {dims && <meta property="og:image:width" content={String(dims[0])} />}
      {dims && <meta property="og:image:height" content={String(dims[1])} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={imageAlt} />

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
>>>>>>> 44a93c1066d3219f4c6feeec5dced53432d90914
    </Helmet>
  );
}
