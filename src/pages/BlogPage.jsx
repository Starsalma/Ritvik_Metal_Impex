<<<<<<< HEAD
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import { articles, articleCategories } from '../data/articles';
import AnimatedSection from '../components/AnimatedSection';
import Seo from '../components/Seo';
import { site, absoluteUrl, breadcrumbSchema } from '../data/siteConfig';

const GOLD = '#E5A93C';
const NAVY = '#0A1828';

export default function BlogPage() {
  const [category, setCategory] = useState('All');

  const visibleArticles =
    category === 'All' ? articles : articles.filter((a) => a.category === category);

  const [featured, ...rest] = visibleArticles;

  const schema = [
    {
      '@type': 'CollectionPage',
      '@id': `${site.url}/blog#collection`,
      name: 'Knowledge Hub — Metal Selection & Specification Guides',
      description:
        'Technical buying guides on stainless steel grades, pipe fittings, flanges, mill test certificates and non-ferrous heat exchanger tubes.',
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
  ];
=======
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import { products } from '../data/products';
import { articles } from '../data/articles';
import AnimatedSection from '../components/AnimatedSection';
import CTABand from '../components/CTABand';
import { site, absoluteUrl, breadcrumbSchema } from '../data/site';

const formatDate = (iso) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });

export default function BlogPage() {

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': `${site.url}/blog#blog`,
    name: `${site.name} Knowledge Hub`,
    description:
      'Technical guides on stainless steel, carbon steel, duplex, copper and brass products — grade selection, standards, certification and procurement.',
    url: absoluteUrl('/blog'),
    inLanguage: site.language,
    publisher: { '@id': `${site.url}/#organization` },
    blogPost: articles.map((article) => ({
      '@type': 'BlogPosting',
      headline: article.title,
      description: article.description,
      image: absoluteUrl(article.image),
      datePublished: article.datePublished,
      dateModified: article.dateModified,
      url: absoluteUrl(`/blog/${article.slug}`),
      author: { '@type': 'Organization', name: site.name },
    })),
  };

  const crumbs = breadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Knowledge Hub', path: '/blog' },
  ]);
>>>>>>> 44a93c1066d3219f4c6feeec5dced53432d90914

  return (
    <>
      <Seo
<<<<<<< HEAD
        title="Knowledge Hub | Stainless Steel & Metal Buying Guides — Ritvik Metal Impex"
        description="In-depth technical guides on stainless steel grade selection, pipe fittings, flanges, mill test certificates and copper alloy heat exchanger tubes, written for engineers and procurement teams."
        keywords="stainless steel guide, ss 304 vs 316, pipe fitting selection, flange selection guide, mill test certificate, heat exchanger tube selection, metal buying guide India"
        path="/blog"
        image="/images/products/pipes-tubes.jpg"
        schema={schema}
=======
        title="Metal Knowledge Hub — Technical Guides & Articles"
        description="In-depth technical guides from Ritvik Metal Impex: SS 304 vs 316, duplex vs super duplex, buttweld vs socketweld fittings, copper tube standards, and how to read EN 10204 mill test certificates and IBR documentation."
        keywords="stainless steel guide, 304 vs 316, duplex vs super duplex, buttweld vs socketweld, copper tube grades, EN 10204 mill test certificate, IBR certification, metal technical articles India"
        path="/blog"
        image="/images/products/pipes-tubes.jpg"
        schema={[blogSchema, crumbs]}
>>>>>>> 44a93c1066d3219f4c6feeec5dced53432d90914
      />

      <section className="bg-white min-h-screen py-20 px-6 lg:px-16">
        <div className="max-w-[1200px] mx-auto">
<<<<<<< HEAD

          <AnimatedSection animation="fadeUp" className="text-center mb-14">
            <span className="font-bold tracking-[0.25em] uppercase text-sm" style={{ color: GOLD }}>
              Knowledge Hub
            </span>
            <h1 className="text-5xl lg:text-6xl font-black mt-4 uppercase" style={{ color: NAVY }}>
              Metal Buying Guides
            </h1>
            <div className="w-20 h-[2px] mx-auto mt-6" style={{ background: GOLD }} />
            <p className="max-w-2xl mx-auto text-gray-500 mt-8 leading-relaxed">
              Specification and selection guides written for engineers and procurement teams —
              grade selection, piping standards, certification and inspection, from a Mumbai stockist
              who supplies the material every day.
            </p>
          </AnimatedSection>

          {/* Category filter */}
          <AnimatedSection animation="fadeUp" delay={80} className="flex flex-wrap justify-center gap-3 mb-14">
            {['All', ...articleCategories].map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-5 py-2.5 rounded-full text-[12px] font-bold uppercase tracking-wider transition-all duration-200 ${
                  category === c ? 'text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                style={category === c ? { background: NAVY } : undefined}
              >
                {c}
              </button>
            ))}
          </AnimatedSection>

          {/* Featured article */}
          {featured && (
            <AnimatedSection animation="fadeUp" delay={120} className="mb-16">
              <Link
                to={`/blog/${featured.slug}`}
                className="group grid lg:grid-cols-2 gap-0 bg-white rounded-tl-[48px] rounded-br-[48px] overflow-hidden shadow-md hover:shadow-2xl border border-gray-100 transition-shadow duration-500"
              >
                <div className="h-[260px] lg:h-[400px] overflow-hidden bg-gray-100">
                  <img
                    src={featured.image}
                    alt={featured.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="eager"
                  />
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-3 text-[10px] font-black tracking-[0.2em] uppercase">
                    <span style={{ color: GOLD }}>Featured · {featured.category}</span>
                    <span className="text-gray-300">{featured.readTime} min read</span>
                  </div>
                  <h2 className="text-[24px] lg:text-[32px] font-black uppercase mt-4 leading-[1.15]" style={{ color: NAVY }}>
                    {featured.title}
                  </h2>
                  <p className="text-gray-500 text-[15px] mt-5 leading-relaxed">{featured.excerpt}</p>
                  <div className="flex items-center gap-2 mt-8">
                    <span className="text-[11px] font-black tracking-widest uppercase" style={{ color: NAVY }}>
                      Read the guide
                    </span>
                    <span className="group-hover:translate-x-1 transition-transform duration-200" style={{ color: GOLD }}>
                      →
                    </span>
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          )}

          {/* Remaining articles */}
          {rest.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
              {rest.map((article, index) => (
                <AnimatedSection key={article.slug} animation="fadeUp" delay={index * 70}>
                  <Link
                    to={`/blog/${article.slug}`}
                    className="group flex flex-col h-full bg-white rounded-tl-[40px] rounded-br-[40px] overflow-hidden shadow-md hover:shadow-2xl border border-gray-100 transition-shadow duration-500"
                  >
                    <div className="h-[200px] overflow-hidden bg-gray-100">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex items-center justify-between text-[10px] font-black tracking-[0.2em] uppercase">
                        <span style={{ color: GOLD }}>{article.category}</span>
                        <span className="text-gray-300">{article.readTime} min</span>
                      </div>
                      <h2 className="text-[17px] font-black uppercase mt-3 leading-tight" style={{ color: NAVY }}>
                        {article.title}
                      </h2>
                      <p className="text-gray-500 text-[13px] mt-3 leading-relaxed line-clamp-3">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center gap-2 mt-auto pt-5">
                        <span className="text-[11px] font-black tracking-widest uppercase" style={{ color: NAVY }}>
                          Read guide
                        </span>
                        <span className="group-hover:translate-x-1 transition-transform duration-200" style={{ color: GOLD }}>
                          →
                        </span>
                      </div>
                    </div>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          )}

          {/* Product technical notes */}
          <AnimatedSection animation="fadeUp" className="text-center mb-12 pt-8 border-t border-gray-100">
            <span className="font-bold tracking-[0.25em] uppercase text-sm" style={{ color: GOLD }}>
              Product Guides
            </span>
            <h2 className="text-3xl lg:text-4xl font-black mt-4 uppercase" style={{ color: NAVY }}>
              Technical notes by product
            </h2>
            <p className="max-w-2xl mx-auto text-gray-500 mt-6">
              Grades, standards, size ranges and applications for every item in our catalogue.
=======
          <AnimatedSection animation="fadeUp" className="text-center mb-16">
            <span className="text-[#E5A93C] font-bold tracking-[0.25em] uppercase text-sm">
              Knowledge Hub
            </span>
            <h1 className="text-4xl lg:text-6xl font-black text-[#0A1828] mt-4 uppercase leading-[1.1]">
              Metal Guides &amp; Technical Articles
            </h1>
            <div className="w-20 h-[2px] bg-[#E5A93C] mx-auto mt-6" />
            <p className="max-w-2xl mx-auto text-gray-500 mt-8 leading-relaxed">
              Research-backed guides on industrial metals — grade selection, ASTM and ASME
              standards, certification and procurement — written for engineers, procurement teams
              and fabricators.
            </p>
          </AnimatedSection>

          {/* ── Featured technical articles ───────────────────── */}
          <AnimatedSection animation="fadeUp" className="mb-8">
            <h2 className="text-[13px] font-black tracking-[0.25em] text-[#0A1828] uppercase">
              Technical Guides
            </h2>
            <div className="w-10 h-[2px] bg-[#E5A93C] mt-3" />
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
            {articles.map((article, index) => (
              <AnimatedSection key={article.slug} animation="fadeUp" delay={index * 60}>
                <Link
                  to={`/blog/${article.slug}`}
                  className="group flex flex-col h-full bg-white rounded-tl-[40px] rounded-br-[40px] overflow-hidden shadow-md hover:shadow-2xl border border-gray-100 transition-shadow duration-500"
                >
                  <div className="h-[200px] overflow-hidden bg-gray-100">
                    <img
                      src={article.image}
                      alt={article.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <span className="text-[#E5A93C] text-[10px] font-black tracking-[0.2em] uppercase">
                      {article.category}
                    </span>
                    <h3 className="text-[17px] font-black text-[#0A1828] uppercase mt-2 leading-tight">
                      {article.title}
                    </h3>
                    <p className="text-gray-500 text-[13px] mt-3 leading-relaxed line-clamp-3 flex-grow">
                      {article.description}
                    </p>
                    <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100">
                      <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                        <time dateTime={article.datePublished}>
                          {formatDate(article.datePublished)}
                        </time>{' '}
                        · {article.readTime}
                      </span>
                      <span className="text-[#E5A93C] group-hover:translate-x-1 transition-transform duration-200">
                        →
                      </span>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>

          {/* ── Per-product guides ────────────────────────────── */}
          <AnimatedSection animation="fadeUp" className="mb-8">
            <h2 className="text-[13px] font-black tracking-[0.25em] text-[#0A1828] uppercase">
              Product Guides
            </h2>
            <div className="w-10 h-[2px] bg-[#E5A93C] mt-3" />
            <p className="text-gray-500 text-[14px] mt-4 max-w-2xl">
              Specifications, grades, standards and applications for every product in our
              catalogue.
>>>>>>> 44a93c1066d3219f4c6feeec5dced53432d90914
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <AnimatedSection key={product.id} animation="fadeUp" delay={index * 40}>
                <Link
<<<<<<< HEAD
                  to={`/products/${product.slug}`}
                  className="group flex flex-col h-full bg-white rounded-tl-[40px] rounded-br-[40px] overflow-hidden shadow-md hover:shadow-2xl border border-gray-100 transition-shadow duration-500"
=======
                  to={`/products/${product.id}`}
                  className="group block bg-white rounded-tl-[40px] rounded-br-[40px] overflow-hidden shadow-md hover:shadow-2xl border border-gray-100 transition-shadow duration-500 h-full"
>>>>>>> 44a93c1066d3219f4c6feeec5dced53432d90914
                >
                  <div className="h-[200px] overflow-hidden bg-gray-100">
                    <img
                      src={product.image}
<<<<<<< HEAD
                      alt={`${product.material} ${product.name} — ${site.name}, Mumbai`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      decoding="async"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <span className="text-[10px] font-black tracking-[0.2em] uppercase" style={{ color: GOLD }}>
                      {product.material} · {product.category}
                    </span>
                    <h3 className="text-[17px] font-black uppercase mt-2 leading-tight" style={{ color: NAVY }}>
=======
                      alt={`${product.material} ${product.name} — technical guide`}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                  <div className="p-6">
                    <span className="text-[#E5A93C] text-[10px] font-black tracking-[0.2em] uppercase">
                      {product.material} · {product.category}
                    </span>
                    <h3 className="text-[17px] font-black text-[#0A1828] uppercase mt-2 leading-tight">
>>>>>>> 44a93c1066d3219f4c6feeec5dced53432d90914
                      {product.blog?.title || product.name}
                    </h3>
                    <p className="text-gray-500 text-[13px] mt-3 leading-relaxed line-clamp-3">
                      {product.blog?.intro || product.description}
                    </p>
<<<<<<< HEAD
                    <div className="flex items-center gap-2 mt-auto pt-5">
                      <span className="text-[11px] font-black tracking-widest uppercase" style={{ color: NAVY }}>
                        Read guide
                      </span>
                      <span className="group-hover:translate-x-1 transition-transform duration-200" style={{ color: GOLD }}>
=======
                    <div className="flex items-center gap-2 mt-5">
                      <span className="text-[11px] font-black tracking-widest text-[#0A1828] uppercase">
                        Read Guide
                      </span>
                      <span className="text-[#E5A93C] group-hover:translate-x-1 transition-transform duration-200">
>>>>>>> 44a93c1066d3219f4c6feeec5dced53432d90914
                        →
                      </span>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
<<<<<<< HEAD

        </div>
      </section>
=======
        </div>
      </section>

      <CTABand
        eyebrow="Need Advice?"
        title="Not sure which grade your application needs?"
        body="Our team specifies metals for oil and gas, power, chemical, pharmaceutical and marine projects every day. Describe the service conditions and we will recommend the grade — and quote it."
        primaryLabel="Ask Our Team"
        whatsappMessage="Hi, I have a technical question about metal grade selection."
      />
>>>>>>> 44a93c1066d3219f4c6feeec5dced53432d90914
    </>
  );
}
