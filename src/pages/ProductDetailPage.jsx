import { useParams, useNavigate, Link } from 'react-router-dom';
import Seo from '../components/Seo';
import { scrollToContact } from '../utils/navigation';
import { products } from '../data/products';
import { articles } from '../data/articles';
import { site, absoluteUrl, breadcrumbSchema } from '../data/site';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <>
        <Seo
          title="Product Not Found"
          description="The product you are looking for is not available in our catalogue."
          path={`/products/${id}`}
          noindex
        />
        <section className="bg-white min-h-screen flex items-center justify-center px-6">
          <div className="text-center">
            <h1 className="text-3xl font-black text-[#0A1828] uppercase">Product Not Found</h1>
            <p className="text-gray-500 mt-4">The product you're looking for doesn't exist.</p>
            <Link to="/products" className="inline-block mt-8 bg-[#0A1828] text-white px-8 py-4 uppercase font-bold tracking-widest">Back to Products</Link>
          </div>
        </section>
      </>
    );
  }

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3);

  /* Technical guides that reference this product — internal linking for topical authority */
  const relatedGuides = articles.filter((a) => a.relatedProductIds?.includes(product.id)).slice(0, 3);

  const path = `/products/${product.id}`;
  const seoTitle = `${product.material} ${product.name} Supplier & Stockist in Mumbai, India`;
  const seoDescription = `${product.name} in ${product.material} from Ritvik Metal Impex, Mumbai. ${product.description.slice(0, 118)}… Mill test certificates, ready stock and pan-India delivery. Request a price.`;
  const seoKeywords = `${product.name}, ${product.material} ${product.name}, ${product.name} supplier Mumbai, ${product.name} stockist India, ${product.name} price India, ${product.material} supplier, ${product.form} supplier India, Ritvik Metal Impex`;

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${absoluteUrl(path)}#product`,
    name: `${product.material} ${product.name}`,
    alternateName: product.name,
    description: product.description,
    image: [absoluteUrl(product.image)],
    category: `${product.category} Metals > ${product.form}`,
    material: product.material,
    sku: `RMI-${String(product.id).padStart(3, '0')}`,
    url: absoluteUrl(path),
    brand: { '@type': 'Brand', name: site.name },
    manufacturer: { '@id': `${site.url}/#organization` },
    additionalProperty: [
      { '@type': 'PropertyValue', name: 'Material', value: product.material },
      { '@type': 'PropertyValue', name: 'Product Form', value: product.form },
      { '@type': 'PropertyValue', name: 'Category', value: product.category },
      { '@type': 'PropertyValue', name: 'Certification', value: 'Mill Test Certificate (EN 10204 3.1); 3.2 / IBR on request' },
    ],
    offers: {
      '@type': 'Offer',
      url: absoluteUrl(path),
      availability: 'https://schema.org/InStock',
      priceCurrency: 'INR',
      priceSpecification: {
        '@type': 'PriceSpecification',
        priceCurrency: 'INR',
        valueAddedTaxIncluded: false,
        description: 'Price on request — quoted against size, grade, schedule and quantity.',
      },
      seller: { '@id': `${site.url}/#organization` },
      areaServed: 'IN',
    },
  };

  const crumbs = breadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: product.name, path },
  ]);

  const guideSchema = product.blog
    ? {
        '@context': 'https://schema.org',
        '@type': 'TechArticle',
        headline: product.blog.title,
        description: product.blog.intro,
        image: [absoluteUrl(product.image)],
        inLanguage: site.language,
        author: { '@type': 'Organization', name: site.name },
        publisher: {
          '@type': 'Organization',
          name: site.name,
          logo: { '@type': 'ImageObject', url: site.logo },
        },
        mainEntityOfPage: { '@type': 'WebPage', '@id': absoluteUrl(path) },
      }
    : null;

  return (
    <>
      <Seo
        title={seoTitle}
        description={seoDescription}
        keywords={seoKeywords}
        path={path}
        image={product.image}
        type="product"
        schema={[productSchema, crumbs, guideSchema]}
      />

      <section className="bg-white min-h-screen py-16 px-6 lg:px-16">
        <div className="max-w-[1200px] mx-auto">

          {/* Breadcrumb */}
          <nav aria-label="breadcrumb" className="flex items-center gap-2 text-sm text-gray-400 mb-10">
            <Link to="/" className="hover:text-[#E5A93C]">Home</Link>
            <span>/</span>
            <Link to="/products" className="hover:text-[#E5A93C]">Products</Link>
            <span>/</span>
            <span className="text-[#0A1828] font-semibold">{product.name}</span>
          </nav>

          {/* Product Header */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="rounded-tl-[60px] rounded-br-[60px] overflow-hidden shadow-xl bg-gray-100 h-[420px] lg:h-[520px]">
              <img src={product.image} alt={`${product.material} ${product.name} supplied by Ritvik Metal Impex, Mumbai`}
                loading="eager"
                className="w-full h-full object-cover"
                onError={(e) => { e.target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center"><span class="text-gray-300 uppercase tracking-widest">Product Image</span></div>'; }} />
            </div>

            <div>
              <span className="text-[#E5A93C] font-black tracking-[0.2em] uppercase text-xs">{product.material} · {product.category}</span>

              <h1 className="text-4xl lg:text-5xl font-black text-[#0A1828] uppercase mt-3 leading-tight">
                {product.name}
                <span className="sr-only"> — {product.material} supplier and stockist in Mumbai, India</span>
              </h1>

              <div className="w-16 h-[2px] bg-[#E5A93C] mt-6 mb-6" />

              <p className="text-gray-600 text-[16px] leading-relaxed">{product.description}</p>

              {/* Spec table */}
              <div className="mt-10 border border-gray-200 rounded-lg overflow-hidden">
                <div className="grid grid-cols-2 divide-x divide-gray-200">
                  <div className="p-5">
                    <p className="text-[11px] font-black tracking-widest text-gray-400 uppercase">Material</p>
                    <p className="text-[#0A1828] font-bold mt-1">{product.material}</p>
                  </div>
                  <div className="p-5">
                    <p className="text-[11px] font-black tracking-widest text-gray-400 uppercase">Form</p>
                    <p className="text-[#0A1828] font-bold mt-1">{product.form}</p>
                  </div>
                </div>
                <div className="border-t border-gray-200 p-5">
                  <p className="text-[11px] font-black tracking-widest text-gray-400 uppercase">Category</p>
                  <p className="text-[#0A1828] font-bold mt-1">{product.category}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => scrollToContact(navigate)}
                  className="bg-[#0A1828] text-white px-8 py-4 uppercase font-bold tracking-widest hover:bg-[#1A3A5C] transition-colors">
                  Request Quote
                </button>
                <a href={`https://wa.me/917073895597?text=${encodeURIComponent(`Hi, I'm interested in ${product.name}. Please share more details.`)}`}
                  target="_blank" rel="noreferrer"
                  className="border border-gray-300 text-[#0A1828] px-8 py-4 uppercase font-bold tracking-widest hover:border-[#0A1828] transition-colors text-center">
                  Ask on WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* SEO ARTICLE SECTION */}
          {product.blog && (
            <article className="mt-24 border-t border-gray-100 pt-16">

              {/* Article Header */}
              <header className="mb-12">
                <span className="text-[11px] font-black tracking-[0.3em] text-[#E5A93C] uppercase">Product Guide & Technical Article</span>
                <h2 className="text-3xl lg:text-4xl font-black text-[#0A1828] uppercase mt-3 leading-tight">
                  {product.blog.title}
                </h2>
                <div className="w-16 h-[2px] bg-[#E5A93C] mt-6 mb-6" />
                <p className="text-gray-600 text-[17px] leading-relaxed max-w-3xl">
                  {product.blog.intro}
                </p>
              </header>

              {/* Article Body — H3 sections in 2-col grid */}
              <div className="grid md:grid-cols-2 gap-8 mb-16">
                {product.blog.sections.map((section, i) => (
                  <div key={i} className="bg-gray-50 rounded-tl-[24px] rounded-br-[24px] p-8 border border-gray-100 hover:border-[#E5A93C]/30 transition-colors">
                    <div className="flex items-start gap-4 mb-4">
                      <span className="bg-[#0A1828] text-[#E5A93C] text-[11px] font-black tracking-widest w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <h3 className="text-[16px] font-black text-[#0A1828] uppercase leading-tight">{section.heading}</h3>
                    </div>
                    <p className="text-gray-500 text-[14px] leading-relaxed pl-12">{section.content}</p>
                  </div>
                ))}
              </div>

              {/* SEO Keywords paragraph — naturally written */}
              <div className="bg-[#F8F9FA] border-l-4 border-[#E5A93C] p-8 mb-16 rounded-r-2xl">
                <h3 className="text-[15px] font-black text-[#0A1828] uppercase mb-3">
                  About Our {product.name} Supply
                </h3>
                <p className="text-gray-600 text-[14px] leading-relaxed">
                  Ritvik Metal Impex is a trusted {product.material} {product.name} supplier and stockist based in Mumbai, Maharashtra. We supply {product.name.toLowerCase()} across India including Mumbai, Pune, Delhi, Ahmedabad, Chennai, Hyderabad, Surat, and Bangalore, as well as export to UAE, Saudi Arabia, UK, USA, and South East Asia. Our {product.name.toLowerCase()} are sourced from reputed mills with full material traceability and supplied with Mill Test Certificates (MTC). We offer competitive pricing, ready stock for standard sizes, and fast dispatch for urgent requirements. Contact us for the best {product.material} {product.name.toLowerCase()} price in India.
                </p>
              </div>

              {/* CTA Banner */}
              <div className="bg-[#0A1828] rounded-tl-[32px] rounded-br-[32px] p-8 lg:p-10 flex flex-col lg:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-white text-xl font-black uppercase">Need {product.name}?</h3>
                  <p className="text-gray-400 mt-1 text-sm">Get a competitive quote with full material certification from Mumbai's trusted metal supplier.</p>
                </div>
                <div className="flex gap-4 flex-wrap">
                  <button
                    onClick={() => scrollToContact(navigate)}
                    className="bg-[#E5A93C] text-[#0A1828] px-8 py-3 uppercase font-black text-[11px] tracking-widest hover:bg-[#d4982b] transition-colors">
                    Request Quote
                  </button>
                  <a href={`https://wa.me/917073895597?text=${encodeURIComponent(`Hi, I need a quote for ${product.name}.`)}`}
                    target="_blank" rel="noreferrer"
                    className="border border-white/30 text-white px-8 py-3 uppercase font-black text-[11px] tracking-widest hover:border-white transition-colors text-center">
                    WhatsApp Us
                  </a>
                </div>
              </div>

            </article>
          )}

          {/* Technical guides referencing this product — internal links */}
          {relatedGuides.length > 0 && (
            <div className="mt-24">
              <h2 className="text-2xl font-black text-[#0A1828] uppercase mb-2">
                Technical Guides
              </h2>
              <p className="text-gray-500 text-sm mb-8">
                In-depth reading on grades, standards and specification for this product.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {relatedGuides.map((guide) => (
                  <Link
                    key={guide.slug}
                    to={`/blog/${guide.slug}`}
                    className="group border border-gray-200 rounded-tl-[24px] rounded-br-[24px] p-6 hover:border-[#E5A93C] hover:shadow-lg transition-all"
                  >
                    <span className="text-[#E5A93C] text-[10px] font-black tracking-[0.18em] uppercase">
                      {guide.category}
                    </span>
                    <h3 className="text-[15px] font-black text-[#0A1828] uppercase mt-2 leading-snug">
                      {guide.title}
                    </h3>
                    <p className="text-gray-500 text-[12px] mt-3 leading-relaxed line-clamp-3">
                      {guide.description}
                    </p>
                    <span className="inline-block mt-4 text-[11px] font-black tracking-[0.15em] text-[#0A1828] uppercase group-hover:text-[#E5A93C] transition-colors">
                      Read Guide →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Related Products */}
          {related.length > 0 && (
            <div className="mt-24">
              <h2 className="text-2xl font-black text-[#0A1828] uppercase mb-8">Related Products</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {related.map((r) => (
                  <div key={r.id} onClick={() => navigate(`/products/${r.id}`)}
                    className="cursor-pointer bg-white rounded-tl-[30px] rounded-br-[30px] overflow-hidden shadow-md hover:shadow-xl border border-gray-100 transition-all">
                    <div className="h-[180px] bg-gray-100 overflow-hidden">
                      <img src={r.image} alt={`${r.material} ${r.name} supplier in Mumbai, India`} loading="lazy" className="w-full h-full object-cover" onError={(e)=>{e.target.style.display='none';}} />
                    </div>
                    <div className="p-4">
                      <span className="text-[#E5A93C] text-[10px] font-black tracking-widest uppercase">{r.material}</span>
                      <h4 className="text-[15px] font-black text-[#0A1828] uppercase mt-1">{r.name}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </section>
    </>
  );
}
