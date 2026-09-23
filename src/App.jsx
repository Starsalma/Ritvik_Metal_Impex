<<<<<<< HEAD
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
=======
import { Routes, Route } from 'react-router-dom';
>>>>>>> 44a93c1066d3219f4c6feeec5dced53432d90914

import Navbar from './components/Navbar';
import Hero3D from './components/Hero3D';
import Showcase3D from './components/Showcase3D';
import StockyardGallery from './components/StockyardGallery';
import StatsBar from './components/StatsBar';
import AboutSection from './components/AboutSection';
import ProductsGrid from './components/ProductsGrid';
import IndustriesAndWhyChooseUs from './components/industry';
import TPISection from './components/ThirdParty';
import Footer from './components/Footer';
import ContactForm from './components/ContactForm';
import FloatingButtons from './components/FloatingButtons';
import ScrollToTop from './components/ScrollToTop';
import Seo from './components/Seo';
<<<<<<< HEAD
=======
import CTABand from './components/CTABand';
>>>>>>> 44a93c1066d3219f4c6feeec5dced53432d90914

/*
 * Routes are imported statically, not behind React.lazy.
 *
 * The split cost more than it saved. Every page is prerendered, so the browser
 * paints the full page immediately; React would then mount, find the route
 * chunk unresolved and replace that content with the Suspense spinner. The
 * document collapsed from 11,270px to 2,323px — <main> shrank to the
 * fallback's min-h-[70vh] — the footer jumped up, and it snapped back ~300ms
 * later. That measured 0.147 CLS on every product, article and grade page,
 * against Google's 0.1 "good" threshold.
 *
 * Awaiting the import before mounting does not fix it: React.lazy calls its
 * factory again on first render and suspends on that fresh promise regardless.
 *
 * And the split bought nothing. The entry bundle measures the same either way
 * (268 kB raw) because the heavy shared chunks — article, product and
 * specification data, plus Seo — are pulled in by the homepage anyway. Static
 * imports mean no spinner, no layout jump and no request waterfall.
 */
import AboutPage from './components/AboutPage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import BlogPage from './pages/BlogPage';
import ArticlePage from './pages/ArticlePage';
<<<<<<< HEAD

import { products } from './data/products';
import { articles } from './data/articles';
import { site, absoluteUrl, breadcrumbSchema } from './data/siteConfig';

function HomePage() {
  const schema = [
    {
      '@type': 'WebPage',
      '@id': `${site.url}/#webpage`,
      url: site.url,
      name: `${site.name} — ${site.tagline}`,
      description: site.description,
      isPartOf: { '@id': `${site.url}/#website` },
      about: { '@id': `${site.url}/#organization` },
      inLanguage: 'en-IN',
    },
    {
      '@type': 'ItemList',
      '@id': `${site.url}/#product-range`,
      name: 'Product range',
      numberOfItems: products.length,
      itemListElement: products.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: absoluteUrl(`/products/${p.slug}`),
        name: `${p.material} ${p.name}`,
      })),
    },
    {
      '@type': 'FAQPage',
      '@id': `${site.url}/#faq`,
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What products does Ritvik Metal Impex supply?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ritvik Metal Impex supplies ferrous and non-ferrous industrial metals: stainless steel pipes and tubes, buttweld and forged fittings, flanges, bends, bars, flats, sheets, plates and coils, valves, fasteners, ferrule and dairy fittings, electropolished fittings, alloy and nickel alloy products, plus copper tubes, copper wires, super enameled winding wire, brass tubes, brass rods and copper strips and profiles.',
          },
        },
        {
          '@type': 'Question',
          name: 'Where is Ritvik Metal Impex located?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: `${site.name} is based at ${site.address.street}, ${site.address.city} - ${site.address.postalCode}, ${site.address.region}, India, and supplies across India as well as export markets in the Middle East, Europe, South East Asia and the United States.`,
          },
        },
        {
          '@type': 'Question',
          name: 'Do you provide Mill Test Certificates and third-party inspection?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. All material is supplied with Mill Test Certificates traceable to the heat number, and EN 10204 3.1 or 3.2 certification is available. We support third-party inspection by agencies such as Bureau Veritas, TÜV, SGS and DNV, and can arrange IBR certification where required.',
          },
        },
        {
          '@type': 'Question',
          name: 'Do you export outside India?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. We export to the UAE, Saudi Arabia, Oman, Qatar, Kuwait, the United Kingdom, the United States, Singapore, Malaysia and Germany, alongside domestic supply to Mumbai, Pune, Ahmedabad, Delhi, Chennai, Hyderabad, Bengaluru and other industrial centres.',
          },
        },
      ],
    },
  ];
=======
import GradesIndexPage from './pages/GradesIndexPage';
import GradePage from './pages/GradePage';
import NotFoundPage from './pages/NotFoundPage';

import { products } from './data/products';
import { MOQ } from './data/specifications';
import { priceRanges, PRICE_AS_OF } from './data/pricing';
import {
  site,
  absoluteUrl,
  organizationSchema,
  localBusinessSchema,
  websiteSchema,
  faqSchema,
} from './data/site';

const PUBLISHES_PRICES = Object.values(priceRanges).some((r) => r.verified);

const homeFaqs = [
  {
    question: 'What products does Ritvik Metal Impex supply?',
    answer:
      'We supply ferrous and non-ferrous industrial metals: stainless steel, carbon steel, alloy steel, duplex and nickel alloy pipes and tubes, buttweld and forged fittings, flanges, sheets, plates and coils, round, square and hex bars, flats, fasteners, valves and dairy and electro-polished fittings, along with copper tubes, strips, profiles and wires, super enamelled copper wire, brass tubes and brass rods.',
  },
  {
    question: 'Where is Ritvik Metal Impex located?',
    answer: `We are based at ${site.address.street}, ${site.address.locality} - ${site.address.postalCode}, ${site.address.region}, India, and supply across India and to export markets including the UAE, Saudi Arabia, Qatar, Oman, the UK, the USA and South East Asia.`,
  },
  {
    question: 'Do you provide mill test certificates with your material?',
    answer:
      'Yes. Every consignment is supplied with a mill test certificate traceable to the heat number, typically to EN 10204 3.1. EN 10204 3.2 certification with third-party witness, IBR-certified material and additional testing such as PMI, IGC and impact testing can be arranged where the project requires it.',
  },
  {
    question: 'Which third-party inspection agencies do you work with?',
    answer:
      "We support inspection by agencies including Bureau Veritas, TÜV, DNV, SGS, Lloyd's Register, Intertek and RITES, as well as client and EPC in-house inspection by organisations such as L&T, NTPC, EIL and BHEL.",
  },
  {
    question: 'Do you export outside India?',
    answer:
      'Yes. We export to the Middle East, Europe, the United States, Africa and South East Asia, with export packing, documentation and marking arranged as required.',
  },
  {
    question: 'What is the minimum order quantity?',
    answer: `The minimum order quantity is ${MOQ}. Mixed sizes within the same grade can be combined to reach the minimum, so a trial order or a small maintenance requirement is welcome.`,
  },
  {
    question: 'How long does delivery take?',
    answer:
      'Items held in ready stock are dispatched within 1 to 3 working days. Material rolled or produced to order against a mill schedule typically takes 2 to 6 weeks depending on grade, size and quantity.',
  },
  {
    question: 'Do you publish prices?',
    /*
     * Answers whichever is actually true. Once a range in src/data/pricing.js is
     * marked verified the product pages start showing prices, and an FAQ still
     * saying "no" would contradict them — and contradictory answers on the same
     * page are exactly what an AI assistant surfaces back to a buyer.
     */
    answer: PUBLISHES_PRICES
      ? `We publish indicative ranges on our product pages, reviewed as of ${PRICE_AS_OF}. They are a guide only — industrial metal pricing moves with alloy surcharges and depends on grade, size, schedule and quantity, so send your specification and quantity and we reply with a firm quotation. The minimum order quantity is ${MOQ}.`
      : `No. Industrial metal pricing moves with alloy surcharges and depends on grade, size, schedule and quantity, so every enquiry is quoted individually. Send the specification and quantity and we reply with a firm price; the minimum order quantity is ${MOQ}.`,
  },
  {
    question: 'What certification is supplied with an order?',
    answer:
      'A mill test certificate to EN 10204 3.1, traceable to the heat number, is supplied as standard with every consignment. EN 10204 3.2 with a third-party witness, IBR Form III-A and III-C for steam service in India, and NACE MR0175 compliance for sour service can be arranged when stated at enquiry stage.',
  },
];

function HomePage() {
  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Industrial Metal Products — Ritvik Metal Impex',
    itemListElement: products.map((product, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: `${product.material} ${product.name}`,
      url: absoluteUrl(`/products/${product.id}`),
    })),
  };
>>>>>>> 44a93c1066d3219f4c6feeec5dced53432d90914

  return (
    <>
      <Seo
<<<<<<< HEAD
        title="Stainless Steel & Non-Ferrous Metal Supplier in Mumbai | Ritvik Metal Impex"
        description="Ritvik Metal Impex is a Mumbai-based supplier, stockist and exporter of stainless steel pipes, tubes, fittings, flanges, bars and sheets plus copper and brass products — with Mill Test Certificates, third-party inspection and ready stock."
        keywords="stainless steel supplier Mumbai, ss pipe supplier India, pipe fittings stockist Mumbai, flanges supplier India, copper tube supplier Mumbai, brass rod supplier, nickel alloy stockist India, metal exporter Mumbai, Ritvik Metal Impex"
        path="/"
        image="/images/hero1.jpeg"
        schema={schema}
      />
      <Hero />
=======
        title={site.defaultTitle}
        description={site.defaultDescription}
        keywords={site.defaultKeywords}
        path="/"
        image="/images/hero.jpeg"
        schema={[
          organizationSchema(),
          localBusinessSchema(),
          websiteSchema(),
          itemList,
          faqSchema(homeFaqs),
        ]}
      />
      <Hero3D />
>>>>>>> 44a93c1066d3219f4c6feeec5dced53432d90914
      <StatsBar />
      <Showcase3D />
      <AboutSection />
      <StockyardGallery />
      <ProductsGrid />
      <IndustriesAndWhyChooseUs />
      <TPISection />
      <CTABand
        eyebrow="Start an Enquiry"
        title="From a single flange to a full project line list"
        body="Share your requirement and our technical team will come back with grade options, stock availability and a firm price — backed by mill test certificates, IBR certification where required, and third-party inspection support."
        whatsappMessage="Hi, I would like to discuss a requirement with Ritvik Metal Impex."
      />
      <ContactForm />
    </>
  );
}

function AboutRoute() {
  return (
    <>
      <Seo
        title="About Us | Trusted Metal Stockist & Exporter in Mumbai — Ritvik Metal Impex"
        description="Ritvik Metal Impex supplies mill-tested ferrous and non-ferrous metals from Mumbai to projects across India and export markets. Learn about our stock range, quality process and inspection support."
        keywords="about Ritvik Metal Impex, metal stockist Mumbai, steel supplier company Maharashtra, industrial metal exporter India"
        path="/about"
        image="/images/about.jpg"
        schema={[
          {
            '@type': 'AboutPage',
            '@id': `${site.url}/about#webpage`,
            url: `${site.url}/about`,
            name: `About ${site.name}`,
            description: site.description,
            isPartOf: { '@id': `${site.url}/#website` },
            about: { '@id': `${site.url}/#organization` },
          },
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'About Us', path: '/about' },
          ]),
        ]}
      />
      <AboutPage />
    </>
  );
}

function NotFound() {
  return (
    <>
      <Seo
        title="Page Not Found | Ritvik Metal Impex"
        description="The page you requested could not be found. Browse our stainless steel, copper and brass product catalogue instead."
        path="/404"
        noindex
      />
      <section className="bg-white min-h-[60vh] flex items-center justify-center px-6 py-24">
        <div className="text-center max-w-lg">
          <p className="text-[#E5A93C] font-black tracking-[0.3em] uppercase text-sm">Error 404</p>
          <h1 className="text-4xl lg:text-5xl font-black text-[#0A1828] uppercase mt-4">Page Not Found</h1>
          <p className="text-gray-500 mt-6 leading-relaxed">
            That page does not exist. Try the product catalogue or the knowledge hub — {articles.length} technical
            buying guides covering grade selection, fittings, flanges and certification.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-10">
            <Link to="/products" className="bg-[#0A1828] text-white px-8 py-4 uppercase font-bold tracking-widest text-[11px]">
              Browse Products
            </Link>
            <Link to="/blog" className="border border-gray-300 text-[#0A1828] px-8 py-4 uppercase font-bold tracking-widest text-[11px] hover:border-[#0A1828] transition-colors">
              Knowledge Hub
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default function App() {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <ScrollToTop />
      <Navbar />
      <main className="overflow-x-hidden flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutRoute />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<ArticlePage />} />
<<<<<<< HEAD
          <Route path="*" element={<NotFound />} />
=======
          <Route path="/grades" element={<GradesIndexPage />} />
          <Route path="/grades/:slug" element={<GradePage />} />
          <Route path="*" element={<NotFoundPage />} />
>>>>>>> 44a93c1066d3219f4c6feeec5dced53432d90914
        </Routes>
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
}
