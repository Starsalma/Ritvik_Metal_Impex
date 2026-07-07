import React from 'react';

const footerStyles = `
  @media (min-width: 1024px) {
    .footer-left-panel {
      clip-path: polygon(0 0, 86% 0, 100% 50%, 86% 100%, 0 100%);
    }
  }
`;

const MAP_SRC = "https://maps.google.com/maps?q=18.9544,72.8253&t=&z=17&ie=UTF8&iwloc=&output=embed";

export default function Footer() {
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

            {/* Email */}
            <div className="flex items-center gap-4">
              <svg className="w-5 h-5 text-[#E5A93C] shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
              <a href="mailto:suresh.prajapat@ritvikmetalimpex.com" className="text-gray-200 font-bold text-[14px] tracking-wide hover:text-[#E5A93C] transition-colors break-all">
                suresh.prajapat@ritvikmetalimpex.com
              </a>
              <a href="mailto:salesritvikmetal@gmail.com" className="text-gray-200 font-bold text-[14px] tracking-wide hover:text-[#E5A93C] transition-colors break-all">salesritvikmetal@gmail.com</a>
              <a href="mailto:suresh.prajapat@ritvikmetalimpex.com" className="text-gray-200 font-bold text-[14px] tracking-wide hover:text-[#E5A93C] transition-colors break-all">suresh.prajapat@ritvikmetalimpex.com</a>
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
          <nav className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-[11px] sm:text-[12px] font-bold tracking-widest text-gray-300">
            {['HOME', 'ABOUT US', 'PRODUCTS', 'INDUSTRIES', 'SERVICES', 'CONTACT US'].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(' ', '-')}`}
                className="hover:text-[#E5A93C] transition-colors duration-150 cursor-pointer"
              >
                {link}
              </a>
            ))}
          </nav>

          {/* Social Communities */}
          <div className="flex items-center gap-2.5">
            {[
              { icon: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z", label: "Facebook" },
              { icon: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z", label: "LinkedIn" },
              { icon: "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z", label: "Twitter" }
            ].map((soc, idx) => (
              <a
                key={idx}
                href="#"
                aria-label={soc.label}
                className="w-8 h-8 rounded-full border border-gray-700 hover:border-[#E5A93C] flex items-center justify-center text-gray-400 hover:text-[#E5A93C] bg-black/20 hover:bg-[#E5A93C]/5 transition-all duration-200"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d={soc.icon} />
                </svg>
              </a>
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