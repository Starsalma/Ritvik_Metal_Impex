<<<<<<< HEAD
import { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import Seo from '../components/Seo';
import { getArticle, articles } from '../data/articles';
import { products } from '../data/products';
import { site, absoluteUrl, breadcrumbSchema } from '../data/siteConfig';

const GOLD = '#E5A93C';
const NAVY = '#0A1828';
=======
import { useParams, Link, useNavigate } from 'react-router-dom';
import Seo from '../components/Seo';
import { scrollToContact } from '../utils/navigation';
import RelatedLinks from '../components/RelatedLinks';
import CTABand from '../components/CTABand';
import { articles, getArticle } from '../data/articles';
import { articleLinkClusters } from '../data/internalLinks';
import { products } from '../data/products';
import { site, absoluteUrl, breadcrumbSchema, faqSchema } from '../data/site';

const formatDate = (iso) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });

/* ------------------------------------------------------------------ */
/* Block renderer                                                      */
/* ------------------------------------------------------------------ */
>>>>>>> 44a93c1066d3219f4c6feeec5dced53432d90914

function Block({ block }) {
  switch (block.type) {
    case 'p':
      return <p className="text-gray-600 text-[16px] leading-[1.85] mb-5">{block.text}</p>;

<<<<<<< HEAD
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
=======
    case 'ul':
      return (
        <ul className="mb-6 space-y-3">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3 text-gray-600 text-[15px] leading-[1.8]">
              <span className="text-[#E5A93C] font-black shrink-0 mt-[2px]">▸</span>
>>>>>>> 44a93c1066d3219f4c6feeec5dced53432d90914
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );

<<<<<<< HEAD
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
=======
    case 'ol':
      return (
        <ol className="mb-6 space-y-3">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-4 text-gray-600 text-[15px] leading-[1.8]">
              <span className="bg-[#0A1828] text-[#E5A93C] text-[11px] font-black w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-[3px]">
                {i + 1}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ol>
      );

    case 'table':
      return (
        <div className="mb-8 overflow-x-auto rounded-tl-[20px] rounded-br-[20px] border border-gray-200">
          <table className="w-full min-w-[560px] border-collapse text-left">
            <thead>
              <tr className="bg-[#0A1828]">
                {block.columns.map((col) => (
                  <th
                    key={col}
                    scope="col"
                    className="text-white text-[11px] font-black uppercase tracking-[0.12em] px-5 py-4"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, r) => (
                <tr key={r} className={r % 2 ? 'bg-gray-50' : 'bg-white'}>
                  {row.map((cell, c) => (
                    <td
                      key={c}
                      className={`px-5 py-4 text-[14px] leading-relaxed align-top border-t border-gray-100 ${
                        c === 0 ? 'font-bold text-[#0A1828]' : 'text-gray-600'
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
      );

    case 'note':
      return (
        <aside className="mb-8 bg-[#F8F9FA] border-l-4 border-[#E5A93C] p-6 rounded-r-2xl">
          <p className="text-[12px] font-black text-[#0A1828] uppercase tracking-[0.15em] mb-2">
>>>>>>> 44a93c1066d3219f4c6feeec5dced53432d90914
            {block.title}
          </p>
          <p className="text-gray-600 text-[15px] leading-[1.8]">{block.text}</p>
        </aside>
      );

<<<<<<< HEAD
    case 'quote':
      return (
        <blockquote className="mb-8 pl-6 border-l-2 italic text-[17px] text-gray-500 leading-relaxed" style={{ borderColor: GOLD }}>
          {block.text}
        </blockquote>
      );

=======
>>>>>>> 44a93c1066d3219f4c6feeec5dced53432d90914
    default:
      return null;
  }
}

<<<<<<< HEAD
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
=======
/* ------------------------------------------------------------------ */

export default function ArticlePage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const article = getArticle(slug);

  if (!article) {
    return (
      <>
        <Seo
          title="Article Not Found"
          description="The article you are looking for is not available."
          path={`/blog/${slug}`}
          noindex
        />
        <section className="bg-white min-h-screen flex items-center justify-center px-6">
          <div className="text-center">
            <h1 className="text-3xl font-black text-[#0A1828] uppercase">Article Not Found</h1>
            <p className="text-gray-500 mt-4">
              This guide doesn&apos;t exist or may have been moved.
            </p>
            <Link
              to="/blog"
              className="inline-block mt-8 bg-[#0A1828] text-white px-8 py-4 uppercase font-bold tracking-widest"
            >
              Back to Knowledge Hub
            </Link>
          </div>
        </section>
      </>
    );
  }

  const path = `/blog/${article.slug}`;
  const relatedProducts = products.filter((p) => article.relatedProductIds?.includes(p.id));
  const otherArticles = articles.filter((a) => a.slug !== article.slug).slice(0, 3);
  const linkClusters = articleLinkClusters(article);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: article.title,
    description: article.description,
    image: [absoluteUrl(article.image)],
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    inLanguage: site.language,
    articleSection: article.category,
    keywords: article.keywords,
    wordCount: article.sections.reduce(
      (total, section) =>
        total +
        section.blocks.reduce((sub, block) => {
          if (block.type === 'p' || block.type === 'note') return sub + (block.text || '').split(/\s+/).length;
          if (block.type === 'ul' || block.type === 'ol') return sub + block.items.join(' ').split(/\s+/).length;
          return sub;
        }, 0),
      0,
    ),
    author: { '@type': 'Organization', name: site.name, url: site.url },
    publisher: {
      '@type': 'Organization',
      name: site.name,
      logo: { '@type': 'ImageObject', url: site.logo },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': absoluteUrl(path) },
  };

  const crumbs = breadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Knowledge Hub', path: '/blog' },
    { name: article.title, path },
  ]);
>>>>>>> 44a93c1066d3219f4c6feeec5dced53432d90914

  return (
    <>
      <Seo
<<<<<<< HEAD
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
=======
        title={article.seoTitle}
        description={article.description}
        keywords={article.keywords}
        path={path}
        image={article.image}
        type="article"
        publishedTime={article.datePublished}
        modifiedTime={article.dateModified}
        author={site.name}
        schema={[articleSchema, crumbs, faqSchema(article.faqs)]}
      />

      <div className="bg-white">
        {/* ── Hero ─────────────────────────────────────────────── */}
        <header className="relative bg-[#0A1828] text-white overflow-hidden">
          <img
            src={article.image}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover opacity-20"
            loading="eager"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1828] via-[#0A1828]/85 to-[#0A1828]/70" />

          <div className="relative max-w-[900px] mx-auto px-6 lg:px-8 py-20 lg:py-24">
>>>>>>> 44a93c1066d3219f4c6feeec5dced53432d90914
            <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-[12px] text-gray-400 mb-8">
              <Link to="/" className="hover:text-[#E5A93C]">Home</Link>
              <span>/</span>
              <Link to="/blog" className="hover:text-[#E5A93C]">Knowledge Hub</Link>
              <span>/</span>
              <span className="text-gray-200">{article.category}</span>
            </nav>

<<<<<<< HEAD
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
=======
            <span className="text-[#E5A93C] text-[11px] font-black tracking-[0.28em] uppercase">
              {article.category}
            </span>

            <h1 className="text-[30px] sm:text-[40px] lg:text-[48px] font-black uppercase leading-[1.12] mt-4">
              {article.title}
            </h1>

            <div className="w-16 h-[2px] bg-[#E5A93C] mt-7 mb-6" />

            <p className="text-gray-300 text-[16px] sm:text-[17px] leading-[1.8] max-w-3xl">
              {article.intro}
            </p>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-8 text-[12px] font-bold tracking-wider text-gray-400 uppercase">
              <span>By {site.name}</span>
              <span className="text-gray-600">•</span>
              <time dateTime={article.datePublished}>{formatDate(article.datePublished)}</time>
              <span className="text-gray-600">•</span>
              <span>{article.readTime}</span>
>>>>>>> 44a93c1066d3219f4c6feeec5dced53432d90914
            </div>
          </div>
        </header>

<<<<<<< HEAD
        <div className="max-w-[1180px] mx-auto px-6 lg:px-10 py-16 lg:py-20 grid lg:grid-cols-[1fr_280px] gap-14">
          {/* Body */}
          <div className="max-w-[720px]">
            <p className="text-[19px] leading-[1.8] text-gray-700 font-medium mb-12 pb-10 border-b border-gray-100">
              {article.intro}
            </p>

            {article.sections.map((section) => (
              <section key={section.id} id={section.id} className="mb-14 scroll-mt-36">
                <h2 className="text-[24px] lg:text-[28px] font-black uppercase leading-tight mb-6" style={{ color: NAVY }}>
=======
        {/* ── Body ─────────────────────────────────────────────── */}
        <div className="max-w-[900px] mx-auto px-6 lg:px-8 py-16">
          {/* Key takeaways */}
          {article.takeaways?.length > 0 && (
            <section
              aria-labelledby="key-takeaways"
              className="bg-[#F8F9FA] border border-gray-200 rounded-tl-[32px] rounded-br-[32px] p-8 mb-14"
            >
              <h2
                id="key-takeaways"
                className="text-[14px] font-black text-[#0A1828] uppercase tracking-[0.18em] mb-5"
              >
                Key Takeaways
              </h2>
              <ul className="space-y-3">
                {article.takeaways.map((point, i) => (
                  <li key={i} className="flex gap-3 text-gray-600 text-[15px] leading-[1.75]">
                    <span className="text-[#E5A93C] font-black shrink-0">✓</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Table of contents */}
          <nav aria-labelledby="toc-heading" className="mb-14 border-l-2 border-gray-100 pl-6">
            <h2
              id="toc-heading"
              className="text-[12px] font-black text-gray-400 uppercase tracking-[0.22em] mb-4"
            >
              In This Guide
            </h2>
            <ol className="space-y-2">
              {article.sections.map((section, i) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="text-[15px] text-[#0A1828] font-semibold hover:text-[#E5A93C] transition-colors"
                  >
                    <span className="text-[#E5A93C] font-black mr-2">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {section.heading}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#faqs"
                  className="text-[15px] text-[#0A1828] font-semibold hover:text-[#E5A93C] transition-colors"
                >
                  <span className="text-[#E5A93C] font-black mr-2">FAQ</span>
                  Frequently Asked Questions
                </a>
              </li>
            </ol>
          </nav>

          {/* Sections */}
          <article>
            {article.sections.map((section) => (
              <section key={section.id} id={section.id} className="mb-14 scroll-mt-36">
                <h2 className="text-[24px] sm:text-[28px] font-black text-[#0A1828] uppercase leading-[1.2] mb-6">
>>>>>>> 44a93c1066d3219f4c6feeec5dced53432d90914
                  {section.heading}
                </h2>
                {section.blocks.map((block, i) => (
                  <Block key={i} block={block} />
                ))}
              </section>
            ))}
<<<<<<< HEAD

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
=======
          </article>

          {/* FAQs */}
          {article.faqs?.length > 0 && (
            <section id="faqs" className="mb-16 scroll-mt-36">
              <h2 className="text-[24px] sm:text-[28px] font-black text-[#0A1828] uppercase leading-[1.2] mb-8">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {article.faqs.map((faq, i) => (
                  <details
                    key={i}
                    className="group border border-gray-200 rounded-tl-[20px] rounded-br-[20px] overflow-hidden"
                    open={i === 0}
                  >
                    <summary className="cursor-pointer list-none px-6 py-5 flex items-start justify-between gap-4 bg-white hover:bg-gray-50 transition-colors">
                      <h3 className="text-[15px] font-black text-[#0A1828] leading-snug">
                        {faq.question}
                      </h3>
                      <span className="text-[#E5A93C] font-black text-xl leading-none shrink-0 group-open:rotate-45 transition-transform duration-200">
                        +
                      </span>
                    </summary>
                    <div className="px-6 pb-6 pt-1 border-t border-gray-100">
                      <p className="text-gray-600 text-[15px] leading-[1.8] pt-4">{faq.answer}</p>
                    </div>
                  </details>
                ))}
              </div>
            </section>
          )}

          {/* Related products — internal linking */}
          {relatedProducts.length > 0 && (
            <section className="mb-16">
              <h2 className="text-[20px] font-black text-[#0A1828] uppercase mb-2">
                Products Covered in This Guide
              </h2>
              <p className="text-gray-500 text-[14px] mb-7">
                Ritvik Metal Impex stocks and supplies every product referenced above.
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {relatedProducts.map((product) => (
                  <Link
                    key={product.id}
                    to={`/products/${product.id}`}
                    className="group border border-gray-200 rounded-tl-[24px] rounded-br-[24px] overflow-hidden hover:border-[#E5A93C] hover:shadow-lg transition-all"
                  >
                    <div className="h-[130px] bg-gray-100 overflow-hidden">
                      <img
                        src={product.image}
                        alt={`${product.material} ${product.name} supplier in Mumbai, India`}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                    <div className="p-4">
                      <span className="text-[#E5A93C] text-[10px] font-black tracking-[0.18em] uppercase">
                        {product.material}
                      </span>
                      <h3 className="text-[14px] font-black text-[#0A1828] uppercase mt-1 leading-tight">
                        {product.name}
>>>>>>> 44a93c1066d3219f4c6feeec5dced53432d90914
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
<<<<<<< HEAD
            </div>
          </section>
        )}
      </article>
=======
            </section>
          )}

          {/* CTA */}
          <section className="bg-[#0A1828] rounded-tl-[36px] rounded-br-[36px] p-8 lg:p-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-16">
            <div>
              <h2 className="text-white text-[20px] font-black uppercase leading-tight">
                Need help specifying the right grade?
              </h2>
              <p className="text-gray-400 mt-2 text-[14px] leading-relaxed max-w-xl">
                Share your drawing, line list or enquiry and our technical team will come back with
                grade options, stock availability and a firm price — with mill test certificates as
                standard.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <button
                onClick={() => scrollToContact(navigate)}
                className="bg-[#E5A93C] text-[#0A1828] px-7 py-3 uppercase font-black text-[11px] tracking-[0.15em] hover:bg-[#d4982b] transition-colors"
              >
                Request a Quote
              </button>
              <a
                href={`https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(
                  `Hi, I read your guide "${article.title}" and would like technical assistance.`,
                )}`}
                target="_blank"
                rel="noreferrer"
                className="border border-white/30 text-white px-7 py-3 uppercase font-black text-[11px] tracking-[0.15em] hover:border-white transition-colors"
              >
                WhatsApp Us
              </a>
            </div>
          </section>

          {/* More guides */}
          {otherArticles.length > 0 && (
            <section>
              <h2 className="text-[20px] font-black text-[#0A1828] uppercase mb-7">
                More Technical Guides
              </h2>
              <div className="grid sm:grid-cols-3 gap-5">
                {otherArticles.map((other) => (
                  <Link
                    key={other.slug}
                    to={`/blog/${other.slug}`}
                    className="group border border-gray-200 rounded-tl-[24px] rounded-br-[24px] p-5 hover:border-[#E5A93C] hover:shadow-lg transition-all"
                  >
                    <span className="text-[#E5A93C] text-[10px] font-black tracking-[0.18em] uppercase">
                      {other.category}
                    </span>
                    <h3 className="text-[14px] font-black text-[#0A1828] uppercase mt-2 leading-snug">
                      {other.title}
                    </h3>
                    <p className="text-gray-500 text-[12px] mt-3 leading-relaxed line-clamp-3">
                      {other.description}
                    </p>
                    <span className="inline-block mt-4 text-[11px] font-black tracking-[0.15em] text-[#0A1828] uppercase group-hover:text-[#E5A93C] transition-colors">
                      Read Guide →
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}
          <RelatedLinks clusters={linkClusters} title="Related Reading" className="mt-20" />
        </div>
      </div>

      <CTABand
        eyebrow="Talk to a Specialist"
        title="Specifying this for a live project?"
        body="Send us the line list, drawing or grade you are working to. We will confirm availability, suggest equivalents where it saves cost, and quote with full certification."
        primaryLabel="Request a Quote"
        whatsappMessage={`Hi, I read your guide "${article.title}" and would like technical assistance.`}
      />
>>>>>>> 44a93c1066d3219f4c6feeec5dced53432d90914
    </>
  );
}
