import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { imageSize } from '../data/imageSizes';

/*
 * Real photographs from the Mumbai stockyard.
 *
 * This section exists for one reason: technical buyers can tell stock
 * photography from actual stock, and a catalogue illustrated with generic
 * renders reads as a trading front rather than a stockist. These are the
 * company's own watermarked photographs, so each one is evidence.
 *
 * Every tile is a real <Link> to the product page it depicts, which makes the
 * section an internal-linking hub as well as a visual one. Captions name the
 * grade or standard visible in the photograph rather than describing the mood.
 */

const SHOTS = [
  {
    src: '/images/products/ss-circles-316l.jpg',
    title: 'SS 316L Circles & Blanks',
    detail: 'Plate-cut circles, marked by heat and size',
    productId: 6,
  },
  {
    src: '/images/products/ss-round-bars.jpg',
    title: 'Stainless Steel Round Bars',
    detail: 'Colour-coded by grade and diameter',
    productId: 9,
    /* The only wide tile. 3 cols x 2 rows = 6 cells; five tiles plus this
     * one extra cell fills the grid exactly, with no implicit overflow row. */
    span: 'sm:col-span-2',
  },
  {
    src: '/images/products/ss-stud-bolts.jpg',
    title: 'Stud Bolts & Heavy Hex Nuts',
    detail: 'Full-thread studs with matched nuts',
    productId: 7,
  },
  {
    src: '/images/products/ss-washers.jpg',
    title: 'Stainless Steel Washers',
    detail: 'Sorted and binned by size',
    productId: 7,
  },
  {
    src: '/images/products/ss-channels-angles.jpg',
    title: 'Channels & Angles',
    detail: 'Press-formed stainless sections',
    productId: 23,
  },
];

function Shot({ shot, eager }) {
  const ref = useRef(null);
  const frame = useRef(0);
  const dims = imageSize(shot.src);

  /*
   * Tilt is written straight to the node inside a rAF rather than held in
   * state — hovering a tile must not re-render the gallery. Disabled for
   * touch and for anyone who has asked for reduced motion.
   */
  const inert = () =>
    typeof window !== 'undefined' &&
    (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ||
      window.matchMedia?.('(hover: none)').matches);

  const onMove = (e) => {
    const el = ref.current;
    if (!el || inert() || frame.current) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    frame.current = requestAnimationFrame(() => {
      el.style.transform = `perspective(1100px) rotateY(${px * 7}deg) rotateX(${py * -7}deg) translateZ(18px)`;
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
      to={`/products/${shot.productId}`}
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`group relative block overflow-hidden rounded-tl-[34px] rounded-br-[34px] bg-[#0A1828] shadow-[0_18px_44px_-20px_rgba(10,24,40,0.55)] transition-[transform,box-shadow] duration-300 ease-out will-change-transform hover:shadow-[0_30px_70px_-24px_rgba(10,24,40,0.7)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E5A93C] ${shot.span ?? ''}`}
    >
      <img
        src={shot.src}
        alt={`${shot.title} in stock at Ritvik Metal Impex, Mumbai`}
        {...(dims ? { width: dims[0], height: dims[1] } : {})}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        className="h-full w-full object-cover opacity-95 transition-transform duration-500 ease-out group-hover:scale-[1.04]"
      />

      {/* Depth: a gradient floor the caption sits on, so text never lands on busy metal */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0A1828] via-[#0A1828]/45 to-transparent"
      />

      <div className="absolute inset-x-0 bottom-0 p-5 lg:p-6">
        <p className="text-[15px] font-black uppercase leading-tight tracking-wide text-white">
          {shot.title}
        </p>
        <p className="mt-1 text-[12px] leading-snug text-white/70">{shot.detail}</p>
        <span className="mt-3 inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.18em] text-[#E5A93C]">
          View Product
          <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
        </span>
      </div>
    </Link>
  );
}

export default function StockyardGallery() {
  return (
    <section
      aria-labelledby="stockyard-heading"
      className="bg-white px-6 py-24 lg:px-16"
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="max-w-2xl">
          <span className="text-[11px] font-black uppercase tracking-[0.3em] text-[#E5A93C]">
            Photographed in Our Stockyard
          </span>
          <h2
            id="stockyard-heading"
            className="mt-3 text-3xl font-black uppercase leading-tight text-[#0A1828] lg:text-4xl"
          >
            Real stock, not stock photos
          </h2>
          <div className="mt-6 mb-6 h-[2px] w-16 bg-[#E5A93C]" />
          <p className="text-[16px] leading-relaxed text-gray-600">
            Every photograph below was taken at our Mumbai premises — the same
            material we quote, cut and dispatch. Heat numbers, size markings and
            grade colour-coding are visible because nothing here is staged.
          </p>
        </div>

        {/*
          * Fixed row heights are load-bearing. These photographs are a mix of
          * portrait and landscape; without an explicit row height the grid
          * sizes each row to its tallest natural image and a 960x1280 portrait
          * blows the section out to several thousand pixels. object-cover then
          * crops to the tile instead.
          */}
        <div className="mt-12 grid auto-rows-[260px] grid-cols-1 gap-5 sm:grid-cols-2 lg:auto-rows-[300px] lg:grid-cols-3">
          {SHOTS.map((shot, i) => (
            <Shot key={shot.src} shot={shot} eager={i < 2} />
          ))}
        </div>

        <p className="mt-8 text-[13px] text-gray-500">
          Material is supplied with a mill test certificate to EN 10204 3.1,
          traceable to the heat number shown on the stock.
        </p>
      </div>
    </section>
  );
}
