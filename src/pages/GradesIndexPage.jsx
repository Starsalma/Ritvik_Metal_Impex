import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import CTABand from '../components/CTABand';
import { grades } from '../data/grades';
import { site, absoluteUrl, breadcrumbSchema } from '../data/site';

/**
 * Hub for the grade pages.
 *
 * Without this the grade pages would be reachable only from product pages and
 * the sitemap, which puts them three clicks deep. It also gives the navigation
 * one honest place to send a buyer who is shopping by material rather than by
 * form.
 */
export default function GradesIndexPage() {
  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Material grades supplied by Ritvik Metal Impex',
    itemListElement: grades.map((g, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: g.name,
      url: absoluteUrl(`/grades/${g.slug}`),
    })),
  };

  return (
    <>
      <Seo
        title="Material Grades We Stock"
        description="Stainless steel 304 and 316, Duplex 2205, Inconel and Monel supplied from Mumbai as pipe, fittings, flanges, bars and fasteners. Composition, properties and standards for each grade."
        keywords="stainless steel grades supplier, ss 304 supplier, ss 316 supplier, duplex 2205 stockist, inconel supplier India, monel supplier Mumbai, alloy grades stockist"
        path="/grades"
        schema={[itemList, breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Grades', path: '/grades' }])]}
      />

      <section className="bg-white px-6 py-16 lg:px-16">
        <div className="mx-auto max-w-[1100px]">
          <span className="text-[11px] font-black uppercase tracking-[0.3em] text-[#E5A93C]">
            Shop by Material
          </span>
          <h1 className="mt-3 text-4xl font-black uppercase leading-tight text-[#0A1828] lg:text-5xl">
            Material Grades We Stock
          </h1>
          <div className="mt-6 mb-6 h-[2px] w-16 bg-[#E5A93C]" />
          <p className="max-w-3xl text-[17px] leading-relaxed text-gray-600">
            Composition, mechanical properties, governing standards and equivalent
            designations for each grade we hold, with the product forms it is
            available in. Every consignment ships with a mill test certificate
            traceable to the heat number.
          </p>

          <ul className="mt-12 grid gap-6 md:grid-cols-2">
            {grades.map((g) => (
              <li key={g.slug}>
                <Link
                  to={`/grades/${g.slug}`}
                  className="group flex h-full flex-col rounded-tl-[30px] rounded-br-[30px] border border-gray-200 p-7 transition-colors hover:border-[#E5A93C]"
                >
                  <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#E5A93C]">
                    UNS {g.uns}
                  </span>
                  <h2 className="mt-2 text-xl font-black uppercase text-[#0A1828]">{g.name}</h2>
                  <p className="mt-1 text-[13px] font-semibold text-gray-400">{g.tagline}</p>
                  <p className="mt-4 flex-grow text-[14px] leading-relaxed text-gray-600">{g.summary}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.18em] text-[#0A1828]">
                    Specifications &amp; Availability
                    <span className="text-[#E5A93C] transition-transform group-hover:translate-x-1">→</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <p className="mt-10 text-[14px] text-gray-500">
            Need a grade not listed here? We source to requirement —{' '}
            <a href={`mailto:${site.contact.emails[0]}`} className="font-semibold text-[#0A1828] underline">
              send us the specification
            </a>{' '}
            and we will confirm availability and lead time.
          </p>
        </div>
      </section>

      <CTABand
        eyebrow="Grade Enquiry"
        title="Not sure which grade your service needs?"
        body="Send us the medium, temperature, pressure and any chloride content, and our technical team will recommend a grade and quote it — rather than selling you a more expensive alloy than the duty requires."
        whatsappMessage="Hi, I need help selecting the right grade for my application."
      />
    </>
  );
}
