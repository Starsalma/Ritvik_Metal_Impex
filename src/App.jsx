import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
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

import AboutPage from './components/AboutPage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import BlogPage from './pages/BlogPage';
import ArticlePage from './pages/ArticlePage';
import NotFoundPage from './pages/NotFoundPage';

import { products } from './data/products';
import {
  site,
  absoluteUrl,
  organizationSchema,
  localBusinessSchema,
  websiteSchema,
  faqSchema,
} from './data/site';

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
      <Hero />
      <StatsBar />
      <AboutSection />
      <ProductsGrid />
      <IndustriesAndWhyChooseUs />
      <TPISection />
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
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<ArticlePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
}
