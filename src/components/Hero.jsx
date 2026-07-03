import React, { useEffect, useState, useRef } from 'react';

const heroImages = [
  '/images/hero1.jpeg',
  '/images/hero2.jpeg',
  '/images/hero3.jpeg',
  '/images/hero4.jpeg',
];

const typingTexts = [
  'QUALITY METALS',
  'PREMIUM STEEL',
  'TRUSTED SUPPLY',
  'GLOBAL GRADES',
];

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  // Carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroImages.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  // Typing animation
  useEffect(() => {
    const currentText = typingTexts[textIndex];
    let timeout;

    if (!isDeleting && charIndex <= currentText.length) {
      setDisplayText(currentText.slice(0, charIndex));
      timeout = setTimeout(() => setCharIndex((c) => c + 1), 80);
    } else if (!isDeleting && charIndex > currentText.length) {
      timeout = setTimeout(() => setIsDeleting(true), 1800);
    } else if (isDeleting && charIndex >= 0) {
      setDisplayText(currentText.slice(0, charIndex));
      timeout = setTimeout(() => setCharIndex((c) => c - 1), 40);
    } else if (isDeleting && charIndex < 0) {
      setIsDeleting(false);
      setTextIndex((t) => (t + 1) % typingTexts.length);
      setCharIndex(0);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, textIndex]);

  return (
    <section className="relative w-full min-h-screen flex items-center overflow-hidden">

      {/* Background Carousel */}
      <div className="absolute inset-0 z-0">
        {heroImages.map((src, i) => (
          <img key={src} src={src} alt="Ritvik Metal Impex"
            className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1500"
            style={{ opacity: i === activeSlide ? 1 : 0 }} />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-[#020710]/92 via-[#020710]/70 to-[#020710]/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020710]/80 via-transparent to-transparent" />
      </div>

      {/* Carousel Dots */}
      <div className="absolute bottom-8 right-8 z-20 flex gap-2">
        {heroImages.map((_, i) => (
          <div key={i} onClick={() => setActiveSlide(i)}
            className="cursor-pointer transition-all duration-300 rounded-full"
            style={{
              width: i === activeSlide ? '24px' : '8px',
              height: '8px',
              background: i === activeSlide ? '#E5A93C' : 'rgba(255,255,255,0.4)',
              borderRadius: '4px'
            }} />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1440px] mx-auto w-full px-6 lg:px-16 py-24">
        <div className="max-w-2xl">

          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-6 animate-fade-in">
            <span className="text-[10px] font-black tracking-[0.3em] text-[#E5A93C] uppercase">Premium Metal Supplier</span>
            <div className="h-px w-10 bg-[#E5A93C]" />
          </div>

          {/* Headline with typing */}
          <h1 className="text-[36px] sm:text-[50px] lg:text-[64px] font-[900] tracking-tight text-white leading-[1.06] uppercase">
            YOUR RELIABLE<br />
            SOURCE FOR<br />
            <span className="text-[#E5A93C] inline-flex items-center gap-1">
              {displayText}
              <span className="inline-block w-[3px] h-[0.85em] bg-[#E5A93C] ml-1 animate-pulse" />
            </span>
          </h1>

          <div className="w-12 h-[2px] bg-[#E5A93C]/60 mt-7 mb-6" />

          <p className="text-gray-200 text-[14px] sm:text-[16px] font-medium leading-[1.8] max-w-lg">
            Leading supplier of premium Iron, Steel, Stainless Steel &amp; High Nickel Alloy products — delivering quality, trust and excellence across India and globally.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <button
              onClick={() => document.getElementById('contact-us')?.scrollIntoView({behavior:'smooth'})}
              className="group bg-[#E5A93C] text-[#0A1828] text-[11px] font-black tracking-[0.2em] px-8 py-[14px] uppercase flex items-center gap-4 cursor-pointer transition-all duration-200 hover:bg-[#d4982b]">
              <span>EXPLORE PRODUCTS</span>
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </button>
            <button
              onClick={() => document.getElementById('contact-us')?.scrollIntoView({behavior:'smooth'})}
              className="text-white text-[11px] font-black tracking-[0.2em] px-8 py-[14px] uppercase border border-white/40 cursor-pointer transition-all duration-200 hover:border-white hover:bg-white/10">
              CONTACT US
            </button>
          </div>

          {/* Company Info Strip */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-white/15 pt-8 max-w-2xl">
            <div>
              <h4 className="text-[11px] font-black tracking-[0.2em] text-[#E5A93C] uppercase mb-1">Company</h4>
              <p className="text-white text-[14px] font-bold">Ritvik Metal Impex</p>
              <p className="text-gray-300 text-[12px] leading-relaxed mt-1">Building no 16, 2nd floor, Patel Mansion, Kumbharwada, Mumbai - 400004</p>
            </div>
            <div>
              <h4 className="text-[11px] font-black tracking-[0.2em] text-[#E5A93C] uppercase mb-1">Get In Touch</h4>
              <p className="text-white text-[14px] font-bold">+91 7073895597</p>
              <p className="text-gray-300 text-[12px] mt-1">sales@ritvikmetal.com</p>
            </div>
            <div>
              <h4 className="text-[11px] font-black tracking-[0.2em] text-[#E5A93C] uppercase mb-1">What We Supply</h4>
              <p className="text-gray-300 text-[12px] leading-relaxed">Stainless Steel, Carbon Steel, Alloy Steel, Copper, Brass &amp; High Nickel Alloy products.</p>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
