import { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Seo from '../components/Seo';
import SpecTables from '../components/SpecTables';
import CTABand from '../components/CTABand';
import NotFoundPage from './NotFoundPage';
import { scrollToContact, setEnquiryContext } from '../utils/navigation';
import { gradeFormBy, formsForGrade } from '../data/gradeForms';
import { getSpecTables, MOQ } from '../data/specifications';
import { GRADE_DATA_NOTE } from '../data/grades';
import {
  site, absoluteUrl, breadcrumbSchema, faqSchema, clamp,
  TITLE_MAX, DESCRIPTION_MAX, CATALOGUE_PUBLISHED, CATALOGUE_MODIFIED,
} from '../data/site';

function Table({ columns, rows }) {
  return (
    <div className="overflow-x-auto rounded-tl-[20px] rounded-br-[20px] border border-gray-200">
      <table className="w-full min-w-[480px] text-left text-[14px]">
        <thead className="bg-[#0A1828] text-white">
          <tr>{columns.map((c) => (
            <th key={c} scope="col" className="px-5 py-3 text-[11px] font-black uppercase tracking-widest">{c}</th>
          ))}</tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={r[0]} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
              {r.map((cell, j) => (
                <td key={j} className={`px-5 py-3 ${j === 0 ? 'font-bold text-[#0A1828]' : 'text-gray-600'}`}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function GradeFormPage() {
  const { slug, form } = useParams();
  const navigate = useNavigate();
  const combo = gradeFormBy(slug, form);

  useEffect(() => {
    if (!combo) return undefined;
    return setEnquiryContext({ productName: `${combo.title} enquiry` });
  }, [combo]);

  if (!combo) return <NotFoundPage />;

  const { grade, items, standards, label, singular, path, title } = combo;
  const siblings = formsForGrade(grade.slug).filter((c) => c.slug !== combo.slug);

  /*
   * Specification tables are keyed by material and form, so the same shared
   * data that drives the product pages carries the dimensional detail here.
   * That is what keeps these pages substantive rather than a template fill.
   */
  const specTables = getSpecTables(items[0]);

  const seoTitle = clamp(`${title} Supplier in Mumbai`, TITLE_MAX);
  const seoDescription = clamp(
    `${grade.name} ${label.toLowerCase()} to ${standards.map((s) => s[0]).join(' and ')}, supplied from Mumbai. ${grade.tagline}. MOQ ${MOQ}, mill test certificate with every consignment.`,
    DESCRIPTION_MAX,
  );

  /* Two grade FAQs, so the page carries selection guidance without duplicating
   * the whole grade page. */
  const faqs = grade.faqs.slice(0, 2);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: clamp(`${title} — Standards, Specification & Availability`, 110),
    description: clamp(seoDescription, 250),
    inLanguage: site.language,
    datePublished: CATALOGUE_PUBLISHED,
    dateModified: CATALOGUE_MODIFIED,
    author: { '@type': 'Organization', name: site.name },
    publisher: { '@id': `${site.url}/#organization` },
    mainEntityOfPage: { '@type': 'WebPage', '@id': absoluteUrl(path) },
    about: { '@type': 'Thing', name: title, alternateName: `UNS ${grade.uns} ${label}` },
  };

  const crumbs = breadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Grades', path: '/grades' },
    { name: grade.shortName, path: `/grades/${grade.slug}` },
    { name: label, path },
  ]);

  return (
    <>
      <Seo
        title={seoTitle}
        description={seoDescription}
        path={path}
        type="article"
        schema={[articleSchema, crumbs, faqSchema(faqs)]}
      />

      <section className="bg-white px-6 py-16 lg:px-16">
        <div className="mx-auto max-w-[1100px]">
          <nav aria-label="breadcrumb" className="mb-10 flex flex-wrap items-center gap-2 text-sm text-gray-400">
            <Link to="/" className="hover:text-[#E5A93C]">Home</Link><span>/</span>
            <Link to="/grades" className="hover:text-[#E5A93C]">Grades</Link><span>/</span>
            <Link to={`/grades/${grade.slug}`} className="hover:text-[#E5A93C]">{grade.shortName}</Link><span>/</span>
            <span className="font-semibold text-[#0A1828]">{label}</span>
          </nav>

          <span className="text-[11px] font-black uppercase tracking-[0.3em] text-[#E5A93C]">
            UNS {grade.uns} · {grade.family}
          </span>
          <h1 className="mt-3 text-4xl font-black uppercase leading-tight text-[#0A1828] lg:text-5xl">{title}</h1>
          <div className="mt-6 mb-6 h-[2px] w-16 bg-[#E5A93C]" />

          <p className="max-w-3xl text-[17px] leading-relaxed text-gray-600">
            {grade.name} {label.toLowerCase()} supplied to{' '}
            {standards.map((s) => s[0]).join(' and ')} from our Mumbai stockyard.
            {' '}{grade.summary}
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <button
              onClick={() => scrollToContact(navigate, path, { productName: `${title} enquiry` })}
              className="bg-[#0A1828] px-8 py-4 font-bold uppercase tracking-widest text-white transition-colors hover:bg-[#1A3A5C]"
            >
              Get a Quote
            </button>
            <a
              href={`https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(`Hi, I need a quotation for ${title}. My requirement is:`)}`}
              target="_blank" rel="noreferrer"
              className="border border-gray-300 px-8 py-4 text-center font-bold uppercase tracking-widest text-[#0A1828] transition-colors hover:border-[#0A1828]"
            >
              Ask on WhatsApp
            </a>
          </div>

          {/* The unique technical payload for this pairing. */}
          <section className="mt-16">
            <h2 className="text-2xl font-black uppercase text-[#0A1828]">
              Governing Standards for {title}
            </h2>
            <p className="mt-2 mb-5 text-[14px] text-gray-500">
              State the standard on your enquiry and we will confirm stock against it.
            </p>
            <Table columns={['Standard', 'Covers']} rows={standards} />
          </section>

          <section className="mt-16">
            <h2 className="text-2xl font-black uppercase text-[#0A1828]">
              {grade.shortName} Chemical Composition (%)
            </h2>
            <p className="mt-2 mb-5 text-[13px] text-gray-500">{GRADE_DATA_NOTE}</p>
            <Table {...grade.chemistry} />
          </section>

          {specTables.length > 0 && (
            <div className="mt-16">
              <SpecTables tables={specTables} productName={title} />
            </div>
          )}

          <section className="mt-16">
            <h2 className="text-2xl font-black uppercase text-[#0A1828]">
              When to specify {grade.shortName} for {singular} work
            </h2>
            <p className="mt-4 max-w-3xl text-[16px] leading-relaxed text-gray-600">{grade.whenToUse}</p>
          </section>

          <section className="mt-16">
            <h2 className="text-2xl font-black uppercase text-[#0A1828]">Products in this range</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {items.map((p) => (
                <li key={p.id}>
                  <Link to={`/products/${p.id}`} className="group flex items-center justify-between gap-3 rounded-tl-[18px] rounded-br-[18px] border border-gray-200 px-5 py-4 transition-colors hover:border-[#E5A93C]">
                    <span className="text-[14px] font-bold text-[#0A1828]">{grade.shortName} {p.name}</span>
                    <span className="text-[#E5A93C] transition-transform group-hover:translate-x-1">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {siblings.length > 0 && (
            <section className="mt-16">
              <h2 className="text-2xl font-black uppercase text-[#0A1828]">
                {grade.shortName} in other forms
              </h2>
              <ul className="mt-6 flex flex-wrap gap-3">
                {siblings.map((c) => (
                  <li key={c.path}>
                    <Link to={c.path} className="inline-block rounded-full border border-gray-200 px-5 py-2.5 text-[13px] font-semibold text-gray-600 transition-colors hover:border-[#E5A93C] hover:text-[#0A1828]">
                      {c.title}
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-[14px] text-gray-500">
                Full composition, properties and equivalents on the{' '}
                <Link to={`/grades/${grade.slug}`} className="font-semibold text-[#0A1828] underline underline-offset-2">
                  {grade.name} grade page
                </Link>.
              </p>
            </section>
          )}

          <section className="mt-16">
            <h2 className="text-2xl font-black uppercase text-[#0A1828]">Frequently Asked Questions</h2>
            <dl className="mt-6 space-y-6">
              {faqs.map((f) => (
                <div key={f.question} className="rounded-tl-[20px] rounded-br-[20px] border border-gray-100 bg-gray-50 p-6">
                  <dt className="text-[16px] font-black text-[#0A1828]">{f.question}</dt>
                  <dd className="mt-2 text-[15px] leading-relaxed text-gray-600">{f.answer}</dd>
                </div>
              ))}
            </dl>
          </section>
        </div>
      </section>

      <CTABand
        eyebrow={`${title} Enquiry`}
        title={`Send your ${title} requirement`}
        body={`Give us the size, schedule or thickness, quantity and standard and we will confirm stock and send a firm price. Minimum order quantity ${MOQ}, mill test certificate to EN 10204 3.1 with every consignment.`}
        whatsappMessage={`Hi, I need a quotation for ${title}. My requirement is:`}
      />
    </>
  );
}
