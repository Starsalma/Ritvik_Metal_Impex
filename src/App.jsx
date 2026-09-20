import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

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
import CTABand from './components/CTABand';

/*
 * Route-level code splitting. The article and specification data is large and
 * only the homepage matters for the first paint, so everything below the
 * landing page loads on demand. This keeps the initial JS payload — and
 * therefore LCP — small on mobile connections.
 */
const AboutPage = lazy(() => import('./components/AboutPage'));
const ProductsPage = lazy(() => import('./pages/ProductsPage'));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const ArticlePage = lazy(() => import('./pages/ArticlePage'));
const GradesIndexPage = lazy(() => import('./pages/GradesIndexPage'));
const GradePage = lazy(() => import('./pages/GradePage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

/** Minimal, layout-stable fallback — avoids a CLS penalty while a chunk loads. */
function RouteFallback() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center" role="status" aria-live="polite">
      <span className="sr-only">Loading…</span>
      <span className="w-8 h-8 rounded-full border-2 border-gray-200 border-t-[#E5A93C] animate-spin" />
    </div>
  );
}

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

  return (
    <>
      <Seo
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

export default function App() {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <ScrollToTop />
      <Navbar />
      <main className="overflow-x-hidden flex-grow">
        <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<ArticlePage />} />
          <Route path="/grades" element={<GradesIndexPage />} />
          <Route path="/grades/:slug" element={<GradePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        </Suspense>
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
}
