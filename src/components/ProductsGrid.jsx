import React, { useEffect, useRef } from 'react';

function useReveal(options = {}) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('revealed');
          observer.disconnect();
        }
      },
      { threshold: 0.15, ...options }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

const productStyles = `
  /* ── Base reveal classes (matches About) ── */
  .prod-reveal {
    opacity: 0;
    transform: translateY(36px);
    transition: opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1);
  }
  .prod-reveal.revealed { opacity: 1; transform: translateY(0); }

  .prod-reveal-left {
    opacity: 0;
    transform: translateX(-48px);
    transition: opacity 0.8s cubic-bezier(0.22,1,0.36,1), transform 0.8s cubic-bezier(0.22,1,0.36,1);
  }
  .prod-reveal-left.revealed { opacity: 1; transform: translateX(0); }

  /* ── Stagger for the header copy block ── */
  .prod-stagger > * {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.6s cubic-bezier(0.22,1,0.36,1), transform 0.6s cubic-bezier(0.22,1,0.36,1);
  }
  .prod-stagger.revealed > *:nth-child(1) { opacity:1; transform:translateY(0); transition-delay:0s; }
  .prod-stagger.revealed > *:nth-child(2) { opacity:1; transform:translateY(0); transition-delay:0.1s; }
  .prod-stagger.revealed > *:nth-child(3) { opacity:1; transform:translateY(0); transition-delay:0.2s; }
  .prod-stagger.revealed > *:nth-child(4) { opacity:1; transform:translateY(0); transition-delay:0.3s; }

  /* ── Card entrance ── */
  .prod-card-reveal {
    opacity: 0;
    transform: translateY(48px) scale(0.97);
    transition: opacity 0.8s cubic-bezier(0.22,1,0.36,1), transform 0.8s cubic-bezier(0.22,1,0.36,1);
  }
  .prod-card-reveal.revealed { opacity: 1; transform: translateY(0) scale(1); }
  .prod-card-reveal:nth-child(2) { transition-delay: 0.18s; }

  /* ── Divider line draw ── */
  .prod-line-draw {
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.7s cubic-bezier(0.22,1,0.36,1) 0.4s;
  }
  .prod-line-draw.revealed { transform: scaleX(1); }

  /* ── Hover description fade (already had opacity-0 group-hover) ── */
  /* kept as Tailwind group classes in JSX */

  /* ── Scroll hint pulse ── */
  @keyframes prod-pulse-x {
    0%, 100% { opacity: 0.4; transform: scaleX(1); }
    50%       { opacity: 1;   transform: scaleX(1.25); }
  }
  .prod-scroll-line {
    animation: prod-pulse-x 2s ease-in-out infinite;
    transform-origin: left;
  }
`;

export default function Products() {
  const headerRef  = useReveal({ threshold: 0.15 });
  const lineRef    = useReveal({ threshold: 0.15 });
  const card1Ref   = useReveal({ threshold: 0.1 });
  const card2Ref   = useReveal({ threshold: 0.1 });

  return (
    <section
      id="products"
      className="relative w-full bg-white pb-24 px-6 lg:px-16 pt-16 overflow-hidden"
    >
      <style>{productStyles}</style>

      {/* Background Watermark */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 text-[180px] sm:text-[240px] font-black text-gray-100/60 tracking-widest select-none hidden lg:block z-0 uppercase font-sans pointer-events-none">
        PRODUCTS
      </div>

      <div className="max-w-[1320px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">

        {/* ── LEFT: HEADER & CTA ── */}
        <div
          ref={headerRef}
          className="prod-stagger lg:col-span-4 flex flex-col justify-center"
        >
          {/* Eyebrow */}
          <span className="text-[13px] font-bold tracking-[0.2em] text-[#E5A93C] uppercase">
            OUR SPECIALITY
          </span>

          {/* Headline */}
          <h2 className="text-[32px] sm:text-[38px] lg:text-[42px] font-extrabold text-[#0A1828] leading-[1.15] uppercase mt-3 tracking-tight">
            OUR SPECIALITY <br />
            PRODUCTS
          </h2>

          {/* Divider */}
          <div
            ref={lineRef}
            className="prod-line-draw w-12 h-[2px] bg-[#E5A93C]/50 mt-5 mb-5"
          />

          {/* Body */}
          <p className="text-gray-500 text-[15px] font-medium leading-relaxed max-w-sm">
            Ritvik Metal Impex stands as a premium supplier, providing high-integrity
            materials tailored for severe operating conditions, high pressure, and
            critical industrial applications.
          </p>

          {/* Scroll hint — desktop only */}
          <div className="mt-8 hidden lg:flex items-center gap-3 text-gray-400 font-semibold text-xs tracking-widest uppercase">
            <span>SCROLL TO EXPLORE</span>
            <div className="prod-scroll-line w-16 h-[1px] bg-gray-300" />
          </div>
        </div>

        {/* ── RIGHT: PRODUCT CARDS ── */}
        <div className="lg:col-span-8 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">

            {/* CARD 1 — FERROUS */}
            <div
              ref={card1Ref}
              className="prod-card-reveal group relative flex flex-col"
            >
              <div className="w-full h-[360px] sm:h-[420px] rounded-tl-[50px] rounded-br-[50px] overflow-hidden shadow-lg bg-gray-50 relative z-10">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1828]/80 via-[#0A1828]/20 to-transparent z-10" />
                <img
                  src="/images/ferrous.jpeg?auto=format&fit=crop&q=80&w=800"
                  alt="Stainless Steel Sheets and Flanges"
                  className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute bottom-0 inset-x-0 p-8 z-20 flex flex-col">
                  <span className="text-[#E5A93C] text-[11px] font-black tracking-[0.25em] uppercase">
                    CATEGORY 01
                  </span>
                  <h3 className="text-xl font-extrabold text-white uppercase tracking-wide mt-1">
                    FERROUS METALS
                  </h3>
                  <p className="text-gray-300 text-xs mt-2 font-medium max-w-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-2">
                    Stainless Steel, Carbon Steel, Alloy Steel, Pipes, Fittings &amp; Forged Flanges.
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-4 px-2 cursor-pointer w-fit">
                <span className="text-[12px] font-black tracking-widest text-[#0A1828] uppercase group-hover:text-[#E5A93C] transition-colors duration-200">
                  EXPLORE FERROUS RANGE
                </span>
                <span className="text-[#E5A93C] text-sm transform transition-transform group-hover:translate-x-1.5 duration-300">
                  →
                </span>
              </div>
            </div>

            {/* CARD 2 — NON-FERROUS */}
            <div
              ref={card2Ref}
              className="prod-card-reveal group relative flex flex-col md:mt-10"
            >
              <div className="w-full h-[360px] sm:h-[420px] rounded-tl-[50px] rounded-br-[50px] overflow-hidden shadow-lg bg-gray-50 relative z-10">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1828]/80 via-[#0A1828]/20 to-transparent z-10" />
                <img
                  src="/images/nonferrous.jpeg?auto=format&fit=crop&q=80&w=800"
                  alt="Copper and Brass industrial raw items"
                  className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute bottom-0 inset-x-0 p-8 z-20 flex flex-col">
                  <span className="text-[#E5A93C] text-[11px] font-black tracking-[0.25em] uppercase">
                    CATEGORY 02
                  </span>
                  <h3 className="text-xl font-extrabold text-white uppercase tracking-wide mt-1">
                    NON-FERROUS METALS
                  </h3>
                  <p className="text-gray-300 text-xs mt-2 font-medium max-w-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-2">
                    High Nickel Alloys, Monel, Inconel, Copper, Brass &amp; Specialty Raw Materials.
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-4 px-2 cursor-pointer w-fit">
                <span className="text-[12px] font-black tracking-widest text-[#0A1828] uppercase group-hover:text-[#E5A93C] transition-colors duration-200">
                  EXPLORE NON-FERROUS RANGE
                </span>
                <span className="text-[#E5A93C] text-sm transform transition-transform group-hover:translate-x-1.5 duration-300">
                  →
                </span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}