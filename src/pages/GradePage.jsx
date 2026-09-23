import { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Seo from '../components/Seo';
import CTABand from '../components/CTABand';
import NotFoundPage from './NotFoundPage';
import { scrollToContact, setEnquiryContext } from '../utils/navigation';
import { gradeBySlug, GRADE_DATA_NOTE } from '../data/grades';
import { products } from '../data/products';
import { MOQ } from '../data/specifications';
import {
  site,
  absoluteUrl,
  breadcrumbSchema,
  faqSchema,
  clamp,
  TITLE_MAX,
  DESCRIPTION_MAX,
  CATALOGUE_PUBLISHED,
  CATALOGUE_MODIFIED,
} from '../data/site';

/** Simple two-or-three column reference table. */
function RefTable({ title, columns, rows }) {
  return (
    <div className="overflow-x-auto rounded-tl-[20px] rounded-br-[20px] border border-gray-200">
      <table className="w-full min-w-[520px] text-left text-[14px]">
        <caption className="sr-only">{title}</caption>
        <thead className="bg-[#0A1828] text-white">
          <tr>
            {columns.map((c) => (
              <th key={c} scope="col" className="px-5 py-3 text-[11px] font-black uppercase tracking-widest">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={r[0]} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
              {r.map((cell, j) => (
                <td key={j} className={`px-5 py-3 ${j === 0 ? 'font-bold text-[#0A1828]' : 'text-gray-600'}`}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function GradePage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const grade = gradeBySlug(slug);

  /* Above the early return: hooks must run in the same order on every render. */
  useEffect(() => {
    if (!grade) return undefined;
    return setEnquiryContext({ productName: `${grade.name} enquiry` });
  }, [grade]);

  if (!grade) return <NotFoundPage />;

  const path = `/grades/${grade.slug}`;
  const available = products.filter((p) => grade.productIds.includes(p.id));

  const seoTitle = clamp(`${grade.shortName} Supplier in Mumbai`, TITLE_MAX);
  const seoDescription = clamp(
    `${grade.name} (UNS ${grade.uns}) from Ritvik Metal Impex, Mumbai. ${grade.summary}`,
    DESCRIPTION_MAX,
  );

  /*
   * No Product schema here: this page describes a material grade, not a single
   * purchasable item, and a Product node without an offer or a specific SKU
   * would be asserting something the page does not show. TechArticle plus an
   * FAQPage matches what the page actually is.
   */
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: clamp(`${grade.name} — Composition, Properties & Standards`, 110),
    description: clamp(grade.summary, 250),
    inLanguage: site.language,
    datePublished: CATALOGUE_PUBLISHED,
    dateModified: CATALOGUE_MODIFIED,
    author: { '@type': 'Organization', name: site.name },
    publisher: { '@id': `${site.url}/#organization` },
    mainEntityOfPage: { '@type': 'WebPage', '@id': absoluteUrl(path) },
    about: { '@type': 'Thing', name: grade.name, alternateName: `UNS ${grade.uns}` },
  };

  const crumbs = breadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Grades', path: '/grades' },
    { name: grade.shortName, path },
  ]);

  return (
    <>
      <Seo
        title={seoTitle}
        description={seoDescription}
        keywords={`${grade.shortName}, ${grade.name}, ${grade.shortName} supplier, ${grade.shortName} stockist Mumbai, ${grade.shortName} exporter India, UNS ${grade.uns}, ${grade.shortName} properties, ${grade.shortName} composition`}
        path={path}
        type="article"
        schema={[articleSchema, crumbs, faqSchema(grade.faqs)]}
      />

      <section className="bg-white px-6 py-16 lg:px-16">
        <div className="mx-auto max-w-[1100px]">
          <nav aria-label="breadcrumb" className="mb-10 flex items-center gap-2 text-sm text-gray-400">
            <Link to="/" className="hover:text-[#E5A93C]">Home</Link><span>/</span>
            <Link to="/grades" className="hover:text-[#E5A93C]">Grades</Link><span>/</span>
            <span className="font-semibold text-[#0A1828]">{grade.shortName}</span>
          </nav>

          <span className="text-[11px] font-black uppercase tracking-[0.3em] text-[#E5A93C]">
            {grade.family}
          </span>
          <h1 className="mt-3 text-4xl font-black uppercase leading-tight text-[#0A1828] lg:text-5xl">
            {grade.name}
            <span className="sr-only"> supplier, stockist and exporter in Mumbai, India</span>
          </h1>
          <p className="mt-3 text-[15px] font-semibold text-gray-500">
            UNS {grade.uns} · {grade.tagline}
          </p>
          <div className="mt-6 mb-6 h-[2px] w-16 bg-[#E5A93C]" />
          <p className="max-w-3xl text-[17px] leading-relaxed text-gray-600">{grade.summary}</p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <button
              onClick={() => scrollToContact(navigate, path, { productName: `${grade.name} enquiry` })}
              className="bg-[#0A1828] px-8 py-4 font-bold uppercase tracking-widest text-white transition-colors hover:bg-[#1A3A5C]"
            >
              Request a Quote
            </button>
            <a
              href={`https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(`Hi, I need a quotation for ${grade.name}. My requirement is:`)}`}
              target="_blank" rel="noreferrer"
              className="border border-gray-300 px-8 py-4 text-center font-bold uppercase tracking-widest text-[#0A1828] transition-colors hover:border-[#0A1828]"
            >
              Ask on WhatsApp
            </a>
          </div>

          <section className="mt-16">
            <h2 className="text-2xl font-black uppercase text-[#0A1828]">When to specify {grade.shortName}</h2>
            <p className="mt-4 max-w-3xl text-[16px] leading-relaxed text-gray-600">{grade.whenToUse}</p>
          </section>

          <section className="mt-16">
            <h2 className="text-2xl font-black uppercase text-[#0A1828]">Chemical Composition (%)</h2>
            <p className="mt-2 mb-5 text-[13px] text-gray-500">{GRADE_DATA_NOTE}</p>
            <RefTable title={`${grade.name} chemical composition`} {...grade.chemistry} />
          </section>

          <section className="mt-16">
            <h2 className="text-2xl font-black uppercase text-[#0A1828]">Mechanical & Physical Properties</h2>
            <div className="mt-5">
              <RefTable title={`${grade.name} mechanical properties`} {...grade.mechanical} />
            </div>
          </section>

          <section className="mt-16">
            <h2 className="text-2xl font-black uppercase text-[#0A1828]">Governing Standards</h2>
            <div className="mt-5">
              <RefTable title={`${grade.name} standards`} columns={['Standard', 'Covers']} rows={grade.standards} />
            </div>
          </section>

          <section className="mt-16">
            <h2 className="text-2xl font-black uppercase text-[#0A1828]">Equivalent Designations</h2>
            <div className="mt-5">
              <RefTable title={`${grade.name} equivalents`} columns={['Standard', 'Designation']} rows={grade.equivalents} />
            </div>
          </section>

          <div className="mt-16 grid gap-10 md:grid-cols-2">
            <section>
              <h2 className="text-2xl font-black uppercase text-[#0A1828]">Typical Applications</h2>
              <ul className="mt-5 space-y-2">
                {grade.applications.map((a) => (
                  <li key={a} className="flex gap-3 text-[15px] text-gray-600">
                    <span aria-hidden="true" className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#E5A93C]" />
                    {a}
                  </li>
                ))}
              </ul>
            </section>
            <section>
              <h2 className="text-2xl font-black uppercase text-[#0A1828]">Industries Served</h2>
              <ul className="mt-5 flex flex-wrap gap-2">
                {grade.industries.map((i) => (
                  <li key={i} className="rounded-full border border-gray-200 px-4 py-2 text-[13px] font-semibold text-gray-600">
                    {i}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* The commercial payload: which of our products this grade comes in. */}
          <section className="mt-16">
            <h2 className="text-2xl font-black uppercase text-[#0A1828]">
              {grade.shortName} Products We Supply
            </h2>
            <p className="mt-3 text-[15px] text-gray-600">
              Available in the forms below, minimum order quantity {MOQ}, with a mill
              test certificate to EN 10204 3.1 traceable to the heat number.
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {available.map((p) => (
                <li key={p.id}>
                  <Link
                    to={`/products/${p.id}`}
                    className="group flex h-full items-center justify-between gap-3 rounded-tl-[18px] rounded-br-[18px] border border-gray-200 px-5 py-4 transition-colors hover:border-[#E5A93C]"
                  >
                    <span className="text-[14px] font-bold text-[#0A1828]">
                      {grade.shortName} {p.name}
                    </span>
                    <span className="text-[#E5A93C] transition-transform group-hover:translate-x-1">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-16">
            <h2 className="text-2xl font-black uppercase text-[#0A1828]">
              {grade.shortName} — Frequently Asked Questions
            </h2>
            <dl className="mt-6 space-y-6">
              {grade.faqs.map((f) => (
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
        eyebrow={`${grade.shortName} Enquiry`}
        title={`Send your ${grade.shortName} requirement`}
        body={`Tell us the form, size, quantity and standard and our technical team will confirm stock and send a firm price. Minimum order quantity ${MOQ}, mill test certificates supplied as standard.`}
        whatsappMessage={`Hi, I need a quotation for ${grade.name}. My requirement is:`}
      />
    </>
  );
}
