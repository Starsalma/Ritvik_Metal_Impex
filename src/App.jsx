import React from 'react';
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

import AboutPage from './components/AboutPage';
import ProductsPage from './pages/ProductsPage';

function HomePage() {
  return (
    <>
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
      <Navbar />

      <div className="overflow-x-hidden flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/products" element={<ProductsPage />} />
        </Routes>
      </div>

      <Footer />
      <FloatingButtons />
    </div>
  );
}
