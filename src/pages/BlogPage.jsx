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

  return (
    <>
      <Seo
        title="Knowledge Hub | Stainless Steel & Metal Buying Guides — Ritvik Metal Impex"
        description="In-depth technical guides on stainless steel grade selection, pipe fittings, flanges, mill test certificates and copper alloy heat exchanger tubes, written for engineers and procurement teams."
        keywords="stainless steel guide, ss 304 vs 316, pipe fitting selection, flange selection guide, mill test certificate, heat exchanger tube selection, metal buying guide India"
        path="/blog"
        image="/images/products/pipes-tubes.jpg"
        schema={schema}
      />

      <section className="bg-white min-h-screen py-20 px-6 lg:px-16">
        <div className="max-w-[1200px] mx-auto">

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
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <AnimatedSection key={product.id} animation="fadeUp" delay={index * 40}>
                <Link
                  to={`/products/${product.slug}`}
                  className="group flex flex-col h-full bg-white rounded-tl-[40px] rounded-br-[40px] overflow-hidden shadow-md hover:shadow-2xl border border-gray-100 transition-shadow duration-500"
                >
                  <div className="h-[200px] overflow-hidden bg-gray-100">
                    <img
                      src={product.image}
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
                      {product.blog?.title || product.name}
                    </h3>
                    <p className="text-gray-500 text-[13px] mt-3 leading-relaxed line-clamp-3">
                      {product.blog?.intro || product.description}
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

        </div>
      </section>
    </>
  );
}
