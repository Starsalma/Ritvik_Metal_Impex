import { Link, useNavigate } from 'react-router-dom';
import Seo from '../components/Seo';
import { products } from '../data/products';
import { articles } from '../data/articles';
import AnimatedSection from '../components/AnimatedSection';
import { site, absoluteUrl, breadcrumbSchema } from '../data/site';

const formatDate = (iso) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });

export default function BlogPage() {
  const navigate = useNavigate();

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

  return (
    <>
      <Seo
        title="Metal Industry Knowledge Hub — Technical Guides & Product Articles"
        description="In-depth technical guides from Ritvik Metal Impex: SS 304 vs 316, duplex vs super duplex, buttweld vs socketweld fittings, copper tube standards, and how to read EN 10204 mill test certificates and IBR documentation."
        keywords="stainless steel guide, 304 vs 316, duplex vs super duplex, buttweld vs socketweld, copper tube grades, EN 10204 mill test certificate, IBR certification, metal technical articles India"
        path="/blog"
        image="/images/products/pipes-tubes.jpg"
        schema={[blogSchema, crumbs]}
      />

      <section className="bg-white min-h-screen py-20 px-6 lg:px-16">
        <div className="max-w-[1200px] mx-auto">
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
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <AnimatedSection key={product.id} animation="fadeUp" delay={index * 40}>
                <div
                  onClick={() => navigate(`/products/${product.id}`)}
                  role="link"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') navigate(`/products/${product.id}`);
                  }}
                  className="group cursor-pointer bg-white rounded-tl-[40px] rounded-br-[40px] overflow-hidden shadow-md hover:shadow-2xl border border-gray-100 transition-shadow duration-500 h-full"
                >
                  <div className="h-[200px] overflow-hidden bg-gray-100">
                    <img
                      src={product.image}
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
                      {product.blog?.title || product.name}
                    </h3>
                    <p className="text-gray-500 text-[13px] mt-3 leading-relaxed line-clamp-3">
                      {product.blog?.intro || product.description}
                    </p>
                    <div className="flex items-center gap-2 mt-5">
                      <span className="text-[11px] font-black tracking-widest text-[#0A1828] uppercase">
                        Read Guide
                      </span>
                      <span className="text-[#E5A93C] group-hover:translate-x-1 transition-transform duration-200">
                        →
                      </span>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
