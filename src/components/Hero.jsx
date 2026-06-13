import React, { useEffect, useState } from 'react';

const heroStyles = `
  .hero-slide {
    opacity: 0;
    transition: opacity 1.5s ease-in-out;
    position: absolute;
    inset: 0;
  }
  .hero-slide.active { opacity: 1; }

  .hero-fade-in {
    opacity: 0;
    transform: translateY(20px);
    animation: heroFadeIn 0.9s ease forwards;
  }
  @keyframes heroFadeIn {
    to { opacity: 1; transform: translateY(0); }
  }

  .hero-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: rgba(255,255,255,0.4);
    transition: all 0.3s ease;
    cursor: pointer;
  }
  .hero-dot.active {
    background: #E5A93C;
    width: 24px;
    border-radius: 4px;
  }
`;

const heroImages = [
  '/images/hero1.jpeg',
  '/images/hero2.jpeg',
  '/images/hero3.jpeg',
  '/images/hero4.jpeg',
];

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroImages.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full min-h-screen flex items-center overflow-hidden">
      <style>{heroStyles}</style>

      {/* ── BACKGROUND IMAGE CAROUSEL ── */}
      <div className="absolute inset-0 z-0">
        {heroImages.map((src, i) => (
          <img
            key={src}
            src={src}
            alt="Ritvik Metal Impex Industrial Products"
            className={`hero-slide ${i === activeSlide ? 'active' : ''} w-full h-full object-cover object-center`}
          />
        ))}
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#020710]/90 via-[#020710]/70 to-[#020710]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020710]/80 via-transparent to-transparent" />
      </div>

      {/* ── CAROUSEL DOTS ── */}
      <div className="absolute bottom-8 right-8 z-20 flex gap-2">
        {heroImages.map((_, i) => (
          <div
            key={i}
            onClick={() => setActiveSlide(i)}
            className={`hero-dot ${i === activeSlide ? 'active' : ''}`}
          />
        ))}
      </div>

      {/* ── CONTENT OVERLAY ── */}
      <div className="relative z-10 max-w-[1440px] mx-auto w-full px-6 lg:px-16 py-24">
        <div className="max-w-2xl">

          {/* Eyebrow */}
          <div className="hero-fade-in flex items-center gap-3 mb-6" style={{animationDelay: '0.1s'}}>
            <span className="text-[10px] font-black tracking-[0.3em] text-[#E5A93C] uppercase">
              Premium Metal Supplier
            </span>
            <div className="h-px w-10 bg-[#E5A93C]" />
          </div>

          {/* Headline */}
          <h1 className="hero-fade-in text-[36px] sm:text-[50px] lg:text-[64px] font-[900] tracking-tight text-white leading-[1.06] uppercase" style={{animationDelay: '0.2s'}}>
            YOUR RELIABLE<br />
            SOURCE FOR<br />
            <span className="text-[#E5A93C]">QUALITY METALS</span>
          </h1>

          {/* Divider */}
          <div className="hero-fade-in w-12 h-[2px] bg-[#E5A93C]/60 mt-7 mb-6" style={{animationDelay: '0.3s'}} />

          {/* Description */}
          <p className="hero-fade-in text-gray-200 text-[14px] sm:text-[16px] font-medium leading-[1.8] max-w-lg" style={{animationDelay: '0.4s'}}>
            Leading supplier of premium Iron, Steel, Stainless Steel &amp; High Nickel Alloy products — delivering quality, trust and excellence across India and globally.
          </p>

          {/* Buttons */}
          <div className="hero-fade-in mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4" style={{animationDelay: '0.5s'}}>
            <button
              onClick={() => document.getElementById('contact-us').scrollIntoView({behavior:'smooth'})}
              className="group bg-[#E5A93C] text-[#0A1828] text-[11px] font-black tracking-[0.2em] px-8 py-[14px] uppercase flex items-center gap-4 cursor-pointer transition-all duration-200 hover:bg-[#d4982b]"
            >
              <span>EXPLORE PRODUCTS</span>
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </button>
            <button
              onClick={() => document.getElementById('contact-us').scrollIntoView({behavior:'smooth'})}
              className="text-white text-[11px] font-black tracking-[0.2em] px-8 py-[14px] uppercase border border-white/40 cursor-pointer transition-all duration-200 hover:border-white hover:bg-white/10"
            >
              CONTACT US
            </button>
          </div>

          {/* ── COMPANY INFO STRIP — OVERLAY ON IMAGE ── */}
          <div className="hero-fade-in mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-white/15 pt-8 max-w-2xl" style={{animationDelay: '0.6s'}}>
            <div>
              <h4 className="text-[11px] font-black tracking-[0.2em] text-[#E5A93C] uppercase mb-1">Company</h4>
              <p className="text-white text-[14px] font-bold">Ritvik Metal Impex</p>
              <p className="text-gray-300 text-[12px] leading-relaxed mt-1">
                Building no 16, 2nd floor, Patel Mansion 4th, Kumbharwada, Mumbai - 400004
              </p>
            </div>
            <div>
              <h4 className="text-[11px] font-black tracking-[0.2em] text-[#E5A93C] uppercase mb-1">Get In Touch</h4>
              <p className="text-white text-[14px] font-bold">022 66394895</p>
              <p className="text-gray-300 text-[12px] mt-1">sales@ritvikmetal.com</p>
            </div>
            <div>
              <h4 className="text-[11px] font-black tracking-[0.2em] text-[#E5A93C] uppercase mb-1">What We Supply</h4>
              <p className="text-gray-300 text-[12px] leading-relaxed">
                Stainless Steel, Carbon Steel, Alloy Steel, Copper, Brass &amp; High Nickel Alloy products in all forms.
              </p>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
