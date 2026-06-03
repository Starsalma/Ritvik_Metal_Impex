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
      { threshold: 0.12, ...options }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

const sectionStyles = `
  /* ── Shared reveal base ── */
  .ind-reveal {
    opacity: 0;
    transform: translateY(32px);
    transition: opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1);
  }
  .ind-reveal.revealed { opacity: 1; transform: translateY(0); }

  .ind-reveal-left {
    opacity: 0;
    transform: translateX(-48px);
    transition: opacity 0.8s cubic-bezier(0.22,1,0.36,1), transform 0.8s cubic-bezier(0.22,1,0.36,1);
  }
  .ind-reveal-left.revealed { opacity: 1; transform: translateX(0); }

  .ind-reveal-right {
    opacity: 0;
    transform: translateX(48px);
    transition: opacity 0.8s cubic-bezier(0.22,1,0.36,1), transform 0.8s cubic-bezier(0.22,1,0.36,1);
  }
  .ind-reveal-right.revealed { opacity: 1; transform: translateX(0); }

  /* ── Line draw (matches About / Products) ── */
  .ind-line-draw {
    transform: scaleX(0);
    transform-origin: center;
    transition: transform 0.7s cubic-bezier(0.22,1,0.36,1) 0.35s;
  }
  .ind-line-draw.revealed { transform: scaleX(1); }

  /* ── Industry grid tiles stagger ── */
  .ind-grid-wrap .ind-tile {
    opacity: 0;
    transform: translateY(20px) scale(0.96);
    transition: opacity 0.55s cubic-bezier(0.22,1,0.36,1), transform 0.55s cubic-bezier(0.22,1,0.36,1);
  }
  .ind-grid-wrap.revealed .ind-tile {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  /* 12-tile cascade — 0.05s steps */
  .ind-grid-wrap.revealed .ind-tile:nth-child(1)  { transition-delay: 0.00s; }
  .ind-grid-wrap.revealed .ind-tile:nth-child(2)  { transition-delay: 0.05s; }
  .ind-grid-wrap.revealed .ind-tile:nth-child(3)  { transition-delay: 0.10s; }
  .ind-grid-wrap.revealed .ind-tile:nth-child(4)  { transition-delay: 0.15s; }
  .ind-grid-wrap.revealed .ind-tile:nth-child(5)  { transition-delay: 0.20s; }
  .ind-grid-wrap.revealed .ind-tile:nth-child(6)  { transition-delay: 0.25s; }
  .ind-grid-wrap.revealed .ind-tile:nth-child(7)  { transition-delay: 0.30s; }
  .ind-grid-wrap.revealed .ind-tile:nth-child(8)  { transition-delay: 0.35s; }
  .ind-grid-wrap.revealed .ind-tile:nth-child(9)  { transition-delay: 0.40s; }
  .ind-grid-wrap.revealed .ind-tile:nth-child(10) { transition-delay: 0.45s; }
  .ind-grid-wrap.revealed .ind-tile:nth-child(11) { transition-delay: 0.50s; }
  .ind-grid-wrap.revealed .ind-tile:nth-child(12) { transition-delay: 0.55s; }

  /* ── Why-choose-us list stagger ── */
  .why-list-wrap .why-item {
    opacity: 0;
    transform: translateX(-24px);
    transition: opacity 0.6s cubic-bezier(0.22,1,0.36,1), transform 0.6s cubic-bezier(0.22,1,0.36,1);
  }
  .why-list-wrap.revealed .why-item { opacity: 1; transform: translateX(0); }
  .why-list-wrap.revealed .why-item:nth-child(1) { transition-delay: 0.10s; }
  .why-list-wrap.revealed .why-item:nth-child(2) { transition-delay: 0.20s; }
  .why-list-wrap.revealed .why-item:nth-child(3) { transition-delay: 0.30s; }
  .why-list-wrap.revealed .why-item:nth-child(4) { transition-delay: 0.40s; }
  .why-list-wrap.revealed .why-item:nth-child(5) { transition-delay: 0.50s; }

  /* ── Honeycomb panel ── */
  .hex-panel {
    opacity: 0;
    transform: translateX(40px) scale(0.95);
    transition: opacity 0.9s cubic-bezier(0.22,1,0.36,1) 0.25s, transform 0.9s cubic-bezier(0.22,1,0.36,1) 0.25s;
  }
  .hex-panel.revealed { opacity: 1; transform: translateX(0) scale(1); }

  /* ── White panel clip slide-in (desktop) ── */
  .why-panel {
    opacity: 0;
    transform: translateX(60px);
    transition: opacity 0.85s cubic-bezier(0.22,1,0.36,1), transform 0.85s cubic-bezier(0.22,1,0.36,1);
  }
  .why-panel.revealed { opacity: 1; transform: translateX(0); }

  /* ── Gold gear spin ── */
  @keyframes spin-slow { to { transform: rotate(360deg); } }
  .gear-spin { animation: spin-slow 12s linear infinite; }
`;

export default function IndustriesAndWhyChooseUs() {
  const industries = [
    { name: "AEROSPACE",           icon: "M21 16V8a2 2 0 00-1.35-1.9l-5.4-1.8a2 2 0 00-1.25 0l-5.4 1.8A2 2 0 006 8v8a2 2 0 001.35 1.9l5.4 1.8a2 2 0 001.25 0l5.4-1.8A2 2 0 0021 16z" },
    { name: "DEFENSE",             icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" },
    { name: "CHEMICAL PROCESSING", icon: "M9 3h6M10 3v6l-4 8a2 2 0 00-1.8 2.8h8.4A2 2 0 0018 17l-4-8V3" },
    { name: "OIL & GAS",           icon: "M12 2C8.5 6.5 6 10 6 13a6 6 0 0012 0c0-3-2.5-6.5-6-11z" },
    { name: "ELECTRICAL ENERGY",   icon: "M13 2L3 14h9l-1 8 10-12h-9l1-8z" },
    { name: "MEDICAL",             icon: "M4.5 10.5h15M12 3v15" },
    { name: "AUTOMOTIVE",          icon: "M5 10l1-4h12l1 4M3 10h18v6H3z" },
    { name: "FOOD EQUIPMENT",      icon: "M12 2v20M5 5h14M5 10h14M8 15h8M5 20h14" },
    { name: "APPLIANCES",          icon: "M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2zm7 15a3 3 0 100-6 3 3 0 000 6z" },
    { name: "CONSTRUCTION",        icon: "M3 21h18M5 21V7l7-4 7 4v14" },
    { name: "MINING",              icon: "M19 5l-7 7-4-4L3 13M14 3h7v7M5 21h14" },
    { name: "TRANSPORTATION",      icon: "M5 10h14l1 5H4l1-5zM3 19h18v2H3z" },
  ];

  const whyPoints = [
    "Wide range of high quality products",
    "Strict quality control and testing",
    "Competitive pricing",
    "Timely delivery across the globe",
    "Customer centric approach",
  ];

  // Refs
  const indHeadingRef = useReveal({ threshold: 0.15 });
  const indLineRef    = useReveal({ threshold: 0.15 });
  const indGridRef    = useReveal({ threshold: 0.08 });
  const whyPanelRef  = useReveal({ threshold: 0.12 });
  const whyHeadRef   = useReveal({ threshold: 0.12 });
  const whyListRef   = useReveal({ threshold: 0.12 });
  const hexRef       = useReveal({ threshold: 0.12 });

  return (
    <section className="w-full bg-[#050C14] text-white font-sans overflow-hidden">
      <style>{sectionStyles}</style>

      {/* ══════════════════════════════════════════
          TOP — INDUSTRIES WE SERVE
         ══════════════════════════════════════════ */}
      <div
        className="w-full relative pt-16 pb-20 px-4 sm:px-8 lg:px-16 bg-cover bg-center"
        style={{ backgroundImage: `url('/images/industry.jpeg')` }}
      >
        <div className="absolute inset-0 bg-[#0A1420]/90 mix-blend-multiply z-0" />

        <div className="max-w-[1240px] mx-auto w-full relative z-10 text-center">

          {/* Heading */}
          <h2
            ref={indHeadingRef}
            className="ind-reveal text-[20px] sm:text-[24px] font-black tracking-widest text-white"
          >
            INDUSTRIES <span className="text-[#E5A93C]">WE SERVE</span>
          </h2>

          {/* Decorative divider */}
          <div
            ref={indLineRef}
            className="ind-line-draw flex items-center justify-center gap-3 mt-3 mb-10"
          >
            <div className="w-14 h-[1px] bg-gray-700" />
            <svg
              className="gear-spin text-[#E5A93C] w-4 h-4"
              viewBox="0 0 24 24" fill="currentColor"
            >
              <path d="M12 15.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7zm7.43-2.47c.04-.32.07-.65.07-.97s-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1s.03.65.07.97l-2.11 1.66c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.58 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.66z"/>
            </svg>
            <div className="w-14 h-[1px] bg-gray-700" />
          </div>

          {/* Grid of industry tiles */}
          <div
            ref={indGridRef}
            className="ind-grid-wrap grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 border border-gray-800/60 bg-black/10"
          >
            {industries.map((ind, idx) => (
              <div
                key={idx}
                className="ind-tile flex flex-col items-center justify-center py-7 px-2 border border-gray-800/60 hover:bg-[#E5A93C]/5 transition-colors group cursor-pointer"
              >
                <div className="w-8 h-8 mb-3 text-[#E5A93C] group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.2">
                    <path strokeLinecap="round" strokeLinejoin="round" d={ind.icon} />
                  </svg>
                </div>
                <span className="text-[10px] font-bold tracking-widest text-gray-400 group-hover:text-white transition-colors text-center uppercase leading-tight">
                  {ind.name}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* ══════════════════════════════════════════
          BOTTOM — WHY CHOOSE US
         ══════════════════════════════════════════ */}
      <div
        className="w-full relative bg-cover bg-center min-h-[560px] lg:h-[560px] flex items-stretch"
        style={{ backgroundImage: `url('/images/industry.jpeg')` }}
      >
        {/* Mobile overlay */}
        <div className="absolute inset-0 bg-black/50 lg:hidden" />

        {/* White panel */}
        <div
          ref={whyPanelRef}
          className="why-panel w-full lg:w-[62%] bg-white lg:ml-auto z-10 flex flex-col lg:flex-row items-center justify-between py-12 lg:py-0 px-6 sm:px-12 lg:pl-24 lg:pr-12 text-gray-900 gap-6 [clip-path:none] lg:[clip-path:polygon(10%_0,100%_0,100%_100%,0_100%)]"
        >
          {/* Text block */}
          <div className="max-w-md w-full flex flex-col justify-center">

            <h3
              ref={whyHeadRef}
              className="ind-reveal text-[28px] sm:text-[32px] lg:text-[36px] font-black text-[#0A1828] tracking-tight uppercase whitespace-nowrap"
            >
              WHY <span className="text-[#E5A93C]">CHOOSE US?</span>
            </h3>

            {/* Divider */}
            <div className="w-12 h-[2px] bg-[#E5A93C]/50 mt-4 mb-6" />

            {/* List */}
            <ul
              ref={whyListRef}
              className="why-list-wrap space-y-4"
            >
              {whyPoints.map((text, idx) => (
                <li key={idx} className="why-item flex items-center gap-4">
                  <div className="w-5 h-5 rounded-full bg-[#0A1828] flex items-center justify-center shrink-0">
                    <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-[15px] sm:text-[16px] font-bold text-gray-700 tracking-wide leading-snug">
                    {text}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Honeycomb panel */}
          <div
            ref={hexRef}
            className="hex-panel relative w-[340px] h-[340px] sm:w-[380px] sm:h-[360px] shrink-0 mt-6 lg:mt-0 select-none"
          >
            <svg className="absolute w-0 h-0">
              <defs>
                <clipPath id="hex-mask" clipPathUnits="objectBoundingBox">
                  <polygon points="0.25 0, 0.75 0, 1 0.5, 0.75 1, 0.25 1, 0 0.5" />
                </clipPath>
              </defs>
            </svg>
            <div className="absolute right-0 top-0 w-[157px] h-[137px] sm:w-[180px] sm:h-[156px] z-10 [clip-path:url(#hex-mask)] bg-[url('https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=400')] bg-cover bg-center drop-shadow-md hover:scale-105 transition-transform duration-500" />
            <div className="absolute top-1/2 -translate-y-1/2 left-0 w-[157px] h-[137px] sm:w-[180px] sm:h-[156px] z-20 bg-[#E5A93C] [clip-path:url(#hex-mask)] hover:scale-105 transition-transform duration-500">
              <div className="absolute inset-[2.5px] [clip-path:url(#hex-mask)] bg-[url('https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=400')] bg-cover bg-center" />
            </div>
            <div className="absolute right-0 bottom-0 w-[157px] h-[137px] sm:w-[180px] sm:h-[156px] z-10 [clip-path:url(#hex-mask)] bg-[url('https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=400')] bg-cover bg-center drop-shadow-md hover:scale-105 transition-transform duration-500" />
          </div>

        </div>
      </div>

    </section>
  );
}