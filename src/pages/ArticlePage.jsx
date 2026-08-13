import { useParams, Link, useNavigate } from 'react-router-dom';
import Seo from '../components/Seo';
import { scrollToContact } from '../utils/navigation';
import { articles, getArticle } from '../data/articles';
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

function Block({ block }) {
  switch (block.type) {
    case 'p':
      return <p className="text-gray-600 text-[16px] leading-[1.85] mb-5">{block.text}</p>;

    case 'ul':
      return (
        <ul className="mb-6 space-y-3">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3 text-gray-600 text-[15px] leading-[1.8]">
              <span className="text-[#E5A93C] font-black shrink-0 mt-[2px]">▸</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );

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
            {block.title}
          </p>
          <p className="text-gray-600 text-[15px] leading-[1.8]">{block.text}</p>
        </aside>
      );

    default:
      return null;
  }
}

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

  return (
    <>
      <Seo
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
            <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-[12px] text-gray-400 mb-8">
              <Link to="/" className="hover:text-[#E5A93C]">Home</Link>
              <span>/</span>
              <Link to="/blog" className="hover:text-[#E5A93C]">Knowledge Hub</Link>
              <span>/</span>
              <span className="text-gray-200">{article.category}</span>
            </nav>

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
            </div>
          </div>
        </header>

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
                  {section.heading}
                </h2>
                {section.blocks.map((block, i) => (
                  <Block key={i} block={block} />
                ))}
              </section>
            ))}
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
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
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
        </div>
      </div>
    </>
  );
}
