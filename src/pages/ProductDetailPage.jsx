import React from 'react';
import { useParams, useNavigate, Link, Navigate } from 'react-router-dom';
import { products } from '../data/products';
import { articles } from '../data/articles';
import Seo from '../components/Seo';
import { site, absoluteUrl, breadcrumbSchema } from '../data/siteConfig';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.slug === id);

  // Legacy numeric URLs (/products/1) redirect to the keyword slug so link
  // equity and bookmarks survive the URL change.
  const legacy = !product && products.find((p) => p.id === Number(id));
  if (legacy) return <Navigate to={`/products/${legacy.slug}`} replace />;

  if (!product) {
    return (
      <section className="bg-white min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-3xl font-black text-[#0A1828] uppercase">Product Not Found</h1>
          <p className="text-gray-500 mt-4">The product you're looking for doesn't exist.</p>
          <Link to="/products" className="inline-block mt-8 bg-[#0A1828] text-white px-8 py-4 uppercase font-bold tracking-widest">Back to Products</Link>
        </div>
      </section>
    );
  }

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3);
  const guides = articles.filter((a) => a.relatedProducts?.includes(product.slug)).slice(0, 2);

  const url = `/products/${product.slug}`;
  const seoTitle = `${product.name} — ${product.material} Supplier & Stockist in Mumbai | Ritvik Metal Impex`;
  const seoDescription = `${product.name} in ${product.material}: ${product.description.slice(0, 130)}… Supplied ex-Mumbai with Mill Test Certificates and third-party inspection. Request a same-day quotation.`;
  const seoKeywords = [
    product.name,
    `${product.material} ${product.name}`,
    `${product.name} supplier in Mumbai`,
    `${product.name} stockist India`,
    `${product.name} manufacturer India`,
    `${product.material} ${product.form.toLowerCase()} supplier`,
    `${product.name} exporter`,
    `buy ${product.name.toLowerCase()} online India`,
    'Ritvik Metal Impex',
  ].join(', ');

  const schema = [
    {
      '@type': 'Product',
      '@id': `${absoluteUrl(url)}#product`,
      name: `${product.material} ${product.name}`,
      alternateName: product.name,
      description: product.description,
      image: absoluteUrl(product.image),
      category: `${product.category} Metals / ${product.form}`,
      material: product.material,
      url: absoluteUrl(url),
      brand: { '@id': `${site.url}/#organization` },
      manufacturer: { '@id': `${site.url}/#organization` },
      additionalProperty: [
        { '@type': 'PropertyValue', name: 'Material', value: product.material },
        { '@type': 'PropertyValue', name: 'Product Form', value: product.form },
        { '@type': 'PropertyValue', name: 'Category', value: product.category },
      ],
      // Metal is quoted per enquiry against grade, size and quantity, so no
      // fixed price is published — availability and seller only.
      offers: {
        '@type': 'Offer',
        url: absoluteUrl(url),
        availability: 'https://schema.org/InStock',
        priceCurrency: 'INR',
        seller: { '@id': `${site.url}/#organization` },
        areaServed: site.areasServed.map((n) => ({ '@type': 'City', name: n })),
      },
    },
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Products', path: '/products' },
      { name: product.name, path: url },
    ]),
  ];

  if (product.blog) {
    schema.push({
      '@type': 'Article',
      '@id': `${absoluteUrl(url)}#guide`,
      headline: product.blog.title,
      description: product.blog.intro,
      image: absoluteUrl(product.image),
      author: { '@id': `${site.url}/#organization` },
      publisher: { '@id': `${site.url}/#organization` },
      mainEntityOfPage: { '@type': 'WebPage', '@id': absoluteUrl(url) },
      inLanguage: 'en-IN',
    });
  }

  return (
    <>
      <Seo
        title={seoTitle}
        description={seoDescription}
        keywords={seoKeywords}
        path={url}
        image={product.image}
        type="product"
        schema={schema}
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
              <img src={product.image}
                alt={`${product.material} ${product.name} in stock at ${site.name}, Mumbai`}
                className="w-full h-full object-cover"
                loading="eager" fetchPriority="high"
                onError={(e) => { e.target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center"><span class="text-gray-300 uppercase tracking-widest">Product Image</span></div>'; }} />
            </div>

            <div>
              <span className="text-[#E5A93C] font-black tracking-[0.2em] uppercase text-xs">{product.material} · {product.category}</span>

              <h1 className="text-4xl lg:text-5xl font-black text-[#0A1828] uppercase mt-3 leading-tight">
                {product.material} {product.name}
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
                  onClick={() => { navigate('/'); setTimeout(() => document.getElementById('contact-us')?.scrollIntoView({behavior:'smooth'}), 300); }}
                  className="bg-[#0A1828] text-white px-8 py-4 uppercase font-bold tracking-widest hover:bg-[#1A3A5C] transition-colors">
                  Request Quote
                </button>
                <a href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(`Hi, I'm interested in ${product.name}. Please share more details.`)}`}
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
                    onClick={() => { navigate('/'); setTimeout(() => document.getElementById('contact-us')?.scrollIntoView({behavior:'smooth'}), 300); }}
                    className="bg-[#E5A93C] text-[#0A1828] px-8 py-3 uppercase font-black text-[11px] tracking-widest hover:bg-[#d4982b] transition-colors">
                    Request Quote
                  </button>
                  <a href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(`Hi, I need a quote for ${product.name}.`)}`}
                    target="_blank" rel="noreferrer"
                    className="border border-white/30 text-white px-8 py-3 uppercase font-black text-[11px] tracking-widest hover:border-white transition-colors text-center">
                    WhatsApp Us
                  </a>
                </div>
              </div>

            </article>
          )}

          {/* Further reading — links product pages into the editorial hub */}
          {guides.length > 0 && (
            <div className="mt-24">
              <h2 className="text-2xl font-black text-[#0A1828] uppercase mb-3">Further Reading</h2>
              <div className="w-16 h-[2px] bg-[#E5A93C] mb-8" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {guides.map((a) => (
                  <Link key={a.slug} to={`/blog/${a.slug}`}
                    className="group flex gap-5 items-center bg-white rounded-tl-[24px] rounded-br-[24px] overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 transition-shadow p-5">
                    <img src={a.image} alt={a.title}
                      className="w-20 h-20 object-cover rounded-xl shrink-0 bg-gray-100"
                      loading="lazy" decoding="async" />
                    <div>
                      <span className="text-[#E5A93C] text-[10px] font-black tracking-widest uppercase">{a.category} · {a.readTime} min</span>
                      <h3 className="text-[15px] font-black text-[#0A1828] uppercase mt-1.5 leading-tight group-hover:text-[#E5A93C] transition-colors">{a.title}</h3>
                    </div>
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
                  <Link key={r.id} to={`/products/${r.slug}`}
                    className="block bg-white rounded-tl-[30px] rounded-br-[30px] overflow-hidden shadow-md hover:shadow-xl border border-gray-100 transition-all">
                    <div className="h-[180px] bg-gray-100 overflow-hidden">
                      <img src={r.image} alt={`${r.material} ${r.name} supplied from Mumbai by ${site.name}`}
                        className="w-full h-full object-cover"
                        loading="lazy" decoding="async"
                        onError={(e)=>{e.target.style.display='none';}} />
                    </div>
                    <div className="p-4">
                      <span className="text-[#E5A93C] text-[10px] font-black tracking-widest uppercase">{r.material}</span>
                      <h3 className="text-[15px] font-black text-[#0A1828] uppercase mt-1">{r.name}</h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>
      </section>
    </>
  );
}
