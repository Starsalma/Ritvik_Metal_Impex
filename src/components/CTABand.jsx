import { useNavigate, useLocation, Link } from 'react-router-dom';
import { site } from '../data/site';
import { scrollToContact } from '../utils/navigation';

/**
 * The site-wide call to action. Appears at the foot of every page so no route
 * is a dead end — previously only the homepage and product pages had one.
 *
 * `variant="dark"` is the default band; "light" suits pages that already end
 * on a dark section.
 */
export default function CTABand({
  eyebrow = 'Get a Quote',
  title = 'Need a price, a grade recommendation or stock availability?',
  body = 'Send us your drawing, line list or enquiry. Our technical team replies with grade options, stock position and a firm price — with mill test certificates as standard.',
  primaryLabel = 'Request a Quote',
  whatsappMessage = 'Hi, I would like a quote from Ritvik Metal Impex.',
  variant = 'dark',
  className = '',
}) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dark = variant === 'dark';

  return (
    <section
      aria-labelledby="cta-heading"
      className={`${dark ? 'bg-[#0A1828]' : 'bg-[#F6F7F9]'} relative overflow-hidden ${className}`}
    >
      {/* Depth: soft radial glow + hairline grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.55]"
        style={{
          background: dark
            ? 'radial-gradient(60% 120% at 15% 0%, rgba(229,169,60,.16) 0%, transparent 60%)'
            : 'radial-gradient(60% 120% at 15% 0%, rgba(10,24,40,.07) 0%, transparent 60%)',
        }}
      />

      <div className="relative max-w-[1240px] mx-auto px-6 lg:px-16 py-16 lg:py-20">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
          <div className="max-w-2xl">
            <span className="text-[#E5A93C] text-[11px] font-black tracking-[0.3em] uppercase">
              {eyebrow}
            </span>
            <h2
              id="cta-heading"
              className={`text-[26px] sm:text-[34px] font-black uppercase leading-[1.15] mt-4 ${
                dark ? 'text-white' : 'text-[#0A1828]'
              }`}
            >
              {title}
            </h2>
            <div className="w-14 h-[2px] bg-[#E5A93C] mt-6 mb-6" />
            <p className={`text-[15px] leading-[1.8] ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
              {body}
            </p>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-7">
              <a
                href={`tel:${site.contact.phone}`}
                className={`text-[14px] font-bold tracking-wide transition-colors ${
                  dark ? 'text-white hover:text-[#E5A93C]' : 'text-[#0A1828] hover:text-[#E5A93C]'
                }`}
              >
                {site.contact.phoneDisplay}
              </a>
              <span className={dark ? 'text-gray-700' : 'text-gray-300'}>|</span>
              <a
                href={`mailto:${site.contact.emails[0]}`}
                className={`text-[14px] font-bold tracking-wide break-all transition-colors ${
                  dark ? 'text-white hover:text-[#E5A93C]' : 'text-[#0A1828] hover:text-[#E5A93C]'
                }`}
              >
                {site.contact.emails[0]}
              </a>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 shrink-0">
            <button
              type="button"
              onClick={() => scrollToContact(navigate, pathname)}
              className="bg-[#E5A93C] text-[#0A1828] px-8 py-4 uppercase font-black text-[11px] tracking-[0.15em] hover:bg-[#d4982b] hover:-translate-y-0.5 transition-all duration-200 shadow-lg shadow-[#E5A93C]/20"
            >
              {primaryLabel}
            </button>
            <a
              href={`https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`}
              target="_blank"
              rel="noreferrer"
              className={`px-8 py-4 uppercase font-black text-[11px] tracking-[0.15em] border transition-all duration-200 hover:-translate-y-0.5 ${
                dark
                  ? 'border-white/25 text-white hover:border-white'
                  : 'border-gray-300 text-[#0A1828] hover:border-[#0A1828]'
              }`}
            >
              WhatsApp Us
            </a>
            <Link
              to="/products"
              className={`px-8 py-4 uppercase font-black text-[11px] tracking-[0.15em] border transition-all duration-200 hover:-translate-y-0.5 ${
                dark
                  ? 'border-white/25 text-white hover:border-white'
                  : 'border-gray-300 text-[#0A1828] hover:border-[#0A1828]'
              }`}
            >
              Browse Catalogue
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
