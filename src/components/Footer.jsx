import { Link, useNavigate, useLocation } from 'react-router-dom';
import { articles } from '../data/articles';
import { site } from '../data/site';
import { scrollToContact } from '../utils/navigation';

const contactChannels = [
  {
    label: 'Chat on WhatsApp',
    href: `https://wa.me/${site.contact.whatsapp}`,
    external: true,
    icon: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.05 21.785h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884',
  },
  {
    label: `Call ${site.contact.phoneDisplay}`,
    href: `tel:${site.contact.phone}`,
    icon: 'M6.62 10.79a15.15 15.15 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-11.05 0-20-8.95-20-20 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.24.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z',
  },
  {
    label: `Email ${site.contact.emails[0]}`,
    href: `mailto:${site.contact.emails[0]}`,
    icon: 'M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z',
  },
];

/* Crawlable internal links — replaces the previous dead "#home" style anchors. */
const footerLinks = [
  { label: 'HOME', to: '/' },
  { label: 'ABOUT US', to: '/about' },
  { label: 'PRODUCTS', to: '/products' },
  { label: 'KNOWLEDGE HUB', to: '/blog' },
];

const footerStyles = `
  @media (min-width: 1024px) {
    .footer-left-panel {
      clip-path: polygon(0 0, 86% 0, 100% 50%, 86% 100%, 0 100%);
    }
  }
`;

const MAP_SRC = "https://maps.google.com/maps?q=18.9544,72.8253&t=&z=17&ie=UTF8&iwloc=&output=embed";

export default function Footer() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <footer className="w-full bg-[#030914] text-white font-sans overflow-hidden">
      <style>{footerStyles}</style>

      {/* ========================================================================
          TIER 1: GET IN TOUCH & BILLING ADDRESS BLOCK WITH MAP
         ========================================================================
      */}
      <div className="w-full bg-white relative flex flex-col lg:flex-row items-stretch lg:min-h-[360px]">

        {/* LEFT COLUMN: GET IN TOUCH BANNER */}
        <div className="bg-[#041125] w-full lg:w-[35%] py-10 px-6 sm:px-12 lg:pl-16 lg:pr-14 relative z-20 flex flex-col justify-center shrink-0 footer-left-panel">

          <h3 className="text-[24px] sm:text-[28px] font-black tracking-wide uppercase text-white">
            GET <span className="text-[#E5A93C]">IN TOUCH</span>
          </h3>
          <p className="text-gray-400 text-[13px] sm:text-[14px] mt-2 font-medium leading-relaxed max-w-xs">
            We are here to answer your queries and provide the best solutions for your business.
          </p>

          <div className="mt-8 space-y-5">
            {/* Phone */}
            <div className="flex items-center gap-4">
              <svg className="w-5 h-5 text-[#E5A93C] shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.62 10.79a15.15 15.15 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-11.05 0-20-8.95-20-20 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.24.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
              </svg>
              <span className="text-gray-200 font-bold text-[14px] tracking-wide">+91 7073895597</span>
            </div>

            {/* Email — one link per address, no duplicates */}
            <div className="flex items-start gap-4">
              <svg className="w-5 h-5 text-[#E5A93C] shrink-0 mt-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
              <div className="flex flex-col gap-1.5 min-w-0">
                {site.contact.emails.map((email) => (
                  <a
                    key={email}
                    href={`mailto:${email}`}
                    className="text-gray-200 font-bold text-[14px] tracking-wide hover:text-[#E5A93C] transition-colors break-all"
                  >
                    {email}
                  </a>
                ))}
              </div>
            </div>

            {/* Website */}
            <div className="flex items-center gap-4">
              <svg className="w-5 h-5 text-[#E5A93C] shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10zM2 12h20" />
              </svg>
              <a href="https://www.ritvikmetalimpex.com" target="_blank" rel="noreferrer" className="text-gray-200 font-bold text-[14px] tracking-wide hover:text-[#E5A93C] transition-colors">
                www.ritvikmetalimpex.com
              </a>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: ADDRESS + MAP side by side on desktop */}
        <div className="flex-1 bg-white text-gray-800 flex flex-col lg:flex-row">

          {/* Address Details */}
          <div className="py-10 px-6 sm:px-12 lg:pl-8 lg:pr-6 flex flex-col justify-center lg:w-[45%] shrink-0">
            <h4 className="text-[18px] font-black tracking-wider uppercase text-[#041125]">
              CONTACT <span className="text-[#E5A93C]">DETAILS</span>
            </h4>

            <div className="flex items-center gap-2 mt-4">
              <svg className="w-4 h-4 text-[#E5A93C] shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
              <p className="font-extrabold text-[14px] tracking-wide text-gray-900 uppercase">
                RITVIK METAL IMPEX
              </p>
            </div>

            <p className="text-[13px] font-bold text-gray-500 pl-6 mt-1.5 leading-relaxed">
              Building no 16 2nd floor, Patel mansion 4th<br />
              kumbharwada, Mumbai - 400004, Maharashtra.
            </p>

            <div className="w-[75%] h-[1px] bg-gray-200 my-5" />

            <div className="space-y-2 text-[13px] font-bold">
              <div className="flex flex-wrap">
                <span className="w-24 text-gray-900 uppercase tracking-wider shrink-0">GSTIN/UIN</span>
                <span className="px-2 text-gray-400 shrink-0">:</span>
                <span className="text-gray-700 font-extrabold tracking-wide uppercase break-all">27EPNPK9821R1ZR</span>
              </div>

              <div className="max-w-[360px] h-[1px] bg-gray-100 my-2" />

              <div className="flex">
                <span className="w-24 text-gray-400 shrink-0">Tel</span>
                <span className="px-2 text-gray-400">:</span>
                <span className="text-gray-700 font-medium">+91 7073895597</span>
              </div>
              <div className="flex flex-wrap">
                <span className="w-24 text-gray-400 shrink-0">Email ID</span>
                <span className="px-2 text-gray-400 shrink-0">:</span>
                <span className="text-gray-700 font-medium break-all">suresh.prajapat@ritvikmetalimpex.com | salesritvikmetal@gmail.com</span>
              </div>
              <div className="flex">
                <span className="w-24 text-gray-400 shrink-0">Visit Us</span>
                <span className="px-2 text-gray-400">:</span>
                <span className="text-[#041125] font-semibold underline decoration-gray-300">www.ritvikmetalimpex.com</span>
              </div>
            </div>

            {/* Mobile-only map */}
            <div className="relative w-full h-[200px] rounded-lg overflow-hidden border border-gray-100 shadow-sm mt-6 lg:hidden">
              <iframe
                title="Ritvik Metal Impex Location Mobile"
                src={MAP_SRC}
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <a
                href="https://www.google.com/maps?q=18.9544,72.8253"
                target="_blank"
                rel="noreferrer"
                className="absolute inset-0 z-10"
                aria-label="Open in Google Maps"
              />
            </div>
          </div>

          {/* Desktop map — clickable, opens Google Maps */}
          <div className="hidden lg:flex flex-1 relative" style={{minHeight: '360px'}}>
            <iframe
              title="Ritvik Metal Impex Location Desktop"
              src={MAP_SRC}
              className="w-full h-full border-0 absolute inset-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            {/* Transparent click-capture overlay — opens Google Maps */}
            <a
              href="https://www.google.com/maps?q=18.9544,72.8253"
              target="_blank"
              rel="noreferrer"
              className="absolute inset-0 z-10"
              aria-label="Open in Google Maps"
            />
          </div>

        </div>
      </div>

      {/* ========================================================================
          TIER 2: MIDDLE NAVIGATION BAR
         ========================================================================
      */}
      <div className="w-full bg-[#030E1E] border-t border-b border-gray-800/80 px-4 sm:px-8 lg:px-16 py-5">
        <div className="max-w-[1240px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Identity Vector Block */}
          <div className="flex items-center gap-3">
            <div className="text-[26px] font-black tracking-tighter text-white flex items-center">
              R<span className="text-[#E5A93C]">M</span>I
            </div>
            <div className="w-[1px] h-6 bg-gray-700" />
            <div className="text-[10px] font-black tracking-widest text-gray-400 uppercase leading-tight">
              RITVIK<br />METAL IMPEX
            </div>
          </div>

          {/* Navigation Hyperlinks */}
          <nav aria-label="Footer" className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-[11px] sm:text-[12px] font-bold tracking-widest text-gray-300">
            {footerLinks.map(({ label, to }) => (
              <Link
                key={label}
                to={to}
                className="hover:text-[#E5A93C] transition-colors duration-150 cursor-pointer"
              >
                {label}
              </Link>
            ))}
            <button
              type="button"
              onClick={() => scrollToContact(navigate, pathname)}
              className="hover:text-[#E5A93C] transition-colors duration-150 cursor-pointer tracking-widest font-bold"
            >
              CONTACT US
            </button>
          </nav>

          {/*
            Working contact channels. These were previously three social icons
            pointing at href="#", which jumped to the top of the page and gave
            crawlers dead links. Real profile URLs can be added to
            site.sameAs and rendered here once they exist.
          */}
          <div className="flex items-center gap-2.5">
            {contactChannels.map(({ href, label, icon, external }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                title={label}
                {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
                className="w-8 h-8 rounded-full border border-gray-700 hover:border-[#E5A93C] flex items-center justify-center text-gray-400 hover:text-[#E5A93C] bg-black/20 hover:bg-[#E5A93C]/5 transition-all duration-200"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d={icon} />
                </svg>
              </a>
            ))}
          </div>

        </div>
      </div>

      {/* ========================================================================
          TIER 2B: TECHNICAL GUIDES — internal links for crawl depth
         ========================================================================
      */}
      <div className="w-full bg-[#030E1E] px-4 sm:px-8 lg:px-16 py-6 border-b border-gray-800/60">
        <div className="max-w-[1240px] mx-auto flex flex-col sm:flex-row sm:items-center gap-x-6 gap-y-3">
          <span className="text-[10px] font-black tracking-[0.25em] text-[#E5A93C] uppercase shrink-0">
            Technical Guides
          </span>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {articles.map((article) => (
              <Link
                key={article.slug}
                to={`/blog/${article.slug}`}
                className="text-[11px] font-semibold text-gray-400 hover:text-[#E5A93C] transition-colors"
              >
                {article.title}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ========================================================================
          TIER 3: BLACK BOTTOM STRIP
         ========================================================================
      */}
      <div className="w-full bg-[#020710] px-4 sm:px-8 lg:px-16 py-3.5 text-[11px] font-medium text-gray-500 tracking-wide">
        <div className="max-w-[1240px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <p>© 2025 Ritvik Metal Impex. All Rights Reserved.</p>
          <p className="flex items-center gap-1">
            Designed with <span className="text-red-600">❤️</span> for quality and trust.
          </p>
        </div>
      </div>

    </footer>
  );
}