import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

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

  return (
    <>
      <Seo
        title="Stainless Steel & Non-Ferrous Metal Supplier in Mumbai | Ritvik Metal Impex"
        description="Ritvik Metal Impex is a Mumbai-based supplier, stockist and exporter of stainless steel pipes, tubes, fittings, flanges, bars and sheets plus copper and brass products — with Mill Test Certificates, third-party inspection and ready stock."
        keywords="stainless steel supplier Mumbai, ss pipe supplier India, pipe fittings stockist Mumbai, flanges supplier India, copper tube supplier Mumbai, brass rod supplier, nickel alloy stockist India, metal exporter Mumbai, Ritvik Metal Impex"
        path="/"
        image="/images/hero1.jpeg"
        schema={schema}
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
}
