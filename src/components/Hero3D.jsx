import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { scrollToContact } from '../utils/navigation';
import { site } from '../data/site';

/*
 * Premium 3D hero.
 *
 * Depth is real CSS 3D — a `perspective` root with `transform-style:
 * preserve-3d` children on separate translateZ planes — rather than a WebGL
 * canvas. That keeps the bundle flat (no three.js) and stays smooth on the
 * mid-range Android hardware most B2B buyers in India browse from.
 *
 * Pointer parallax is written to CSS custom properties from a single rAF loop,
 * so moving the mouse never triggers a React render.
 */

const ROTATING_WORDS = ['QUALITY METALS', 'PREMIUM STEEL', 'TRUSTED SUPPLY', 'GLOBAL GRADES'];

/*
 * Floating spec chips — real standards we supply against, not decoration.
 * Three, not four: the glass card already carries "ASTM A312" in its own spec
 * line, and a fourth chip could not be placed without overlapping the card.
 */
const SPEC_CHIPS = [
  { label: 'ASME B16.5', sub: 'Flanges', x: '74%', y: '7%', z: 170, delay: '0s' },
  { label: 'EN 10204 3.1', sub: 'MTC', x: '62%', y: '81%', z: 140, delay: '1.1s' },
  { label: 'IBR', sub: 'Certified', x: '-8%', y: '86%', z: 170, delay: '2.2s' },
];

const TRUST_CHIPS = ['Mill Test Certificates', 'IBR Certified', 'Third-Party Inspection', 'Export Worldwide'];

const heroCss = `
  .h3d-root {
    --mx: 0; --my: 0;
    perspective: 1400px;
    perspective-origin: 50% 45%;
  }
  .h3d-stage {
    transform-style: preserve-3d;
    transform: rotateY(calc(var(--mx) * 9deg)) rotateX(calc(var(--my) * -7deg));
    transition: transform .45s cubic-bezier(.22,1,.36,1);
    will-change: transform;
  }
  .h3d-layer { transform-style: preserve-3d; }

  /* The tube: stacked rings receding along Z read as a pipe bore. */
  @keyframes h3d-spin { to { transform: rotateY(360deg); } }
  .h3d-tube {
    transform-style: preserve-3d;
    animation: h3d-spin 28s linear infinite;
  }
  .h3d-ring {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    border: 1px solid rgba(229,169,60,.34);
    box-shadow: 0 0 22px rgba(229,169,60,.10) inset;
  }

  @keyframes h3d-float {
    0%,100% { transform: translate3d(0,0,0); }
    50%     { transform: translate3d(0,-14px,0); }
  }
  .h3d-chip { animation: h3d-float 6s ease-in-out infinite; }

  @keyframes h3d-sheen {
    0%   { transform: translateX(-120%) skewX(-18deg); }
    100% { transform: translateX(320%)  skewX(-18deg); }
  }
  .h3d-sheen::after {
    content: '';
    position: absolute;
    top: 0; bottom: 0; width: 38%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,.14), transparent);
    animation: h3d-sheen 5.5s ease-in-out infinite;
  }

  @keyframes h3d-scan { 0%,100% { opacity:.25; } 50% { opacity:.6; } }
  .h3d-grid { animation: h3d-scan 7s ease-in-out infinite; }

  @keyframes h3d-caret { 0%,49% { opacity:1; } 50%,100% { opacity:0; } }
  .h3d-caret { animation: h3d-caret 1.05s step-end infinite; }

  @keyframes h3d-in {
    from { opacity: 0; transform: translateY(26px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .h3d-in { animation: h3d-in .85s cubic-bezier(.22,1,.36,1) both; }

  @media (prefers-reduced-motion: reduce) {
    .h3d-stage { transform: none !important; transition: none; }
    .h3d-tube, .h3d-chip, .h3d-grid, .h3d-caret, .h3d-in { animation: none !important; }
    .h3d-sheen::after { display: none; }
    .h3d-in { opacity: 1; transform: none; }
  }
`;

export default function Hero3D() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const rootRef = useRef(null);

  /* Typing headline — derived from state, all updates inside timers. */
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const word = ROTATING_WORDS[wordIndex];
  const typed = word.slice(0, charIndex);

  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined;
    let t;
    if (!deleting) {
      t =
        charIndex < word.length
          ? setTimeout(() => setCharIndex((c) => c + 1), 80)
          : setTimeout(() => setDeleting(true), 1900);
    } else {
      t =
        charIndex > 0
          ? setTimeout(() => setCharIndex((c) => c - 1), 38)
          : setTimeout(() => {
              setDeleting(false);
              setWordIndex((i) => (i + 1) % ROTATING_WORDS.length);
            }, 380);
    }
    return () => clearTimeout(t);
  }, [charIndex, deleting, word]);

  /* Pointer parallax → CSS vars, one rAF, zero re-renders. */
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined;
    if (window.matchMedia?.('(hover: none)').matches) return undefined;

    let frame = 0;
    let tx = 0;
    let ty = 0;

    const onMove = (e) => {
      const r = root.getBoundingClientRect();
      tx = (e.clientX - r.left) / r.width - 0.5;
      ty = (e.clientY - r.top) / r.height - 0.5;
      if (!frame) {
        frame = requestAnimationFrame(() => {
          root.style.setProperty('--mx', tx.toFixed(4));
          root.style.setProperty('--my', ty.toFixed(4));
          frame = 0;
        });
      }
    };
    const onLeave = () => {
      root.style.setProperty('--mx', '0');
      root.style.setProperty('--my', '0');
    };

    root.addEventListener('pointermove', onMove);
    root.addEventListener('pointerleave', onLeave);
    return () => {
      root.removeEventListener('pointermove', onMove);
      root.removeEventListener('pointerleave', onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className="h3d-root relative w-full min-h-[92vh] lg:min-h-screen flex items-center overflow-hidden bg-[#050D18]"
      aria-label="Ritvik Metal Impex — industrial metal supplier"
    >
      <style>{heroCss}</style>

      {/* ── Background: photo, gradient mesh, grid ─────────────── */}
      <div aria-hidden="true" className="absolute inset-0 z-0">
        <img
          src="/images/hero1.jpeg"
          alt=""
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover opacity-[0.28]"
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(90% 70% at 78% 30%, rgba(229,169,60,.20) 0%, transparent 58%),' +
              'radial-gradient(70% 60% at 8% 78%, rgba(31,79,138,.30) 0%, transparent 60%),' +
              'linear-gradient(105deg, #050D18 22%, rgba(5,13,24,.86) 52%, rgba(5,13,24,.55) 100%)',
          }}
        />
        <div
          className="h3d-grid absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px),' +
              'linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)',
            backgroundSize: '68px 68px',
            maskImage: 'radial-gradient(75% 75% at 50% 45%, #000 20%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(75% 75% at 50% 45%, #000 20%, transparent 100%)',
          }}
        />
      </div>

      {/* ── Foreground ────────────────────────────────────────── */}
      <div className="h3d-stage relative z-10 w-full max-w-[1440px] mx-auto px-6 lg:px-16 py-24 lg:py-20">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-14 lg:gap-10 items-center">

          {/* Copy */}
          <div className="h3d-layer" style={{ transform: 'translateZ(60px)' }}>
            <div className="h3d-in flex items-center gap-3 mb-7" style={{ animationDelay: '.05s' }}>
              <span className="text-[10px] font-black tracking-[0.34em] text-[#E5A93C] uppercase">
                Premium Metal Supplier · Mumbai, India
              </span>
              <span className="h-px w-12 bg-gradient-to-r from-[#E5A93C] to-transparent" />
            </div>

            <h1
              className="h3d-in text-[38px] sm:text-[54px] lg:text-[70px] font-[900] tracking-[-0.02em] text-white leading-[1.03] uppercase"
              style={{ animationDelay: '.15s' }}
            >
              Your Reliable<br />Source For<br />
              <span className="inline-flex items-baseline bg-gradient-to-r from-[#E5A93C] via-[#F2C879] to-[#E5A93C] bg-clip-text text-transparent">
                {typed || ' '}
                <span className="h3d-caret inline-block w-[4px] h-[0.78em] bg-[#E5A93C] ml-2 translate-y-[2px]" />
              </span>
              <span className="sr-only">
                {' '}— stainless steel, carbon steel, duplex, nickel alloy, copper and brass
                supplier and stockist in Mumbai, India
              </span>
            </h1>

            <div className="h3d-in w-14 h-[2px] bg-[#E5A93C]/70 mt-8 mb-7" style={{ animationDelay: '.25s' }} />

            <p
              className="h3d-in text-gray-300 text-[15px] sm:text-[17px] leading-[1.85] max-w-xl"
              style={{ animationDelay: '.3s' }}
            >
              Supplier, stockist and exporter of stainless steel, carbon steel, alloy, duplex and
              nickel alloy pipes, fittings, flanges, sheets, bars, fasteners and valves — plus
              copper and brass — delivered across India and worldwide with full material
              traceability.
            </p>

            {/* CTAs */}
            <div className="h3d-in mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4" style={{ animationDelay: '.4s' }}>
              <button
                type="button"
                onClick={() => scrollToContact(navigate, pathname)}
                className="h3d-sheen relative overflow-hidden bg-[#E5A93C] text-[#0A1828] px-9 py-[18px] uppercase font-black text-[11px] tracking-[0.18em] hover:-translate-y-0.5 transition-transform duration-200 shadow-[0_18px_40px_-12px_rgba(229,169,60,.55)]"
              >
                <span className="relative z-10">Request a Quote</span>
              </button>
              <Link
                to="/products"
                className="group border border-white/25 text-white px-9 py-[18px] uppercase font-black text-[11px] tracking-[0.18em] hover:border-[#E5A93C] hover:bg-white/[0.04] transition-all duration-200 text-center flex items-center justify-center gap-3"
              >
                Explore Products
                <span className="text-[#E5A93C] group-hover:translate-x-1 transition-transform">→</span>
              </Link>
              <a
                href={`tel:${site.contact.phone}`}
                className="text-white/70 hover:text-[#E5A93C] px-2 py-[18px] text-[13px] font-bold tracking-wide transition-colors text-center sm:text-left"
              >
                {site.contact.phoneDisplay}
              </a>
            </div>

            {/* Trust strip */}
            <ul className="h3d-in flex flex-wrap gap-x-3 gap-y-2 mt-10" style={{ animationDelay: '.5s' }}>
              {TRUST_CHIPS.map((chip) => (
                <li
                  key={chip}
                  className="text-[10px] font-bold tracking-[0.14em] uppercase text-gray-400 border border-white/10 bg-white/[0.03] px-3.5 py-2 backdrop-blur-sm"
                >
                  {chip}
                </li>
              ))}
            </ul>
          </div>

          {/* 3D scene */}
          <div className="h3d-layer relative h-[360px] sm:h-[460px] lg:h-[560px] hidden sm:block" aria-hidden="true">
            {/* Receding tube of rings */}
            <div
              className="absolute left-1/2 top-1/2 w-[260px] h-[260px] lg:w-[330px] lg:h-[330px] -translate-x-1/2 -translate-y-1/2"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="h3d-tube absolute inset-0" style={{ transformStyle: 'preserve-3d' }}>
                {Array.from({ length: 14 }).map((_, i) => (
                  <span
                    key={i}
                    className="h3d-ring"
                    style={{
                      transform: `translateZ(${(i - 7) * 26}px) scale(${1 - Math.abs(i - 7) * 0.026})`,
                      opacity: 0.16 + (1 - Math.abs(i - 7) / 7) * 0.62,
                      borderColor:
                        i % 4 === 0 ? 'rgba(229,169,60,.55)' : 'rgba(229,169,60,.22)',
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Glass product card, lifted toward the viewer */}
            <div
              className="absolute left-1/2 top-1/2 w-[248px] lg:w-[290px] -translate-x-1/2 -translate-y-1/2"
              style={{ transform: 'translate(-50%,-50%) translateZ(150px) rotateY(-11deg) rotateX(5deg)' }}
            >
              <div className="rounded-tl-[34px] rounded-br-[34px] overflow-hidden border border-white/15 bg-white/[0.06] backdrop-blur-xl shadow-[0_40px_90px_-30px_rgba(0,0,0,.85)]">
                <div className="h-[168px] lg:h-[200px] overflow-hidden bg-[#0A1828]">
                  <img
                    src="/images/products/pipes-tubes.jpg"
                    alt=""
                    loading="eager"
                    decoding="async"
                    className="w-full h-full object-cover"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                </div>
                <div className="p-5">
                  <span className="text-[9px] font-black tracking-[0.24em] text-[#E5A93C] uppercase">
                    Stainless Steel
                  </span>
                  <p className="text-white font-black uppercase text-[15px] mt-1.5 leading-tight">
                    Pipes &amp; Tubes
                  </p>
                  <p className="text-gray-400 text-[11px] mt-2 leading-relaxed">
                    ASTM A312 · 1/2&quot; to 24&quot; NB · Sch 5S–XXS
                  </p>
                </div>
              </div>
            </div>

            {/* Floating spec chips on their own Z planes */}
            {SPEC_CHIPS.map((chip) => (
              <div
                key={chip.label}
                className="h3d-chip absolute"
                style={{ left: chip.x, top: chip.y, animationDelay: chip.delay }}
              >
                <div
                  className="border border-[#E5A93C]/30 bg-[#0A1828]/75 backdrop-blur-md px-4 py-2.5 shadow-xl"
                  style={{ transform: `translateZ(${chip.z}px)` }}
                >
                  <p className="text-[#E5A93C] text-[11px] font-black tracking-[0.12em]">
                    {chip.label}
                  </p>
                  <p className="text-gray-400 text-[9px] font-bold tracking-[0.16em] uppercase mt-0.5">
                    {chip.sub}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom fade into the next section */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#050D18] to-transparent z-[5]"
      />
    </section>
  );
}
