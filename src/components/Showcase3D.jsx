import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';

/*
 * 3D tilt showcase for the homepage.
 *
 * Each card is a real <Link> to a product page, so this section is both the
 * premium visual and a genuine internal-linking hub — eight product pages get
 * a crawlable link straight from the homepage.
 *
 * Tilt is applied by writing a transform directly to the hovered node inside
 * a rAF; no state, so hovering never re-renders the grid.
 */

/* Standards we supply against — a credibility strip, not decoration. */
const STANDARDS = [
  'ASTM A312', 'ASME B16.9', 'ASTM A403', 'ASME B16.5', 'ASTM A182',
  'ASTM A240', 'ASTM A790', 'EN 10204 3.1', 'ASTM B88', 'IBR',
];

/* Featured product ids, chosen to span both categories and most forms. */
const FEATURED_IDS = [1, 2, 4, 6, 9, 8, 11, 22];

function TiltCard({ product, index }) {
  const ref = useRef(null);
  const frame = useRef(0);

  const reduced = () =>
    typeof window !== 'undefined' &&
    (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ||
      window.matchMedia?.('(hover: none)').matches);

  const onMove = (e) => {
    const el = ref.current;
    if (!el || reduced()) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    if (frame.current) return;
    frame.current = requestAnimationFrame(() => {
      el.style.transform = `perspective(900px) rotateY(${px * 11}deg) rotateX(${py * -11}deg) translateZ(22px)`;
      frame.current = 0;
    });
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    if (frame.current) {
      cancelAnimationFrame(frame.current);
      frame.current = 0;
    }
    el.style.transform = '';
  };

  return (
    <Link
      to={`/products/${product.id}`}
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="group relative block bg-[#0A1828] rounded-tl-[30px] rounded-br-[30px] overflow-hidden border border-white/[0.07] transition-[transform,box-shadow,border-color] duration-300 ease-out hover:border-[#E5A93C]/40 hover:shadow-[0_30px_70px_-25px_rgba(0,0,0,.9)]"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className="relative h-[190px] overflow-hidden bg-[#08121F]">
        <img
          src={product.image}
          alt={`${product.material} ${product.name} — supplied by Ritvik Metal Impex, Mumbai`}
          loading={index < 4 ? 'eager' : 'lazy'}
          decoding="async"
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-[1.06] transition-all duration-700"
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1828] via-[#0A1828]/25 to-transparent" />
        <span className="absolute top-4 left-4 text-[9px] font-black tracking-[0.2em] uppercase text-[#0A1828] bg-[#E5A93C] px-2.5 py-1">
          {product.category}
        </span>
      </div>

      <div className="p-6" style={{ transform: 'translateZ(34px)' }}>
        <span className="text-[#E5A93C] text-[9px] font-black tracking-[0.24em] uppercase">
          {product.material}
        </span>
        <h3 className="text-white text-[16px] font-black uppercase mt-2 leading-tight">
          {product.name}
        </h3>
        <p className="text-gray-400 text-[12px] mt-3 leading-relaxed line-clamp-2">
          {product.description}
        </p>
        <span className="inline-flex items-center gap-2 mt-5 text-[10px] font-black tracking-[0.18em] uppercase text-white group-hover:text-[#E5A93C] transition-colors">
          View Specifications
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </span>
      </div>
    </Link>
  );
}

export default function Showcase3D() {
  const featured = FEATURED_IDS.map((id) => products.find((p) => p.id === id)).filter(Boolean);

  return (
    <section className="relative bg-[#050D18] py-20 lg:py-28 overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 50% at 50% 0%, rgba(229,169,60,.10) 0%, transparent 60%)',
        }}
      />

      {/* Standards marquee */}
      <div className="relative mb-20 border-y border-white/[0.07] py-5 overflow-hidden">
        <div className="flex gap-10 whitespace-nowrap animate-[sc3d-marquee_32s_linear_infinite] motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:justify-center">
          {[...STANDARDS, ...STANDARDS].map((standard, i) => (
            <span
              key={`${standard}-${i}`}
              className="text-[12px] font-black tracking-[0.26em] uppercase text-white/25 shrink-0"
            >
              {standard}
            </span>
          ))}
        </div>
        <style>{`@keyframes sc3d-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
      </div>

      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-16">
        <header className="max-w-2xl mb-14">
          <span className="text-[10px] font-black tracking-[0.32em] text-[#E5A93C] uppercase">
            The Catalogue
          </span>
          <h2 className="text-[30px] sm:text-[42px] font-black text-white uppercase leading-[1.1] mt-4">
            Engineered Metals,<br />Certified and Ready
          </h2>
          <div className="w-14 h-[2px] bg-[#E5A93C] mt-6 mb-6" />
          <p className="text-gray-400 text-[15px] leading-[1.85]">
            Twenty-two product lines across ferrous and non-ferrous metals, every consignment
            supplied with a mill test certificate traceable to the heat number.
          </p>
        </header>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((product, i) => (
            <TiltCard key={product.id} product={product} index={i} />
          ))}
        </div>

        <div className="mt-14 flex flex-wrap items-center gap-4">
          <Link
            to="/products"
            className="group bg-white/[0.06] border border-white/15 text-white px-8 py-4 uppercase font-black text-[11px] tracking-[0.16em] hover:border-[#E5A93C] hover:bg-white/[0.1] transition-all duration-200 flex items-center gap-3"
          >
            View All 22 Products
            <span className="text-[#E5A93C] group-hover:translate-x-1 transition-transform">→</span>
          </Link>
          <Link
            to="/blog"
            className="text-gray-400 hover:text-[#E5A93C] px-2 py-4 text-[11px] font-black uppercase tracking-[0.16em] transition-colors"
          >
            Read the technical guides
          </Link>
        </div>
      </div>
    </section>
  );
}
