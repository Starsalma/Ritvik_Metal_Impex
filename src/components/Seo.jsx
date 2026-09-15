import { Helmet } from 'react-helmet-async';
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
      />

      {/* Open Graph */}
      <meta property="og:site_name" content={site.name} />
      <meta property="og:locale" content={site.locale} />
      <meta property="og:type" content={type} />
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
    </Helmet>
  );
}
