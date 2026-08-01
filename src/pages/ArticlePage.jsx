import { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import Seo from '../components/Seo';
import { getArticle, articles } from '../data/articles';
import { products } from '../data/products';
import { site, absoluteUrl, breadcrumbSchema } from '../data/siteConfig';

const GOLD = '#E5A93C';
const NAVY = '#0A1828';

function Block({ block }) {
  switch (block.type) {
    case 'p':
      return <p className="text-gray-600 text-[16px] leading-[1.85] mb-5">{block.text}</p>;

    case 'list':
      return block.ordered ? (
        <ol className="mb-6 space-y-3 list-none counter-reset">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-4 text-gray-600 text-[15px] leading-[1.8]">
              <span
                className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-black mt-0.5"
                style={{ background: NAVY, color: GOLD }}
              >
                {i + 1}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ol>
      ) : (
        <ul className="mb-6 space-y-3">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3 text-gray-600 text-[15px] leading-[1.8]">
              <span className="shrink-0 mt-[10px] w-1.5 h-1.5 rounded-full" style={{ background: GOLD }} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );

    case 'table':
      return (
        <figure className="mb-8">
          <div className="overflow-x-auto rounded-tl-[20px] rounded-br-[20px] border border-gray-200">
            <table className="w-full min-w-[560px] text-left border-collapse">
              <thead>
                <tr style={{ background: NAVY }}>
                  {block.headers.map((h) => (
                    <th
                      key={h}
                      scope="col"
                      className="text-white text-[11px] font-black uppercase tracking-[0.12em] px-5 py-4 whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row, i) => (
                  <tr key={i} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                    {row.map((cell, j) => (
                      <td
                        key={j}
                        className={`px-5 py-3.5 text-[14px] border-t border-gray-100 ${
                          j === 0 ? 'font-bold text-[#0A1828]' : 'text-gray-600'
                        }`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {block.caption && (
            <figcaption className="text-[12px] text-gray-400 mt-3 italic">{block.caption}</figcaption>
          )}
        </figure>
      );

    case 'callout':
      return (
        <aside className="mb-8 bg-[#F8F9FA] border-l-4 p-7 rounded-r-2xl" style={{ borderColor: GOLD }}>
          <p className="text-[13px] font-black uppercase tracking-[0.12em] mb-2" style={{ color: NAVY }}>
            {block.title}
          </p>
          <p className="text-gray-600 text-[15px] leading-[1.8]">{block.text}</p>
        </aside>
      );

    case 'quote':
      return (
        <blockquote className="mb-8 pl-6 border-l-2 italic text-[17px] text-gray-500 leading-relaxed" style={{ borderColor: GOLD }}>
          {block.text}
        </blockquote>
      );

    default:
      return null;
  }
}

function Faq({ faq, index }) {
  const [open, setOpen] = useState(index === 0);
  return (
    <div className="border border-gray-200 rounded-tl-[20px] rounded-br-[20px] overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="w-full text-left px-6 py-5 flex items-start justify-between gap-4 hover:bg-gray-50 transition-colors"
      >
        <span className="text-[15px] font-black uppercase leading-snug" style={{ color: NAVY }}>
          {faq.q}
        </span>
        <span
          className="shrink-0 text-xl leading-none transition-transform duration-300"
          style={{ color: GOLD, transform: open ? 'rotate(45deg)' : 'none' }}
        >
          +
        </span>
      </button>
      {open && <p className="px-6 pb-6 text-gray-600 text-[15px] leading-[1.8]">{faq.a}</p>}
    </div>
  );
}

export default function ArticlePage() {
  const { slug } = useParams();
  const article = getArticle(slug);

  if (!article) return <Navigate to="/blog" replace />;

  const related = products.filter((p) => article.relatedProducts?.includes(p.slug));
  const moreArticles = articles.filter((a) => a.slug !== article.slug).slice(0, 3);

  const url = `/blog/${article.slug}`;
  const wordCount = article.sections.reduce(
    (n, s) =>
      n +
      s.blocks.reduce((m, b) => {
        if (b.type === 'p' || b.type === 'quote') return m + b.text.split(/\s+/).length;
        if (b.type === 'callout') return m + b.text.split(/\s+/).length;
        if (b.type === 'list') return m + b.items.join(' ').split(/\s+/).length;
        return m;
      }, 0),
    article.intro.split(/\s+/).length,
  );

  const schema = [
    {
      '@type': 'Article',
      '@id': `${absoluteUrl(url)}#article`,
      headline: article.title,
      description: article.metaDescription,
      image: absoluteUrl(article.image),
      articleSection: article.category,
      wordCount,
      datePublished: article.publishedAt,
      dateModified: article.updatedAt,
      inLanguage: 'en-IN',
      author: { '@id': `${site.url}/#organization` },
      publisher: { '@id': `${site.url}/#organization` },
      mainEntityOfPage: { '@type': 'WebPage', '@id': absoluteUrl(url) },
      about: related.map((p) => ({ '@type': 'Product', name: p.name })),
    },
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Knowledge Hub', path: '/blog' },
      { name: article.title, path: url },
    ]),
    {
      '@type': 'FAQPage',
      '@id': `${absoluteUrl(url)}#faq`,
      mainEntity: article.faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ];

  const published = new Date(article.publishedAt).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <>
      <Seo
        title={article.metaTitle}
        description={article.metaDescription}
        keywords={article.keywords}
        path={url}
        image={article.image}
        type="article"
        schema={schema}
        publishedTime={article.publishedAt}
        modifiedTime={article.updatedAt}
      />

      <article className="bg-white">
        {/* Hero */}
        <header className="relative bg-[#0A1828] text-white">
          <img
            src={article.image}
            alt={article.title}
            className="absolute inset-0 w-full h-full object-cover opacity-25"
            loading="eager"
            fetchPriority="high"
          />
          <div className="relative max-w-[860px] mx-auto px-6 lg:px-0 py-20 lg:py-28">
            <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-[12px] text-gray-400 mb-8">
              <Link to="/" className="hover:text-[#E5A93C]">Home</Link>
              <span>/</span>
              <Link to="/blog" className="hover:text-[#E5A93C]">Knowledge Hub</Link>
              <span>/</span>
              <span className="text-gray-200">{article.category}</span>
            </nav>

            <span className="text-[11px] font-black tracking-[0.3em] uppercase" style={{ color: GOLD }}>
              {article.category}
            </span>
            <h1 className="text-[32px] sm:text-[42px] lg:text-[52px] font-black uppercase leading-[1.08] mt-4">
              {article.title}
            </h1>
            <div className="w-16 h-[2px] mt-7 mb-7" style={{ background: GOLD }} />
            <p className="text-gray-300 text-[17px] leading-relaxed max-w-2xl">{article.excerpt}</p>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-8 text-[12px] font-bold tracking-wider uppercase text-gray-400">
              <span>By {site.name}</span>
              <span className="hidden sm:inline">·</span>
              <time dateTime={article.publishedAt}>{published}</time>
              <span className="hidden sm:inline">·</span>
              <span>{article.readTime} min read</span>
            </div>
          </div>
        </header>

        <div className="max-w-[1180px] mx-auto px-6 lg:px-10 py-16 lg:py-20 grid lg:grid-cols-[1fr_280px] gap-14">
          {/* Body */}
          <div className="max-w-[720px]">
            <p className="text-[19px] leading-[1.8] text-gray-700 font-medium mb-12 pb-10 border-b border-gray-100">
              {article.intro}
            </p>

            {article.sections.map((section) => (
              <section key={section.id} id={section.id} className="mb-14 scroll-mt-36">
                <h2 className="text-[24px] lg:text-[28px] font-black uppercase leading-tight mb-6" style={{ color: NAVY }}>
                  {section.heading}
                </h2>
                {section.blocks.map((block, i) => (
                  <Block key={i} block={block} />
                ))}
              </section>
            ))}

            {/* FAQ */}
            <section id="faq" className="mb-14 scroll-mt-36">
              <h2 className="text-[24px] lg:text-[28px] font-black uppercase leading-tight mb-3" style={{ color: NAVY }}>
                Frequently Asked Questions
              </h2>
              <div className="w-16 h-[2px] mb-8" style={{ background: GOLD }} />
              <div className="space-y-4">
                {article.faqs.map((faq, i) => (
                  <Faq key={faq.q} faq={faq} index={i} />
                ))}
              </div>
            </section>

            {/* CTA */}
            <section className="bg-[#0A1828] rounded-tl-[32px] rounded-br-[32px] p-8 lg:p-10">
              <h2 className="text-white text-[20px] font-black uppercase leading-tight">
                Need this material with certification?
              </h2>
              <p className="text-gray-400 mt-3 text-[15px] leading-relaxed">
                {site.name} supplies the full ferrous and non-ferrous range from Mumbai with Mill Test
                Certificates, third-party inspection support and dispatch across India and export markets.
                Send us your specification and we will quote against it.
              </p>
              <div className="flex flex-wrap gap-4 mt-7">
                <a
                  href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
                    `Hi, I read your guide "${article.title}" and would like a quotation.`,
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-8 py-3.5 uppercase font-black text-[11px] tracking-widest transition-colors"
                  style={{ background: GOLD, color: NAVY }}
                >
                  WhatsApp Enquiry
                </a>
                <Link
                  to="/products"
                  className="border border-white/30 text-white px-8 py-3.5 uppercase font-black text-[11px] tracking-widest hover:border-white transition-colors"
                >
                  Browse Products
                </Link>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-36 lg:self-start space-y-10">
            <nav aria-label="On this page">
              <p className="text-[11px] font-black uppercase tracking-[0.2em] mb-4" style={{ color: NAVY }}>
                On this page
              </p>
              <ul className="space-y-3 border-l border-gray-200 pl-4">
                {article.sections.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="text-[13px] text-gray-500 hover:text-[#E5A93C] leading-snug block transition-colors"
                    >
                      {s.heading}
                    </a>
                  </li>
                ))}
                <li>
                  <a href="#faq" className="text-[13px] text-gray-500 hover:text-[#E5A93C] leading-snug block transition-colors">
                    Frequently Asked Questions
                  </a>
                </li>
              </ul>
            </nav>

            {related.length > 0 && (
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.2em] mb-4" style={{ color: NAVY }}>
                  Related products
                </p>
                <ul className="space-y-3">
                  {related.map((p) => (
                    <li key={p.slug}>
                      <Link
                        to={`/products/${p.slug}`}
                        className="flex items-center gap-3 group"
                      >
                        <img
                          src={p.image}
                          alt={`${p.material} ${p.name} supplied by ${site.name}`}
                          className="w-12 h-12 object-cover rounded-lg shrink-0 bg-gray-100"
                          loading="lazy"
                          decoding="async"
                        />
                        <span className="text-[13px] font-bold text-gray-600 group-hover:text-[#E5A93C] leading-tight transition-colors">
                          {p.name}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>

        {/* More reading */}
        {moreArticles.length > 0 && (
          <section className="border-t border-gray-100 bg-gray-50 py-16 px-6 lg:px-16">
            <div className="max-w-[1180px] mx-auto">
              <h2 className="text-[22px] font-black uppercase mb-8" style={{ color: NAVY }}>
                Continue reading
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {moreArticles.map((a) => (
                  <Link
                    key={a.slug}
                    to={`/blog/${a.slug}`}
                    className="group bg-white rounded-tl-[28px] rounded-br-[28px] overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-shadow"
                  >
                    <div className="h-[150px] overflow-hidden bg-gray-100">
                      <img
                        src={a.image}
                        alt={a.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="p-6">
                      <span className="text-[10px] font-black tracking-[0.2em] uppercase" style={{ color: GOLD }}>
                        {a.category}
                      </span>
                      <h3 className="text-[15px] font-black uppercase mt-2 leading-tight" style={{ color: NAVY }}>
                        {a.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </article>
    </>
  );
}
