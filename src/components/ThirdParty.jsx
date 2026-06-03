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

const tpiStyles = `
  /* ── Heading reveal ── */
  .tpi-reveal {
    opacity: 0;
    transform: translateY(28px);
    transition: opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1);
  }
  .tpi-reveal.revealed { opacity: 1; transform: translateY(0); }

  .tpi-reveal-sub {
    opacity: 0;
    transform: translateY(18px);
    transition: opacity 0.7s cubic-bezier(0.22,1,0.36,1) 0.12s, transform 0.7s cubic-bezier(0.22,1,0.36,1) 0.12s;
  }
  .tpi-reveal-sub.revealed { opacity: 1; transform: translateY(0); }

  /* ── Line draw ── */
  .tpi-line-draw {
    transform: scaleX(0);
    transform-origin: center;
    transition: transform 0.7s cubic-bezier(0.22,1,0.36,1) 0.28s;
  }
  .tpi-line-draw.revealed { transform: scaleX(1); }

  /* ── Marquee band fade-in ── */
  .tpi-band {
    opacity: 0;
    transition: opacity 0.9s ease 0.3s;
  }
  .tpi-band.revealed { opacity: 1; }

  /* ── Infinite marquee ── */
  @keyframes tpi-scroll {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }
  .tpi-track {
    display: flex;
    width: max-content;
    animation: tpi-scroll 28s linear infinite;
  }
  .tpi-track:hover { animation-play-state: paused; }

  /* ── Edge fade masks ── */
  .tpi-fade-left  { background: linear-gradient(to right,  #ffffff 0%, transparent 100%); }
  .tpi-fade-right { background: linear-gradient(to left,   #ffffff 0%, transparent 100%); }

  /* ── Logo card ── */
  .tpi-logo-card {
    transition: filter 0.35s ease, transform 0.35s ease, box-shadow 0.35s ease;
  }
  .tpi-logo-card:hover {
    filter: grayscale(0%) !important;
    transform: translateY(-3px);
    box-shadow: 0 8px 24px rgba(229,169,60,0.15);
  }
`;

const tpiLogos = [
  { name: "Larsen & Toubro",    logo: "/logos/lt.png"   },
  { name: "Nuclear Power Corp", logo: "/logos/npcil.png" },
  { name: "TUV India",          logo: "/logos/tuv.png"  },
  { name: "DNV",                logo: "/logos/dnv.png"  },
  { name: "Tata Projects",      logo: "/logos/tata.png" },
  { name: "PDIL",               logo: "/logos/pdil.png" },
  { name: "ONGC",               logo: "/logos/ongc.png" },
  { name: "NTPC",               logo: "/logos/ntpc.png" },
  { name: "SAIL",               logo: "/logos/sail.png" },
];

export default function TPISection() {
  const headRef = useReveal({ threshold: 0.2 });
  const subRef  = useReveal({ threshold: 0.2 });
  const lineRef = useReveal({ threshold: 0.2 });
  const bandRef = useReveal({ threshold: 0.1 });

  // Duplicate 4× so the seamless loop works at any viewport width
  const repeated = [...tpiLogos, ...tpiLogos, ...tpiLogos, ...tpiLogos];

  return (
    <section className="w-full bg-white py-16 border-b border-gray-100 overflow-hidden">
      <style>{tpiStyles}</style>

      {/* ── Heading block ── */}
      <div className="max-w-[1240px] mx-auto px-6 mb-10 flex flex-col items-center">

        {/* Eyebrow */}
        <span
          ref={headRef}
          className="tpi-reveal text-[11px] font-black tracking-[0.28em] text-[#E5A93C] uppercase mb-3"
        >
          TRUSTED PARTNERS
        </span>

        {/* Title */}
        <h4
          ref={subRef}
          className="tpi-reveal-sub text-[18px] sm:text-[22px] font-black tracking-wider uppercase text-[#041125] text-center"
        >
          Trusted by <span className="text-[#E5A93C]">Leading Industry Partners</span>
        </h4>

        {/* Gold divider */}
        <div
          ref={lineRef}
          className="tpi-line-draw w-12 h-[2px] bg-[#E5A93C]/50 mt-4 mb-3"
        />

        {/* Sub-copy */}
        <p className="text-gray-400 text-center text-[13px] sm:text-[14px] font-medium max-w-md leading-relaxed">
          Commitment to quality validated by global third-party inspection standards.
        </p>
      </div>

      {/* ── Marquee band ── */}
      <div
        ref={bandRef}
        className="tpi-band relative border-t border-b border-gray-100 py-7 bg-gray-50/50 overflow-hidden"
      >
        {/* Left fade */}
        <div className="tpi-fade-left absolute left-0 top-0 bottom-0 w-24 sm:w-40 z-10 pointer-events-none" />
        {/* Right fade */}
        <div className="tpi-fade-right absolute right-0 top-0 bottom-0 w-24 sm:w-40 z-10 pointer-events-none" />

        <div className="tpi-track">
          {repeated.map((item, idx) => (
            <div
              key={idx}
              className="tpi-logo-card flex flex-col items-center justify-center shrink-0 w-32 mx-8 filter grayscale cursor-pointer"
            >
              <img
                src={item.logo}
                alt={item.name}
                className="w-24 h-14 object-contain"
                onError={e => {
                  // Graceful fallback while real logos aren't present
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextSibling.style.display = 'flex';
                }}
              />
              {/* Fallback placeholder — hidden once real logo loads */}
              <div
                style={{ display: 'none' }}
                className="w-24 h-14 bg-gray-100 border border-gray-200 rounded flex items-center justify-center text-[9px] text-gray-400 font-bold p-2 text-center leading-tight"
              >
                {item.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}