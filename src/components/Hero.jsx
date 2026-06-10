import React, { useEffect, useRef } from 'react';

const heroStyles = `
  .hero-content { opacity: 0; }
  .hero-content.loaded { opacity: 1; }

  .hero-tag {
    opacity: 0;
    transform: translateY(12px);
    transition: opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s;
  }
  .hero-tag.in { opacity: 1; transform: translateY(0); }

  .hero-title-line {
    display: block;
    overflow: hidden;
  }
  .hero-title-line span {
    display: block;
    opacity: 0;
    transform: translateY(100%);
    transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .hero-title-line.in span { opacity: 1; transform: translateY(0); }

  .hero-divider {
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .hero-divider.in { transform: scaleX(1); }

  .hero-para {
    opacity: 0;
    transform: translateY(16px);
    transition: opacity 0.7s ease, transform 0.7s ease;
  }
  .hero-para.in { opacity: 1; transform: translateY(0); }

  .hero-actions {
    opacity: 0;
    transform: translateY(16px);
    transition: opacity 0.7s ease, transform 0.7s ease;
  }
  .hero-actions.in { opacity: 1; transform: translateY(0); }

  .hero-image-wrap {
    opacity: 0;
    transition: opacity 1s ease 0.1s;
  }
  .hero-image-wrap.in { opacity: 1; }

  /* Desktop shape entrance */
  .shape-gold {
    clip-path: polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%, 100% 52%);
    transition: clip-path 1.1s cubic-bezier(0.16, 1, 0.3, 1) 0s;
  }
  .shape-gold.in {
    clip-path: polygon(55% 0%, 100% 0%, 100% 100%, 55% 100%, 38% 52%);
  }
  .shape-shadow {
    clip-path: polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%, 100% 52%);
    transition: clip-path 1.1s cubic-bezier(0.16, 1, 0.3, 1) 0.05s;
  }
  .shape-shadow.in {
    clip-path: polygon(55% 0%, 100% 0%, 100% 100%, 55% 100%, 38% 52%);
  }
  .shape-main {
    clip-path: polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%, 100% 52%);
    transition: clip-path 1.1s cubic-bezier(0.16, 1, 0.3, 1) 0.1s;
  }
  .shape-main.in {
    clip-path: polygon(55% 0%, 100% 0%, 100% 100%, 55% 100%, 38% 52%);
  }

  .scroll-line {
    height: 0;
    transition: height 0.8s ease 1.8s;
  }
  .scroll-line.in { height: 40px; }

  .scroll-label {
    opacity: 0;
    transition: opacity 0.5s ease 2.4s;
  }
  .scroll-label.in { opacity: 1; }

  /* Mobile image */
  .mobile-img-wrap {
    opacity: 0;
    transition: opacity 0.9s ease 0s;
  }
  .mobile-img-wrap.in { opacity: 1; }
`;

export default function Hero() {
  const mobileImgRef  = useRef(null);
  const desktopImgRef = useRef(null);
  const sectionRef    = useRef(null);

  // Trigger all entrance animations after mount
  useEffect(() => {
    const delays = [
      ['.hero-image-wrap',  0],
      ['.mobile-img-wrap',  0],
      ['.shape-gold',       50],
      ['.shape-shadow',     50],
      ['.shape-main',       50],
      ['.hero-tag',         300],
      ['.hero-divider',     400],
      ['.hero-title-line:nth-child(1)', 450],
      ['.hero-title-line:nth-child(2)', 580],
      ['.hero-title-line:nth-child(3)', 710],
      ['.hero-para',        900],
      ['.hero-actions',     1050],
      ['.scroll-line',      0],
      ['.scroll-label',     0],
    ];

    delays.forEach(([sel, delay]) => {
      setTimeout(() => {
        document.querySelectorAll(sel).forEach(el => el.classList.add('in'));
      }, delay);
    });
  }, []);

  // Scroll parallax — mobile only
  useEffect(() => {
    const img = mobileImgRef.current;
    if (!img) return;
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (window.innerWidth >= 1024) { ticking = false; return; }
          img.style.transform = `translateY(${window.scrollY * 0.3}px)`;
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll parallax — desktop image drift
  useEffect(() => {
    const img     = desktopImgRef.current;
    const section = sectionRef.current;
    if (!img || !section) return;
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (window.innerWidth < 1024) { ticking = false; return; }
          const top      = section.getBoundingClientRect().top;
          const progress = Math.max(0, Math.min(1, -top / section.offsetHeight));
          img.style.transform = `scale(1.07) translateY(${progress * 24}px)`;
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[90vh] bg-white overflow-hidden flex flex-col lg:flex-row items-center"
    >
      <style>{heroStyles}</style>

      {/* ── IMAGE PANEL ─────────────────────────────────── */}
      <div className="hero-image-wrap w-full lg:absolute lg:inset-y-0 lg:right-0 lg:w-[87%] h-[280px] sm:h-[340px] lg:h-full z-10">

        {/* Mobile */}
        <div className="mobile-img-wrap block lg:hidden w-full h-full overflow-hidden">
          <img
            ref={mobileImgRef}
            src="/images/hero.jpeg"
            alt="Stainless Steel Industrial Rolls"
            className="w-full h-[135%] object-cover object-center will-change-transform"
            style={{ marginTop: '-15%' }}
          />
        </div>

        {/* Desktop layers */}
        <div className="hidden lg:block absolute inset-0">
          <div className="shape-gold absolute inset-0 bg-[#E5A93C]" />
          <div className="shape-shadow absolute inset-0 bg-[#B38F24]" style={{ left: '4px', top: '1px' }} />
          <div className="shape-main absolute inset-0 bg-[#0A1828] overflow-hidden" style={{ left: '8px', top: '2px' }}>
            <div className="absolute inset-0 bg-gradient-to-r from-[#051124]/30 via-transparent to-transparent z-10" />
            <img
              ref={desktopImgRef}
              src="/images/hero.jpeg"
              alt="Stainless Steel Industrial Rolls"
              className="w-full h-full object-cover object-center contrast-[1.04] will-change-transform"
              style={{ transform: 'scale(1.07)' }}
            />
          </div>
        </div>
      </div>

      {/* ── TEXT CONTENT ────────────────────────────────── */}
      <div className="max-w-[1440px] mx-auto w-full px-6 lg:px-16 pt-10 pb-24 relative z-20">
        <div className="max-w-lg">

          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-7">
            <span className="hero-tag text-[10px] font-black tracking-[0.3em] text-[#E5A93C] uppercase">
              Premium Metal Supplier
            </span>
            <div className="hero-divider h-px w-10 bg-[#E5A93C]" />
          </div>

          {/* Headline */}
          <h1 className="text-[36px] sm:text-[50px] lg:text-[62px] font-[900] tracking-tight text-[#0A1828] leading-[1.06] uppercase">
            <span className="hero-title-line"><span>YOUR RELIABLE</span></span>
            <span className="hero-title-line" style={{transitionDelay: '0s'}}><span>SOURCE FOR</span></span>
            <span className="hero-title-line" style={{transitionDelay: '0s'}}>
              <span className="text-[#E5A93C]">QUALITY</span>
            </span>
          </h1>

          {/* Divider */}
          <div className="hero-divider w-12 h-[2px] bg-[#E5A93C]/40 mt-7 mb-6" style={{transitionDelay: '0.5s'}} />

          <p className="hero-para text-gray-500 text-[14px] sm:text-[15px] font-medium leading-[1.8] max-w-sm">
            Leading supplier of premium Iron, Steel, Stainless Steel &amp; High Nickel Alloy products — delivering quality, trust and excellence.
          </p>

          <div className="hero-actions mt-9 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <button
              onClick={() => document.getElementById("contact-us").scrollIntoView({behavior:"smooth"})} className="group bg-[#051124] text-white text-[11px] font-black tracking-[0.2em] px-8 py-[14px] uppercase flex items-center gap-4 cursor-pointer transition-all duration-200 hover:bg-[#0d2040]"
            >
              <span>EXPLORE PRODUCTS</span>
              <span className="text-[#E5A93C] transition-transform duration-200 group-hover:translate-x-1">→</span>
            </button>
            <button
              className="text-[#0A1828] text-[11px] font-black tracking-[0.2em] px-8 py-[14px] uppercase border border-gray-300 cursor-pointer transition-all duration-200 hover:border-[#0A1828] bg-white"
            >
              CONTACT US
            </button>
          </div>

        </div>
      </div>

      {/* ── Scroll indicator ─────────────────────────────── */}
      <div className="absolute bottom-8 left-6 lg:left-16 z-30 flex flex-col items-center gap-2">
        <div className="scroll-line w-px bg-[#E5A93C]/50" />
        <span className="scroll-label text-[8px] font-black tracking-[0.35em] text-gray-400 uppercase">Scroll</span>
      </div>

    </section>
  );
}