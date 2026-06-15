import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const navLinks = [
  { label: 'HOME',       to: '/' },
  { label: 'ABOUT US',   to: '/about' },
  { label: 'PRODUCTS',   to: '/products' },
  { label: 'BLOG', to: '#blog' },
  { label: 'SERVICES',   to: '#services' },
  { label: 'CONTACT US', to: '#contact-us' },
];

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <nav className="w-full bg-white sticky top-0 z-50 border-b border-gray-100 shadow-sm">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img src="/images/logo.jpg" alt="Ritvik Metal Impex Logo" className="h-12 w-12 lg:h-14 lg:w-14 object-contain rounded-full" />
            <div className="hidden sm:flex flex-col justify-center pl-1">
              <span className="text-[11px] lg:text-[13px] font-black tracking-[0.12em] text-[#0A1828] uppercase leading-none">RITVIK</span>
              <span className="text-[9px] lg:text-[10px] font-bold tracking-[0.08em] text-gray-400 uppercase mt-0.5 leading-none">METAL IMPEX</span>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map(({ label, to }) => (
              to.startsWith('#')
                ? <a key={label} href={to} className="text-[11px] font-bold tracking-widest text-gray-500 hover:text-[#0A1828] transition-colors">{label}</a>
                : <Link key={label} to={to} className="text-[11px] font-bold tracking-widest text-gray-500 hover:text-[#0A1828] transition-colors">{label}</Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex">
            <button onClick={() => document.getElementById('contact-us').scrollIntoView({behavior:'smooth'})} className="bg-[#051124] text-white text-[10px] font-bold tracking-[0.15em] px-6 py-3.5 uppercase flex items-center gap-3 transition-colors">
              GET A QUOTE
            </button>
          </div>

          {/* Hamburger */}
          <button className="lg:hidden p-2 text-[#0A1828]" onClick={() => setIsSidebarOpen(true)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Sidebar Backdrop */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-[60] lg:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}

      {/* Sidebar Panel */}
      <div className={`fixed top-0 right-0 h-full w-[280px] bg-white z-[70] transform transition-transform duration-300 ease-in-out shadow-2xl ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 flex flex-col h-full">
          <div className="flex justify-end mb-10">
            <button onClick={() => setIsSidebarOpen(false)} className="p-2 text-[#0A1828]">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          <div className="flex flex-col gap-8">
            {navLinks.map(({ label, to }) => (
              to.startsWith('#')
                ? <a key={label} href={to} onClick={() => setIsSidebarOpen(false)} className="text-[14px] font-black tracking-widest text-[#0A1828] uppercase">{label}</a>
                : <Link key={label} to={to} onClick={() => setIsSidebarOpen(false)} className="text-[14px] font-black tracking-widest text-[#0A1828] uppercase">{label}</Link>
            ))}
          </div>
          <div className="mt-auto">
            <button onClick={() => { setIsSidebarOpen(false); document.getElementById('contact-us').scrollIntoView({behavior:'smooth'}); }} className="w-full bg-[#051124] text-white py-4 font-bold tracking-[0.15em] uppercase">Get a Quote</button>
          </div>
        </div>
      </div>
    </>
  );
}
